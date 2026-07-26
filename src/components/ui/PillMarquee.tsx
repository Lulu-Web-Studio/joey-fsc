import Link from "next/link";
import type {LucideIcon} from "lucide-react";

export type PillMarqueeItem = {
  key: string;
  label: string;
  href?: string;
};

interface PillMarqueeProps {
  items: PillMarqueeItem[];
  ariaLabel: string;
  icon?: LucideIcon;
}

export default function PillMarquee({
  items,
  ariaLabel,
  icon: Icon,
}: PillMarqueeProps) {
  const repeatedItems = [...items, ...items];

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="w-full max-w-full overflow-hidden"
    >
      <div className="flex w-max animate-marquee pause-marquee py-1">
        {repeatedItems.map((item, index) => {
          const isDuplicate = index >= items.length;
          const className =
            "mx-1.5 inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-primary-teal px-4 py-2 text-sm font-semibold text-primary-teal";
          const content = (
            <>
              {Icon && <Icon className="size-4" aria-hidden="true" />}
              {item.label}
            </>
          );

          return item.href ? (
            <Link
              key={`${item.key}-${index}`}
              href={item.href}
              aria-hidden={isDuplicate || undefined}
              tabIndex={isDuplicate ? -1 : undefined}
              className={`${className} transition-colors duration-300 hover:bg-primary-teal hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2`}
            >
              {content}
            </Link>
          ) : (
            <span
              key={`${item.key}-${index}`}
              aria-hidden={isDuplicate || undefined}
              className={className}
            >
              {content}
            </span>
          );
        })}
      </div>
    </div>
  );
}
