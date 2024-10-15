import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Включаем строгий режим React
    swcMinify: true, // Включаем SWC для минимизации
    async rewrites() {
        return [
            {
                source: '/assets/:path*',
                destination: '/assets/:path*', // Matched parameters can be used in the destination
            },
        ];
    },
}

export default withNextIntl(nextConfig)