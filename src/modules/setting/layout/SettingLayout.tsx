import { Box, Stack, useTheme } from '@mui/material';
import SideBar, { SideBarType } from 'components/SideBar';
import type { ReactElement } from 'react';
import Head from 'next/head';

import DashboardIcon from '@mui/icons-material/Dashboard';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import GroupIcon from '@mui/icons-material/Group';
import BookIcon from '@mui/icons-material/Book';
import ReceiptIcon from '@mui/icons-material/Receipt';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

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
            icon: <GroupIcon />,
        },
        {
            name: 'License',
            url: '/settings/license',
            key: '/onboarding',
            className: 'mt-5',
            icon: <DocumentScannerIcon />,
        },
        {
            name: 'Learn',
            url: '/settings/learn',
            key: '/settings/learn',
            className: 'mt-5',
            icon: <BookIcon />,
        },
        {
            name: 'Billing & Invoices',
            url: '/settings/billing',
            key: '/settings/billing',
            className: 'mt-5',
            icon: <ReceiptIcon />,
        },
        {
            name: 'Integrations',
            url: '/settings/integration',
            key: '/settings/integration',
            className: 'mt-5',
            icon: <IntegrationInstructionsIcon />,
        },
    ],
};

const SettingLayout = (props: SettingLayoutProps) => {
    const { children, hideHeader } = props;
    const theme = useTheme();
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
                    logoImg={
                        theme.palette.mode === 'dark'
                            ? '/logo/ab_white_horizontal.svg'
                            : '/logo/ab_horizontal.svg'
                    }
                    logoImgMobile={
                        theme.palette.mode === 'dark'
                            ? '/logo/ab_no_text_vertical.svg'
                            : '/logo/ab_vertical.svg'
                    }
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

export default SettingLayout;
