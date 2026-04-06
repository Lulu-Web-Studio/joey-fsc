import { DocumentsIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const whatToExpectSettingsType = defineType({
  name: 'whatToExpectSettings',
  title: 'What To Expect Settings',
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
        defineField({
          name: 'title',
          type: 'string',
          title: 'Meta Title',
        }),
        defineField({
          name: 'description',
          type: 'text',
          title: 'Meta Description',
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      type: 'text',
      title: 'Introduction',
      group: 'content',
      rows: 4,
    }),
    defineField({
      name: 'steps',
      type: 'array',
      title: 'Steps',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Step Title',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'content',
              type: 'blockContent',
              title: 'Step Content',
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare({ title }) {
              return {
                title: title || 'Untitled step',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'What To Expect' }
    },
  },
})
