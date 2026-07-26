import type {Metadata} from "next";
import Link from "next/link";
import HeaderText from "@/components/ui/HeaderText";
import BodyText from "@/components/ui/BodyText";
import Underline from "@/components/ui/Underline";
import {FadeIn, FadeInStagger} from "@/components/ui/FadeIn";
import CTA from "@/components/CTA";
import AreaCard from "@/components/areas/AreaCard";
// import Breadcrumbs from "@/components/areas/Breadcrumbs";
import {SchemaMarkup} from "@/components/SchemaMarkup";
import {AREAS, AREAS_BASE_PATH} from "@/config/areas";
import {SITE_COLORS} from "@/config/colors";
import {breadcrumbSchema, type Crumb} from "@/lib/schema";
import {pageMetadata} from "@/lib/metadata";

const CRUMBS: Crumb[] = [
  {name: "Home", path: "/"},
  {name: "Areas We Serve", path: AREAS_BASE_PATH},
];

export const metadata: Metadata = pageMetadata(
  "Areas We Serve | Oral & Maxillofacial Surgeons in CT",
  "The Facial Surgery Center serves Trumbull and the surrounding Fairfield County towns, including Fairfield and Shelton, with oral and maxillofacial surgery.",
  AREAS_BASE_PATH,
);

export default function AreasWeServePage() {
  return (
    <div className="min-h-screen">
      <SchemaMarkup data={breadcrumbSchema(CRUMBS)} />

      <div className="container px-6 pb-16 pt-40 sm:px-8">
        {/* <Breadcrumbs crumbs={CRUMBS} /> */}

        <FadeIn className="mt-8 text-center">
          <HeaderText
            as="h1"
            variant="large"
            className="whitespace-nowrap text-header-text font-serif font-medium sm:py-10"
          >
            <Underline color={SITE_COLORS.accentRose}> Areas We Serve</Underline>
          </HeaderText>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-3xl text-center">
          <BodyText as="p" className="text-body-text">
            Our office sits on Technology Drive in Trumbull, within a short
            drive of most of lower Fairfield County. Patients come to us from
            the surrounding towns for wisdom teeth removal, dental implants,
            corrective jaw surgery, and same-day treatment after facial trauma.
          </BodyText>

          <BodyText as="p" className="mt-6 text-body-text">
            Oral and maxillofacial surgery is a referral-driven speciality, so
            most people arrive here on their general dentist&apos;s
            recommendation rather than by shopping around. We work from the
            records your dentist already has wherever possible, and send our
            operative notes back promptly so the restorative side of your
            treatment is never left waiting on us.
          </BodyText>

          <BodyText as="p" className="mt-6 text-body-text">
            Distance matters more than people expect. A single extraction is one
            visit, but implants, bone grafting, and jaw surgery are staged over
            months — so the towns closest to us are the ones where treatment
            stays easiest to keep on schedule. Each page below covers the drive,
            the neighbourhoods we treat, and the procedures that town asks for
            most.
          </BodyText>
        </FadeIn>

        <FadeInStagger className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((area) => (
            <AreaCard key={area.slug} area={area} />
          ))}
        </FadeInStagger>

        <FadeIn className="mx-auto mt-16 max-w-3xl text-center">
          <BodyText as="p" className="text-body-text">
            Don&apos;t see your town listed? We welcome patients from across
            Fairfield and New Haven counties.{" "}
            <Link
              href="/contact"
              className="font-semibold text-primary-teal underline-offset-4 hover:underline"
            >
              Get in touch
            </Link>{" "}
            and we will help you plan the visit.
          </BodyText>
        </FadeIn>
      </div>

      <CTA />
    </div>
  );
}
