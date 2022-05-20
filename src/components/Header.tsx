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
    Button,
    Collapse,
    ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

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
    const [openMyAccount, setOpenMyAccount] = useState<boolean>(false);

    const handleMyAccountClick = () => {
        setOpenMyAccount(!openMyAccount);
    };

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
        <Box sx={{ marginTop: 1 }}>
            <AppBar
                position="static"
                color="transparent"
                className="drop-shadow-none	"
                sx={{
                    boxShadow: 'none',
                }}
            >
                <Toolbar className=" flex justify-end  md:justify-between md:items-center p-0 ">
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
                            {anchorElNav ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            PaperProps={{
                                style: {
                                    width: 300,
                                    padding: '1rem',
                                },
                            }}
                        >
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

                            <ListItemButton
                                color="inherit"
                                onClick={() => handleMyAccountClick()}
                            >
                                <ListItemText primary=" My Account" />
                                {openMyAccount ? (
                                    <ExpandLess />
                                ) : (
                                    <ExpandMore />
                                )}
                            </ListItemButton>

                            <Collapse
                                in={openMyAccount}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List component="div" disablePadding>
                                    <ListItemButton
                                        component="a"
                                        color="inherit"
                                        href="/profile"
                                        key="profile"
                                        selected={
                                            router.pathname === '/profile'
                                        }
                                    >
                                        Profile
                                    </ListItemButton>

                                    <Button
                                        variant="contained"
                                        sx={{
                                            marginLeft: 1.5,
                                            marginTop: 1,
                                        }}
                                        onClick={() => logOutUser()}
                                    >
                                        Logout
                                    </Button>
                                </List>
                            </Collapse>
                        </Menu>
                    </Box>

                    {/* for desktop */}
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
