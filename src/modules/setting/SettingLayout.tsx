import { Box, Stack } from '@mui/material';
import SideBar, { SideBarType } from 'components/SideBar';
import type { ReactElement } from 'react';
import Head from 'next/head';

import DashboardIcon from '@mui/icons-material/Dashboard';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import CommentIcon from '@mui/icons-material/Comment';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import Header from 'components/Header';

interface SettingLayoutProps {
    children?: ReactElement;
    hideHeader?: boolean;
}

const sidebar: SideBarType = {
    links: [
        {
            name: 'Support',
            url: '/settings/support',
            key: '/settings/support',
            icon: <DashboardIcon />,
        },
        {
            name: 'Users and Roles',
            url: '/settings/user-setting',
            key: '/settings/user-setting',
            className: 'mt-5',
            icon: <DeliveryDiningIcon />,
        },
        {
            name: 'License',
            url: '/settings/license',
            key: '/onboarding',
            className: 'mt-5',
            icon: <AirplanemodeActiveIcon />,
        },
        {
            name: 'Learn',
            url: '/settings/learn',
            key: '/settings/learn',
            className: 'mt-5',
            icon: <CommentIcon />,
        },
        {
            name: 'Billing & Invoices',
            url: '/settings/billing',
            key: '/settings/billing',
            className: 'mt-5',
            icon: <DocumentScannerIcon />,
        },
        {
            name: 'Integrations',
            url: '/settings/integration',
            key: '/settings/integration',
            className: 'mt-5',
            icon: <DocumentScannerIcon />,
        },
    ],
};

const SettingLayout = (props: SettingLayoutProps) => {
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
                <SideBar
                    logoImg="/vercel.svg"
                    logoText="Audit Bull"
                    menu={sidebar}
                />
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

export default SettingLayout;
