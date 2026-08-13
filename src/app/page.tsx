import HomeContent from "@/components/home/HomeContent";
import {Metadata} from "next";
import {sanityFetch} from "@/sanity/lib/live";
import {HOME_SETTINGS_QUERY, HOME_SEO_QUERY} from "@/sanity/queries/settings";
import {ALL_SERVICES_QUERY} from "@/sanity/queries/services";
import {FEATURED_TESTIMONIALS_QUERY} from "@/sanity/queries/testimonials";
import {ALL_DOCTORS_QUERY} from "@/sanity/queries/team";
import type {Doctor, HomeSettings, Service, Testimonial, WhyUsPoint} from "@/types/sanity";
import {pageMetadata} from "@/lib/metadata";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const {data} = await sanityFetch({
    query: HOME_SEO_QUERY,
    stega: false, // Critical for SEO
  });

  return pageMetadata(
    data?.seo?.title || "Oral & Maxillofacial Surgeon Serving Trumbull & Fairfield County, CT",
    data?.seo?.description ||
      "Facial Surgery Center provides oral and maxillofacial surgery from its Trumbull office, serving patients throughout Fairfield County, CT.",
    "",
  );
}

const defaultHomeSettings: HomeSettings = {
  seo: {
    title: "Oral & Maxillofacial Surgeon Serving Trumbull & Fairfield County, CT",
    description:
      "Facial Surgery Center provides oral and maxillofacial surgery from its Trumbull office, serving patients throughout Fairfield County, CT.",
  },
  hero: {
    headline: "Love Your",
    highlight: "Healthy",
    subtitle:
      "Expert oral and maxillofacial care at our Trumbull office for patients throughout Fairfield County.",
    heroImage: {
      staticPath: "/images/smiling-woman.png",
    },
    ctaText: "Schedule an Appointment",
    ctaLink: "/contact",
  },
  whyUs: {
    title: "Why Choose Us",
    description:
      "Experienced surgeons, advanced technology, and patient-first care in one place.",
    points: [],
  },
  areasOfFocus: {
    title: "Areas of Focus",
    subtitle: "Explore the specialized treatments we provide.",
    image: {
      staticPath: "/images/areas-of-focus.png",
    },
  },
  services: {
    title: "Our Services",
    description: "Comprehensive oral and maxillofacial surgery services.",
  },
  location: {
    title: "Serving Trumbull and Fairfield County",
    description:
      "Our Trumbull office welcomes patients from across Fairfield County for personalized oral and maxillofacial surgery.",
    image: {
      staticPath: "/images/connecticut2.png",
    },
  },
  testimonials: {
    title: "What Patients Are Saying",
    description: "",
  },
};

export default async function Page() {
  const {data: settingsData} = await sanityFetch({query: HOME_SETTINGS_QUERY});
  const {data: servicesData} = await sanityFetch({query: ALL_SERVICES_QUERY});
  const {data: testimonialsData} = await sanityFetch({query: FEATURED_TESTIMONIALS_QUERY});
  const {data: doctorsData} = await sanityFetch({query: ALL_DOCTORS_QUERY});

  const settings: HomeSettings = {
    seo: {
      title: settingsData?.seo?.title || defaultHomeSettings.seo.title,
      description: settingsData?.seo?.description || defaultHomeSettings.seo.description,
    },
    hero: {
      headline: settingsData?.hero?.headline || defaultHomeSettings.hero.headline,
      highlight: settingsData?.hero?.highlight || defaultHomeSettings.hero.highlight,
      subtitle: settingsData?.hero?.subtitle || defaultHomeSettings.hero.subtitle,
      heroImage: settingsData?.hero?.heroImage || defaultHomeSettings.hero.heroImage,
      ctaText: settingsData?.hero?.ctaText || defaultHomeSettings.hero.ctaText,
      ctaLink: settingsData?.hero?.ctaLink || defaultHomeSettings.hero.ctaLink,
    },
    whyUs: {
      title: settingsData?.whyUs?.title || defaultHomeSettings.whyUs.title,
      description: settingsData?.whyUs?.description || defaultHomeSettings.whyUs.description,
      points: (settingsData?.whyUs?.points || []).map((point: Partial<WhyUsPoint>, index: number) => ({
        _key: `why-us-${index}`,
        title: point?.title || "",
        description: point?.description || "",
        icon: point?.icon || "",
      })),
    },
    areasOfFocus: {
      title: settingsData?.areasOfFocus?.title || defaultHomeSettings.areasOfFocus.title,
      subtitle: settingsData?.areasOfFocus?.subtitle || defaultHomeSettings.areasOfFocus.subtitle,
      image: settingsData?.areasOfFocus?.image || defaultHomeSettings.areasOfFocus.image,
    },
    services: {
      title: settingsData?.services?.title || defaultHomeSettings.services.title,
      description:
        settingsData?.services?.description || defaultHomeSettings.services.description,
    },
    location: {
      title: settingsData?.location?.title || defaultHomeSettings.location.title,
      description:
        settingsData?.location?.description || defaultHomeSettings.location.description,
      image: settingsData?.location?.image || defaultHomeSettings.location.image,
    },
    testimonials: {
      title: settingsData?.testimonials?.title || defaultHomeSettings.testimonials.title,
      description:
        settingsData?.testimonials?.description || defaultHomeSettings.testimonials.description,
    },
  };

  const services: Service[] = (servicesData || []).map((service: Partial<Service> & {_id: string}, index: number) => ({
    _id: service._id,
    serviceTitle: service.serviceTitle || "Service",
    slug: service.slug || `service-${index}`,
    description: service.description || "",
    coverImage: service.coverImage || {},
    order: service.order ?? index,
  }));

  const testimonials: Testimonial[] = (testimonialsData || []).map((testimonial: Partial<Testimonial> & {_id: string}, index: number) => ({
    _id: testimonial._id,
    name: testimonial.name || `Patient ${index + 1}`,
    quote: testimonial.quote || "",
    rating: testimonial.rating ?? 5,
    platform: testimonial.platform || undefined,
    date: testimonial.date || undefined,
  }));

  const doctors: Doctor[] = (doctorsData || []).map((
    doctor: NonNullable<NonNullable<typeof doctorsData>[number]>,
    index: number
  ) => ({
    _id: doctor._id,
    name: doctor.name || `Doctor ${index + 1}`,
    slug: doctor.slug || `doctor-${index}`,
    title: doctor.title || "",
    credentials: doctor.credentials || "",
    photo: doctor.photo || {},
    bio: doctor.bio || [],
    specialties: [],
    education: [],
    order: doctor.order ?? index,
  }));

  return <HomeContent settings={settings} services={services} testimonials={testimonials} doctors={doctors} />;
}
