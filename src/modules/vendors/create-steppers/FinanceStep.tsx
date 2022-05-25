import { Box, InputLabel } from '@mui/material';
import { FormikProps } from 'formik';
import ReactSelect from 'react-select';

import { CreateVendorType } from 'pages/vendors/create';
import Select from 'components/Select';
import { contractOptions, OptionType } from 'utils/select';

interface FinanceStepProps {
    formik: FormikProps<any>;
    users: OptionType[];
}

const FinanceStep = (props: FinanceStepProps) => {
    const { formik, users } = props;
    return (
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <Box className="flex flex-col gap-2">
                <InputLabel htmlFor="assignUser">
                    <strong className="text-gray-700">Assigned To</strong>
                </InputLabel>
                <ReactSelect
                    options={users || []}
                    value={formik.values.finance?.financeTaggedUser || null}
                    onChange={(value) =>
                        formik.setFieldValue('finance.financeTaggedUser', value)
                    }
                />
            </Box>
            <Select
                label="Contact"
                name="finance.contract"
                options={contractOptions || []}
                values={formik.values.finance?.contract || null}
                onChange={formik.handleChange}
            />
        </Box>
    );
};

export default FinanceStep;
