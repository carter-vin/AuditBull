import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import DashboardLayout from 'layouts/DashboardLayout';
import CreateForm from 'modules/systems/create/CreateForm';
import ComponentHeaderProps from 'components/ComponentHeader';

const CreateSystems = () => {
    return (
        <Box className="flex flex-col gap-4">
            <ComponentHeaderProps breadcrumb="Create System" hideCTA />
            <Box>
                <CreateForm />
            </Box>
        </Box>
    );
};

CreateSystems.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateSystems;
