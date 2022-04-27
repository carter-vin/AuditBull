import { Routes, Route } from 'react-router-dom';

import DashboardLayout from 'layouts/DashboardLayout';
import Home from 'pages/Home';
import Login from 'pages/Login';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default AppRoutes;
