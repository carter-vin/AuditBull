import { useFormik } from 'formik';
import * as Yup from 'yup';

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

type LoginPayload = {
    email: string;
    password: string;
    rememberme: boolean;
};

const LoginForm = () => {
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
        onSubmit: (values: LoginPayload) => {
            // eslint-disable-next-line no-console
            console.log('the values are', values);
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
            <Box width="100%" display="flex" flexDirection="column" gap={1}>
                <Typography variant="h4" className="font-bold">
                    Log in
                </Typography>
                <Typography>
                    Welcome to <strong>Audit Bull</strong>, <br /> Enter your
                    credentials to access your account
                </Typography>
                <ButtonGroup
                    fullWidth
                    variant="outlined"
                    aria-label="outlined primary button group"
                >
                    <Button startIcon={<GoogleIcon />}>Google</Button>
                    <Button startIcon={<AcUnitIcon />}>Slack</Button>
                    <Button startIcon={<GroupsIcon />}>teams</Button>
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
                <Box display="flex" flexDirection="column" gap={1}>
                    <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <InputLabel htmlFor="password">
                            <strong className="text-gray-700">Password</strong>
                        </InputLabel>
                        <Button variant="text">Forget Password ?</Button>
                    </Box>
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
