/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Card,
    useTheme,
    useMediaQuery,
    Typography,
} from '@mui/material';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQuery } from 'react-query';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { omit, filter, map } from 'lodash';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import DashboardLayout from 'layouts/DashboardLayout';
import VendorHeader from 'modules/vendors/components/VendorHeader';
import GeneralStep from 'modules/vendors/create-steppers/GeneralStep';
import ComplianceStep from 'modules/vendors/create-steppers/ComplianceStep';
import FinanceStep from 'modules/vendors/create-steppers/FinanceStep';
import UseCaseStep from 'modules/vendors/create-steppers/UseCaseStep';
import { OptionType } from 'utils/select';
import Success from 'components/Success';

export interface CreateVendorType {
    name: string;
    website: string;
    service: any;
    status: any;
    riskClassification: any;
    riskStatement: string;
    vrmStatus: any;
    vrmQuestionnaire: any;
    securityAssesment: any;
    privacyReview: any;
    legalReview: any;
    contract: any;
    useCases: any;
}

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
                is: (compliaceTaggedUser: any) => !compliaceTaggedUser,
                then: Yup.string().required('Risk Statement is required'),
            }),
            riskClassification: Yup.string().when('compliaceTaggedUser', {
                is: (compliaceTaggedUser: any) => !compliaceTaggedUser,
                then: Yup.string().required('Risk Classification is required'),
            }),
            vrmStatus: Yup.string().when('compliaceTaggedUser', {
                is: (compliaceTaggedUser: any) => !compliaceTaggedUser,
                then: Yup.string().required('VRM is required'),
            }),
            vrmQuestionnaire: Yup.string().when('compliaceTaggedUser', {
                is: (compliaceTaggedUser: any) => !compliaceTaggedUser,
                then: Yup.string().required('VRM questionnarie is required'),
            }),
            securityAssesment: Yup.string().when('compliaceTaggedUser', {
                is: (compliaceTaggedUser: any) => !compliaceTaggedUser,
                then: Yup.string().required('Security assesment is required'),
            }),
            privacyReview: Yup.string().when('compliaceTaggedUser', {
                is: (compliaceTaggedUser: any) => !compliaceTaggedUser,
                then: Yup.string().required('Privacy review is required'),
            }),
            legalReview: Yup.string().when('compliaceTaggedUser', {
                is: (compliaceTaggedUser: any) => !compliaceTaggedUser,
                then: Yup.string().required('Legal review is required'),
            }),
        }),
    }),
    Yup.object().shape({
        useCases: Yup.object().shape({
            useCaseTaggedUser: Yup.string().nullable(),
            owner: Yup.string().when('useCaseTaggedUser', {
                is: (useCaseTaggedUser: any) => !useCaseTaggedUser,
                then: Yup.string().required('Owner is required'),
            }),
            description: Yup.string().when('useCaseTaggedUser', {
                is: (useCaseTaggedUser: any) => !useCaseTaggedUser,
                then: Yup.string().required('Description is required'),
            }),
            dataUsage: Yup.array().when('useCaseTaggedUser', {
                is: (useCaseTaggedUser: any) => !useCaseTaggedUser,
                then: Yup.array().min(1, 'Data Usage is required'),
            }),
        }),
    }),
    Yup.object().shape({
        finance: Yup.object().shape({
            financeTaggedUser: Yup.string().nullable(),
            contracts: Yup.array().when('financeTaggedUser', {
                is: (financeTaggedUser: any) => !financeTaggedUser,
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

const CreateVendor = () => {
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

    const formik = useFormik<any>({
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
        onSubmit: async (values: any, { setSubmitting }) => {
            if (activeStep === steps.length - 1) {
                setSubmitting(true);
                if (values.finance.contracts.length > 0) {
                    map(values.finance.contracts, async (contract: any) => {
                        omit(contract, ['file']);
                    });
                }
                const createVendorMutation = `
                    mutation CreateVendor {
                        createVendors(input: {
                            compliance: ${JSON.stringify(
                                JSON.stringify(values.compliance)
                            )},
                            finance:${JSON.stringify(
                                JSON.stringify(values.finance)
                            )},
                            name: "${values.name}",
                            status:"${values.status}",
                            service: ${JSON.stringify(
                                JSON.stringify(values.service)
                            )},
                            website: "${values.website}",
                            use_cases: ${JSON.stringify(
                                JSON.stringify(values.useCases)
                            )}
                        }) {
                            id
                        }
                    }
                `;
                // eslint-disable-next-line no-console
                const res: any = await API.graphql(
                    graphqlOperation(createVendorMutation)
                );
                if (res && res.data) {
                    setSuccess(true);
                } else {
                    toast.error(res.error.message || 'Error adding note');
                }
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
        return <p>Loading</p>;
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
        <Box className="flex flex-col gap-12 ">
            <VendorHeader breadcrumb="Create Vendor" hideCTA />
            <Box className="md:px-12 ">
                <Box className="flex flex-col gap-8 justify-start  flex-1">
                    <Box className="flex justify-start flex-col md:flex-row">
                        <Stepper
                            orientation={
                                verticalStepper ? 'vertical' : 'horizontal'
                            }
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
                                disabled={formik.isSubmitting}
                            >
                                {activeStep === steps.length - 1
                                    ? 'Submit'
                                    : 'Next'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

CreateVendor.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};
export default CreateVendor;
