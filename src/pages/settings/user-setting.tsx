/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { ReactElement, useState } from 'react';
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
import { withAuth } from 'hooks/withAuth';

const UserSetting = () => {
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

export async function getServerSideProps(context: any) {
    const res = await withAuth(context);
    console.log('the res', res);
    if (res !== null) {
        return {
            props: {
                user: JSON.stringify(res),
            },
        };
    }
    return {
        redirect: {
            destination: '/login',
        }, // will be passed to the page component as props
    };
}

export default UserSetting;
