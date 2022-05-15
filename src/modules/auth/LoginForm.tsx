/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable default-case */
/* eslint-disable import/no-extraneous-dependencies */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Auth } from 'aws-amplify';
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
import PasswordUpdateForm from './PasswordUpdateForm';

type LoginPayload = {
    username: string;
    password: string;
    rememberme: boolean;
    new_password: string;
};

const LoginForm = () => {
    const { loginBySlack, loginByAzure, loginByUserName, newPasswordButton } =
        useAuth();

    const formik = useFormik<LoginPayload>({
        initialValues: {
            username: '',
            password: '',
            new_password: '',
            rememberme: false,
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (
            values: LoginPayload,
            { setSubmitting, resetForm }
        ) => {
            setSubmitting(true);
            loginByUserName(values);
            resetForm();
            setSubmitting(false);
        },
    });

    if (newPasswordButton) {
        return <PasswordUpdateForm username={formik.values.username} />;
    }

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
                        onClick={() => loginByAzure()}
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
                            <strong className="text-gray-700">Username</strong>
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
                {newPasswordButton && (
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-start"
                        gap={1}
                    >
                        <InputLabel htmlFor="password">
                            <strong className="text-gray-700">
                                New Password
                            </strong>
                        </InputLabel>
                        <TextField
                            size="small"
                            type="new_password"
                            fullWidth
                            id="new_password"
                            name="new_password"
                            value={formik.values.new_password}
                            onChange={formik.handleChange}
                            placeholder="********"
                            variant="outlined"
                        />

                        {Boolean(
                            formik.touched.new_password &&
                                formik.errors.new_password
                        ) && (
                            <FormHelperText error id="new_password" color="red">
                                {formik.errors.new_password}
                            </FormHelperText>
                        )}
                    </Box>
                )}

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
                    disabled={newPasswordButton && !formik.values.new_password}
                    onClick={() => formik.handleSubmit()}
                >
                    {formik.isSubmitting ? 'lodaing...' : 'Login'}
                </Button>
            </Stack>
        </Stack>
    );
};

export default LoginForm;
