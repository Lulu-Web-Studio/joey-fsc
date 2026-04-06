import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const aboutSettingsType = defineType({
  name: 'aboutSettings',
  title: 'About Page Settings',
  type: 'document',
  icon: UserIcon,
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
      name: 'mission',
      title: 'Mission Section',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title', description: 'e.g., "On a mission"' },
        { name: 'description', type: 'text', title: 'Mission Description' },
      ],
    }),
    defineField({
      name: 'whatWeDo',
      title: 'What We Do Section',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'paragraph1', type: 'text', title: 'First Paragraph' },
        { name: 'paragraph2', type: 'text', title: 'Second Paragraph' },
      ],
    }),
    defineField({
      name: 'imageGallery',
      title: 'Image Gallery',
      type: 'array',
      group: 'content',
      description: 'Gallery images (4 images recommended)',
      of: [
        {
          type: 'object',
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
              description: 'Path to existing image',
              hidden: ({ parent }) => !!parent?.sanityImage,
            },
          ],
        },
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'values',
      title: 'Our Values Section',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'intro', type: 'text', title: 'Introduction Text', description: 'e.g., "We live three core principles:"' },
        {
          name: 'values',
          type: 'array',
          title: 'Values',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', type: 'string', title: 'Value Title' },
                { name: 'description', type: 'text', title: 'Value Description' },
              ],
            },
          ],
          validation: (rule) => rule.max(3),
        },
        { name: 'closing', type: 'text', title: 'Closing Text' },
      ],
    }),
    defineField({
      name: 'innovation',
      title: 'Innovation & Excellence Section',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'paragraph1', type: 'text', title: 'First Paragraph' },
        { name: 'paragraph2', type: 'text', title: 'Second Paragraph' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page Settings',
      }
    },
  },
})
