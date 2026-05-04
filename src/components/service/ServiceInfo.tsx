import React from 'react'
import HeaderText from '../ui/HeaderText'
import Image from 'next/image'
import BodyText from '../ui/BodyText'
import {RoughNotation, RoughNotationGroup} from "react-rough-notation";
import {SvgBlob} from 'react-svg-blob'


interface ServiceInfoProps {
    title1: string;
    title2: string;
    description1: string;
    description2: string;
    imageSrc1: string;
    imageSrc2: string;
    className?: string;
    infoHeader: string;
}

export default function ServiceInfo({
    infoHeader,
    title1,
    title2,
    description1,
    description2,
    imageSrc1,
    imageSrc2,
    className,
}: ServiceInfoProps) {
    return (
        <div className='flex flex-col items-center justify-center container space-y-12 p-4 py-12'>
            <RoughNotation type="highlight" show={true} color="#FBBFCA" animationDuration={1000} iterations={1} padding={10} strokeWidth={4} >
                <HeaderText as='h2' variant='large' className='text-header-text font-serif font-medium text-center'>
                    {infoHeader}
                </HeaderText>
            </RoughNotation>
            {/* First Row */}
            <div className='flex flex-col sm:flex-col-reverse lg:flex-row items-center justify-around w-full gap-8 py-10 pt-10'>
                <div className='flex px-6 sm:px-0 sm:w-4/6 flex-col items-start  gap-8 text-left'>

                    <HeaderText as='h3' className='text-header-text font-serif font-medium md:pb-8'>
                            {title1}
                        </HeaderText>
                    <BodyText className='text-body-text max-w-2xl'>
                        {description1}
                    </BodyText>
                </div>

                <div className="relative">

                    <SvgBlob
                        className="hidden sm:block absolute -top-40 -right-30 -z-10 overflow-hidden"
                        color="#C8E7DB"
                        variant="solid"
                    />
                    <Image
                        src={imageSrc1}
                        alt={title1}
                        width={500}
                        height={500}
                        className="object-cover relative z-10 rounded-xl"
                    />
                </div>


            </div>

            {/* Second Row - Reversed on large screens */}
            <div className='flex flex-col lg:flex-row-reverse items-center justify-around w-full gap-8 py-10'>
                <div className='flex flex-col items-start text-left px-6 sm:px-0 sm:w-4/6 sm:items-end gap-8 sm:text-right'>
                    <HeaderText as='h3' className='text-header-text font-serif font-medium md:pb-8'>
                            {title2}
                        </HeaderText>


                    <BodyText className='text-body-text text-left sm:text-right max-w-2xl'>
                        {description2}
                    </BodyText>
                </div>

                <div className='relative'>
                    <SvgBlob
                        className="hidden sm:block absolute -top-28 -left-40 -z-10 overflow-hidden"
                        color="lightblue"
                        variant="solid"    
                    />
                    <Image
                        src={imageSrc2}
                        alt={title2}
                        width={500}
                        height={500}
                        className="object-cover z-10 rounded-xl"
                    />
                </div>

            </div>
        </div>
    )
}
