import {defineQuery} from 'next-sanity'

const areaServicePageProjection = /* groq */ `
  _id,
  _updatedAt,
  townSlug,
  "serviceSlug": service->slug.current,
  heading,
  primaryKeyword,
  localAngle,
  clinicalIntro {
    title,
    paragraphs
  },
  evaluationReasons,
  visitSteps[] {
    _key,
    title,
    description
  },
  localLogistics {
    title,
    description
  },
  faqs[] {
    _key,
    question,
    answer
  },
  seo {
    title,
    description
  }
`

export const AREA_SERVICE_PAGE_QUERY = defineQuery(/* groq */ `
  *[
    _type == "areaServicePage" &&
    townSlug == $townSlug &&
    service->slug.current == $serviceSlug
  ][0] {
    ${areaServicePageProjection}
  }
`)

export const ALL_AREA_SERVICE_ROUTES_QUERY = defineQuery(/* groq */ `
  *[_type == "areaServicePage" && defined(townSlug) && defined(service->slug.current)] {
    _id,
    _updatedAt,
    townSlug,
    "serviceSlug": service->slug.current
  }
`)

export const AREA_SERVICE_SLUGS_FOR_TOWN_QUERY = defineQuery(/* groq */ `
  *[_type == "areaServicePage" && townSlug == $townSlug] {
    "serviceSlug": service->slug.current
  }
`)
