import createNextIntlPlugin from 'next-intl/plugin';
import {readFileSync} from 'fs';
import {join} from 'path';

const withNextIntl = createNextIntlPlugin();

const packageJsonPath = join(process.cwd(), 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

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