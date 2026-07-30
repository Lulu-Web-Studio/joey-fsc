"use client";

import {useEffect, useState} from "react";
import {List, X} from "lucide-react";
import {cn} from "@/lib/utils";
import {useReadingProgress} from "@/hooks/useReadingProgress";
import type {TocHeading} from "@/lib/blog";

/** Distance below the fixed header at which a heading becomes the active one. */
const ACTIVE_OFFSET_PX = 180;

/** Geometry of the mobile button's progress ring. */
const RING_RADIUS = 26;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

interface TableOfContentsProps {
  headings: TocHeading[];
  /** Id of the article element the progress rail is measured against. */
  targetId: string;
}

function useActiveHeading(headings: TocHeading[]) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;

      // The last heading whose top has scrolled past the offset is the section
      // the reader is currently in.
      let current = headings[0].id;

      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (!element) continue;
        if (element.getBoundingClientRect().top > ACTIVE_OFFSET_PX) break;
        current = heading.id;
      }

      // A short final section may never reach the offset, so the last heading
      // would otherwise never light up.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;

      setActiveId(atBottom ? headings[headings.length - 1].id : current);
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
  }, [headings]);

  return activeId;
}

function scrollToHeading(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  element.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });

  // replaceState rather than a real hash change, so smooth scrolling is not
  // cut short by the browser jumping to the anchor.
  window.history.replaceState(null, "", `#${id}`);
}

/**
 * Sticky article outline: a rail sidebar on desktop, a floating button that
 * opens a panel on smaller screens. The filled portion of the rail tracks
 * reading progress; the active entry tracks the section on screen.
 */
export default function TableOfContents({headings, targetId}: TableOfContentsProps) {
  const activeId = useActiveHeading(headings);
  const progress = useReadingProgress(targetId);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Close the mobile panel with Escape, matching the header's sheet behaviour.
  useEffect(() => {
    if (!isPanelOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsPanelOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isPanelOpen]);

  if (headings.length === 0) return null;

  const handleClick =
    (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setIsPanelOpen(false);
      scrollToHeading(id);
    };

  const list = (
    <ul className="space-y-3">
      {headings.map((heading) => {
        const isActive = heading.id === activeId;

        return (
          <li key={heading.id} className={cn(heading.level === 3 && "pl-4")}>
            <a
              href={`#${heading.id}`}
              onClick={handleClick(heading.id)}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "block text-sm leading-snug transition-colors duration-200",
                isActive
                  ? "font-semibold text-accentRose"
                  : "text-body-text-light hover:text-header-text",
              )}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Desktop: sticky rail beside the article */}
      <nav
        aria-label="Table of contents"
        className="hidden lg:sticky lg:top-36 lg:block"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-body-text-light">
          On this page
        </p>

        <div className="relative mt-5 pl-5">
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-px bg-misty-blue"
          />
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 w-px bg-accentRose"
            style={{height: `${progress * 100}%`}}
          />
          {list}
        </div>
      </nav>

      {/* Mobile: floating button with a progress ring, opening a panel */}
      <div className="lg:hidden">
        {isPanelOpen && (
          <button
            type="button"
            aria-label="Close table of contents"
            onClick={() => setIsPanelOpen(false)}
            className="fixed inset-0 z-40 bg-header-text/20 backdrop-blur-[2px]"
          />
        )}

        {isPanelOpen && (
          <nav
            aria-label="Table of contents"
            className="fixed bottom-28 left-4 right-4 z-50 mx-auto max-h-[55vh] max-w-sm overflow-y-auto rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-body-text-light">
                On this page
              </p>
              <button
                type="button"
                onClick={() => setIsPanelOpen(false)}
                aria-label="Close table of contents"
                className="rounded-md p-1 text-body-text-light transition-colors hover:bg-misty-blue hover:text-header-text"
              >
                <X className="size-4" />
              </button>
            </div>
            {list}
          </nav>
        )}

        <button
          type="button"
          onClick={() => setIsPanelOpen((open) => !open)}
          aria-expanded={isPanelOpen}
          aria-label="Table of contents"
          className="fixed bottom-6 right-6 z-50 grid size-16 place-items-center rounded-full bg-white text-accentRose shadow-xl ring-1 ring-slate-100 transition-transform duration-200 active:scale-95"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 64 64"
            className="absolute inset-0 size-full -rotate-90"
          >
            <circle
              cx="32"
              cy="32"
              r={RING_RADIUS}
              fill="none"
              strokeWidth="3"
              className="stroke-misty-blue"
            />
            <circle
              cx="32"
              cy="32"
              r={RING_RADIUS}
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              className="stroke-accentRose"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress)}
            />
          </svg>
          {isPanelOpen ? (
            <X className="relative size-5" />
          ) : (
            <List className="relative size-5" />
          )}
        </button>
      </div>
    </>
  );
}
