import {
    Box,
    FormHelperText,
    InputLabel,
    Switch as MUISwitch,
} from '@mui/material';

interface TextAreaProps {
    label: string;
    name: string;
    checked: boolean;
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}
const Switch = (props: TextAreaProps) => {
    const {
        label,
        name,
        checked = false,
        onChange,
        error = '',
        disabled,
    } = props;
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyItems="center"
                justifyContent="space-between"
                gap={1}
            >
                <Box className="3/4">
                    <InputLabel htmlFor={name}>
                        <strong className="text-gray-700">{label}</strong>
                    </InputLabel>
                </Box>
                <MUISwitch
                    name={name}
                    checked={checked}
                    disabled={disabled}
                    onChange={onChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </Box>
            {Boolean(error) && (
                <FormHelperText error id="username" color="red">
                    {error}
                </FormHelperText>
            )}
        </Box>
    );
};

export default Switch;
