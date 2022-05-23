/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable import/prefer-default-export */
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import {
    createContext,
    ReactElement,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import darkTheme from 'utils/darkTheme';
import theme from 'utils/theme';

const ColorModeContext = createContext<any>({});
const { Provider } = ColorModeContext;

const useColorModeProvider = () => {
    const [mode, setMode] = useState('light');
    // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode: string) =>
                    prevMode === 'light' ? 'dark' : 'light'
                );
                if (typeof window !== 'undefined') {
                    localStorage.setItem(
                        'audit_bull_color_mode',
                        mode === 'light' ? 'dark' : 'light'
                    );
                }
            },
            mode,
        }),
        [mode]
    );

    const colorSwitcherIcon = (
        <div
            onClick={() => colorMode.toggleColorMode()}
            className="cursor-pointer bg-green"
        >
            {mode === 'light' ? <DarkModeIcon /> : <Brightness7Icon />}
        </div>
    );

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setMode(localStorage.getItem('audit_bull_color_mode') || 'light ');
        }
    }, []);
    return {
        colorMode,
        mode,
        // prefersDarkMode,
        colorSwitcherIcon,
    };
};

export const AppColorModeProvider = ({
    children,
}: {
    children: ReactElement;
}) => {
    const data = useColorModeProvider();
    return (
        <Provider value={data}>
            <ThemeProvider theme={data.mode === 'dark' ? darkTheme : theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </Provider>
    );
};

export const useColorMode = () => useContext(ColorModeContext);
