/**
 * Skill Name Combobox
 * Search-as-you-type picker over the simple-icons brand library, same
 * data source as the Projects tech stack combobox. Picking a result fills
 * in the name and a contrast-safe suggested color (still editable) —
 * typing a name with no match is also allowed, for skills with no
 * official brand icon.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { TechIconGlyph } from '@/components/components/tech-icon-glyph';
import {
  getCachedSearchableTechIcons,
  loadSearchableTechIcons,
  type SearchableTechIcon,
} from '@/lib/searchable-tech-icons';
import type { TechIconResult } from '@/lib/tech-icon-data';

interface SkillNameComboboxProps {
  name: string;
  onNameChange: (name: string) => void;
  onIconPick: (name: string, result: TechIconResult) => void;
  previewIcon: TechIconResult | null;
}

export function SkillNameCombobox({
  name,
  onNameChange,
  onIconPick,
  previewIcon,
}: SkillNameComboboxProps) {
  const [entries, setEntries] = useState<SearchableTechIcon[] | null>(
    getCachedSearchableTechIcons(),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const ensureLoaded = async () => {
    if (entries) {
      return;
    }
    setIsLoading(true);
    const loaded = await loadSearchableTechIcons();
    setEntries(loaded);
    setIsLoading(false);
  };

  const results =
    entries && name.trim().length > 0
      ? entries.filter((e) => e.name.toLowerCase().includes(name.toLowerCase())).slice(0, 30)
      : [];

  const handleSelect = (entry: SearchableTechIcon) => {
    onNameChange(entry.name);
    onIconPick(entry.name, entry.result);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="flex h-9 items-center gap-2 rounded-md border border-input bg-transparent px-3 shadow-sm focus-within:ring-1 focus-within:ring-ring">
        <TechIconGlyph result={previewIcon} name={name || '?'} size={16} />
        <input
          type="text"
          value={name}
          onFocus={() => {
            ensureLoaded();
            setIsOpen(true);
          }}
          onChange={(e) => {
            onNameChange(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search a technology..."
          className="h-full flex-1 bg-transparent text-sm outline-none"
        />
      </div>

      {isLoading && <p className="mt-1 text-xs text-gray-500 dark:text-[#888]">Loading icons...</p>}

      {isOpen && results.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-1 max-h-64 overflow-y-auto rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121212] shadow-lg z-10">
          {results.map((entry) => (
            <li key={entry.name}>
              <button
                type="button"
                onClick={() => handleSelect(entry)}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left text-gray-700 dark:text-[#ccc] hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <TechIconGlyph result={entry.result} name={entry.name} size={16} />
                {entry.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
