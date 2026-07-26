"use client"

import CTA from '@/components/CTA'
import BodyText from '@/components/ui/BodyText'
import HeaderText from '@/components/ui/HeaderText'
import Image from 'next/image'
import Underline from '@/components/ui/Underline'
import { FadeIn } from '@/components/ui/FadeIn'
import type { TeamPageSettings } from '@/types/sanity'
import { getImageUrl } from '@/sanity/lib/image'
import { SITE_COLORS } from '@/config/colors'

interface TeamContentProps {
    settings: TeamPageSettings;
}

export default function TeamContent({ settings }: TeamContentProps) {
    const imageSrc = getImageUrl(settings.teamImage, '/images/about/office.webp');

    return (
        <div className="py-44">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <FadeIn className="mx-auto max-w-2xl sm:text-center sm:mt-10">
                    <HeaderText as="h1" className="text-header-text font-serif font-medium text-center">
                        <Underline color={SITE_COLORS.primaryYellow}>
                            {settings.title}
                        </Underline>
                    </HeaderText>
                    <BodyText className="mt-6 text-body-text text-center">
                        {settings.description}
                    </BodyText>
                </FadeIn>

                <FadeIn delay={0.15}>
                    <Image
                        width={1200}
                        height={800}
                        className="mt-16 w-full rounded-2xl object-cover"
                        alt='Office team picture'
                        src={imageSrc}
                    />
                </FadeIn>

                <CTA />
            </div>
        </div>
    )
}
