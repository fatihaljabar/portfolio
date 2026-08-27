/**
 * Select Dropdown
 * Styled single-select dropdown over a fixed list of options, matching
 * the admin form's field design
 */

'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface SelectDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

export function SelectDropdown({
  value,
  onChange,
  options,
  placeholder = 'Select',
}: SelectDropdownProps) {
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

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <span className={value ? '' : 'text-muted-foreground'}>{value || placeholder}</span>
        <ChevronDown size={16} className="text-gray-400 dark:text-[#666]" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121212] shadow-lg z-10 overflow-hidden">
          <ul className="max-h-64 overflow-y-auto py-1">
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between gap-3 px-3 py-2 text-sm text-left text-gray-700 dark:text-[#ccc] hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  {option}
                  {option === value && (
                    <Check size={14} className="text-gray-400 dark:text-[#666]" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
