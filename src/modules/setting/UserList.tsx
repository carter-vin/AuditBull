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
            align: 'left',
            width: 250,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 250,
            align: 'left',
            colSpan: 2,
            resizable: true,
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
    ];

    useEffect(() => {
        if (loginUser !== null || loginUser) {
            getListOfUsers();
        }
    }, []);

    console.log('the users', users);

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
