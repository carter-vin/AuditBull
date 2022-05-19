import {
    AppBar,
    List,
    ListItemButton,
    Avatar,
    Toolbar,
    Box,
    Menu,
    MenuItem,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

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
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setMenu(event.currentTarget);
    };

    const handleClose = () => {
        setMenu(null);
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box sx={{ flexGrow: 1, marginTop: 1 }}>
            <AppBar
                position="static"
                color="transparent"
                className="drop-shadow-none	"
                sx={{
                    boxShadow: 'none',
                }}
            >
                <Toolbar className=" flex justify-end  md:justify-between md:items-center ">
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                            justifyContent: 'flex-end',
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <Box className="flex justify-center items-center mb-3">
                                <Avatar
                                    id="menu-positioned-button"
                                    aria-controls={
                                        menu
                                            ? 'menu-positioned-button'
                                            : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={menu ? 'true' : undefined}
                                    onClick={handleClick}
                                    {...stringAvatar(name || 'Unknown User')}
                                    sx={{
                                        cursor: 'pointer',
                                        textTransform: 'uppercase',
                                        justifyContent: 'center',
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

                            <ListItemButton
                                component="a"
                                color="inherit"
                                href="/"
                                key="home"
                                selected={router.pathname === '/'}
                            >
                                Home
                            </ListItemButton>
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
                        </Menu>
                    </Box>

                    <Box className="hidden md:block -ml-4">
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
                    <List className="justify-end items-center gap-8 hidden md:flex">
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
