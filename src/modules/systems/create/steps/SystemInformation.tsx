import { Box } from '@mui/material';
import Input from 'components/Input';
import Select from 'components/Select';
import Switch from 'components/Switch';
import { compilantOptions, locationOptions } from 'utils/select';

interface SystemInformationProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: any;
}
const SystemInformation = (props: SystemInformationProps) => {
    const { formik } = props;
    return (
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 ">
            <Input
                label="System Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={(formik.touched.name && formik.errors.name) || ''}
            />
            <Select
                label="System Status"
                name="status"
                options={compilantOptions || []}
                values={formik.values.status || ''}
                onChange={formik.handleChange}
                error={(formik.touched.status && formik.errors.status) || ''}
            />
            <Input
                label="System Owner"
                name="owner"
                value={formik.values.owner}
                onChange={formik.handleChange}
                error={(formik.touched.owner && formik.errors.owner) || ''}
            />
            <Select
                label="Type"
                name="type"
                options={compilantOptions || []}
                values={formik.values.type || ''}
                onChange={formik.handleChange}
                error={(formik.touched.type && formik.errors.type) || ''}
            />
            <Box className="flex flex-col gap-3">
                <Select
                    label="Location"
                    name="location.type"
                    options={locationOptions || []}
                    values={formik.values?.location?.type || ''}
                    onChange={formik.handleChange}
                    error={
                        (formik.touched?.location?.type &&
                            formik.errors?.location?.type) ||
                        ''
                    }
                />
                {formik.values?.location?.type === 'other' && (
                    <Input
                        label="Other Location"
                        name="location.other_location"
                        value={formik.values?.location?.other_location}
                        onChange={formik.handleChange}
                        error={
                            (formik.touched?.location?.location
                                ?.other_location &&
                                formik.errors?.location?.other_location) ||
                            ''
                        }
                    />
                )}
            </Box>
            <Input
                label="Description"
                type="textarea"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                    (formik.touched.description && formik.errors.description) ||
                    ''
                }
            />
            <Box className="flex flex-col gap-2">
                <Switch
                    label="Vendor provided system ?"
                    name="vendor.vendor_provided"
                    checked={formik.values?.vendor?.vendor_provided || false}
                    onChange={formik.handleChange}
                    error={
                        (formik.touched.vendor?.vendor_provided &&
                            formik.errors.vendor?.vendor_provided) ||
                        ''
                    }
                />
                {formik.values?.vendor?.vendor_provided && (
                    <Select
                        label="Vendor"
                        name="vendor.vendor"
                        options={compilantOptions || []}
                        values={formik.values?.vendor?.vendor || ''}
                        onChange={formik.handleChange}
                        error={
                            (formik.touched.vendor?.vendor &&
                                formik.errors.vendor?.vendor) ||
                            ''
                        }
                    />
                )}
            </Box>
            <Switch
                label="Is this customer facing information system ?"
                name="customer_facing_info_system"
                checked={formik.values.customer_facing_info_system || false}
                onChange={formik.handleChange}
                error={
                    (formik.touched.customer_facing_info_system &&
                        formik.errors.customer_facing_info_system) ||
                    ''
                }
            />
        </Box>
    );
};

export default SystemInformation;
