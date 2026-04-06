import { defineQuery } from "next-sanity"
import { imageFragment } from "../fragments/image"

// Site Settings
export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  coalesce(
    *[_id == "siteSettings"][0],
    *[_type == "siteSettings"] | order(_updatedAt desc)[0]
  ) {
    siteName,
    siteDescription,
    contact,
    businessHours,
    socialLinks
  }
`)

// Home Page
export const HOME_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "homeSettings" && _id == "homeSettings"][0] {
    seo {
      title,
      description
    },
    hero {
      headline,
      highlight,
      subtitle,
      heroImage {
        sanityImage {
          ${imageFragment}
        },
        staticPath
      },
      ctaText,
      ctaLink
    },
    whyUs {
      title,
      description,
      points[] {
        title,
        description,
        icon
      }
    },
    areasOfFocus {
      title,
      subtitle,
      image {
        sanityImage {
          ${imageFragment}
        },
        staticPath
      }
    },
    services {
      title,
      description
    },
    location {
      title,
      description,
      image {
        sanityImage {
          ${imageFragment}
        },
        staticPath
      }
    },
    testimonials {
      title,
      description
    }
  }
`)

export const HOME_SEO_QUERY = defineQuery(/* groq */ `
  *[_type == "homeSettings" && _id == "homeSettings"][0] {
    seo {
      title,
      description
    }
  }
`)

// About Page
export const ABOUT_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "aboutSettings" && _id == "aboutSettings"][0] {
    seo {
      title,
      description
    },
    hero {
      title,
      subtitle
    },
    mission {
      title,
      description
    },
    whatWeDo {
      title,
      paragraph1,
      paragraph2
    },
    imageGallery[] {
      sanityImage {
        ${imageFragment}
      },
      staticPath
    },
    values {
      title,
      intro,
      values[] {
        title,
        description
      },
      closing
    },
    innovation {
      title,
      paragraph1,
      paragraph2
    }
  }
`)

export const ABOUT_SEO_QUERY = defineQuery(/* groq */ `
  *[_type == "aboutSettings" && _id == "aboutSettings"][0] {
    seo {
      title,
      description
    }
  }
`)

// Doctors Page
export const DOCTORS_PAGE_QUERY = defineQuery(/* groq */ `
  coalesce(
    *[_id == "doctorsPageSettings"][0],
    *[_type == "doctorsPageSettings"] | order(_updatedAt desc)[0]
  ) {
    seo { title, description },
    title,
    description
  }
`)

// Team Page
export const TEAM_PAGE_QUERY = defineQuery(/* groq */ `
  coalesce(
    *[_id == "teamPageSettings"][0],
    *[_type == "teamPageSettings"] | order(_updatedAt desc)[0]
  ) {
    seo {
      title,
      description
    },
    title,
    description,
    teamImage {
      sanityImage {
        ${imageFragment}
      },
      staticPath
    }
  }
`)

// Services Page
export const SERVICES_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "servicesSettings"][0] {
    seo {
      title,
      description
    },
    hero {
      title,
      subtitle
    },
    introduction
  }
`)

export const SERVICES_SEO_QUERY = defineQuery(/* groq */ `
  *[_type == "servicesSettings"][0] {
    seo {
      title,
      description
    }
  }
`)

// Contact Page
export const CONTACT_SETTINGS_QUERY = defineQuery(/* groq */ `
  coalesce(
    *[_id == "contactSettings"][0],
    *[_type == "contactSettings"] | order(_updatedAt desc)[0]
  ) {
    seo {
      title,
      description
    },
    hero {
      title,
      intro1,
      intro2
    },
    address {
      street,
      city,
      state,
      zip,
      googleMapsUrl,
      googleMapsEmbed
    },
    businessHours[] {
      days,
      hours
    }
  }
`)

export const CONTACT_SEO_QUERY = defineQuery(/* groq */ `
  coalesce(
    *[_id == "contactSettings"][0],
    *[_type == "contactSettings"] | order(_updatedAt desc)[0]
  ) {
    seo {
      title,
      description
    }
  }
`)

// Pre-Op Instructions
export const PRE_OP_QUERY = defineQuery(/* groq */ `
  coalesce(
    *[_id == "preOpSettings"][0],
    *[_type == "preOpSettings"] | order(_updatedAt desc)[0]
  ) {
    seo { title, description },
    title,
    introduction,
    sections[] {
      sectionTitle,
      sectionIntro,
      items[] { title, content }
    }
  }
`)

export const PRE_OP_SEO_QUERY = defineQuery(/* groq */ `
  coalesce(
    *[_id == "preOpSettings"][0],
    *[_type == "preOpSettings"] | order(_updatedAt desc)[0]
  ) { seo { title, description } }
`)

// Post-Op Instructions
export const POST_OP_QUERY = defineQuery(/* groq */ `
  coalesce(
    *[_id == "postOpSettings"][0],
    *[_type == "postOpSettings"] | order(_updatedAt desc)[0]
  ) {
    seo { title, description },
    title,
    introduction,
    sections[] {
      sectionTitle,
      sectionIntro,
      items[] { title, content }
    }
  }
`)

export const POST_OP_SEO_QUERY = defineQuery(/* groq */ `
  coalesce(
    *[_id == "postOpSettings"][0],
    *[_type == "postOpSettings"] | order(_updatedAt desc)[0]
  ) { seo { title, description } }
`)

// What To Expect
export const WHAT_TO_EXPECT_QUERY = defineQuery(/* groq */ `
  coalesce(
    *[_id == "whatToExpectSettings"][0],
    *[_type == "whatToExpectSettings"] | order(_updatedAt desc)[0]
  ) {
    seo { title, description },
    title,
    introduction,
    steps[] {
      title,
      content
    }
  }
`)

export const WHAT_TO_EXPECT_SEO_QUERY = defineQuery(/* groq */ `
  coalesce(
    *[_id == "whatToExpectSettings"][0],
    *[_type == "whatToExpectSettings"] | order(_updatedAt desc)[0]
  ) { seo { title, description } }
`)
