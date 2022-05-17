/* eslint-disable no-console */
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
    const [codeSent, setCodeSent] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [newPasswordButton, setNewPasswordButton] = useState(null);

    const checkUser = async () => {
        setLoading(true);
        try {
            const responseUser = await Auth.currentAuthenticatedUser();
            console.log('the response User', responseUser);
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
            .then(async (user) => {
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
                console.log('the response', res);
                const requestInfo = {
                    response: true,
                    body: {
                        username: res?.username || '',
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${
                            res?.signInUserSession?.accessToken?.jwtToken || ''
                        }`,
                    },
                };

                console.log('the request info', requestInfo);
                API.post('AdminQueries', '/verifiedUser', requestInfo)
                    .then(() => {
                        toast.success('User verified');
                    })
                    .catch((error) => {
                        toast.error(
                            error.response?.data?.message || 'user not verified'
                        );
                    });
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

    const getErrorMessage = (code: string, message: string) => {
        switch (code) {
            case 'UserNotConfirmedException':
                return 'You must confirm your account before you can log in';
            case 'UserNotFoundException':
                return 'User not found. Please sign up.';
            default:
                return message || 'User Email is not matched. Try again.';
        }
    };

    const forgetPassword = (username: string) => {
        Auth.forgotPassword(username)
            .then((data) => {
                setCodeSent(true);
                console.log('data on forgetPassword', data);
                toast.success(`Confirmation code is send to ${username}`);
            })
            .catch((err) => {
                setCodeSent(false);
                console.log('error on forgetPassword', {
                    err,
                    type: err.code,
                });

                toast.error(getErrorMessage(err.code, err.message));
            });
    };

    const confirmForgetPassword = ({
        username,
        code,
        newPassword,
    }: {
        username: string;
        code: string;
        newPassword: string;
    }) => {
        Auth.forgotPasswordSubmit(username, code, newPassword)
            .then((data) => {
                console.log('the response data', data);
                toast.success('Password is changed successfully');
                setCodeSent(false);
                router.push('/');
            })
            .catch((err) => {
                console.log('the error', err);
                toast.error(
                    err.message || 'Invalid code  Or Failed to update password'
                );
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
        codeSent,
        loginUser,
        newPasswordButton,
        setLoginUser,
        logOutUser,
        loginBySlack,
        loginByAzure,
        loginByUserName,
        updateNewPassword,
        forgetPassword,
        confirmForgetPassword,
    };
};

// setup provider
export const AuthProvider = ({ children }: { children: ReactElement }) => {
    const data = useAuthProvider();
    return <Provider value={data}>{children}</Provider>;
};

export const useAuth = () => useContext(authContext);
