import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, initializeIcons } from '@fluentui/react';

import './index.css';
import App from 'App';

initializeIcons();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const app = (
    <ThemeProvider>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </ThemeProvider>
);
root.render(app);
