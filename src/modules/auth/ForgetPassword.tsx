/* eslint-disable no-nested-ternary */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from 'hooks/useAuth';
import {
    Stack,
    Box,
    InputLabel,
    TextField,
    FormHelperText,
    Button,
    Typography,
} from '@mui/material';
import Password from 'components/Password';

const ForgetPasswordComponent = () => {
    const { forgetPassword, confirmForgetPassword, codeSent } = useAuth();
    const formik = useFormik({
        initialValues: {
            username: '',
            code: '',
            newPassword: '',
        },
        validationSchema: !codeSent
            ? Yup.object().shape({
                  username: Yup.string()
                      .email('Please provide valid email')
                      .required('Email is required'),
              })
            : Yup.object().shape({
                  username: Yup.string()
                      .email('Please provide valid email')
                      .required('Email is required'),
                  code: Yup.string().required('Code is required'),
                  newPassword: Yup.string()
                      .required('No password provided.')
                      .min(
                          8,
                          'Password is too short - should be 8 chars minimum.'
                      )
                      .matches(
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:'
                      ),
              }),
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            if (codeSent) {
                confirmForgetPassword(values);
            } else {
                await forgetPassword(values.username);
            }
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
            <Box width="100%" display="flex" flexDirection="column" gap={1}>
                <Typography variant="h4" className="font-bold">
                    Forget Password
                </Typography>
            </Box>
            <Stack width="100%" spacing={2}>
                <Box display="flex" flexDirection="column" gap={1}>
                    <Box>
                        <InputLabel htmlFor="username">
                            <strong className="text-gray-700">Email</strong>
                        </InputLabel>
                    </Box>
                    <TextField
                        size="small"
                        fullWidth
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        id="username"
                        placeholder="johndoe"
                        variant="outlined"
                    />
                    {Boolean(
                        formik.touched.username && formik.errors.username
                    ) && (
                        <FormHelperText error id="username" color="red">
                            {formik.errors.username}
                        </FormHelperText>
                    )}
                </Box>
                {codeSent && (
                    <>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Box>
                                <InputLabel htmlFor="code">
                                    <strong className="text-gray-700">
                                        Code
                                    </strong>
                                </InputLabel>
                            </Box>
                            <TextField
                                size="small"
                                fullWidth
                                name="code"
                                value={formik.values.code}
                                onChange={formik.handleChange}
                                id="code"
                                placeholder="johndoe"
                                variant="outlined"
                            />
                            {Boolean(
                                formik.touched.code && formik.errors.code
                            ) && (
                                <FormHelperText error id="code" color="red">
                                    {formik.errors.code}
                                </FormHelperText>
                            )}
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="flex-start"
                            gap={1}
                        >
                            <InputLabel htmlFor="newPassword">
                                <strong className="text-gray-700">
                                    New Password
                                </strong>
                            </InputLabel>
                            <Password formik={formik} name="newPassword" />

                            {Boolean(
                                formik.touched.newPassword &&
                                    formik.errors.newPassword
                            ) && (
                                <FormHelperText
                                    error
                                    id="newPassword"
                                    color="red"
                                >
                                    {formik.errors.newPassword}
                                </FormHelperText>
                            )}
                        </Box>
                    </>
                )}
                <Button
                    variant="contained"
                    disabled={!formik.values.username}
                    onClick={() => formik.handleSubmit()}
                >
                    {formik.isSubmitting
                        ? 'lodaing...'
                        : codeSent
                        ? 'Update Password'
                        : 'Proceed'}
                </Button>
            </Stack>
        </Stack>
    );
};

export default ForgetPasswordComponent;
