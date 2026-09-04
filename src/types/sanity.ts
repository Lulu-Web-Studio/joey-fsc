// Sanity Image Types
export interface SanityImageAsset {
  _id: string;
  url?: string | null;
  metadata?: {
    lqip?: string | null;
    dimensions?: {
      width?: number | null;
      height?: number | null;
    } | null;
  } | null;
}

export interface SanityImage {
  asset?: SanityImageAsset | null;
  alt?: string | null;
  hotspot?: any;
  crop?: any;
}

export interface HybridImage {
  sanityImage?: SanityImage | null;
  staticPath?: string | null;
}

// Home Page Types
export interface WhyUsPoint {
  _key?: string;
  title: string;
  description: string;
  icon: string;
}

export interface HeroSection {
  headline: string;
  highlight: string;
  subtitle: string;
  heroImage: HybridImage;
  ctaText: string;
  ctaLink: string;
}

export interface WhyUsSection {
  title: string;
  description: string;
  points: WhyUsPoint[];
}

export interface AreasOfFocusSection {
  title: string;
  subtitle: string;
  image: HybridImage;
}

export interface ServicesSection {
  title: string;
  description: string;
}

export interface LocationSection {
  title: string;
  description: string;
  image: HybridImage;
}

export interface TestimonialsSection {
  title: string;
  description: string;
}

export interface HomeSettings {
  seo: {
    title: string;
    description: string;
  };
  hero: HeroSection;
  whyUs: WhyUsSection;
  areasOfFocus: AreasOfFocusSection;
  services: ServicesSection;
  location: LocationSection;
  testimonials: TestimonialsSection;
}

// Service Types
export interface Service {
  _id: string;
  serviceTitle: string;
  slug: string;
  description: string;
  coverImage: HybridImage;
  featured?: boolean;
  order?: number;
}

export interface AreaServicePage {
  _id: string;
  _updatedAt?: string;
  townSlug: string;
  serviceSlug: string;
  heading: string;
  primaryKeyword: string;
  localAngle: string;
  clinicalIntro: {
    title: string;
    paragraphs: string[];
  };
  evaluationReasons: string[];
  visitSteps: {
    _key?: string;
    title: string;
    description: string;
  }[];
  localLogistics: {
    title: string;
    description: string;
  };
  faqs: {
    _key?: string;
    question: string;
    answer: string;
  }[];
  seo: {
    title: string;
    description: string;
  };
}

// Testimonial Types
export interface Testimonial {
  _id: string;
  name: string;
  quote: string;
  rating: number;
  platform?: string;
  date?: string;
}

// About Page Types
export interface AboutHeroSection {
  title: string;
  subtitle: string;
}

export interface AboutMissionSection {
  title: string;
  description: string;
}

export interface AboutWhatWeDoSection {
  title: string;
  paragraph1: string;
  paragraph2: string;
}

export interface AboutValue {
  _key?: string;
  title: string;
  description: string;
}

export interface AboutValuesSection {
  title: string;
  intro: string;
  values: AboutValue[];
  closing: string;
}

export interface AboutInnovationSection {
  title: string;
  paragraph1: string;
  paragraph2: string;
}

export interface AboutSettings {
  seo: {
    title: string;
    description: string;
  };
  hero: AboutHeroSection;
  mission: AboutMissionSection;
  whatWeDo: AboutWhatWeDoSection;
  imageGallery: HybridImage[];
  values: AboutValuesSection;
  innovation: AboutInnovationSection;
}

// Doctors Page Types
export interface DoctorsPageSettings {
  seo: {
    title: string;
    description: string;
  };
  title: string;
  description: string;
}

export interface Doctor {
  _id: string;
  name: string;
  slug: string;
  title: string;
  credentials: string;
  photo: HybridImage;
  bio: any[]; // blockContent
  specialties: string[];
  education: {
    _key?: string;
    degree: string;
    school: string;
    year?: string;
  }[];
  order: number;
}

// Team Page Types
export interface TeamPageSettings {
  seo: {
    title: string;
    description: string;
  };
  title: string;
  description: string;
  teamImage: HybridImage;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  photo: HybridImage;
  bio?: string;
  email?: string;
  phone?: string;
  order: number;
}
