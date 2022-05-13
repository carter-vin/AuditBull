/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import Table from 'components/Table';
import { GridColDef } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useAppData } from 'hooks/useAppData';

const UserList = () => {
    const { loginUser } = useAuth();
    const {
        userReducer: { getListOfUsers, users, userLoading },
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
            flex: 1,
        },
        {
            field: 'name',
            headerName: 'Name',
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
        },
        {
            field: 'role',
            headerName: 'Role',
            flex: 1,
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
