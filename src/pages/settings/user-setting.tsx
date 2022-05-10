/* eslint-disable no-console */
import { ReactElement, useEffect, useState } from 'react';
import {
    CircularProgress,
    Box,
    Typography,
    Stack,
    Button,
    IconButton,
    FormHelperText,
    InputLabel,
    TextField,
    MenuItem,
} from '@mui/material';
import { useAuth } from 'hooks/useAuth';
import { useRouter } from 'next/router';
import { GridColDef } from '@mui/x-data-grid';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import SettingLayout from 'modules/setting/SettingLayout';
import Table from 'components/Table';

// icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from 'components/Modal';
import { API, Auth } from 'aws-amplify';

type UserRegisterPayload = {
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    role: string;
    username?: string;
};

type RolePayload = {
    roleName: string;
};

const role = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
];
const UserSetting = () => {
    const { loginUser, loading } = useAuth();
    const router = useRouter();
    console.log('the login User', loginUser);

    // states
    const [addUserModal, setAdduserModal] = useState<boolean>(false);
    const [addRoleModal, setAddRoleModal] = useState<boolean>(false);
    const handleAddUserModal = () => {
        setAdduserModal(!addUserModal);
    };

    const handleAddRoleModal = () => {
        setAddRoleModal(!addRoleModal);
    };

    const formik = useFormik<UserRegisterPayload>({
        initialValues: {
            email: '',
            role: '',
            username: '',
            firstname: '',
            middlename: '',
            lastname: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Please provide valid email')
                .required('Email is required'),
            firstname: Yup.string().required('First name is required'),
            lastname: Yup.string().required('Last name is required'),
        }),
        onSubmit: async (values: UserRegisterPayload, { setSubmitting }) => {
            setSubmitting(true);
            Auth.signUp({
                username: values?.username || values?.email || '',
                password: 'Ch@ng3Me',
                attributes: {
                    email: values?.email,
                    name: `${values?.firstname} ${values?.lastname}`,
                    'custom:role': values?.role,
                },
            })
                .then(async (res) => {
                    // Auth.('NEW_PASSWORD_REQUIRED');
                    await Auth.sendCustomChallengeAnswer(
                        res,
                        'NEW_PASSWORD_REQUIRED'
                    );
                    const token = loginUser.signInUserSession.idToken.jwtToken;
                    const requestInfo = {
                        body: {
                            username: values.email,
                            groupname: 'users',
                        },
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': "'*'",
                            Authorization: token,
                        },
                    };
                    const data = await API.post(
                        'AdminQueries',
                        '/addUserToGroup',
                        requestInfo
                    );
                    console.log('the post data are', data);
                })
                .catch((err) => console.log(`Error signing up: ${err}`));
            setSubmitting(false);
        },
    });

    const roleFormik = useFormik<RolePayload>({
        initialValues: {
            roleName: '',
        },
        validationSchema: Yup.object().shape({
            roleName: Yup.string().required('First name is required'),
        }),
        onSubmit: async (values: RolePayload, { setSubmitting }) => {
            setSubmitting(true);
            console.log('the values', values);
            setSubmitting(false);
        },
    });

    const getListOfUsers = async () => {
        console.log('the response are');
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.accessToken.jwtToken;
        console.log({ token });

        const requestInfo = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                Authorization: `Bearer ${token}`,
            },
        };

        const data = await API.get('AdminQueries', '/listUsers', requestInfo);
        console.log({ data });
    };

    useEffect(() => {
        getListOfUsers();
    }, []);

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
    }, []);

    if (loading) {
        return (
            <Box className="h-full w-full flex flex-col items-center justify-center">
                <CircularProgress />
            </Box>
        );
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
        },
        {
            field: '',
            headerName: 'Actions',
            flex: 1,
            filterable: false,
            renderCell: () => {
                return (
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <IconButton aria-label="delete">
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                );
            },
        },
    ];

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
                        </div>
                    )}
                </Stack>
                <Box>
                    <Table columns={columns || []} data={[]} noFilter />
                </Box>
            </Stack>
            <Modal
                open={addUserModal}
                onClose={handleAddUserModal}
                name="add-user-modal"
            >
                <Stack spacing={4}>
                    <Box display="flex" flexDirection="column" gap={1}>
                        <Box>
                            <InputLabel htmlFor="email">
                                <strong className="text-gray-700">
                                    First Name
                                </strong>
                            </InputLabel>
                        </Box>
                        <TextField
                            size="small"
                            fullWidth
                            name="firstname"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            id="firstname"
                            placeholder="jhon_doe"
                            variant="outlined"
                        />
                        {Boolean(
                            formik.touched.firstname && formik.errors.firstname
                        ) && (
                            <FormHelperText error id="firstname" color="red">
                                {formik.errors.firstname}
                            </FormHelperText>
                        )}
                    </Box>
                    <Box display="flex" flexDirection="column" gap={1}>
                        <Box>
                            <InputLabel htmlFor="middlename">
                                <strong className="text-gray-700">
                                    Middle Name ( optional )
                                </strong>
                            </InputLabel>
                        </Box>
                        <TextField
                            size="small"
                            fullWidth
                            name="middlename"
                            value={formik.values.middlename}
                            onChange={formik.handleChange}
                            id="middlename"
                            placeholder="jhon_doe"
                            variant="outlined"
                        />
                    </Box>
                    <Box display="flex" flexDirection="column" gap={1}>
                        <Box>
                            <InputLabel htmlFor="lastname">
                                <strong className="text-gray-700">
                                    Last Name
                                </strong>
                            </InputLabel>
                        </Box>
                        <TextField
                            size="small"
                            fullWidth
                            name="lastname"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            id="lastname"
                            placeholder="jhon_doe"
                            variant="outlined"
                        />
                        {Boolean(
                            formik.touched.lastname && formik.errors.lastname
                        ) && (
                            <FormHelperText error id="lastname" color="red">
                                {formik.errors.lastname}
                            </FormHelperText>
                        )}
                    </Box>
                    <Box display="flex" flexDirection="column" gap={1}>
                        <Box>
                            <InputLabel htmlFor="email">
                                <strong className="text-gray-700">
                                    Email address
                                </strong>
                            </InputLabel>
                        </Box>
                        <TextField
                            size="small"
                            fullWidth
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            id="email"
                            placeholder="john@gmail.com"
                            variant="outlined"
                        />
                        {Boolean(
                            formik.touched.email && formik.errors.email
                        ) && (
                            <FormHelperText error id="email" color="red">
                                {formik.errors.email}
                            </FormHelperText>
                        )}
                    </Box>

                    <Box display="flex" flexDirection="column" gap={1}>
                        <Box>
                            <InputLabel htmlFor="email">
                                <strong className="text-gray-700">
                                    User Name ( optional )
                                </strong>
                            </InputLabel>
                        </Box>
                        <TextField
                            size="small"
                            fullWidth
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            id="username"
                            placeholder="jhon_doe"
                            variant="outlined"
                        />
                        {Boolean(
                            formik.touched.username && formik.errors.username
                        ) && (
                            <FormHelperText error id="username" color="red">
                                {formik.errors.username}
                            </FormHelperText>
                        )}
                    </Box>

                    <Box display="flex" flexDirection="column" gap={1}>
                        <Box>
                            <InputLabel htmlFor="email">
                                <strong className="text-gray-700">
                                    User Name ( optional )
                                </strong>
                            </InputLabel>
                        </Box>
                        <TextField
                            size="small"
                            select
                            fullWidth
                            name="role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            id="role"
                            variant="outlined"
                        >
                            {role.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        {/* {Boolean(
                            formik.touched.role && formik.errors.role
                        ) && (
                            <FormHelperText error id="role" color="red">
                                {formik.errors.role}
                            </FormHelperText>
                        )} */}
                    </Box>
                    <Box className="flex justify-end gap-4 items-center">
                        <Button
                            variant="outlined"
                            className="capitalize"
                            onClick={() => {
                                formik.resetForm();
                                handleAddUserModal();
                            }}
                        >
                            cancel
                        </Button>
                        <Button
                            variant="contained"
                            className="capitalize"
                            onClick={() => formik.handleSubmit()}
                        >
                            Save
                        </Button>
                    </Box>
                </Stack>
            </Modal>
            <Modal
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
            </Modal>
        </>
    );
};

UserSetting.getLayout = (page: ReactElement) => {
    return <SettingLayout>{page}</SettingLayout>;
};

export default UserSetting;
