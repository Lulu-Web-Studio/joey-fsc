"use client";
import React, {useEffect, useRef, useState} from "react";
import {ChevronLeft, ChevronRight, ArrowRight} from "lucide-react";
import Image from "next/image";
import HeaderText from "../ui/HeaderText";
import BodyText from "../ui/BodyText";
import {servicesArray} from "@/config/services";

export const services = servicesArray;

export default function HorizontalSlider() {
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
            const cardWidth = itemWidth + 24; // itemWidth + gap
            const index = Math.round(scrollLeft / cardWidth);
            setActiveIndex(index);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [isMobile, itemWidth]);

    const handleScroll = (scrollAmount: number) => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += scrollAmount;
        }
    };

    return (
        <div className="flex flex-col items-center w-full px-4 py-12 bg-bg2">
            <div className="flex flex-row items-center justify-between w-full max-w-7xl mb-8">
                <div className="pb-4 sm:pb-12">
                    <HeaderText className="text-header-text mb-2 font-serif font-medium">
                        Services We Offer
                    </HeaderText>
                    <BodyText className="text-body-text-light">
                        Comprehensive care for all your oral and facial needs
                    </BodyText>
                </div>
                <div className="items-center gap-3 hidden sm:flex md:hidden">
                    <button
                        onClick={() => handleScroll(-itemWidth)}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-teal hover:bg-primaryCyan flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                        onClick={() => handleScroll(itemWidth)}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-teal hover:bg-primaryCyan flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                </div>
            </div>

            <div
                ref={containerRef}
                className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-6 py-6 scrollbar-hide md:overflow-visible md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:max-w-7xl"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {services.map((item, idx) => (
                    <a
                        href={item.href}
                        key={idx + item.name}
                        className="group bg-white snap-center shrink-0 rounded-3xl shadow-lg transition-all duration-300 flex flex-col overflow-hidden border border-slate-100 hover:border-primary-teal hover:-translate-y-2 hover:scale-[1.02] md:shrink md:w-auto"
                        style={isMobile ? {
                            width: `${itemWidth}px`,
                            height: `${itemHeight}px`,
                        } : undefined}
                    >
                        {/* Image Section */}
                        <div className="relative h-64 overflow-hidden bg-bg">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Image
                                src={item.img}
                                alt={item.name}
                                width={400}
                                height={300}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                    e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23fbe8d8"/><text x="200" y="150" text-anchor="middle" dy=".3em" font-family="Arial" font-size="16" fill="%23565656">Medical Service</text></svg>`;
                                }}
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ArrowRight className="w-4 h-4 text-primary-teal" />
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 p-6 flex flex-col justify-between">
                            <div>
                                <HeaderText as="h3" variant="small" className="text-header-text mb-3 font-serif font-medium group-hover:text-primary-teal transition-colors duration-300">
                                    {item.name}
                                </HeaderText>
                                <BodyText as="h4" variant="small" className="text-body-text-light leading-relaxed line-clamp-4">
                                    {item.description}
                                </BodyText>
                            </div>

                            <div className="mt-4 pt-4 border-t border-misty-blue">
                                <div className="flex items-center text-primary-teal font-medium text-sm group-hover:text-primaryCyan transition-colors duration-300">
                                    <span>Learn More</span>
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* Scroll Indicator Dots - Mobile Only */}
            {isMobile && (
                <div className="flex items-center justify-center gap-2 mt-6 md:hidden">
                    {services.map((_, idx) => (
                        <button
                            key={idx + _.href}
                            onClick={() => {
                                if (containerRef.current) {
                                    const cardWidth = itemWidth + 24; // itemWidth + gap
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