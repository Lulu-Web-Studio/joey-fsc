import Link from "next/link";
import type {Crumb} from "@/lib/schema";

/** Visual counterpart to `breadcrumbSchema` — same crumb list, same order. */
export default function Breadcrumbs({crumbs}: {crumbs: Crumb[]}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-body-text-light">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={crumb.path} className="flex items-center gap-x-2">
              {isLast ? (
                <span aria-current="page" className="text-body-text">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.path}
                    className="transition-colors hover:text-primary-teal"
                  >
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
