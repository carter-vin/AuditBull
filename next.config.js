/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        loader: 'akamai',
        path: '',
    },
    async exportPathMap(
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
    ) {
        return {
            '/': { page: '/' },
            '/login': { page: '/login' },
            '/forget-password': { page: '/forget-password' },
            '/vendors': { page: '/vendors' },
            '/vendors/create': { page: '/vendors/create' },
            '/system': { page: '/system' },
            '/system/create': { page: '/system/create' },
            '/settings': { page: '/settings' },
            '/settings/user-setting': { page: '/settings/user-setting' },
        };
    },
};

module.exports = nextConfig;
