/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable default-case */
/* eslint-disable import/no-extraneous-dependencies */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

import {
    Box,
    Button,
    TextField,
    InputLabel,
    Stack,
    Typography,
    Checkbox,
    FormControlLabel,
    Divider,
    ButtonGroup,
    FormHelperText,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import GroupsIcon from '@mui/icons-material/Groups';
import { useAuth } from 'hooks/useAuth';

type LoginPayload = {
    email: string;
    password: string;
    rememberme: boolean;
};

const LoginForm = () => {
    const { loginBySlack } = useAuth();

    const formik = useFormik<LoginPayload>({
        initialValues: {
            email: '',
            password: '',
            rememberme: false,
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Please provide valid email')
                .required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values: LoginPayload, { setSubmitting }) => {
            setSubmitting(true);
            await Auth.signIn({
                username: values.email,
                password: values.password,
            });
            setSubmitting(false);
        },
    });

    const signUpMe = async () => {
        await Auth.signUp({
            username: 'something@gmail.com',
            password: '12345678',
            attributes: {
                email: 'something@gmail.com',
            },
        });
    };

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
            <Box width="100%" display="flex" flexDirection="column" gap={1}>
                <Typography variant="h4" className="font-bold">
                    Log in
                </Typography>
                <Typography>
                    Welcome to <strong>AuditBull</strong>, <br /> Enter your
                    credentials to access your account
                </Typography>
                <ButtonGroup
                    fullWidth
                    variant="outlined"
                    aria-label="outlined primary button group"
                >
                    <Button
                        startIcon={<GoogleIcon />}
                        onClick={() =>
                            Auth.federatedSignIn({
                                provider:
                                    CognitoHostedUIIdentityProvider.Google,
                            })
                        }
                    >
                        Google
                    </Button>
                    <Button
                        startIcon={<AcUnitIcon />}
                        onClick={() => loginBySlack()}
                    >
                        Slack
                    </Button>
                    <Button
                        startIcon={<GroupsIcon />}
                        onClick={() =>
                            Auth.federatedSignIn({
                                customProvider: 'azure',
                            })
                        }
                    >
                        teams
                    </Button>
                </ButtonGroup>
            </Box>
            <Divider>OR</Divider>
            <Stack width="100%" spacing={2}>
                <Box display="flex" flexDirection="column" gap={1}>
                    <Box>
                        <InputLabel htmlFor="email">
                            <strong className="text-gray-700">
                                Email address
                            </strong>
                        </InputLabel>
                    </Box>
                    <TextField
                        size="small"
                        fullWidth
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        id="email"
                        placeholder="john@gmail.com"
                        variant="outlined"
                    />
                    {Boolean(formik.touched.email && formik.errors.email) && (
                        <FormHelperText error id="email" color="red">
                            {formik.errors.email}
                        </FormHelperText>
                    )}
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    gap={1}
                >
                    <InputLabel htmlFor="password">
                        <strong className="text-gray-700">Password</strong>
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
                    <Box mr={-1} display="flex" justifyContent="flex-end">
                        <Button variant="text">Forget Password ?</Button>
                    </Box>

                    {Boolean(
                        formik.touched.password && formik.errors.password
                    ) && (
                        <FormHelperText error id="password" color="red">
                            {formik.errors.password}
                        </FormHelperText>
                    )}
                </Box>
                <Box>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="rememberme"
                                checked={formik.values.rememberme}
                                onChange={formik.handleChange}
                                aria-label="Remember Information"
                                aria-labelledby="Remember Information"
                            />
                        }
                        label="Remember Information"
                    />
                </Box>

                <Button
                    variant="contained"
                    onClick={() => formik.handleSubmit()}
                >
                    Login
                </Button>
            </Stack>
        </Stack>
    );
};

export default LoginForm;
