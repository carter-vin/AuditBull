/* eslint-disable no-console */
/* eslint-disable default-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useContext, createContext, useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { API, Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

const authContext = createContext<any>({});
const { Provider } = authContext;

const addUserToGroup = async (username: string, userRole?: string) => {
    const requestInfo = {
        body: {
            username,
            groupname: userRole || 'users',
        },
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${(await Auth.currentSession())
                .getAccessToken()
                .getJwtToken()}`,
        },
    };
    const res = await API.post('AdminQueries', '/addUserToGroup', requestInfo);
    return res;
};

// setting up the state (reducers)
const useAuthProvider = () => {
    const router = useRouter();
    const [loginUser, setLoginUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const checkUser = async () => {
        setLoading(true);
        try {
            const responseUser = await Auth.currentAuthenticatedUser();
            console.log('the responseUser', responseUser);
            // if (
            //     responseUser?.signInUserSession.idToken.payload?.[
            //         'cognito:groups'
            //     ]?.includes(
            //         'us-east-1_7BaljQxPv_Google' ||
            //             'us-east-1_7BaljQxPv_azure' ||
            //             'us-east-1_7BaljQxPv_slack'
            //     )
            // ) {
            //     await addUserToGroup(
            //         responseUser?.username ||
            //             responseUser?.attribute?.email ||
            //             '',
            //         'admin'
            //     );
            //     await Auth.updateUserAttributes(responseUser, {
            //         'custom:role': 'admin',
            //     });
            // }
            setLoginUser(responseUser);
            setLoading(false);
        } catch (error) {
            console.log('the error: ', error);
            setLoginUser(null);
            setLoading(false);
            router.push('/login');
        }
    };

    const loginBySlack = () => {
        Auth.federatedSignIn({
            customProvider: 'slack',
        });
        checkUser();
    };

    const loginByAzure = () => {
        Auth.federatedSignIn({
            customProvider: 'azure',
        });
        checkUser();
    };

    const logOutUser = async () => {
        setLoading(true);
        try {
            const res = await Auth.signOut();
            if (res) {
                setLoginUser({});
                setLoading(false);
                router.push('/login');
            }
        } catch (error) {
            console.log('error signing out: ', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    return {
        loading,
        loginUser,
        setLoginUser,
        logOutUser,
        loginBySlack,
        loginByAzure,
    };
};

// setup provider
export const AuthProvider = ({ children }: { children: ReactElement }) => {
    const data = useAuthProvider();
    return <Provider value={data}>{children}</Provider>;
};

export const useAuth = () => useContext(authContext);
