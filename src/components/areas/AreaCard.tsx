"use client";
import {ArrowRight} from "lucide-react";
import HeaderText from "@/components/ui/HeaderText";
import BodyText from "@/components/ui/BodyText";
import {FadeInItem} from "@/components/ui/FadeIn";
import {areaHref, type Area} from "@/config/areas";

interface AreaCardProps {
  area: Area;
  /** Defaults to the town page; service pages pass a combo URL when one exists. */
  href?: string;
  /** Defaults to "Oral Surgeon in {town}, CT". */
  title?: string;
  /** h2 on the hub page, h3 under a section heading. */
  headingAs?: "h2" | "h3";
}

/** Area card shared by the hub page and service pages. Must sit inside a FadeInStagger. */
export default function AreaCard({area, href, title, headingAs = "h2"}: AreaCardProps) {
  return (
    <FadeInItem
      as="a"
      href={href ?? areaHref(area)}
      className="group flex flex-col rounded-3xl border border-slate-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-primary-teal"
    >
      <HeaderText
        as={headingAs}
        variant="small"
        className="font-serif font-medium text-header-text transition-colors duration-300 group-hover:text-primary-teal"
      >
        {title ?? `Oral Surgeon in ${area.town}, CT`}
      </HeaderText>

      <BodyText
        as="p"
        variant="small"
        className="mt-3 flex-1 leading-relaxed text-body-text-light"
      >
        {area.summary}
      </BodyText>

      <span className="mt-6 flex items-center border-t border-misty-blue pt-4 text-sm font-medium text-primary-teal transition-colors duration-300 group-hover:text-primaryCyan">
        {area.town} details
        <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </FadeInItem>
  );
}
