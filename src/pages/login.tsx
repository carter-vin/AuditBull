import { ReactElement, useEffect } from 'react';
import BlankLayout from 'layouts/BlankLayout';
import { Box, CircularProgress, Grid } from '@mui/material';
import LoginForm from 'modules/auth/LoginForm';
import { useAuth } from 'hooks/useAuth';
import { useRouter } from 'next/router';

const Login = () => {
    const { loginUser, loading } = useAuth();
    const router = useRouter();
    const redirectPath = router?.query?.redirect || '/';
    useEffect(() => {
        if (loginUser !== null || loginUser) {
            router.push(String(redirectPath));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginUser]);
    if (loading) {
        return (
            <Box className="h-screen w-screen flex flex-col items-center justify-center">
                <CircularProgress />
            </Box>
        );
    }
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
