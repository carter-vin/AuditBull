import React, { ReactElement } from 'react';
import { Box } from '@mui/material';

import DashboardLayout from 'layouts/DashboardLayout';
import SystemList from 'modules/systems/SystemList';
import ComponentHeaderProps from 'components/ComponentHeader';
import { AppRoute } from 'utils/route';

const Systems = () => {
    return (
        <Box className="flex flex-col gap-4">
            <ComponentHeaderProps
                breadcrumb="Systems List"
                ctaLabel="Create System"
                ctaRedirectUrl={AppRoute.CreateSystem}
            />
            <SystemList />
        </Box>
    );
};

Systems.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Systems;
