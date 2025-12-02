import {ServiceSlug} from '@/config/services';

export const services: {
    [key in ServiceSlug]: {
        serviceTitle: string;
        description: string;
        coverImg: string;
        para1Title: string;
        para1Text: string;
        para1Img: string;
        para2Title: string;
        para2Text: string;
        para2Img: string;
        serviceTitle2: string;
        ctaText: string; // Optional CTA text for the service
        seoTitle: string; // SEO title for meta tags
        seoDescription: string; // SEO meta description
    };
} = {
    "wisdom-teeth-removal": {
        serviceTitle: "Wisdom Teeth Removal",
        description: "Expert removal of wisdom teeth to alleviate pain, prevent complications, and promote optimal oral health. Our experienced team ensures a comfortable, stress-free procedure using the latest techniques.",
        coverImg: "/images/services/wisdom/wisdom-tooth.webp",
        para1Title: "When Wisdom Teeth Need Removal",
        para1Text: "Wisdom teeth often require removal when they become impacted, crowded, or grow at problematic angles. Common signs indicating extraction include persistent jaw pain, swollen gums, difficulty chewing, and infection. Impacted wisdom teeth can also lead to more serious complications like cysts or damage to adjacent teeth. Early consultation with an oral surgeon helps identify these issues before they escalate, allowing for timely intervention. Our specialists evaluate each patient individually, recommending removal only when necessary to ensure your long-term oral health.",
        para1Img: "/images/services/wisdom/wisdom-teeth-2.webp",
        para2Title: "Recovery and Aftercare",
        para2Text: "Following wisdom tooth removal, proper aftercare is crucial for a smooth and speedy recovery. Patients are typically advised to rest, apply cold compresses, and take prescribed pain medication to manage discomfort. Maintaining oral hygiene with gentle rinsing and avoiding strenuous activities can significantly reduce healing time. Our team provides comprehensive guidelines and support, ensuring you understand each step of the recovery process. Regular follow-ups help monitor healing and address any concerns promptly, facilitating a swift return to normal daily activities.",
        para2Img: "/images/services/wisdom/wisdom-teeth1.webp",
        serviceTitle2: "Why Remove Wisdom Teeth?",
        ctaText: "If you're experiencing pain or swelling from your wisdom teeth, schedule your Trumbull, CT consultation today and take the first step toward lasting relief.",
        seoTitle: "Expert Wisdom Teeth Removal in Trumbull CT | Facial Surgery Center",
        seoDescription: "Professional wisdom teeth extraction in Trumbull, CT. Expert oral surgeons provide pain-free removal of impacted wisdom teeth."

    },
    "tooth-extractions": {
        serviceTitle: "Tooth Extractions",
        description: "Our gentle, patient-focused approach helps relieve pain, prevents future oral health issues, and prepares your mouth for restorative treatments.	",
        coverImg: "/images/services/tooth-extract/tooth-extract.webp",
        para1Title: "When Extraction is Necessary",
        para1Text: "Our oral surgeons conduct thorough evaluations using advanced diagnostic techniques to determine the best treatment approach for your individual needs. Extracting problematic teeth not only alleviates immediate discomfort but also helps prevent complications such as infections or further decay. We prioritize patient comfort, making the extraction process as smooth and stress-free as possible.	",
        para1Img: "/images/services/tooth-extract/tooth-extract1.webp",
        para2Title: "Replacement Options After Extraction",
        para2Text: `Following tooth extraction, it's important to consider replacement options to restore oral function, aesthetics, and overall dental health. Dental implants, bridges, and dentures are common restorative solutions that can enhance your smile. With personalized recommendations and precise planning, we help you make informed decisions.`,
        para2Img: "/images/services/tooth-extract/tooth-extract2.webp",
        serviceTitle2: "Why Are Tooth Extractions Important?",
        ctaText: "Don't wait until tooth pain worsens—book your tooth extraction consultation in Trumbull, CT and protect your oral health.",
        seoTitle: "Tooth Extraction Services Trumbull CT | Oral Surgery",
        seoDescription: "Safe, gentle tooth extractions in Trumbull, CT. Expert oral surgeons handle emergency extractions with advanced pain management."

    },
    "dental-bone-grafting": {
        serviceTitle: "Dental Bone Grafting",
        description: `Advanced bone grafting procedures designed to restore lost bone structure, strengthen your jaw, and prepare you for dental implants.	`,
        coverImg: "/images/services/bone-graft/bone-graft.webp",
        para1Title: "Why Bone Grafting is Needed",
        para1Text: `Bone grafting becomes necessary when the jawbone deteriorates due to tooth loss, periodontal disease, trauma, or prolonged use of dentures. Insufficient bone density can compromise the stability of dental implants and affect overall oral function. Through a detailed examination, including advanced imaging technology, our specialists determine the extent of bone loss and the most suitable grafting approach.`,
        para1Img: "/images/services/bone-graft/bone-graft-1.webp",
        para2Title: "Types of Bone Grafts We Offer",
        para2Text: `We offer various bone grafting techniques tailored to individual needs, including autografts (using your own bone), allografts (donor bone), xenografts (animal-derived bone), and synthetic graft materials. Each type of graft offers distinct advantages depending on the specific situation and desired outcome.`,
        para2Img: "/images/services/bone-graft/bone-graft-2.webp",
        serviceTitle2: "Why is Bone Grafting Important?",
        ctaText: "Restore your jaw's strength with expert bone grafting in Trumbull, CT—book your personalized consultation today.",
        seoTitle: "Dental Bone Grafting Trumbull CT | Implant Preparation",
        seoDescription: "Professional dental bone grafting in Trumbull, CT. Restore jaw bone density for successful dental implant placement."
    },

    "dental-implants": {
        serviceTitle: "Dental Implants",
        description: `Permanent solutions for missing teeth that provide a natural look, feel, and function. Our expert oral surgeons utilize state-of-the-art technology to ensure precise placement, aesthetics, and lasting results.`,
        coverImg: "/images/services/implant/implants.webp",
        para1Title: "Implant Placement Process",
        para1Text: `The implant placement process begins with advanced diagnostic imaging to plan the precise location and depth of each implant. During surgery, titanium posts are carefully placed into the jawbone, where they undergo a process called osseointegration. After healing, custom-designed crowns or prosthetic teeth are attached to the implants.`,
        para1Img: "/images/services/implant/tooth-implant1.webp",
        para2Title: "Long-term Benefits of Dental Implants",
        para2Text: `Unlike removable dentures or bridges, dental implants provide unmatched stability, comfort, and convenience. With proper care, dental implants can last a lifetime, significantly improving your oral health and quality of life. Our team is committed to educating patients about maintenance practices, ensuring long-lasting satisfaction and optimal oral hygiene.	`,
        para2Img: "/images/services/implant/tooth-implant2.webp",
        serviceTitle2: "Why Choose Dental Implants?",
        ctaText: "Ready to replace missing teeth with lasting dental implants? Schedule your Trumbull, CT consultation and restore your smile.",
        seoTitle: "Dental Implants Trumbull CT | Natural Tooth Replacement",
        seoDescription: "Lifetime dental implants in Trumbull, CT. Replace missing teeth with natural-looking, permanent solutions from expert surgeons."

    },

    "orthognathic-surgery": {
        serviceTitle: "Orthognathic Surgery",
        description: `Corrective jaw surgery designed to align the jaws and teeth, improving function, aesthetics, breathing, and overall oral health. Our expert surgeons collaborate closely with orthodontists to ensure precise, customized outcomes.	`,
        coverImg: "/images/services/orthognathic/orthognathic.webp",
        para1Title: "Jaw Alignment Correction",
        para1Text: `Orthognathic surgery corrects jaw misalignments that cannot be addressed by orthodontics alone. Conditions treated include severe overbites, underbites, open bites, and asymmetrical facial structures, which often impact speech, chewing, and facial aesthetics.`,
        para1Img: "/images/services/orthognathic/orthognathic-1.webp",
        para2Title: "Comprehensive Treatment Planning",
        para2Text: `Treatment typically includes pre-surgical orthodontics, detailed surgical planning including an airway evaluation, and postoperative orthodontic adjustments. This comprehensive approach ensures seamless integration of surgery and orthodontic care, optimizing both functional and aesthetic results. We prioritize patient education and clear communication, helping you understand every step of the process and setting realistic expectations.`,
        para2Img: "/images/services/orthognathic/orthognathic-2.webp",
        serviceTitle2: "Why Choose Orthognathic Surgery?",
        ctaText: "Improve your bite, breathing, and facial harmony by booking your orthognathic surgery consultation in Trumbull, CT today.",
        seoTitle: "Corrective Jaw Surgery Trumbull CT | Orthognathic Surgery Experts",
        seoDescription: "Expert orthognathic surgery in Trumbull, CT. Correct jaw alignment, improve bite function, and enhance facial harmony."

    },
    "genioplasty": {
        serviceTitle: "Genioplasty (Chin Surgery)",
        description: `Specialized chin reshaping surgery aimed at improving facial balance and enhancing your overall appearance. Our skilled surgeons utilize advanced techniques to achieve natural-looking results and boost your confidence.`,
        coverImg: "/images/services/genioplasty/genioplasty.webp",
        para1Title: "Chin Reshaping Techniques",
        para1Text: `Genioplasty encompasses several surgical techniques designed to enhance or reduce the projection of the chin, creating better facial proportion and harmony. Techniques include chin advancement, chin reduction, or implant placement to address specific aesthetic concerns. Our detailed consultation process includes digital imaging and careful planning to visualize expected results and tailor the procedure precisely to your goals.`,
        para1Img: "/images/services/genioplasty/chin-surgery-1.webp",
        para2Title: "Facial Harmony and Confidence",
        para2Text: `A well-proportioned chin significantly impacts overall facial aesthetics, enhancing your profile and boosting self-confidence. Our genioplasty procedures aim not only to improve facial balance but also to positively influence your self-image and quality of life. Postoperative results typically include improved facial symmetry, a more youthful appearance, and enhanced self-esteem.`,
        para2Img: "/images/services/genioplasty/chin-surgery-2.webp",
        serviceTitle2: "Why Consider Genioplasty?",
        ctaText: "Improve your jawline and your facial profile with the best genioplastic surgeons. Schedule your consultation in Trumbull, CT and see the difference.",
        seoTitle: "Chin Surgery & Genioplasty Trumbull CT | Facial Reconstruction",
        seoDescription: "Professional genioplasty and chin surgery in Trumbull, CT. Enhance facial balance and boost confidence with expert care."

    },
    "tmj-disorder": {
        serviceTitle: "TMJ Disorder Treatment",
        description: "Comprehensive diagnosis and treatment for temporomandibular joint (TMJ) disorders to relieve pain and restore proper jaw function. Our specialized approach combines advanced diagnostics and tailored treatments for lasting relief.",
        coverImg: "/images/services/tmj/tmj.webp",
        para1Title: "Understanding TMJ Disorders",
        para1Text: `TMJ disorders involve issues with the jaw joint and surrounding muscles, causing symptoms like jaw pain, clicking or popping sounds, headaches, earaches, and difficulty chewing. These disorders can result from various factors including jaw misalignment, teeth grinding, stress, arthritis, or injury. Accurate diagnosis through advanced imaging and clinical assessment is crucial to identifying the exact cause and extent of the disorder. Early diagnosis and intervention can significantly reduce symptoms and prevent further complications.`,
        para1Img: "/images/services/tmj/tmj1.webp",
        para2Title: "Effective Treatment Approaches",
        para2Text: `Our treatment options for TMJ disorders range from conservative therapies such as lifestyle changes, stress management techniques, physical therapy, and custom oral appliances, to advanced surgical interventions for more severe cases. Non-surgical treatments often provide significant relief by reducing stress on the joint, easing muscle tension, and correcting bite issues. For complex or persistent cases, surgical treatments like arthroscopy or open joint surgery may be recommended to restore joint function and alleviate symptoms. We prioritize minimally invasive methods whenever possible and ensure patients fully understand their treatment options.`,
        para2Img: "/images/services/tmj/tmj2.webp",
        serviceTitle2: "Why Treat TMJ Disorders?",
        ctaText: "Find relief from jaw pain. Book your TMJ disorder evaluation in Trumbull, CT and start your journey to comfort.",
        seoTitle: "TMJ Treatment & Jaw Pain Relief Trumbull CT | TMJ Specialists",
        seoDescription: "Comprehensive TMJ disorder treatment in Trumbull, CT. Expert diagnosis and relief for jaw pain, clicking, and dysfunction."

    },

    "facial-trauma": {
        serviceTitle: "Facial Trauma Reconstruction",
        description: "Expert care for facial injuries aimed at restoring appearance, function, and confidence. Our specialized team utilizes advanced reconstructive techniques to manage trauma effectively and compassionately.",
        coverImg: "/images/services/facial-trauma/facial-trauma.webp",
        para1Title: "Emergency Trauma Care",
        para1Text: `Facial trauma requires immediate, specialized attention to prevent complications and optimize healing outcomes. Injuries such as fractures, lacerations, and soft tissue damage can significantly impact functionality, appearance, and overall quality of life. Our expert oral surgeons are experienced in providing rapid response care, including emergency assessments, stabilization, and surgical intervention when necessary.`,
        para1Img: "/images/services/facial-trauma/facial-trauma1.webp",
        para2Title: "Advanced Reconstructive Solutions",
        para2Text: `We employ advanced reconstructive techniques tailored specifically to the unique needs of each patient. Our comprehensive treatments include repairing complex fractures, restoring facial symmetry, and reconstructing damaged soft tissues. Our surgeons collaborate closely with multidisciplinary teams to ensure holistic care that addresses both immediate injuries and long-term restoration goals.`,
        para2Img: "/images/services/facial-trauma/facial-trauma2.webp",
        serviceTitle2: "Why Choose Facial Trauma Reconstruction?",
        ctaText: "Trust your recovery to our facial trauma experts in Trumbull, CT. Schedule your consultation today.",
        seoTitle: "Emergency Facial Trauma Surgery Trumbull CT | Reconstruction",
        seoDescription: "Expert facial trauma reconstruction in Trumbull, CT. Emergency care for facial injuries with advanced surgical techniques."

    },

    "oral-pathology": {
        serviceTitle: "Oral Pathology Services",
        description: "Expert diagnosis and management of oral diseases to ensure early intervention and optimal treatment outcomes. Our specialists utilize advanced diagnostic tools to accurately identify and treat oral health conditions.",
        coverImg: "/images/services/oral-pathology/oral-pathology.webp",
        para1Title: "Early Detection and Diagnosis",
        para1Text: `Early identification of oral pathology is crucial for minimizing potential health risks. Oral conditions such as ulcers, lesions, abnormal growths, or discolorations may indicate serious underlying issues that require immediate attention. Our specialists conduct thorough examinations, utilizing advanced diagnostic methods including biopsies and imaging, to accurately diagnose conditions at their earliest stages. Prompt diagnosis allows for quicker intervention, reducing discomfort and preventing more severe complications.`,
        para1Img: "/images/services/oral-pathology/oral-patholgy-1.webp",
        para2Title: "Biopsy and Treatment Planning",
        para2Text: `When abnormal tissue is identified, we perform biopsies to determine the exact nature of the issue. Our team carefully analyzes biopsy results to develop an individualized treatment plan. Treatments may range from medication and monitoring to surgical removal of lesions, depending on the diagnosis.`,
        para2Img: "/images/services/oral-pathology/oral-pathology-2.webp",
        serviceTitle2: "Why Oral Pathology Matters",
        ctaText: "Early detection of oral diseases can make a large impact on your treatment. Book your oral pathology exam in Trumbull, CT for peace of mind.",
        seoTitle: "Oral Pathology & Screening Trumbull CT | Early Detection",
        seoDescription: "Professional oral pathology services in Trumbull, CT. Expert diagnosis, biopsies, and early detection of oral diseases."

    },

    "anesthesia": {
        serviceTitle: "Anesthesia Services",
        description: "Safe and effective anesthesia solutions for all types of oral and facial surgeries. Our experienced team ensures your comfort, relaxation, and safety using the latest monitoring technology and sedation techniques.",
        coverImg: "/images/services/anesthesia/anesthesia.webp",
        para1Title: "Comfort and Safety First",
        para1Text: `Our anesthesia services are designed to ensure patient comfort and eliminate anxiety during surgical procedures. We offer a range of options, including local anesthesia, IV sedation, and general anesthesia, depending on the complexity of the treatment and patient preference. Our team conducts comprehensive evaluations to determine the most suitable approach. Every procedure is carefully monitored to maintain safety, stability, and peace of mind from start to finish. Patient-centered care is at the core of our anesthesia protocols.`,
        para1Img: "/images/services/anesthesia/anesthesia1.webp",
        para2Title: "Advanced Monitoring and Post-Op Care",
        para2Text: `We use state-of-the-art monitoring equipment to track vital signs in real-time, ensuring safe administration and rapid response to any changes. After the procedure, our team provides detailed post-operative instructions and observes patients until full recovery from sedation. Our commitment to safety doesn't end when the surgery is over—ongoing care and communication help ensure a smooth healing process.`,
        para2Img: "/images/services/anesthesia/anesthesia2.webp",
        serviceTitle2: "Why Choose Professional Anesthesia?",
        ctaText: "Experience stress-free surgery with expert anesthesia care. Schedule your consultation in Trumbull, CT today.",
        seoTitle: "Safe Dental Anesthesia Services Trumbull CT | Sedation Options",
        seoDescription: "Professional anesthesia and sedation services in Trumbull, CT. Safe, comfortable IV sedation for all oral surgery procedures."
    },
    "botox-and-filler": {
        serviceTitle: "Botox and Dermal Fillers",
        description: `Non-surgical cosmetic treatments designed to smooth wrinkles, 
restore volume, and enhance natural facial features. 
We use advanced techniques to deliver subtle, rejuvenating 
results tailored to your unique aesthetic goals. 
If you're searching for botox near me, our clinic offers expert care in a comfortable, welcoming environment.`,
        coverImg: "/images/services/botox/botox.webp",
        para1Title: "Anti-Aging Treatments",
        para1Text: `Botox injections target dynamic wrinkles such as crow’s feet, frown lines, and forehead creases by temporarily relaxing the underlying muscles. This non-invasive treatment softens existing lines and prevents the formation of new ones with little to no downtime. Dermal fillers, on the other hand, restore lost volume in areas like the cheeks, lips, and under-eye hollows, creating a youthful, refreshed appearance. Our skilled practitioners tailor every treatment plan to your facial structure, skin type, and cosmetic preferences. The result is a natural, revitalized look that enhances your features without appearing overdone.`,
        para1Img: "/images/services/botox/botox1.webp",
        para2Title: "Customized Aesthetic Plans",
        para2Text: `We believe every face is unique, which is why we develop personalized aesthetic plans that align with your beauty goals and lifestyle. During your consultation, we discuss your concerns in detail and recommend the best combination of Botox, dermal fillers, or other injectables for optimal results. Our providers prioritize safety, precision, and artistry to achieve results that complement your natural expressions and facial harmony.`,
        para2Img: "/images/services/botox/botox2.webp",
        serviceTitle2: "Why Consider Botox and Fillers?",
        ctaText: "Refresh your look with Botox and fillers in Trumbull, CT. Book your personalized consultation today.",
        seoTitle: "Botox & Dermal Fillers Trumbull CT | Anti-Aging Treatments",
        seoDescription: "Professional Botox and dermal fillers in Trumbull, CT. Natural anti-aging treatments to smooth wrinkles and restore volume."

    },
    "sleep-apnea": {
        serviceTitle: "Sleep Apnea Treatment",
        description: `Comprehensive evaluation and treatment solutions for sleep apnea to improve breathing, enhance sleep quality, and protect your long-term health.`,
        coverImg: "/images/services/sleep-apnea/sleep-apnea.webp",
        para1Title: "Sleep Disorder Evaluation",
        para1Text: `Sleep apnea significantly impacts quality of life and may lead to serious health issues such as high blood pressure, heart disease, and chronic fatigue. Common symptoms include loud snoring, daytime drowsiness, morning headaches, and interrupted breathing during sleep. Various surgical options exist that our team can utilize to improve or even cure sleep apnea and early intervention can dramatically improve your energy, focus, and overall well-being.`,
        para1Img: "/images/services/sleep-apnea/sleep1.webp",
        para2Title: "Surgical Treatment Options",
        para2Text: `When conservative treatments like CPAP therapy or oral appliances are ineffective or not tolerated, surgical intervention may be the best solution. Our specialists offer a variety of procedures such as nasal surgery or maxillomandibular advancement to remove obstructions and open the airway. Each treatment plan is fully customized based on the patient’s anatomy, severity of sleep apnea, and personal preferences.`,
        para2Img: "/images/services/sleep-apnea/sleep2.webp",
        serviceTitle2: "Why Treat Sleep Apnea?",
        ctaText: "Sleep better, breathe easier with the Facial Surgery Center. Schedule your sleep apnea treatment consultation in Trumbull, CT.",
        seoTitle: "Sleep Apnea Surgery Trumbull CT | Airway Reconstruction",
        seoDescription: "Expert sleep apnea surgery in Trumbull, CT. Advanced surgical solutions to improve breathing and sleep quality."

    },
    "minimally-invasive-orthognathic-surgery": {
        serviceTitle: "Minimally Invasive Orthognathic Surgery",
        description:
            "Minimally Invasive Orthognathic Surgery corrects jaw alignment using smaller incisions, modern 3D planning, and advanced techniques to reduce pain, swelling, and recovery time.",
        coverImg: "/images/services/mi/mi.webp",
        para1Title: "What Is Minimally Invasive Orthognathic Surgery?",
        para1Text:
            "Minimally Invasive (MI) Orthognathic Surgery is a modern approach to jaw correction that focuses on precision, smaller incisions, and reduced trauma to the surrounding tissues. Using advanced imaging and 3D virtual surgical planning, your surgeon can accurately reposition the jaws to improve your bite, facial balance, and airway while minimizing disruption to muscles and soft tissue. This technique is ideal for patients with bite problems, facial asymmetry, or functional issues such as difficulty chewing or speaking, who also want a faster and more comfortable recovery experience compared to traditional jaw surgery.",
        para1Img: "/images/services/mi/consult-1.webp",
        para2Title: "Benefits, Recovery, and Ideal Candidates",
        para2Text:
            "Patients often choose MI Orthognathic Surgery for its combination of predictable results and a smoother healing process. Smaller incisions and more targeted bone movements typically lead to less swelling, less post-operative discomfort, and a shorter time away from work or school. Many patients are able to transition to a soft diet and resume light daily activities sooner than with conventional approaches. Ideal candidates are healthy individuals with significant jaw or bite discrepancies who want to improve both function and facial aesthetics. During your consultation, we will review your goals, imaging, and medical history to determine if a minimally invasive technique is appropriate for your case.",
        para2Img: "/images/services/mi/2.webp",
        serviceTitle2: "Why Choose Minimally Invasive Jaw Surgery?",
        ctaText:
            "If you’ve been told you may need jaw surgery, schedule your Trumbull, CT consultation today to find out if Minimally Invasive Orthognathic Surgery is right for you.",
        seoTitle:
            "Minimally Invasive Jaw Surgery in Trumbull CT | Facial Surgery Center",
        seoDescription:
            "Correct jaw alignment with minimally invasive orthognathic surgery in Trumbull, CT. Smaller incisions, less discomfort, and faster recovery."
    },
    "teeth-in-a-day": {
        serviceTitle: "Teeth in a Day (All-On-X) Implants",
        description:
            "Teeth in a Day (All-On-X) Implants replace an entire arch of missing or failing teeth with a fixed, natural-looking prosthesis secured to dental implants in a single visit.",
        coverImg: "/images/services/all-in-x/all-in-x.webp",
        para1Title: "What Are Teeth in a Day (All-On-X) Implants?",
        para1Text:
            "Teeth in a Day, often called All-On-X implants, is a full-arch restoration solution designed for patients with many missing, damaged, or failing teeth. Instead of replacing each tooth individually, a carefully planned number of implants—often four or more—are placed in strategic positions along the jaw. These implants support a custom full-arch bridge that is secured the same day, so you leave the office with a stable, functional, and natural-looking set of teeth. This approach offers greater stability than traditional dentures, helps preserve jawbone, and restores your ability to chew, speak, and smile with confidence.",
        para1Img: "/images/services/all-in-x/1.webp",
        para2Title: "Benefits, Candidacy, and What to Expect",
        para2Text:
            "All-On-X treatment is popular because it combines efficiency with long-term durability. Many patients appreciate that they can transition from painful or loose teeth to a fixed full-arch solution in just one day. The implants help support and maintain jawbone volume, reduce the need for repeated denture adjustments, and provide a bite that feels closer to natural teeth. Ideal candidates include patients with extensive decay, advanced gum disease, or ill-fitting dentures who are ready for a more secure, permanent option. During your evaluation, we will review your medical history, bone quality, and aesthetic goals, then create a personalized plan so you know exactly what to expect before, during, and after surgery.",
        para2Img: "/images/services/all-in-x/2.webp",
        serviceTitle2: "Why Choose Teeth in a Day (All-On-X)?",
        ctaText:
            "If you’re tired of struggling with failing teeth or unstable dentures, schedule your Trumbull, CT consultation today to see if Teeth in a Day (All-On-X) Implants are right for you.",
        seoTitle:
            "Teeth in a Day All-On-X Implants in Trumbull CT | Facial Surgery Center",
        seoDescription:
            "Restore your smile with Teeth in a Day (All-On-X) implants in Trumbull, CT. Secure, natural-looking full-arch replacement from experienced surgeons."
    },


};


