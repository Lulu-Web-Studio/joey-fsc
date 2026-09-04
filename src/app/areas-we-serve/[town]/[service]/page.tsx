import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowRight, Check, MapPin, Phone} from "lucide-react";
import HeaderText from "@/components/ui/HeaderText";
import BodyText from "@/components/ui/BodyText";
import Underline from "@/components/ui/Underline";
import {FadeIn, FadeInItem, FadeInStagger} from "@/components/ui/FadeIn";
import CTA from "@/components/CTA";
import FaqList from "@/components/areas/FaqList";
import {SchemaMarkup} from "@/components/SchemaMarkup";
import {config} from "@/config";
import {
  AREAS_BASE_PATH,
  areaHref,
  getArea,
  type Area,
  type AreaService,
} from "@/config/areas";
import {SITE_COLORS} from "@/config/colors";
import {SERVICES} from "@/config/services";
import {breadcrumbSchema, faqSchema, type Crumb} from "@/lib/schema";
import {pageMetadata} from "@/lib/metadata";
import {client} from "@/sanity/lib/client";
import {sanityFetch} from "@/sanity/lib/live";
import {
  ALL_AREA_SERVICE_ROUTES_QUERY,
  AREA_SERVICE_PAGE_QUERY,
} from "@/sanity/queries/areaServicePages";
import type {AreaServicePage as AreaServicePageDocument} from "@/types/sanity";

type Params = Promise<{town: string; service: string}>;

export const revalidate = 3600;

export async function generateStaticParams() {
  const pages = await client.fetch<
    Pick<AreaServicePageDocument, "townSlug" | "serviceSlug">[]
  >(ALL_AREA_SERVICE_ROUTES_QUERY);

  return pages.flatMap(({townSlug, serviceSlug}) => {
    const area = getArea(townSlug);
    const isOffered = area?.services.some((entry) => entry.slug === serviceSlug);

    return area && isOffered ? [{town: townSlug, service: serviceSlug}] : [];
  });
}

function resolvePair(
  townSlug: string,
  serviceSlug: string,
): {area: Area; service: AreaService} | undefined {
  const area = getArea(townSlug);
  const service = area?.services.find((entry) => entry.slug === serviceSlug);

  return area && service ? {area, service} : undefined;
}

function crumbsFor(
  area: Area,
  service: AreaService,
  heading: string,
): Crumb[] {
  return [
    {name: "Home", path: "/"},
    {name: "Areas We Serve", path: AREAS_BASE_PATH},
    {name: area.town, path: areaHref(area)},
    {
      name: heading,
      path: `${areaHref(area)}/${service.slug}`,
    },
  ];
}

async function fetchPage(
  townSlug: string,
  serviceSlug: string,
  stega?: boolean,
): Promise<
  | {
      area: Area;
      service: AreaService;
      page: AreaServicePageDocument;
    }
  | undefined
> {
  const resolved = resolvePair(townSlug, serviceSlug);
  if (!resolved) return undefined;

  const {data} = await sanityFetch({
    query: AREA_SERVICE_PAGE_QUERY,
    params: {townSlug, serviceSlug},
    stega,
  });

  return data
    ? {
        ...resolved,
        page: data as AreaServicePageDocument,
      }
    : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const {town, service} = await params;
  const resolved = await fetchPage(town, service, false);

  if (!resolved) return {};

  return pageMetadata(
    resolved.page.seo.title,
    resolved.page.seo.description,
    `${areaHref(resolved.area)}/${resolved.service.slug}`,
  );
}

export default async function AreaServicePage({params}: {params: Params}) {
  const {town, service} = await params;
  const resolved = await fetchPage(town, service);

  if (!resolved) notFound();

  const {area, service: areaService, page} = resolved;
  const name = page.heading;
  const crumbs = crumbsFor(area, areaService, page.heading);
  const serviceImage = SERVICES[areaService.slug].img;

  return (
    <div className="min-h-screen">
      <SchemaMarkup data={breadcrumbSchema(crumbs)} />
      <SchemaMarkup data={faqSchema(page.faqs)} />

      <div>
        <div className="container px-6 pb-20 pt-40 sm:px-8">
          <FadeIn
            as="section"
            className="rounded-[48px] bg-accentRose/10 p-10 shadow-md sm:px-16"
          >
            <div className="flex flex-col items-center justify-between lg:flex-row lg:items-center">
              <div className="flex h-full min-w-0 max-w-xl flex-col items-start justify-between space-y-6 px-2 md:space-y-10 lg:space-y-20">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-teal">
                  Serving {area.town} · {area.driveTime} from Trumbull
                </p>

                <HeaderText
                  as="h1"
                  variant="large"
                  className="text-header-text font-serif font-medium"
                >
                  {name} in{" "}
                  <Underline color={SITE_COLORS.accentRose}>
                    {area.town}, CT
                  </Underline>
                </HeaderText>

                <BodyText as="p" className="text-body-text-light">
                  {page.localAngle}
                </BodyText>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/contact"
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary-teal px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-header-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-4"
                  >
                    Request a consultation
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                  <a
                    href={`tel:${config.officePhone}`}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-primary-teal/30 px-6 py-3 text-center font-semibold text-primary-teal transition-colors hover:border-primary-teal hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-4"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    {config.officePhone}
                  </a>
                </div>
              </div>

              <Image
                src={serviceImage}
                alt={`${name} in ${area.town}, CT consultation illustration`}
                width={500}
                height={500}
                priority
                sizes="(min-width: 1024px) 36vw, 70vw"
                className="h-auto w-full max-w-[500px] object-contain lg:h-[500px] lg:w-[500px] lg:shrink-0"
              />
            </div>
          </FadeIn>
        </div>

        <section className="py-20 sm:py-28" aria-labelledby="evaluation-heading">
          <div className="container grid gap-12 px-6 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:gap-20">
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-teal">
                Making the decision
              </p>
              <h2
                id="evaluation-heading"
                className="mt-4 text-pretty font-serif text-4xl font-medium tracking-tight text-header-text md:text-5xl"
              >
                {page.clinicalIntro.title}
              </h2>

              <div className="mt-8 space-y-5">
                {page.clinicalIntro.paragraphs.map((paragraph) => (
                  <BodyText
                    key={paragraph}
                    as="p"
                    variant="small"
                    className="max-w-3xl leading-7 text-body-text"
                  >
                    {paragraph}
                  </BodyText>
                ))}
              </div>

              <Link
                href={`/service/${areaService.slug}`}
                className="group mt-8 inline-flex items-center gap-2 font-semibold text-primary-teal underline decoration-accentRose decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-4"
              >
                Read the complete {name.toLowerCase()} guide
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </FadeIn>

            <FadeIn delay={0.1} className="rounded-[1.75rem] bg-bg2 p-7 sm:p-10">
              <h3 className="font-serif text-2xl font-medium text-header-text sm:text-3xl">
                An evaluation may help when
              </h3>
              <ul className="mt-7 divide-y divide-header-text/10">
                {page.evaluationReasons.map((reason) => (
                  <li
                    key={reason}
                    className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-primary-teal text-white">
                      <Check className="size-4" aria-hidden="true" />
                    </span>
                    <span className="flex-1 leading-7 text-body-text">
                      {reason}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </section>

        <section className="bg-bg2 py-20 sm:py-28" aria-labelledby="process-heading">
          <div className="container px-6 sm:px-8">
            <FadeIn className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-teal">
                Your visit, step by step
              </p>
              <h2
                id="process-heading"
                className="mt-4 text-pretty font-serif text-4xl font-medium tracking-tight text-header-text md:text-5xl"
              >
                What to expect
              </h2>
              <BodyText as="p" variant="small" className="mt-5 text-body-text">
                The exact plan is individualized, but most patients move through
                these three stages.
              </BodyText>
            </FadeIn>

            <FadeInStagger as="ul" className="mt-16 grid gap-10 lg:grid-cols-3 lg:gap-8">
              {page.visitSteps.map((step, index) => (
                <FadeInItem as="li" key={step.title} className="relative pl-5">
                  <span
                    className="absolute left-0 top-1.5 size-1.5 shrink-0 rounded-full bg-accentRose"
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-3">
                    <span className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.2em] text-primary-teal">
                      Step {index + 1}
                    </span>
                    {index < page.visitSteps.length - 1 && (
                      <span
                        className="hidden h-px w-full bg-header-text/15 lg:block"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <h3 className="mt-5 font-serif text-2xl font-medium text-header-text">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-7 text-body-text-light">
                    {step.description}
                  </p>
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </section>

        <section className="py-20 sm:py-28" aria-labelledby="local-heading">
          <div className="container px-6 sm:px-8">
            <FadeIn className="grid overflow-hidden rounded-[2rem] border border-header-text/10 lg:grid-cols-2">
              <div className="bg-primary-teal px-7 py-10 text-white sm:px-12 sm:py-14">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primaryCyan">
                  Planning the trip
                </p>
                <h2
                  id="local-heading"
                  className="mt-4 font-serif text-3xl font-medium sm:text-4xl"
                >
                  {page.localLogistics.title}
                </h2>
                <p className="mt-6 max-w-2xl leading-7 text-white/85">
                  {page.localLogistics.description}
                </p>

                <div className="mt-8 flex gap-3 border-t border-white/20 pt-6">
                  <MapPin
                    className="mt-0.5 size-5 shrink-0 text-primaryCyan"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-6 text-white/85">
                    {config.officeAddress}
                  </p>
                </div>
              </div>

              <div className="bg-background px-7 py-10 sm:px-12 sm:py-14">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accentRose">
                  Coordinated care
                </p>
                <h3 className="mt-4 font-serif text-3xl font-medium text-header-text">
                  Your dentist stays in the loop
                </h3>
                <p className="mt-6 leading-7 text-body-text">
                  {area.referralNote}
                </p>

                <p className="mt-8 text-sm font-semibold text-header-text">
                  Serving patients from
                </p>
                <ul
                  className="mt-4 flex flex-wrap gap-2"
                  aria-label={`${area.town} neighborhoods served`}
                >
                  {area.neighborhoods.map((neighborhood) => (
                    <li
                      key={neighborhood}
                      className="rounded-full border border-primary-teal/20 px-3 py-1.5 text-sm text-body-text-light"
                    >
                      {neighborhood}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn className="mt-10 grid gap-4 sm:grid-cols-3">
              <Link
                href="/about/meet-the-doctors"
                className="group rounded-2xl border border-header-text/10 p-6 transition-colors hover:border-primary-teal/40 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-4"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-accentRose">
                  Our surgeons
                </span>
                <span className="mt-2 flex items-center justify-between gap-3 font-semibold text-header-text">
                  Meet the doctors
                  <ArrowRight
                    className="size-4 text-primary-teal transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
              <Link
                href={`/service/${areaService.slug}`}
                className="group rounded-2xl border border-header-text/10 p-6 transition-colors hover:border-primary-teal/40 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-4"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-accentRose">
                  Procedure details
                </span>
                <span className="mt-2 flex items-center justify-between gap-3 font-semibold text-header-text">
                  Full service page
                  <ArrowRight
                    className="size-4 text-primary-teal transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
              <Link
                href={areaHref(area)}
                className="group rounded-2xl border border-header-text/10 p-6 transition-colors hover:border-primary-teal/40 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-4"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-accentRose">
                  Local care
                </span>
                <span className="mt-2 flex items-center justify-between gap-3 font-semibold text-header-text">
                  More services near {area.town}
                  <ArrowRight
                    className="size-4 text-primary-teal transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </FadeIn>
          </div>
        </section>
        <FaqList
          title={`${name} in ${area.town} — common questions`}
          faqs={page.faqs}
        />

        <CTA
          serviceTitle={name}
          ctaText={`Book your ${name.toLowerCase()} consultation at our Trumbull office — ${area.driveTime} from ${area.town}.`}
        />
      </div>
    </div>
  );
}
