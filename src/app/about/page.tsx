import AboutContent from "@/components/about/AboutContent";
import { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_SETTINGS_QUERY, ABOUT_SEO_QUERY, HOME_SETTINGS_QUERY } from "@/sanity/queries/settings";
import type { AboutSettings, AboutValue, LocationSection } from "@/types/sanity";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
    const { data } = await sanityFetch({
        query: ABOUT_SEO_QUERY,
        stega: false,
    });

    return {
        title: data?.seo?.title || "About Us | Facial Surgery Center",
        description: data?.seo?.description || "Learn about The Facial Surgery Center's mission, values, and commitment to excellence in oral and maxillofacial surgery.",
    };
}

const defaultAboutSettings: AboutSettings = {
    seo: {
        title: "About Us | Facial Surgery Center",
        description:
            "Learn about The Facial Surgery Center's mission, values, and commitment to excellence in oral and maxillofacial surgery.",
    },
    hero: {
        title: "About The Facial Surgery Center",
        subtitle:
            "Dedicated to exceptional oral and maxillofacial care through expertise, compassion, and innovation.",
    },
    mission: {
        title: "Our Mission",
        description:
            "We deliver high-quality surgical care with a focus on trust, comfort, and long-term outcomes.",
    },
    whatWeDo: {
        title: "What We Do",
        paragraph1: "",
        paragraph2: "",
    },
    imageGallery: [],
    values: {
        title: "Our Values",
        intro: "",
        values: [],
        closing: "",
    },
    innovation: {
        title: "Innovation & Excellence",
        paragraph1: "",
        paragraph2: "",
    },
};

const defaultLocationSettings: LocationSection = {
    title: "Serving Connecticut",
    description: "Conveniently located in Trumbull, Connecticut.",
    image: {
        staticPath: "/images/connecticut2.png",
    },
};

export default async function Page() {
    const { data: aboutSettings } = await sanityFetch({ query: ABOUT_SETTINGS_QUERY });
    const { data: homeSettings } = await sanityFetch({ query: HOME_SETTINGS_QUERY });

    const settings: AboutSettings = {
        seo: {
            title: aboutSettings?.seo?.title || defaultAboutSettings.seo.title,
            description: aboutSettings?.seo?.description || defaultAboutSettings.seo.description,
        },
        hero: {
            title: aboutSettings?.hero?.title || defaultAboutSettings.hero.title,
            subtitle: aboutSettings?.hero?.subtitle || defaultAboutSettings.hero.subtitle,
        },
        mission: {
            title: aboutSettings?.mission?.title || defaultAboutSettings.mission.title,
            description:
                aboutSettings?.mission?.description || defaultAboutSettings.mission.description,
        },
        whatWeDo: {
            title: aboutSettings?.whatWeDo?.title || defaultAboutSettings.whatWeDo.title,
            paragraph1: aboutSettings?.whatWeDo?.paragraph1 || defaultAboutSettings.whatWeDo.paragraph1,
            paragraph2: aboutSettings?.whatWeDo?.paragraph2 || defaultAboutSettings.whatWeDo.paragraph2,
        },
        imageGallery: (aboutSettings?.imageGallery || []).filter(Boolean),
        values: {
            title: aboutSettings?.values?.title || defaultAboutSettings.values.title,
            intro: aboutSettings?.values?.intro || defaultAboutSettings.values.intro,
            values: (aboutSettings?.values?.values || []).map((value: Partial<AboutValue>, index: number) => ({
                _key: `value-${index}`,
                title: value?.title || "",
                description: value?.description || "",
            })),
            closing: aboutSettings?.values?.closing || defaultAboutSettings.values.closing,
        },
        innovation: {
            title: aboutSettings?.innovation?.title || defaultAboutSettings.innovation.title,
            paragraph1:
                aboutSettings?.innovation?.paragraph1 || defaultAboutSettings.innovation.paragraph1,
            paragraph2:
                aboutSettings?.innovation?.paragraph2 || defaultAboutSettings.innovation.paragraph2,
        },
    };

    const locationSettings: LocationSection = {
        title: homeSettings?.location?.title || defaultLocationSettings.title,
        description: homeSettings?.location?.description || defaultLocationSettings.description,
        image: homeSettings?.location?.image || defaultLocationSettings.image,
    };

    return (
        <AboutContent
            settings={settings}
            locationSettings={locationSettings}
        />
    );
}
