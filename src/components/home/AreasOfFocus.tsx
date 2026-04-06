"use client"
import React from 'react'
import HeaderText from '../ui/HeaderText'
import Image from 'next/image'
import BodyText from '../ui/BodyText'
import clsx from 'clsx'
import { RoughNotation } from 'react-rough-notation'
import type { HybridImage } from '@/types/sanity'
import { getImageUrl } from '@/sanity/lib/image'

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
            <div className='mx-auto max-w-3xl'>
                <HeaderText as='h2' variant="default" className="text-header-text mb-12 text-center font-serif font-medium">
                    <RoughNotation multiline type="underline" show={true} color='#CE8490' animationDuration={1000} iterations={1} padding={1} strokeWidth={8}>
                        {title}
                    </RoughNotation>
                </HeaderText>

                <BodyText className='text-center text-body-text mt-4'>
                    {subtitle}
                </BodyText>
            </div>

            <Image
                src={imageSrc}
                alt={title}
                width={700}
                height={700}
                className="object-cover mx-auto mt-10"
                priority
            />
        </div>
    )
}
