export const SERVICES = {
  'dental-implants': {
    name: 'Dental Implants',
    img: '/images/services/implant/implants.webp',
    description: 'Dental implants are a permanent solution for missing teeth, offering natural-looking results and long-term stability.',
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
    name: 'Teeth in a Day (All-On-X) Implants',
    img: '/images/services/all-in-x/all-in-x.webp',
    description: 'Teeth in a Day (All-On-X) Implants provide a full set of functional, natural-looking teeth in a single appointment.',
  },
} as const;

// Auto-generate TypeScript types
export type ServiceSlug = keyof typeof SERVICES;

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
