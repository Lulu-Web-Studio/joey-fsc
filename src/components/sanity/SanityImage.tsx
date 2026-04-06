import Image from "next/image";
import {urlFor} from "@/sanity/lib/image";

interface SanityImageProps {
    value?: any;           // Sanity image object
    staticSrc?: string;    // Static path like "/images/hero.jpg"
    fallbackSrc?: string;  // Default image if nothing else provided
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
    alt?: string;
    fill?: boolean;
    sizes?: string;
}

export function SanityImage({
    value,
    staticSrc,
    fallbackSrc = "/images/placeholder.jpg",
    width = 800,
    height,
    className,
    priority,
    alt,
    fill,
    sizes,
}: SanityImageProps) {
    const imageHeight = height || Math.round(width / 1.5);

    // Priority 1: Use Sanity uploaded image if it exists
    if (value?.asset) {
        const altText = alt || value.alt || "";

        if (fill) {
            return (
                <Image
                    className={className}
                    src={urlFor(value).url()}
                    alt={altText}
                    fill
                    priority={priority}
                    placeholder={value.asset?.metadata?.lqip ? "blur" : "empty"}
                    blurDataURL={value.asset?.metadata?.lqip}
                    sizes={sizes}
                />
            );
        }

        return (
            <Image
                className={className}
                src={urlFor(value).width(width).height(imageHeight).url()}
                alt={altText}
                width={width}
                height={imageHeight}
                priority={priority}
                placeholder={value.asset?.metadata?.lqip ? "blur" : "empty"}
                blurDataURL={value.asset?.metadata?.lqip}
            />
        );
    }

    // Priority 2: Use static path
    // Priority 3: Fall back to default
    const imageSrc = staticSrc || fallbackSrc;
    const altText = alt || "";

    if (fill) {
        return (
            <Image
                className={className}
                src={imageSrc}
                alt={altText}
                fill
                priority={priority}
                sizes={sizes}
            />
        );
    }

    return (
        <Image
            className={className}
            src={imageSrc}
            alt={altText}
            width={width}
            height={imageHeight}
            priority={priority}
        />
    );
}
