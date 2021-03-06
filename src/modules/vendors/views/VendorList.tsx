import { useState } from 'react';
import {
    Grid,
    Typography,
    Card,
    CardContent,
    Box,
    CircularProgress,
    Modal,
    Badge,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import Fuse from 'fuse.js';
import { useQuery } from 'react-query';
import { filter, find, map } from 'lodash';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import Table from 'components/Table';
import Tab from 'components/Tab';

import VendorExtraNotes from 'modules/vendors/components/VendorExtraNotes';
import VendorCompliance from 'modules/vendors/components/VendorCompliance';
import VendorFinance from 'modules/vendors/components/VendorFinance';
import VendorUseCase from 'modules/vendors/components/VendorUseCase';
import { listVendors } from 'modules/vendors/service';
import { useAuth } from 'hooks/useAuth';

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

export type VendorItem = {
    id: string;
    name: string;
    status: string;
    compliance?: string;
    risk_rating?: string;
    owner?: string;
    website?: string;
};

const VendorList = () => {
    const { loginUser } = useAuth();
    const [rowLoading, setRowLoading] = useState<boolean>(false);
    const [query] = useState<string>('');
    const [notesModal, setNotesModal] = useState<boolean>(false);

    const [vendorList, setVendorList] = useState<VendorItem[]>([]);
    const [selectedVendor, setSelectedVendor] = useState<any>(null);

    const { isLoading, refetch } = useQuery('vendors', listVendors, {
        onSuccess: (data: any) => {
            setVendorList(data?.data?.listVendors?.items || []);
            if (selectedVendor) {
                setSelectedVendor(
                    find(data.data.listVendors.items, {
                        id: selectedVendor.id || '',
                    })
                );
            } else {
                setSelectedVendor(data?.data?.listVendors?.items[0] || {});
            }
        },
        onError: (error: any) => {
            const message: string = error?.message || 'Failed to fetch vendors';
            toast.error(message);
        },
    });

    const handleRowClicked = (params: GridRowParams) => {
        setRowLoading(true);
        setSelectedVendor(params?.row);
        setTimeout(() => {
            setRowLoading(false);
        }, 500);
    };

    const fuse = new Fuse(vendorList, fuseOptions);
    const results = fuse.search(query);
    const vendors = query ? results.map((vendor) => vendor.item) : vendorList;
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
            headerName: 'Vendor Name',
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
            field: 'website',
            headerName: 'website',
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
        },
        {
            field: '',
            headerName: '',
            sortable: false,
            hideSortIcons: true,
            filterable: false,
            disableColumnMenu: true,
            minWidth: hideTableToolbar ? 150 : 100,
            flex: 1,
            renderCell: (row) => {
                return (
                    <Box className="flex justify-center items-center w-full ">
                        <Badge
                            badgeContent={
                                filter(
                                    row?.row?.Notes?.items,
                                    (vendorNotes: any) => {
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

    const tabs = [
        {
            label: 'Information',
            component: (
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography>Vendor Name</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{selectedVendor?.name}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Vendor Website</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                {selectedVendor?.website || ''}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Product Information</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            {map(
                                JSON.parse(selectedVendor?.service || '{}'),
                                (service) => (
                                    <Typography>{service.label}</Typography>
                                )
                            )}
                        </Grid>
                    </Grid>
                </CardContent>
            ),
        },
        {
            label: 'Compliance',
            component: (
                <VendorCompliance
                    getVendorList={refetch}
                    vendor={selectedVendor}
                    vendorCompliance={JSON.parse(
                        selectedVendor?.compliance || '{}'
                    )}
                />
            ),
        },
        {
            label: 'Finance',
            component: (
                <VendorFinance
                    vendorFinance={JSON.parse(selectedVendor?.finance || '{}')}
                />
            ),
        },
        {
            label: 'Use Case',
            component: (
                <VendorUseCase
                    vendorUseCase={JSON.parse(
                        selectedVendor?.use_cases || '{}'
                    )}
                />
            ),
        },
    ];
    if (isLoading) {
        return (
            <Box className="h-full w-full flex flex-col items-center justify-center">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12} md={7}>
                    <Box className="min-h-[200px] md:h-[400px]">
                        <Table
                            columns={columns || []}
                            data={vendors || []}
                            onRowClick={handleRowClicked}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={5}>
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
                        refetch={refetch}
                    />
                </Box>
            </Modal>
        </div>
    );
};

export default VendorList;
