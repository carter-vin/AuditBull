import {
    Stack,
    Box,
    InputLabel,
    FormHelperText,
    Button,
    Alert,
    AlertTitle,
    ListItemText,
    useTheme,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import { NewPasswordType, useAuth } from 'hooks/useAuth';
import React from 'react';
import Password from 'components/Password';

const PasswordUpdateForm = ({ username }: { username: string }) => {
    const { updateNewPassword } = useAuth();
    const theme = useTheme();
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
            px={[8, 16]}
            spacing={8}
        >
            <Box>
                <Image
                    src={
                        theme.palette.mode === 'dark'
                            ? '/logo/ab_no_text_vertical.svg'
                            : '/logo/ab_vertical.svg'
                    }
                    alt="Google"
                    width="120px"
                    height="100px"
                />
            </Box>
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
                    <Password formik={formik} name="password" />

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
