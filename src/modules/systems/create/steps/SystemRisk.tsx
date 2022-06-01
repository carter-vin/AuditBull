import { Box } from '@mui/material';
import Select from 'components/Select';
import { riskClassificationOptions } from 'utils/select';

interface SystemRiskProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: any;
}

const SystemRisk = (props: SystemRiskProps) => {
    const { formik } = props;
    return (
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 ">
            <Select
                label="Criticality"
                name="risk.criticality"
                options={riskClassificationOptions || []}
                values={formik.values.risk.criticality || ''}
                onChange={formik.handleChange}
                error={
                    (formik.touched.risk?.criticality &&
                        formik.errors.risk?.criticality) ||
                    ''
                }
            />
            <Select
                label="Risk Rating"
                name="risk.risk_rating"
                options={riskClassificationOptions || []}
                values={formik.values.risk.risk_rating || ''}
                onChange={formik.handleChange}
                error={
                    (formik.touched.risk?.risk_rating &&
                        formik.errors.risk?.risk_rating) ||
                    ''
                }
            />
        </Box>
    );
};

export default SystemRisk;
