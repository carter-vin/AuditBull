import {
    Stack,
    Box,
    InputLabel,
    TextField,
    FormHelperText,
    Button,
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
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values: NewPasswordType, { setSubmitting }) => {
            setSubmitting(true);
            updateNewPassword(values);
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
