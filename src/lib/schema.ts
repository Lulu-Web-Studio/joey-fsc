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
  updatedAt?: string | null;
  imageUrl?: string | null;
  author?: string | null;
  authorTitle?: string | null;
  authorUrl?: string | null;
  authorType?: "Person" | "Organization";
  reviewedBy?: string | null;
  reviewerTitle?: string | null;
  reviewerUrl?: string | null;
  reviewedAt?: string | null;
};

function absoluteUrl(value: string) {
  if (/^https?:\/\//.test(value)) return value;

  return `${config.baseUrl}${value.startsWith("/") ? value : `/${value}`}`;
}

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
  updatedAt,
  imageUrl,
  author,
  authorTitle,
  authorUrl,
  authorType = "Organization",
  reviewedBy,
  reviewerTitle,
  reviewerUrl,
  reviewedAt,
}: BlogPostingInput) {
  const url = `${config.baseUrl}${path}`;
  const practiceId = `${config.baseUrl.replace(/\/$/, "")}/#practice`;
  const dateModified = updatedAt || reviewedAt || publishedAt;
  const authorName = author || "Facial Surgery Center";
  const authorEntity = {
    "@type": authorType,
    ...(authorType === "Organization" ? {"@id": practiceId} : {}),
    name: authorName,
    ...(authorTitle && authorType === "Person" ? {jobTitle: authorTitle} : {}),
    ...(authorUrl ? {url: absoluteUrl(authorUrl)} : {}),
  };
  const reviewerEntity = reviewedBy
    ? {
        "@type": "Person",
        name: reviewedBy,
        ...(reviewerTitle ? {jobTitle: reviewerTitle} : {}),
        ...(reviewerUrl ? {url: absoluteUrl(reviewerUrl)} : {}),
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    ...(description ? {description} : {}),
    ...(publishedAt ? {datePublished: publishedAt} : {}),
    ...(dateModified ? {dateModified} : {}),
    ...(imageUrl ? {image: absoluteUrl(imageUrl)} : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
      ...(reviewedAt ? {lastReviewed: reviewedAt} : {}),
      ...(reviewerEntity ? {reviewedBy: reviewerEntity} : {}),
    },
    url,
    author: authorEntity,
    publisher: {"@type": "Organization", "@id": practiceId},
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
