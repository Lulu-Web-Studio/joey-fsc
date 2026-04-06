"use client"

import CTA from '@/components/CTA'
import BodyText from '@/components/ui/BodyText'
import HeaderText from '@/components/ui/HeaderText'
import Image from 'next/image'
import { RoughNotation } from 'react-rough-notation'
import type { TeamPageSettings } from '@/types/sanity'
import { getImageUrl } from '@/sanity/lib/image'

interface TeamContentProps {
    settings: TeamPageSettings;
}

export default function TeamContent({ settings }: TeamContentProps) {
    const imageSrc = getImageUrl(settings.teamImage, '/images/about/office.webp');

    return (
        <div className="py-44">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center sm:mt-10">
                    <HeaderText className="text-header-text font-serif font-medium text-center">
                        <RoughNotation
                            multiline
                            type="underline"
                            show={true}
                            color='#FFBA01'
                            animationDuration={1000}
                            iterations={1}
                            padding={1}
                            strokeWidth={8}
                        >
                            {settings.title}
                        </RoughNotation>
                    </HeaderText>
                    <BodyText className="mt-6 text-body-text text-center">
                        {settings.description}
                    </BodyText>
                </div>

                <Image
                    width={1200}
                    height={800}
                    className="mt-16 w-full rounded-2xl object-cover"
                    alt='Office team picture'
                    src={imageSrc}
                />

                <CTA />
            </div>
        </div>
    )
}
