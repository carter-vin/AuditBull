import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { useState } from 'react';

import { VisibilityOff, Visibility } from '@mui/icons-material';

interface PasswordProps {
    formik: any;
    name: string;
}

const Password = (props: PasswordProps) => {
    const { formik, name } = props;
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <OutlinedInput
            size="small"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            id={name}
            name={name}
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="********"
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
        />
    );
};

export default Password;
