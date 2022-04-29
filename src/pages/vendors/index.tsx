/* eslint-disable react/prop-types */
import { ReactElement, useState } from 'react';

import DashboardLayout from 'layouts/DashboardLayout';
import {
    Divider,
    Grid,
    Stack,
    Typography,
    Card,
    CardContent,
    TextareaAutosize,
    TextField,
    Box,
    InputAdornment,
} from '@mui/material';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';

import Table from 'components/Table';
import Tab from 'components/Tab';

type VendorItem = {
    id: string;
    name: string;
    status: string;
    compliance?: string;
    risk_rating?: string;
    owner?: string;
    website?: string;
};

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Vendor Name',
        flex: 1,
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
    },
    {
        field: 'compliance',
        headerName: 'Compliance',
        flex: 1,
    },
    {
        field: 'owner',
        headerName: 'Qwner',
        flex: 1,
    },
    // {
    //     field: 'product',
    //     headerName: 'Products',
    //     flex: 1,
    //     renderCell: (params: GridValueGetterParams) => {
    //         return (
    //             <Stack direction="row" spacing={2}>
    //                 {params.value.map((item: string) => (
    //                     <Button key={item}>{item}</Button>
    //                 ))}
    //             </Stack>
    //         );
    //     },
    // },
];

const mockData: VendorItem[] = [
    {
        id: '1',
        name: 'Miro',
        status: 'seeking evaluation',
        compliance: 'Yes',
        owner: 'John Doe',
        website: '',
    },
    {
        id: '2',
        name: 'Jira',
        status: 'Approved for evaluation',
        compliance: 'No',
        owner: 'John Doe',
    },
    {
        id: '3',
        name: 'Salesforce',
        status: 'Active',
        compliance: 'No',
        owner: 'John Doe',
    },
    {
        id: '4',
        name: 'AWS',
        status: 'Active',
        compliance: 'Yes',
        owner: 'John Doe',
    },
    {
        id: '5',
        name: 'Microsoft',
        status: 'Approved',
        compliance: 'No',
        owner: 'John Doe',
    },
];

const Vendors = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedVendor, setSelectedVendor] = useState<VendorItem>(
        mockData[0]
    );

    const handleRowClicked = (params: GridRowParams) => {
        setLoading(true);
        setSelectedVendor(params?.row);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    const tabs = [
        {
            label: 'Information',
            component: (
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography>Owner</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>{selectedVendor.owner}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>Vendor Name</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>{selectedVendor.name}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>Vendor Website</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                {selectedVendor?.website || ''}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>Product Information</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>{selectedVendor.owner}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            ),
        },
        {
            label: 'Compliance',
            component: (
                <CardContent>
                    <Stack direction="column" spacing={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Typography>VRM Stats</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>{selectedVendor.status}</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>MNDA</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>One Document</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>VRM Questionairre</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>One Document</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>Audit Certification</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>List of documents</Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Stack direction="column" spacing={2}>
                            <Typography>Risk Management</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Typography>VRM Stats</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        {selectedVendor.status}
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography>MNDA</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>One Document</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography>VRM Questionairre</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>One Document</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography>Audit Certification</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>List of documents</Typography>
                                </Grid>
                            </Grid>
                        </Stack>
                        <Stack direction="column" spacing={2}>
                            <Typography>Notes</Typography>
                            <TextareaAutosize
                                color="primary"
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Minimum 3 rows"
                                style={{ width: 200 }}
                            />
                        </Stack>
                    </Stack>
                </CardContent>
            ),
        },
    ];

    return (
        <Grid container spacing={4}>
            <Grid item xs={8} sx={{ height: 400, width: '100%' }}>
                <Stack spacing={4}>
                    <Box className="flex justify-end items-center">
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            placeholder="Search"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Table
                        columns={columns || []}
                        data={mockData || []}
                        onRowClick={handleRowClicked}
                    />
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Card
                    sx={{
                        minHeight: 440,
                    }}
                >
                    <Tab tabs={tabs} activeTab={0} loading={loading} />
                </Card>
            </Grid>
        </Grid>
    );
};

Vendors.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Vendors;
