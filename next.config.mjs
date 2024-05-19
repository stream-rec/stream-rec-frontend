import createNextIntlPlugin from 'next-intl/plugin';

import packageJson from './package.json' assert {type: 'json'};

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: true,
            },
        ]
    },
    output: 'standalone',
    env: {
        APP_VERSION: packageJson.version,
    }
};

export default withNextIntl(nextConfig);
