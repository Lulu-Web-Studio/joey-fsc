import { defineField, defineType } from 'sanity'
import { CommentIcon } from '@sanity/icons'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating out of 5',
      validation: (rule) => rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'platform',
      title: 'Review Platform',
      type: 'string',
      description: 'e.g., Google, Yelp, Facebook',
    }),
    defineField({
      name: 'date',
      title: 'Review Date',
      type: 'date',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'quote',
      rating: 'rating',
    },
    prepare({ title, subtitle, rating }) {
      return {
        title,
        subtitle: subtitle ? `${subtitle.substring(0, 60)}... (${rating}★)` : '',
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Date, Newest',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
})
