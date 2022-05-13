import { useContext, createContext } from 'react';
import type { ReactElement } from 'react';

import useUser from './context/useUser';

const appDataContext = createContext<any>({});
const { Provider } = appDataContext;

// setting up the state (reducers)
const useAppDataProvider = () => {
    const userReducer = useUser();
    return {
        userReducer,
    };
};

// setup provider
export const AppDataProvider = ({ children }: { children: ReactElement }) => {
    const data = useAppDataProvider();
    return <Provider value={data}>{children}</Provider>;
};

export const useAppData = () => useContext(appDataContext);
