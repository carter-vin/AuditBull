/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, InputLabel, FormHelperText, useTheme } from '@mui/material';
import { filter } from 'lodash';
import { API, Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ReactSelect from 'react-select';
import { useQueries } from 'react-query';

import Input from 'components/Input';
import Select from 'components/Select';
import Switch from 'components/Switch';

import { compilantOptions, locationOptions, OptionType } from 'utils/select';

import { listVendorOptions } from 'modules/systems/service';

interface SystemInformationProps {
    formik: any;
}
const SystemInformation = (props: SystemInformationProps) => {
    const { formik } = props;
    const [userList, setuserList] = useState<OptionType[]>([]);
    const [vendorList, setVendorList] = useState<OptionType[]>([]);

    const result = useQueries([
        {
            queryKey: 'vendorList',
            queryFn: listVendorOptions,
            onSuccess: (data: any) => {
                const vendors: OptionType[] = (
                    data?.data?.listVendors?.items || []
                ).map((vendor: { id: string; name: string }) => {
                    return {
                        value: vendor.id,
                        label: vendor.name,
                    };
                });
                setVendorList(vendors);
            },
            onError: (err: any) => {
                toast.error(
                    err.response?.data?.message || 'Failed to fetch vendors'
                );
            },
        },
        {
            queryKey: 'getUserList',
            queryFn: async () => {
                const requestInfo = {
                    response: true,
                    queryStringParameters: {
                        limit: '60',
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${(await Auth.currentSession())
                            .getAccessToken()
                            .getJwtToken()}`,
                    },
                };
                return API.get('AdminQueries', '/listUsers', requestInfo);
            },
            onSuccess: async (data: any) => {
                const currentUser = await Auth.currentAuthenticatedUser();
                const roles = data?.data?.Users.map(
                    (user: {
                        Username: string;
                        Attributes: {
                            Name: string;
                            Value: string;
                        }[];
                        UserStatus: string;
                    }) => {
                        const attributes = user.Attributes;
                        return {
                            value:
                                attributes?.find(
                                    (attr: { Name: string }) =>
                                        attr.Name === 'email'
                                )?.Value || '',
                            label:
                                attributes?.find(
                                    (attr: { Name: string }) =>
                                        attr.Name === 'name'
                                )?.Value ||
                                attributes?.find(
                                    (attr: { Name: string }) =>
                                        attr.Name === 'email'
                                )?.Value ||
                                user.Username ||
                                '',
                        };
                    }
                );
                setuserList(
                    filter(
                        roles,
                        (user: { username: string }) =>
                            user.username !== currentUser?.username
                    )
                );
            },
            onError: (err: any) => {
                toast.error(
                    err.response?.data?.message || 'Failed to fetch users'
                );
            },
        },
    ]);

    const theme = useTheme();
    const reactSelectStyles = {
        control: (provided: any) => ({
            ...provided,
            backgroundColor: 'transparent',
            minHeight: '38px',
            border:
                theme.palette.mode === 'dark'
                    ? '1px solid #fff'
                    : '1px solid #1A202C',
            boxShadow: 'none',
            color: 'red',
        }),

        valueContainer: (provided: any) => ({
            ...provided,
            padding: '0 6px',
        }),

        input: (provided: any) => ({
            ...provided,
            color: theme.palette.mode === 'dark' ? 'white' : 'black',
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: theme.palette.mode === 'dark' ? 'white' : 'black',
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        indicatorsContainer: (provided: any) => ({
            ...provided,
            height: '32px',
            marginTop: -2,
        }),
        menu: (provided: any) => ({
            ...provided,
            zIndex: 9999,
            backgroundColor:
                theme.palette.mode === 'dark' ? '#212839' : 'white',
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            '&:hover': {
                borderColor: 'red',
                color: state.isFocused ? 'black' : 'white',
            },
        }),
        menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
    };
    return (
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 ">
            <Input
                label="System Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={(formik.touched.name && formik.errors.name) || ''}
            />
            <Select
                label="System Status"
                name="status"
                options={compilantOptions || []}
                values={formik.values.status || ''}
                onChange={formik.handleChange}
                error={(formik.touched.status && formik.errors.status) || ''}
            />
            <Box display="flex" flexDirection="column" gap={1}>
                <Box>
                    <InputLabel htmlFor="owner">
                        <strong className="text-gray-700"> System Owner</strong>
                    </InputLabel>
                </Box>
                <ReactSelect
                    value={formik.values.owner}
                    options={userList}
                    styles={reactSelectStyles}
                    isLoading={(result && result[1]?.isLoading) || false}
                    onChange={(value) => formik.setFieldValue('owner', value)}
                    menuPlacement="auto"
                />
                {Boolean(
                    formik.touched?.owner?.value && formik.errors?.owner?.value
                ) && (
                    <FormHelperText error id="owner" color="red">
                        {formik.errors.owner.value}
                    </FormHelperText>
                )}
            </Box>
            <Select
                label="Type"
                name="type"
                options={compilantOptions || []}
                values={formik.values.type || ''}
                onChange={formik.handleChange}
                error={(formik.touched.type && formik.errors.type) || ''}
            />
            <Box className="flex flex-col gap-3">
                <Select
                    label="Location"
                    name="location.type"
                    options={locationOptions || []}
                    values={formik.values?.location?.type || ''}
                    onChange={formik.handleChange}
                    error={
                        (formik.touched?.location?.type &&
                            formik.errors?.location?.type) ||
                        ''
                    }
                />
                {formik.values?.location?.type === 'other' && (
                    <Input
                        label="Other Location"
                        name="location.other_location"
                        value={formik.values?.location?.other_location}
                        onChange={formik.handleChange}
                        error={
                            (formik.touched?.location?.location
                                ?.other_location &&
                                formik.errors?.location?.other_location) ||
                            ''
                        }
                    />
                )}
            </Box>
            <Input
                label="Description"
                type="textarea"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                    (formik.touched.description && formik.errors.description) ||
                    ''
                }
            />
            <Box className="flex flex-col gap-2">
                <Switch
                    label="Vendor provided system ?"
                    name="vendor.vendor_provided"
                    checked={formik.values?.vendor?.vendor_provided || false}
                    onChange={formik.handleChange}
                    error={
                        (formik.touched.vendor?.vendor_provided &&
                            formik.errors.vendor?.vendor_provided) ||
                        ''
                    }
                />
                {formik.values?.vendor?.vendor_provided && (
                    <Box display="flex" flexDirection="column" gap={1}>
                        <Box>
                            <InputLabel htmlFor="owner">
                                <strong className="text-gray-700">
                                    Vendor Name
                                </strong>
                            </InputLabel>
                        </Box>
                        <ReactSelect
                            value={formik.values?.vendor?.vendor}
                            options={vendorList}
                            styles={reactSelectStyles}
                            isLoading={
                                (result && result[0]?.isLoading) || false
                            }
                            onChange={(value) =>
                                formik.setFieldValue(
                                    'vendor.vendor',
                                    value,
                                    true
                                )
                            }
                            menuPlacement="auto"
                        />
                        {Boolean(
                            formik.touched.vendor?.vendor.value &&
                                formik.touched.vendor?.vendor.value
                        ) && (
                            <FormHelperText error id="owner" color="red">
                                {formik.touched.vendor?.vendor.value}
                            </FormHelperText>
                        )}
                    </Box>
                )}
            </Box>
            <Switch
                label="Is this customer facing information system ?"
                name="customer_facing_info_system"
                checked={formik.values.customer_facing_info_system || false}
                onChange={formik.handleChange}
                error={
                    (formik.touched.customer_facing_info_system &&
                        formik.errors.customer_facing_info_system) ||
                    ''
                }
            />
        </Box>
    );
};

export default SystemInformation;
