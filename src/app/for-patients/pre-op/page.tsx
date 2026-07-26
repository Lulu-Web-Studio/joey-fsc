import {Metadata} from "next"

import InstructionPageContent from "@/components/for-patients/InstructionPageContent"
import {sanityFetch} from "@/sanity/lib/live"
import {PRE_OP_QUERY, PRE_OP_SEO_QUERY} from "@/sanity/queries/settings"
import {pageMetadata} from "@/lib/metadata"
import {SITE_COLORS} from "@/config/colors"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const {data} = await sanityFetch({
    query: PRE_OP_SEO_QUERY,
    stega: false,
  })

  return pageMetadata(
    data?.seo?.title || "Pre-Operative Instructions | Facial Surgery Center",
    data?.seo?.description ||
      "Pre-operative instructions from Facial Surgery Center, Trumbull CT. Know what to eat, avoid, and arrange before your oral surgery for a smooth recovery.",
    "/for-patients/pre-op",
  )
}

export default async function PreOpPage() {
  const {data} = await sanityFetch({
    query: PRE_OP_QUERY,
  })

  return (
    <InstructionPageContent
      settings={data || null}
      defaultTitle="Pre-Op Surgical Instructions"
      defaultIntroduction='At The Facial Surgery Center, we take a "no-surprises" approach to your care. Before you begin treatment, you will receive a written, itemized statement of fees for the treatments the doctor recommends.'
      highlightColor={SITE_COLORS.primaryPeach}
      itemAccentClassName="text-primary-teal"
    />
  )
}
