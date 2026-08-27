"use client"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import HeaderText from "../ui/HeaderText"
import BodyText from "../ui/BodyText"
import Underline from "../ui/Underline"
import Button from "../Button"
import { FadeIn, FadeInStagger, FadeInItem } from "../ui/FadeIn"
import { SITE_COLORS } from "@/config/colors"
import { urlFor } from "@/sanity/lib/image"
import type { Doctor } from "@/types/sanity"

const DOCTORS_PAGE_PATH = "/about/meet-the-doctors"
const PLACEHOLDER_PHOTO = "/images/profiles/placeholder.webp"
const EXCERPT_MAX_LENGTH = 140
const PHOTO_SIZE = 192 // 2x the rendered 96px circle

// Soft tint circle behind each photo, cycled per card (echoes WhyUs's icon tints).
const PHOTO_TINTS = ["bg-primaryCyan/25", "bg-primaryPeach/30", "bg-accentRose/25"]

/** Plain-text excerpt from the first paragraph of a portable-text bio. */
function bioExcerpt(bio: Doctor["bio"]): string {
    const block = Array.isArray(bio)
        ? bio.find((b) => b?._type === "block" && Array.isArray(b.children))
        : undefined
    if (!block) return ""

    const text = block.children
        .map((span: { text?: string }) => span?.text || "")
        .join("")
        .trim()
    if (text.length <= EXCERPT_MAX_LENGTH) return text

    const cut = text.slice(0, EXCERPT_MAX_LENGTH)
    const lastSpace = cut.lastIndexOf(" ")
    return `${lastSpace > 0 ? cut.slice(0, lastSpace) : cut}…`
}

// Hand-drawn marker doodle: wobbly line that loops once, then swoops
// down-right into an open arrowhead (tip lands at the bottom-right).
const SQUIGGLE_BODY =
    "M 10 26 C 22 14, 38 10, 52 18 C 60 22.5, 67 28, 71 34 C 79 46, 96 44, 97 32 C 98 21, 84 15, 76 24 C 69 32, 75 46, 86 56 C 96 65, 105 76, 111 89"
const SQUIGGLE_HEAD = "M 92 82 L 112 91 L 103 65"

const squiggleStroke = {
    stroke: SITE_COLORS.primaryOrange,
    strokeWidth: 5.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
}

/** Orange squiggle arrow that draws itself on scroll into view. */
function SquiggleArrow({ className }: { className?: string }) {
    const reduceMotion = useReducedMotion()

    if (reduceMotion) {
        return (
            <svg viewBox="0 0 132 112" aria-hidden="true" className={className}>
                <path d={SQUIGGLE_BODY} {...squiggleStroke} />
                <path d={SQUIGGLE_HEAD} {...squiggleStroke} />
            </svg>
        )
    }

    return (
        <motion.svg
            viewBox="0 0 132 112"
            aria-hidden="true"
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
        >
            <motion.path
                d={SQUIGGLE_BODY}
                {...squiggleStroke}
                variants={{
                    hidden: { pathLength: 0 },
                    visible: {
                        pathLength: 1,
                        transition: { duration: 1.1, ease: "easeInOut" },
                    },
                }}
            />
            <motion.path
                d={SQUIGGLE_HEAD}
                {...squiggleStroke}
                variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                            delay: 1.05,
                            duration: 0.3,
                            ease: "easeOut",
                            opacity: { delay: 1.05, duration: 0.01 },
                        },
                    },
                }}
            />
        </motion.svg>
    )
}

interface DoctorsProps {
    doctors: Doctor[]
}

export default function Doctors({ doctors }: DoctorsProps) {
    if (doctors.length === 0) return null

    return (
        <section aria-label="Meet our doctors" className="py-20 sm:py-28">
            <div className="container px-6 sm:px-8">
                <FadeIn className="mx-auto max-w-2xl text-center">
                    <HeaderText as="h2" className="text-header-text font-serif font-medium">
                        Meet Our{" "}
                        <Underline color={SITE_COLORS.primaryCyan}>Doctors</Underline>
                    </HeaderText>
                    <BodyText className="mt-6 text-body-text">
                        Care at Facial Surgery Center is physician-led. Get to know the
                        oral and maxillofacial surgeons at our Trumbull office.
                    </BodyText>
                </FadeIn>

                <FadeInStagger
                    as="ul"
                    role="list"
                    className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:mt-16 sm:gap-8 md:grid-cols-2"
                >
                    {doctors.map((doctor, index) => {
                        const photoSrc = doctor.photo?.sanityImage?.asset
                            ? urlFor(doctor.photo.sanityImage)
                                  .width(PHOTO_SIZE)
                                  .height(PHOTO_SIZE)
                                  .url()
                            : doctor.photo?.staticPath || PLACEHOLDER_PHOTO
                        const excerpt = bioExcerpt(doctor.bio)
                        const tint = PHOTO_TINTS[index % PHOTO_TINTS.length]

                        return (
                            <FadeInItem as="li" key={doctor._id} className="h-full">
                                <Link
                                    href={`${DOCTORS_PAGE_PATH}#doctor-${doctor.slug}`}
                                    className="group flex h-full flex-col rounded-[1.5rem] border border-header-text/10 bg-background p-7 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="relative shrink-0">
                                            <span
                                                aria-hidden="true"
                                                className={`absolute inset-0 translate-x-2 translate-y-2 rounded-full ${tint}`}
                                            />
                                            <Image
                                                src={photoSrc}
                                                alt={doctor.name}
                                                width={PHOTO_SIZE / 2}
                                                height={PHOTO_SIZE / 2}
                                                className="relative size-20 rounded-full object-cover shadow ring-4 ring-white sm:size-24"
                                            />
                                        </div>
                                        <div>
                                            <HeaderText
                                                as="h3"
                                                variant="small"
                                                className="font-serif font-medium text-header-text"
                                            >
                                                {doctor.name}
                                            </HeaderText>
                                            {doctor.credentials && (
                                                <p className="mt-0.5 text-sm text-body-text-light">
                                                    {doctor.credentials}
                                                </p>
                                            )}
                                            {doctor.title && (
                                                <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-teal">
                                                    {doctor.title}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {excerpt && (
                                        <BodyText
                                            variant="small"
                                            className="mt-5 text-body-text"
                                        >
                                            {excerpt}
                                        </BodyText>
                                    )}

                                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary-teal">
                                        Read full bio
                                        <span
                                            aria-hidden="true"
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                        >
                                            &rarr;
                                        </span>
                                    </span>
                                </Link>
                            </FadeInItem>
                        )
                    })}
                </FadeInStagger>

                <FadeIn delay={0.1} className="mt-10 flex flex-col items-center sm:mt-12">
                    <SquiggleArrow className="h-20 w-24 -translate-x-8 -rotate-6 sm:h-24 sm:w-28" />
                    <Button
                        text="Meet our oral surgeons"
                        href={DOCTORS_PAGE_PATH}
                        className="mt-2"
                    />
                </FadeIn>
            </div>
        </section>
    )
}
