import Image from 'next/image';
import React from 'react';
import BodyText from '../ui/BodyText';
import Button from '../Button';
import {Phone} from 'lucide-react';
import {config} from '@/config';

interface HeroSectionProps {
    imageUrl?: string;
    imageAlt?: string;
    headline?: string;
    highlight?: string;
    subcopy?: string;
    ctaLabel?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
    imageUrl = '/images/smiling-woman.png',
    imageAlt = 'Smiling person',
    highlight = 'New',
    subcopy = 'Serving Central Texas for over 50 years, we put patients’ needs first, providing superior care in a safe and compassionate environment.',
    ctaLabel = 'Schedule an Appointment',
}) => (
    <section className="pt-52 h-fit">
        {/* Decorative circle behind image */}

        <div className="">
            {/* Headline */}
            <div className="text-center sm:w-2/4 mx-auto">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium text-header-text leading-tight">
                    <span className='font-serif'>The Facial Surgery Center</span>

                    <br />
                    <span className="font-light font-sans">Transform Your Confidence with a </span>
                    <span className="text-primaryYellow">{highlight}</span>
                    <span className="font-light"> Smile</span>
                </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center px-12 justify-between h-full ">

                <div className='flex-[0.6]'>

                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        width={500}
                        height={500}
                        className="object-contain w-full h-full"
                    />
                </div>


                {/* Copy + CTA */}
                <div className="flex flex-col items-center md:items-start space-y-6 py-8">
                    <BodyText as='h1' variant='default' className="text-gray-600 max-w-md text-center md:text-left">
                        {subcopy}
                    </BodyText>
                    <div className="flex items-center gap-4">
                        <Button
                            text={ctaLabel}
                            href="/contact"
                        />
                        {/* <a
                            href={`tel:${config.officePhone}`}
                            className="bg-primaryYellow hover:bg-yellow-500 rounded-full p-4 transition-all duration-300 hover:scale-105"
                            aria-label={`Call ${config.officePhone}`}
                        >
                            <Phone className="w-6 h-6 text-white" />
                        </a> */}
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default HeroSection;
