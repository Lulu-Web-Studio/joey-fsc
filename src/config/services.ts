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
  /** Complete service name without the geographic suffix, for sentence and label contexts. */
  shortTitle: string;
  description: string;
  sectionTitle: string;
  metaTitle: string;
  metaDescription: string;
  /** Optional body-copy override so a service page can name Trumbull / Fairfield County without waiting on a CMS edit. Falls back to the Sanity paragraph when omitted. */
  paragraph1?: {
    title: string;
    text: string;
  };
  paragraph2?: {
    title: string;
    text: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
};

// Used by geoTitle/geoMetaDescription below to generate the title, metaTitle,
// and most metaDescription strings. Paragraph copy, FAQ answers, headings,
// and hand-written descriptions still hardcode "Trumbull"/"Fairfield County"
// directly and are not affected by these constants.
const OFFICE_TOWN = 'Trumbull';
const SERVICE_AREA = 'Fairfield County';

/** Every override's title and metaTitle follow this same "{Name} in {area}, CT" formula. */
const geoTitle = (name: string) => `${name} in ${SERVICE_AREA}, CT`;

/** Most metaDescriptions follow "{lead} from {provider} at our {town} office, serving {area}, CT. {extra}" */
const geoMetaDescription = (
  lead: string,
  extra?: string,
  provider = 'an oral and maxillofacial surgeon',
) => {
  const base = `${lead} from ${provider} at our ${OFFICE_TOWN} office, serving ${SERVICE_AREA}, CT.`;
  return extra ? `${base} ${extra}` : base;
};

const SERVICE_PAGE_OVERRIDES: Partial<Record<ServiceSlug, ServicePageOverride>> = {
  'dental-implants': {
    shortTitle: 'Dental Implants',
    title: geoTitle('Dental Implants'),
    description: SERVICES['dental-implants'].description,
    sectionTitle: 'How Dental Implant Treatment Is Planned',
    metaTitle: geoTitle('Dental Implants'),
    metaDescription:
      geoMetaDescription('Dental implants', 'Implant placement, bone grafting, and dentist coordination.'),
    paragraph1: {
      title: 'How Dental Implant Treatment Works',
      text: 'A dental implant is placed in the jaw to support a replacement tooth. We plan this treatment for patients throughout Fairfield County from our Trumbull office, and after the implant heals and becomes stable, a restorative dentist attaches the crown, bridge, or implant-supported denture. Implants are commonly considered for a single missing tooth, several teeth, or as an anchor for a larger restoration, and the number needed depends entirely on your specific case.',
    },
    paragraph2: {
      title: 'Planning Your Treatment From Across Fairfield County',
      text: "Planning begins with an examination and imaging of the proposed site, whether you're coming from Trumbull itself or one of the surrounding Fairfield County towns we serve. The surgeon evaluates bone quantity and quality, nearby anatomy, and your medical history before explaining whether the implant can be placed directly or whether grafting is recommended first. Most patients move through distinct phases — evaluation, any needed preparatory treatment, implant placement, a healing period, and finally the restoration — and your surgeon will walk through what each phase involves for your case before treatment begins.",
    },
    faqs: [
      {
        question: 'Am I a candidate for dental implants?',
        answer:
          'Candidacy depends on the amount and quality of jawbone at the site, gum health, your medical history, and whether any teeth need to be removed first. An examination and imaging are needed to know whether an implant can be placed directly or whether grafting or another preparatory step is recommended.',
      },
      {
        question: 'Do you place implants near me, outside of Trumbull?',
        answer:
          "We see implant patients from across Fairfield County — including Shelton, Fairfield, and Stratford — and into New Haven County towns like Milford. Visit our areas-we-serve pages for town-specific drive times, or contact us to confirm your location.",
      },
      {
        question: 'How long does it take from implant placement to a finished tooth?',
        answer:
          'Timing varies with bone quality, whether grafting is needed, and how the implant heals, so there is no single timeline that applies to everyone. Many cases take several months from placement to final restoration; your surgeon can outline a case-specific sequence at the consultation.',
      },
      {
        question: 'Will I need a bone graft before an implant?',
        answer:
          'Not everyone does. The decision depends on the quantity and quality of bone at the planned implant site, which is evaluated with an examination and imaging before your surgeon explains whether grafting is part of your treatment plan.',
      },
      {
        question: 'Who places the implant and who makes the crown?',
        answer:
          'The oral and maxillofacial surgeon places and monitors the implant in the jaw. A restorative dentist — often the one you already see — designs and attaches the crown, bridge, or implant-supported denture once the implant has healed and is stable. We coordinate directly with that office throughout.',
      },
    ],
  },
  'teeth-in-a-day': {
    shortTitle: 'All-on-X Dental Implants',
    title: geoTitle('All-on-X Dental Implants'),
    description:
      'All-on-X dental implants use a planned number of implants to support a fixed full-arch restoration for people with many missing or failing teeth. All-on-4 is one approach within this broader treatment category.',
    sectionTitle: 'How All-on-X Dental Implants Work',
    metaTitle: geoTitle('All-on-X Dental Implants'),
    metaDescription:
      'All-on-X dental implants from our Trumbull office, serving Fairfield County, CT. Fixed full-arch treatment and All-on-4 planning for missing or failing teeth.',
    paragraph1: {
      title: 'How All-on-X Works From Our Trumbull Office',
      text: 'All-on-X uses a planned number of implants to support a fixed full-arch restoration. We plan this treatment for patients throughout Fairfield County from our Trumbull office, and the surgeon determines implant number and position after an examination and 3D imaging of your jaw. Not every patient qualifies for a temporary set of teeth on the day of surgery; that depends on bone quality, implant stability, and the surgical plan developed at your evaluation.',
    },
    paragraph2: {
      title: 'Coordinating a Full-Arch Case Across the County',
      text: "Full-arch treatment is planned jointly with your restorative dentist or prosthodontist, whether you're traveling from Trumbull or elsewhere in Fairfield County. The consultation outlines the surgical and restorative sequence, including healing time before your final restoration is fitted. Because the timeline spans surgery, healing, and a final restoration months later, your surgical and restorative teams stay in contact throughout so nothing about your case gets lost between visits.",
    },
    faqs: [
      {
        question: 'Are All-on-4 dental implants the same as All-on-X?',
        answer:
          'All-on-4 is a specific full-arch approach that uses four implants. All-on-X is the broader term for a fixed full-arch restoration supported by the number of implants your anatomy and treatment plan require. Your surgeon determines the appropriate number and position after reviewing your examination and imaging.',
      },
      {
        question: 'Can Fairfield County patients get All-on-X treatment here?',
        answer:
          'Yes. All-on-X treatment is available to patients from across Fairfield County and into New Haven County. Visit our areas-we-serve pages for town-specific information, or contact us to confirm your location falls within our service area.',
      },
    ],
  },
  'tooth-extractions': {
    shortTitle: 'Tooth Extractions',
    title: geoTitle('Tooth Extractions'),
    description:
      'Tooth extractions are performed when a tooth is too damaged, decayed, or crowded to keep, with the approach planned around your specific tooth and imaging.',
    sectionTitle: 'How Tooth Extractions Are Planned',
    metaTitle: geoTitle('Tooth Extractions'),
    metaDescription:
      geoMetaDescription('Tooth extractions', 'Simple and surgical extractions, anesthesia options.'),
    paragraph1: {
      title: 'When an Extraction Is Recommended',
      text: 'Our Trumbull office removes teeth that are too damaged, decayed, or crowded to keep, seeing patients from across Fairfield County who need anything from a routine extraction to a more involved surgical removal. An examination and imaging help determine whether the tooth can be removed in a straightforward visit or needs a surgical approach. Some extractions are routine, while others — such as an impacted or broken tooth — require a more involved surgical approach, which is why every case starts with a proper assessment rather than an assumption.',
    },
    paragraph2: {
      title: 'Planning Around Fairfield County Schedules',
      text: "We coordinate extraction timing with your dentist or orthodontist, whether you're traveling from Trumbull itself or one of the surrounding Fairfield County towns we serve. Anesthesia options, including in-house IV sedation for appropriate cases, are reviewed at the consultation so you know what to expect before scheduling surgery. If you're considering a replacement afterward, that conversation often starts before the extraction itself, since the way a tooth is removed can affect what options remain for an implant, bridge, or denture later.",
    },
    faqs: [
      {
        question: "Can I get a tooth extraction here if I don't live in Trumbull?",
        answer:
          'Yes. Patients throughout Fairfield County request extractions at our Trumbull office, often on a referral from their dentist. Visit our areas-we-serve pages for town-specific information, or contact us directly.',
      },
    ],
  },
  'wisdom-teeth-removal': {
    shortTitle: 'Wisdom Teeth Removal',
    title: geoTitle('Wisdom Teeth Removal'),
    description:
      'Wisdom tooth removal may be recommended when a tooth is impacted, painful, or difficult to clean, based on an examination and imaging of your specific case.',
    sectionTitle: 'How We Evaluate Wisdom Teeth',
    metaTitle: geoTitle('Wisdom Teeth Removal'),
    metaDescription:
      geoMetaDescription('Wisdom teeth removal', 'Evaluation, imaging, and in-house IV sedation.'),
    paragraph1: {
      title: 'When Wisdom Teeth Should Be Evaluated',
      text: 'Patients throughout Fairfield County come to our Trumbull office when a wisdom tooth is impacted, painful, or difficult to clean, or when a dentist or orthodontist has recommended imaging before further treatment. An examination and current X-rays help determine whether a tooth can be monitored or should be scheduled for removal. Age and root development also factor into the recommendation — younger patients with less-formed roots often have a more straightforward recovery than those who wait until the roots are fully developed.',
    },
    paragraph2: {
      title: 'Coordinating Care Across the County',
      text: 'We work directly with dentists and orthodontists throughout Fairfield County to time wisdom teeth evaluations around braces, aligners, or other treatment already in progress. Anesthesia options, including in-house IV sedation, are reviewed with you before any procedure is scheduled. For patients still in orthodontic treatment, we look at the whole picture together with your orthodontist rather than treating the wisdom teeth as a separate decision.',
    },
    faqs: [
      {
        question: 'How far do patients typically travel for wisdom teeth removal?',
        answer:
          'Wisdom teeth removal is available to patients traveling to our Trumbull office from elsewhere in Fairfield County. Visit our areas-we-serve pages for town-specific information, or contact us to confirm your location.',
      },
    ],
  },
  'anesthesia': {
    shortTitle: 'Oral Surgery Anesthesia',
    title: geoTitle('Oral Surgery Anesthesia'),
    description:
      'We offer a range of anesthesia options, from local anesthesia to in-house IV sedation, selected based on your health history and the procedure planned.',
    sectionTitle: 'Anesthesia for Fairfield County Patients',
    metaTitle: geoTitle('Oral Surgery Anesthesia'),
    metaDescription:
      'In-house anesthesia and IV sedation for oral and maxillofacial surgery from our Trumbull office, serving patients throughout Fairfield County, CT.',
    paragraph1: {
      title: 'Anesthesia Options We Offer',
      text: 'Our Trumbull office offers a range of anesthesia options, from local anesthesia to in-house IV sedation, for patients throughout Fairfield County undergoing oral and maxillofacial surgery. The surgeon reviews your health history and the planned procedure before recommending which option fits your case. Not every procedure calls for the same level of anesthesia, and some patients qualify for more than one option — the right choice depends on the complexity of the procedure, your anxiety level, and your overall health.',
    },
    paragraph2: {
      title: 'What to Expect Before Your Visit',
      text: "If IV sedation is part of your treatment plan, a responsible adult must drive you home and stay with you afterward, regardless of whether you're traveling from Trumbull or elsewhere in Fairfield County. We review fasting instructions, medications, and recovery expectations at the consultation so you know what to expect before surgery day. You'll also review what to arrange in advance, such as time off work and help at home, since recovery from sedation looks different than recovery from local anesthesia alone.",
    },
    faqs: [
      {
        question: "Is IV sedation available if I'm not a Trumbull local?",
        answer:
          'Yes. IV sedation is offered in-house at our Trumbull office for appropriate patients and procedures, regardless of which Fairfield County town you are traveling from. A responsible adult must drive you home afterward.',
      },
    ],
  },
  'dental-bone-grafting': {
    shortTitle: 'Dental Bone Grafting',
    title: geoTitle('Dental Bone Grafting'),
    description:
      'Bone grafting can rebuild bone structure in the jaw, often as preparation for a dental implant or following tooth loss, trauma, or disease.',
    sectionTitle: 'How Bone Grafting Is Planned',
    metaTitle: geoTitle('Dental Bone Grafting'),
    metaDescription:
      geoMetaDescription('Bone grafting', 'Rebuilding jawbone for implants or after tooth loss.'),
    paragraph1: {
      title: 'Why Bone Grafting May Be Recommended',
      text: 'Patients from Trumbull and throughout Fairfield County are referred to our office for bone grafting when the jaw lacks enough height, width, or density to support a dental implant, or has been affected by tooth loss, infection, or trauma. Imaging helps the surgeon determine the graft type and location needed for your case. The amount of grafting needed ranges widely, from a small addition at a single site to a more extensive rebuild, and that range is exactly why imaging comes before any recommendation.',
    },
    paragraph2: {
      title: 'Coordinating With Your Restorative Dentist',
      text: "We plan grafting around the restoration your dentist or prosthodontist intends to place, whether that's a single implant or a full-arch case. Healing time varies by graft type and location, and your surgeon will outline a case-specific timeline before treatment begins. Depending on the case, an implant may be placed at the same time as the graft or only after the grafted site has fully healed — your surgeon will explain which sequence applies to you.",
    },
    faqs: [
      {
        question: 'Can I get a bone graft here without living in Trumbull?',
        answer:
          'Yes. Bone grafting patients travel to our Trumbull office from across Fairfield County, often in preparation for a dental implant. Visit our areas-we-serve pages for town-specific information, or contact us directly.',
      },
    ],
  },
  'botox-and-filler': {
    shortTitle: 'Botox & Dermal Fillers',
    title: geoTitle('Botox & Dermal Fillers'),
    description:
      'Botox and dermal fillers are used to address fine lines, wrinkles, and volume loss in facial features, with results and duration varying by individual.',
    sectionTitle: 'Botox & Filler for Fairfield County, CT',
    metaTitle: geoTitle('Botox & Dermal Fillers'),
    metaDescription:
      geoMetaDescription('Botox and dermal fillers', 'Facial rejuvenation consultations.', 'an oral and maxillofacial surgical team'),
    paragraph1: {
      title: 'Facial Rejuvenation From a Surgical Team',
      text: 'Our Trumbull office offers Botox and dermal filler treatment to patients across Fairfield County, performed by a team with surgical training in facial anatomy. A consultation reviews your goals, medical history, and which areas may benefit from treatment. Many patients start with one area of concern and decide from there whether to treat others, rather than committing to a full plan on the first visit.',
    },
    paragraph2: {
      title: 'What a Consultation Covers',
      text: 'Results vary by individual and by the areas treated, and the surgeon will discuss realistic expectations, expected duration, and any limitations specific to your case before scheduling. Follow-up is available if you have questions after treatment. Because facial anatomy varies so much from person to person, the amount and placement used for one patient often is not what another patient needs for a similar concern.',
    },
    faqs: [
      {
        question: "What's the difference between Botox and dermal fillers?",
        answer:
          "Botox relaxes the muscles that cause dynamic wrinkles, such as forehead lines and crow's feet, while dermal fillers add volume to areas that have lost fullness, such as the cheeks, lips, or nasolabial folds. Which is appropriate — or whether both are — depends on the areas of concern, discussed at your consultation.",
      },
      {
        question: 'How long do Botox and filler results typically last?',
        answer:
          "Duration varies by individual and treatment area. Botox effects are often reported to last a few months, while filler results can vary more depending on the product used and the area treated. Your surgeon can discuss expected timelines for your specific treatment plan.",
      },
      {
        question: 'Is there downtime after Botox or filler treatment?',
        answer:
          'Most patients resume normal activities the same day, though mild swelling, redness, or bruising at injection sites is possible and typically resolves within a few days. Specific aftercare guidance is provided after your treatment.',
      },
      {
        question: 'Who performs the Botox and filler injections?',
        answer:
          'Treatment is performed by a team with surgical training in facial anatomy, which the practice considers relevant given the precision needed near sensitive facial structures.',
      },
      {
        question: 'What should I avoid after Botox or filler treatment?',
        answer:
          "General aftercare guidance typically includes avoiding strenuous exercise, alcohol, and lying flat for several hours after treatment, and not massaging or applying pressure to treated areas unless instructed. Your specific aftercare instructions are reviewed with you before you leave, since they can vary by treatment area and product.",
      },
      {
        question: 'Does Botox make your skin sag or age faster once it wears off?',
        answer:
          "There's no reliable evidence that Botox causes skin to sag or age faster after it wears off — muscle movement and appearance simply return toward how they were before treatment. Any concerns about your specific skin or treatment plan are worth raising at your consultation.",
      },
      {
        question: 'Is Botox or filler better for sagging around the jowls?',
        answer:
          'That depends on what is contributing to the change in that area — volume loss typically responds differently than muscle-related movement, and some patients benefit from a combination. The surgeon can recommend an approach after evaluating your anatomy.',
      },
      {
        question: 'Is Botox and filler treatment available to non-Trumbull patients?',
        answer:
          'Yes. Patients travel to our Trumbull office from throughout Fairfield County for Botox and dermal filler consultations. Contact us to schedule or to confirm your location falls within our service area.',
      },
    ],
  },
  'facial-trauma': {
    shortTitle: 'Facial Trauma Treatment',
    title: geoTitle('Facial Trauma Treatment'),
    description:
      'We evaluate and treat facial injuries, including fractures, lacerations, and dental trauma, with a treatment plan based on the extent of the injury.',
    sectionTitle: 'Facial Trauma Care for Fairfield County, CT',
    metaTitle: geoTitle('Facial Trauma Treatment'),
    metaDescription:
      geoMetaDescription('Facial trauma evaluation and treatment', 'Fractures, lacerations, dental injuries.'),
    paragraph1: {
      title: 'Injuries We Evaluate',
      text: 'We treat facial fractures, lacerations, and dental injuries for patients throughout Fairfield County from our Trumbull office, including sports injuries, falls, and avulsed or displaced teeth. If a tooth has been knocked out, call our office before you drive — there is often a short window where reimplantation is realistic. Not every facial injury requires surgery — some soft-tissue injuries and simple fractures can be managed without it — which is part of what the initial evaluation is meant to determine.',
    },
    paragraph2: {
      title: 'Coordinating Urgent and Follow-Up Care',
      text: 'Facial trauma cases are evaluated for urgency, and imaging helps the surgeon determine the extent of injury and the appropriate treatment sequence. We coordinate with your dentist, physician, or emergency department as needed throughout Fairfield County. When surgery is needed, timing matters: some fractures are addressed promptly, while others are better managed after initial swelling has gone down, and the surgeon will explain which applies to your injury.',
    },
    faqs: [
      {
        question: 'Do you treat urgent facial trauma cases from outside Trumbull?',
        answer:
          'Yes. Facial trauma patients from throughout Fairfield County reach our Trumbull office for evaluation. Call before traveling so the team can review your symptoms and advise on the earliest appropriate option based on the day\'s schedule and clinical urgency.',
      },
    ],
  },
  'genioplasty': {
    shortTitle: 'Genioplasty (Chin Surgery)',
    title: geoTitle('Genioplasty (Chin Surgery)'),
    description:
      'Genioplasty repositions the chin to address its shape and projection, which may support facial balance or function depending on the individual case.',
    sectionTitle: 'Genioplasty for Fairfield County, CT',
    metaTitle: geoTitle('Genioplasty (Chin Surgery)'),
    metaDescription:
      geoMetaDescription('Genioplasty and chin surgery', 'Facial balance and functional evaluation.'),
    paragraph1: {
      title: 'What Genioplasty Involves',
      text: 'Genioplasty repositions the chin to improve facial balance or function, and our Trumbull office evaluates patients from across Fairfield County for this procedure. The surgeon reviews your facial anatomy, bite, and goals during a consultation before recommending a surgical plan. Because the chin plays a significant role in overall facial proportion, genioplasty is sometimes considered alongside other procedures rather than as a stand-alone change.',
    },
    paragraph2: {
      title: 'Planning Your Procedure',
      text: 'Some genioplasty cases are planned alongside orthognathic (jaw) surgery, while others are performed on their own; the surgeon will explain which approach fits your case after an examination and imaging. Recovery expectations and follow-up care are reviewed before surgery is scheduled. Implant-based and bone-repositioning approaches both exist, and which one fits your goals depends on the change you are looking for and what your anatomy supports.',
    },
    faqs: [
      {
        question: "Can I consult about genioplasty without living in Trumbull?",
        answer:
          'Yes. Patients throughout Fairfield County consult our Trumbull office about genioplasty and chin surgery. Contact us to schedule a consultation or confirm your location falls within our service area.',
      },
    ],
  },
  'oral-pathology': {
    shortTitle: 'Oral Pathology',
    title: geoTitle('Oral Pathology'),
    description: SERVICES['oral-pathology'].description,
    sectionTitle: 'Oral Pathology Care for Fairfield County, CT',
    metaTitle: geoTitle('Oral Pathology'),
    metaDescription:
      geoMetaDescription('Diagnosis and treatment of oral cysts, tumors, and lesions', undefined),
    paragraph1: {
      title: 'Conditions We Evaluate',
      text: "Our Trumbull office diagnoses and treats oral diseases and abnormalities, including cysts, tumors, and lesions of the mouth and jaw, for patients throughout Fairfield County. Your dentist or physician can refer you directly, or we can evaluate a concern you've noticed yourself. Findings range from harmless and self-limiting to ones that need active treatment, and appearance alone isn't a reliable way to tell the difference — which is the reason for a professional look rather than waiting to see what happens.",
    },
    paragraph2: {
      title: 'What an Evaluation Involves',
      text: "An oral pathology evaluation typically includes an examination and may involve imaging or a biopsy, depending on what is found. Appointment timing depends on clinical urgency, and we coordinate with your dentist or physician on next steps. If a biopsy is recommended, we'll explain what the procedure involves, what happens to the sample afterward, and roughly when to expect results.",
    },
    faqs: [
      {
        question: 'What conditions fall under oral pathology?',
        answer:
          'Oral pathology covers a wide range of concerns, including cysts, benign and malignant tumors, and lesions of the mouth, jaw, and surrounding soft tissue. Not every finding requires the same treatment, which is why a formal evaluation matters.',
      },
      {
        question: 'Do I need a biopsy for every finding?',
        answer:
          "Not necessarily. Whether a biopsy is recommended depends on what the surgeon observes during examination and imaging — some findings can be monitored, while others warrant tissue sampling for a definitive diagnosis.",
      },
      {
        question: 'How quickly will I get pathology results?',
        answer:
          'Turnaround depends on the laboratory processing the sample and the complexity of the case. The office can give you a general timeframe when a biopsy is performed.',
      },
      {
        question: 'Can my dentist refer me directly for an oral pathology evaluation?',
        answer:
          "Yes. Dentists and physicians throughout Fairfield County refer patients for oral pathology evaluation, and you may also request an evaluation yourself if you've noticed a change in your mouth.",
      },
      {
        question: 'Is oral pathology a medical or dental specialty?',
        answer:
          'Oral pathology sits at the intersection of both — it focuses on diseases of the mouth and jaw, evaluated using dental and medical diagnostic methods, including imaging and, when needed, tissue biopsy.',
      },
      {
        question: 'How is an oral pathology evaluation different from surgery to treat what is found?',
        answer:
          'An oral and maxillofacial surgeon can perform both roles — evaluating and diagnosing a suspicious area, and, when treatment is needed, performing the procedure to remove or treat it. The evaluation and the treatment may happen at the same appointment or be staged separately, depending on what is found.',
      },
      {
        question: 'How long do mouth lesions typically last before I should be concerned?',
        answer:
          'Minor irritations, such as from biting your cheek or a canker sore, often resolve within one to two weeks. A sore, patch, lump, or area of discoloration that lasts longer than two weeks, keeps coming back, or changes in size or color is worth having evaluated.',
      },
      {
        question: 'Can you tell if a lesion is cancerous just by looking at it?',
        answer:
          "Not reliably. Appearance alone isn't enough to determine whether a lesion is cancerous — a professional evaluation, and sometimes a biopsy, is the only way to get a clear answer. Don't wait to have something checked just because it doesn't look alarming to you.",
      },
      {
        question: 'Will you see an oral pathology referral from outside Trumbull?',
        answer:
          'Yes. Oral pathology patients travel to our Trumbull office from throughout Fairfield County, often on referral from a dentist or physician. Appointment timing depends on clinical urgency and availability.',
      },
    ],
  },
  'orthognathic-surgery': {
    shortTitle: 'Orthognathic (Jaw) Surgery',
    title: geoTitle('Orthognathic (Jaw) Surgery'),
    description:
      'Orthognathic (jaw) surgery repositions misaligned jaws, which may address function, facial symmetry, or breathing depending on the case.',
    sectionTitle: 'Jaw Surgery for Fairfield County, CT',
    metaTitle: geoTitle('Orthognathic (Jaw) Surgery'),
    metaDescription:
      geoMetaDescription('Corrective jaw surgery', 'Planned jointly with your orthodontist.'),
    paragraph1: {
      title: 'Correcting Jaw Alignment',
      text: 'Orthognathic surgery corrects misaligned jaws to improve function, facial symmetry, and breathing, and our Trumbull office plans these cases for patients throughout Fairfield County. Treatment is planned jointly with your orthodontist, often alongside braces or aligners. Candidates are usually identified during orthodontic treatment, when it becomes clear that braces or aligners alone will not fully correct the underlying jaw relationship.',
    },
    paragraph2: {
      title: 'A Coordinated, Staged Process',
      text: 'Jaw surgery involves several stages — orthodontic preparation, surgical planning and imaging, the procedure itself, and a recovery period — and your surgical and orthodontic teams coordinate timing throughout. The consultation outlines what that sequence looks like for your case. Total treatment time is measured in months rather than weeks once orthodontic preparation is included, and your surgical and orthodontic teams set expectations for that timeline together early on.',
    },
    faqs: [
      {
        question: 'Is jaw surgery available to patients from other Fairfield County towns?',
        answer:
          'Yes. Orthognathic surgery patients travel to our Trumbull office from throughout Fairfield County, typically on a joint referral with their orthodontist. Contact us to schedule a consultation.',
      },
    ],
  },
  'sleep-apnea': {
    shortTitle: 'Sleep Apnea Surgery',
    title: geoTitle('Sleep Apnea Surgery'),
    description:
      'We evaluate the skeletal component of obstructive sleep apnea and discuss surgical options that may be appropriate for your specific case.',
    sectionTitle: 'Sleep Apnea Care for Fairfield County, CT',
    metaTitle: geoTitle('Sleep Apnea Surgery'),
    metaDescription:
      geoMetaDescription('Surgical evaluation for obstructive sleep apnea', undefined),
    paragraph1: {
      title: 'Surgical Options for Sleep Apnea',
      text: 'We evaluate and treat the skeletal component of obstructive sleep apnea for patients throughout Fairfield County from our Trumbull office, often for those who have been diagnosed and cannot tolerate CPAP. Bring your sleep study to the consultation so the surgeon can review it alongside your imaging and health history. Not every case of obstructive sleep apnea has a meaningful skeletal component, which is why a surgical evaluation is a distinct step from your original sleep study diagnosis.',
    },
    paragraph2: {
      title: 'What an Evaluation Involves',
      text: "The surgeon evaluates airway anatomy, jaw position, and your overall health to determine whether a surgical approach may improve airflow and reduce symptoms. Not every patient is a candidate for surgery, and alternatives are discussed when appropriate. If surgery isn't the right fit for your case, we'll say so directly and discuss what alternatives may be worth pursuing instead.",
    },
    faqs: [
      {
        question: 'What is the skeletal component of sleep apnea?',
        answer:
          'In some patients, the position or size of the jaw and related facial bones contributes to airway obstruction during sleep. Surgical evaluation focuses specifically on whether this skeletal component is a factor in your case.',
      },
      {
        question: 'Do I need a sleep study before a consultation?',
        answer:
          "A prior sleep study and diagnosis are typically part of the evaluation process, since surgical options are usually considered after CPAP or other first-line treatments haven't been tolerated or effective.",
      },
      {
        question: 'What surgical options might be considered for sleep apnea?',
        answer:
          'Depending on the evaluation, options may include jaw advancement procedures or other airway-related surgery. The surgeon explains which, if any, may be appropriate after reviewing your imaging and sleep study.',
      },
      {
        question: 'Will surgery replace my need for CPAP?',
        answer:
          'Not necessarily, and not for every patient. Whether surgery reduces or eliminates the need for CPAP depends on the individual case, and your surgeon will discuss realistic expectations based on your specific anatomy and diagnosis.',
      },
      {
        question: 'Is jaw surgery worth it for sleep apnea?',
        answer:
          'That depends on your specific anatomy, the severity of your sleep apnea, and how well other treatments have worked for you. It\'s a reasonable question to bring to your consultation — the surgeon can walk through the potential benefits and tradeoffs for your case specifically rather than in general terms.',
      },
      {
        question: 'What is the success rate of jaw surgery for sleep apnea?',
        answer:
          'Reported outcomes vary across studies depending on how success is defined — some measure a reduction in symptoms, others measure specific changes in sleep study results. Rather than quoting a single statistic, your surgeon can discuss what published research suggests for cases similar to yours and set realistic expectations at your consultation.',
      },
      {
        question: 'Will insurance cover jaw surgery for sleep apnea?',
        answer:
          'Coverage depends on your plan, your diagnosis, and whether prior treatments like CPAP have been tried and documented. Our team can review available benefit information, though coverage is not guaranteed and often requires prior authorization.',
      },
      {
        question: 'Can I be evaluated for sleep apnea surgery if I live outside Trumbull?',
        answer:
          'Yes. Sleep apnea patients travel to our Trumbull office from throughout Fairfield County. Bring your sleep study to the consultation so the surgeon can review it alongside your imaging and health history.',
      },
    ],
  },
  'tmj-disorder': {
    shortTitle: 'TMJ Disorder Treatment',
    title: geoTitle('TMJ Disorder Treatment'),
    description:
      'TMJ treatment addresses jaw pain, stiffness, and clicking associated with temporomandibular joint disorders, with the approach based on your symptoms and examination.',
    sectionTitle: 'TMJ Treatment for Fairfield County, CT',
    metaTitle: geoTitle('TMJ Disorder Treatment'),
    metaDescription:
      geoMetaDescription('TMJ disorder evaluation and treatment', undefined),
    paragraph1: {
      title: 'Symptoms We Evaluate',
      text: 'Our Trumbull office evaluates jaw pain, stiffness, clicking, and other symptoms of temporomandibular joint disorders for patients throughout Fairfield County. An examination and imaging help determine whether symptoms are related to the joint, the surrounding muscles, or another cause. Symptoms can range from an occasional click to persistent pain that affects eating and speaking, and the right next step depends heavily on where you fall on that range.',
    },
    paragraph2: {
      title: 'Treatment Options',
      text: "Treatment ranges from conservative measures like a night guard or physical therapy to surgical options for cases that don't improve, and the surgeon will explain which approach fits your symptoms and imaging findings. Follow-up is used to track whether a treatment is working before considering the next step. Most patients start with the most conservative option that's reasonable for their symptoms, and treatment is adjusted based on how you respond rather than jumping straight to the most involved approach.",
    },
    faqs: [
      {
        question: 'What causes TMJ disorders?',
        answer:
          'TMJ disorders can stem from a variety of causes, including jaw injury, arthritis, teeth grinding or clenching, and structural issues with the joint itself. An examination helps identify contributing factors in your case.',
      },
      {
        question: 'Is TMJ treatment always surgical?',
        answer:
          "No. Most TMJ symptoms are managed with conservative measures first, such as a night guard, physical therapy, or lifestyle changes. Surgery is considered only when conservative approaches haven't provided adequate relief.",
      },
      {
        question: 'Can stress make TMJ symptoms worse?',
        answer:
          'Stress-related jaw clenching or grinding is a commonly reported contributing factor for some patients, though the underlying cause of TMJ symptoms varies by individual and should be evaluated directly.',
      },
      {
        question: 'When should I see a specialist for jaw pain?',
        answer:
          'Consider an evaluation if jaw pain, clicking, or stiffness persists, worsens, or interferes with eating or speaking. Your dentist can also refer you if they notice signs of a TMJ disorder during a routine visit.',
      },
      {
        question: 'What is the "three-finger test" for TMJ?',
        answer:
          "It's a rough self-check some people use — fitting roughly three stacked fingers between your upper and lower front teeth when your mouth is fully open is sometimes cited as a general range-of-motion benchmark. It isn't a diagnostic test on its own, and a real evaluation looks at much more than mouth opening.",
      },
      {
        question: 'Does TMJ ever fully go away?',
        answer:
          "It varies by person. Some patients see symptoms improve significantly or resolve with conservative treatment, while others manage TMJ symptoms on an ongoing basis. There's no single outcome that applies to everyone, which is why treatment is based on your specific symptoms and response.",
      },
      {
        question: 'What else could be causing symptoms that feel like TMJ?',
        answer:
          'Sinus issues, ear infections, tooth problems, and certain headache patterns can all cause pain in a similar area and are sometimes mistaken for a TMJ disorder. An examination helps determine whether the joint itself, the surrounding muscles, or something else is the source.',
      },
      {
        question: 'Does insurance cover TMJ treatment?',
        answer:
          "Coverage depends on your specific plan, the treatment recommended, and whether it's classified as dental or medical by your insurer. Our team can review available benefit information, though full coverage is not guaranteed.",
      },
      {
        question: 'Is TMJ treatment available to patients outside Trumbull?',
        answer:
          'Yes. TMJ disorder patients travel to our Trumbull office from throughout Fairfield County. Contact us to schedule a consultation or confirm your location falls within our service area.',
      },
    ],
  },
  'minimally-invasive-orthognathic-surgery': {
    shortTitle: 'Minimally Invasive Jaw Surgery',
    title: geoTitle('Minimally Invasive Jaw Surgery'),
    description:
      'Minimally invasive orthognathic surgery offers jaw correction with smaller incisions than traditional approaches; recovery and outcomes vary by individual case.',
    sectionTitle: 'Minimally Invasive Jaw Surgery for Fairfield County, CT',
    metaTitle: geoTitle('Minimally Invasive Jaw Surgery'),
    metaDescription:
      geoMetaDescription('Minimally invasive orthognathic surgery', 'Smaller incisions, coordinated recovery.'),
    paragraph1: {
      title: 'A Less Invasive Approach to Jaw Correction',
      text: 'Minimally invasive orthognathic surgery offers jaw correction with smaller incisions and a different recovery profile than traditional approaches, and our Trumbull office evaluates candidacy for patients throughout Fairfield County. Not every case is suited to a minimally invasive approach; imaging and a surgical consultation determine what fits your anatomy. The appeal for many patients is a different recovery experience compared to traditional jaw surgery, though the underlying correction being made is often similar.',
    },
    paragraph2: {
      title: 'Coordinated Planning With Your Orthodontist',
      text: 'As with traditional jaw surgery, treatment is planned jointly with your orthodontist and typically involves orthodontic preparation before the surgical date. The consultation reviews whether a minimally invasive approach is appropriate for your case and what recovery may involve. Your surgeon will be direct about whether your specific case is a good match for this approach — not every jaw correction can be accomplished this way, and forcing the wrong case into it is not the goal.',
    },
    faqs: [
      {
        question: 'Can patients outside Trumbull get minimally invasive jaw surgery here?',
        answer:
          'Yes. Patients travel to our Trumbull office from throughout Fairfield County for minimally invasive orthognathic surgery consultations, often on a joint referral with their orthodontist.',
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
