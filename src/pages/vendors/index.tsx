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
    Box,
    CircularProgress,
    Modal,
    Badge,
} from '@mui/material';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { API, graphqlOperation } from 'aws-amplify';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import Table from 'components/Table';
import Tab from 'components/Tab';
import { OptionType } from 'modules/vendors/components/VendorTableAction';
import Fuse from 'fuse.js';
import { map, pick, uniqWith, isEqual, find, filter } from 'lodash';
import { useAuth } from 'hooks/useAuth';
import { useRouter } from 'next/router';
import VendorExtraNotes from 'modules/vendors/components/VendorExtraNotes';
import { listVendors } from 'graphql/query';

export type VendorItem = {
    id: string;
    name: string;
    status: string;
    compliance?: string;
    risk_rating?: string;
    owner?: string;
    website?: string;
};

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

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: 350,
        sm: 350,
        md: 450,
        lg: 450,
    },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const Vendors = () => {
    const router = useRouter();
    const { loginUser, loading } = useAuth();

    const [rowLoading, setRowLoading] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const [ownerOptions, setOwnerOptions] = useState<OptionType[]>([]);
    const [notesModal, setNotesModal] = useState<boolean>(false);

    const [vendorList, setVendorList] = useState<VendorItem[]>([]);
    const [selectedVendor, setSelectedVendor] = useState<VendorItem>({
        id: '',
        name: '',
        status: '',
    });

    const getVendorList = async () => {
        const res: any = await API.graphql(graphqlOperation(listVendors));
        if (res && res.data) {
            setVendorList(res.data.listVendors.items);
            if (selectedVendor) {
                setSelectedVendor(
                    find(res.data.listVendors.items, {
                        id: selectedVendor.id || '',
                    })
                );
            } else {
                setSelectedVendor(res?.data?.listVendors?.items[0] || {});
            }
        } else {
            toast.error(res.error.message);
        }
    };

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
                            <Typography>{selectedVendor?.owner}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>Vendor Name</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>{selectedVendor?.name}</Typography>
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
                            <Typography>{selectedVendor?.owner}</Typography>
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
                                <Typography>
                                    {selectedVendor?.status}
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
                        <Divider />
                        <Stack direction="column" spacing={2}>
                            <Typography>Risk Management</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Typography>VRM Stats</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        {selectedVendor?.status}
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
                        <Divider />
                        <VendorExtraNotes
                            selectedVendor={selectedVendor}
                            refetch={() => getVendorList()}
                        />
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

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Vendor Name',
        },
        {
            field: 'status',
            headerName: 'Status',
        },
        {
            field: 'compliance',
            headerName: 'Compliance',
        },
        {
            field: 'owner',
            headerName: 'Owner',
        },
        {
            field: '',
            headerName: '',
            sortable: false,
            hideSortIcons: true,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (row) => {
                return (
                    <Box className="flex justify-center items-center w-full ">
                        <Badge
                            badgeContent={
                                filter(
                                    row?.row?.Notes?.items,
                                    (vendorNotes) => {
                                        return (
                                            vendorNotes.taged.includes(
                                                loginUser.username
                                            ) ||
                                            vendorNotes.creator ===
                                                loginUser.username
                                        );
                                    }
                                ).length || 0
                            }
                            color="primary"
                            className="cursor-pointer text-md"
                            onClick={() => setNotesModal(true)}
                        >
                            <ChatBubbleOutlineIcon
                                sx={{
                                    fontSize: '20px',
                                }}
                            />
                        </Badge>
                    </Box>
                );
            },
        },
    ];

    useEffect(() => {
        getOwnerOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mockData]);

    useEffect(() => {
        if (loginUser === null || !loginUser) {
            router.push({
                pathname: 'login',
                query: {
                    redirect: '/vendors',
                },
            });
        }
        getVendorList();
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
        <Box className="flex flex-col w-full">
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Box className="min-h-[200px] md:h-[400px]">
                        <Table
                            columns={columns || []}
                            data={vendors || []}
                            onRowClick={handleRowClicked}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card
                        sx={{
                            minHeight: 440,
                        }}
                    >
                        <Tab tabs={tabs} activeTab={0} loading={rowLoading} />
                    </Card>
                </Grid>
            </Grid>
            <Modal
                open={notesModal}
                onClose={() => setNotesModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <VendorExtraNotes
                        selectedVendor={selectedVendor}
                        refetch={() => getVendorList()}
                    />
                </Box>
            </Modal>
        </Box>
    );
};

Vendors.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Vendors;
