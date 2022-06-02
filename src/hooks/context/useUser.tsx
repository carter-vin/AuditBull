/* eslint-disable no-console */
import { API, Auth } from 'aws-amplify';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { OptionType } from 'utils/select';

export type IUsers = {
    id?: string;
    firstname?: string;
    lastname?: string;
    middlename?: string;
    username: string;
    name: string;
    email: string;
    role: string;
};

const useUser = () => {
    // states
    const [users, setUsers] = useState<IUsers[]>([]);
    const [userLoading, setUserLoading] = useState<boolean>(false);

    // functions
    const getListOfUsers = async () => {
        setUserLoading(true);
        const currentUser = await Auth.currentAuthenticatedUser();
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
        API.get('AdminQueries', '/listUsers', requestInfo)
            .then((res) => {
                const roles = res.data.Users.map(
                    (
                        user: {
                            Username: string;
                            Attributes: {
                                Name: string;
                                Value: string;
                            }[];
                            UserStatus: string;
                        },
                        index: number
                    ) => {
                        const attributes = user.Attributes;
                        return {
                            id: `${user.Username}-${
                                index + 1
                            }-${Math.random().toFixed(2)}`,
                            username: user.Username || '',
                            name:
                                attributes?.find(
                                    (attr: { Name: string }) =>
                                        attr.Name === 'name'
                                )?.Value || '',
                            email:
                                attributes?.find(
                                    (attr: { Name: string }) =>
                                        attr.Name === 'email'
                                )?.Value || '',
                            role:
                                user.UserStatus === 'FORCE_CHANGE_PASSWORD'
                                    ? 'pending'
                                    : attributes?.find(
                                          (attr: { Name: string }) =>
                                              attr.Name === 'custom:role'
                                      )?.Value || '',
                        };
                    }
                );
                setUsers(
                    filter(
                        roles,
                        (user: { username: string }) =>
                            user.username !== currentUser?.username
                    )
                );
                setUserLoading(false);
            })
            .catch((error) => {
                setUsers([]);
                setUserLoading(false);
                toast.error(
                    error.response?.data?.message || 'Failed to fetch users'
                );
            });
    };

    // function
    const addUserToGroup = async (username: string, userRole?: string) => {
        const requestInfo = {
            body: {
                username,
                groupname: userRole || 'admin',
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
            },
        };
        const res = await API.post(
            'AdminQueries',
            '/addUserToGroup',
            requestInfo
        );
        getListOfUsers();
        return res;
    };

    const createUser = async (values: IUsers) => {
        const requestInfo = {
            response: true,
            body: {
                email: values?.email || '',
                role: values?.role || '',
                name: `${values?.firstname} ${values?.lastname}`,
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
            },
        };
        API.post('AdminQueries', '/adminCreateUser', requestInfo)
            .then(() => {
                getListOfUsers();
                toast.success('User created successfully');
            })
            .catch((error) => {
                toast.error(
                    error.response?.data?.message || 'Error creating user'
                );
            });
    };

    const editUserRole = async (values: IUsers) => {
        const requestInfo = {
            response: true,
            body: {
                username: values?.username || values?.email || '',
                role: values?.role || '',
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
            },
        };
        API.post('AdminQueries', '/adminUpdateUserAttribute', requestInfo)
            .then(() => {
                getListOfUsers();
                toast.success('User role is updated successfully');
            })
            .catch((error) => {
                toast.error(
                    error.response?.data?.message || 'Error updating user'
                );
            });
    };

    const deleteUser = async (username: string) => {
        console.log('the username', username);
        const requestInfo = {
            response: true,
            body: {
                username,
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
            },
        };
        API.post('AdminQueries', '/deleteUser', requestInfo)
            .then(() => {
                getListOfUsers();
                toast.success('User deleted successfully');
            })
            .catch((error) => {
                toast.error(
                    error.response?.data?.message || 'Error deleteing user'
                );
            });
    };

    useEffect(() => {
        getListOfUsers();
    }, []);

    return {
        users,
        userLoading,
        getListOfUsers,
        createUser,
        addUserToGroup,
        deleteUser,
        editUserRole,
    };
};

export default useUser;
