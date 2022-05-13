/* eslint-disable no-console */
import { ReactElement, useEffect } from 'react';
import {
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
    Stack,
    CardHeader,
    CircularProgress,
    Box,
} from '@mui/material';
import DashboardLayout from 'layouts/DashboardLayout';
import SubHeader, { Menu } from 'components/SubHeader';
import { useAuth } from 'hooks/useAuth';
import { useRouter } from 'next/router';

const subMenu: Menu[] = [
    {
        label: 'X Access Reviews Complete',
    },
    {
        label: '% of Systems compliant to policy',
    },
    {
        label: 'X Users have been Eliminated',
    },
    {
        label: 'X $ have been saved',
    },
];

const Home = () => {
    const { loginUser, loading } = useAuth();
    const router = useRouter();

    console.log('the loginUser: ', loginUser);
    useEffect(() => {
        console.log('hello world');
        if (loginUser === null || !loginUser) {
            router.push('/login');
        } else {
            console.log('what is here: ', loginUser);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginUser]);

    if (loading) {
        return (
            <Box className="h-full w-full flex flex-col items-center justify-center">
                <CircularProgress />
            </Box>
        );
    }
    return (
        <>
            <SubHeader menu={subMenu} />
            <Grid container spacing={2}>
                {['Compliance', 'System Inventory', 'Access Review'].map(
                    (item) => (
                        <Grid item xs={3} key={item}>
                            <Card variant="outlined">
                                <CardHeader
                                    title={
                                        <Typography
                                            sx={{
                                                fontSize: 20,
                                                textAlign: 'center',
                                            }}
                                            textTransform="capitalize"
                                            gutterBottom
                                        >
                                            {item}
                                        </Typography>
                                    }
                                />
                                <CardContent className="w-full flex flex-col justify-between gap-16">
                                    <Stack direction="column" spacing={2}>
                                        <Button variant="contained" fullWidth>
                                            Issues
                                        </Button>

                                        <Button variant="contained" fullWidth>
                                            Agg Info
                                        </Button>
                                    </Stack>
                                    <Button variant="contained" fullWidth>
                                        Recommendation
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                )}
            </Grid>
        </>
    );
};

Home.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
