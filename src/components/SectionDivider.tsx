import React from 'react';

interface SectionDividerProps {
  variant?: 'primary' | 'accent' | 'subtle';
  ariaHidden?: boolean;
}

/**
 * Hierarchical Section Divider System:
 * - 'primary': Standard major section divider (Monochromatic Zinc slanted diagonal slashes)
 * - 'accent': Featured/action divider (Orange slanted diagonal slashes)
 * - 'subtle': Sub-level component divider (Softer low-contrast slashes)
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'primary',
  ariaHidden = true,
}) => {
  let className = 'slanted-dashed-divider';
  if (variant === 'accent') {
    className = 'slanted-dashed-divider-orange';
  } else if (variant === 'subtle') {
    className = 'slanted-dashed-divider-subtle';
  }

  return <div className={className} aria-hidden={ariaHidden} />;
};
