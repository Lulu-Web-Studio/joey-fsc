import React from "react";
import Image from "next/image";
import HeaderText from "@/components/ui/HeaderText";
import BodyText from "@/components/ui/BodyText";
import type {
    AboutMissionSection,
    AboutWhatWeDoSection,
    AboutValuesSection,
    AboutInnovationSection,
    HybridImage
} from "@/types/sanity";
import { getImageUrl } from "@/sanity/lib/image";

interface ContentProps {
    mission: AboutMissionSection;
    whatWeDo: AboutWhatWeDoSection;
    imageGallery: HybridImage[];
    values: AboutValuesSection;
    innovation: AboutInnovationSection;
}

export default function Content({ mission, whatWeDo, imageGallery, values, innovation }: ContentProps) {
    return (
        <div className="overflow-hidden pt-16 sm:pt-24">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">

                {/* ---------- Page Title & Intro ---------- */}
                <h1 className="sr-only">About The Facial Surgery Center</h1>
                <HeaderText
                    as="h2"
                    className="my-4 font-medium font-serif tracking-tight text-header-text"
                >
                    {mission.title}
                </HeaderText>

                <BodyText className="mt-6 text-xl/8 text-body-text">
                    {mission.description}
                </BodyText>

                {/* ---------- What We Do & Image Gallery ---------- */}
                <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
                    {/* --- Text Column --- */}
                    <div className="lg:pr-8">
                        <HeaderText
                            as="h3"
                            variant="small"
                            className="font-medium font-serif tracking-tight text-header-text"
                        >
                            {whatWeDo.title}
                        </HeaderText>

                        <BodyText className="mt-6 text-base/7 text-body-text">
                            {whatWeDo.paragraph1}
                        </BodyText>

                        <BodyText className="mt-8 text-base/7 text-body-text">
                            {whatWeDo.paragraph2}
                        </BodyText>
                    </div>

                    {/* --- Masonry Image Grid --- */}
                    <div className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto">
                        <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">

                            <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline outline-1 -outline-offset-1 outline-black/10">
                                <Image
                                    src={getImageUrl(imageGallery[0], "/images/about/grid/consult.webp")}
                                    alt="Surgeon consulting with a patient"
                                    width={560}
                                    height={560}
                                    className="size-full object-cover"
                                    priority
                                />
                            </div>

                            <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline outline-1 -outline-offset-1 outline-black/10 lg:-mt-40">
                                <Image
                                    src={getImageUrl(imageGallery[1], "/images/about/grid/suite.webp")}
                                    alt="State-of-the-art operating suite"
                                    width={560}
                                    height={560}
                                    className="size-full object-cover"
                                />
                            </div>

                            <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline outline-1 -outline-offset-1 outline-black/10">
                                <Image
                                    src={getImageUrl(imageGallery[2], "/images/about/grid/team.webp")}
                                    alt="Multidisciplinary surgical team"
                                    width={560}
                                    height={560}
                                    className="size-full object-cover"
                                />
                            </div>

                            <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline outline-1 -outline-offset-1 outline-black/10 lg:-mt-40">
                                <Image
                                    src={getImageUrl(imageGallery[3], "/images/about/grid/3d.webp")}
                                    alt="3-D imaging technology in use"
                                    width={560}
                                    height={560}
                                    className="size-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* --- Values Column --- */}
                    <div className="max-lg:mt-16">
                        <HeaderText
                            as="h3"
                            variant="small"
                            className="font-medium font-serif tracking-tight text-header-text"
                        >
                            {values.title}
                        </HeaderText>

                        <BodyText className="mt-6">
                            {values.intro}
                        </BodyText>

                        <ul className="mt-4 list-disc space-y-1 pl-6 text-base/7 text-body-text">
                            {values.values.map((value) => (
                                <li key={value._key || value.title}>
                                    <strong className="text-header-text">{value.title}&nbsp;—&nbsp;</strong>
                                    {value.description}
                                </li>
                            ))}
                        </ul>

                        <BodyText className="mt-8 text-base/7 text-body-text">
                            {values.closing}
                        </BodyText>
                    </div>
                </section>

                {/* ---------- Innovation & Excellence ---------- */}
                <div className="lg:pr-8 py-12">
                    <HeaderText
                        as="h3"
                        variant="small"
                        className="font-medium font-serif tracking-tight text-header-text"
                    >
                        {innovation.title}
                    </HeaderText>

                    <BodyText className="mt-6 text-base/7 text-body-text">
                        {innovation.paragraph1}
                    </BodyText>

                    <BodyText className="mt-8 text-base/7 text-body-text">
                        {innovation.paragraph2}
                    </BodyText>
                </div>

            </div>
        </div>
    );
}
