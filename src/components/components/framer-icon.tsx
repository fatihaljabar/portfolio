/**
 * FramerIcon Component
 * Reusable icon component with hover animation
 */

'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const iconHoverProps = {
  whileHover: { scale: 1.15, rotate: [0, -5, 5, -5, 0] },
  transition: { duration: 0.4, ease: 'easeInOut' as const },
};

interface FramerIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
}

export const FramerIcon = forwardRef<HTMLDivElement, FramerIconProps>(
  ({ icon: Icon, size = 16, className = '' }, ref) => {
    return (
      <motion.div ref={ref} {...iconHoverProps} className={className}>
        <Icon size={size} />
      </motion.div>
    );
  }
);

FramerIcon.displayName = 'FramerIcon';
