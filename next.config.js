/** @type {import('next').NextConfig} */
const { execSync } = require('node:child_process');
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

function getDeploymentId() {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return undefined;
  }
}

const nextConfig = {
  deploymentId: getDeploymentId(),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pcceukssvjwurbpgjtun.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'gennxwnbivmnbsxxnrvp.supabase.co',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
