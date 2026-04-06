import { defineField, defineType } from 'sanity'
import { CaseIcon } from '@sanity/icons'

export const servicesSettingsType = defineType({
  name: 'servicesSettings',
  title: 'Services Page Settings',
  type: 'document',
  icon: CaseIcon,
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
        { name: 'title', type: 'string', title: 'Hero Title' },
        { name: 'subtitle', type: 'text', title: 'Hero Subtitle' },
      ],
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      group: 'content',
      description: 'Brief introduction to your services',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Services Page Settings',
      }
    },
  },
})
