import {
    ListItemText,
    styled,
    Drawer as MuiDrawer,
    Theme,
    CSSObject,
    List,
    ListItemButton,
    ListItemIcon,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

// icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import CommentIcon from '@mui/icons-material/Comment';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

import { AppRoute } from 'utils/route';

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

interface SideBarProps {
    logoImg: string;
    logoText: string;
}

type SideBarLink = {
    name: string;
    url: string;
    key: string;
    className?: string;
    icon: JSX.Element;
};

type SideBar = {
    links: SideBarLink[];
};

const sidebar: SideBar = {
    links: [
        {
            name: 'Metrics/Dashboard',
            url: AppRoute.Dashboard,
            key: '/',
            icon: <DashboardIcon />,
        },
        {
            name: 'Vendor List',
            url: AppRoute.Vendors,
            key: '/vendors',
            className: 'mt-5',
            icon: <DeliveryDiningIcon />,
        },
        {
            name: 'Onboarding',
            url: AppRoute.Onboarding,
            key: '/onboarding',
            className: 'mt-5',
            icon: <AirplanemodeActiveIcon />,
        },
        {
            name: 'Compliance',
            url: AppRoute.Compliance,
            key: '/compliance',
            className: 'mt-5',
            icon: <CommentIcon />,
        },
        {
            name: 'Contracts',
            url: AppRoute.Contracts,
            key: '/contracts',
            className: 'mt-5',
            icon: <DocumentScannerIcon />,
        },
    ],
};

const SideBar = (props: SideBarProps) => {
    const { logoImg, logoText } = props;
    const router = useRouter();
    return (
        <Drawer variant="permanent" open>
            <div className="flex items-center justify-center w-full">
                <Image src={logoImg} alt={logoText} width={150} height={100} />
            </div>
            <List>
                {sidebar.links.map((sideBarMenu: SideBarLink) => (
                    <ListItemButton
                        component="a"
                        key={sideBarMenu.key}
                        sx={{
                            minHeight: 48,
                            justifyContent: 'initial',
                            px: 2.5,
                        }}
                        href={sideBarMenu.url}
                        selected={router.pathname === sideBarMenu.url}
                    >
                        <ListItemIcon>{sideBarMenu.icon}</ListItemIcon>
                        <ListItemText primary={sideBarMenu.name} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
};

export default SideBar;
