import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const doctorType = defineType({
  name: 'doctor',
  title: 'Doctor',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      description: 'E.g., "Oral & Maxillofacial Surgeon"',
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'string',
      description: 'E.g., "MD, DDS, FACS"',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'object',
      fields: [
        {
          name: 'sanityImage',
          type: 'image',
          title: 'Upload New Photo',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alternative text' }],
        },
        {
          name: 'staticPath',
          type: 'string',
          title: 'Or Use Existing Photo',
          hidden: ({ parent }) => !!parent?.sanityImage,
        },
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'blockContent',
      description: 'Complete biography with education, training, interests, etc.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which doctors appear',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'photo.sanityImage',
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
