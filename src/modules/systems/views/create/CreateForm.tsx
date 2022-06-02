import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Stepper, { StepperStepsType } from 'components/Stepper';
import Success from 'components/Success';
import { AppRoute } from 'utils/route';

import SystemCompliance from './steps/SystemCompliance';
import SystemInformation from './steps/SystemInformation';
import SystemRisk from './steps/SystemRisk';
import SystemDataClassification from './steps/SystemDataClassification';

import { createSystem } from '../../service';

const validationSchema = [
    Yup.object().shape({
        name: Yup.string().required('Vendor Name is required'),
        status: Yup.string().required('Status is required'),
        owner: Yup.object().shape({
            value: Yup.string().required('Owner is required'),
            label: Yup.string().required('Owner is required'),
        }),
        type: Yup.string().required('Type is required'),
        description: Yup.string().required('Description is required'),
        vendor: Yup.object().shape({
            vendor_provided: Yup.boolean().required('Is vendor is provided ?'),
            vendor: Yup.object().when('vendor_provided', {
                is: (vendorProvied: boolean) => vendorProvied,
                then: Yup.object().shape({
                    value: Yup.string().required('Vendor is required'),
                    label: Yup.string().required('Vendor is required'),
                }),
            }),
        }),
        location: Yup.object().shape({
            type: Yup.string().required('Location is required'),
            other_location: Yup.string().when('type', {
                is: (type: string) => String(type) === 'other',
                then: Yup.string().required('Other Location is required'),
            }),
        }),
        customer_facing_info_system: Yup.boolean().required(
            'Is customer facting information system ?'
        ),
    }),
    Yup.object().shape({
        risk: Yup.object().shape({
            criticality: Yup.string().required('Criticality is required'),
            risk_rating: Yup.string().required('Risk Rating is required'),
        }),
    }),
    Yup.object().shape({
        data_classification: Yup.object().shape({
            transmist_process_pii: Yup.boolean().required(
                'Transmits Or Process PII is required'
            ),
            transmist_process_phi: Yup.boolean().required(
                'Transmits Or Process PHI is required'
            ),
            transmist_process_pci: Yup.boolean().required(
                'Transmits Or Process PCI is required'
            ),
        }),
    }),
    Yup.object().shape({
        compliance: Yup.object().shape({
            last_access_review_date: Yup.string().required(
                'Last Access Review is required'
            ),
            last_access_review_result: Yup.string().required(
                'Last Access Review Result is required'
            ),
            next_access_review_date: Yup.string().required(
                'Next Access Review is required'
            ),
            periodic_review: Yup.string().required(
                'Periodic Access Review is required'
            ),
            role_based_access: Yup.array().min(
                1,
                'Roles Based Access Control Information is required'
            ),
        }),
    }),
];

const CreateForm = () => {
    const totalSteps = 4;
    const router = useRouter();
    const [activeStep, setActiveStep] = useState<number>(0);
    const [success, setSuccess] = useState<boolean>(false);

    const { isLoading, mutate } = useMutation(createSystem, {
        mutationKey: 'createSystem',
        onSuccess: () => {
            setSuccess(true);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            const message =
                error?.errors[0].message ||
                error.response?.data?.message ||
                'Failed to add system';
            toast.error(message);
        },
    });
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleNextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const formik = useFormik({
        initialValues: {
            name: '',
            status: '',
            owner: {
                value: '',
                label: '',
            },
            type: '',
            description: '',
            vendor: {
                vendor_provided: false,
                vendor: {
                    value: '',
                    label: '',
                },
            },
            customer_facing_info_system: false,
            location: {
                type: '',
                other_location: '',
            },
            risk: {
                criticality: '',
                risk_rating: '',
            },
            data_classification: {
                transmist_process_pii: false,
                transmist_process_phi: false,
                transmist_process_pci: false,
            },
            compliance: {
                last_access_review_date: '',
                last_access_review_result: '',
                next_access_review_date: '',
                periodic_review: '',
                role_based_access: [],
            },
        },
        validationSchema: validationSchema[activeStep],
        onSubmit: (values, { setSubmitting }) => {
            if (activeStep === totalSteps - 1) {
                setSubmitting(true);
                mutate(values);
                setSubmitting(false);
            } else {
                handleNextStep();
            }
        },
    });
    const steps: StepperStepsType[] = [
        {
            label: 'System Information',
            component: <SystemInformation formik={formik} />,
        },
        {
            label: 'System Risk',
            component: <SystemRisk formik={formik} />,
        },
        {
            label: 'Data Classification',
            component: <SystemDataClassification formik={formik} />,
        },
        {
            label: 'Compliance',
            component: <SystemCompliance formik={formik} />,
        },
    ];

    if (success) {
        return (
            <Success
                callback={() => router.push(AppRoute.SystemList)}
                callbackLabel="Back to system list"
                description="System created successfully"
            />
        );
    }

    return (
        <Stepper
            activeStep={activeStep}
            steps={steps || []}
            isDisabled={isLoading}
            handleBack={handleBack}
            isLoading={isLoading}
            handleSubmit={() => formik.handleSubmit()}
        />
    );
};

export default CreateForm;
