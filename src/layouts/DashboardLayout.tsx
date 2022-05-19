/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { ReactElement, useState } from 'react';

import Header from 'components/Header';
import SideBar, { SideBarType } from 'components/SideBar';
import { Box, Stack } from '@mui/material';

// icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import CommentIcon from '@mui/icons-material/Comment';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

import { AppRoute } from 'utils/route';

interface DashboardLayoutProps {
    children?: ReactElement;
    hideHeader?: boolean;
}

const sidebar: SideBarType = {
    links: [
        {
            name: 'Metrics/Dashboard',
            url: AppRoute.Dashboard,
            key: '/',
            icon: <DashboardIcon />,
        },
        {
            name: 'Vendor List',
            url: AppRoute.Vendors,
            key: '/vendors',
            className: 'mt-5',
            icon: <DeliveryDiningIcon />,
        },
        {
            name: 'Onboarding',
            url: AppRoute.Onboarding,
            key: '/onboarding',
            className: 'mt-5',
            icon: <AirplanemodeActiveIcon />,
        },
        {
            name: 'Compliance',
            url: AppRoute.Compliance,
            key: '/compliance',
            className: 'mt-5',
            icon: <CommentIcon />,
        },
        {
            name: 'Contracts',
            url: AppRoute.Contracts,
            key: '/contracts',
            className: 'mt-5',
            icon: <DocumentScannerIcon />,
        },
    ],
};

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
            <Box sx={{ display: 'flex', width: '100vw' }}>
                <SideBar
                    logoImg="/vercel.svg"
                    logoText="Audit Bull"
                    menu={sidebar}
                />
                <Stack component="main" sx={{ flexGrow: 1 }} className="gap-4">
                    <Box>{!hideHeader && <Header />}</Box>
                    <Stack sx={{ flexGrow: 1 }} spacing={4} px={3}>
                        {children}
                    </Stack>
                </Stack>
            </Box>
        </>
    );
};

export default DashboardLayout;
