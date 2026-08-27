"use client"
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import BodyText from '../ui/BodyText';
import Button from '../Button';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const, delay },
    }),
};

interface HeroSectionProps {
    imageUrl: string;
    imageAlt?: string;
    headline: string;
    highlight: string;
    subcopy: string;
    ctaLabel: string;
    ctaLink: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
    imageUrl,
    imageAlt = 'Patient smiling at Facial Surgery Center in Trumbull CT',
    headline,
    highlight,
    subcopy,
    ctaLabel,
    ctaLink,
}) => (
    <section className="pt-52 h-fit">
        {/* Decorative circle behind image */}

        <div className="">
            {/* Headline */}
            <div className="text-center sm:w-2/4 mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-header-text leading-tight">
                    <span className='font-serif'>The Facial Surgery Center</span>

                    <br />
                    <span className="font-light font-sans">{headline} </span>
                    <span className="text-primaryYellow">{highlight}</span>
                    <span className="font-light"> Smile</span>
                </h1>
            </div>

            <div className="flex flex-col sm:flex-row items-center px-12 justify-between h-full ">

                <div className='flex-[0.6]'>

                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        width={500}
                        height={500}
                        priority
                        sizes="(max-width: 640px) calc(100vw - 6rem), (max-width: 1280px) 45vw, 500px"
                        className="object-contain w-full h-full"
                    />
                </div>


                {/* Copy + CTA */}
                <motion.div
                    className="flex flex-col items-center md:items-start space-y-6 py-8"
                    initial="hidden"
                    animate="visible"
                    custom={0.3}
                    variants={fadeUp}
                >
                    <BodyText as='p' variant='default' className="text-gray-600 max-w-md text-center md:text-left">
                        {subcopy}
                    </BodyText>
                    <div className="flex items-center gap-4">
                        <Button
                            text={ctaLabel}
                            href={ctaLink}
                        />
                        {/* <a
                            href={`tel:${config.officePhone}`}
                            className="bg-primaryYellow hover:bg-yellow-500 rounded-full p-4 transition-all duration-300 hover:scale-105"
                            aria-label={`Call ${config.officePhone}`}
                        >
                            <Phone className="w-6 h-6 text-white" />
                        </a> */}
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);

export default HeroSection;
