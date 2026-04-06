import { defineQuery } from "next-sanity"
import { imageFragment } from "../fragments/image"

// All services for listing page
export const ALL_SERVICES_QUERY = defineQuery(/* groq */ `
  *[_type == "service"] | order(order asc) {
    _id,
    serviceTitle,
    "slug": slug.current,
    description,
    coverImage {
      sanityImage {
        ${imageFragment}
      },
      staticPath
    },
    order
  }
`)


// Single service page (full details)
export const SERVICE_QUERY = defineQuery(/* groq */ `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    serviceTitle,
    "slug": slug.current,
    description,
    coverImage {
      sanityImage {
        ${imageFragment}
      },
      staticPath
    },
    paragraph1 {
      title,
      text,
      image {
        sanityImage {
          ${imageFragment}
        },
        staticPath
      }
    },
    paragraph2 {
      title,
      text,
      image {
        sanityImage {
          ${imageFragment}
        },
        staticPath
      }
    },
    serviceTitle2,
    ctaText,
    seo {
      title,
      description
    }
  }
`)

// SEO-specific query for service page metadata
export const SERVICE_SEO_QUERY = defineQuery(/* groq */ `
  *[_type == "service" && slug.current == $slug][0] {
    serviceTitle,
    "slug": slug.current,
    description,
    seo {
      title,
      description
    }
  }
`)

// All service slugs for generateStaticParams()
export const ALL_SERVICE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "service"] {
    "slug": slug.current
  }
`)
