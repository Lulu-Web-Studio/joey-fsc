"use client"
import { useEffect, useRef, useState } from "react"
import HeaderText from "../ui/HeaderText"
import BodyText from "../ui/BodyText"
import Script from "next/script"
import { Star } from "lucide-react"
import { FadeIn } from "../ui/FadeIn"
import type { Testimonial as TestimonialType } from "@/types/sanity"

const REVIEW_WIDGET_ID = "featurable-68a80b58-c501-4312-b207-6cd1d59b9a46"
const REVIEW_WIDGET_SRC = "https://featurable.com/assets/bundle.js"

interface TestimonialProps {
    title: string;
    description: string;
    testimonials: TestimonialType[];
}

export default function Testimonial({ title, description, testimonials }: TestimonialProps) {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [shouldLoadWidget, setShouldLoadWidget] = useState(false)
    const visibleTestimonials = testimonials.filter((testimonial) => testimonial.quote.trim())

    useEffect(() => {
        if (visibleTestimonials.length > 0 || shouldLoadWidget) return

        const section = sectionRef.current
        if (!section || !("IntersectionObserver" in window)) {
            const frame = window.requestAnimationFrame(() => setShouldLoadWidget(true))
            return () => window.cancelAnimationFrame(frame)
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return
                setShouldLoadWidget(true)
                observer.disconnect()
            },
            { rootMargin: "400px 0px" },
        )

        observer.observe(section)
        return () => observer.disconnect()
    }, [shouldLoadWidget, visibleTestimonials.length])

    return (
        <div ref={sectionRef} className="relative isolate bg-bg2 pt-24 pb-32 sm:pt-32">
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

                {visibleTestimonials.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {visibleTestimonials.map((testimonial) => {
                            const rating = Math.max(0, Math.min(5, testimonial.rating))

                            return (
                                <figure
                                    key={testimonial._id}
                                    className="flex h-full flex-col rounded-3xl border border-header-text/10 bg-background p-7 shadow-sm"
                                >
                                    <div
                                        role="img"
                                        className="flex gap-1 text-primaryYellow"
                                        aria-label={`${rating} out of 5 stars`}
                                    >
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <Star
                                                key={index}
                                                aria-hidden="true"
                                                className="size-5"
                                                fill={index < rating ? "currentColor" : "none"}
                                            />
                                        ))}
                                    </div>
                                    <blockquote className="mt-5 flex-1">
                                        <BodyText as="p" className="text-body-text">
                                            &ldquo;{testimonial.quote}&rdquo;
                                        </BodyText>
                                    </blockquote>
                                    <figcaption className="mt-6 border-t border-header-text/10 pt-5">
                                        <p className="font-semibold text-header-text">{testimonial.name}</p>
                                        {testimonial.platform && (
                                            <p className="mt-1 text-sm text-body-text-light">
                                                {testimonial.platform} review
                                            </p>
                                        )}
                                    </figcaption>
                                </figure>
                            )
                        })}
                    </div>
                ) : (
                    <div className="min-h-80" aria-busy={!shouldLoadWidget}>
                        <div id={REVIEW_WIDGET_ID} data-featurable-async></div>
                        {shouldLoadWidget && (
                            <Script
                                id="featurable-reviews"
                                src={REVIEW_WIDGET_SRC}
                                strategy="afterInteractive"
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
