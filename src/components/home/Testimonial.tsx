"use client"
import HeaderText from "../ui/HeaderText"
import BodyText from "../ui/BodyText"
import Script from "next/script"
import { FadeIn } from "../ui/FadeIn"
import type { Testimonial as TestimonialType } from "@/types/sanity"

interface TestimonialProps {
    title: string;
    description: string;
    testimonials: TestimonialType[];
}

export default function Testimonial({ title, description, testimonials }: TestimonialProps) {
    return (
        <div className="relative isolate bg-bg2 pt-24 pb-32 sm:pt-32">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="ml-[max(50%,38rem)] aspect-1313/771 w-[82.0625rem] bg-linear-to-tr from-accentMagenta to-accentLavender"
                />
            </div>
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="ml-[-22rem] aspect-1313/771 w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-linear-to-tr from-accentMagenta to-accentLavender xl:mr-[calc(50%-12rem)] xl:ml-0"
                />
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <FadeIn className="mx-auto max-w-2xl text-center mb-16">
                    <HeaderText className="mt-2 font-medium text-balance text-header-text font-serif">
                        {title}
                    </HeaderText>
                    {description && (
                        <BodyText className="mt-4 text-body-text">
                            {description}
                        </BodyText>
                    )}
                </FadeIn>

                {/* Featurable Widget */}
                <div id="featurable-68a80b58-c501-4312-b207-6cd1d59b9a46" data-featurable-async></div>
                <Script src="https://featurable.com/assets/bundle.js" strategy="lazyOnload" />
            </div>
        </div>
    )
}
