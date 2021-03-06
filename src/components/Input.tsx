import { Box, FormHelperText, InputLabel, TextField } from '@mui/material';

interface InputProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    value: string;
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    variant?: 'outlined' | 'standard' | 'filled';
}
const Input = (props: InputProps) => {
    const {
        label,
        name,
        type = 'text',
        placeholder = '',
        value = '',
        onChange,
        error = '',
        variant = 'outlined',
        disabled,
    } = props;
    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <Box>
                <InputLabel htmlFor={name}>
                    <strong className="text-gray-700">{label}</strong>
                </InputLabel>
            </Box>
            <TextField
                size="small"
                type={type}
                fullWidth
                name={name}
                value={value}
                onChange={onChange}
                id={name}
                placeholder={placeholder}
                variant={variant}
                disabled={disabled}
                multiline={type === 'textarea'}
                minRows={type === 'textarea' ? 3 : 1}
            />
            {Boolean(error) && (
                <FormHelperText error id="username" color="red">
                    {error}
                </FormHelperText>
            )}
        </Box>
    );
};

export default Input;
