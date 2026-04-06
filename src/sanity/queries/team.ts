import { defineQuery } from "next-sanity"
import { imageFragment } from "../fragments/image"

// All doctors
export const ALL_DOCTORS_QUERY = defineQuery(/* groq */ `
  *[_type == "doctor"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    title,
    credentials,
    photo {
      sanityImage {
        ${imageFragment}
      },
      staticPath
    },
    bio,
    order
  }
`)

// Single doctor
export const DOCTOR_QUERY = defineQuery(/* groq */ `
  *[_type == "doctor" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    title,
    credentials,
    photo {
      sanityImage {
        ${imageFragment}
      },
      staticPath
    },
    bio
  }
`)

// All team members
export const ALL_TEAM_MEMBERS_QUERY = defineQuery(/* groq */ `
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    photo {
      sanityImage {
        ${imageFragment}
      },
      staticPath
    },
    bio,
    email,
    phone,
    order
  }
`)

// Single team member
export const TEAM_MEMBER_QUERY = defineQuery(/* groq */ `
  *[_type == "teamMember" && _id == $id][0] {
    _id,
    name,
    role,
    photo {
      sanityImage {
        ${imageFragment}
      },
      staticPath
    },
    bio,
    email,
    phone
  }
`)
