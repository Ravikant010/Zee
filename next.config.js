/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActionsBodySizeLimit: '2mb',
        serverActions: true,
        ignoreDuringBuilds: true,
      },
}

module.exports = nextConfig
