/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
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
