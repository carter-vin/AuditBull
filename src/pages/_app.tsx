/* eslint-disable import/export */
/* eslint-disable prefer-destructuring */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { ReactNode } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ToastContainer } from 'react-toastify';

import { Amplify } from 'aws-amplify';
import createEmotionCache from 'utils/createEmotionCache';
import theme from 'utils/theme';
import { AuthProvider } from 'hooks/useAuth';
import { AppDataProvider } from 'hooks/useAppData';
import awsmobile from '../aws-exports';

import 'react-toastify/dist/ReactToastify.css';

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

    return (
        <AuthProvider>
            <AppDataProvider>
                <CacheProvider value={emotionCache}>
                    <ThemeProvider theme={theme}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        <ToastContainer />
                        {getLayout(<Component {...pageProps} />)}
                    </ThemeProvider>
                </CacheProvider>
            </AppDataProvider>
        </AuthProvider>
    );
};

export default MyApp;
