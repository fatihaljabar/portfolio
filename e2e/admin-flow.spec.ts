/**
 * E2E: admin login -> add project -> shows on the public page
 * Requires E2E_ADMIN_EMAIL / E2E_ADMIN_PASSWORD for a real admin user
 * (Supabase Auth). Never hardcode those values here — pass them as env vars.
 */

import { expect, test } from '@playwright/test';

const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD;

test.skip(
  !ADMIN_EMAIL || !ADMIN_PASSWORD,
  'Set E2E_ADMIN_EMAIL and E2E_ADMIN_PASSWORD to run this test',
);

test('admin login -> add project -> shows on the public page', async ({ page }) => {
  const projectTitle = `E2E Test Project ${Date.now()}`;

  await page.goto('/en/admin/login');
  await page.locator('#email').fill(ADMIN_EMAIL as string);
  await page.locator('#password').fill(ADMIN_PASSWORD as string);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/\/en\/admin$/);

  await page.goto('/en/admin/projects/new');
  await page.locator('#title').fill(projectTitle);
  await page.locator('#description').fill('Created by the Playwright E2E test.');
  await page.locator('#content').fill('E2E test content.');
  await page.getByRole('button', { name: 'Create Project' }).click();
  await expect(page).toHaveURL(/\/en\/admin\/projects$/);
  await expect(page.getByText(projectTitle)).toBeVisible();

  await page.goto('/en/projects');
  await expect(page.getByText(projectTitle).first()).toBeVisible();

  // Cleanup so repeated runs don't pile up test projects
  await page.goto('/en/admin/projects');
  const row = page.locator('li', { hasText: projectTitle });
  page.once('dialog', (dialog) => dialog.accept());
  await row.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText(projectTitle)).not.toBeVisible();
});
