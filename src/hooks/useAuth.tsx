/* eslint-disable default-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useContext, createContext, useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { API, Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

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

type LoginPayload = {
    username: string;
    password: string;
    rememberme?: boolean;
};

export type NewPasswordType = {
    username: string;
    password: string;
};

// setting up the state (reducers)
const useAuthProvider = () => {
    const router = useRouter();
    const [loginUser, setLoginUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [newPasswordButton, setNewPasswordButton] = useState(null);

    const checkUser = async () => {
        setLoading(true);
        try {
            const responseUser = await Auth.currentAuthenticatedUser();
            if (
                responseUser &&
                responseUser.signInUserSession?.idToken?.payload?.[
                    'cognito:groups'
                ]?.includes(
                    'us-east-1_7BaljQxPv_slack' ||
                        'us-east-1_7BaljQxPv_Google' ||
                        'us-east-1_7BaljQxPv_azure' ||
                        'us-east-1_7BaljQxPv_slack' ||
                        'us-east-1_GNePfVnuf_azure' ||
                        'us-east-1_GNePfVnuf_slack' ||
                        'us-east-1_GNePfVnuf_Google'
                )
            ) {
                addUserToGroup(
                    responseUser?.username ||
                        responseUser?.attribute?.email ||
                        '',
                    'admin'
                );
                Auth.updateUserAttributes(responseUser, {
                    'custom:role': 'admin',
                });
            }
            setLoginUser(responseUser);
            setLoading(false);
        } catch (error) {
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

    const loginByUserName = (values: LoginPayload) => {
        Auth.signIn({
            username: values.username,
            password: values.password,
        })
            .then((user) => {
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    setNewPasswordButton(user);
                } else {
                    checkUser();
                    router.push('/');
                    setNewPasswordButton(null);
                }
            })
            .catch((error) => {
                toast.error(
                    error.message ||
                        'User Email or Password is not matched. Try again.'
                );
            });
    };

    const updateNewPassword = ({ username, password }: NewPasswordType) => {
        Auth.completeNewPassword(newPasswordButton, password)
            .then(async (res) => {
                setNewPasswordButton(null);
                await loginByUserName({
                    username: res?.username || username,
                    password,
                });
            })
            .catch((error) => {
                toast.error(error?.message || 'Password patterns donot match');
            });
    };

    const logOutUser = () => {
        setLoading(true);
        Auth.signOut()
            .then(() => {
                setLoginUser({});
                setLoading(false);
                checkUser();
                router.push('/login');
                toast.success('Logged out successfully');
            })
            .catch((error) => {
                toast.error(error?.message || 'Error logging out');
            });
        checkUser();
    };

    useEffect(() => {
        checkUser();
    }, []);

    return {
        loading,
        loginUser,
        newPasswordButton,
        setLoginUser,
        logOutUser,
        loginBySlack,
        loginByAzure,
        loginByUserName,
        updateNewPassword,
    };
};

// setup provider
export const AuthProvider = ({ children }: { children: ReactElement }) => {
    const data = useAuthProvider();
    return <Provider value={data}>{children}</Provider>;
};

export const useAuth = () => useContext(authContext);
