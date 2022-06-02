/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import type { ReactElement } from 'react';
import DashboardLayout from 'layouts/DashboardLayout';
import VendorHeader from 'modules/vendors/components/VendorHeader';

import VendorCreateForm from 'modules/vendors/views/create/VendorCreateForm';

const CreateVendor = () => {
    return (
        <Box className="flex flex-col gap-12 ">
            <VendorHeader breadcrumb="Create Vendor" hideCTA />
            <Box className="md:px-12 ">
                <VendorCreateForm />
            </Box>
        </Box>
    );
};

CreateVendor.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};
export default CreateVendor;
