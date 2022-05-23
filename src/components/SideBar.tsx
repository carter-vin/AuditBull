import {
    ListItemText,
    Drawer as MuiDrawer,
    List,
    ListItemButton,
    ListItemIcon,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

const drawerWidth = 250;

export type SideBarLink = {
    name: string;
    url: string;
    key: string;
    className?: string;
    icon: JSX.Element;
};

export type SideBarType = {
    links: SideBarLink[];
};

interface SideBarProps {
    logoImg: string;
    logoImgMobile: string;
    logoText: string;
    menu: SideBarType;
}

const SideBar = (props: SideBarProps) => {
    const { logoImg, logoText, menu, logoImgMobile } = props;
    const router = useRouter();
    return (
        <MuiDrawer
            variant="permanent"
            open
            sx={{
                width: {
                    xs: 100,
                    sm: 100,
                    md: drawerWidth,
                    lg: drawerWidth,
                    xl: drawerWidth,
                },
            }}
        >
            <div className="py-4 md:py-0 flex flex-col gap-4 md:gap-0">
                <div className="items-center justify-center w-full hidden md:flex">
                    <Image
                        src={logoImg}
                        alt={logoText}
                        width={150}
                        height={80}
                    />
                </div>
                <div className="items-center justify-center w-full sm:hidden flex">
                    <Image
                        src={logoImgMobile}
                        alt={logoText}
                        width={80}
                        height={80}
                    />
                </div>
                <List>
                    {menu.links.map((sideBarMenu: SideBarLink) => (
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
                            <ListItemIcon className="flex justify-center items-center">
                                {sideBarMenu.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={sideBarMenu.name}
                                className="hidden md:block"
                            />
                        </ListItemButton>
                    ))}
                </List>
            </div>
        </MuiDrawer>
    );
};

export default SideBar;
