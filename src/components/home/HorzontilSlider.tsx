"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeaderText from "../ui/HeaderText";
import BodyText from "../ui/BodyText";
import { FadeIn, FadeInStagger } from "../ui/FadeIn";
import ServiceCard from "../service/ServiceCard";
import type { Service } from "@/types/sanity";

interface HorizontalSliderProps {
    title: string;
    description: string;
    services: Service[];
    /**
     * Per-slug href overrides, e.g. { "wisdom-teeth-removal": "/areas-we-serve/fairfield/wisdom-teeth-removal" }.
     * Falls back to the shared service page for any slug not listed. A plain
     * object rather than a resolver function because this component is a
     * Client Component — a Server Component caller (e.g. a town page) can't
     * pass a function across that boundary, only serializable data.
     */
    hrefBySlug?: Record<string, string>;
}

export default function HorizontalSlider({
    title,
    description,
    services,
    hrefBySlug,
}: HorizontalSliderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [itemWidth, setItemWidth] = useState<number>(400);
    const [itemHeight, setItemHeight] = useState<number>(550);
    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            const width = mobile ? window.innerWidth * 0.9 : 400;
            const height = mobile ? 520 : 550;
            setItemHeight(height);
            setItemWidth(width);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !isMobile) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const cardWidth = itemWidth + 24;
            const index = Math.round(scrollLeft / cardWidth);
            setActiveIndex(index);
        };

        container.addEventListener('scroll', handleScroll, {passive: true});
        return () => container.removeEventListener('scroll', handleScroll);
    }, [isMobile, itemWidth]);

    const handleScroll = (scrollAmount: number) => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += scrollAmount;
        }
    };

    return (
        <div className="flex flex-col items-center w-full px-4 py-12 bg-bg2">
            <FadeIn className="flex flex-row items-center justify-between w-full max-w-7xl mb-8">
                <div className="pb-4 sm:pb-12">
                    <HeaderText className="text-header-text mb-2 font-serif font-medium">
                        {title}
                    </HeaderText>
                    <BodyText className="text-body-text-light">
                        {description}
                    </BodyText>
                </div>
                <div className="items-center gap-3 hidden sm:flex md:hidden">
                    <button
                        type="button"
                        onClick={() => handleScroll(-itemWidth)}
                        aria-label="Previous services"
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-teal hover:bg-primaryCyan flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleScroll(itemWidth)}
                        aria-label="Next services"
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-teal hover:bg-primaryCyan flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                </div>
            </FadeIn>

            <FadeInStagger
                ref={containerRef}
                className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-6 py-6 scrollbar-hide md:overflow-visible md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:max-w-7xl"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {services.map((service, idx) => (
                    <ServiceCard
                        key={service._id || idx}
                        href={hrefBySlug?.[service.slug] ?? `/service/${service.slug}`}
                        title={service.serviceTitle}
                        description={service.description}
                        imageSrc={service.coverImage?.staticPath || '/images/placeholder.jpg'}
                        style={isMobile ? {
                            width: `${itemWidth}px`,
                            height: `${itemHeight}px`,
                        } : undefined}
                    />
                ))}
            </FadeInStagger>

            {/* Scroll Indicator Dots - Mobile Only */}
            {isMobile && (
                <div className="flex items-center justify-center gap-2 mt-6 md:hidden">
                    {services.map((_, idx) => (
                        <button
                            type="button"
                            key={idx}
                            onClick={() => {
                                if (containerRef.current) {
                                    const cardWidth = itemWidth + 24;
                                    containerRef.current.scrollTo({
                                        left: idx * cardWidth,
                                        behavior: 'smooth'
                                    });
                                }
                            }}
                            className={`transition-all duration-300 rounded-full ${idx === activeIndex
                                ? 'w-8 h-2 bg-primary-teal'
                                : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                                }`}
                            aria-label={`Go to service ${idx + 1}`}
                        />
                    ))}
                </div>
            )}

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .line-clamp-4 {
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}
