/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import {
    Box,
    Chip,
    CircularProgress,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { GraphQLResult } from '@aws-amplify/api-graphql';

import Table from 'components/Table';
import Switch from 'components/Switch';
import { ISytemPayload, listSystem } from './service';

const getStatusColor = (status: string) => {
    switch (status) {
        case 'very-high':
            return 'error';
        case 'high':
            return 'warning';
        case 'medium':
            return 'success';
        case 'low':
            return 'info';
        case 'very-low':
            return 'primary';
        default:
            return 'default';
    }
};

const SystemList = () => {
    const theme = useTheme();
    const hideTableToolbar = useMediaQuery(theme.breakpoints.down('sm'));
    const [systemList, setSystemList] = useState<ISytemPayload[]>([]);
    const { isLoading } = useQuery('systems', listSystem, {
        onSuccess: (data: GraphQLResult<any>) => {
            if (data.data) {
                setSystemList(data?.data?.listSystems?.items || []);
            }
        },
        onError: (error: any) => {
            const message: string = error?.message || 'Failed to fetch systems';
            toast.error(message);
        },
    });
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
            field: 'owner',
            headerName: 'System owner',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
            renderCell: (row) => {
                const { owner } = row.row;
                const { label } = JSON.parse(owner || '{}');
                return <Typography>{label || owner}</Typography>;
            },
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
            field: 'description',
            headerName: 'System Desc',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
        },
        {
            field: 'vendor_provided',
            headerName: 'Vendor',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
            renderCell: (row) => {
                return (
                    <Switch
                        name="vendor_provided"
                        checked={row.row.vendor_provided}
                        disabled
                    />
                );
            },
        },
        {
            field: 'location',
            headerName: 'Location',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
            renderCell: (row) => {
                const { location } = row.row;
                const { type, other_location } = JSON.parse(location || '{}');
                if (type === 'other') {
                    return <Typography>{other_location}</Typography>;
                }
                return <Typography>{type}</Typography>;
            },
        },
        {
            field: 'criticality',
            headerName: 'Criticality',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
            renderCell: (row) => {
                const { risk } = row.row;
                const { criticality } = JSON.parse(risk || '{}');
                return (
                    <Chip
                        label={criticality}
                        size="small"
                        color={getStatusColor(criticality)}
                    />
                );
            },
        },
        {
            field: 'risk_rating',
            headerName: 'Risk Rating',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
            renderCell: (row) => {
                const { risk } = row.row;
                const { risk_rating } = JSON.parse(risk || '{}');
                return (
                    <Chip
                        label={risk_rating}
                        size="small"
                        color={getStatusColor(risk_rating)}
                    />
                );
            },
        },
        {
            field: 'contain_pii',
            headerName: 'Contains PII',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
            renderCell: (row) => {
                const { data_classification } = row.row;
                const { transmist_process_pii } = JSON.parse(
                    data_classification || '{}'
                );
                return (
                    <Switch
                        name="transmist_process_pii"
                        checked={transmist_process_pii}
                        disabled
                    />
                );
            },
        },
        {
            field: 'contain_ephi',
            headerName: 'Contains EPHI',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
            renderCell: (row) => {
                const { data_classification } = row.row;
                const { transmist_process_phi } = JSON.parse(
                    data_classification || '{}'
                );
                return (
                    <Switch
                        name="transmist_process_phi"
                        checked={transmist_process_phi}
                        disabled
                    />
                );
            },
        },
        {
            field: 'contain_confidential_information',
            headerName: 'Contains Confidential Information',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
            renderCell: (row) => {
                const { data_classification } = row.row;
                const { transmist_process_pci } = JSON.parse(
                    data_classification || '{}'
                );
                return (
                    <Switch
                        name="transmist_process_pci"
                        checked={transmist_process_pci}
                        disabled
                    />
                );
            },
        },
        // {
        //     field: 'products and services',
        //     headerName: 'Product and Services',
        //     minWidth: hideTableToolbar ? 150 : 100,
        //     flex: 1,
        // },
    ];

    if (isLoading) {
        return (
            <Box className="grid h-full w- place-content-center">
                <CircularProgress disableShrink />
            </Box>
        );
    }
    return <Table columns={columns || []} data={systemList || []} />;
};

export default SystemList;
