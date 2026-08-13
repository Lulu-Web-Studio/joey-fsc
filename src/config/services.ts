export const SERVICES = {
  'dental-implants': {
    name: 'Dental Implants',
    img: '/images/services/implant/implants.webp',
    description: 'Dental implants are a long-term option for replacing missing teeth, with treatment planned for natural-looking function and stability.',
  },
  'tooth-extractions': {
    name: 'Tooth Extractions',
    img: '/images/services/tooth-extract/tooth-extract.webp',
    description: 'We perform gentle, precise tooth extractions when teeth are damaged, decayed, or causing crowding.',
  },
  'wisdom-teeth-removal': {
    name: 'Wisdom Teeth',
    img: '/images/services/wisdom/wisdom-tooth.webp',
    description: 'Wisdom tooth removal prevents crowding, pain, and infections by safely extracting third molars.',
  },
  'anesthesia': {
    name: 'Anesthesia',
    img: '/images/services/anesthesia/anesthesia.webp',
    description: 'We offer safe and effective anesthesia options to ensure a comfortable surgical experience with minimal discomfort or anxiety.',
  },
  'dental-bone-grafting': {
    name: 'Bone Grafting',
    img: '/images/services/bone-graft/bone-graft.webp',
    description: 'Bone grafting restores bone structure in the jaw, often as preparation for dental implants or following trauma or disease.',
  },
  'botox-and-filler': {
    name: 'Botox',
    img: '/images/services/botox/botox.webp',
    description: 'Botox and dermal fillers help smooth fine lines, reduce wrinkles, and restore youthful volume to facial features.',
  },
  'facial-trauma': {
    name: 'Facial Trauma',
    img: '/images/services/facial-trauma/facial-trauma.webp',
    description: 'We specialize in treating facial injuries, including fractures and lacerations, with precision and compassion.',
  },
  'genioplasty': {
    name: 'Genioplasty / Chin Surgery',
    img: '/images/services/genioplasty/genioplasty.webp',
    description: 'Genioplasty enhances the chin\'s shape and projection to create facial balance and improve appearance or function.',
  },
  'oral-pathology': {
    name: 'Oral Pathology',
    img: '/images/services/oral-pathology/oral-pathology.webp',
    description: 'We diagnose and treat oral diseases and abnormalities, including cysts, tumors, and lesions of the mouth and jaw.',
  },
  'orthognathic-surgery': {
    name: 'Orthognathic Surgery',
    img: '/images/services/orthognathic/orthognathic.webp',
    description: 'Orthognathic (jaw) surgery corrects misaligned jaws to improve function, facial symmetry, and breathing.',
  },
  'sleep-apnea': {
    name: 'Sleep Apnea',
    img: '/images/services/sleep-apnea/sleep-apnea.webp',
    description: 'We offer surgical solutions for obstructive sleep apnea to improve airflow, reduce snoring, and enhance sleep quality.',
  },
  'tmj-disorder': {
    name: 'TMJ',
    img: '/images/services/tmj/tmj.webp',
    description: 'TMJ treatment relieves jaw pain, stiffness, and clicking caused by temporomandibular joint disorders.',
  },
  'minimally-invasive-orthognathic-surgery': {
    name: 'Minimally Invasive Orthognathic Surgery',
    img: '/images/services/mi/mi.webp',
    description: 'Minimally Invasive Orthognathic Surgery offers jaw correction with smaller incisions, reduced recovery time, and less discomfort.',
  },
  'teeth-in-a-day': {
    name: 'All-on-X Dental Implants',
    img: '/images/services/all-in-x/all-in-x.webp',
    description: 'All-on-X dental implants support a fixed full-arch restoration for people with many missing or failing teeth.',
  },
} as const;

// Auto-generate TypeScript types
export type ServiceSlug = keyof typeof SERVICES;

type ServicePageOverride = {
  title: string;
  description: string;
  sectionTitle: string;
  metaTitle: string;
  metaDescription: string;
  faqs: {
    question: string;
    answer: string;
  }[];
};

const SERVICE_PAGE_OVERRIDES: Partial<Record<ServiceSlug, ServicePageOverride>> = {
  'teeth-in-a-day': {
    title: SERVICES['teeth-in-a-day'].name,
    description:
      'All-on-X dental implants use a planned number of implants to support a fixed full-arch restoration for people with many missing or failing teeth. All-on-4 is one approach within this broader treatment category.',
    sectionTitle: 'How All-on-X Dental Implants Work',
    metaTitle: 'All-on-X Dental Implants | Facial Surgery Center',
    metaDescription:
      'Explore All-on-X dental implants in Trumbull, CT, including how fixed full-arch treatment and All-on-4 planning can replace many missing or failing teeth.',
    faqs: [
      {
        question: 'Are All-on-4 dental implants the same as All-on-X?',
        answer:
          'All-on-4 is a specific full-arch approach that uses four implants. All-on-X is the broader term for a fixed full-arch restoration supported by the number of implants your anatomy and treatment plan require. Your surgeon determines the appropriate number and position after reviewing your examination and imaging.',
      },
    ],
  },
};

export function getServicePageOverride(slug: string): ServicePageOverride | undefined {
  return SERVICE_PAGE_OVERRIDES[slug as ServiceSlug];
}

// Convert to array for easy iteration in components
// Auto-generate path from slug - SINGLE SOURCE OF TRUTH!
export const servicesArray = Object.entries(SERVICES).map(([slug, data]) => ({
  slug: slug as ServiceSlug,
  href: `/service/${slug}`, // ✅ Path is auto-generated from slug - can't mismatch!
  ...data,
}));

// Backward compatibility: generate href map if needed elsewhere
export const serviceHrefMap = Object.fromEntries(
  Object.entries(SERVICES).map(([slug]) => [slug, `/service/${slug}`])
) as Record<ServiceSlug, string>;
