/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from '@mui/material';
import Input from 'components/Input';
import MultipleSelect from 'components/MultipleSelect';
import Select from 'components/Select';
import { dataUsageOption, OptionType } from 'utils/select';

interface UseCaseStepProps {
    formik: any;
    users: OptionType[];
}

const UseCaseStep = (props: UseCaseStepProps) => {
    const { formik, users } = props;
    return (
        <Box className="flex flex-col gap-4">
            {formik.values.useCases?.useCaseTaggedUser && (
                <Typography color="green">
                    You can navigate to next step
                </Typography>
            )}
            <Box className="flex flex-col">
                <Box className="w-1/4">
                    <Select
                        label="Assigned To"
                        name="useCases.useCaseTaggedUser"
                        options={users || []}
                        values={formik.values.useCases.useCaseTaggedUser || ''}
                        onChange={formik.handleChange}
                    />
                </Box>
            </Box>
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <Input
                    label="Owner Name"
                    name="useCases.owner"
                    value={formik.values.useCases?.owner || ''}
                    onChange={formik.handleChange}
                    disabled={formik.values.useCases?.useCaseTaggedUser}
                    error={
                        (Boolean(formik.touched?.useCases?.owner) &&
                            formik.errors?.useCases?.owner) ||
                        ''
                    }
                />
                <Input
                    label="Description "
                    name="useCases.description"
                    value={formik.values.useCases?.description || ''}
                    onChange={formik.handleChange}
                    disabled={formik.values.useCases?.useCaseTaggedUser}
                    error={
                        (Boolean(formik.touched?.useCases?.description) &&
                            formik.errors?.useCases?.description) ||
                        ''
                    }
                />
                <MultipleSelect
                    name="useCases.dataUsage"
                    disabled={formik.values.useCases?.useCaseTaggedUser}
                    options={dataUsageOption}
                    values={formik.values.useCases?.dataUsage || []}
                    onChange={(values: any) =>
                        formik.setFieldValue('useCases.dataUsage', values)
                    }
                />
            </Box>
        </Box>
    );
};

export default UseCaseStep;
