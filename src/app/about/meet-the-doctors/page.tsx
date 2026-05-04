import DoctorsContent from '@/components/about/DoctorsContent'
import { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { DOCTORS_PAGE_QUERY } from "@/sanity/queries/settings"
import { ALL_DOCTORS_QUERY } from "@/sanity/queries/team"
import type { Doctor, DoctorsPageSettings } from '@/types/sanity'

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
    const { data } = await sanityFetch({
        query: DOCTORS_PAGE_QUERY,
        stega: false,
    });

    return {
        title: data?.seo?.title || "Meet Our Doctors | Facial Surgery Center",
        description: data?.seo?.description || "Meet our experienced oral and maxillofacial surgeons dedicated to providing exceptional patient care.",
    };
}

export default async function DoctorsPage() {
    const { data: pageSettings } = await sanityFetch({ query: DOCTORS_PAGE_QUERY });
    const { data: doctorsData } = await sanityFetch({ query: ALL_DOCTORS_QUERY });

    const settings: DoctorsPageSettings = {
        seo: {
            title: pageSettings?.seo?.title || "Meet Our Doctors | Facial Surgery Center",
            description:
                pageSettings?.seo?.description ||
                "Meet our experienced oral and maxillofacial surgeons dedicated to providing exceptional patient care.",
        },
        title: pageSettings?.title || "Meet Our Doctors",
        description:
            pageSettings?.description ||
            "Our team of experienced doctors is dedicated to providing you with the highest quality of care. With a focus on patient comfort and advanced techniques, we strive to make your dental experience as pleasant as possible.",
    };

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

    return <DoctorsContent settings={settings} doctors={doctors} />
}
