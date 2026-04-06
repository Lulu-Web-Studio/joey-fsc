import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role/Position',
      type: 'string',
      description: 'E.g., "Office Manager", "Patient Coordinator"',
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
      type: 'text',
      description: 'Brief bio about the team member',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which team members appear',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
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
