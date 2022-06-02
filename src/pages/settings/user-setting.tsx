/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { ReactElement, useEffect, useState } from 'react';
import { CircularProgress, Box, Typography, Button } from '@mui/material';
import { useAuth } from 'hooks/useAuth';
import SettingLayout from 'modules/setting/layout/SettingLayout';

// icons
import AddIcon from '@mui/icons-material/Add';
import Modal from 'components/Modal';
import { useRouter } from 'next/router';
import UserList from 'modules/setting/components/UserList';
import UserForm from 'modules/setting/components/UserForm';

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
            <Box className="flex flex-col w-full gap-4">
                <Box className="flex flex-row justify-between">
                    <Typography variant="h6">User Lists</Typography>
                    {(loginUser?.attributes['custom:role'] === 'admin' ||
                        !loginUser?.attributes['custom:role']) && (
                        <>
                            <div className="hidden md:block capitalize">
                                <Button
                                    variant="contained"
                                    size="small"
                                    className="hidden md:block capitalize"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddUserModal}
                                >
                                    Add user
                                </Button>
                            </div>
                            <div className="md:hidden block capitalize">
                                <Button
                                    variant="contained"
                                    size="small"
                                    className="md:hidden block capitalize"
                                    onClick={handleAddUserModal}
                                >
                                    <AddIcon />
                                </Button>
                            </div>
                        </>
                    )}
                </Box>
                <UserList />
            </Box>
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
