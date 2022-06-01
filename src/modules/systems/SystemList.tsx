import { Box, useMediaQuery, useTheme } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import Table from 'components/Table';
import vendors from 'pages/vendors';

const SystemList = () => {
    const theme = useTheme();
    const hideTableToolbar = useMediaQuery(theme.breakpoints.down('sm'));
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            minWidth: hideTableToolbar ? 150 : 100,
        },
        {
            field: 'name',
            headerName: 'Name',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
        },
        {
            field: 'system_ow',
            headerName: 'System ow',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
        },
        {
            field: 'sme',
            headerName: `SME's`,
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
        },
        {
            field: 'type',
            headerName: 'Type',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
        },
        {
            field: 'system_des',
            headerName: 'System Des',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
        },
        {
            field: 'vendor',
            headerName: 'Vendor',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
        },
        {
            field: 'location',
            headerName: 'Location',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
        },
        {
            field: 'criticality',
            headerName: 'Criticality',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
        },
        {
            field: 'risk_rating',
            headerName: 'Risk Rating',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
        },
        {
            field: 'contain_pi',
            headerName: 'Contains PI',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
        },
        {
            field: 'contain_e',
            headerName: 'Contains E',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
        },
        {
            field: 'products and services',
            headerName: 'Product and Services',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
        },
    ];
    return <Table columns={columns || []} data={vendors || []} />;
};

export default SystemList;
