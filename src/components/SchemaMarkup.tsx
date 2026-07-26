import schemaData from "../../public/schema.json";

/**
 * Renders JSON-LD. Defaults to the sitewide business entity; pass `data` to
 * emit page-level graphs (breadcrumbs, FAQs) as an additional block.
 *
 * Page-level schema must never redeclare the business with a different
 * addressLocality — the practice has one real address, and location pages
 * express reach through `areaServed` on the sitewide entity instead.
 */
export function SchemaMarkup({data = schemaData}: {data?: unknown}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
