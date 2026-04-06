import { defineQuery } from "next-sanity"

// All testimonials
export const ALL_TESTIMONIALS_QUERY = defineQuery(/* groq */ `
  *[_type == "testimonial"] | order(order asc, date desc) {
    _id,
    name,
    quote,
    rating,
    platform,
    date,
    featured,
    order
  }
`)

// Featured testimonials for home page
export const FEATURED_TESTIMONIALS_QUERY = defineQuery(/* groq */ `
  *[_type == "testimonial" && featured == true] | order(order asc, date desc) {
    _id,
    name,
    quote,
    rating,
    platform,
    date
  }
`)
