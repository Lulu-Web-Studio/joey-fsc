"use client"
import Image from 'next/image'
import Link from 'next/link'
import HeaderText from '../ui/HeaderText'
import BodyText from '../ui/BodyText'
import {FadeIn} from '../ui/FadeIn'
import type {HybridImage} from '@/types/sanity'
import {getImageUrl} from '@/sanity/lib/image'
import {AREAS, AREAS_BASE_PATH, areaHref} from '@/config/areas'
import PillMarquee from '@/components/ui/PillMarquee'

interface LocationProps {
    title: string;
    description: string;
    image: HybridImage;
}

export default function Location({title, description, image}: LocationProps) {
    const imageSrc = getImageUrl(image, '/images/connecticut2.png');

    return (
        <div className="min-h-svh">
            <div className='flex flex-col sm:flex-row flex-1 items-center justify-center py-24 h-full'>
                {/* marquee-col (min-width:0) is load-bearing: without it the marquee's
                    intrinsic width stretches this flex item and shoves the map off-screen. */}
                <FadeIn className='marquee-col flex flex-[0.45] w-full h-full flex-col justify-center items-start gap-10'>
                    <HeaderText variant="default" className="text-header-text font-serif font-medium">
                        {title}
                    </HeaderText>
                    <BodyText className='text-body-text'>
                        {description}
                    </BodyText>

                    <div className='w-full'>
                        <h3 className='text-lg font-semibold text-header-text'>
                            Areas we serve
                        </h3>

                        <div className='mt-4'>
                            <PillMarquee
                                ariaLabel="Areas we serve"
                                items={AREAS.map((area) => ({
                                    key: area.slug,
                                    label: `${area.town}, CT`,
                                    href: areaHref(area),
                                }))}
                            />
                        </div>

                        <Link
                            href={AREAS_BASE_PATH}
                            className='mt-5 inline-block font-semibold text-primary-teal underline-offset-4 hover:underline'
                        >
                            See all areas we serve &rarr;
                        </Link>
                    </div>
                </FadeIn>
                <FadeIn delay={0.15} className='flex flex-[0.55] items-center justify-end h-full w-full'>
                    <Image
                        width={700}
                        height={700}
                        alt={title}
                        className='object-cover w-full h-full'
                        src={imageSrc}
                    />
                </FadeIn>
            </div>
        </div>
    )
}
