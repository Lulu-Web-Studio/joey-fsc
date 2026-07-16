"use client"

import Content from "./Content";
import CTA from "@/components/CTA";
import Location from "@/components/home/Location";
import BodyText from "@/components/ui/BodyText";
import HeaderText from "@/components/ui/HeaderText";
import { FadeIn } from "@/components/ui/FadeIn";
import type { AboutSettings, LocationSection } from "@/types/sanity";

interface AboutContentProps {
    settings: AboutSettings;
    locationSettings: LocationSection;
}

export default function AboutContent({ settings, locationSettings }: AboutContentProps) {
    return (
        <div className="mt-52">
            <FadeIn className="mx-auto w-4/6 text-center space-y-8">
                <HeaderText className="text-header-text font-medium font-serif pb-6">
                    {settings.hero.title}
                </HeaderText>
                <BodyText className="text-body-text">
                    {settings.hero.subtitle}
                </BodyText>
            </FadeIn>
            <div className="mt-20">
                <Content
                    mission={settings.mission}
                    whatWeDo={settings.whatWeDo}
                    imageGallery={settings.imageGallery}
                    values={settings.values}
                    innovation={settings.innovation}
                />
            </div>
            <div className="container">
                <Location
                    title={locationSettings.title}
                    description={locationSettings.description}
                    image={locationSettings.image}
                />
            </div>
            <div>
                <CTA />
            </div>
        </div>
    );
}
