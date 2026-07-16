"use client"
import Image from 'next/image'
import HeaderText from '../ui/HeaderText'
import BodyText from '../ui/BodyText'
import { FadeIn } from '../ui/FadeIn'
import type { HybridImage } from '@/types/sanity'
import { getImageUrl } from '@/sanity/lib/image'

interface LocationProps {
    title: string;
    description: string;
    image: HybridImage;
}

export default function Location({ title, description, image }: LocationProps) {
    const imageSrc = getImageUrl(image, '/images/connecticut2.png');

    return (
        <div className="h-svh">
            <div className='flex flex-col sm:flex-row flex-1 items-center justify-center py-24 h-full'>
                <FadeIn className='flex flex-[0.45] w-full h-full flex-col justify-center items-center gap-10'>
                    <HeaderText variant="default" className="text-header-text font-serif font-medium">
                        {title}
                    </HeaderText>
                    <BodyText className='text-body-text'>
                        {description}
                    </BodyText>
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
