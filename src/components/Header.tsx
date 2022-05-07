import {
    AppBar,
    List,
    ListItemButton,
    Avatar,
    Toolbar,
    Box,
    Menu,
    MenuItem,
} from '@mui/material';
import { useAuth } from 'hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { stringAvatar, stringToColor } from 'utils/stringAvatar';

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
    const { logOutUser, loginUser } = useAuth();
    const { name } = (loginUser && loginUser.attributes) || {};
    const [menu, setMenu] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setMenu(event.currentTarget);
    };

    const handleClose = () => {
        setMenu(null);
    };

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

                        <Box>
                            <Avatar
                                id="menu-positioned-button"
                                aria-controls={
                                    menu ? 'menu-positioned-button' : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={menu ? 'true' : undefined}
                                onClick={handleClick}
                                {...stringAvatar(name || 'Unknown User')}
                                sx={{
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    bgcolor: stringToColor(
                                        name || 'Unknown User'
                                    ),
                                }}
                            />
                            <Menu
                                id="menu-positioned-button"
                                aria-labelledby="menu-positioned-button"
                                anchorEl={menu}
                                open={Boolean(menu)}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <MenuItem onClick={handleClose}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={() => logOutUser()}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    </List>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
