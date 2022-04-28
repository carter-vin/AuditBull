import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider, initializeIcons } from '@fluentui/react';

initializeIcons();

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

export default MyApp;
