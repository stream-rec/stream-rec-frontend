import createNextIntlPlugin from 'next-intl/plugin';
import {execSync} from "node:child_process";

const withNextIntl = createNextIntlPlugin();

// extract git commit hash
const gitCommitHash = execSync('git rev-parse --short HEAD').toString().trim()

// current git tag version
const gitTagVersion = execSync('git describe --tags --abbrev=0').toString().trim()

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
        APP_VERSION: `${gitTagVersion}-${gitCommitHash}`,
    }
};

export default withNextIntl(nextConfig);