import {
  CalendarCheck2,
  Handshake,
  HeartPulse,
  Route,
  type LucideIcon,
} from "lucide-react";
import HeaderText from "@/components/ui/HeaderText";
import BodyText from "@/components/ui/BodyText";
import {FadeIn} from "@/components/ui/FadeIn";
import type {Area} from "@/config/areas";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
};

export default function WhyChooseUs({area}: {area: Area}) {
  const featureDetails = [
    {
      title: `The route from ${area.town}`,
      icon: Route,
      iconClassName: "bg-primaryPink/40",
    },
    {
      title: "Care shaped to the case",
      icon: HeartPulse,
      iconClassName: "bg-primaryCyan/25",
    },
    {
      title: "Planning that respects your time",
      icon: CalendarCheck2,
      iconClassName: "bg-primaryYellow/25",
    },
  ] as const;

  const features: Feature[] = [
    ...area.localContext.map((description, index) => ({
      title: featureDetails[index]?.title || `Care for ${area.town} patients`,
      description,
      icon: featureDetails[index]?.icon || HeartPulse,
      iconClassName: featureDetails[index]?.iconClassName || "bg-primaryCyan/25",
    })),
    {
      title: "Your dentist stays involved",
      description: area.referralNote,
      icon: Handshake,
      iconClassName: "bg-accentLavender/25",
    },
  ];

  return (
    <section
      className="container px-6 py-20 sm:px-8 sm:py-24"
      aria-label={`Why ${area.town} patients choose us`}
    >
      <FadeIn className="rounded-[2rem] bg-bg2 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
        <HeaderText
          as="h2"
          className="max-w-4xl font-serif font-semibold text-header-text"
        >
          Why {area.town} patients choose us
        </HeaderText>

        <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:mt-12 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="border-t border-header-text/10 pt-7 first:border-t-0 first:pt-0 md:border-t-0 md:pt-0"
              >
                <div
                  className={`grid size-14 place-items-center rounded-2xl text-header-text ${feature.iconClassName}`}
                >
                  <Icon className="size-7" strokeWidth={1.8} aria-hidden="true" />
                </div>

                <h3 className="mt-5 font-serif text-2xl font-semibold leading-tight text-header-text">
                  {feature.title}
                </h3>

                <BodyText
                  as="p"
                  variant="small"
                  className="mt-4 leading-7 text-body-text-light"
                >
                  {feature.description}
                </BodyText>
              </article>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
