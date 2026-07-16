import WhatToExpectContent from '@/components/for-patients/WhatToExpectContent'
import { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import {
  WHAT_TO_EXPECT_QUERY,
  WHAT_TO_EXPECT_SEO_QUERY,
} from '@/sanity/queries/settings'
import { pageMetadata } from '@/lib/metadata'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: WHAT_TO_EXPECT_SEO_QUERY,
    stega: false,
  })

  return pageMetadata(
    data?.seo?.title || 'What to Expect | Facial Surgery Center Trumbull CT',
    data?.seo?.description ||
      "Learn what to expect during your visit with The Facial Surgery Center, from consultation through treatment planning.",
    '/for-patients/what-to-expect',
  )
}

export default async function Page() {
  const { data } = await sanityFetch({ query: WHAT_TO_EXPECT_QUERY })

  return <WhatToExpectContent settings={data} />
}
