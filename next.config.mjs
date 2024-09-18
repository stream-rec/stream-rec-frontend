import createNextIntlPlugin from 'next-intl/plugin';
import {readFileSync} from 'fs';
import {join} from 'path';
import {execSync} from "node:child_process";

const withNextIntl = createNextIntlPlugin();

// extract git commit hash
let gitCommitHash;
try {
    gitCommitHash = execSync('git rev-parse --short HEAD').toString().trim();
} catch (error) {
    console.error('Error while extracting git commit hash', error);
    gitCommitHash = '';
}

// extract git branch name
let gitBranchName;
try {
    gitBranchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
} catch (error) {
    console.error('Error while extracting git branch name', error);
    gitBranchName = '';
}

// current git tag version
let gitTagVersion;
try {
    gitTagVersion = execSync('git describe --tags --abbrev=0').toString().trim();
} catch (error) {
    console.error('Error while extracting git tag version, parsing from package.json', error);
    const packageJsonPath = join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    gitTagVersion = packageJson.version;
}

let appVersion = gitBranchName !== 'master' ? `${gitBranchName}-` : '';
appVersion += gitTagVersion;
if (gitCommitHash) appVersion += `-${gitCommitHash}`;

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
    }
};

export default withNextIntl(nextConfig);