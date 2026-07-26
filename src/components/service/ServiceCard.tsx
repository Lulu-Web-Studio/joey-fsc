"use client";
import {ArrowRight} from "lucide-react";
import Image from "next/image";
import type {CSSProperties} from "react";
import HeaderText from "../ui/HeaderText";
import BodyText from "../ui/BodyText";
import {FadeInItem} from "../ui/FadeIn";

const PLACEHOLDER_SVG = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23fbe8d8"/><text x="200" y="150" text-anchor="middle" dy=".3em" font-family="Arial" font-size="16" fill="%23565656">Medical Service</text></svg>`;

interface ServiceCardProps {
  href: string;
  title: string;
  description: string;
  imageSrc: string;
  /** Fixed sizing for the horizontal slider on mobile; omit for grid layouts. */
  style?: CSSProperties;
}

/**
 * Shared between the homepage slider and the location pages so both surfaces
 * stay visually identical. Must sit inside a `FadeInStagger`.
 */
export default function ServiceCard({
  href,
  title,
  description,
  imageSrc,
  style,
}: ServiceCardProps) {
  return (
    <FadeInItem
      as="a"
      href={href}
      className="group bg-white snap-center shrink-0 rounded-3xl shadow-lg transition-all duration-300 flex flex-col overflow-hidden border border-slate-100 hover:border-primary-teal hover:-translate-y-2 hover:scale-[1.02] md:shrink md:w-auto"
      style={style}
    >
      <div className="relative h-64 overflow-hidden bg-bg">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Image
          src={imageSrc}
          alt={title}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = PLACEHOLDER_SVG;
          }}
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowRight className="w-4 h-4 text-primary-teal" />
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <HeaderText
            as="h3"
            variant="small"
            className="text-header-text mb-3 font-serif font-medium group-hover:text-primary-teal transition-colors duration-300"
          >
            {title}
          </HeaderText>
          <BodyText
            as="p"
            variant="small"
            className="text-body-text-light leading-relaxed line-clamp-4"
          >
            {description}
          </BodyText>
        </div>

        <div className="mt-4 pt-4 border-t border-misty-blue">
          <div className="flex items-center text-primary-teal font-medium text-sm group-hover:text-primaryCyan transition-colors duration-300">
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </FadeInItem>
  );
}
