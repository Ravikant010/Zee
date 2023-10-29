/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActionsBodySizeLimit: '2mb',
        serverActions: true
      },
}

module.exports = nextConfig
