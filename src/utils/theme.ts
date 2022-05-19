import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.

const theme = createTheme({
    palette: {
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

export default theme;
