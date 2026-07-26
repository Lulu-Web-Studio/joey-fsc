import {SERVICES} from "@/config/services";

type ServiceSlug = keyof typeof SERVICES;

/**
 * A service offered to an area. When `page` is present the combo gets its own
 * route at /areas-we-serve/[town]/[service]; otherwise it is link-only and
 * points at the shared /service/[service] page.
 *
 * Every field on `page` is required on purpose — a service-area page with no
 * town-specific angle of its own is a doorway page, so the type refuses to
 * let one ship half-written.
 */
export type AreaService = {
  slug: ServiceSlug;
  page?: {
    primaryKeyword: string;
    /** Why this service, in this town. Must not be reusable elsewhere. */
    localAngle: string;
    faqs: Faq[];
    seo: Seo;
  };
};

export type Faq = {
  question: string;
  answer: string;
};

export type Seo = {
  title: string;
  description: string;
};

export type Area = {
  slug: string;
  town: string;
  county: string;
  /** The one query this page owns. Enforced unique across all pages. */
  primaryKeyword: string;
  /** Short line used on the hub page and homepage list. */
  tagline: string;
  /** One- or two-sentence blurb for cards and list views. */
  summary: string;
  driveTime: string;
  neighborhoods: string[];
  /** 2–3 paragraphs of genuinely town-specific copy. */
  localContext: string[];
  referralNote: string;
  services: AreaService[];
  faqs: Faq[];
  seo: Seo;
};

const COMMON_LOCATION_FAQS: Faq[] = [
  {
    question: "Can The Facial Surgery Center coordinate with my dentist?",
    answer:
      "Yes. We can request existing records when appropriate and coordinate imaging, treatment planning, operative notes, and follow-up care with your dentist or orthodontist so everyone involved has the same plan.",
  },
  {
    question: "How much does it cost to see an oral surgeon?",
    answer:
      "The cost of an oral surgery consultation depends on whether new X-rays or 3D imaging are needed and how your insurance benefits apply. Our team can review available plan information, and a treatment estimate can be prepared after the surgeon evaluates your needs.",
  },
  {
    question: "Can I just go to an oral surgeon?",
    answer:
      "Yes. You can contact The Facial Surgery Center directly to schedule a consultation, although some insurance plans may require a referral or prior authorization. If you already have a dentist or orthodontist, we can request their records and coordinate care with that office.",
  },
  {
    question:
      "What's the difference between an oral surgeon and a dental surgeon?",
    answer:
      "In the United States, oral and maxillofacial surgeons are dental specialists who complete at least four additional years of hospital-based surgical residency after dental school. A general dentist may perform some oral surgery, but an oral surgeon has advanced training in anesthesia and surgery involving the teeth, mouth, jaws, and face.",
  },
  {
    question: "How much is wisdom teeth removal in CT?",
    answer:
      "There is no single Connecticut price for wisdom teeth removal. Cost depends on how many teeth are removed, whether they are impacted, the complexity of the extraction, the anesthesia selected, required imaging, and your insurance network; a case-specific estimate can be prepared after the consultation.",
  },
  {
    question: "Will insurance fully cover wisdom teeth removal?",
    answer:
      "Full coverage is not guaranteed. Your share depends on the plan's covered percentage, deductible, annual maximum, network rules, and whether sedation is covered; in some cases medical benefits may also apply. Our team can review available benefit information and may request a pre-treatment estimate from your insurer.",
  },
];

export const AREAS: Area[] = [
  {
    slug: "fairfield",
    town: "Fairfield",
    county: "Fairfield County",
    primaryKeyword: "oral surgeon Fairfield CT",
    tagline: "15 minutes from Fairfield center",
    summary:
      "One of the largest shares of our practice. Most Fairfield patients arrive on a referral from their general dentist, and the drive north is shorter than heading down the shoreline toward the Norwalk practices.",
    driveTime: "about 15 minutes",
    neighborhoods: [
      "Southport",
      "Greenfield Hill",
      "Stratfield",
      "Tunxis Hill",
      "Fairfield Beach",
      "Fairfield Woods",
    ],
    localContext: [
      "Fairfield patients make up one of the largest shares of our practice, and most arrive on a referral from their general dentist rather than by searching for a surgeon cold. That shapes how we run the first visit: we request your records and imaging ahead of time, review the treatment plan your dentist has already started, and send our notes back to their office the same week so nothing has to be repeated.",
      "The town's two high schools and the athletic programs at Fairfield University and Sacred Heart mean we see a steady stream of sports-related dental and facial trauma — avulsed teeth, jaw fractures, and soft-tissue injuries that need attention the same day. If a tooth has been knocked out, call the office before you drive; there is a short window where reimplantation is realistic and we will tell you how to transport the tooth on the phone.",
      "For patients coming from Southport and Greenfield Hill, the drive north is genuinely shorter than heading down the shoreline toward the Norwalk and Westport practices, particularly during commuter hours. Parking is surface-level and directly outside the entrance, which matters more than it sounds when you are picking someone up after IV sedation.",
    ],
    referralNote:
      "We accept referrals from general dentists and orthodontists throughout Fairfield and coordinate directly with your dentist's office on treatment planning, imaging, and post-operative restoration.",
    services: [
      {slug: "wisdom-teeth-removal"},
      {slug: "dental-implants"},
      {slug: "tooth-extractions"},
      {slug: "facial-trauma"},
      {slug: "anesthesia"},
      {slug: "dental-bone-grafting"},
    ],
    faqs: [
      {
        question: "How far is the office from Fairfield?",
        answer:
          "About 15 minutes from Fairfield center, a little more from Southport and the beach neighborhoods at rush hour. Parking is directly outside the entrance.",
      },
      {
        question: "Can I book without a dentist's referral?",
        answer:
          "Yes. Many Fairfield patients are referred by their general dentist, but you can request a consultation directly. If you have a referring dentist, our team can coordinate records and post-operative information with that office.",
      },
      {
        question: "Do you offer same-day emergency appointments?",
        answer:
          "Same-day availability is not guaranteed and depends on the schedule and clinical urgency. Call the office before driving over so the team can review your symptoms and advise the earliest appropriate option.",
      },
      {
        question: "What do I need to arrange for IV sedation?",
        answer:
          "Any procedure under IV sedation requires a responsible adult to drive you home and stay with you for several hours. Parking is directly outside the entrance, so pickup is straightforward.",
      },
      ...COMMON_LOCATION_FAQS,
    ],
    seo: {
      title: "Oral Surgeon in Fairfield, CT | Facial Surgery Center",
      description:
        "Oral and maxillofacial surgeons serving Fairfield, CT, 15 minutes away. Wisdom teeth removal, dental implants, facial trauma and same-day emergency care.",
    },
  },
  {
    slug: "shelton",
    town: "Shelton",
    county: "Fairfield County",
    primaryKeyword: "oral surgeon Shelton CT",
    tagline: "13 minutes — we share a border",
    summary:
      "Our closest neighbor — the two towns share a border. For most Shelton addresses we are the nearest oral and maxillofacial surgery practice by a wide margin.",
    driveTime: "about 13 minutes",
    neighborhoods: [
      "Huntington Center",
      "White Hills",
      "Pine Rock Park",
      "Shelton Center",
      "Mill River District",
      "Bridgeport Avenue corridor",
    ],
    localContext: [
      "Shelton is our closest neighbor — the two towns share a border, and for most Shelton addresses we are the nearest oral and maxillofacial surgery practice by a wide margin. Patients from Huntington Center and White Hills routinely get here faster than they would reach a general dentist a few towns over.",
      "That proximity changes what we can offer. Procedures that need staged follow-up — implant placement and restoration, bone grafting with a healing period, orthognathic cases coordinated with an orthodontist — are far easier to keep on schedule when each visit is a ten-minute drive instead of a half-hour commitment. We see the same pattern in post-operative care: Shelton patients are more likely to come in for a quick check when something feels off, which is exactly what you want.",
      "For families along the Bridgeport Avenue corporate corridor, we schedule early-morning consults so a visit does not consume a work day. Our Wednesday and Friday hours end at noon, so we recommend booking longer surgical appointments earlier in the week.",
    ],
    referralNote:
      "We accept referrals from general dentists and orthodontists throughout Shelton and the lower Naugatuck Valley, and coordinate directly with your dentist's office on imaging, treatment planning, and restoration.",
    services: [
      {slug: "wisdom-teeth-removal"},
      {slug: "dental-implants"},
      {slug: "dental-bone-grafting"},
      {slug: "tooth-extractions"},
      {slug: "orthognathic-surgery"},
      {slug: "anesthesia"},
    ],
    faqs: [
      {
        question: "How close is the Trumbull office to Shelton?",
        answer:
          "About 13 minutes. Shelton and Trumbull share a border, so for most Shelton addresses we are the closest oral and maxillofacial surgery practice available.",
      },
      ...COMMON_LOCATION_FAQS,
    ],
    seo: {
      title: "Oral Surgeon in Shelton, CT | Facial Surgery Center",
      description:
        "Oral and maxillofacial surgeons 13 minutes from Shelton, CT, our closest neighbouring town. Wisdom teeth, dental implants, bone grafting and IV sedation.",
    },
  },
  {
    slug: "bridgeport",
    town: "Bridgeport",
    county: "Fairfield County",
    primaryKeyword: "oral surgeon Bridgeport CT",
    tagline: "10 minutes from downtown",
    summary:
      "Trumbull borders Bridgeport to the north, putting us within ten minutes of most of the city. We see a high share of urgent cases from Bridgeport — infections, fractures, and extractions that have waited too long.",
    driveTime: "about 10 minutes",
    neighborhoods: [
      "Black Rock",
      "North End",
      "Brooklawn",
      "East Side",
      "Lake Forest",
      "Downtown",
    ],
    localContext: [
      "Bridgeport is the largest city in Connecticut and it borders Trumbull directly, which makes us one of the closest oral and maxillofacial surgery practices to most of the city. For patients in the North End and Brooklawn the drive is under ten minutes.",
      "A meaningful share of what we see from Bridgeport is urgent rather than elective. Patients arrive with an abscessed tooth that has been painful for weeks, a fracture from an accident, or a lesion their dentist wants biopsied quickly. We keep time open for these cases because delay is what turns a straightforward extraction into a hospital admission. If you are in pain and do not have a regular dentist, you can still book a consultation with us directly.",
      "We also field a lot of insurance questions from Bridgeport patients, and it is worth calling before you assume a procedure is out of reach. Our front desk will verify your coverage and give you a written estimate before anything is scheduled, so there are no surprises on the day of surgery.",
    ],
    referralNote:
      "We accept referrals from general dentists, community health centers, and emergency departments across Bridgeport, and we see urgent cases quickly when a referring provider calls ahead.",
    services: [
      {slug: "facial-trauma"},
      {slug: "tooth-extractions"},
      {slug: "wisdom-teeth-removal"},
      {slug: "oral-pathology"},
      {slug: "dental-implants"},
      {slug: "anesthesia"},
    ],
    faqs: [
      {
        question: "Can I book if I don't have a regular dentist?",
        answer:
          "Yes. You can request a consultation without a referral. Call the office and describe your symptoms; the team can assess the urgency and advise the earliest appropriate appointment based on clinical need and availability.",
      },
      {
        question: "Will I know the cost before treatment?",
        answer:
          "A treatment estimate can be prepared after the surgeon evaluates your needs. Insurance information is based on the benefits available from your carrier and is not a guarantee of payment.",
      },
      {
        question: "How long is the drive from Bridgeport?",
        answer:
          "About 10 minutes. Trumbull borders Bridgeport directly, and from the North End and Brooklawn it is often less.",
      },
      {
        question: "Can you evaluate and biopsy an oral lesion?",
        answer:
          "Yes. Oral pathology is a core part of our practice. Appointment timing depends on clinical urgency and availability, so ask your dentist or physician to send the referral details when you contact the office.",
      },
      ...COMMON_LOCATION_FAQS,
    ],
    seo: {
      title: "Oral Surgeon in Bridgeport, CT | Facial Surgery Center",
      description:
        "Oral and maxillofacial surgeons just 10 minutes from Bridgeport, CT. Urgent extractions, facial trauma, oral pathology, wisdom teeth and dental implants.",
    },
  },
  {
    slug: "stratford",
    town: "Stratford",
    county: "Fairfield County",
    primaryKeyword: "oral surgeon Stratford CT",
    tagline: "12 minutes — adjacent town",
    summary:
      "An adjacent town, twelve minutes out. Stratford sends us a lot of restorative work — implants, full-arch cases, and extractions that need planning around existing dentures or bridges.",
    driveTime: "about 12 minutes",
    neighborhoods: [
      "Paradise Green",
      "Lordship",
      "Oronoque",
      "Stratford Center",
      "South End",
      "North End",
    ],
    localContext: [
      "Stratford borders Trumbull to the southeast, and the Oronoque neighborhood sits close enough to our office that some patients are here faster than they would reach Stratford Center.",
      "The work we do for Stratford patients skews restorative. We see a lot of cases where teeth have been failing gradually — an old bridge that can no longer be saved, a partial denture that has stopped fitting, or a full arch that needs to be planned from scratch. These cases are as much about sequencing as surgery: what comes out, what gets grafted, how long the healing takes, and how it coordinates with your restorative dentist. We map that timeline out at the consultation so you know what the next twelve months look like before you commit.",
      "For patients who have put off treatment because of anxiety, it is worth knowing that we handle anesthesia in-house rather than referring it out. Most extraction and implant cases can be done under IV sedation with no memory of the procedure.",
    ],
    referralNote:
      "We accept referrals from general dentists, prosthodontists, and denturists throughout Stratford, and we plan surgical and restorative sequencing jointly with your dentist's office.",
    services: [
      {slug: "dental-implants"},
      {slug: "teeth-in-a-day"},
      {slug: "tooth-extractions"},
      {slug: "dental-bone-grafting"},
      {slug: "wisdom-teeth-removal"},
      {slug: "tmj-disorder"},
    ],
    faqs: [
      {
        question: "Can dental implants replace a failed bridge?",
        answer:
          "Often yes, though it depends on the remaining bone and the condition of the nearby teeth. Imaging may be recommended so the surgeon can explain whether grafting is needed and provide an estimated treatment sequence.",
      },
      {
        question: "Is IV sedation available for implants or extractions?",
        answer:
          "IV sedation is available in-house for appropriate patients and procedures. The surgeon can discuss the expected level of sedation, possible recall, risks, and alternatives; a responsible adult is required to drive you home.",
      },
      {
        question: "How long does full-arch implant treatment take?",
        answer:
          "It varies with bone quality, healing, and whether grafting is required, but treatment commonly takes several months from first surgery to final restoration. The consultation is used to outline a case-specific sequence and estimated timeline.",
      },
      {
        question: "What happens to my denture after extractions?",
        answer:
          "A denture may need adjustment or replacement after extractions. The surgical and restorative teams can coordinate a plan for temporary and long-term tooth replacement during healing.",
      },
      ...COMMON_LOCATION_FAQS,
    ],
    seo: {
      title: "Oral Surgeon in Stratford, CT | Facial Surgery Center",
      description:
        "Oral and maxillofacial surgeons 12 minutes from Stratford, CT. Dental implants, full-arch restoration, extractions and in-house IV sedation available.",
    },
  },
  {
    slug: "monroe",
    town: "Monroe",
    county: "Fairfield County",
    primaryKeyword: "oral surgeon Monroe CT",
    tagline: "10 minutes, no highway",
    summary:
      "Ten minutes south with no highway. Monroe is family territory for us — a large share of our wisdom teeth and orthodontic-coordination cases come from Masuk families.",
    driveTime: "about 10 minutes",
    neighborhoods: [
      "Monroe Center",
      "Stepney",
      "Stevenson",
      "Lake Zoar",
      "Upper Monroe",
    ],
    localContext: [
      "Monroe sits directly north of Trumbull, and the drive down is about as simple as it gets — no highway, no merges, roughly ten minutes from the center of town. That matters for the kind of work we do most often for Monroe families.",
      "A large share of our Monroe patients are teenagers. Wisdom teeth are typically evaluated between ages sixteen and nineteen, and the right time to remove them is usually before the roots are fully formed, when recovery is faster and complications are less likely. We coordinate closely with area orthodontists on timing, because the decision often has to fit around braces or aligner treatment rather than the other way around. If your child's orthodontist has flagged third molars, bring the panoramic X-ray to the consultation and we can usually give you a clear answer in one visit.",
      "We schedule most teen extraction cases for Monday, Tuesday, or Thursday so recovery lands on a full day rather than a half day, and we try to place them early in the morning so patients are not fasting through lunch before IV sedation.",
    ],
    referralNote:
      "We accept referrals from general dentists and orthodontists throughout Monroe and coordinate third molar timing directly with your child's orthodontic treatment plan.",
    services: [
      {slug: "wisdom-teeth-removal"},
      {slug: "orthognathic-surgery"},
      {slug: "anesthesia"},
      {slug: "tooth-extractions"},
      {slug: "dental-implants"},
      {slug: "facial-trauma"},
    ],
    faqs: [
      {
        question: "When should my teen have a wisdom teeth consultation?",
        answer:
          "A consultation is often considered between ages sixteen and nineteen, but timing depends on tooth development and symptoms. Bring recent panoramic imaging if available; the surgeon may recommend additional imaging or follow-up before making a treatment recommendation.",
      },
      {
        question: "Can wisdom teeth be removed while my teen has braces?",
        answer:
          "Often yes, and sometimes it has to. We coordinate directly with your orthodontist so the timing fits the overall plan rather than disrupting it.",
      },
      {
        question: "Which days are best for wisdom teeth surgery?",
        answer:
          "Monday, Tuesday, or Thursday. We are open until 5pm those days, which means recovery starts on a full day. We also try to book teen cases early in the morning so nobody is fasting through lunch before sedation.",
      },
      {
        question: "How far is the office from Monroe?",
        answer:
          "About 10 minutes from Monroe center, with no highway involved. Add a few minutes from Stepney and Stevenson.",
      },
      ...COMMON_LOCATION_FAQS,
    ],
    seo: {
      title: "Oral Surgeon in Monroe, CT | Facial Surgery Center",
      description:
        "Oral and maxillofacial surgeons just 10 minutes from Monroe, CT. Wisdom teeth removal, teen extractions under IV sedation and orthodontist coordination.",
    },
  },
  {
    slug: "easton",
    town: "Easton",
    county: "Fairfield County",
    primaryKeyword: "oral surgeon Easton CT",
    tagline: "12 minutes on local roads",
    summary:
      "Easton has no hospital and few dental specialists, so residents travel for surgical care regardless. We are among the closest options, and considerably closer than heading toward Danbury or Norwalk.",
    driveTime: "about 12 minutes",
    neighborhoods: [
      "Easton Center",
      "Aspetuck",
      "Sport Hill",
      "North Easton",
      "Silver Hill",
    ],
    localContext: [
      "Easton is a small, largely rural town without a hospital, and residents are used to leaving town for any specialist care. The relevant question is not whether you will travel but how far — and for oral and maxillofacial surgery we are considerably closer than the practices toward Danbury or down in Norwalk.",
      "Because Easton families often already drive to Fairfield or Trumbull for dentistry, most of our Easton patients arrive with a referral in hand and a treatment plan already partway along. We work from your dentist's records rather than repeating imaging you have already had, and we send our operative notes back promptly so the restorative side is not left waiting on us.",
      "Teenagers in town attend Joel Barlow, which draws from Redding as well, and we see the usual pattern of wisdom teeth evaluations clustering around junior and senior year. Scheduling around a shared regional school calendar takes a little more planning, so we would rather book those consultations early than squeeze them into a school break.",
    ],
    referralNote:
      "We accept referrals from general dentists and orthodontists serving Easton and work directly from your dentist's existing records and imaging where possible.",
    services: [
      {slug: "wisdom-teeth-removal"},
      {slug: "dental-implants"},
      {slug: "tooth-extractions"},
      {slug: "anesthesia"},
      {slug: "oral-pathology"},
      {slug: "tmj-disorder"},
    ],
    faqs: [
      {
        question: "Can you use the X-rays my dentist already took?",
        answer:
          "Recent imaging may be usable if it clearly shows what the planned procedure requires. Send or bring the images for review; the surgeon may recommend additional imaging when more detail or a newer view is needed.",
      },
      {
        question: "How long is the drive from Easton?",
        answer:
          "About 12 minutes from Easton center, entirely on local roads. Add roughly five minutes from Aspetuck and north Easton.",
      },
      {
        question: "Is Trumbull closer than Danbury or Norwalk?",
        answer:
          "For most Easton addresses, yes — noticeably so. That gap matters most for treatment requiring several visits over a number of months, such as implants or bone grafting.",
      },
      {
        question: "How early should we book around school breaks?",
        answer:
          "Earlier than you think. Joel Barlow draws from Redding as well as Easton, and surgical scheduling around a shared calendar is easier with lead time than during a break.",
      },
      ...COMMON_LOCATION_FAQS,
    ],
    seo: {
      title: "Oral Surgeon in Easton, CT | Facial Surgery Center",
      description:
        "Oral and maxillofacial surgeons 12 minutes from Easton, CT, entirely on local roads. Wisdom teeth, dental implants, extractions and in-house IV sedation.",
    },
  },
  {
    slug: "milford",
    town: "Milford",
    county: "New Haven County",
    primaryKeyword: "oral surgeon Milford CT",
    tagline: "20 minutes from the shoreline",
    summary:
      "Just over the New Haven County line and about twenty minutes out. Milford patients most often come to us for implant and full-arch work planned with their own restorative dentist.",
    driveTime: "about 20 minutes",
    neighborhoods: [
      "Milford Center",
      "Devon",
      "Woodmont",
      "Walnut Beach",
      "Silver Sands",
      "Orange border",
    ],
    localContext: [
      "Milford sits just over the New Haven County line, and at roughly twenty minutes it is the outer edge of the area we serve regularly. Patients generally make that trip for a specific reason rather than convenience, and most often it is implant work.",
      "That has shaped how we handle Milford cases. Where a patient is travelling further, we consolidate: the consultation, scan, and treatment plan happen in a single visit rather than across three, and we schedule surgical and follow-up appointments to minimise the number of separate trips. Where a post-operative check can reasonably be done by your own dentist, we will say so rather than have you drive back for five minutes in a chair.",
      "Build in a buffer for the trip. Shoreline traffic is unpredictable enough that Milford patients are the ones most likely to arrive late, and a sedation appointment that starts late usually has to be rescheduled rather than simply running behind.",
    ],
    referralNote:
      "We accept referrals from general dentists and prosthodontists in Milford and the surrounding shoreline towns, and we coordinate follow-up care with your own dentist to reduce the number of trips.",
    services: [
      {slug: "dental-implants"},
      {slug: "teeth-in-a-day"},
      {slug: "dental-bone-grafting"},
      {slug: "wisdom-teeth-removal"},
      {slug: "tooth-extractions"},
      {slug: "sleep-apnea"},
    ],
    faqs: [
      {
        question: "Can appointments be combined to reduce trips from Milford?",
        answer:
          "Sometimes. Whether a consultation, scan, and treatment-planning steps can be combined depends on the records available and the complexity of the case. The surgeon can also determine whether any routine follow-up may be handled by your local dentist.",
      },
      {
        question: "What should I do if traffic makes me late?",
        answer:
          "Call the office as soon as possible. Whether the appointment can proceed depends on the arrival time, the day's schedule, and any sedation requirements; staff can explain the available options.",
      },
      {
        question: "When is traveling from Milford worthwhile for implant care?",
        answer:
          "That is a fair question to ask, and the honest answer depends on the case. Straightforward single implants are widely available closer to home. Complex or full-arch cases, and cases needing grafting, are where the trip tends to be worth it.",
      },
      {
        question: "Do you offer surgery for obstructive sleep apnea?",
        answer:
          "We evaluate and treat the skeletal component of obstructive sleep apnea. If you have been diagnosed and cannot tolerate CPAP, bring your sleep study to the consultation.",
      },
      ...COMMON_LOCATION_FAQS,
    ],
    seo: {
      title: "Oral Surgeon in Milford, CT | Facial Surgery Center",
      description:
        "Oral and maxillofacial surgeons 20 minutes from Milford, CT, with visits consolidated. Dental implants, full-arch work, bone grafting and sleep apnea.",
    },
  },
  {
    slug: "newtown",
    town: "Newtown",
    county: "Fairfield County",
    primaryKeyword: "oral surgeon Newtown CT",
    tagline: "22 minutes, one road",
    summary:
      "A straight run south the whole way. For much of southern Newtown we are a comparable drive to the Danbury practices, without the traffic.",
    driveTime: "about 22 minutes",
    neighborhoods: [
      "Newtown Center",
      "Sandy Hook",
      "Botsford",
      "Hawleyville",
      "Dodgingtown",
      "Palestine District",
    ],
    localContext: [
      "Newtown is the furthest town we serve regularly, but the drive is simpler than the distance suggests — it is a straight run south through Monroe, with no highway merges and no shoreline traffic to contend with.",
      "Patients from southern Newtown, Botsford in particular, often find the trip to us comparable to heading north toward Danbury once traffic is accounted for. We would not claim that for Hawleyville or the northern end of town, where Danbury is plainly closer. If you are weighing the two, the deciding factor is usually whether your case needs several visits or just one.",
      "Because of the distance we try to be decisive at the consultation. You should leave the first appointment knowing whether surgery is recommended, what it involves, what it costs, and when it can be scheduled — rather than being asked back for a second visit to be told the same thing.",
    ],
    referralNote:
      "We accept referrals from general dentists and orthodontists in Newtown and the surrounding towns, and we request records ahead of the first visit so the consultation is decisive.",
    services: [
      {slug: "wisdom-teeth-removal"},
      {slug: "dental-implants"},
      {slug: "orthognathic-surgery"},
      {slug: "tooth-extractions"},
      {slug: "facial-trauma"},
      {slug: "anesthesia"},
    ],
    faqs: [
      {
        question: "Is Trumbull or Danbury closer from Newtown?",
        answer:
          "It depends where in Newtown you are. From Botsford and the southern end the two are comparable once traffic is counted. From Hawleyville and northern Newtown, Danbury is plainly closer.",
      },
      {
        question: "Can follow-up visits happen with my local dentist?",
        answer:
          "Possibly. The surgeon determines which follow-up visits require the surgical office and which may be appropriate for your local dentist, based on the procedure and how healing is progressing.",
      },
      {
        question: "Can consultation and planning happen in one visit?",
        answer:
          "Sometimes. Having records and imaging available before the consultation may allow more planning to happen at the first visit, but additional imaging, insurance information, or clinical review may require another step.",
      },
      {
        question: "Do you perform corrective jaw surgery?",
        answer:
          "Yes, including minimally invasive approaches. Orthognathic cases are planned jointly with your orthodontist and do require several visits, which is worth factoring into the drive.",
      },
      ...COMMON_LOCATION_FAQS,
    ],
    seo: {
      title: "Oral Surgeon in Newtown, CT | Facial Surgery Center",
      description:
        "Oral and maxillofacial surgeons 22 minutes from Newtown, CT, a straight run south. Wisdom teeth, dental implants and corrective jaw surgery for all ages.",
    },
  },
];

export const AREAS_BASE_PATH = "/areas-we-serve";

/**
 * Two location pages targeting the same query cannibalise each other, and the
 * mistake is invisible until rankings drop. Fail the build instead.
 */
function assertUniquePrimaryKeywords(): void {
  const seen = new Set<string>();

  const keywords = AREAS.flatMap((area) => [
    area.primaryKeyword,
    ...area.services.flatMap((service) =>
      service.page ? [service.page.primaryKeyword] : [],
    ),
  ]);

  for (const keyword of keywords) {
    const normalized = keyword.trim().toLowerCase();
    if (seen.has(normalized)) {
      throw new Error(`Duplicate primary keyword in areas config: "${keyword}"`);
    }
    seen.add(normalized);
  }
}

assertUniquePrimaryKeywords();

export function getArea(slug: string): Area | undefined {
  return AREAS.find((area) => area.slug === slug);
}

export function areaHref(area: Area): string {
  return `${AREAS_BASE_PATH}/${area.slug}`;
}

/**
 * Single source of truth for where a service link points. Returns the
 * town-specific page when one exists, otherwise the shared service page.
 * Adding a service-area page later is a config edit, not a link audit.
 */
export function serviceHref(area: Area, service: AreaService): string {
  return service.page
    ? `${AREAS_BASE_PATH}/${area.slug}/${service.slug}`
    : `/service/${service.slug}`;
}

/** Every service-area combo that has its own page. Empty until phase 2. */
export function areaServicePages(): {area: Area; service: AreaService}[] {
  return AREAS.flatMap((area) =>
    area.services
      .filter((service) => Boolean(service.page))
      .map((service) => ({area, service})),
  );
}

export function serviceName(slug: ServiceSlug): string {
  return SERVICES[slug].name;
}
