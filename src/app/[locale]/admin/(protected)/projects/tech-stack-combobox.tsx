/**
 * Tech Stack Combobox
 * Search-as-you-type picker over the simple-icons brand library (plus the
 * small fallback set for techs with no official logo). The icon library
 * is only fetched on first interaction — not on page load — since it's
 * a multi-MB module that has no business being in the initial bundle.
 */

'use client';

import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { TechIconGlyph } from '@/components/components/tech-icon-glyph';
import {
  getCachedSearchableTechIcons,
  loadSearchableTechIcons,
  type SearchableTechIcon,
} from '@/lib/searchable-tech-icons';
import type { TechIconResult } from '@/lib/tech-icon-data';

type SearchEntry = SearchableTechIcon;

interface TechStackComboboxProps {
  value: string[];
  onChange: (value: string[]) => void;
  initialIcons?: Record<string, TechIconResult | null>;
}

export function TechStackCombobox({ value, onChange, initialIcons = {} }: TechStackComboboxProps) {
  const [query, setQuery] = useState('');
  const [entries, setEntries] = useState<SearchEntry[] | null>(getCachedSearchableTechIcons());
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
    entries && query.trim().length > 0
      ? entries
          .filter(
            (e) => e.name.toLowerCase().includes(query.toLowerCase()) && !value.includes(e.name),
          )
          .slice(0, 30)
      : [];

  const handleSelect = (name: string) => {
    if (!value.includes(name)) {
      onChange([...value, name]);
    }
    setQuery('');
  };

  const handleRemove = (name: string) => {
    onChange(value.filter((v) => v !== name));
  };

  const resolveResult = (name: string): TechIconResult | null =>
    entries?.find((e) => e.name === name)?.result ?? initialIcons[name] ?? null;

  return (
    <div ref={containerRef} className="relative flex flex-col gap-3">
      {value.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {value.map((name) => (
            <li
              key={name}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-xs font-medium text-gray-700 dark:text-[#ccc]"
            >
              <TechIconGlyph result={resolveResult(name)} name={name} size={14} />
              {name}
              <button
                type="button"
                onClick={() => handleRemove(name)}
                aria-label={`Remove ${name}`}
                className="flex items-center justify-center w-5 h-5 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-gray-400 dark:text-[#666]"
              >
                <X size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <input
        type="text"
        value={query}
        onFocus={ensureLoaded}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        placeholder="Search a technology..."
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />

      {isLoading && <p className="text-xs text-gray-500 dark:text-[#888]">Loading icons...</p>}

      {isOpen && results.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-1 max-h-64 overflow-y-auto rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121212] shadow-lg z-10">
          {results.map((entry) => (
            <li key={entry.name}>
              <button
                type="button"
                onClick={() => handleSelect(entry.name)}
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
