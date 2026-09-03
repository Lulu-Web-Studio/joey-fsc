import React from 'react'
import HeaderText from '../ui/HeaderText'
import Image from 'next/image'
import BodyText from '../ui/BodyText'
import clsx from 'clsx'
import Underline from '../ui/Underline'
import { FadeIn } from '../ui/FadeIn'
import type { HybridImage } from '@/types/sanity'
import { getImageUrl } from '@/sanity/lib/image'
import { SITE_COLORS } from '@/config/colors'

interface AreasOfFocusProps {
    className?: string;
    title: string;
    subtitle: string;
    image: HybridImage;
}

export default function AreasOfFocus({ className, title, subtitle, image }: AreasOfFocusProps) {
    const imageSrc = getImageUrl(image, '/images/areas-of-focus.png');

    return (
        <div className={clsx(className, 'px-10 sm:px-0 sm:w-full')}>
            <FadeIn className='mx-auto max-w-3xl'>
                <HeaderText as='h2' variant="default" className="text-header-text mb-12 text-center font-serif font-medium">
                    <Underline color={SITE_COLORS.accentRose}>
                        {title}
                    </Underline>
                </HeaderText>

                <BodyText className='text-center text-body-text mt-4'>
                    {subtitle}
                </BodyText>
            </FadeIn>

            <FadeIn delay={0.15}>
                <Image
                    src={imageSrc}
                    alt={title}
                    width={700}
                    height={700}
                    sizes="(max-width: 640px) calc(100vw - 5rem), 700px"
                    className="object-cover mx-auto mt-10"
                />
            </FadeIn>
        </div>
    )
}
