import {
    Stack,
    Box,
    InputLabel,
    TextField,
    FormHelperText,
    Button,
} from '@mui/material';
import Select from 'react-select';

import { useFormik } from 'formik';
import { useAppData } from 'hooks/useAppData';
import * as Yup from 'yup';
import { map } from 'lodash';

type UserRegisterPayload = {
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    role: {
        label: string;
        value: string;
    };
    username?: string;
};

interface UserFormProps {
    callback: () => void;
}

const roleOptions = [
    { label: 'Admin', value: 'superadmin' },
    { label: 'System', value: 'system' },
    { label: 'Vendor', value: 'vendor' },
    { label: 'Personnel', value: 'personnel' },
    { label: 'Audit', value: 'audit' },
];

const UserForm = (props: UserFormProps) => {
    const { callback } = props;
    const {
        userReducer: { createUser },
    } = useAppData();

    const formik = useFormik<UserRegisterPayload>({
        initialValues: {
            email: '',
            role: {
                label: 'Personnal',
                value: 'personnal',
            },
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
                username: values.email,
            };
            setSubmitting(true);
            await createUser(loginPayload);
            resetForm();
            callback();
            setSubmitting(false);
        },
    });

    return (
        <Stack spacing={4}>
            <Box display="flex" flexDirection="column" gap={1}>
                <Box>
                    <InputLabel htmlFor="email">
                        <strong className="text-gray-700">First Name *</strong>
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
                        <strong className="text-gray-700">Last Name *</strong>
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
                {Boolean(formik.touched.lastname && formik.errors.lastname) && (
                    <FormHelperText error id="lastname" color="red">
                        {formik.errors.lastname}
                    </FormHelperText>
                )}
            </Box>
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
                />
                {Boolean(formik.touched.email && formik.errors.email) && (
                    <FormHelperText error id="email" color="red">
                        {formik.errors.email}
                    </FormHelperText>
                )}
            </Box>

            {/* <Box display="flex" flexDirection="column" gap={1}>
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
                {Boolean(formik.touched.username && formik.errors.username) && (
                    <FormHelperText error id="username" color="red">
                        {formik.errors.username}
                    </FormHelperText>
                )}
            </Box> */}

            <Box display="flex" flexDirection="column" gap={1}>
                <Box>
                    <InputLabel htmlFor="email">
                        <strong className="text-gray-700">User Role </strong>
                    </InputLabel>
                </Box>
                <Select
                    options={roleOptions}
                    isMulti
                    value={formik.values.role}
                    onChange={(values) => formik.setFieldValue('role', values)}
                />
                {/* <TextField
                    size="small"
                    select
                    fullWidth
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    id="role"
                    variant="outlined"
                >
                    {roleOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField> */}
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
                    Save
                </Button>
            </Box>
        </Stack>
    );
};

export default UserForm;
