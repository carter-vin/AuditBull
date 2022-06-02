/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import { ReactElement, useEffect } from 'react';

import DashboardLayout from 'layouts/DashboardLayout';
import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from 'hooks/useAuth';
import VendorListHeader from 'modules/vendors/components/VendorHeader';
import VendorList from 'modules/vendors/views/VendorList';

const Vendors = () => {
    const router = useRouter();
    const { loginUser, loading } = useAuth();
    useEffect(() => {
        if (loginUser === null || !loginUser) {
            router.push({
                pathname: 'login',
                query: {
                    redirect: '/vendors',
                },
            });
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
        <Box className="flex flex-col w-full gap-4">
            <VendorListHeader />
            <VendorList />
        </Box>
    );
};

Vendors.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Vendors;
