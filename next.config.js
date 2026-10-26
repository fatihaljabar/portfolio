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
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Only restricts framing — no script-src directive, so it doesn't
          // touch the inline theme-bootstrap script in app/layout.tsx.
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
  experimental: {
    // Hostinger caps processes per account; the default (one worker per host CPU, 35 there)
    // makes Prisma's Rust runtime fail with "can't spawn worker thread" during build.
    cpus: 2,
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
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
