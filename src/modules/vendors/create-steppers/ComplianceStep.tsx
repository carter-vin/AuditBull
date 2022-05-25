import { Box, InputLabel } from '@mui/material';
import { FormikProps } from 'formik';

import { CreateVendorType } from 'pages/vendors/create';
import Select from 'components/Select';

import Input from 'components/Input';
import ReactSelect from 'react-select';
import {
    OptionType,
    riskClassificationOptions,
    statusOptions,
} from 'utils/select';

interface ComplianceStepProps {
    formik: FormikProps<any>;
    users: OptionType[];
}

const ComplianceStep = (props: ComplianceStepProps) => {
    const { formik, users } = props;
    return (
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <Box className="flex flex-col gap-2">
                <InputLabel htmlFor="assignUser">
                    <strong className="text-gray-700">Assigned To</strong>
                </InputLabel>
                <ReactSelect
                    options={users || []}
                    value={
                        formik.values.compliance?.compliaceTaggedUser || null
                    }
                    onChange={(value) =>
                        formik.setFieldValue(
                            'compliance.compliaceTaggedUser',
                            value
                        )
                    }
                />
            </Box>
            <Select
                label="Risk Classification"
                name="compliance.riskClassification"
                options={riskClassificationOptions || []}
                values={formik.values.compliance.riskClassification}
                onChange={formik.handleChange}
            />
            <Select
                label="VRM Status"
                name="compliance.vrmStatus"
                options={statusOptions || []}
                values={formik.values.compliance.vrmStatus}
                onChange={formik.handleChange}
            />
            <Input
                label="Risk Statement"
                name="compliance.riskStatement"
                value={formik.values.compliance.riskStatement}
                onChange={formik.handleChange}
            />
            <Select
                label="VRM Questionnaire"
                name="compliance.vrmQuestionnaire"
                options={statusOptions || []}
                values={formik.values.compliance.vrmQuestionnaire}
                onChange={formik.handleChange}
            />
            <Select
                label="security Assesment"
                name="compliance.securityAssesment"
                options={statusOptions || []}
                values={formik.values.compliance.securityAssesment}
                onChange={formik.handleChange}
            />
            <Select
                label="Privacy Review"
                name="compliance.privacyReview"
                options={statusOptions || []}
                values={formik.values.compliance.privacyReview}
                onChange={formik.handleChange}
            />
            <Select
                label="Legal Review"
                name="compliance.legalReview"
                options={statusOptions || []}
                values={formik.values.compliance.legalReview}
                onChange={formik.handleChange}
            />
        </Box>
    );
};

export default ComplianceStep;
