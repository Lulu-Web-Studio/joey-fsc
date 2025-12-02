import clsx from 'clsx'
import React from 'react'
import HeaderText from '../ui/HeaderText'
import BodyText from '../ui/BodyText';
import Image from 'next/image';

interface ServiceHeroProps {
    title: string;
    description: string;
    imageSrc: string;
    className?: string;
}

export default function ServiceHero({
    title,
    description,
    imageSrc,
    className,

}: ServiceHeroProps) {
    return (
        <div className={clsx(
            'bg-primaryCyan/20 w-full h-full rounded-[48px] flex flex-col items-center justify-center',
            "sm:flex-row sm:justify-between sm:items-center",
            "p-10 sm:px-20",
            "shadow-md",
            className
        )}>
            <div className='max-w-xl px-2 h-full flex flex-col items-start justify-between lg:space-y-20 md:space-y-10 space-y-6'>
                <HeaderText as='h1' variant='large' className='text-header-text font-serif font-medium'>
                    {title}
                </HeaderText>
                <BodyText as="h2" className='text-body-text-light'>
                    {description}
                </BodyText>
            </div>

            <div>
                <Image
                    src={imageSrc}
                    alt={title}
                    width={500}
                    height={500}
                    className='w-full h-full object-contain sm:w-[500px] sm:h-[500px]'
                />
            </div>
        </div>
    )
}
