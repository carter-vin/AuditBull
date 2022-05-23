import {
    Stack,
    Box,
    InputLabel,
    TextField,
    FormHelperText,
    Button,
    Paper,
    useTheme,
} from '@mui/material';
import Select from 'react-select';

import { useFormik } from 'formik';
import { useAppData } from 'hooks/useAppData';
import * as Yup from 'yup';
import { map } from 'lodash';
import { IUsers } from 'hooks/context/useUser';

type UserRegisterPayload = {
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    role: {
        label: string;
        value: string;
    }[];
    username?: string;
    name?: string;
};

interface UserFormProps {
    callback: () => void;
    user?: IUsers;
}

const roleOptions = [
    { label: 'Admin', value: 'superadmin' },
    { label: 'System', value: 'system' },
    { label: 'Vendor', value: 'vendor' },
    { label: 'Personnel', value: 'personnel' },
    { label: 'Audit', value: 'audit' },
];

const converRoleStringToArray = (role: string) => {
    const tempArray = role.split(',');
    return map(tempArray, (item: string) => {
        return { label: item, value: item };
    });
};

const UserForm = (props: UserFormProps) => {
    const { callback, user } = props;
    const theme = useTheme();
    const {
        userReducer: { createUser, editUserRole },
    } = useAppData();

    converRoleStringToArray(user?.role || '');
    const formik = useFormik<UserRegisterPayload>({
        initialValues: {
            email: user?.email || '',
            role:
                user && user.role
                    ? converRoleStringToArray(user?.role || '')
                    : [],
            username: user?.username || '',
            firstname: user?.firstname || '',
            middlename: user?.middlename || '',
            lastname: user?.lastname || '',
            name: user?.name || '',
        },
        validationSchema: user
            ? Yup.object().shape({
                  email: Yup.string()
                      .email('Please provide valid email')
                      .required('Email is required'),
                  role: Yup.array().required('Role is required'),
              })
            : Yup.object().shape({
                  email: Yup.string()
                      .email('Please provide valid email')
                      .required('Email is required'),
                  firstname: Yup.string().required('First name is required'),
                  lastname: Yup.string().required('Last name is required'),
                  role: Yup.array().required('Role is required'),
              }),
        onSubmit: async (
            values: UserRegisterPayload,
            { setSubmitting, resetForm }
        ) => {
            const roles = map(values.role, (item: { value: string }) => {
                return item.value;
            });

            const loginPayload = {
                email: values.email,
                firstname: values.firstname,
                lastname: values.lastname,
                middlename: values.middlename,
                role: roles.toString(),
                username: values.username || values.email,
            };
            setSubmitting(true);
            if (user) {
                await editUserRole(loginPayload);
            } else {
                await createUser(loginPayload);
            }

            resetForm();
            callback();
            setSubmitting(false);
        },
    });

    const customStyles = {
        control: () => ({
            display: 'flex',
            alignItems: 'center',
            background: 'transparent',
        }),
        menu: () => ({
            backgroundColor:
                theme.palette.mode === 'light' ? 'white' : '#212839',
            position: 'absolute',
            width: '100%',
            zIndex: 2,
        }),
        menuList: () => ({
            overflowY: 'auto',
            '&:hover': {
                backgroundColor: 'none',
            },
        }),
    };

    return (
        <Stack spacing={4}>
            {user ? (
                <Box display="flex" flexDirection="column" gap={1}>
                    <Box>
                        <InputLabel htmlFor="email">
                            <strong className="text-gray-700">Full Name</strong>
                        </InputLabel>
                    </Box>
                    <TextField
                        size="small"
                        fullWidth
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        id="name"
                        placeholder="jhon_doe"
                        variant="outlined"
                        disabled={Boolean(user)}
                    />
                </Box>
            ) : (
                <>
                    <Box display="flex" flexDirection="column" gap={1}>
                        <Box>
                            <InputLabel htmlFor="email">
                                <strong className="text-gray-700">
                                    First Name *
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
                            disabled={Boolean(user)}
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
                            disabled={Boolean(user)}
                        />
                    </Box>
                    <Box display="flex" flexDirection="column" gap={1}>
                        <Box>
                            <InputLabel htmlFor="lastname">
                                <strong className="text-gray-700">
                                    Last Name *
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
                            disabled={Boolean(user)}
                        />
                        {Boolean(
                            formik.touched.lastname && formik.errors.lastname
                        ) && (
                            <FormHelperText error id="lastname" color="red">
                                {formik.errors.lastname}
                            </FormHelperText>
                        )}
                    </Box>
                </>
            )}
            <Box display="flex" flexDirection="column" gap={1}>
                <Box>
                    <InputLabel htmlFor="email">
                        <strong className="text-gray-700">
                            Email address *
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
                    disabled={Boolean(user)}
                />
                {Boolean(formik.touched.email && formik.errors.email) && (
                    <FormHelperText error id="email" color="red">
                        {formik.errors.email}
                    </FormHelperText>
                )}
            </Box>

            <Box display="flex" flexDirection="column" gap={1}>
                <Box>
                    <InputLabel htmlFor="email">
                        <strong className="text-gray-700">User Role </strong>
                    </InputLabel>
                </Box>
                <Paper>
                    <Select
                        options={roleOptions}
                        isMulti
                        styles={customStyles}
                        value={formik.values.role}
                        onChange={(values) =>
                            formik.setFieldValue('role', values)
                        }
                    />
                </Paper>
            </Box>
            <Box className="flex justify-end gap-4 items-center">
                <Button
                    variant="outlined"
                    className="capitalize"
                    onClick={() => {
                        formik.resetForm();
                        callback();
                    }}
                >
                    cancel
                </Button>
                <Button
                    variant="contained"
                    className="capitalize"
                    onClick={() => formik.handleSubmit()}
                >
                    {user ? 'Update' : 'Save'}
                </Button>
            </Box>
        </Stack>
    );
};

export default UserForm;
