import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    eslint: {
        ignoreDuringBuilds: false,
    },
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
            },
        ],
    },
    // experimental: {
    //     ppr: 'incremental',
    // },
    devIndicators: {
        appIsrStatus: true,
        buildActivity: true,
        buildActivityPosition: 'bottom-right',
    },
};

export default nextConfig;
