import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Site Settings
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),

      S.divider(),

      // Page Settings
      S.listItem()
        .title('Home Page Settings')
        .child(
          S.document()
            .schemaType('homeSettings')
            .documentId('homeSettings')
        ),
      S.listItem()
        .title('About Page Settings')
        .child(
          S.document()
            .schemaType('aboutSettings')
            .documentId('aboutSettings')
        ),
      S.listItem()
        .title('Contact Page Settings')
        .child(
          S.document()
            .schemaType('contactSettings')
            .documentId('contactSettings')
        ),
      S.listItem()
        .title('Pre-Op Settings')
        .child(
          S.document()
            .schemaType('preOpSettings')
            .documentId('preOpSettings')
        ),
      S.listItem()
        .title('Post-Op Settings')
        .child(
          S.document()
            .schemaType('postOpSettings')
            .documentId('postOpSettings')
        ),
      S.listItem()
        .title('What To Expect Settings')
        .child(
          S.document()
            .schemaType('whatToExpectSettings')
            .documentId('whatToExpectSettings')
        ),
      S.listItem()
        .title('Doctors Page Settings')
        .child(
          S.document()
            .schemaType('doctorsPageSettings')
            .documentId('doctorsPageSettings')
        ),
      S.listItem()
        .title('Team Page Settings')
        .child(
          S.document()
            .schemaType('teamPageSettings')
            .documentId('teamPageSettings')
        ),

      S.divider(),

      // Content Collections
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('areaServicePage').title('Location Service Pages'),
      S.documentTypeListItem('doctor').title('Doctors'),

      S.divider(),

      // Auto-list remaining types
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            'siteSettings',
            'homeSettings',
            'aboutSettings',
            'servicesSettings',
            'contactSettings',
            'preOpSettings',
            'postOpSettings',
            'whatToExpectSettings',
            'doctorsPageSettings',
            'teamPageSettings',
            'service',
            'areaServicePage',
            'teamMember',
            'doctor',
            'testimonial',
          ].includes(item.getId()!)
      ),
    ])
