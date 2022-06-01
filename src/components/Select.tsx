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
    values: any;
    onChange: any;
    error?: any;
    placeholder?: string;
}

const Select = (props: SelectProps) => {
    const {
        label,
        name,
        options,
        values,
        placeholder,
        error,
        onChange,
        disabled,
    } = props;

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
                renderValue={(selected: any) => {
                    if (!selected) {
                        return <em>{placeholder}</em>;
                    }

                    return selected;
                }}
            >
                {placeholder && (
                    <MenuItem disabled value="">
                        <em>{placeholder}</em>
                    </MenuItem>
                )}
                {options.map((option: OptionType) => (
                    <MenuItem value={option.value} key={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </ReactSelect>
            {Boolean(error) && (
                <FormHelperText error id={name} color="red">
                    {error}
                </FormHelperText>
            )}
        </Box>
    );
};

export default Select;
