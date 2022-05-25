import { Box } from '@mui/material';
import { FormikProps } from 'formik';

import { CreateVendorType } from 'pages/vendors/create';
import Input from 'components/Input';
import Select from 'components/Select';
import { serviceOption, vendorStatusOptions } from 'utils/select';

interface GeneralStepsProps {
    formik: FormikProps<CreateVendorType>;
}

const GeneralStep = (props: GeneralStepsProps) => {
    const { formik } = props;
    return (
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 ">
            <Input
                label="Vendor Name"
                name="name"
                placeholder="Vendor Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={(formik.touched.name && formik.errors.name) || ''}
            />
            <Input
                label="Vendor Website"
                name="website"
                placeholder="Vendor Website"
                value={formik.values.website || ''}
                onChange={formik.handleChange}
            />
            <Select
                label="Vendor Service"
                name="service"
                options={serviceOption || []}
                values={formik.values.service || ''}
                onChange={formik.handleChange}
                error={(formik.touched.service && formik.errors.service) || ''}
            />
            <Select
                label="Vendor Status"
                name="status"
                options={vendorStatusOptions || []}
                values={formik.values.status || ''}
                onChange={formik.handleChange}
                error={(formik.touched.status && formik.errors.status) || ''}
            />
        </Box>
    );
};

export default GeneralStep;
