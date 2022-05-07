/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { ReactElement } from 'react';

import Header from 'components/Header';
import SideBar from 'components/SideBar';
import { Box, Stack } from '@mui/material';

interface DashboardLayoutProps {
    children?: ReactElement;
    hideHeader?: boolean;
}
const DashboardLayout = (props: DashboardLayoutProps) => {
    const { children, hideHeader } = props;

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                />
            </Head>
            <Box sx={{ display: 'flex' }}>
                <SideBar logoImg="/vercel.svg" logoText="Audit Bull" />
                <Stack component="main" sx={{ flexGrow: 1 }} spacing={3}>
                    <Box mt={2}>{!hideHeader && <Header />}</Box>
                    <Stack sx={{ flexGrow: 1 }} spacing={4} px={5}>
                        {children}
                    </Stack>
                </Stack>
            </Box>
        </>
    );
};

export default DashboardLayout;
