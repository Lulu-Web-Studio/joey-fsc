import {config} from "@/config";
import type {Faq} from "@/config/areas";

export type Crumb = {
  name: string;
  path: string;
};

/**
 * Takes an arbitrary crumb list rather than assuming a fixed depth, so nested
 * service-area pages work without a second implementation.
 */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${config.baseUrl}${crumb.path}`,
    })),
  };
}

type BlogPostingInput = {
  title: string;
  description?: string | null;
  path: string;
  publishedAt?: string | null;
  imageUrl?: string | null;
};

/**
 * Article-level schema. Deliberately does not redeclare the practice as a
 * medical business — `publisher` names the organisation only, so the sitewide
 * entity in schema.json stays the single source of truth for the address.
 */
export function blogPostingSchema({
  title,
  description,
  path,
  publishedAt,
  imageUrl,
}: BlogPostingInput) {
  const url = `${config.baseUrl}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    ...(description ? {description} : {}),
    ...(publishedAt ? {datePublished: publishedAt, dateModified: publishedAt} : {}),
    ...(imageUrl ? {image: imageUrl} : {}),
    mainEntityOfPage: {"@type": "WebPage", "@id": url},
    url,
    author: {"@type": "Organization", name: "Facial Surgery Center"},
    publisher: {"@type": "Organization", name: "Facial Surgery Center"},
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
