import {
    Stack,
    Box,
    InputLabel,
    TextField,
    FormHelperText,
    Button,
    Alert,
    AlertTitle,
    ListItemText,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NewPasswordType, useAuth } from 'hooks/useAuth';
import React from 'react';

const PasswordUpdateForm = ({ username }: { username: string }) => {
    const { updateNewPassword } = useAuth();
    const formik = useFormik<NewPasswordType>({
        initialValues: {
            password: '',
            username,
        },
        validationSchema: Yup.object().shape({
            password: Yup.string()
                .required('No password provided.')
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:'
                ),
        }),
        onSubmit: async (values: NewPasswordType, { setSubmitting }) => {
            setSubmitting(true);
            await updateNewPassword(values);
            setSubmitting(false);
        },
    });
    return (
        <Stack
            direction="column"
            justifyContent="center"
            justifyItems="center"
            alignItems="center"
            height="100vh"
            width="100%"
            px={16}
            spacing={8}
        >
            <Stack width="100%" spacing={2}>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    gap={1}
                >
                    <InputLabel htmlFor="password">
                        <strong className="text-gray-700">New Password</strong>
                    </InputLabel>
                    <TextField
                        size="small"
                        type="password"
                        fullWidth
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        placeholder="********"
                        variant="outlined"
                    />

                    {Boolean(
                        formik.touched.password && formik.errors.password
                    ) && (
                        <FormHelperText error id="password" color="red">
                            {formik.errors.password}
                        </FormHelperText>
                    )}
                </Box>

                <Alert severity="info">
                    <AlertTitle>Password Pattern</AlertTitle>
                    <Stack
                        direction="column"
                        justifyContent="flex-start"
                        justifyItems="flex-start"
                        alignItems="flex-start"
                    >
                        <ListItemText primary="Password must be of 8 character" />
                        <ListItemText primary="Password must have capitale letter" />
                        <ListItemText primary="Password must have sepcial letter" />
                        <ListItemText primary="Password must have digits letter" />
                    </Stack>
                </Alert>

                <Button
                    variant="contained"
                    disabled={!formik.values.password}
                    onClick={() => formik.handleSubmit()}
                >
                    Update Password
                </Button>
            </Stack>
        </Stack>
    );
};

export default PasswordUpdateForm;
