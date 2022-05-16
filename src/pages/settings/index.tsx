import { ReactElement, useEffect } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { useAuth } from 'hooks/useAuth';
import { useRouter } from 'next/router';
import SettingLayout from 'modules/setting/SettingLayout';

const Settings = () => {
    const { loginUser, loading } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (loginUser === null || !loginUser) {
            router.push({
                pathname: '/login',
                query: {
                    redirect: '/settings',
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginUser]);
    if (loading) {
        return (
            <Box className="h-full w-full flex flex-col items-center justify-center">
                <CircularProgress />
            </Box>
        );
    }

    return <div>Settings</div>;
};

Settings.getLayout = (page: ReactElement) => {
    return <SettingLayout>{page}</SettingLayout>;
};

export default Settings;
