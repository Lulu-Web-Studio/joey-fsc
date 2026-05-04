import {Metadata} from "next"

import InstructionPageContent from "@/components/for-patients/InstructionPageContent"
import {sanityFetch} from "@/sanity/lib/live"
import {POST_OP_QUERY, POST_OP_SEO_QUERY} from "@/sanity/queries/settings"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const {data} = await sanityFetch({
    query: POST_OP_SEO_QUERY,
    stega: false,
  })

  return {
    title: data?.seo?.title || "Post-Operative Instructions | Facial Surgery Center",
    description:
      data?.seo?.description ||
      "Post-operative surgical instructions from The Facial Surgery Center.",
  }
}

export default async function PostOpPage() {
  const {data} = await sanityFetch({
    query: POST_OP_QUERY,
  })

  return (
    <InstructionPageContent
      settings={data || null}
      defaultTitle="Post-Op Surgical Instructions"
      defaultIntroduction="At The Facial Surgery Center, your comfort and recovery are our top priorities. Please follow these guidelines carefully to promote healing and avoid complications."
      highlightColor="#005D64"
      itemAccentClassName="text-primary-teal"
    />
  )
}
