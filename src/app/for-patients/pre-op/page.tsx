import React from "react"
import HeaderText from "@/components/ui/HeaderText"
import BodyText from "@/components/ui/BodyText"
import CTA from "@/components/CTA"
import { RoughNotation } from "react-rough-notation"
import { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { PRE_OP_QUERY, PRE_OP_SEO_QUERY } from "@/sanity/queries/settings"

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    const { data } = await sanityFetch({
        query: PRE_OP_SEO_QUERY,
        stega: false,
    });

    return {
        title: data?.seo?.title || 'Pre-Operative Instructions | Facial Surgery Center',
        description: data?.seo?.description || 'Pre-operative surgical instructions from The Facial Surgery Center.',
    };
}

export default async function PreOpPage() {
    const { data } = await sanityFetch({ query: PRE_OP_QUERY });

    return (
        <div className="px-6 py-16 max-w-5xl mx-auto space-y-16 pt-40">
            {/* Hero Section */}
            <section className="text-center space-y-4 py-20">
                <HeaderText className="font-medium font-serif text-header-text pb-6">
                    <RoughNotation
                        type="underline"
                        show={true}
                        color="#F4A261"
                        animationDuration={1000}
                        iterations={1}
                        padding={2}
                        strokeWidth={8}
                    >
                        {data?.title || "Pre-Op Surgical Instructions"}
                    </RoughNotation>
                </HeaderText>
                <BodyText className="text-body-text max-w-3xl mx-auto">
                    {data?.introduction || "At The Facial Surgery Center, we take a \"no-surprises\" approach to your care. Before you begin treatment, you'll receive a written, itemized statement of fees for the treatments the doctor recommends."}
                </BodyText>
            </section>

            {/* Dynamic Sections */}
            {data?.sections?.map((section, sectionIndex) => (
                <section key={sectionIndex} className="space-y-6">
                    <HeaderText className="font-medium font-serif text-header-text pb-5">
                        {section.sectionTitle}
                    </HeaderText>
                    {section.sectionIntro && (
                        <BodyText className="text-body-text">
                            {section.sectionIntro}
                        </BodyText>
                    )}
                    {section.items?.map((item, itemIndex) => (
                        <article className="space-y-4" key={itemIndex}>
                            <HeaderText variant="small" className="font-medium font-serif text-header-text">
                                {item.title}
                            </HeaderText>
                            <BodyText className="text-body-text">{item.content}</BodyText>
                        </article>
                    ))}
                </section>
            ))}

            <CTA />
        </div>
    )
}
