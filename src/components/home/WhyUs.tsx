"use client"
import HeaderText from "../ui/HeaderText"
import BodyText from "../ui/BodyText"
import { HandHelping } from "lucide-react"
import { UserRectangle, Stethoscope } from "@phosphor-icons/react";
import type { WhyUsPoint } from "@/types/sanity";

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Stethoscope: Stethoscope,
    HandHelping: HandHelping,
    UserRectangle: UserRectangle,
};

const colorMap: Record<string, string> = {
    Stethoscope: 'text-primaryYellow',
    HandHelping: 'text-primary-teal',
    UserRectangle: 'text-primaryOrange',
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
                    <div className="text-center w-3/4 mx-auto">
                        <div className="self-center">
                            <HeaderText variant="default" className="text-header-text font-serif font-normal">
                                {title}
                            </HeaderText>
                            <BodyText className="mt-8 text-body-text">
                                {description}
                            </BodyText>
                        </div>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                        {points.map((point, idx) => {
                            const IconComponent = iconMap[point.icon] || Stethoscope;
                            const iconColor = colorMap[point.icon] || 'text-primaryYellow';

                            return (
                                <div
                                    key={point.title + idx}
                                    className="flex flex-col items-center text-center"
                                >
                                    <div>
                                        <IconComponent className={`size-16 ${iconColor}`} />
                                    </div>
                                    <div className="mt-4">
                                        <BodyText as="h3" variant="default" className="font-serif text-gray-900">
                                            {point.title}
                                        </BodyText>
                                        <BodyText as="h4" variant="small" className="mt-2 text-body-text">
                                            {point.description}
                                        </BodyText>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
