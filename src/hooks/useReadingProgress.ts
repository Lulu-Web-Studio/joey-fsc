"use client";

import {useEffect, useState} from "react";

/**
 * Fraction (0–1) of the given element that has been read, measured from when
 * its top reaches the top of the viewport to when its bottom reaches the
 * bottom. Scoped to the article rather than the document so the footer and CTA
 * do not count as unread content.
 */
export function useReadingProgress(targetId: string) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    let frame = 0;

    const update = () => {
      frame = 0;

      const {top, height} = target.getBoundingClientRect();
      const scrollable = height - window.innerHeight;

      // An article shorter than the viewport can never scroll: treat it as
      // fully read once its top has passed the top of the screen.
      if (scrollable <= 0) {
        setProgress(top <= 0 ? 1 : 0);
        return;
      }

      setProgress(Math.min(1, Math.max(0, -top / scrollable)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, {passive: true});
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return progress;
}
