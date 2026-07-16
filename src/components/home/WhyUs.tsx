"use client"
import HeaderText from "../ui/HeaderText"
import BodyText from "../ui/BodyText"
import { HandHelping } from "lucide-react"
import { UserRectangle, Stethoscope } from "@phosphor-icons/react";
import { FadeIn, FadeInStagger, FadeInItem } from "../ui/FadeIn";
import type { WhyUsPoint } from "@/types/sanity";

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Stethoscope: Stethoscope,
    HandHelping: HandHelping,
    UserRectangle: UserRectangle,
};

const colorMap: Record<string, { text: string; bg: string }> = {
    Stethoscope: { text: 'text-primaryYellow', bg: 'bg-primaryYellow/15' },
    HandHelping: { text: 'text-primary-teal', bg: 'bg-primary-teal/10' },
    UserRectangle: { text: 'text-primaryOrange', bg: 'bg-primaryOrange/15' },
};

interface WhyUsProps {
    title: string;
    description: string;
    points: WhyUsPoint[];
}

export default function WhyUs({ title, description, points }: WhyUsProps) {
    return (
        <div className="py-16 bg-bg2">
            <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
                <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
                    <FadeIn className="text-center w-3/4 mx-auto">
                        <div className="self-center">
                            <HeaderText variant="default" className="text-header-text font-serif font-normal">
                                {title}
                            </HeaderText>
                            <BodyText className="mt-8 text-body-text">
                                {description}
                            </BodyText>
                        </div>
                    </FadeIn>

                    <FadeInStagger className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {points.map((point, idx) => {
                            const IconComponent = iconMap[point.icon] || Stethoscope;
                            const { text: iconColor, bg: iconBg } = colorMap[point.icon] || colorMap.Stethoscope;

                            return (
                                <FadeInItem
                                    key={point.title + idx}
                                    className="flex flex-col items-start text-left bg-background rounded-2xl border border-black/5 shadow-sm p-8"
                                >
                                    <div className={`flex items-center justify-center size-16 rounded-full ${iconBg}`}>
                                        <IconComponent className={`size-8 ${iconColor}`} />
                                    </div>
                                    <div className="mt-6">
                                        <BodyText as="h3" variant="default" className="font-serif text-gray-900">
                                            {point.title}
                                        </BodyText>
                                        <BodyText as="h4" variant="small" className="mt-2 text-body-text">
                                            {point.description}
                                        </BodyText>
                                    </div>
                                </FadeInItem>
                            );
                        })}
                    </FadeInStagger>
                </div>
            </div>
        </div>
    )
}
