"use client";

import {useReadingProgress} from "@/hooks/useReadingProgress";

/**
 * Thin progress bar pinned above the header. Sits at z-[60] because the header
 * itself is fixed at z-50.
 */
export default function ReadingProgress({targetId}: {targetId: string}) {
  const progress = useReadingProgress(targetId);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1"
    >
      <div
        className="h-full w-full origin-left bg-gradient-to-r from-primary-teal via-primaryCyan to-primaryYellow"
        style={{transform: `scaleX(${progress})`}}
      />
    </div>
  );
}
