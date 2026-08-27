import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Portfolio';

  return {
    name: siteName,
    short_name: siteName,
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: '#080808',
    background_color: '#080808',
    display: 'standalone',
  };
}
