/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from '@mui/material';

import Select from 'components/Select';

import Input from 'components/Input';
import {
    OptionType,
    riskClassificationOptions,
    statusOptions,
} from 'utils/select';

interface ComplianceStepProps {
    formik: any;
    users: OptionType[];
}

const ComplianceStep = (props: ComplianceStepProps) => {
    const { formik, users } = props;
    return (
        <Box className="flex flex-col gap-4">
            {formik.values.compliance?.compliaceTaggedUser && (
                <Typography color="green">
                    You can navigate to next step
                </Typography>
            )}
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <Select
                    label="Assigned To"
                    name="compliance.compliaceTaggedUser"
                    options={users || []}
                    values={formik.values.compliance?.compliaceTaggedUser || ''}
                    onChange={formik.handleChange}
                />

                <Select
                    label="Risk Classification"
                    name="compliance.riskClassification"
                    disabled={
                        formik.values.compliance?.compliaceTaggedUser !==
                        'select'
                    }
                    options={riskClassificationOptions || []}
                    values={formik.values.compliance.riskClassification}
                    onChange={formik.handleChange}
                    error={
                        (Boolean(
                            formik.touched?.compliance?.riskClassification
                        ) &&
                            formik.errors?.compliance?.riskClassification) ||
                        ''
                    }
                />
                <Select
                    label="VRM Status"
                    name="compliance.vrmStatus"
                    disabled={
                        formik.values.compliance?.compliaceTaggedUser !==
                        'select'
                    }
                    options={statusOptions || []}
                    values={formik.values.compliance.vrmStatus}
                    onChange={formik.handleChange}
                    error={
                        (Boolean(formik.touched?.compliance?.vrmStatus) &&
                            formik.errors?.compliance?.vrmStatus) ||
                        ''
                    }
                />
                <Input
                    label="Risk Statement"
                    name="compliance.riskStatement"
                    disabled={
                        formik.values.compliance?.compliaceTaggedUser !==
                        'select'
                    }
                    value={formik.values.compliance.riskStatement}
                    onChange={formik.handleChange}
                    error={
                        (Boolean(formik.touched?.compliance?.riskStatement) &&
                            formik.errors?.compliance?.riskStatement) ||
                        ''
                    }
                />
                <Select
                    label="VRM Questionnaire"
                    name="compliance.vrmQuestionnaire"
                    disabled={
                        formik.values.compliance?.compliaceTaggedUser !==
                        'select'
                    }
                    options={statusOptions || []}
                    values={formik.values.compliance.vrmQuestionnaire}
                    onChange={formik.handleChange}
                    error={
                        (Boolean(
                            formik.touched?.compliance?.vrmQuestionnaire
                        ) &&
                            formik.errors?.compliance?.vrmQuestionnaire) ||
                        ''
                    }
                />
                <Select
                    label="security Assesment"
                    name="compliance.securityAssesment"
                    disabled={
                        formik.values.compliance?.compliaceTaggedUser !==
                        'select'
                    }
                    options={statusOptions || []}
                    values={formik.values.compliance.securityAssesment}
                    onChange={formik.handleChange}
                    error={
                        (Boolean(
                            formik.touched?.compliance?.securityAssesment
                        ) &&
                            formik.errors?.compliance?.securityAssesment) ||
                        ''
                    }
                />
                <Select
                    label="Privacy Review"
                    name="compliance.privacyReview"
                    disabled={
                        formik.values.compliance?.compliaceTaggedUser !==
                        'select'
                    }
                    options={statusOptions || []}
                    values={formik.values.compliance.privacyReview}
                    onChange={formik.handleChange}
                    error={
                        (Boolean(formik.touched?.compliance?.privacyReview) &&
                            formik.errors?.compliance?.privacyReview) ||
                        ''
                    }
                />
                <Select
                    label="Legal Review"
                    name="compliance.legalReview"
                    disabled={
                        formik.values.compliance?.compliaceTaggedUser !==
                        'select'
                    }
                    options={statusOptions || []}
                    values={formik.values.compliance.legalReview}
                    onChange={formik.handleChange}
                    error={
                        (Boolean(formik.touched?.compliance?.legalReview) &&
                            formik.errors?.compliance?.legalReview) ||
                        ''
                    }
                />
            </Box>
        </Box>
    );
};

export default ComplianceStep;
