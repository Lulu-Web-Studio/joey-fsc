import { defineField, defineType } from 'sanity'
import { DocumentsIcon } from '@sanity/icons'

export const postOpSettingsType = defineType({
  name: 'postOpSettings',
  title: 'Post-Op Instructions',
  type: 'document',
  icon: DocumentsIcon,
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
    defineField({ name: 'title', type: 'string', title: 'Page Title', group: 'content' }),
    defineField({ name: 'introduction', type: 'text', title: 'Introduction', group: 'content' }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Instruction Sections',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'sectionTitle', type: 'string', title: 'Section Title' },
            { name: 'sectionIntro', type: 'text', title: 'Section Introduction (optional)' },
            {
              name: 'items',
              type: 'array',
              title: 'Instructions',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'title', type: 'string', title: 'Title' },
                    { name: 'content', type: 'text', title: 'Content' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Post-Op Instructions' }
    },
  },
})
