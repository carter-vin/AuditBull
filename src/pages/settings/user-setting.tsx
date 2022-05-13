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
import { API } from 'aws-amplify';
import { withAuth } from 'hooks/withAuth';

const UserSetting = () => {
    const { loginUser, loading } = useAuth();

    // states
    const [addUserModal, setAdduserModal] = useState<boolean>(false);
    const [addRoleModal, setAddRoleModal] = useState<boolean>(false);

    const handleAddUserModal = () => {
        setAdduserModal(!addUserModal);
    };

    const handleAddRoleModal = () => {
        setAddRoleModal(!addRoleModal);
    };

    // const roleFormik = useFormik<RolePayload>({
    //     initialValues: {
    //         roleName: '',
    //     },
    //     validationSchema: Yup.object().shape({
    //         roleName: Yup.string().required('First name is required'),
    //     }),
    //     onSubmit: async (values: RolePayload, { setSubmitting }) => {
    //         setSubmitting(true);
    //         console.log('the values', values);
    //         setSubmitting(false);
    //     },
    // });

    if (loading) {
        return (
            <Box className="h-full w-full flex flex-col items-center justify-center">
                <CircularProgress />
            </Box>
        );
    }

    // useEffect(() => {
    //     if (loginUser === null || !loginUser) {
    //         router.push({
    //             pathname: '/login',
    //             query: {
    //                 redirect: '/settings/user-setting',
    //             },
    //         });
    //     }
    // }, []);
    const sendMail = async () => {
        const requestInfo = {
            response: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                name: 'Rajeev Rajchal',
                email: 'rajeevrajchal12@gmail.com',
            },
        };
        console.log('the requestInfo', requestInfo);
        const res = await API.get('sendMail', '/send-mail', requestInfo);
        console.log('the res', res);
    };

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
                            <Button
                                variant="contained"
                                className="capitalize"
                                startIcon={<AddIcon />}
                                onClick={handleAddRoleModal}
                            >
                                Add role
                            </Button>
                            <Button
                                variant="contained"
                                className="capitalize"
                                startIcon={<AddIcon />}
                                onClick={() => sendMail()}
                            >
                                Send Mail
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

            {/* <Modal
                open={addRoleModal}
                onClose={handleAddRoleModal}
                name="add-user-modal"
            >
                <Stack spacing={4}>
                    <Box display="flex" flexDirection="column" gap={1}>
                        <Box>
                            <InputLabel htmlFor="email">
                                <strong className="text-gray-700">
                                    Role Name
                                </strong>
                            </InputLabel>
                        </Box>
                        <TextField
                            size="small"
                            fullWidth
                            name="roleName"
                            value={roleFormik.values.roleName}
                            onChange={roleFormik.handleChange}
                            id="roleName"
                            placeholder="admin"
                            variant="outlined"
                        />
                        {Boolean(
                            roleFormik.touched.roleName &&
                                roleFormik.errors.roleName
                        ) && (
                            <FormHelperText error id="firstname" color="red">
                                {roleFormik.errors.roleName}
                            </FormHelperText>
                        )}
                    </Box>
                    <Box className="flex justify-end gap-4 items-center">
                        <Button
                            variant="outlined"
                            className="capitalize"
                            onClick={() => {
                                roleFormik.resetForm();
                                handleAddRoleModal();
                            }}
                        >
                            cancel
                        </Button>
                        <Button
                            variant="contained"
                            className="capitalize"
                            onClick={() => roleFormik.handleSubmit()}
                        >
                            Save
                        </Button>
                    </Box>
                </Stack>
            </Modal> */}
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
