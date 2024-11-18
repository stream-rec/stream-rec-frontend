import createNextIntlPlugin from 'next-intl/plugin';
import {readFileSync} from 'fs';
import {join} from 'path';
import {execSync} from "node:child_process";

const withNextIntl = createNextIntlPlugin();

// current git tag version
let gitVersion;
try {
    gitVersion = execSync('git describe --tags --always --first-parent').toString().trim();
} catch (error) {
    console.error('Error while extracting git version, parsing from package.json', error);
    const packageJsonPath = join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    gitVersion = packageJson.version;
}

let appVersion = gitVersion;

/** @type {import('next').NextConfig} */
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
        APP_VERSION: appVersion,
        MIN_SERVER_VERSION: "10455",
    }
};

export default withNextIntl(nextConfig);