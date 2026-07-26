import {Metadata} from "next";
import {config} from "@/config";

/**
 * Next replaces `openGraph` and `twitter` wholesale rather than merging them
 * with the root layout's, so anything omitted here is dropped from the page —
 * including the file-based opengraph-image and the large-image card type.
 * Both have to be restated on every call.
 */
const OG_IMAGE = "/opengraph-image.png";
const SITE_NAME = "Facial Surgery Center";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${config.baseUrl}${path}`;

  return {
    title,
    description,
    alternates: {canonical: url},
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [{url: OG_IMAGE, width: 1080, height: 1080, alt: SITE_NAME}],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
