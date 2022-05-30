import {
    Box,
    InputLabel,
    MenuItem,
    FormHelperText,
    Select as ReactSelect,
} from '@mui/material';

type OptionType = {
    label: string;
    value: string;
};
interface SelectProps {
    label?: string;
    name: string;
    disabled?: boolean;
    options: OptionType[];
    values: OptionType;
    onChange: any;
    error?: any;
}

const Select = (props: SelectProps) => {
    const { label, name, options, values, error, onChange, disabled } = props;

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            {label && (
                <Box>
                    <InputLabel htmlFor="email">
                        <strong className="text-gray-700"> {label} </strong>
                    </InputLabel>
                </Box>
            )}
            <ReactSelect
                size="small"
                labelId={name}
                id={name}
                value={values || ''}
                name={name}
                onChange={onChange}
                disabled={disabled}
                placeholder="Select Options"
            >
                <MenuItem value="select">Choose Options</MenuItem>
                {options.map((option: OptionType) => (
                    <MenuItem value={option.value} key={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </ReactSelect>
            {Boolean(error) && (
                <FormHelperText error id="username" color="red">
                    {error}
                </FormHelperText>
            )}
        </Box>
    );
};

export default Select;
