/* eslint-disable no-console */
import { API, Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type IUsers = {
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
                            Attributes: any;
                        },
                        index: number
                    ): any => {
                        const attributes = user.Attributes;
                        console.log('the attributes', attributes);
                        return {
                            id: `${user.Username}-${
                                index + 1
                            }-${Math.random().toFixed(2)}`,
                            username: user.Username || '',
                            name:
                                attributes?.find(
                                    (attr: any) => attr.Name === 'name'
                                )?.Value || '',
                            email:
                                attributes?.find(
                                    (attr: any) => attr.Name === 'email'
                                )?.Value || '',
                            role:
                                attributes?.find(
                                    (attr: any) => attr.Name === 'custom:role'
                                )?.Value || '',
                        };
                    }
                );
                setUsers(roles);
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
                username: values?.username || values?.email || '',
                password: 'Ch@ng3Me',
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
            .then((res) => {
                console.log('the res', res);
                getListOfUsers();
                toast.success('User created successfully');
            })
            .catch((error) => {
                toast.error(
                    error.response?.data?.message || 'Error creating user'
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
            .then((res) => {
                console.log('the res', res);
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
    };
};

export default useUser;
