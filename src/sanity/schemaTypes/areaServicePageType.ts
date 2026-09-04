import {PinIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

import {AREAS} from '@/config/areas'

const townOptions = AREAS.map((area) => ({title: area.town, value: area.slug}))

export const areaServicePageType = defineType({
  name: 'areaServicePage',
  title: 'Location Service Page',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'townSlug',
      title: 'Town',
      type: 'string',
      options: {list: townOptions},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{type: 'service'}],
      options: {
        filter: ({document}) => {
          const area = AREAS.find((entry) => entry.slug === document?.townSlug)
          const serviceSlugs = area?.services.map((entry) => entry.slug) || []

          return {
            filter: 'slug.current in $serviceSlugs',
            params: {serviceSlugs},
          }
        },
      },
      description: 'Only services listed for the selected town are available.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Page Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'primaryKeyword',
      title: 'Primary Keyword',
      type: 'string',
      description: 'Use one unique town + service keyword for this page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'localAngle',
      title: 'Localized Introduction',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'clinicalIntro',
      title: 'Clinical Introduction',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'paragraphs',
          title: 'Paragraphs',
          type: 'array',
          of: [defineArrayMember({type: 'text', rows: 5})],
          validation: (rule) => rule.required().min(2),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'evaluationReasons',
      title: 'Reasons to Request an Evaluation',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(3).max(6),
    }),
    defineField({
      name: 'visitSteps',
      title: 'What to Expect',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        }),
      ],
      validation: (rule) => rule.required().length(3),
    }),
    defineField({
      name: 'localLogistics',
      title: 'Local Logistics',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 5,
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'question', subtitle: 'answer'}},
        }),
      ],
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO Title',
          type: 'string',
          validation: (rule) => rule.required().max(65),
        }),
        defineField({
          name: 'description',
          title: 'SEO Description',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.required().max(165),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      townSlug: 'townSlug',
      serviceTitle: 'service.serviceTitle',
    },
    prepare({title, townSlug, serviceTitle}) {
      const town = AREAS.find((area) => area.slug === townSlug)?.town || townSlug
      return {
        title: title || serviceTitle || 'Untitled location service page',
        subtitle: town ? `${town} · ${serviceTitle || 'Choose a service'}` : serviceTitle,
      }
    },
  },
})
