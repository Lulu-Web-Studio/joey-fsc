"use client";
import {useState} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowRight, Plus} from "lucide-react";
import HeaderText from "@/components/ui/HeaderText";
import BodyText from "@/components/ui/BodyText";
import {FadeIn} from "@/components/ui/FadeIn";
import type {Faq} from "@/config/areas";
import {SITE_COLORS} from "@/config/colors";

/**
 * Every town lists its unique questions first, then spreads in the shared
 * COMMON_LOCATION_FAQS — so showing this many by default surfaces the
 * town-specific ones and tucks the shared PAA-sourced questions behind
 * "Load more" for towns that have that many unique questions.
 */
const DEFAULT_VISIBLE_COUNT = 4;

/**
 * Divider-list accordion. Every question stays mounted in the DOM at all
 * times — both the answer panels (height-animated open/closed) and, now,
 * the questions past DEFAULT_VISIBLE_COUNT (height-animated shown/collapsed
 * behind "Load more"). Nothing is conditionally rendered out of existence,
 * so the page's FAQPage schema — which lists every question — always
 * matches what's actually in the HTML, and everything stays reachable to
 * crawlers regardless of whether a visitor ever clicks "Load more".
 */
export default function FaqList({
  title,
  faqs,
  initialVisibleCount = DEFAULT_VISIBLE_COUNT,
}: {
  title: string;
  faqs: Faq[];
  initialVisibleCount?: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  if (faqs.length === 0) return null;

  const hasMore = faqs.length > initialVisibleCount;
  const hiddenCount = faqs.length - initialVisibleCount;

  const renderFaqItem = (faq: Faq, index: number, reachable: boolean) => {
    const isOpen = openIndex === index;
    const panelId = `faq-panel-${index}`;
    const buttonId = `faq-button-${index}`;

    return (
      <div
        key={faq.question}
        className="border-b border-header-text/10 first:border-t"
      >
        <h3>
          <button
            id={buttonId}
            type="button"
            aria-expanded={isOpen}
            aria-controls={panelId}
            // While a question sits collapsed inside the "Load more" tray,
            // it must not be keyboard-reachable — height:0 + overflow:hidden
            // hides it visually but not from tab order on its own.
            tabIndex={reachable ? undefined : -1}
            onClick={() => setOpenIndex(isOpen ? null : index)}
            className="flex w-full items-center justify-between gap-6 py-6 text-left"
          >
            <span className="text-lg font-semibold text-header-text sm:text-xl">
              {faq.question}
            </span>

            <motion.span
              animate={{rotate: isOpen ? 135 : 0}}
              transition={{duration: 0.3, ease: "easeOut"}}
              style={{backgroundColor: SITE_COLORS.accentRose}}
              className="grid size-9 shrink-0 place-items-center rounded-full text-header-text"
            >
              <Plus className="size-5" aria-hidden="true" />
            </motion.span>
          </button>
        </h3>

        <motion.div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          aria-hidden={!isOpen}
          initial={false}
          // Height only — fading the text in on every open reads as
          // the panel reloading rather than sliding.
          animate={{height: isOpen ? "auto" : 0}}
          transition={{duration: 0.32, ease: [0.4, 0, 0.2, 1]}}
          className="overflow-hidden"
        >
          <BodyText
            as="p"
            variant="small"
            className="max-w-prose pb-6 pr-12 text-body-text"
          >
            {faq.answer}
          </BodyText>
        </motion.div>
      </div>
    );
  };

  return (
    <section className="bg-bg2 py-24" aria-label={title}>
      <div className="container px-6 sm:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <HeaderText as="h2" className="text-header-text font-serif font-medium">
            {title}
          </HeaderText>
        </FadeIn>

        <FadeIn delay={0.1} className="mx-auto mt-12 max-w-5xl">
          {faqs
            .slice(0, initialVisibleCount)
            .map((faq, index) => renderFaqItem(faq, index, true))}

          {hasMore && (
            <motion.div
              initial={false}
              animate={{height: showAll ? "auto" : 0}}
              transition={{duration: 0.4, ease: [0.4, 0, 0.2, 1]}}
              className="overflow-hidden"
              aria-hidden={!showAll}
              inert={!showAll}
            >
              {faqs
                .slice(initialVisibleCount)
                .map((faq, i) =>
                  renderFaqItem(faq, initialVisibleCount + i, showAll),
                )}
            </motion.div>
          )}
        </FadeIn>

        {hasMore && (
          <FadeIn delay={0.12} className="mt-8 text-center">
            <button
              type="button"
              aria-expanded={showAll}
              onClick={() => {
                const next = !showAll;
                // Collapsing the tray while a question past the initial
                // count is open would otherwise leave it aria-hidden={false}
                // inside a now-hidden region — reset it shut instead. Reads
                // `showAll`/`openIndex` from render scope rather than a
                // functional updater, since Strict Mode double-invokes
                // updaters and setOpenIndex is a side effect that isn't
                // safe to run twice.
                if (!next && openIndex !== null && openIndex >= initialVisibleCount) {
                  setOpenIndex(null);
                }
                setShowAll(next);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-accentRose px-5 py-2.5 text-sm font-semibold text-accentRose transition-colors duration-300 hover:bg-accentRose hover:text-header-text"
            >
              {showAll ? "Show fewer questions" : `Load ${hiddenCount} more questions`}
            </button>
          </FadeIn>
        )}

        <FadeIn delay={0.15} className="mt-10 text-center">
          <BodyText as="p" variant="small" className="text-body-text-light">
            Don&apos;t see your question?{" "}
            <Link
              href="/contact"
              className="group inline-flex items-center font-semibold text-header-text underline decoration-accentRose decoration-2 underline-offset-4 transition-colors hover:text-body-text-light"
            >
              Ask us directly
              <ArrowRight className="ml-1.5 size-4 text-accentRose transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </BodyText>
        </FadeIn>
      </div>
    </section>
  );
}
