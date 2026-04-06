import { UsersIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const teamPageSettingsType = defineType({
  name: 'teamPageSettings',
  title: 'Team Page Settings',
  type: 'document',
  icon: UsersIcon,
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
      name: 'title',
      type: 'string',
      title: 'Page Title',
      group: 'content',
      initialValue: 'Meet Our Team',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Page Description',
      group: 'content',
    }),
    defineField({
      name: 'teamImage',
      title: 'Team Photo',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'sanityImage',
          type: 'image',
          title: 'Upload New Image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alternative text' }],
        },
        {
          name: 'staticPath',
          type: 'string',
          title: 'Or Use Existing Image',
          hidden: ({ parent }) => !!parent?.sanityImage,
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Team Page Settings' }
    },
  },
})
