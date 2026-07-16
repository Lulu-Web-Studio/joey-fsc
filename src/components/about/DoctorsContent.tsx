"use client"

import CTA from '@/components/CTA'
import BodyText from '@/components/ui/BodyText'
import HeaderText from '@/components/ui/HeaderText'
import Image from 'next/image'
import Underline from '@/components/ui/Underline'
import { FadeIn, FadeInStagger, FadeInItem } from '@/components/ui/FadeIn'
import { PortableText } from '@portabletext/react'
import type { DoctorsPageSettings, Doctor } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/image'

interface DoctorsContentProps {
    settings: DoctorsPageSettings;
    doctors: Doctor[];
}

const portableTextComponents = {
    block: {
        normal: ({ children }: any) => (
            <BodyText className="mb-4 text-body-text leading-8">
                {children}
            </BodyText>
        ),
        h3: ({ children }: any) => (
            <HeaderText variant='small' as='h3' className="text-lg font-semibold mt-6 mb-2 text-header-text">
                {children}
            </HeaderText>
        ),
    },
    marks: {
        strong: ({ children }: any) => (
            <strong className="font-medium">{children}</strong>
        ),
        em: ({ children }: any) => (
            <em className="italic">{children}</em>
        ),
        link: ({ children, value }: any) => (
            <a
                href={value?.href}
                className="underline decoration-dotted underline-offset-4 transition-colors hover:text-primary-teal"
                target={value?.href?.startsWith('http') ? '_blank' : undefined}
                rel={value?.href?.startsWith('http') ? 'noreferrer' : undefined}
            >
                {children}
            </a>
        ),
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="my-4 list-inside list-disc space-y-2 text-body-text">
                {children}
            </ul>
        ),
        number: ({ children }: any) => (
            <ol className="my-4 list-inside list-decimal space-y-2 text-body-text">
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }: any) => (
            <li className="text-body-text marker:text-primary-teal">
                {children}
            </li>
        ),
        number: ({ children }: any) => (
            <li className="text-body-text marker:font-medium marker:text-header-text">
                {children}
            </li>
        ),
    },
}

export default function DoctorsContent({ settings, doctors }: DoctorsContentProps) {
    const titleParts = settings.title.split(' ')
    const titlePrefix = titleParts.slice(0, -1).join(' ')
    const titleHighlight = titleParts.slice(-1)[0] || settings.title

    return (
        <div className="min-h-screen pt-40 sm:pt-52 sm:w-5/6 mx-auto">
            <FadeIn className="flex flex-col items-center justify-center gap-4 mb-20 px-8 text-center">
                <HeaderText as="h1" className="text-header-text font-serif font-medium">
                    {titlePrefix}{titlePrefix ? ' ' : ''}
                    <Underline color="#FEB7B1">
                        <span>{titleHighlight}</span>
                    </Underline>
                </HeaderText>
                <BodyText className="text-center text-body-text max-w-3xl">
                    {settings.description}
                </BodyText>
            </FadeIn>

            <FadeInStagger as="ul" role="list" className="flex flex-col sm:flex-row mx-auto sm:mt-20 lg:gap-8">
                {doctors.map((doctor) => {
                    const imageSrc = doctor.photo?.sanityImage?.asset
                        ? urlFor(doctor.photo.sanityImage).width(288).height(288).url()
                        : doctor.photo?.staticPath || '/images/profiles/placeholder.webp'

                    return (
                        <FadeInItem as="li" key={doctor._id} className="rounded-2xl px-8 py-10">
                            <div className="w-40 h-40 md:w-72 md:h-72 mx-auto rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                                <Image
                                    alt={doctor.name}
                                    src={imageSrc}
                                    width={288}
                                    height={288}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            <div className="text-center">
                                <div className="my-6 sm:my-8">
                                    <HeaderText
                                        as="h3"
                                        variant="small"
                                        className="font-medium tracking-tight text-header-text font-serif"
                                    >
                                        {doctor.name}
                                        {doctor.credentials && (
                                            <span className="ml-2 font-normal text-body-text-light/70">
                                                {doctor.credentials}
                                            </span>
                                        )}
                                    </HeaderText>
                                </div>

                                <div className="text-left">
                                    <PortableText
                                        value={doctor.bio}
                                        components={portableTextComponents}
                                    />
                                </div>
                            </div>
                        </FadeInItem>
                    );
                })}
            </FadeInStagger>

            <div className="flex flex-col items-center justify-center mt-20">
                <CTA />
            </div>
        </div>
    )
}
