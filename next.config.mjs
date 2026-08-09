/** @type {import('next').NextConfig} */
const legacyPageRedirects = [
  { section: "2", page: "HIPAA", destination: "/contact" },
  { section: "2", page: "cancel", destination: "/contact" },
  { section: "2", page: "contact", destination: "/contact" },
  {
    section: "2",
    page: "financial",
    destination: "/for-patients/what-to-expect",
  },
  { section: "2", page: "sched", destination: "/contact" },
  {
    section: "2",
    page: "visit",
    destination: "/for-patients/what-to-expect",
  },
  { section: "2", page: "welcome", destination: "/about" },
  { section: "3", page: "anesth", destination: "/service/anesthesia" },
  {
    section: "3",
    page: "graft",
    destination: "/service/dental-bone-grafting",
  },
  {
    section: "3",
    page: "implants",
    destination: "/service/dental-implants",
  },
  {
    section: "3",
    page: "jaw",
    destination: "/service/orthognathic-surgery",
  },
  {
    section: "3",
    page: "oralpath",
    destination: "/service/oral-pathology",
  },
  {
    section: "3",
    page: "surgery",
    destination: "/service/tooth-extractions",
  },
  { section: "3", page: "trauma", destination: "/service/facial-trauma" },
  {
    section: "3",
    page: "wisdom",
    destination: "/service/wisdom-teeth-removal",
  },
  {
    section: "4",
    page: "anesth-pre-op",
    destination: "/for-patients/pre-op",
  },
  {
    section: "4",
    page: "foodlist",
    destination: "/blog/what-to-eat-after-tooth-extraction",
  },
  { section: "4", page: "post-op", destination: "/for-patients/post-op" },
  { section: "4", page: "pre-op", destination: "/for-patients/pre-op" },
  { section: "4", page: "referral", destination: "/referral-form.pdf" },
  {
    section: "4",
    page: "register",
    destination: "/for-patients/what-to-expect",
  },
  {
    section: "5",
    page: "adminstaff",
    destination: "/about/meet-the-team",
  },
  {
    section: "5",
    page: "surgstaff",
    destination: "/about/meet-the-doctors",
  },
  { section: "6", page: "referring", destination: "/referral-form.pdf" },
];

const legacyBaseRedirect = ({ section, page, destination }) => ({
  source: "/base.php",
  has: [
    { type: "query", key: "t", value: section },
    { type: "query", key: "id", value: page },
  ],
  destination,
  permanent: true,
});

const legacyContentRedirect = ({ page, destination }) => ({
  source: "/content.php",
  has: [{ type: "query", key: "id", value: page }],
  destination,
  permanent: true,
});

const legacyPathRedirects = [
  { source: "/contact/4040479", destination: "/contact", permanent: true },
  {
    source: "/facial-trauma/4040525",
    destination: "/service/facial-trauma",
    permanent: true,
  },
  { source: "/home/4040475", destination: "/", permanent: true },
  {
    source: "/office-anesthesia/4040507",
    destination: "/service/anesthesia",
    permanent: true,
  },
  {
    source: "/on-line-forms/4040503",
    destination: "/for-patients/what-to-expect",
    permanent: true,
  },
  {
    source: "/our-team/4040532",
    destination: "/about/meet-the-team",
    permanent: true,
  },
  {
    source: "/patient-information/4040476",
    destination: "/for-patients/what-to-expect",
    permanent: true,
  },
  { source: "/procedures/4040506", destination: "/", permanent: true },
  {
    source: "/wisdom-teeth/4040520",
    destination: "/service/wisdom-teeth-removal",
    permanent: true,
  },
];

const nextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      }
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      ...legacyPageRedirects.map(legacyBaseRedirect),
      ...legacyPageRedirects.map(legacyContentRedirect),
      ...legacyPathRedirects,
      {
        source: "/base.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/content.php",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
