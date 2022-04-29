import { AppBar, List, ListItemButton, Toolbar, Box } from '@mui/material';
import { useRouter } from 'next/router';

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
    const router = useRouter();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                color="transparent"
                className="drop-shadow-none	"
                sx={{
                    boxShadow: 'none',
                }}
            >
                <Toolbar className="flex justify-between items-center">
                    <Box>
                        <ListItemButton
                            component="a"
                            color="inherit"
                            href="/"
                            key="home"
                            selected={router.pathname === '/'}
                        >
                            Home
                        </ListItemButton>
                    </Box>
                    <List className="flex justify-end items-center gap-8">
                        {headerMenu.map((item: HeaderMenu) => (
                            <ListItemButton
                                selected={router.pathname === item.href}
                                component="a"
                                color="inherit"
                                href={item.href}
                                key={item.label}
                            >
                                {item.label}
                            </ListItemButton>
                        ))}
                    </List>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
