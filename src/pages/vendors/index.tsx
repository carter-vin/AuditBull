/* eslint-disable react/prop-types */
import { ReactElement, useEffect, useState } from 'react';

import DashboardLayout from 'layouts/DashboardLayout';
import {
    Divider,
    Grid,
    Stack,
    Typography,
    Card,
    CardContent,
    TextareaAutosize,
    Box,
    CircularProgress,
} from '@mui/material';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';

import Table from 'components/Table';
import Tab from 'components/Tab';
import { OptionType } from 'modules/vendors/components/VendorTableAction';
import Fuse from 'fuse.js';
import { map, pick, uniqWith, isEqual } from 'lodash';
import { useAuth } from 'hooks/useAuth';
import { useRouter } from 'next/router';

export type VendorItem = {
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
        headerName: 'Owner',
        flex: 1,
        filterable: true,
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
        status: 'seeking-approval',
        compliance: 'yes',
        owner: 'John Doe',
        website: '',
    },
    {
        id: '2',
        name: 'Jira',
        status: 'budget-approved',
        compliance: 'no',
        owner: 'Jake Blitch',
    },
    {
        id: '3',
        name: 'Salesforce',
        status: 'active',
        compliance: 'no',
        owner: 'Elon Musk',
    },
    {
        id: '4',
        name: 'AWS',
        status: 'evaluation',
        compliance: 'yes',
        owner: 'John Doe',
    },
    {
        id: '5',
        name: 'Microsoft',
        status: 'evaluation',
        compliance: 'no',
        owner: 'Elon Musk',
    },
];

const fuseOptions = {
    keys: [
        {
            name: 'name',
            weight: 2,
        },
        {
            name: 'owner',
            weight: 3,
        },
    ],
};

const Vendors = () => {
    const router = useRouter();
    const { loginUser, loading } = useAuth();

    const [rowLoading, setRowLoading] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const [ownerOptions, setOwnerOptions] = useState<OptionType[]>([]);

    const [vendorList, setVendorList] = useState<VendorItem[]>(mockData || []);
    const [selectedVendor, setSelectedVendor] = useState<VendorItem>(
        mockData[0]
    );

    const handleRowClicked = (params: GridRowParams) => {
        setRowLoading(true);
        setSelectedVendor(params?.row);
        setTimeout(() => {
            setRowLoading(false);
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

    const getOwnerOptions = () => {
        const options: OptionType[] = [
            {
                label: 'All Users',
                value: 'all',
            },
        ];
        map(mockData, (item) => {
            options.push({
                label: String(pick(item, ['owner']).owner) || '',
                value: String(pick(item, ['owner']).owner) || '',
            });
        });
        setOwnerOptions(uniqWith(options, isEqual));
    };

    const fuse = new Fuse(vendorList, fuseOptions);
    const results = fuse.search(query);
    const vendors = query ? results.map((vendor) => vendor.item) : vendorList;

    useEffect(() => {
        getOwnerOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mockData]);

    useEffect(() => {
        if (loginUser === null || !loginUser) {
            router.push({
                pathname: 'login',
                query: {
                    redirect: router.pathname,
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
        <Grid container spacing={4}>
            <Grid item xs={8} sx={{ height: 400, width: '100%' }}>
                <Stack spacing={2}>
                    {/* <VendorTableAction
                        setVendorList={setVendorList}
                        vendorList={mockData}
                        setQuery={setQuery}
                        query={query}
                        ownerOptions={ownerOptions}
                    /> */}
                    <Table
                        columns={columns || []}
                        data={vendors || []}
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
                    <Tab tabs={tabs} activeTab={0} loading={rowLoading} />
                </Card>
            </Grid>
        </Grid>
    );
};

Vendors.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Vendors;
