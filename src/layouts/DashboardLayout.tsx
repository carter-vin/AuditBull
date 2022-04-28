import { DefaultPalette, IStackStyles, Stack } from '@fluentui/react';
import Head from 'next/head';
import type { ReactElement } from 'react';

import Header from 'components/Header';
import SideBar from 'components/SideBar';

const stackStyles: IStackStyles = {
    root: {
        background: DefaultPalette.white,
        height: '100vh',
    },
};

const stackContentStyles: IStackStyles = {
    root: {
        background: DefaultPalette.white,
        height: '100vh',
        padding: '24px 44px',
        width: '100%',
        flex: 1,
    },
};

interface DashboardLayoutProps {
    children?: ReactElement;
    hideHeader?: boolean;
}
const DashboardLayout = (props: DashboardLayoutProps) => {
    const { children, hideHeader } = props;
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                />
            </Head>
            <Stack horizontal horizontalAlign="start" styles={stackStyles} wrap>
                <SideBar logoImg="/vercel.svg" logoText="Audit Bull" />
                <Stack
                    styles={stackContentStyles}
                    verticalAlign="start"
                    tokens={{
                        childrenGap: '24px',
                    }}
                >
                    {!hideHeader && <Header />}
                    <div>{children}</div>
                </Stack>
            </Stack>
        </>
    );
};

export default DashboardLayout;
