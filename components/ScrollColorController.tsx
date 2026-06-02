'use client';

import useScrollColor from '@/components/ui/useScrollColor';

/**
 * Mounts the scroll-color hook globally. Invisible component — only
 * the side effect (body background color animation) is visible.
 */
export default function ScrollColorController() {
  useScrollColor();
  return null;
}
