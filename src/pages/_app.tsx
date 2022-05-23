/* eslint-disable import/export */
/* eslint-disable prefer-destructuring */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { ReactNode } from 'react';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import { AppColorModeProvider } from 'hooks/useColorMode';
import { Amplify } from 'aws-amplify';
import createEmotionCache from 'utils/createEmotionCache';
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
                    <AppColorModeProvider>
                        <>
                            <ToastContainer />
                            {getLayout(<Component {...pageProps} />)}
                        </>
                    </AppColorModeProvider>
                </CacheProvider>
            </AppDataProvider>
        </AuthProvider>
    );
};

export default MyApp;
