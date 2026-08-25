/**
 * New Project
 */

import type { Metadata } from 'next';
import { createProject } from '@/lib/actions/admin-projects';
import { ProjectForm } from '../project-form';

export const metadata: Metadata = {
  title: 'New Project',
  robots: { index: false, follow: false },
};

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">New Project</h1>
      <ProjectForm action={createProject} submitLabel="Create Project" />
    </div>
  );
}
