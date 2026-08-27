/**
 * Skill Badge Preview
 * Renders a skill exactly like the public Home page Skills badge — same
 * classes, same color usage — so admin can see the real result while
 * editing, not just raw field values.
 */

import { TechIconGlyph } from '@/components/components/tech-icon-glyph';
import type { TechIconResult } from '@/lib/tech-icon-data';

interface SkillBadgePreviewProps {
  name: string;
  color: string;
  icon: TechIconResult | null;
}

export function SkillBadgePreview({ name, color, icon }: SkillBadgePreviewProps) {
  const mergedIcon: TechIconResult | null = icon ? { ...icon, color } : null;

  return (
    <span
      className="inline-flex w-fit items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium"
      style={{
        color,
        borderColor: `${color}33`,
        backgroundColor: `${color}14`,
      }}
    >
      <TechIconGlyph result={mergedIcon} name={name} size={14} />
      {name}
    </span>
  );
}
