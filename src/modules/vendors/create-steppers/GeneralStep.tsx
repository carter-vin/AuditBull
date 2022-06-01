/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';

import Input from 'components/Input';
import Select from 'components/Select';
import { serviceOption, vendorStatusOptions } from 'utils/select';
import MultipleSelect from 'components/MultipleSelect';

interface GeneralStepsProps {
    formik: any;
}

const GeneralStep = (props: GeneralStepsProps) => {
    const { formik } = props;

    return (
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 ">
            <Input
                label="Vendor Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={(formik.touched.name && formik.errors.name) || ''}
            />
            <Input
                label="Vendor Website"
                name="website"
                value={formik.values.website || ''}
                onChange={formik.handleChange}
            />
            <MultipleSelect
                label="breath of service"
                name="service"
                options={serviceOption}
                values={formik.values.service || {}}
                onChange={(values: any) => {
                    formik.setFieldValue('service', values);
                }}
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
