import { ReactElement } from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
    Stack,
    CardHeader,
} from '@mui/material';

import DashboardLayout from 'layouts/DashboardLayout';
import SubHeader, { Menu } from 'components/SubHeader';

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
