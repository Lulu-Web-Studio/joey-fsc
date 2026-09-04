import { type SchemaTypeDefinition } from 'sanity'

// Settings schemas
import { siteSettingsType } from './siteSettingsType'
import { homeSettingsType } from './homeSettingsType'
import { aboutSettingsType } from './aboutSettingsType'
import { servicesSettingsType } from './servicesSettingsType'
import { contactSettingsType } from './contactSettingsType'
import { preOpSettingsType } from './preOpSettingsType'
import { postOpSettingsType } from './postOpSettingsType'
import { whatToExpectSettingsType } from './whatToExpectSettingsType'
import { doctorsPageSettingsType } from './doctorsPageSettingsType'
import { teamPageSettingsType } from './teamPageSettingsType'

// Content schemas
import { serviceType } from './serviceType'
import { teamMemberType } from './teamMemberType'
import { doctorType } from './doctorType'
import { testimonialType } from './testimonialType'
import { areaServicePageType } from './areaServicePageType'

// Reusable types
import { blockContentType } from './blockContentType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Reusable types
    blockContentType,

    // Settings
    siteSettingsType,
    homeSettingsType,
    aboutSettingsType,
    servicesSettingsType,
    contactSettingsType,
    preOpSettingsType,
    postOpSettingsType,
    whatToExpectSettingsType,
    doctorsPageSettingsType,
    teamPageSettingsType,

    // Content
    serviceType,
    areaServicePageType,
    teamMemberType,
    doctorType,
    testimonialType,
  ],
}
