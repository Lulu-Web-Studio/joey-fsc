import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import HeaderText from "@/components/ui/HeaderText";
import BodyText from "@/components/ui/BodyText";
import Underline from "@/components/ui/Underline";
import {FadeIn} from "@/components/ui/FadeIn";
import CTA from "@/components/CTA";
// import Breadcrumbs from "@/components/areas/Breadcrumbs";
import FaqList from "@/components/areas/FaqList";
import {SchemaMarkup} from "@/components/SchemaMarkup";
import {
  AREAS_BASE_PATH,
  areaHref,
  areaServicePages,
  getArea,
  serviceName,
  type Area,
  type AreaService,
} from "@/config/areas";
import {SITE_COLORS} from "@/config/colors";
import {breadcrumbSchema, faqSchema, type Crumb} from "@/lib/schema";
import {pageMetadata} from "@/lib/metadata";

type Params = Promise<{town: string; service: string}>;

/**
 * Driven entirely by which combos declare a `page` in the areas config. This
 * is empty today — the route exists so phase 2 is a config edit rather than a
 * new implementation. `dynamicParams = false` keeps undeclared combos on a
 * 404 instead of quietly generating thin pages on demand.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return areaServicePages().map(({area, service}) => ({
    town: area.slug,
    service: service.slug,
  }));
}

function resolve(
  townSlug: string,
  serviceSlug: string,
): {area: Area; service: AreaService} | undefined {
  const area = getArea(townSlug);
  const service = area?.services.find((entry) => entry.slug === serviceSlug);

  return area && service?.page ? {area, service} : undefined;
}

function crumbsFor(area: Area, service: AreaService): Crumb[] {
  return [
    {name: "Home", path: "/"},
    {name: "Areas We Serve", path: AREAS_BASE_PATH},
    {name: area.town, path: areaHref(area)},
    {
      name: serviceName(service.slug),
      path: `${areaHref(area)}/${service.slug}`,
    },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const {town, service} = await params;
  const resolved = resolve(town, service);

  if (!resolved?.service.page) return {};

  const {page} = resolved.service;

  return pageMetadata(
    page.seo.title,
    page.seo.description,
    `${areaHref(resolved.area)}/${resolved.service.slug}`,
  );
}

export default async function AreaServicePage({params}: {params: Params}) {
  const {town, service} = await params;
  const resolved = resolve(town, service);

  if (!resolved?.service.page) notFound();

  const {area, service: areaService} = resolved;
  const page = areaService.page!;
  const name = serviceName(areaService.slug);
  const crumbs = crumbsFor(area, areaService);

  return (
    <div className="min-h-screen">
      <SchemaMarkup data={breadcrumbSchema(crumbs)} />
      <SchemaMarkup data={faqSchema(page.faqs)} />

      <div className="container px-6 pb-16 pt-40 sm:px-8">
        {/* <Breadcrumbs crumbs={crumbs} /> */}

        <FadeIn className="mt-8 max-w-3xl">
          <HeaderText
            as="h1"
            variant="large"
            className="text-header-text font-serif font-medium"
          >
            {name} in{" "}
            <Underline color={SITE_COLORS.accentRose}>{area.town}, CT</Underline>
          </HeaderText>

          <BodyText as="p" className="mt-8 text-body-text">
            {page.localAngle}
          </BodyText>
        </FadeIn>

        <FadeIn className="mt-12 max-w-3xl rounded-2xl bg-bg2 p-8">
          <h2 className="text-xl font-semibold text-header-text">
            Coming from {area.town}
          </h2>
          <BodyText as="p" className="mt-3 text-body-text">
            Our Trumbull office is {area.driveTime} from {area.town}, at 115
            Technology Dr B-101. We treat patients from every part of town,
            including {area.neighborhoods.slice(0, 3).join(", ")}.
          </BodyText>
        </FadeIn>

        <FadeIn className="mt-12 max-w-3xl">
          <BodyText as="p" className="text-body-text">
            For the full clinical detail on this procedure, see our{" "}
            <Link
              href={`/service/${areaService.slug}`}
              className="font-semibold text-primary-teal underline-offset-4 hover:underline"
            >
              {name.toLowerCase()} page
            </Link>
            , or read more about{" "}
            <Link
              href={areaHref(area)}
              className="font-semibold text-primary-teal underline-offset-4 hover:underline"
            >
              what we offer {area.town} patients
            </Link>
            .
          </BodyText>
        </FadeIn>
      </div>

      <FaqList
        title={`${name} in ${area.town} — common questions`}
        faqs={page.faqs}
      />

      <CTA
        serviceTitle={name}
        ctaText={`Book your ${name.toLowerCase()} consultation at our Trumbull office — ${area.driveTime} from ${area.town}.`}
      />
    </div>
  );
}
