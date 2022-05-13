import { API, Auth } from 'aws-amplify';
import { useState } from 'react';

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
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
            },
        };
        const res = await API.get('AdminQueries', '/listUsers', requestInfo);
        const roles = res.data.Users.map(
            (
                user: {
                    Username: string;
                    Attributes: any;
                },
                index: number
            ): any => {
                const attributes = user.Attributes;
                return {
                    id: `${user.Username}-${index + 1}-${Math.random().toFixed(
                        2
                    )}`,
                    username: user.Username || '',
                    name:
                        attributes?.find((attr: any) => attr.Name === 'name')
                            ?.Value || '',
                    email:
                        attributes?.find((attr: any) => attr.Name === 'email')
                            ?.Value || '',
                    role:
                        attributes?.find(
                            (attr: any) => attr.Name === 'custom:role'
                        )?.Value || '',
                };
            }
        );
        setUsers(roles);
        setUserLoading(false);
    };

    const addUserToGroup = async (username: string, userRole?: string) => {
        const requestInfo = {
            body: {
                username,
                groupname: userRole || 'user',
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
        await Auth.signUp({
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
                await addUserToGroup(
                    values?.username || values?.email || '',
                    'admin'
                );
                await Auth.sendCustomChallengeAnswer(
                    res,
                    'NEW_PASSWORD_REQUIRED'
                );
                getListOfUsers();
            })
            // eslint-disable-next-line no-console
            .catch((err) => console.log(`Error signing up: ${err}`));
        getListOfUsers();
    };

    return {
        users,
        userLoading,
        getListOfUsers,
        createUser,
    };
};

export default useUser;
