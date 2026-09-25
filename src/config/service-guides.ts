import type {ServiceSlug} from "./services";

// Related treatments are chosen for patient relevance, not CMS list order.
export const RELATED_SERVICES: Record<ServiceSlug, [ServiceSlug, ServiceSlug]> = {
  "dental-implants": ["dental-bone-grafting", "teeth-in-a-day"],
  "tooth-extractions": ["dental-implants", "anesthesia"],
  "wisdom-teeth-removal": ["tooth-extractions", "anesthesia"],
  "anesthesia": ["wisdom-teeth-removal", "tooth-extractions"],
  "dental-bone-grafting": ["dental-implants", "teeth-in-a-day"],
  "botox-and-filler": ["genioplasty", "tmj-disorder"],
  "facial-trauma": ["tooth-extractions", "dental-implants"],
  "genioplasty": ["orthognathic-surgery", "minimally-invasive-orthognathic-surgery"],
  "oral-pathology": ["tooth-extractions", "anesthesia"],
  "orthognathic-surgery": ["minimally-invasive-orthognathic-surgery", "genioplasty"],
  "sleep-apnea": ["orthognathic-surgery", "anesthesia"],
  "tmj-disorder": ["orthognathic-surgery", "oral-pathology"],
  "minimally-invasive-orthognathic-surgery": ["orthognathic-surgery", "genioplasty"],
  "teeth-in-a-day": ["dental-implants", "dental-bone-grafting"],
};

type Guide = {
  title: string;
  text: string;
  links: {label: string; href: string}[];
};

export const SERVICE_GUIDES: Partial<Record<ServiceSlug, Guide[]>> = {
  "dental-implants": [
    {
      title: "Dental implant options: one tooth or a full arch",
      text: "The surgical plan depends on which teeth need replacement and the available bone. A single implant may support a crown, while multiple implants may support a bridge or a full-arch restoration. Your oral surgeon and restorative dentist plan their respective parts of treatment together.",
      links: [{label: "Explore All-on-X full-arch treatment", href: "/service/teeth-in-a-day"}],
    },
    {
      title: "Understanding bone grafting and treatment timing",
      text: "An examination and imaging help determine whether the implant site needs bone grafting. Ask which stages your plan includes, who provides the final restoration, and what each stage may cost. Healing and treatment timing depend on your individual case.",
      links: [{label: "Read about dental bone grafting", href: "/blog/what-is-a-dental-bone-graft"}, {label: "Implant care for Milford patients", href: "/areas-we-serve/milford/dental-implants"}, {label: "Implant care for Shelton patients", href: "/areas-we-serve/shelton/dental-implants"}],
    },
  ],
  "tooth-extractions": [
    {
      title: "Planning your tooth extraction and what comes next",
      text: "Ask whether the tooth can be preserved, why removal is recommended, and which anesthesia options fit your health history. If you may want an implant afterward, discuss replacement planning with your surgeon and dentist before the extraction.",
      links: [{label: "Dental implant planning", href: "/service/dental-implants"}, {label: "Anesthesia options", href: "/service/anesthesia"}],
    },
    {
      title: "Preparing for recovery after an extraction",
      text: "Arrange any help recommended by your surgical team and review your individual instructions before treatment. Our food guide and post-operative instructions can help you prepare questions; instructions given for your procedure take precedence over general advice.",
      links: [{label: "What to eat after tooth extraction", href: "/blog/what-to-eat-after-tooth-extraction"}, {label: "Post-operative instructions", href: "/for-patients/post-op"}],
    },
  ],
  "wisdom-teeth-removal": [
    {
      title: "Does every wisdom tooth need to be removed?",
      text: "Not every wisdom tooth needs removal. The decision depends on its position, symptoms, surrounding teeth, and examination findings. Ask your surgeon what monitoring or treatment would involve for your particular case.",
      links: [{label: "Does everyone have wisdom teeth?", href: "/blog/does-everyone-have-wisdom-teeth"}],
    },
    {
      title: "Preparing for wisdom teeth removal",
      text: "Before scheduling, review your medical history, anesthesia plan, transport arrangements, and recovery instructions with the team. Follow the preparation and aftercare instructions provided for you rather than assuming another patient's experience will be the same.",
      links: [{label: "Before oral surgery", href: "/for-patients/pre-op"}, {label: "Food after tooth extraction", href: "/blog/what-to-eat-after-tooth-extraction"}],
    },
  ],
  "teeth-in-a-day": [
    {
      title: "All-on-X treatment: temporary teeth and the final restoration",
      text: "Teeth in a Day describes an immediate-loading approach for suitable patients, not a guarantee that treatment is complete in one visit. Temporary teeth may be attached on surgery day when the clinical conditions allow. The final restoration follows healing and coordination with your restorative dentist or prosthodontist; a staged approach may be recommended instead.",
      links: [{label: "Meet our oral surgeons", href: "/about/meet-the-doctors"}],
    },
    {
      title: "What affects the cost of All-on-X dental implants?",
      text: "A treatment estimate depends on implant number, extractions, any bone grafting, anesthesia, and the temporary and final restorations. Ask which surgical and restorative fees are included, which are billed separately, and what maintenance may involve. Insurance benefits and out-of-pocket costs vary by plan and treatment.",
      links: [{label: "Request a full-arch consultation", href: "/contact"}],
    },
    {
      title: "All-on-X or removable implant-supported dentures?",
      text: "A fixed full-arch restoration and a removable implant-supported denture differ in how they are removed and cleaned. The right option depends on your anatomy, goals, ability to maintain the restoration, and budget. Bring these questions to your consultation rather than choosing by implant count alone.",
      links: [{label: "Compare implant-supported dentures and All-on-X", href: "/blog/implant-supported-dentures-vs-all-on-x"}],
    },
  ],
  "botox-and-filler": [
    {
      title: "Botox and dermal fillers have different treatment goals",
      text: "Botox is used to address certain expression-related lines, while dermal fillers address selected areas of volume loss. They are different treatments and are not interchangeable. At your Trumbull consultation, discuss the area that concerns you, the options that may be appropriate, and their limitations.",
      links: [{label: "Meet the Facial Surgery Center doctors", href: "/about/meet-the-doctors"}],
    },
    {
      title: "Questions to ask before anti-wrinkle injections",
      text: "Ask who will perform your injections, which product is proposed, what the estimate includes, and how follow-up works. Discuss your medical history and previous treatments, as well as expected duration, possible side effects, and alternatives. The recommended amount and treatment areas depend on your assessment; no single price or result fits everyone.",
      links: [{label: "Request a Botox or filler consultation", href: "/contact"}],
    },
  ],
  "facial-trauma": [
    {
      title: "Arranging facial trauma evaluation and follow-up",
      text: "Call before traveling to the office so the team can advise on appointment availability and the appropriate next step. Bring any referral information and available records from prior emergency or dental care. Office appointments are not a substitute for emergency services: call 911 or seek emergency care for a serious emergency.",
      links: [{label: "Contact our Trumbull office", href: "/contact"}],
    },
  ],
};
