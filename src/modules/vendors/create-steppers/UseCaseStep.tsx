import { Box, Paper, InputLabel, useTheme } from '@mui/material';
import Input from 'components/Input';
import Select from 'components/Select';
import { FormikProps } from 'formik';
import { CreateVendorType } from 'pages/vendors/create';
import ReactSelect from 'react-select';
import { dataUsageOption, OptionType } from 'utils/select';

interface UseCaseStepProps {
    formik: FormikProps<CreateVendorType>;
    users: OptionType[];
}

const UseCaseStep = (props: UseCaseStepProps) => {
    const { formik, users } = props;
    const theme = useTheme();
    const customStyles = {
        menu: () => ({
            backgroundColor:
                theme.palette.mode === 'dark' ? '#212839' : 'white',
        }),
    };
    return (
        <Box className="flex flex-col gap-4">
            <Box className="flex flex-col md:flex-row md:items-end justify-between">
                <Box className="w-full md:w-1/4 flex flex-col gap-2">
                    <InputLabel htmlFor="assignUser">
                        <strong className="text-gray-700">Assigned To</strong>
                    </InputLabel>
                    <Paper>
                        <ReactSelect
                            options={users || []}
                            value={
                                formik.values.useCases?.useCaseTaggedUser ||
                                null
                            }
                            styles={customStyles}
                            onChange={(value) =>
                                formik.setFieldValue(
                                    'useCases.useCaseTaggedUser',
                                    value
                                )
                            }
                        />
                    </Paper>
                </Box>
                {/* <Box>
                    <Button variant="contained">Add New Use Case</Button>
                </Box> */}
            </Box>
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <Input
                    label="Owner Name"
                    name="useCases.owner"
                    value={formik.values.useCases?.owner || ''}
                    onChange={formik.handleChange}
                    placeholder="Enter Owner Name"
                />
                <Input
                    label="Description "
                    name="useCases.description"
                    value={formik.values.useCases?.description || ''}
                    onChange={formik.handleChange}
                    placeholder="Enter Description"
                />
                <Select
                    label="Data Usage"
                    name="useCases.dataUsage"
                    options={dataUsageOption}
                    values={formik.values.useCases?.dataUsage || ''}
                    onChange={formik.handleChange}
                />
            </Box>
        </Box>
    );
};

export default UseCaseStep;
