import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'bzns.az',
            },
            {
                protocol: 'https',
                hostname: 'avatars.mds.yandex.net',
            },
            {
                protocol: 'https',
                hostname: 'dynamic-media-cdn.tripadvisor.com',
            },
            {
                protocol: 'https',
                hostname: 'arazmarket.az',
            },
            {
                protocol: 'https',
                hostname: 'i.pinimg.com',
            },
            {
                protocol: 'https',
                hostname: 'area.az',
            },
            {
                protocol: 'https',
                hostname: 'cdn-icons-png.flaticon.com', // Add flaticon domain here
            },
        ],
    },
};

export default nextConfig;
