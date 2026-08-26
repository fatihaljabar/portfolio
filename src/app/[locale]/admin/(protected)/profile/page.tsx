/**
 * Admin Profile
 * Singleton settings page for the site profile behind Home's intro and
 * About's intro (photo, greeting, based-in, intro, about content, sign-off)
 */

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { updateSiteProfile } from '@/lib/actions/admin-profile';
import { prisma } from '@/lib/prisma/client';
import { ToastFromSearchParams } from '../toast-from-search-params';
import { ProfileForm } from './profile-form';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Profile',
  robots: { index: false, follow: false },
};

export default async function AdminProfilePage() {
  const profile = await prisma.siteProfile.upsert({
    where: { id: 'singleton' },
    create: {
      id: 'singleton',
      greetingEn: '',
      greetingId: '',
      basedInEn: '',
      basedInId: '',
      introEn: '',
      introId: '',
      aboutContentEn: '',
      aboutContentId: '',
      bestRegardsEn: '',
      bestRegardsId: '',
    },
    update: {},
  });

  return (
    <div>
      <Suspense fallback={null}>
        <ToastFromSearchParams />
      </Suspense>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">Profile</h1>
      <ProfileForm
        action={updateSiteProfile}
        defaultValues={{
          photoUrl: profile.photoUrl ?? '',
          greetingEn: profile.greetingEn,
          greetingId: profile.greetingId,
          basedInEn: profile.basedInEn,
          basedInId: profile.basedInId,
          introEn: profile.introEn,
          introId: profile.introId,
          aboutContentEn: profile.aboutContentEn,
          aboutContentId: profile.aboutContentId,
          bestRegardsEn: profile.bestRegardsEn,
          bestRegardsId: profile.bestRegardsId,
        }}
      />
    </div>
  );
}
