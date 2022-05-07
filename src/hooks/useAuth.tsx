/* eslint-disable no-console */
/* eslint-disable default-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useContext, createContext, useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

const authContext = createContext<any>({});
const { Provider } = authContext;

// setting up the state (reducers)
const useAuthProvider = () => {
    const router = useRouter();
    const [loginUser, setLoginUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const checkUser = async () => {
        setLoading(true);
        try {
            const responseUser = await Auth.currentAuthenticatedUser();
            setLoginUser(responseUser);
            setLoading(false);
        } catch (error) {
            console.log('the error: ', error);
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

    const logOutUser = async () => {
        setLoading(true);
        try {
            const res = await Auth.signOut({ global: true });
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
    };
};

// setup provider
export const AuthProvider = ({ children }: { children: ReactElement }) => {
    const data = useAuthProvider();
    return <Provider value={data}>{children}</Provider>;
};

export const useAuth = () => useContext(authContext);
