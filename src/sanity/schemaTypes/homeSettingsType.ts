import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const homeSettingsType = defineType({
  name: 'homeSettings',
  title: 'Home Page Settings',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'content', title: 'Content', default: true },
  ],
  fields: [
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Meta Title',
          description: 'SEO title for home page',
          validation: (rule) => rule.required().max(60),
        },
        {
          name: 'description',
          type: 'text',
          title: 'Meta Description',
          description: 'SEO description for home page',
          validation: (rule) => rule.required().max(160),
        },
      ],
    }),

    // Hero Section
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'headline', type: 'string', title: 'Main Headline', description: 'e.g., "Transform Your Confidence with a"' },
        { name: 'highlight', type: 'string', title: 'Highlighted Word', description: 'e.g., "New"' },
        { name: 'subtitle', type: 'text', title: 'Subtitle/Description' },
        {
          name: 'heroImage',
          type: 'object',
          title: 'Hero Image',
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
              description: 'Path to existing image (e.g., /images/smiling-woman.png)',
              hidden: ({ parent }) => !!parent?.sanityImage,
            },
          ],
        },
        { name: 'ctaText', type: 'string', title: 'CTA Button Text' },
        { name: 'ctaLink', type: 'string', title: 'CTA Button Link' },
      ],
    }),

    // Why Us Section
    defineField({
      name: 'whyUs',
      title: 'Why Us Section',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'description', type: 'text', title: 'Section Description' },
        {
          name: 'points',
          type: 'array',
          title: 'Key Points',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', type: 'string', title: 'Point Title' },
                { name: 'description', type: 'text', title: 'Point Description' },
                { name: 'icon', type: 'string', title: 'Icon Name', description: 'e.g., Stethoscope, HandHelping, UserRectangle' },
              ],
            },
          ],
        },
      ],
    }),

    // Areas of Focus Section
    defineField({
      name: 'areasOfFocus',
      title: 'Areas of Focus Section',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'subtitle', type: 'text', title: 'Section Subtitle' },
        {
          name: 'image',
          type: 'object',
          title: 'Areas of Focus Image',
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
              description: 'Path to existing image (e.g., /images/areas-of-focus.png)',
              hidden: ({ parent }) => !!parent?.sanityImage,
            },
          ],
        },
      ],
    }),

    // Services Section
    defineField({
      name: 'services',
      title: 'Services Section',
      type: 'object',
      group: 'content',
      description: 'Section intro only - actual services pulled from service documents',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'description', type: 'text', title: 'Section Description' },
      ],
    }),

    // Location Section
    defineField({
      name: 'location',
      title: 'Location Section',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'description', type: 'text', title: 'Section Description' },
        {
          name: 'image',
          type: 'object',
          title: 'Location Image',
          description: 'Image of Connecticut or location graphic',
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
              description: 'Path to existing image (e.g., /images/connecticut2.png)',
              hidden: ({ parent }) => !!parent?.sanityImage,
            },
          ],
        },
      ],
    }),

    // Testimonials Section
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      group: 'content',
      description: 'Section intro only - actual testimonials pulled from testimonial documents',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'description', type: 'text', title: 'Section Description' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page Settings',
      }
    },
  },
})
