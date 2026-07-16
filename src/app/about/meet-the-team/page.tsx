import TeamContent from "@/components/about/TeamContent";
import { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { TEAM_PAGE_QUERY } from "@/sanity/queries/settings";
import { pageMetadata } from "@/lib/metadata";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
    const { data } = await sanityFetch({
        query: TEAM_PAGE_QUERY,
        stega: false,
    });

    return pageMetadata(
        data?.seo?.title || "Our Office Team | Facial Surgery Center | Trumbull",
        data?.seo?.description || "Meet the dedicated office staff at The Facial Surgery Center in Trumbull, CT who make every patient visit seamless.",
        "/about/meet-the-team",
    );
}

export default async function Page() {
    const { data: settings } = await sanityFetch({ query: TEAM_PAGE_QUERY });

    const teamPageSettings = settings || {
        title: "Meet Our Team",
        description: "Our dedicated office staff is the heart of the Facial Surgery Center. Coordinating care, guiding patients, and making every experience seamless. Their commitment, compassion, and attention to detail are what make it all possible.",
        teamImage: { staticPath: "/images/about/office.webp" },
        seo: {
            title: "Meet Our Team | Facial Surgery Center",
            description: "Meet the dedicated office staff at The Facial Surgery Center in Trumbull, CT who make every patient visit seamless."
        }
    };

    return (
        <TeamContent settings={teamPageSettings} />
    );
}
