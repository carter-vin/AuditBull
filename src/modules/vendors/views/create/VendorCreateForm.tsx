/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Card,
    Typography,
    Button,
    CircularProgress,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from 'react-query';
import { API, Auth } from 'aws-amplify';
import { omit, filter, map } from 'lodash';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { OptionType } from 'utils/select';
import Success from 'components/Success';

import GeneralStep from './steps/GeneralStep';
import ComplianceStep from './steps/ComplianceStep';
import UseCaseStep from './steps/UseCaseStep';
import FinanceStep from './steps/FinanceStep';

import { createVendor, IVendor } from '../../service';

type StepType = {
    label: string;
};

const steps: StepType[] = [
    {
        label: 'General',
    },
    {
        label: 'Compliance',
    },
    {
        label: 'Use Case',
    },
    {
        label: 'Finance',
    },
];

const validationSchemas = [
    Yup.object().shape({
        name: Yup.string().required('Vendor Name is required'),
        status: Yup.string().required('Status is required'),
        service: Yup.array().min(1, 'Service is required'),
    }),
    Yup.object().shape({
        compliance: Yup.object().shape({
            compliaceTaggedUser: Yup.string().nullable(),
            riskStatement: Yup.string().when('compliaceTaggedUser', {
                is: (compliaceTaggedUser: string) => !compliaceTaggedUser,
                then: Yup.string().required('Risk Statement is required'),
            }),
            riskClassification: Yup.string().when('compliaceTaggedUser', {
                is: (compliaceTaggedUser: string) => !compliaceTaggedUser,
                then: Yup.string().required('Risk Classification is required'),
            }),
            vrmStatus: Yup.string().when('compliaceTaggedUser', {
                is: (compliaceTaggedUser: string) => !compliaceTaggedUser,
                then: Yup.string().required('VRM is required'),
            }),
            vrmQuestionnaire: Yup.string().when('compliaceTaggedUser', {
                is: (compliaceTaggedUser: string) => !compliaceTaggedUser,
                then: Yup.string().required('VRM questionnarie is required'),
            }),
            securityAssesment: Yup.string().when('compliaceTaggedUser', {
                is: (compliaceTaggedUser: string) => !compliaceTaggedUser,
                then: Yup.string().required('Security assesment is required'),
            }),
            privacyReview: Yup.string().when('compliaceTaggedUser', {
                is: (compliaceTaggedUser: string) => !compliaceTaggedUser,
                then: Yup.string().required('Privacy review is required'),
            }),
            legalReview: Yup.string().when('compliaceTaggedUser', {
                is: (compliaceTaggedUser: string) => !compliaceTaggedUser,
                then: Yup.string().required('Legal review is required'),
            }),
        }),
    }),
    Yup.object().shape({
        useCases: Yup.object().shape({
            useCaseTaggedUser: Yup.string().nullable(),
            owner: Yup.string().when('useCaseTaggedUser', {
                is: (useCaseTaggedUser: string) => !useCaseTaggedUser,
                then: Yup.string().required('Owner is required'),
            }),
            description: Yup.string().when('useCaseTaggedUser', {
                is: (useCaseTaggedUser: string) => !useCaseTaggedUser,
                then: Yup.string().required('Description is required'),
            }),
            dataUsage: Yup.array().when('useCaseTaggedUser', {
                is: (useCaseTaggedUser: string) => !useCaseTaggedUser,
                then: Yup.array().min(1, 'Data Usage is required'),
            }),
        }),
    }),
    Yup.object().shape({
        finance: Yup.object().shape({
            financeTaggedUser: Yup.string().nullable(),
            contracts: Yup.array().when('financeTaggedUser', {
                is: (financeTaggedUser: string) => !financeTaggedUser,
                then: Yup.array().of(
                    Yup.object().shape({
                        file: Yup.array().min(1, 'File is required'),
                        type: Yup.string().required('Type is required'),
                    })
                ),
            }),
        }),
    }),
];

const VendorCreateForm = () => {
    const theme = useTheme();
    const router = useRouter();
    const verticalStepper = useMediaQuery(theme.breakpoints.down('sm'));

    const [activeStep, setActiveStep] = useState(0);
    const [success, setSuccess] = useState<boolean>(false);
    const [userList, setuserList] = useState<OptionType[]>([]);

    const handleNextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const { isLoading } = useQuery(
        'getUserList',
        async () => {
            const requestInfo = {
                response: true,
                queryStringParameters: {
                    limit: '60',
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${(await Auth.currentSession())
                        .getAccessToken()
                        .getJwtToken()}`,
                },
            };
            return API.get('AdminQueries', '/listUsers', requestInfo);
        },
        {
            onSuccess: async (data: any) => {
                const currentUser = await Auth.currentAuthenticatedUser();
                const roles = data?.data?.Users.map(
                    (user: {
                        Username: string;
                        Attributes: {
                            Name: string;
                            Value: string;
                        }[];
                        UserStatus: string;
                    }) => {
                        const attributes = user.Attributes;
                        return {
                            value:
                                attributes?.find(
                                    (attr: { Name: string }) =>
                                        attr.Name === 'email'
                                )?.Value || '',
                            label:
                                attributes?.find(
                                    (attr: { Name: string }) =>
                                        attr.Name === 'name'
                                )?.Value ||
                                attributes?.find(
                                    (attr: { Name: string }) =>
                                        attr.Name === 'email'
                                )?.Value ||
                                user.Username ||
                                '',
                        };
                    }
                );
                setuserList(
                    filter(
                        roles,
                        (user: { username: string }) =>
                            user.username !== currentUser?.username
                    )
                );
            },
            onError: (err: any) => {
                toast.error(
                    err.response?.data?.message || 'Failed to fetch users'
                );
            },
        }
    );

    const { isLoading: btnLoading, mutate } = useMutation(createVendor, {
        mutationKey: 'createVendor',
        onSuccess: () => {
            setSuccess(true);
        },
        onError: (error: any) => {
            const message =
                error?.errors[0].message ||
                error.message ||
                'Failed to add vendor';
            toast.error(message);
        },
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            website: '',
            service: [],
            status: '',
            compliance: {
                compliaceTaggedUser: '',
                riskClassification: '',
                riskStatement: '',
                vrmStatus: '',
                vrmQuestionnaire: '',
                securityAssesment: '',
                privacyReview: '',
                legalReview: '',
            },
            useCases: {
                useCaseTaggedUser: '',
                owner: '',
                description: '',
                dataUsage: [],
            },
            finance: {
                contracts: [
                    {
                        type: '',
                        file: [],
                    },
                ],
                financeTaggedUser: '',
            },
        },
        validationSchema: validationSchemas[activeStep],
        onSubmit: async (values: IVendor, { setSubmitting }) => {
            if (activeStep === steps.length - 1) {
                setSubmitting(true);
                if (values.finance.contracts.length > 0) {
                    map(values.finance.contracts, async (contract: any) => {
                        omit(contract, ['file']);
                    });
                }
                mutate(values);
            } else {
                handleNextStep();
            }
            setSubmitting(false);
        },
    });

    const getScreen = () => {
        switch (activeStep) {
            case 0:
                return <GeneralStep formik={formik} />;
            case 1:
                return <ComplianceStep formik={formik} users={userList} />;
            case 2:
                return <UseCaseStep formik={formik} users={userList} />;
            case 3:
                return <FinanceStep formik={formik} users={userList} />;
            default:
                return <p>No Step selected</p>;
        }
    };
    const successCallbackFunction = () => {
        router.push('/vendors');
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    if (success) {
        return (
            <Success
                callback={successCallbackFunction}
                callbackLabel="Back to vendor list"
                description="Vendor created successfully"
            />
        );
    }

    return (
        <Box className="flex flex-col gap-8 justify-start  flex-1">
            <Box className="flex justify-start flex-col md:flex-row">
                <Stepper
                    orientation={verticalStepper ? 'vertical' : 'horizontal'}
                    activeStep={activeStep}
                    className="flex-1 md:w-3/4 items-start md:items-center flex "
                >
                    {steps.map((step) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        return (
                            <Step key={step.label} {...stepProps}>
                                <StepLabel {...labelProps}>
                                    {step.label}
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Box>
            <Box className="flex flex-col gap-8 mb-24 md:mb-0">
                <Card className="min-h-[60vh] p-8 flex flex-col gap-4">
                    <Typography variant="h6" className="text-bold">
                        {steps[activeStep].label}
                    </Typography>
                    <Box>{getScreen()}</Box>
                </Card>
                <Box className="flex items-center justify-end gap-4">
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                        variant="outlined"
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        type="button"
                        onClick={() => formik.handleSubmit()}
                        disabled={formik.isSubmitting || btnLoading}
                    >
                        {btnLoading && (
                            <CircularProgress disableShrink size="small" />
                        )}
                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default VendorCreateForm;
