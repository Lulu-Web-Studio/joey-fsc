import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const contactSettingsType = defineType({
  name: 'contactSettings',
  title: 'Contact Page Settings',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'content', title: 'Content', default: true },
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'title', type: 'string', title: 'Meta Title' },
        { name: 'description', type: 'text', title: 'Meta Description' },
      ],
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'title', type: 'string', title: 'Page Title' },
        { name: 'intro1', type: 'text', title: 'Introduction Paragraph 1' },
        { name: 'intro2', type: 'text', title: 'Introduction Paragraph 2' },
      ],
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'street', type: 'string', title: 'Street Address' },
        { name: 'city', type: 'string', title: 'City' },
        { name: 'state', type: 'string', title: 'State' },
        { name: 'zip', type: 'string', title: 'ZIP Code' },
        { name: 'googleMapsUrl', type: 'url', title: 'Google Maps Link' },
        { name: 'googleMapsEmbed', type: 'url', title: 'Google Maps Embed URL' },
      ],
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'days', type: 'string', title: 'Days (e.g., "Monday - Friday")' },
            { name: 'hours', type: 'string', title: 'Hours (e.g., "8:00 AM - 5:00 PM")' },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Page Settings',
      }
    },
  },
})
