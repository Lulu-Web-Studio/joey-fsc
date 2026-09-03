import Hero from "./Hero";
import WhyUs from "./WhyUs";
import AreasOfFocus from "./AreasOfFocus";
import Doctors from "./Doctors";
import HorizontalSlider from "./HorzontilSlider";
import Location from "./Location";
import Testimonial from "./Testimonial";
import CTA from "@/components/CTA";
import type {Doctor, HomeSettings, Service, Testimonial as TestimonialType} from "@/types/sanity";
import { getImageUrl } from "@/sanity/lib/image";

interface HomeContentProps {
    settings: HomeSettings;
    services: Service[];
    testimonials: TestimonialType[];
    doctors: Doctor[];
}

export default function HomeContent({settings, services, testimonials, doctors}: HomeContentProps) {
    return (
        <div className="min-h-screen">
            <div className="container">
                <Hero
                    headline={settings.hero.headline}
                    highlight={settings.hero.highlight}
                    subcopy={settings.hero.subtitle}
                    imageUrl={getImageUrl(settings.hero.heroImage, '/images/smiling-woman.png')}
                    ctaLabel={settings.hero.ctaText}
                    ctaLink={settings.hero.ctaLink}
                />
            </div>
            <div>
                <WhyUs
                    title={settings.whyUs.title}
                    description={settings.whyUs.description}
                    points={settings.whyUs.points}
                />
            </div>
            <div>
                <AreasOfFocus
                    className="pt-16"
                    title={settings.areasOfFocus.title}
                    subtitle={settings.areasOfFocus.subtitle}
                    image={settings.areasOfFocus.image}
                />
            </div>
            <Doctors doctors={doctors} />
            <div className="py-32 bg-bg2 flex flex-col items-center justify-center">
                <HorizontalSlider
                    title={settings.services.title}
                    description={settings.services.description}
                    services={services}
                />
            </div>
            <div className="container pt-16">
                <Location
                    title={settings.location.title}
                    description={settings.location.description}
                    image={settings.location.image}
                />
            </div>
            <Testimonial
                title={settings.testimonials.title}
                description={settings.testimonials.description}
                testimonials={testimonials}
            />
            <div>
                <CTA />
            </div>
        </div>
    );
}
