/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable import/prefer-default-export */
import { CssBaseline, ThemeProvider } from '@mui/material';
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
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const ColorModeContext = createContext<any>({});
const { Provider } = ColorModeContext;

const useColorModeProvider = () => {
    const [mode, setMode] = useState('light');

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

    const getDesignTokens = (mode: any) => ({
        palette: {
            mode,
            ...(mode === 'dark' && {
                main: '#212839',
            }),
            primary: {
                main: '#005AFF',
                light: '#0693e3',
            },
            secondary: {
                main: '#1A202C',
                light: '#2D3748',
            },
            error: {
                main: red.A400,
            },
        },
    });

    const colorSwitcherIcon = (
        <div
            onClick={() => colorMode.toggleColorMode()}
            className="cursor-pointer bg-green"
        >
            {mode === 'light' ? <DarkModeIcon /> : <Brightness7Icon />}
        </div>
    );

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setMode(localStorage.getItem('audit_bull_color_mode') || 'light ');
        }
    });
    return {
        colorMode,
        theme,
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
            <ThemeProvider theme={data.theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </Provider>
    );
};

export const useColorMode = () => useContext(ColorModeContext);
