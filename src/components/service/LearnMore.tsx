import React from 'react'
import HeaderText from '../ui/HeaderText'
import clsx from 'clsx'
import {services} from '../../../public/services';
import Image from 'next/image';
import BodyText from '../ui/BodyText';
import { ServiceSlug } from '@/config/services';

interface LearnMoreProps {
    service1Idx: number;
    service2Idx: number;
    className?: string;
}

export default function LearnMore({
    service1Idx,
    service2Idx,
    className,
}: LearnMoreProps) {
    
    const indexes = [service1Idx, service2Idx];

    return (
        <section className={clsx(
            'bg-gradient-to-br from-gray-50 to-blue-50 py-20',
            className
        )}>
            <div className='container mx-auto px-4'>
                {/* Header */}
                <div className='text-center mb-16'>
                    <HeaderText className='font-serif font-medium text-header-text mb-4'>
                        Explore More Services
                    </HeaderText>
                    <BodyText className='text-xl text-gray-600 max-w-2xl mx-auto'>
                        Discover other specialized treatments we offer to meet your oral health needs
                    </BodyText>
                </div>

                {/* Services Grid */}
                <div className='grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto'>
                    {indexes.map((serviceIdx, idx) => {

                        const serviceKey = Object.keys(services)[serviceIdx] as ServiceSlug;
                        const service = services[serviceKey];

                        return (
                            <div
                                key={idx}
                                className='group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2'
                            >
                                {/* Image Container */}
                                <div className='relative overflow-hidden'>
                                    <Image
                                        width={500}
                                        height={500}
                                        src={service.coverImg}
                                        alt={service.serviceTitle}
                                        className='w-full h-72 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-110'
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                                </div>

                                {/* Content */}
                                <div className='p-8 lg:p-10'>
                                    <HeaderText as='h3' variant='small' className='font-medium font-serif text-header-text mb-4 transition-colors duration-300'>
                                        {service.serviceTitle}
                                    </HeaderText>

                                    <p className='text-body-text text-lg leading-relaxed mb-8'>
                                        {service.description}
                                    </p>

                                    {/* Learn More Button */}
                                    <div className='flex justify-start'>
                                        <a
                                            href={`/service/${serviceKey}`}
                                            className='inline-flex items-center px-8 py-4 bg-primary-teal text-white font-semibold rounded-xl hover:bg-primaryCyan transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'>
                                            <span>Learn More</span>
                                            <svg
                                                className='ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                            >
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                {/* Decorative Element */}
                                <div className='absolute top-4 right-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                    <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' />
                                    </svg>
                                </div>
                            </div>
                        )

                    })}
                </div>
            </div>
        </section>
    )
}