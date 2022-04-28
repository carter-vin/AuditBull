import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { ReactNode } from 'react';
// import { , EmotionCache } from '@emotion/react';

import theme from 'utils/theme';
import { ThemeProvider } from '@fluentui/react';
// import createEmotionCache from 'utils/createEmotionCache';
// import { CssBaseline, ThemeProvider } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/ban-types
type Page<P = {}> = NextPage<P> & {
    getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
    Component: Page;
    // emotionCache?: EmotionCache;
};

// const clientSideEmotionCache = createEmotionCache();

const MyApp = ({ Component, pageProps }: Props) => {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
    );
};

export default MyApp;
