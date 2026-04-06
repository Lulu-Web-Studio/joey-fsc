import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const doctorsPageSettingsType = defineType({
  name: 'doctorsPageSettings',
  title: 'Doctors Page Settings',
  type: 'document',
  icon: UsersIcon,
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'content', title: 'Content', default: true },
  ],
  fields: [
    defineField({
      name: 'seo',
      type: 'object',
      title: 'SEO Settings',
      group: 'seo',
      fields: [
        { name: 'title', type: 'string', title: 'Meta Title' },
        { name: 'description', type: 'text', title: 'Meta Description' },
      ],
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      group: 'content',
      initialValue: 'Meet Our Doctors',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Page Description',
      group: 'content',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Doctors Page Settings' }
    },
  },
})
