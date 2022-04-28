/* eslint-disable react/prop-types */
import { ReactElement, useState } from 'react';

import DashboardLayout from 'layouts/DashboardLayout';
import { Table } from 'components/Table';
import { Column } from 'react-table';
import { PrimaryButton, Stack } from '@fluentui/react';

type VendorItem = {
    id: string;
    name: string;
    limit: string;
    product: string[];
};

const columns: Column<VendorItem>[] = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'limit',
        accessor: 'limit',
    },
    {
        Header: 'product',
        accessor: 'product',
        Cell: ({ cell: { value } }) => {
            return (
                <Stack
                    horizontal
                    horizontalAlign="start"
                    tokens={{
                        childrenGap: 10,
                    }}
                >
                    {value.map((product: string) => (
                        <PrimaryButton
                            key={product}
                            text={product}
                            disabled
                            allowDisabledFocus
                        />
                    ))}
                </Stack>
            );
        },
    },
];

const mockData: VendorItem[] = [
    {
        id: '1',
        name: 'Vendor 1',
        limit: '$100',
        product: ['Product 1', 'Product 2'],
    },
    {
        id: '2',
        name: 'Vendor 2',
        limit: '$200',
        product: ['Product 1', 'Product 2'],
    },
    {
        id: '3',
        name: 'Vendor 3',
        limit: '$300',
        product: ['Product 1', 'Product 2'],
    },
    {
        id: '4',
        name: 'Vendor 4',
        limit: '$400',
        product: ['Product 1', 'Product 2'],
    },
];

const Vendors = () => {
    // const [selectedVendor, setSelectedVendor] = useState<VendorItem>({
    //     id: '',
    //     name: '',
    //     limit: '',
    //     product: [],
    // });

    return (
        <>
            <Table columns={columns || []} data={mockData || []} />
            <p>the vendors</p>
        </>
    );
};

Vendors.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Vendors;
