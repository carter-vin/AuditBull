import { Outlet } from 'react-router-dom';

function DashboardLayout() {
    return (
        <div>
            <p>the header</p>
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default DashboardLayout;
