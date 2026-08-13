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
    heading: string;
    primaryKeyword: string;
    /** Why this service, in this town. Must not be reusable elsewhere. */
    localAngle: string;
    clinicalIntro: {
      title: string;
      paragraphs: string[];
    };
    evaluationReasons: string[];
    visitSteps: {
      title: string;
      description: string;
    }[];
    localLogistics: {
      title: string;
      description: string;
    };
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
      {
        slug: "wisdom-teeth-removal",
        page: {
          heading: "Wisdom Teeth Removal",
          primaryKeyword: "wisdom teeth removal Fairfield CT",
          localAngle:
            "Fairfield patients often begin with a referral from their dentist or orthodontist. Our Trumbull office is about 15 minutes from Fairfield center, and we can review available imaging, coordinate treatment timing, and explain whether removal or continued monitoring makes sense for your wisdom teeth.",
          clinicalIntro: {
            title: "When wisdom teeth should be evaluated",
            paragraphs: [
              "Wisdom teeth may be monitored when they have fully erupted, remain healthy and functional, and can be cleaned effectively. An evaluation becomes more important when a tooth is impacted, painful, swollen, difficult to clean, affected by decay or gum disease, or positioned where it may damage a neighboring tooth.",
              "An examination and current imaging help distinguish a wisdom tooth that can be watched from one that may be better removed. When surgery is recommended, the plan covers which teeth need treatment, the expected complexity, anesthesia choices, and the recovery instructions that apply to your case.",
            ],
          },
          evaluationReasons: [
            "Pain, swelling, or repeated tenderness behind the last molar",
            "A partially erupted or impacted tooth that is difficult to clean",
            "Decay, gum disease, infection, or damage near another tooth",
            "A dentist or orthodontist recommends imaging before treatment",
          ],
          visitSteps: [
            {
              title: "Review records and X-rays",
              description:
                "We examine the wisdom teeth and review available imaging from your Fairfield dentist or orthodontist. Additional imaging is recommended only when it is needed to plan safely.",
            },
            {
              title: "Build the treatment plan",
              description:
                "The surgeon explains whether monitoring or removal is appropriate, which teeth are involved, and what anesthesia options fit the procedure and your health history.",
            },
            {
              title: "Recover with clear instructions",
              description:
                "You receive written guidance for rest, swelling, diet, oral hygiene, medications, and when to call. Follow-up is arranged when the surgeon wants to check healing.",
            },
          ],
          localLogistics: {
            title: "Plan around school, work, and the ride home",
            description:
              "The office is about 15 minutes from Fairfield center; allow more time from Southport and the beach neighborhoods during commuter hours. If IV sedation is part of the plan, a responsible adult must drive you home and stay with you afterward. Surface parking is directly outside the entrance for pickup.",
          },
          faqs: [
            {
              question: "Do all wisdom teeth need to be removed?",
              answer:
                "No. Wisdom teeth that are fully erupted, functional, healthy, and easy to clean may sometimes be monitored. An examination and imaging help the surgeon assess infection, decay, gum disease, damage to nearby teeth, and other reasons removal may be recommended.",
            },
            {
              question: "How far is wisdom teeth removal from Fairfield?",
              answer:
                "Our Trumbull office is about 15 minutes from Fairfield center. Travel time can be longer from Southport and the beach neighborhoods during commuter hours, so leave additional time for a scheduled appointment.",
            },
            {
              question: "Can you coordinate with my Fairfield orthodontist?",
              answer:
                "Yes. We can request available records and imaging and coordinate treatment timing with your orthodontist or general dentist, particularly when wisdom teeth are being evaluated alongside braces or aligners.",
            },
            {
              question: "Is IV sedation available for wisdom teeth removal?",
              answer:
                "IV sedation is available in-house for appropriate patients and procedures. The surgeon will review your health history, the planned procedure, and your anesthesia options; a responsible adult must drive you home after IV sedation.",
            },
            {
              question: "How long does wisdom teeth removal take?",
              answer:
                "The surgery itself is usually brief, often 30 to 60 minutes, but the exact time depends on how many teeth are being removed, how impacted they are, and the type of anesthesia used. Plan for additional time at the office before and after the procedure for preparation and recovery from sedation; your surgeon can give a more specific estimate at your consultation.",
            },
            {
              question: "What can you eat after wisdom teeth removal?",
              answer:
                "For the first day or two, cool, soft foods that need little to no chewing are typically recommended — yogurt, applesauce, mashed potatoes, and smoothies eaten with a spoon rather than a straw work well. Most patients can add more substantial soft foods over the following days and return to a normal diet within one to two weeks, though healing time varies with how many teeth were removed and how impacted they were. Always follow the specific discharge instructions your surgeon gives you.",
            },
            {
              question: "How long after wisdom teeth removal can I eat?",
              answer:
                "Most patients can start with cool liquids and soft foods once bleeding has settled and any numbness from local anesthesia has worn off, often within a few hours of surgery. If you had IV sedation, follow the specific eating and drinking instructions in your discharge paperwork, since those can be stricter than the general timeline.",
            },
          ],
          seo: {
            title:
              "Wisdom Teeth Removal Fairfield, CT | Facial Surgery Center",
            description:
              "Wisdom teeth removal for Fairfield, CT patients at our Trumbull oral surgery office, about 15 minutes away. Consultations, imaging, and IV sedation options.",
          },
        },
      },
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
        "Oral and maxillofacial surgeons serving Fairfield, CT, about 15 minutes away. Wisdom teeth removal, dental implants and facial trauma evaluation.",
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
      {
        slug: "dental-implants",
        page: {
          heading: "Dental Implants",
          primaryKeyword: "dental implants Shelton CT",
          localAngle:
            "Shelton patients considering dental implants can reach our Trumbull office in about 13 minutes. We plan the surgical portion around the missing-tooth site, available bone, and the restoration your dentist will provide, then coordinate the stages so everyone is working from the same plan.",
          clinicalIntro: {
            title: "How dental implant treatment is planned",
            paragraphs: [
              "A dental implant is placed in the jaw to support a replacement tooth. After the implant heals and becomes stable in the surrounding bone, a restorative dentist attaches the crown, bridge, or implant-supported denture that you use for chewing and speaking.",
              "Planning begins with an examination and appropriate imaging of the proposed site. The surgeon evaluates bone quantity and quality, nearby anatomy, gum health, and your medical history before explaining whether the implant can be placed directly or whether grafting or another preparatory step may be recommended.",
            ],
          },
          evaluationReasons: [
            "A missing tooth makes chewing or speaking less comfortable",
            "A tooth cannot be predictably restored and replacement is being planned",
            "A bridge or denture no longer fits the way it should",
            "Your dentist needs a surgical opinion about bone or implant position",
          ],
          visitSteps: [
            {
              title: "Evaluate the implant site",
              description:
                "The surgeon reviews your health history, examines the area, and studies available imaging to understand the bone and the space available for the planned restoration.",
            },
            {
              title: "Place the implant or prepare the site",
              description:
                "Depending on the findings, treatment may involve implant placement, bone grafting, or a staged sequence. Anesthesia options are reviewed before any procedure is scheduled.",
            },
            {
              title: "Heal and complete the restoration",
              description:
                "We monitor surgical healing and share the relevant information with your restorative dentist, who completes the crown, bridge, or denture when the site is ready.",
            },
          ],
          localLogistics: {
            title: "A shorter route for staged implant care",
            description:
              "Implant care may involve planning, surgery, healing checks, and coordination with your restorative dentist. Shelton and Trumbull share a border, so the approximately 13-minute trip makes those separate visits easier to fit into a treatment sequence. We can exchange records and planning details directly with your Shelton dentist.",
          },
          faqs: [
            {
              question: "How close is dental implant treatment to Shelton?",
              answer:
                "Our Trumbull office is about 13 minutes from Shelton. Because implant treatment may include planning, surgery, and follow-up visits, the short drive is useful for keeping each stage on schedule.",
            },
            {
              question: "What happens at a dental implant consultation?",
              answer:
                "The surgeon reviews your health history, examines the missing-tooth area, and evaluates available imaging. You will receive an explanation of the proposed implant placement, whether additional imaging or grafting may be needed, and how surgery will coordinate with your restorative dentist.",
            },
            {
              question: "Will I need a bone graft before an implant?",
              answer:
                "Not everyone needs a bone graft. The decision depends on the quantity and quality of bone at the planned implant site, and imaging may be recommended so the surgeon can explain whether grafting is part of your treatment sequence.",
            },
            {
              question: "Do you coordinate with dentists in Shelton?",
              answer:
                "Yes. We can coordinate implant position, surgical timing, records, and follow-up information with your Shelton dentist so the surgical and restorative parts of treatment follow the same plan.",
            },
          ],
          seo: {
            title: "Dental Implants Shelton, CT | Facial Surgery Center",
            description:
              "Dental implants for Shelton, CT patients at our Trumbull office, about 13 minutes away. Implant planning, bone evaluation and restorative coordination.",
          },
        },
      },
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
      {
        slug: "tooth-extractions",
        page: {
          heading: "Tooth Extractions",
          primaryKeyword: "tooth extractions Bridgeport CT",
          localAngle:
            "Bridgeport patients who need a tooth extraction can reach our Trumbull office in about 10 minutes. You can contact us directly even without a regular dentist; we evaluate the source of the problem, review the tooth and available imaging, and explain the appropriate next step before treatment is scheduled.",
          clinicalIntro: {
            title: "When removing a tooth becomes the right next step",
            paragraphs: [
              "Extraction may be considered when a tooth is too damaged or decayed to restore predictably, when infection cannot be resolved another way, or when an impacted or poorly positioned tooth is causing a problem. The examination determines whether the tooth can be removed routinely or requires a surgical approach.",
              "Planning also considers what happens after the tooth is removed. Depending on the location and your goals, the next step may be healing without replacement or coordinating a dental implant, bridge, or denture with your restorative dentist.",
            ],
          },
          evaluationReasons: [
            "Persistent tooth pain, swelling, drainage, or signs of infection",
            "A cracked or decayed tooth that may not be restorable",
            "An impacted, broken, or difficult-to-access tooth",
            "A dentist recommends removal before restorative or orthodontic care",
          ],
          visitSteps: [
            {
              title: "Assess the tooth and symptoms",
              description:
                "The surgeon examines the area, reviews your medical and dental history, and evaluates appropriate imaging to understand the tooth and surrounding structures.",
            },
            {
              title: "Plan the extraction and anesthesia",
              description:
                "You receive an explanation of the recommended approach, expected complexity, anesthesia choices, and the preparation required before the procedure.",
            },
            {
              title: "Protect healing and plan what follows",
              description:
                "We provide post-operative instructions and explain when follow-up is needed. When replacement is appropriate, we coordinate the surgical timeline with your dentist.",
            },
          ],
          localLogistics: {
            title: "Getting evaluated without a regular dentist",
            description:
              "Bridgeport patients can request a consultation directly, although insurance rules may still require a referral or authorization. Call before traveling so the team can review your symptoms and the earliest appropriate appointment. The office is about 10 minutes from downtown and even closer to parts of the North End and Brooklawn.",
          },
          faqs: [
            {
              question: "Can I book an extraction without a regular dentist?",
              answer:
                "Yes. Bridgeport patients can request a consultation directly without a dentist's referral, although some insurance plans may require a referral or prior authorization. Call the office and describe your symptoms so the team can advise the earliest appropriate appointment.",
            },
            {
              question: "Can I get a same-day tooth extraction?",
              answer:
                "Same-day treatment is not guaranteed. Timing depends on the clinical problem, the examination, imaging needs, your medical history, anesthesia planning, and the surgical schedule, so call before traveling to the office.",
            },
            {
              question: "What makes an extraction surgical?",
              answer:
                "An extraction may require a surgical approach when a tooth is impacted, broken near the gumline, difficult to access, or surrounded by bone that must be managed carefully. The surgeon will explain the recommended approach after examining the tooth and reviewing appropriate imaging.",
            },
            {
              question: "What anesthesia options are available?",
              answer:
                "The appropriate anesthesia depends on the tooth, the expected complexity of the procedure, your health history, and your preferences. The surgeon will review suitable options during the consultation, including whether IV sedation is appropriate.",
            },
          ],
          seo: {
            title:
              "Tooth Extractions Bridgeport, CT | Facial Surgery Center",
            description:
              "Tooth extractions for Bridgeport, CT patients at our Trumbull oral surgery office, about 10 minutes away. Contact us directly; insurance referral rules vary.",
          },
        },
      },
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
      "For patients who have put off treatment because of anxiety, it is worth knowing that we offer anesthesia options in-house. IV sedation may be appropriate for some extraction and implant cases; the surgeon reviews the expected level of sedation, possible recall, risks, and alternatives during treatment planning.",
    ],
    referralNote:
      "We accept referrals from general dentists, prosthodontists, and denturists throughout Stratford, and we plan surgical and restorative sequencing jointly with your dentist's office.",
    services: [
      {slug: "dental-implants"},
      {
        slug: "teeth-in-a-day",
        page: {
          heading: "Teeth in a Day (All-On-X) Implants",
          primaryKeyword: "teeth in a day Stratford CT",
          localAngle:
            "Stratford patients whose teeth have been failing gradually — a bridge that can no longer be saved, a denture that no longer fits, or a full arch that needs to be planned from scratch — can reach our Trumbull office in about 12 minutes. We plan the surgical side of a full-arch case and coordinate the final restoration with your dentist or prosthodontist, with anesthesia handled in-house.",
          clinicalIntro: {
            title: "How Teeth in a Day (All-On-X) works",
            paragraphs: [
              "Teeth in a Day is a full-arch treatment approach that may use as few as four strategically placed implants to support replacement teeth. For eligible patients, a temporary fixed set may be attached on the day of surgery when bone support, implant stability, and the overall treatment plan make immediate loading appropriate. If it is not appropriate, the surgical and restorative teams explain the temporary replacement plan before treatment.",
              "Planning starts with an examination and 3D imaging of the jaw to evaluate remaining teeth, gum health, and available bone. The surgeon determines implant number and position for the arch, and works directly with your restorative dentist or prosthodontist, who designs and fits the final restoration after the appropriate healing period.",
            ],
          },
          evaluationReasons: [
            "A full arch of teeth is failing, missing, or beyond saving",
            "A denture is loose, uncomfortable, or no longer functional",
            "You want a fixed replacement rather than a removable denture",
            "A prosthodontist or dentist wants a surgical opinion on a full-arch implant case",
          ],
          visitSteps: [
            {
              title: "Evaluate the arch and take a 3D scan",
              description:
                "The surgeon examines remaining teeth, gum, and bone health, and reviews or orders 3D imaging to plan implant number and position for the arch.",
            },
            {
              title: "Place the implants and, when appropriate, a temporary set",
              description:
                "On surgery day, remaining teeth may be removed when needed and the planned implants are placed. A temporary fixed set may be attached that day when the implants have sufficient stability; otherwise, the team follows the alternative temporary plan discussed before surgery.",
            },
            {
              title: "Heal and complete the final restoration",
              description:
                "After the appropriate healing period, your restorative dentist or prosthodontist fits the final full-arch restoration in coordination with the surgical team.",
            },
          ],
          localLogistics: {
            title: "Fewer trips for a staged full-arch case",
            description:
              "Teeth in a Day treatment involves a consultation, imaging, surgery day, and a healing check before the final restoration is fitted. Stratford is about 12 minutes from our Trumbull office, on the same side of town as Oronoque, so those staged visits are easier to fit around work or family schedules. If IV sedation is part of your surgery day, a responsible adult must drive you home and stay with you afterward.",
          },
          faqs: [
            {
              question: "How does Teeth in a Day work?",
              answer:
                "A full arch of failing or missing teeth may be replaced with a restoration supported by as few as four implants. When clinical conditions allow immediate loading, a temporary fixed set may be attached on the day of surgery. After healing, the restorative dentist fits the final restoration.",
            },
            {
              question: "How close is Stratford to a Teeth in a Day consultation?",
              answer:
                "Our Trumbull office is about 12 minutes from Stratford. Because Teeth in a Day involves a consultation, imaging, surgery, and follow-up visits, the short drive helps keep each stage on schedule.",
            },
            {
              question: "Will I leave surgery without teeth?",
              answer:
                "A same-day fixed temporary set is not guaranteed. It depends on bone support, implant stability, healing considerations, and the treatment plan developed with the restorative dentist. Before surgery, the team explains whether a fixed temporary set is appropriate and what alternative temporary option would be used if it is not.",
            },
            {
              question: "Do you coordinate with my Stratford prosthodontist or denturist?",
              answer:
                "Yes. We can coordinate implant position, surgical timing, and healing information with your prosthodontist or denturist so the surgical and restorative parts of a full-arch case follow the same plan.",
            },
          ],
          seo: {
            title: "Teeth in a Day Stratford, CT | Facial Surgery Center",
            description:
              "Teeth in a Day (All-On-X) dental implants for Stratford, CT patients at our Trumbull office, about 12 minutes away. Full-arch planning and in-house IV sedation.",
          },
        },
      },
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
      {
        slug: "wisdom-teeth-removal",
        page: {
          heading: "Wisdom Teeth Removal",
          primaryKeyword: "wisdom teeth removal Monroe CT",
          localAngle:
            "Monroe families often begin with a referral from their child's orthodontist, since wisdom teeth are typically evaluated between ages sixteen and nineteen — often while braces or aligners are still in the picture. Our Trumbull office is about 10 minutes from Monroe center with no highway involved, and we coordinate directly with your orthodontist on timing so a wisdom tooth consultation doesn't derail an orthodontic plan already in progress.",
          clinicalIntro: {
            title: "Why timing matters for teen wisdom teeth",
            paragraphs: [
              "The right time to remove a wisdom tooth is usually before the roots are fully formed, when recovery tends to be faster and complications less likely. That window often falls between ages sixteen and nineteen, which is also when many Monroe teens are still working through orthodontic treatment — so we look at the panoramic X-ray, the stage of root development, and where things stand with braces or aligners together, rather than in isolation.",
              "If your child's orthodontist has already flagged third molars, bringing that panoramic X-ray to the consultation usually lets us give a clear answer — evaluate now, revisit in a year, or schedule removal — in a single visit.",
            ],
          },
          evaluationReasons: [
            "An orthodontist has flagged third molars as a concern for an active treatment plan",
            "A wisdom tooth is impacted, painful, or causing swelling behind the last molar",
            "Root development is at the stage where removal is typically easier and recovery faster",
            "A dentist recommends imaging to check on developing wisdom teeth",
          ],
          visitSteps: [
            {
              title: "Review the panoramic X-ray",
              description:
                "We look at existing imaging from your dentist or orthodontist to see how far the wisdom teeth have developed and whether there's a clear path to plan around braces or aligners.",
            },
            {
              title: "Coordinate timing with the orthodontist",
              description:
                "When removal is recommended, we work directly with your child's orthodontist so the surgery date fits the orthodontic plan rather than working against it.",
            },
            {
              title: "Schedule for a full recovery day",
              description:
                "Most teen cases are scheduled Monday, Tuesday, or Thursday, early in the morning, so recovery lands on a full day and no one is fasting through lunch before sedation.",
            },
          ],
          localLogistics: {
            title: "A straight ten-minute drive, no highway",
            description:
              "The office is about 10 minutes from Monroe center with no highway merges — one of the simplest drives in our service area. We schedule most teen wisdom teeth cases for Monday, Tuesday, or Thursday mornings so recovery starts on a full day rather than a half day, and IV sedation appointments are timed so patients aren't fasting through lunch.",
          },
          faqs: [
            {
              question: "When should my teen have a wisdom teeth consultation?",
              answer:
                "A consultation is often considered between ages sixteen and nineteen, but timing depends on tooth development and symptoms. Bring recent panoramic imaging if available; the surgeon may recommend additional imaging or follow-up before making a treatment recommendation.",
            },
            {
              question: "Can wisdom teeth be removed while my teen has braces?",
              answer:
                "Often yes, and sometimes it has to be. We coordinate directly with your orthodontist so the timing fits the overall plan rather than disrupting it.",
            },
            {
              question: "Which days are best for wisdom teeth surgery?",
              answer:
                "Monday, Tuesday, or Thursday tend to work well — we're open until 5pm those days, which means recovery starts on a full day. We also try to book teen cases early in the morning so nobody is fasting through lunch before sedation.",
            },
            {
              question: "How far is the office from Monroe?",
              answer:
                "About 10 minutes from Monroe center, with no highway involved. Add a few minutes from Stepney and Stevenson.",
            },
          ],
          seo: {
            title: "Wisdom Teeth Removal Monroe, CT | Facial Surgery Center",
            description:
              "Wisdom teeth removal for Monroe, CT teens and families at our Trumbull office, about 10 minutes away. Orthodontist coordination and in-house IV sedation.",
          },
        },
      },
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
      {
        slug: "wisdom-teeth-removal",
        page: {
          heading: "Wisdom Teeth Removal",
          primaryKeyword: "wisdom teeth removal Easton CT",
          localAngle:
            "Easton families often already travel to Fairfield or Trumbull for dental care, and most arrive at our office with a referral and imaging already in hand. Wisdom teeth evaluations tend to cluster around junior and senior year at Joel Barlow, which also draws from Redding — so we work from your dentist's existing records and coordinate scheduling around a shared regional school calendar rather than starting over.",
          clinicalIntro: {
            title: "Evaluating wisdom teeth without repeating work already done",
            paragraphs: [
              "Because Easton has no hospital and limited dental specialists in town, most patients already have a relationship with a dentist in Fairfield or Trumbull and arrive with existing X-rays or a panoramic image. We review what your dentist has already gathered rather than ordering new imaging by default, and we send our findings back to that office promptly so nothing has to be repeated.",
              "For Joel Barlow students — and the Redding families who share the same school calendar — wisdom teeth evaluations tend to cluster around junior and senior year. Because that calendar is shared across two towns, we'd rather book the consultation early than try to fit it into a narrow school break.",
            ],
          },
          evaluationReasons: [
            "A dentist has recommended a wisdom teeth evaluation using existing imaging",
            "A wisdom tooth is impacted, painful, or swollen behind the last molar",
            "Your teen is approaching junior or senior year and timing needs to work around the school calendar",
            "You want a surgical opinion before committing to a school-break appointment window",
          ],
          visitSteps: [
            {
              title: "Send or bring existing records",
              description:
                "We review the X-rays and notes your dentist already has rather than ordering new imaging by default, so the first visit builds on what's already been done.",
            },
            {
              title: "Get a clear recommendation",
              description:
                "The surgeon explains whether the wisdom teeth can be monitored or should be scheduled for removal, and what the timing looks like around your teen's school calendar.",
            },
            {
              title: "Plan around the shared school calendar",
              description:
                "Because Joel Barlow draws from both Easton and Redding, we help you book surgery with enough lead time to avoid competing for the same narrow break window as other families.",
            },
          ],
          localLogistics: {
            title: "Closer than Danbury or Norwalk, entirely on local roads",
            description:
              "The drive from Easton center is about 12 minutes, entirely on local roads with no highway. For most Easton addresses we're noticeably closer than the practices toward Danbury or Norwalk — a gap that matters most for cases needing more than one visit. Add roughly five minutes from Aspetuck and North Easton.",
          },
          faqs: [
            {
              question: "Can you use the X-rays my dentist already took?",
              answer:
                "Recent imaging may be usable if it clearly shows what the planned evaluation or procedure requires. Send or bring the images for review; the surgeon may recommend additional imaging when more detail or a newer view is needed.",
            },
            {
              question: "How far is wisdom teeth removal from Easton?",
              answer:
                "About 12 minutes from Easton center, entirely on local roads. Add roughly five minutes from Aspetuck and North Easton.",
            },
            {
              question: "Is Trumbull closer than Danbury or Norwalk for wisdom teeth removal?",
              answer:
                "For most Easton addresses, yes — noticeably so. That gap matters most when a case needs more than one visit, which is common with wisdom teeth evaluation and any follow-up care.",
            },
            {
              question: "How early should we book around the Joel Barlow school calendar?",
              answer:
                "Earlier than you think. Joel Barlow draws from Redding as well as Easton, and surgical scheduling around a shared calendar is easier with lead time than during a break.",
            },
          ],
          seo: {
            title: "Wisdom Teeth Removal Easton, CT | Facial Surgery Center",
            description:
              "Wisdom teeth removal for Easton, CT patients at our Trumbull office, about 12 minutes away on local roads. We work from your dentist's existing records.",
          },
        },
      },
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
  {
    slug: "westport",
    town: "Westport",
    county: "Fairfield County",
    primaryKeyword: "oral surgeon Westport CT",
    tagline: "20 minutes on the Merritt Parkway",
    summary:
      "A straightforward run up the Merritt Parkway from the shoreline. Westport patients most often reach us on a referral from their dentist or orthodontist for implant, wisdom teeth, or full-arch care.",
    driveTime: "about 20 minutes",
    neighborhoods: [
      "Downtown Westport",
      "Saugatuck",
      "Compo Beach",
      "Greens Farms",
      "Coleytown",
      "Old Hill",
    ],
    localContext: [
      "Westport sits at the edge of the area we serve regularly, about 20 minutes north on the Merritt Parkway rather than along I-95. It is a parkway drive without highway merges, which patients tend to find less stressful before a surgical appointment than the shoreline route through Norwalk.",
      "Westport already has established dental and oral surgery options closer to the coast, so patients who make the trip to us usually have a specific reason: a referring dentist they already trust, a second opinion on a complex implant or full-arch case, or in-house IV sedation for a procedure their local office refers out. We work directly from the imaging and records your dentist already has rather than starting over.",
      "Staples High School is the town's only public high school, and we see the same clustering of wisdom teeth evaluations around junior and senior year that we see in other towns with a single large high school. We coordinate timing with your family's orthodontist when braces or aligners are part of the picture, and we are glad to work from a referral your dentist sends ahead of the visit.",
    ],
    referralNote:
      "We accept referrals from general dentists and orthodontists in Westport and work from your dentist's existing records and imaging where possible to keep the visit to a single trip.",
    services: [
      {slug: "dental-implants"},
      {slug: "teeth-in-a-day"},
      {slug: "wisdom-teeth-removal"},
      {slug: "tooth-extractions"},
      {slug: "dental-bone-grafting"},
      {slug: "anesthesia"},
    ],
    faqs: [
      {
        question: "How long is the drive from Westport?",
        answer:
          "About 20 minutes on the Merritt Parkway, with no highway merges. It is a similar drive whether you are coming from downtown, Saugatuck, or Greens Farms.",
      },
      {
        question: "Do I need a referral from my Westport dentist?",
        answer:
          "Not necessarily — you can request a consultation directly. That said, many Westport patients do arrive with a referral, and if you have one we will request your dentist's records and imaging so the visit does not start from scratch.",
      },
      {
        question: "Can you offer a second opinion on a treatment plan?",
        answer:
          "Yes. Bring any existing imaging or notes from your dentist and the surgeon can review the plan, discuss alternatives, and explain the reasoning before anything is scheduled.",
      },
      {
        question: "Is IV sedation available for Westport patients?",
        answer:
          "Yes, IV sedation is offered in-house for appropriate patients and procedures. A responsible adult is required to drive you home and stay with you afterward.",
      },
      ...COMMON_LOCATION_FAQS,
    ],
    seo: {
      title: "Oral Surgeon in Westport, CT | Facial Surgery Center",
      description:
        "Oral and maxillofacial surgeons about 20 minutes from Westport, CT via the Merritt Parkway. Dental implants, wisdom teeth removal and in-house IV sedation.",
    },
  },
  {
    slug: "derby",
    town: "Derby",
    county: "New Haven County",
    primaryKeyword: "oral surgeon Derby CT",
    tagline: "18 minutes up Route 8",
    summary:
      "Connecticut's smallest city, just past Shelton on Route 8. Derby sends us a steady mix of emergency referrals from Griffin Hospital and routine restorative cases.",
    driveTime: "about 18 minutes",
    neighborhoods: [
      "Downtown Derby",
      "Derby Greenway",
      "Hilltop",
      "the Housatonic riverfront",
      "the Shelton border",
    ],
    localContext: [
      "Derby is the smallest city in Connecticut, and the drive from our office is a straight shot up Route 8 through Shelton — a couple of minutes longer than our Shelton patients, on the same road. Downtown Derby and the Greenway sit right along the Housatonic and Naugatuck rivers, and the Hilltop section above it is a short climb from there.",
      "Griffin Hospital, on Division Street, is the city's hospital, and we coordinate with its emergency department on facial injuries and dental trauma that need surgical follow-up after a patient has been stabilized. If you were seen at Griffin and referred out for an extraction, biopsy, or fracture repair, our team can request the imaging and notes directly so you are not repeating the workup.",
      "Derby High School on Chatfield Street is the city's only public high school, and we see the usual clustering of wisdom teeth evaluations among juniors and seniors. Most adult patients from Derby arrive through a general dentist in the Lower Naugatuck Valley rather than searching cold, and we work from whatever records that office has already gathered.",
    ],
    referralNote:
      "We accept referrals from Griffin Hospital's emergency department and from general dentists throughout the Lower Naugatuck Valley, and we request existing imaging and records so the first visit does not start from scratch.",
    services: [
      {slug: "facial-trauma"},
      {slug: "tooth-extractions"},
      {slug: "wisdom-teeth-removal"},
      {slug: "dental-implants"},
      {slug: "oral-pathology"},
      {slug: "anesthesia"},
    ],
    faqs: [
      {
        question: "How long is the drive from Derby?",
        answer:
          "About 18 minutes, straight up Route 8 through Shelton. It is the same road our Shelton patients use, just a few minutes further.",
      },
      {
        question: "Do you coordinate with Griffin Hospital?",
        answer:
          "Yes. If you were seen in Griffin Hospital's emergency department and referred for oral or facial surgery follow-up, we can request your imaging and notes directly so the visit builds on what was already done rather than repeating it.",
      },
      {
        question: "Can I be seen for a dental emergency without a referral?",
        answer:
          "Yes, you can request a consultation directly. Call the office and describe your symptoms so the team can advise on urgency and the earliest appropriate appointment.",
      },
      {
        question: "Is this closer than driving to New Haven?",
        answer:
          "For most Derby addresses, yes — Trumbull is a more direct trip up Route 8 than crossing over to New Haven, especially outside of rush hour.",
      },
      ...COMMON_LOCATION_FAQS,
    ],
    seo: {
      title: "Oral Surgeon in Derby, CT | Facial Surgery Center",
      description:
        "Oral and maxillofacial surgeons about 18 minutes from Derby, CT via Route 8. Facial trauma, wisdom teeth removal, dental implants and emergency extractions.",
    },
  },
  {
    slug: "norwalk",
    town: "Norwalk",
    county: "Fairfield County",
    primaryKeyword: "oral surgeon Norwalk CT",
    tagline: "26 minutes via the Merritt Parkway",
    summary:
      "A larger coastal city past Westport on the Merritt Parkway. Norwalk patients most often reach us through a referring dentist for implant, wisdom teeth, or full-arch care.",
    driveTime: "about 26 minutes",
    neighborhoods: [
      "East Norwalk",
      "South Norwalk (SoNo)",
      "Cranbury",
      "Rowayton",
      "Silvermine",
    ],
    localContext: [
      "Norwalk is about 26 minutes from our office, a few minutes past Westport on the same Merritt Parkway route, which most patients find easier than fighting I-95 traffic along the shoreline. Cranbury, in the city's northeast corner, is often the fastest of Norwalk's neighborhoods to reach; South Norwalk and East Norwalk add a bit more time.",
      "Norwalk already has its own dental and oral surgery practices, including options near Norwalk Hospital, so patients who make the trip to us usually have a specific reason: a referring dentist they already trust, a second opinion on a complex case, or in-house IV sedation for a procedure their local office refers out. We work from the imaging and records your dentist already has rather than starting over.",
      "Norwalk High School and Brien McMahon High School are the city's two public high schools, and we see the same pattern of wisdom teeth evaluations clustering around junior and senior year that we see elsewhere. We coordinate timing with your family's orthodontist when braces or aligners are part of the picture.",
    ],
    referralNote:
      "We accept referrals from general dentists and orthodontists in Norwalk and work from your dentist's existing records and imaging where possible to keep the visit to a single trip.",
    services: [
      {slug: "wisdom-teeth-removal"},
      {slug: "dental-implants"},
      {slug: "teeth-in-a-day"},
      {slug: "tooth-extractions"},
      {slug: "facial-trauma"},
      {slug: "anesthesia"},
    ],
    faqs: [
      {
        question: "How long is the drive from Norwalk?",
        answer:
          "About 26 minutes via the Merritt Parkway, roughly the same route as our Westport patients with a few extra minutes depending on which part of Norwalk you're coming from.",
      },
      {
        question: "Why drive to Trumbull when Norwalk has its own oral surgeons?",
        answer:
          "Most Norwalk patients we see have a specific reason — a referring dentist they already work with, a second opinion on a complex implant or full-arch case, or in-house IV sedation their local office doesn't offer.",
      },
      {
        question: "Do I need a referral from my Norwalk dentist?",
        answer:
          "Not necessarily — you can request a consultation directly. If you have a referring dentist, we will request their records and imaging so the visit does not start from scratch.",
      },
      {
        question: "Is IV sedation available for Norwalk patients?",
        answer:
          "Yes, IV sedation is offered in-house for appropriate patients and procedures. A responsible adult is required to drive you home and stay with you afterward.",
      },
      ...COMMON_LOCATION_FAQS,
    ],
    seo: {
      title: "Oral Surgeon in Norwalk, CT | Facial Surgery Center",
      description:
        "Oral and maxillofacial surgeons about 26 minutes from Norwalk, CT via the Merritt Parkway. Dental implants, wisdom teeth removal and in-house IV sedation.",
    },
  },
  {
    slug: "stamford",
    town: "Stamford",
    county: "Fairfield County",
    primaryKeyword: "oral surgeon Stamford CT",
    tagline: "34 minutes via I-95",
    summary:
      "The farthest town we serve regularly, about 34 minutes down I-95. Stamford patients usually come to us for a second opinion or a complex case their local office refers out.",
    driveTime: "about 34 minutes",
    neighborhoods: [
      "Downtown Stamford",
      "Springdale",
      "Glenbrook",
      "the Cove",
      "Shippan",
    ],
    localContext: [
      "Stamford is the farthest town we serve on a regular basis, about 34 minutes south on I-95. Because it's a longer trip, we try to be efficient with it: consultation, imaging review, and treatment planning happen in a single visit wherever possible, and we schedule surgical and follow-up appointments to minimize the number of separate drives.",
      "Stamford is Fairfield County's largest city and already has established oral surgery practices of its own, so patients who travel to Trumbull usually have a specific reason — a referring dentist they already trust, a second opinion on a complex implant or full-arch case, or in-house IV sedation for a procedure their local office refers out. Between Westhill, Stamford High, and AITE, the city has three large public high schools, and we see the same wisdom teeth evaluation pattern among juniors and seniors that we see in other towns.",
      "I-95 traffic is the main variable for Stamford patients — build in a buffer, especially for morning appointments. A sedation appointment that starts significantly late usually has to be rescheduled rather than simply running behind.",
    ],
    referralNote:
      "We accept referrals from general dentists and prosthodontists in Stamford, and we consolidate visits where possible to reduce the number of trips a longer drive requires.",
    services: [
      {slug: "dental-implants"},
      {slug: "teeth-in-a-day"},
      {slug: "tooth-extractions"},
      {slug: "dental-bone-grafting"},
      {slug: "wisdom-teeth-removal"},
      {slug: "anesthesia"},
    ],
    faqs: [
      {
        question: "How long is the drive from Stamford?",
        answer:
          "About 34 minutes via I-95 in normal traffic. Build in extra time for the trip — I-95 is the main variable, and a late arrival can affect sedation appointments in particular.",
      },
      {
        question: "Can visits be combined to reduce trips from Stamford?",
        answer:
          "Sometimes. Whether a consultation, scan, and treatment planning can be combined depends on the records available and the complexity of the case. Ask when you schedule and we will do what we can to minimize separate trips.",
      },
      {
        question: "Why travel to Trumbull when Stamford has its own oral surgeons?",
        answer:
          "Most Stamford patients we see have a specific reason to make the trip — a trusted referring dentist, a second opinion on a complex case, or in-house IV sedation their local office doesn't offer.",
      },
      {
        question: "Do I need a referral to be seen?",
        answer:
          "No, you can request a consultation directly. If you do have a referring dentist, we will request their records and imaging ahead of the visit.",
      },
      ...COMMON_LOCATION_FAQS,
    ],
    seo: {
      title: "Oral Surgeon in Stamford, CT | Facial Surgery Center",
      description:
        "Oral and maxillofacial surgeons about 34 minutes from Stamford, CT via I-95. Dental implants, full-arch restoration and in-house IV sedation for complex cases.",
    },
  },
  {
    slug: "new-haven",
    town: "New Haven",
    county: "New Haven County",
    primaryKeyword: "oral surgeon New Haven CT",
    tagline: "26 minutes via Route 15",
    summary:
      "A short trip east on Route 15. New Haven patients often come to us for a second opinion or in-house IV sedation outside of a teaching-hospital setting.",
    driveTime: "about 26 minutes",
    neighborhoods: [
      "Westville",
      "East Rock",
      "Fair Haven",
      "Wooster Square",
      "Downtown / Ninth Square",
    ],
    localContext: [
      "New Haven is about 26 minutes from our office via Route 15, a similar distance to our Milford patients but reached from the opposite direction. East Rock and Westville tend to be a few minutes quicker to reach than Fair Haven or downtown, depending on traffic.",
      "New Haven has its own academic dental and oral surgery resources through Yale, so patients who travel to Trumbull are usually looking for something specific — a second opinion on a treatment plan, a referring dentist they already trust, or a private-office visit with in-house IV sedation rather than a teaching-hospital setting. We work from whatever imaging and records you already have rather than repeating the workup.",
      "Route 15 and I-95 traffic through the New Haven corridor can be unpredictable, so we generally recommend morning appointments when the schedule allows it, particularly for procedures involving sedation.",
    ],
    referralNote:
      "We accept referrals from general dentists and specialists in New Haven and coordinate directly with your dentist's office on records, imaging, and post-operative care.",
    services: [
      {slug: "oral-pathology"},
      {slug: "facial-trauma"},
      {slug: "dental-implants"},
      {slug: "wisdom-teeth-removal"},
      {slug: "tooth-extractions"},
      {slug: "anesthesia"},
    ],
    faqs: [
      {
        question: "How long is the drive from New Haven?",
        answer:
          "About 26 minutes via Route 15, similar to the distance from Milford but reached from the opposite direction. Morning appointments tend to avoid the worst of the corridor traffic.",
      },
      {
        question: "Why come to Trumbull when New Haven has Yale's dental programs?",
        answer:
          "Patients who make the trip usually want something specific — a second opinion, a referring dentist they already work with, or a private-office visit with in-house IV sedation rather than a teaching-hospital setting.",
      },
      {
        question: "Can you evaluate and biopsy an oral lesion?",
        answer:
          "Yes. Oral pathology is a core part of our practice. Appointment timing depends on clinical urgency, so ask your dentist or physician to send referral details when you contact the office.",
      },
      {
        question: "Do I need a referral from my New Haven dentist?",
        answer:
          "Not necessarily — you can request a consultation directly. If you have a referring dentist, we will request their records and imaging so the visit does not start from scratch.",
      },
      ...COMMON_LOCATION_FAQS,
    ],
    seo: {
      title: "Oral Surgeon in New Haven, CT | Facial Surgery Center",
      description:
        "Oral and maxillofacial surgeons about 26 minutes from New Haven, CT via Route 15. Second opinions, oral pathology, dental implants and facial trauma care.",
    },
  },
  {
    slug: "orange",
    town: "Orange",
    county: "New Haven County",
    primaryKeyword: "oral surgeon Orange CT",
    tagline: "15 minutes via Route 15",
    summary:
      "A short run via Route 15, closer than our Milford patients. Orange families often arrive on a referral tied to the Amity Regional school calendar.",
    driveTime: "about 15 minutes",
    neighborhoods: [
      "Orange Center",
      "Grassy Hill",
      "Racebrook",
      "the Boston Post Road corridor",
      "the Milford border",
    ],
    localContext: [
      "Orange sits just next to Milford along Route 15, and at about 15 minutes it is actually one of the shorter drives in our wider service area — closer than several towns we've served for years. Orange Center, the town's historic green, and the Grassy Hill and Racebrook sections are all a straightforward run down Route 15 or the Boston Post Road.",
      "Amity Regional High School serves Orange along with Woodbridge and Bethany, so scheduling for teenagers often has to work around a shared regional calendar rather than a single town's schedule. We see the usual clustering of wisdom teeth evaluations around junior and senior year and coordinate timing with your family's orthodontist when braces or aligners are part of the picture.",
      "Most adult patients from Orange arrive through a referral from their general dentist along the Boston Post Road corridor, and we work from the records and imaging that office already has rather than starting over.",
    ],
    referralNote:
      "We accept referrals from general dentists and orthodontists in Orange and the Amity Regional school district area, and we coordinate directly with your dentist's office on treatment planning and imaging.",
    services: [
      {slug: "wisdom-teeth-removal"},
      {slug: "dental-implants"},
      {slug: "tooth-extractions"},
      {slug: "dental-bone-grafting"},
      {slug: "orthognathic-surgery"},
      {slug: "anesthesia"},
    ],
    faqs: [
      {
        question: "How long is the drive from Orange?",
        answer:
          "About 15 minutes via Route 15 — one of the shorter drives in our wider service area, comparable to some of the towns closer to Trumbull.",
      },
      {
        question: "Do you coordinate with Amity Regional's school calendar?",
        answer:
          "Yes. Amity Regional High School serves Orange, Woodbridge, and Bethany on a shared calendar, and we coordinate wisdom teeth and orthodontic-adjacent timing with that in mind.",
      },
      {
        question: "Is this closer than driving to Milford providers?",
        answer:
          "For most Orange addresses, yes — Orange sits just off our Milford route, and the drive to Trumbull is comparable or shorter for many neighborhoods.",
      },
      {
        question: "Do I need a referral from my Orange dentist?",
        answer:
          "Not necessarily — you can request a consultation directly. If you have a referring dentist, we will request their records and imaging so the visit does not start from scratch.",
      },
      ...COMMON_LOCATION_FAQS,
    ],
    seo: {
      title: "Oral Surgeon in Orange, CT | Facial Surgery Center",
      description:
        "Oral and maxillofacial surgeons about 15 minutes from Orange, CT via Route 15. Wisdom teeth removal, dental implants and orthodontist-coordinated care.",
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

/** Reverse lookup off the same area->services data — no separate content to maintain. */
export function areasForService(slug: ServiceSlug): Area[] {
  return AREAS.filter((area) => area.services.some((s) => s.slug === slug));
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

/** Every service-area combo with complete town-specific page content. */
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
