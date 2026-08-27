/**
 * Skills Grid Component
 * Flat skill badges — icon + label always visible (no hover-only reveal,
 * works identically on touch, mouse, and keyboard) — filterable by category
 * with a sliding-pill filter bar. Content comes from the database (admin
 * Skills CRUD), resolved server-side into icon + color per skill.
 */

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ScrollableFilterBar } from '@/components/components/scrollable-filter-bar';
import { TechIconGlyph } from '@/components/components/tech-icon-glyph';
import type { TechIconResult } from '@/lib/tech-icon-data';

export interface SkillView {
  name: string;
  color: string;
  icon: TechIconResult | null;
}

export interface SkillCategoryView {
  label: string;
  skills: SkillView[];
}

interface SkillsGridProps {
  categories: SkillCategoryView[];
}

export function SkillsGrid({ categories }: SkillsGridProps) {
  const filters = ['All', ...categories.map((c) => c.label)];
  const [activeFilter, setActiveFilter] = useState('All');

  const visibleSkills = (
    activeFilter === 'All' ? categories : categories.filter((c) => c.label === activeFilter)
  ).flatMap((c) => c.skills);

  return (
    <div className="flex flex-col gap-8">
      <ScrollableFilterBar
        filters={filters}
        activeFilter={activeFilter}
        onSelect={setActiveFilter}
        layoutId="skill-filter-pill"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="flex flex-wrap gap-2"
        >
          {visibleSkills.map((skill) => (
            <span
              key={skill.name}
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium cursor-default transition-all duration-200 ease-out hover:scale-[1.06] hover:-translate-y-0.5 hover:brightness-125"
              style={{
                color: skill.color,
                borderColor: `${skill.color}33`,
                backgroundColor: `${skill.color}14`,
              }}
            >
              <TechIconGlyph result={skill.icon} name={skill.name} size={14} />
              {skill.name}
            </span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
