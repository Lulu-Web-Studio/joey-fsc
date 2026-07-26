import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {MapPin} from "lucide-react";
import HeaderText from "@/components/ui/HeaderText";
import BodyText from "@/components/ui/BodyText";
import Underline from "@/components/ui/Underline";
import PillMarquee from "@/components/ui/PillMarquee";
import {FadeIn, FadeInStagger} from "@/components/ui/FadeIn";
import CTA from "@/components/CTA";
import ServiceCard from "@/components/service/ServiceCard";
import HorizontalSlider from "@/components/home/HorzontilSlider";
// import Breadcrumbs from "@/components/areas/Breadcrumbs";
import FaqList from "@/components/areas/FaqList";
import WhyChooseUs from "@/components/areas/WhyChooseUs";
import {SchemaMarkup} from "@/components/SchemaMarkup";
import {
  AREAS,
  AREAS_BASE_PATH,
  areaHref,
  getArea,
  serviceHref,
  serviceName,
  type Area,
} from "@/config/areas";
import {SITE_COLORS} from "@/config/colors";
import {SERVICES} from "@/config/services";
import {breadcrumbSchema, faqSchema, type Crumb} from "@/lib/schema";
import {pageMetadata} from "@/lib/metadata";
import type {Service} from "@/types/sanity";

type Params = Promise<{town: string}>;

export function generateStaticParams() {
  return AREAS.map((area) => ({town: area.slug}));
}

function crumbsFor(area: Area): Crumb[] {
  return [
    {name: "Home", path: "/"},
    {name: "Areas We Serve", path: AREAS_BASE_PATH},
    {name: area.town, path: areaHref(area)},
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const {town} = await params;
  const area = getArea(town);

  if (!area) return {};

  return pageMetadata(area.seo.title, area.seo.description, areaHref(area));
}

export default async function AreaPage({params}: {params: Params}) {
  const {town} = await params;
  const area = getArea(town);

  if (!area) notFound();

  const crumbs = crumbsFor(area);
  const services: Service[] = area.services.map(({slug}, index) => ({
    _id: `${area.slug}-${slug}`,
    serviceTitle: serviceName(slug),
    slug,
    description: SERVICES[slug].description,
    coverImage: {staticPath: SERVICES[slug].img},
    order: index,
  }));

  return (
    <div className="min-h-screen">
      <SchemaMarkup data={breadcrumbSchema(crumbs)} />
      <SchemaMarkup data={faqSchema(area.faqs)} />

      <div className="container px-6 pb-16 pt-40 sm:px-8">
        {/* <Breadcrumbs crumbs={crumbs} /> */}

        <section className="py-16 sm:py-24">
          <FadeIn className="mx-auto max-w-4xl text-center">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-primary-teal">
              {area.town} to Trumbull · {area.driveTime}
            </p>

            <HeaderText
              as="h1"
              variant="large"
              className="text-header-text font-serif font-medium"
            >
              Oral Surgeon in{" "}
              <Underline color={SITE_COLORS.accentRose}>{area.town}, CT</Underline>
            </HeaderText>

            <BodyText as="p" className="mt-8 sm:mt-14 text-body-text">
              The Facial Surgery Center is {area.driveTime} from {area.town},{" "}
              {area.county}. Our surgeons have provided oral and maxillofacial
              care from the same Trumbull office for over thirty years, treating{" "}
              {area.town} patients for everything from impacted wisdom teeth to
              full implant reconstruction — from every neighborhood in town.
            </BodyText>
          </FadeIn>
        </section>

        <div className="mx-auto max-w-4xl">
          <PillMarquee
            ariaLabel={`Neighborhoods served in ${area.town}`}
            icon={MapPin}
            items={area.neighborhoods.map((neighborhood) => ({
              key: neighborhood,
              label: neighborhood,
            }))}
          />
        </div>
      </div>

      <WhyChooseUs area={area} />

      <section aria-label={`Services for ${area.town} patients`}>
        <div className="md:hidden">
          <HorizontalSlider
            title={`Procedures for ${area.town} patients`}
            description={`Explore the procedures available to ${area.town} patients at our Trumbull office.`}
            services={services}
            hrefBySlug={Object.fromEntries(
              area.services.map((s) => [s.slug, serviceHref(area, s)]),
            )}
          />
        </div>

        <div className="container hidden px-6 pb-12 pt-24 sm:px-8 md:block lg:pt-32">
          <FadeIn className="text-center">
            <HeaderText as="h2" className="text-header-text font-serif font-medium">
              Procedures for {area.town} patients
            </HeaderText>
          </FadeIn>

          <FadeInStagger
            initial="visible"
            className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-3"
          >
            {area.services.map((service) => (
              <ServiceCard
                key={service.slug}
                href={serviceHref(area, service)}
                title={serviceName(service.slug)}
                description={SERVICES[service.slug].description}
                imageSrc={SERVICES[service.slug].img}
              />
            ))}
          </FadeInStagger>
        </div>
      </section>

      <FaqList title={`${area.town} patient questions`} faqs={area.faqs} />

      <CTA
        ctaText={`Book a consultation at our Trumbull office — ${area.driveTime} from ${area.town}. We will confirm your insurance and request records from your dentist before you arrive.`}
      />
    </div>
  );
}
