import {MapPin} from "lucide-react";
import PillMarquee from "@/components/ui/PillMarquee";
import {areaHref, type Area} from "@/config/areas";

interface ServiceAreasListProps {
  serviceTitle: string;
  areas: Area[];
}

/** Reverse lookup off area->services data. Renders nothing if no area lists this service. */
export default function ServiceAreasList({
  serviceTitle,
  areas,
}: ServiceAreasListProps) {
  if (areas.length === 0) return null;

  return (
    <section
      aria-label={`Towns served for ${serviceTitle}`}
      className="container px-6 pb-16 pt-12 sm:px-8"
    >
      <p className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.18em] text-primary-teal">
        Available Throughout Fairfield County
      </p>
      <div className="mx-auto max-w-4xl">
        <PillMarquee
          ariaLabel={`Towns served for ${serviceTitle}`}
          icon={MapPin}
          items={areas.map((area) => ({
            key: area.slug,
            label: area.town,
            href: areaHref(area),
          }))}
        />
      </div>
    </section>
  );
}
