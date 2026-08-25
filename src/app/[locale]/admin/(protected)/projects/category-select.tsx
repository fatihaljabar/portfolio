/**
 * Category Select
 * Dropdown over existing project categories, styled to match the rest of
 * the form, with an inline "add new category" affordance
 */

'use client';

import { Check, ChevronDown, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface CategorySelectProps {
  value: string;
  onChange: (category: string) => void;
  existingCategories: string[];
}

export function CategorySelect({ value, onChange, existingCategories }: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsAdding(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (category: string) => {
    onChange(category);
    setIsOpen(false);
    setIsAdding(false);
  };

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed) {
      onChange(trimmed);
    }
    setNewCategory('');
    setIsAdding(false);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <span className={value ? '' : 'text-muted-foreground'}>{value || 'Select category'}</span>
        <ChevronDown size={16} className="text-gray-400 dark:text-[#666]" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121212] shadow-lg z-10 overflow-hidden">
          <ul className="max-h-64 overflow-y-auto py-1">
            {existingCategories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => handleSelect(category)}
                  className="w-full flex items-center justify-between gap-3 px-3 py-2 text-sm text-left text-gray-700 dark:text-[#ccc] hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  {category}
                  {category === value && (
                    <Check size={14} className="text-gray-400 dark:text-[#666]" />
                  )}
                </button>
              </li>
            ))}
            {existingCategories.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-400 dark:text-[#666]">
                No categories yet
              </li>
            )}
          </ul>

          <div className="border-t border-gray-200 dark:border-white/10 p-2">
            {isAdding ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCategory();
                    }
                  }}
                  placeholder="New category name"
                  className="flex h-8 w-full rounded-md border border-input bg-transparent px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="shrink-0 rounded-md bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-bold px-3 h-8 hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  Add
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAdding(true)}
                className="w-full flex items-center gap-2 px-1 py-1 text-sm text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white"
              >
                <Plus size={14} />
                Add new category
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
