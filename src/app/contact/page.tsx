import Form from '@/components/contact/Form';
import BodyText from '@/components/ui/BodyText';
import HeaderText from '@/components/ui/HeaderText';
import {config} from '@/config';
import clsx from 'clsx';
import {Clock2Icon, MapIcon, PhoneIcon} from 'lucide-react';
import React from 'react';

const contactInfo = [
    {
        icon: MapIcon,
        label: "Address",
        value: "115 Technology Dr B-101, Trumbull, CT 06611",
        color: "text-primaryCyan",
        href: "https://maps.google.com/?q=115+Technology+Dr+B-101,+Trumbull,+CT+06611",
        clickable: true
    },
    {
        icon: PhoneIcon,
        label: "Phone",
        value: config.officePhone,
        color: "text-primaryOrange",
        href: `tel:${config.officePhone}`,
        clickable: true
    },
    {
        icon: Clock2Icon,
        label: "Hours",
        value: <>
            Monday, Tuesday, & Thursday: 8:00 AM - 5:00 PM
            <br />
            Wednesday & Friday: 8:00 AM - 12:00 PM
            <br />
            Saturday - Sunday: Closed
        </>,
        color: "text-primaryPink",
        clickable: false
    }
];

export const metadata = {
    title: 'Contact Us - The Facial Surgery Center',
}

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            {/* Top section with content and map */}
            <div className="mx-auto max-w-7xl pt-16 sm:pt-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left side content */}
                    <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-20">
                        <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">


                        <HeaderText className="text-header-text mb-6 font-medium font-serif ">
                            Contact Us
                        </HeaderText>


                            <div className="mt-6 space-y-4">
                                <BodyText className="text-xl text-gray-600">
                                    At The Facial Surgery Center, we value your feedback and inquiries.
                                    Whether you have questions about our services or need assistance, we&apos;re here to help.
                                </BodyText>

                                <BodyText className="text-xl text-gray-600">
                                    Someone from our team will get back to you as soon as possible.
                                    Please fill out the form and we will reach out to you shortly.
                                </BodyText>
                            </div>

                            {/* Contact information */}
                            <dl className="mt-10 space-y-4 text-lg text-gray-600">
                                {contactInfo.map((item, idx) => (
                                    <div key={idx} className="flex gap-x-4">
                                        <dt className="flex-none">
                                            <span className="sr-only">{item.label}</span>
                                            <item.icon aria-hidden="true" className={clsx("h-7 w-6", item.color)} />
                                        </dt>
                                        <dd>
                                            <div className="font-semibold text-gray-900">{item.label}</div>
                                            {item.clickable ? (
                                                <a
                                                    href={item.href}
                                                    className="text-gray-600 hover:text-primary-teal transition-colors duration-200 underline decoration-dotted underline-offset-4"
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <div className="text-gray-600">{item.value}</div>
                                            )}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>

                    {/* Right side map */}
                    <div className="relative px-6 pb-20 sm:pt-32 lg:px-8 lg:py-20">
                        <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                            <div className="w-full h-0 pb-[75%] relative rounded-lg overflow-hidden">
                                <iframe
                                    className="rounded-lg shadow-lg border-0 absolute top-0 left-0 w-full h-full"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.399512160105!2d-73.23389912364132!3d41.29643917131148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e80834ce524f6b%3A0x789b6c094af08b8!2sFacial%20Surgery%20Center!5e1!3m2!1sen!2sus!4v1752710091224!5m2!1sen!2sus"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full width form section */}
                <div className="w-full px-8 sm:px-0 mb-20 py-12">
                    <Form />
                </div>
            </div>

            {/* CTA Section
            <div className="mt-20">
                <CTA />
            </div> */}
        </div>
    );
}