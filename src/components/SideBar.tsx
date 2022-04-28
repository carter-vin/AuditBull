import { IStackStyles, Stack } from '@fluentui/react';
import { Nav, INavLinkGroup } from '@fluentui/react/lib/Nav';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { AppRoute } from 'utils/route';

const stackStyles: IStackStyles = {
    root: {
        height: '100vh',
        width: '250px',
        borderRight: '2px solid #eaeaea',
    },
};

interface SideBarProps {
    logoImg: string;
    logoText: string;
}

const sidebar: INavLinkGroup[] = [
    {
        links: [
            {
                name: 'Metrics/Dashboard',
                url: AppRoute.Dashboard,
                key: '/',
            },
            {
                name: 'Vendor List',
                url: AppRoute.Vendors,
                key: '/vendors',
                className: 'mt-5',
            },
            {
                name: 'Onboarding',
                url: AppRoute.Onboarding,
                key: '/onboarding',
                className: 'mt-5',
            },
            {
                name: 'Compliance',
                url: AppRoute.Compliance,
                key: '/compliance',
                className: 'mt-5',
            },
            {
                name: 'Contracts',
                url: AppRoute.Contracts,
                key: '/contracts',
                className: 'mt-5',
            },
        ],
    },
];

const SideBar = (props: SideBarProps) => {
    const { logoImg, logoText } = props;
    const router = useRouter();

    return (
        <Stack styles={stackStyles}>
            <div className="flex items-center justify-center w-full">
                <Image src={logoImg} alt={logoText} width={150} height={100} />
            </div>
            <Nav groups={sidebar} selectedKey={String(router.pathname)} />
        </Stack>
    );
};

export default SideBar;
