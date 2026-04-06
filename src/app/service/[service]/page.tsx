import React from 'react'
import ServiceHero from '@/components/service/ServiceHero';
import ServiceInfo from '@/components/service/ServiceInfo';
import LearnMore from '@/components/service/LearnMore';
import CTA from '@/components/CTA';
import { Metadata } from 'next';
import HeaderText from '@/components/ui/HeaderText';
import { sanityFetch } from '@/sanity/lib/live';
import { client } from '@/sanity/lib/client';
import { SERVICE_QUERY, SERVICE_SEO_QUERY, ALL_SERVICE_SLUGS_QUERY, ALL_SERVICES_QUERY } from '@/sanity/queries/services';
import type { Service } from '@/types/sanity';
import { getImageUrl } from '@/sanity/lib/image';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
    const services = await client.fetch<{ slug: string }[]>(ALL_SERVICE_SLUGS_QUERY);

    return services.filter((service) => Boolean(service.slug)).map((service) => ({
        service: service.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ service: string }>
}): Promise<Metadata> {
    const { service } = await params;
    const { data: serviceData } = await sanityFetch({
        query: SERVICE_SEO_QUERY,
        params: { slug: service },
        stega: false,
    });

    if (serviceData) {
        return {
            title: serviceData.seo?.title || `${serviceData.serviceTitle} | Facial Surgery Center`,
            description: serviceData.seo?.description || serviceData.description,
        };
    }

    return {
        title: "Facial Surgery Center | Best Oral and Maxillofacial Surgeons",
    };
}

export default async function ServicePage({
    params,
}: {
    params: Promise<{ service: string }>
}) {
    const { service } = await params;

    const { data: serviceData } = await sanityFetch({
        query: SERVICE_QUERY,
        params: { slug: service },
    });

    const { data: allServices } = await sanityFetch({
        query: ALL_SERVICES_QUERY,
    });

    if (!serviceData) {
        return (
            <div className='min-h-screen flex flex-col justify-center items-center'>
                <HeaderText>Service not found</HeaderText>
            </div>
        );
    }

    const serviceList: Service[] = (allServices || [])
        .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
        .map((entry, index) => ({
            _id: entry._id,
            serviceTitle: entry.serviceTitle || 'Service',
            slug: entry.slug || `service-${index}`,
            description: entry.description || '',
            coverImage: entry.coverImage || {},
            order: entry.order ?? index,
        }));

    const currentService = {
        _id: serviceData._id,
        serviceTitle: serviceData.serviceTitle || 'Service',
        slug: serviceData.slug || service,
        description: serviceData.description || '',
        coverImage: serviceData.coverImage || {},
        serviceTitle2: serviceData.serviceTitle2 || serviceData.serviceTitle || 'Service',
        paragraph1: {
            title: serviceData.paragraph1?.title || '',
            text: serviceData.paragraph1?.text || '',
            image: serviceData.paragraph1?.image || null,
        },
        paragraph2: {
            title: serviceData.paragraph2?.title || '',
            text: serviceData.paragraph2?.text || '',
            image: serviceData.paragraph2?.image || null,
        },
        ctaText: serviceData.ctaText || undefined,
    };

    const currentServiceCard: Service = {
        _id: currentService._id,
        serviceTitle: currentService.serviceTitle,
        slug: currentService.slug,
        description: currentService.description,
        coverImage: currentService.coverImage,
    };

    // Find current service index and calculate prev/next
    const currentIndex = serviceList.findIndex((entry) => entry.slug === service);
    const totalServices = serviceList.length;

    const prevIndex = currentIndex - 1 < 0 ? totalServices - 1 : currentIndex - 1;
    const nextIndex = currentIndex + 1 >= totalServices ? 0 : currentIndex + 1;

    const prevService = serviceList[prevIndex] || serviceList[0] || currentServiceCard;
    const nextService = serviceList[nextIndex] || serviceList[0] || currentServiceCard;

    return (
        <div className='min-h-screen'>
            <div className='p-4 sm:p-8'>
                <ServiceHero
                    title={currentService.serviceTitle}
                    description={currentService.description}
                    imageSrc={getImageUrl(currentService.coverImage, '/images/placeholder.webp')}
                    className='mt-32'
                />
            </div>
            <div>
                <ServiceInfo
                    infoHeader={currentService.serviceTitle2}
                    title1={currentService.paragraph1.title}
                    title2={currentService.paragraph2.title}
                    description1={currentService.paragraph1.text}
                    description2={currentService.paragraph2.text}
                    imageSrc1={getImageUrl(currentService.paragraph1.image, '/images/placeholder.webp')}
                    imageSrc2={getImageUrl(currentService.paragraph2.image, '/images/placeholder.webp')}
                />
            </div>
            <div>
                <LearnMore
                    prevService={prevService}
                    nextService={nextService}
                />
            </div>
            <div>
                <CTA ctaText={currentService.ctaText} serviceTitle={currentService.serviceTitle} />
            </div>
        </div>
    );
}
