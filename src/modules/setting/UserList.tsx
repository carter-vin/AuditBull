/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { Box, Stack, IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

import Table from 'components/Table';

import { useAuth } from 'hooks/useAuth';
import { useAppData } from 'hooks/useAppData';

const UserList = () => {
    const { loginUser } = useAuth();
    const {
        userReducer: { getListOfUsers, users, userLoading, deleteUser },
    } = useAppData();

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            hide: true,
        },
        {
            field: 'username',
            headerName: 'Username',
            align: 'left',
            width: 250,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 250,
            align: 'left',
            colSpan: 2,
        },
        {
            field: 'email',
            align: 'left',
            headerName: 'Email',
            flex: 1,
        },
        {
            field: 'role',
            headerName: 'Role',
            align: 'left',
            width: 200,
        },
        {
            field: '',
            headerName: 'Action',
            renderCell: (rowData: any) => {
                return (
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <IconButton
                            aria-label="delete"
                            onClick={() => deleteUser(rowData.row.username)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                );
            },
        },
    ];

    useEffect(() => {
        if (loginUser !== null || loginUser) {
            getListOfUsers();
        }
    }, []);

    if (userLoading) {
        return (
            <Box>
                <Box>Loading...</Box>
            </Box>
        );
    }
    return (
        <Box>
            <Table columns={columns || []} data={users || []} noFilter />
        </Box>
    );
};

export default UserList;
