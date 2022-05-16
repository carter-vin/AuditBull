/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { ReactElement, useEffect, useState } from 'react';
import {
    CircularProgress,
    Box,
    Typography,
    Stack,
    Button,
} from '@mui/material';
import { useAuth } from 'hooks/useAuth';
import SettingLayout from 'modules/setting/SettingLayout';

// icons
import AddIcon from '@mui/icons-material/Add';
import Modal from 'components/Modal';
import UserList from 'modules/setting/UserList';
import UserForm from 'modules/setting/UserForm';
import { useRouter } from 'next/router';

const UserSetting = () => {
    const router = useRouter();
    const { loginUser, loading } = useAuth();

    // states
    const [addUserModal, setAdduserModal] = useState<boolean>(false);

    const handleAddUserModal = () => {
        setAdduserModal(!addUserModal);
    };

    if (loading) {
        return (
            <Box className="h-full w-full flex flex-col items-center justify-center">
                <CircularProgress />
            </Box>
        );
    }

    useEffect(() => {
        if (loginUser === null || !loginUser) {
            router.push({
                pathname: '/login',
                query: {
                    redirect: '/settings/user-setting',
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginUser]);

    return (
        <>
            <Stack spacing={4}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignContent="center"
                    alignItems="center"
                >
                    <Typography variant="h6">User Lists</Typography>
                    {(loginUser?.attributes['custom:role'] === 'admin' ||
                        !loginUser?.attributes['custom:role']) && (
                        <div className="flex gap-8 justify-center items-center">
                            <Button
                                variant="contained"
                                className="capitalize"
                                startIcon={<AddIcon />}
                                onClick={handleAddUserModal}
                            >
                                Add user
                            </Button>
                        </div>
                    )}
                </Stack>
                <UserList />
            </Stack>
            <Modal
                open={addUserModal}
                onClose={handleAddUserModal}
                name="add-user-modal"
            >
                <UserForm callback={handleAddUserModal} />
            </Modal>
        </>
    );
};

UserSetting.getLayout = (page: ReactElement) => {
    return <SettingLayout>{page}</SettingLayout>;
};

export default UserSetting;
