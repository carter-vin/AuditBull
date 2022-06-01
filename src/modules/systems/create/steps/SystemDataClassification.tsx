import { Box } from '@mui/material';
import Switch from 'components/Switch';

interface SystemRiskProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: any;
}

const SystemDataClassification = (props: SystemRiskProps) => {
    const { formik } = props;
    return (
        <Box className="grid grid-cols-1 gap-1 w-full md:w-2/4 ">
            <Switch
                label="Transmits Or Process PII"
                name="data_classification.transmist_process_pii"
                checked={
                    formik.values?.data_classification?.transmist_process_pii ||
                    false
                }
                onChange={formik.handleChange}
                error={
                    (formik.touched.data_classification
                        ?.transmist_process_pii &&
                        formik.errors.data_classification
                            ?.transmist_process_pii) ||
                    ''
                }
            />
            <Switch
                label="Transmits Or Process PHI"
                name="data_classification.transmist_process_phi"
                checked={
                    formik.values?.data_classification?.transmist_process_phi ||
                    false
                }
                onChange={formik.handleChange}
                error={
                    (formik.touched.data_classification
                        ?.transmist_process_phi &&
                        formik.errors.data_classification
                            ?.transmist_process_phi) ||
                    ''
                }
            />
            <Switch
                label="Transmits Or Process PCI"
                name="data_classification.transmist_process_pci"
                checked={
                    formik.values?.data_classification?.transmist_process_pci ||
                    false
                }
                onChange={formik.handleChange}
                error={
                    (formik.touched.data_classification
                        ?.transmist_process_pci &&
                        formik.errors.data_classification
                            ?.transmist_process_pci) ||
                    ''
                }
            />
        </Box>
    );
};

export default SystemDataClassification;
