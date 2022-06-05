/* eslint-disable import/export */
/* eslint-disable prefer-destructuring */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import { AppColorModeProvider } from 'hooks/useColorMode';
import { Amplify } from 'aws-amplify';
import createEmotionCache from 'utils/createEmotionCache';
import { StyledEngineProvider } from '@mui/material/styles';

import { AuthProvider } from 'hooks/useAuth';
import { AppDataProvider } from 'hooks/useAppData';
import awsmobile from '../aws-exports';

import 'react-toastify/dist/ReactToastify.css';

// const { NODE_ENV } = process.env;
// const DEFAULT_URL = 'http://localhost:3000/';

// if (NODE_ENV === 'development') {
//     awsmobile.oauth.redirectSignIn = DEFAULT_URL;
//     awsmobile.oauth.redirectSignOut = DEFAULT_URL;
// }
awsmobile.oauth.redirectSignIn = `${window.location.origin}/`;
awsmobile.oauth.redirectSignOut = `${window.location.origin}/`;

Amplify.configure({ ...awsmobile, ssr: true });
// Amplify.Logger.LOG_LEVEL = 'DEBUG';

const clientSideEmotionCache = createEmotionCache();

// eslint-disable-next-line @typescript-eslint/ban-types
type Page<P = {}> = NextPage<P> & {
    getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
    Component: Page;
    emotionCache?: EmotionCache;
};

const MyApp = (props: Props) => {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props;

    const getLayout = Component.getLayout || ((page) => page);
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <StyledEngineProvider injectFirst>
                    <CacheProvider value={emotionCache}>
                        <AppColorModeProvider>
                            <AppDataProvider>
                                <>
                                    <ToastContainer />
                                    {getLayout(<Component {...pageProps} />)}
                                </>
                            </AppDataProvider>
                        </AppColorModeProvider>
                    </CacheProvider>
                </StyledEngineProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
};

export default MyApp;
