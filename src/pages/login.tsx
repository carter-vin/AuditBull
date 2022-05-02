import type { ReactElement } from 'react';
import BlankLayout from 'layouts/BlankLayout';
import { Grid } from '@mui/material';
import LoginForm from 'modules/auth/LoginForm';

const Login = () => {
    return (
        <Grid container className="h-screen w-screen">
            <Grid item xs={5} className="bg-gray-100">
                <LoginForm />
            </Grid>
            <Grid
                item
                xs={7}
                sx={{
                    background: `url(${'/svgs/login-bg.svg'})`,
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100vh',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                }}
            />
        </Grid>
    );
};

Login.getLayout = (page: ReactElement) => {
    return <BlankLayout>{page}</BlankLayout>;
};

export default Login;
