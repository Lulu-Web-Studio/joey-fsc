import { defineField, defineType } from 'sanity'
import { CaseIcon } from '@sanity/icons'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'serviceTitle',
      title: 'Service Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'serviceTitle',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'Brief description for service cards and intro',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
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
          description: 'Path like /images/services/...',
          hidden: ({ parent }) => !!parent?.sanityImage,
        },
      ],
    }),
    defineField({
      name: 'paragraph1',
      title: 'First Content Section',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'text', type: 'text', title: 'Section Text' },
        {
          name: 'image',
          type: 'object',
          title: 'Section Image',
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
        },
      ],
    }),
    defineField({
      name: 'paragraph2',
      title: 'Second Content Section',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'text', type: 'text', title: 'Section Text' },
        {
          name: 'image',
          type: 'object',
          title: 'Section Image',
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
        },
      ],
    }),
    defineField({
      name: 'serviceTitle2',
      title: 'Secondary Service Title',
      type: 'string',
      description: 'Additional title/heading for the service page',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'text',
      description: 'Call-to-action text displayed on the service page',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'SEO Title',
          description: 'Meta title for search engines',
        },
        {
          name: 'description',
          type: 'text',
          title: 'SEO Description',
          description: 'Meta description for search engines',
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which services appear (lower numbers first)',
      initialValue: 0,
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'serviceTitle',
      subtitle: 'description',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'order',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
