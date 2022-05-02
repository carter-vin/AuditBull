import { Box } from '@mui/material';
import Head from 'next/head';
import type { ReactElement } from 'react';

interface BlankLayoutProps {
    children?: ReactElement;
}
const BlankLayout = (props: BlankLayoutProps) => {
    const { children } = props;
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                />
            </Head>
            <Box sx={{ display: 'flex' }}>{children}</Box>
        </>
    );
};

export default BlankLayout;
