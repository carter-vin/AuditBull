import { DefaultButton, Stack } from '@fluentui/react';

export type HeaderMenu = {
    label: string;
    href?: string;
};

const headerMenu: HeaderMenu[] = [
    {
        label: 'Systems',
        href: '/systems',
    },
    {
        label: 'Vendors',
        href: '/vendors',
    },
    {
        label: 'Personnel',
        href: '/peronnel',
    },
    {
        label: 'Audit',
        href: '/audit',
    },
    {
        label: 'Settings',
        href: '/settings',
    },
];

const Header = () => {
    return (
        <Stack
            horizontal
            horizontalAlign="space-between"
            tokens={{
                childrenGap: '32px',
            }}
        >
            <DefaultButton
                text="Home"
                className="p-2 rounded-md"
                allowDisabledFocus
            />

            <Stack
                horizontal
                horizontalAlign="end"
                className=" w-8/12"
                tokens={{
                    childrenGap: 24,
                }}
            >
                {headerMenu.map((item: HeaderMenu) => (
                    <DefaultButton
                        key={item.label}
                        text={item.label}
                        className="p-2 rounded-md"
                        allowDisabledFocus
                    />
                ))}
            </Stack>
        </Stack>
    );
};

export default Header;
