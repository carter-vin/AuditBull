/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Box, Stack, IconButton, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import Table from 'components/Table';

import { useAppData } from 'hooks/useAppData';
import Modal from 'components/Modal';
import { IUsers } from 'hooks/context/useUser';
import UserForm from './UserForm';

type EditModalType = {
    open: boolean;
    user: IUsers;
};

const defaultUser = {
    username: '',
    name: '',
    email: '',
    role: '',
};
const UserList = () => {
    const [editModal, setEditModal] = useState<EditModalType>({
        open: false,
        user: defaultUser,
    });

    const handleEditModal = (user?: IUsers) => {
        setEditModal({
            open: !editModal.open,
            user: user || defaultUser,
        });
    };

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
            renderCell: (rowData) => {
                return (
                    <Typography title={rowData.row.role}>
                        {rowData.row.role}
                    </Typography>
                );
            },
        },
        {
            field: '',
            width: 100,
            renderCell: (rowData: any) => {
                return (
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <IconButton
                            aria-label="delete"
                            onClick={() => handleEditModal(rowData.row)}
                        >
                            <BorderColorIcon />
                        </IconButton>
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
        getListOfUsers();
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
            <Modal
                open={editModal.open}
                onClose={handleEditModal}
                name="edit-user-modal"
            >
                <UserForm callback={handleEditModal} user={editModal.user} />
            </Modal>
        </Box>
    );
};

export default UserList;
