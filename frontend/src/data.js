import {
  Activity, Zap, TestTube, Pill, Microscope, Truck, Home, Bot, Package, Video
} from 'lucide-react';

export const healthTips = [
  "We Care. We Cure. We Lead.",
  "World-class care, Indian values.",
  "24/7 Emergency & ICU Facility Available.",
  "Stay hydrated: Drink at least 8 glasses of water a day.",
  "Your health is an investment, not an expense.",
  "Early detection saves lives. Schedule your annual check-up.",
];

export const features = [
  { icon: Zap, label: "Emergency 24x7" },
  { icon: Bot, label: "Robotic Surgery" },
  { icon: TestTube, label: "Blood Bank" },
  { icon: Pill, label: "In-house Pharmacy" },
  { icon: Microscope, label: "MRI/CT Imaging" },
  { icon: Truck, label: "Mobile Health Vans" },
  { icon: Home, label: "Home Sample Pickup" },
  { icon: Activity, label: "ICU Monitoring AI" },
  { icon: Package, label: "Health Packages" },
  { icon: Video, label: "Online Video Consultation" },
];

export const departments = [
  { 
    name: "Cardiology",
    doctors: [
        { 
            name: "Dr. Aaron Mehta", 
            gender: "Male", 
            image: "/male-doctors/maledoc9.png", 
            role: "Senior Interventional Cardiologist", 
            qualifications: "MBBS, MD (Internal Medicine), DM (Cardiology) – AIIMS Delhi", 
            experience: "12 years", 
            achievements: [
                "Published in Circulation and JACC on acute MI interventions", 
                "Pioneered radial angioplasty technique adoption at 3 tertiary care centers", 
                "Led a program that reduced mortality in STEMI cases by 15%"
            ], 
            bio: "A results-driven interventional expert, Dr. Mehta brings unmatched precision in complex angioplasties and stent placements. He is also a recognized mentor, shaping India's next generation of cardiologists with an evidence-based and patient-centered approach." 
        },
        { 
            name: "Dr. Priya Nair", 
            gender: "Female", 
            image: "/female-doctors/femaledoc1.png", 
            role: "Consultant Clinical Cardiologist", 
            qualifications: "MBBS, MD (General Medicine), Fellowship in Clinical Cardiology – Cleveland Clinic", 
            experience: "8 years", 
            achievements: [
                "National award for excellence in women’s heart health programs", 
                "Authored \"Cardiology in Primary Care\" manual used in 25+ clinics", 
                "Spearheaded cardiac rehab outreach in rural Maharashtra"
            ], 
            bio: "A passionate advocate for preventive cardiology, Dr. Nair blends empathy with diagnostic excellence. Her strong academic foundation and public health commitment make her a vital asset to both patients and the hospital’s community initiatives." 
        },
        { 
            name: "Dr. Santosh Rao", 
            gender: "Male", 
            image: "/male-doctors/maledoc7.png", 
            role: "Interventional Cardiologist", 
            qualifications: "MBBS, DM (Cardiology), Fellowship in Interventional Cardiology – ESC, Paris", 
            experience: "10 years", 
            achievements: [
                "Over 5,000 successful catheter-based procedures", 
                "Introduced zero-contrast angioplasty for renal-compromised patients", 
                "Speaker at EuroPCR & TCT forums"
            ], 
            bio: "Known for his calm demeanor and surgical precision, Dr. Rao specializes in high-risk angioplasties and structural heart interventions. He’s lauded for bringing innovation and international best practices into daily cath lab procedures." 
        },
        { 
            name: "Dr. Elena Fernandez", 
            gender: "Female", 
            image: "/female-doctors/femaledoc3.png", 
            role: "Preventive and Epidemiological Cardiologist", 
            qualifications: "MBBS, MD (Preventive Medicine), MPH – Johns Hopkins", 
            experience: "7 years", 
            achievements: [
                "Designed hospital’s cardiac risk screening algorithm", 
                "Published meta-analysis on South Asian cardiac risks", 
                "Consultant to WHO cardiovascular prevention taskforce"
            ], 
            bio: "Blending public health strategy with personalized cardiac care, Dr. Fernandez plays a pivotal role in shaping population-scale prevention protocols. Her data-driven approach elevates the hospital’s health outcomes and outreach." 
        },
        { 
            name: "Dr. Vikram Singh", 
            gender: "Male", 
            image: "/male-doctors/maledoc5.png", 
            role: "Non-Invasive Cardiologist (Echo Specialist)", 
            qualifications: "MBBS, DNB (Cardiology), Certified Echo Cardiologist (ASE-USA)", 
            experience: "9 years", 
            achievements: [
                "Lead trainer for echocardiography workshops across South India", 
                "Designed 3D echo protocols for structural heart defect screening", 
                "Published in Journal of Cardiovascular Imaging"
            ], 
            bio: "Renowned for his diagnostic accuracy, Dr. Singh's expertise in echocardiography supports critical decisions in both routine and emergency cardiac care. He emphasizes clarity, compassion, and clinical excellence in every consultation." 
        },
        { 
            name: "Dr. Maya Sharma", 
            gender: "Female", 
            image: "/female-doctors/femaledoc9.png", 
            role: "Cardiac ICU Specialist", 
            qualifications: "MBBS, MD (Anesthesiology), Fellowship in Cardiac Critical Care", 
            experience: "6 years", 
            achievements: [
                "Created SOPs for post-operative cardiac ICU care", 
                "Co-led ECMO integration program", 
                "Reduced ICU readmission by 12% over two years"
            ], 
            bio: "Dr. Sharma manages high-dependency cardiac cases with precision and composure. Her strength lies in orchestrating multidisciplinary responses under pressure, with strong communication and patient stabilization protocols." 
        },
        { 
            name: "Dr. Rajesh Gupta", 
            gender: "Male", 
            image: "/male-doctors/maledoc1.png", 
            role: "Cardiac Intensivist", 
            qualifications: "MBBS, IDCCM, Fellowship in ECMO and Cardiac Support Devices", 
            experience: "5 years", 
            achievements: [
                "Designed real-time monitoring protocols for post-stent patients", 
                "Involved in national ECMO training initiatives", 
                "Published in Indian Journal of Cardiac Critical Care"
            ], 
            bio: "A dynamic and tech-savvy ICU doctor, Dr. Gupta is instrumental in managing critical cardiac patients, particularly those requiring mechanical support. His real-time decision-making saves lives in the most time-sensitive scenarios." 
        }
    ]
  },
  {
    name: "Neurology",
    doctors: [
        { 
            name: "Dr. Nisha Verma", 
            gender: "Female", 
            image: "/female-doctors/femaledoc8.png", 
            role: "Consultant Neurologist – Stroke & Epilepsy", 
            qualifications: "MBBS, MD (General Medicine), DM (Neurology) – NIMHANS", 
            experience: "11 years", 
            achievements: [
                "Published landmark study on post-stroke epilepsy in Neurology India", 
                "Built the hospital’s first rapid-response Stroke Unit", 
                "Awarded “Neurologist of the Year” by Indian Stroke Association, 2023"
            ], 
            bio: "A leading stroke neurologist, Dr. Verma blends cutting-edge protocols with personalized care. Her calm demeanor and clinical precision make her the first responder of choice for acute neurological emergencies." 
        },
        { 
            name: "Dr. Harish Patel", 
            gender: "Male", 
            image: "/male-doctors/maledoc4.png", 
            role: "Consultant Neurologist – Neurorehabilitation & Movement Disorders", 
            qualifications: "MBBS, DNB (Neurology), Fellowship in Parkinson’s & Movement Disorders", 
            experience: "9 years", 
            achievements: [
                "Co-developed digital therapy for early Parkinson’s detection", 
                "Set up hospital’s neuro-rehab unit with robotics integration", 
                "Speaker at World Congress on Neurodegeneration"
            ], 
            bio: "With a deep focus on neurorehabilitation, Dr. Patel transforms long-term recovery with progressive therapies and smart devices. He brings clinical excellence and humanity to each patient journey." 
        },
        { 
            name: "Dr. Anita Joshi", 
            gender: "Female", 
            image: "/female-doctors/femaledoc10.png", 
            role: "Consultant Neurologist – Headache & Migraine Specialist", 
            qualifications: "MBBS, MD (Medicine), DM Neurology – PGIMER Chandigarh", 
            experience: "8 years", 
            achievements: [
                "Developed a novel migraine classification system now adopted across 50+ clinics", 
                "Conducted India’s first multi-site study on hormonal migraines", 
                "Awarded Best Clinician Award by Migraine India Foundation"
            ], 
            bio: "Known for her nuanced understanding of chronic neurological pain, Dr. Joshi’s patient-first approach helps individuals reclaim their quality of life. She is a vocal advocate for neurological literacy among the general public." 
        },
        { 
            name: "Dr. Omar Khan", 
            gender: "Male", 
            image: "/male-doctors/maledoc6.png", 
            role: "Epileptologist", 
            qualifications: "MBBS, DM Neurology, Fellowship in Epilepsy (UK)", 
            experience: "7 years", 
            achievements: [
                "Developed the region’s first drug-resistant epilepsy protocol", 
                "Runs a rural epilepsy awareness camp every quarter", 
                "Published in Epilepsia and Lancet Neurology"
            ], 
            bio: "Empathetic and highly specialized, Dr. Khan manages refractory epilepsy with advanced diagnostics and surgical mapping. His outreach programs bridge the urban-rural neurology care gap." 
        },
        { 
            name: "Dr. Kavita Desai", 
            gender: "Female", 
            image: "/female-doctors/femaledoc1.png", 
            role: "Neuroimmunologist", 
            qualifications: "MBBS, MD (Medicine), DM Neurology, Fellowship in MS & Neuroimmunology (Canada)", 
            experience: "10 years", 
            achievements: [
                "Principal investigator in India’s largest MS registry", 
                "Set up a dedicated Neuroimmunology Clinic with infusion therapies", 
                "TEDx speaker on invisible neurological illnesses"
            ], 
            bio: "Dr. Desai is a trailblazer in the field of MS and autoimmune brain disorders. Her integrated, patient-centric model of care is shaping the future of neurology in India." 
        },
        { 
            name: "Dr. Sunil Rao", 
            gender: "Male", 
            image: "/male-doctors/maledoc1.png", 
            role: "Neurocritical Care Specialist (ICU)", 
            qualifications: "MBBS, DM (Neurology), Fellowship in Neurocritical Care – AAN", 
            experience: "6 years", 
            achievements: [
                "Implemented ICU-level brain monitoring systems (BIS & ICP)", 
                "Lead trainer for neuroemergency handling protocols", 
                "Reduced secondary brain injury incidence by 18% hospital-wide"
            ], 
            bio: "Calm and methodical, Dr. Rao specializes in high-risk, acute-phase brain care. He is instrumental in leading multidisciplinary rounds and managing neurological crises in the ICU." 
        },
        { 
            name: "Dr. Leena Iyer", 
            gender: "Female", 
            image: "/female-doctors/femaledoc12.png", 
            role: "Neuro ICU & Trauma Specialist", 
            qualifications: "MBBS, Diploma in Anesthesia, Fellowship in Neuro ICU – AIIMS", 
            experience: "5 years", 
            achievements: [
                "Developed custom weaning protocols for neurosurgical patients", 
                "Runs hospital-wide neurotrauma drills", 
                "Published in Journal of Neurocritical Care"
            ], 
            bio: "Detail-driven and assertive in high-stakes settings, Dr. Iyer ensures seamless transition between OT, ICU, and recovery for neurological cases. Her structured yet compassionate care model enhances outcomes for trauma patients." 
        }
    ]
  },
  {
    name: "Orthopaedics",
    doctors: [
        {
            name: "Dr. Arjun Kulkarni",
            gender: "Male",
            image: "/male-doctors/maledoc1.png",
            role: "Chief Orthopaedic Surgeon – Joint Replacement",
            qualifications: "MBBS, MS (Orthopaedics), Fellowship in Robotic Knee Replacement – Germany",
            experience: "10 years",
            achievements: [
                "Performed 2,000+ successful knee/hip replacements",
                "National faculty for robotic orthopedic surgery workshops",
                "Published in Bone & Joint Journal"
            ],
            bio: "A pioneer in robotic joint replacements, Dr. Kulkarni blends surgical precision with empathetic post-operative care. He leads the ortho team with technical mastery and patient-first leadership."
        },
        {
            name: "Dr. Sneha Rao",
            gender: "Female",
            image: "/female-doctors/femaledoc2.png",
            role: "Consultant Orthopaedic Surgeon – Sports Injuries",
            qualifications: "MBBS, DNB (Orthopaedics), Fellowship in Arthroscopy – UK",
            experience: "8 years",
            achievements: [
                "Specialized in ligament reconstructions and cartilage preservation",
                "Medical consultant for two national sports teams",
                "Conducted 25+ athlete rehab camps"
            ],
            bio: "With a passion for mobility and function, Dr. Rao delivers top-tier orthopaedic care to athletes and active individuals. Her technique-driven surgeries restore lives and performance."
        },
        {
            name: "Dr. Vikrant Deshpande",
            gender: "Male",
            image: "/male-doctors/maledoc3.png",
            role: "Consultant – Spine Surgeon",
            qualifications: "MBBS, MS Ortho, Fellowship in Spine Surgery (USA)",
            experience: "9 years",
            achievements: [
                "Led India’s first 3D spinal navigation surgery in private care",
                "Authored 12 papers in spinal trauma and deformity",
                "Member of AO Spine International"
            ],
            bio: "Dr. Deshpande brings global best practices to spine surgery, combining technological precision with personalized rehab care. His cases are often complex, but his outcomes speak volumes."
        },
        {
            name: "Dr. Richa Menon",
            gender: "Female",
            image: "/female-doctors/femaledoc4.png",
            role: "Consultant – Pediatric Orthopaedics",
            qualifications: "MBBS, MS Ortho, Fellowship in Pediatric Ortho – Singapore",
            experience: "7 years",
            achievements: [
                "Designed child-specific fracture healing plans",
                "Launched scoliosis screening in schools",
                "Member of Indian Academy of Pediatric Ortho"
            ],
            bio: "Gentle with children and meticulous in care, Dr. Menon delivers transformative orthopaedic solutions to her youngest patients. Parents and peers trust her hands and her heart."
        },
        {
            name: "Dr. Deepak Chandra",
            gender: "Male",
            image: "/male-doctors/maledoc5.png",
            role: "Consultant – Orthopaedic Trauma Surgeon",
            qualifications: "MBBS, MS (Ortho), ATLS & AO Trauma Certified",
            experience: "11 years",
            achievements: [
                "Key developer of emergency fracture response protocols",
                "Coordinated disaster-relief orthopaedic units during COVID",
                "Published on polytrauma care in Indian Ortho Review"
            ],
            bio: "Dr. Chandra thrives in high-stakes trauma scenarios, where precision and speed can save limbs and lives. A decisive leader in the OT, he is respected across the emergency chain."
        },
        {
            name: "Dr. Manisha Gupta",
            gender: "Female",
            image: "/female-doctors/femaledoc6.png",
            role: "Orthopaedic ICU Consultant",
            qualifications: "MBBS, Diploma in Critical Care Medicine (ISCCM)",
            experience: "6 years",
            achievements: [
                "Reduced infection rates post-ortho surgery by 28%",
                "Spearheaded ER-to-ICU ortho transition model",
                "Trained 300+ staff in ortho-critical care"
            ],
            bio: "Dr. Gupta is an essential link between surgery and recovery in orthopaedic trauma. She brings stability, innovation, and a meticulous eye for ICU safety and success."
        },
        {
            name: "Dr. Rahul Mehra",
            gender: "Male",
            image: "/male-doctors/maledoc9.png",
            role: "Ortho-Critical Care & Pain Specialist",
            qualifications: "MBBS, Fellowship in Ortho ICU, PDCC in Pain Management",
            experience: "5 years",
            achievements: [
                "Introduced continuous pain scoring system for ortho patients",
                "Co‑developed integrated fracture pain protocols",
                "Presented on pain science at ISA National Meet"
            ],
            bio: "A focused clinician with advanced pain science knowledge, Dr. Mehra ensures patients recover faster and more comfortably post-surgery. His calm precision makes him vital to the ortho ICU ecosystem."
        }
    ]
  },
  {
    name: "Gastroenterology",
    doctors: [
        {
            name: "Dr. Parul Shah",
            gender: "Female",
            image: "/female-doctors/femaledoc1.png",
            role: "Senior Gastroenterologist – Endoscopy & Liver Disease",
            qualifications: "MBBS, MD (Internal Medicine), DM (Gastroenterology) – SGPGI",
            experience: "9 years",
            achievements: [
                "Introduced endoscopic ultrasound (EUS) in 3-tier city networks",
                "Member of National Taskforce on Liver Fibrosis",
                "Speaker at APDW and INASL"
            ],
            bio: "With deep expertise in endoscopic diagnostics and liver disorders, Dr. Shah combines cutting-edge interventions with compassionate communication. She’s a regional leader in Hepatitis and cirrhosis care."
        },
        {
            name: "Dr. Sameer Khan",
            gender: "Male",
            image: "/male-doctors/maledoc2.png",
            role: "Hepatologist & Viral Hepatitis Specialist",
            qualifications: "MBBS, DM (Hepatology), Fellowship in Hepatobiliary Medicine – ILBS",
            experience: "7 years",
            achievements: [
                "Created a regional Hepatitis B vaccination framework",
                "Published 10+ papers on liver failure outcomes",
                "Part of India’s National Liver Foundation panel"
            ],
            bio: "Dr. Khan's work in viral liver diseases and transplant coordination is driven by both science and purpose. His multidisciplinary teamwork has helped reduce transplant delays by over 30%."
        },
        {
            name: "Dr. Kavya Menon",
            gender: "Female",
            image: "/female-doctors/femaledoc3.png",
            role: "Consultant Gastroenterologist – IBD & Colonoscopy",
            qualifications: "MBBS, DNB (Gastroenterology), Fellowship in IBD – USA",
            experience: "8 years",
            achievements: [
                "Developed customized protocols for Crohn's and ulcerative colitis",
                "Panelist at Digestive Disease Week (DDW)",
                "Introduced sedation-assisted colonoscopy in 4 centers"
            ],
            bio: "Dr. Menon is known for her balanced, evidence-backed management of inflammatory bowel disease. She is a strong advocate for dignity in chronic GI disease care."
        },
        {
            name: "Dr. Arun Bhatia",
            gender: "Male",
            image: "/male-doctors/maledoc4.png",
            role: "Senior Endoscopy Specialist",
            qualifications: "MBBS, MD, DM (Gastro), Advanced Endoscopy Fellowship – Japan",
            experience: "10 years",
            achievements: [
                "Over 8,000 successful upper & lower GI procedures",
                "Pioneered training modules in therapeutic ERCP",
                "Contributing editor to Indian Journal of Gastrointestinal Endoscopy"
            ],
            bio: "Precision-focused and tech-savvy, Dr. Bhatia is a leader in diagnostic and therapeutic endoscopy. His procedural skillset is trusted across high-complexity referrals."
        },
        {
            name: "Dr. Lakshmi Rao",
            gender: "Female",
            image: "/female-doctors/femaledoc5.png",
            role: "Gastroenterologist – Functional GI Disorders & Nutrition",
            qualifications: "MBBS, MD (Medicine), DM (Gastro), Certified Clinical Nutritionist",
            experience: "6 years",
            achievements: [
                "Designed a GI-nutrition integration protocol used across OPDs",
                "Speaker on IBS, SIBO, and gut-brain axis disorders",
                "Recognized for work on gender-specific GI symptoms"
            ],
            bio: "Dr. Rao brings a holistic approach to functional GI issues, integrating diet, lifestyle, and diagnostic acumen. Her empathetic care model is especially impactful for women’s gut health."
        },
        {
            name: "Dr. Yashika Agarwal",
            gender: "Female",
            image: "/female-doctors/femaledoc6.png",
            role: "Gastro ICU Specialist",
            qualifications: "MBBS, MD (Anesthesiology), Fellowship in Gastrointestinal Critical Care",
            experience: "5 years",
            achievements: [
                "Designed GI-bleed emergency triage protocol",
                "ICU lead for pancreatitis management",
                "Authored paper on ICU sedation post-endoscopy"
            ],
            bio: "Dr. Agarwal ensures safe, seamless critical care transitions for patients post-GI surgery and procedures. Her protocols have cut post-endoscopy complications by nearly 40%."
        },
        {
            name: "Dr. Karan Singh",
            gender: "Male",
            image: "/male-doctors/maledoc7.png",
            role: "Hepatic ICU Consultant",
            qualifications: "MBBS, Diploma in Critical Care, Fellowship in Liver ICU – ILBS",
            experience: "6 years",
            achievements: [
                "Headed emergency protocols for hepatic encephalopathy",
                "Developed real-time bilirubin monitoring for liver ICU",
                "Speaker at Liver ICU Innovations 2024"
            ],
            bio: "Dr. Singh’s meticulous critical care management of hepatic patients ensures improved outcomes for liver failure and post-transplant cases. His data-driven care style adds immense value to high-risk GI units."
        }
    ]
  },
  {
    name: "Pulmonology",
    doctors: [
        {
            name: "Dr. Meera Joshi",
            gender: "Female",
            image: "/female-doctors/femaledoc1.png",
            role: "Senior Pulmonologist – Sleep & Respiratory Disorders",
            qualifications: "MBBS, MD (Pulmonology), Fellowship in Sleep Medicine – USA",
            experience: "9 years",
            achievements: [
                "Founder of the region’s first multi-disciplinary Sleep Apnea Clinic",
                "Published work on CPAP adherence in Chest Journal",
                "Panel expert on Indian Guidelines for OSA"
            ],
            bio: "A leader in pulmonology and sleep medicine, Dr. Joshi’s integrative care model blends respiratory therapy with behavioral health. Her work has transformed nocturnal breathing disorder care across urban and semi-urban settings."
        },
        {
            name: "Dr. Arnav Verma",
            gender: "Male",
            image: "/male-doctors/maledoc2.png",
            role: "Pulmonologist – Tuberculosis & Interstitial Lung Disease",
            qualifications: "MBBS, DNB (Pulmonary Medicine), Fellowship in ILD – NILD Kolkata",
            experience: "8 years",
            achievements: [
                "Regional TB awareness program head",
                "Developed digital symptom tracker for chronic lung disease",
                "Published 6 papers on ILD classification"
            ],
            bio: "Dr. Verma’s field expertise and community focus make him a dual powerhouse—both as a clinician and educator. His ILD protocols are now standard at multiple hospitals."
        },
        {
            name: "Dr. Smita Patel",
            gender: "Female",
            image: "/female-doctors/femaledoc3.png",
            role: "Consultant Pulmonologist – COPD & Physiotherapy Integration",
            qualifications: "MBBS, MD (Pulmonology), PG Diploma in Pulmonary Rehab",
            experience: "7 years",
            achievements: [
                "Designed integrated COPD–cardiac rehab pathway",
                "Co-authored Indian White Paper on Pulmonary Rehabilitation",
                "Speaker at GOLD Conference (2023)"
            ],
            bio: "Committed to function-focused respiratory care, Dr. Patel empowers COPD patients through education, structured rehab, and long-term care mapping."
        },
        {
            name: "Dr. Rohan Shetty",
            gender: "Male",
            image: "/male-doctors/maledoc4.png",
            role: "Interventional Pulmonologist – Bronchoscopy & Thoracoscopy",
            qualifications: "MBBS, MD (Pulmonology), Fellowship in Advanced Bronchoscopy – AIIMS",
            experience: "6 years",
            achievements: [
                "Performed 3,500+ bronchoscopy and pleural procedures",
                "Trained physicians on cryobiopsy techniques",
                "Published 3 papers on thoracoscopic diagnosis"
            ],
            bio: "Technically sound and safety-focused, Dr. Shetty leads high-risk airway interventions with composure. His precision and patient communication earn him trust in the most delicate pulmonary cases."
        },
        {
            name: "Dr. Nidhi Kapoor",
            gender: "Female",
            image: "/female-doctors/femaledoc5.png",
            role: "Consultant Pulmonologist – Asthma & Women’s Respiratory Health",
            qualifications: "MBBS, MD (Pulmonology), Diploma in Clinical Allergy",
            experience: "5 years",
            achievements: [
                "Lead speaker at Indian Women’s Asthma Forum",
                "Set up a gender-sensitive asthma diagnosis model",
                "Published on hormonal influence on lung function"
            ],
            bio: "Known for personalized asthma management, Dr. Kapoor empowers women and adolescents with tailored care plans. Her empathetic clinical style resonates strongly with her patients."
        },
        {
            name: "Dr. Anil Nair",
            gender: "Male",
            image: "/male-doctors/maledoc6.png",
            role: "Pulmonology ICU Lead",
            qualifications: "MBBS, MD (Pulmonary Medicine), Fellowship in Critical Care – ISCCM",
            experience: "6 years",
            achievements: [
                "Developed NIV weaning protocols in ICU",
                "Managed ventilator optimization for COVID-19 surge units",
                "Contributor to Indian Ventilation Guidelines (2022)"
            ],
            bio: "Dr. Nair delivers advanced ICU-level respiratory support with diligence and composure. His protocols have significantly lowered ventilator dependency in chronic pulmonary patients."
        },
        {
            name: "Dr. Priyanka Rao",
            gender: "Female",
            image: "/female-doctors/femaledoc7.png",
            role: "Pulmonary ICU Consultant – ARDS & ECMO Support",
            qualifications: "MBBS, Diploma in Critical Care Medicine, Fellowship in ECMO – Australia",
            experience: "5 years",
            achievements: [
                "Co-lead of ECMO Rapid Response Team",
                "Published case series on ARDS rescue protocols",
                "Delivered key lecture at ISCCM 2024"
            ],
            bio: "With a sharp clinical mind and calm under crisis, Dr. Rao handles complex ICU respiratory failure cases with poise. Her work during COVID-19 earned national recognition for excellence in ventilatory care."
        }
    ]
  },
  {
    name: "Nephrology & Urology",
    doctors: [
        {
            name: "Dr. Sandeep Reddy",
            gender: "Male",
            image: "/male-doctors/maledoc1.png",
            role: "Senior Nephrologist – CKD & Dialysis",
            qualifications: "MBBS, MD (Medicine), DM (Nephrology) – PGIMER Chandigarh",
            experience: "11 years",
            achievements: [
                "Founded the hospital’s high-efficiency dialysis unit",
                "Published guidelines on CKD staging in diabetics",
                "National speaker at ISNCON 2023"
            ],
            bio: "Dr. Reddy brings deep knowledge in chronic kidney disease, building personalized care journeys that reduce hospitalization and dialysis frequency. He's trusted by patients and physicians alike."
        },
        {
            name: "Dr. Ritu Sharma",
            gender: "Female",
            image: "/female-doctors/femaledoc2.png",
            role: "Consultant Urologist – Female & Reconstructive Urology",
            qualifications: "MBBS, MS (General Surgery), MCh (Urology), Fellowship in Female Urology – UK",
            experience: "8 years",
            achievements: [
                "Designed India’s first mobile continence care camp",
                "Lead surgeon for complex urethral reconstructions",
                "Published research on postpartum incontinence"
            ],
            bio: "Dr. Sharma is one of the few urologists in India specializing in female urology. Her commitment to privacy, dignity, and surgical innovation drives excellent patient outcomes."
        },
        {
            name: "Dr. Naveen Iyer",
            gender: "Male",
            image: "/male-doctors/maledoc3.png",
            role: "Interventional Nephrologist – AV Fistula & Renal Access",
            qualifications: "MBBS, DM (Nephrology), Fellowship in Interventional Nephrology",
            experience: "7 years",
            achievements: [
                "Performed 1,200+ AV access procedures",
                "Faculty at Indian Renal Access Society",
                "Developed hospital’s vascular access surveillance program"
            ],
            bio: "Focused, efficient, and tech-forward, Dr. Iyer ensures dialysis patients get and maintain safe access. He leads innovation in reducing access failure rates and re-interventions."
        },
        {
            name: "Dr. Pooja Malhotra",
            gender: "Female",
            image: "/female-doctors/femaledoc4.png",
            role: "Consultant Nephrologist – Pediatric Nephrology",
            qualifications: "MBBS, DNB (Nephrology), Fellowship in Pediatric Renal Care – Singapore",
            experience: "6 years",
            achievements: [
                "Created India's first CKDu early alert model for children",
                "Guest author for textbook “Nephrology for Pediatrics”",
                "Runs monthly free pediatric renal camps"
            ],
            bio: "Dr. Malhotra provides sensitive and detailed care for children with renal issues. Her early diagnosis model has helped hundreds avoid progression to dialysis."
        },
        {
            name: "Dr. Aman Kaul",
            gender: "Male",
            image: "/male-doctors/maledoc5.png",
            role: "Urologist – Endourology & Stone Diseases",
            qualifications: "MBBS, MS (Surgery), MCh (Urology), Fellowship in Laser Endourology",
            experience: "9 years",
            achievements: [
                "Over 5,000 stone removal procedures using laser",
                "Introduced mini-PCNL and RIRS at tertiary care level",
                "Published case studies on complex staghorn calculi"
            ],
            bio: "Dr. Kaul’s minimally invasive skills allow rapid recovery and high patient comfort. He is recognized for pushing precision techniques in stone surgery and laser urology."
        },
        {
            name: "Dr. Neha Thakur",
            gender: "Female",
            image: "/female-doctors/femaledoc6.png",
            role: "Nephrology ICU Consultant",
            qualifications: "MBBS, Diploma in Critical Care, Fellowship in Renal ICU – AIIMS",
            experience: "5 years",
            achievements: [
                "Created AKI (Acute Kidney Injury) early-warning system",
                "Lowered post-op dialysis rates by 22%",
                "Presented work at ASN Kidney Week"
            ],
            bio: "Dr. Thakur expertly handles nephro-critical cases, especially acute kidney failure in ICUs. Her protocols balance aggressive support with long-term renal preservation."
        },
        {
            name: "Dr. Rohit Sen",
            gender: "Male",
            image: "/male-doctors/maledoc7.png",
            role: "Uro-Critical Care Specialist",
            qualifications: "MBBS, Fellowship in Urology Critical Care & Onco-Urology",
            experience: "6 years",
            achievements: [
                "Led care for urosepsis and post-radical cystectomy ICU",
                "Developed sepsis-resistant catheterization protocols",
                "Published 3 ICU audits on urology outcomes"
            ],
            bio: "Calm under pressure and thorough in practice, Dr. Sen ensures seamless ICU care for high-risk urological patients. His leadership has helped standardize post-op urology pathways."
        }
    ]
  },
  {
    name: "Oncology",
    doctors: [
        {
            name: "Dr. Ishaan Mehra",
            gender: "Male",
            image: "/male-doctors/maledoc1.png",
            role: "Senior Medical Oncologist – Solid Tumors",
            qualifications: "MBBS, MD (Internal Medicine), DM (Medical Oncology) – Tata Memorial",
            experience: "12 years",
            achievements: [
                "Led 10+ clinical trials in lung, breast & colon cancer",
                "National Oncology Excellence Award, 2022",
                "Editorial contributor to ASCO Post – India Edition"
            ],
            bio: "A visionary in medical oncology, Dr. Mehra specializes in cutting-edge chemo-immunotherapy protocols. He brings data-driven care and patient dignity into every cancer management plan."
        },
        {
            name: "Dr. Ananya Sen",
            gender: "Female",
            image: "/female-doctors/femaledoc2.png",
            role: "Consultant Radiation Oncologist",
            qualifications: "MBBS, MD (Radiation Oncology), Fellowship in IGRT & SRS – UK",
            experience: "9 years",
            achievements: [
                "Set up high-precision IMRT & SRS workflows at 2 centers",
                "National speaker on women’s cancer and brachytherapy",
                "Authored “Safe Radiotherapy in South Asia” white paper"
            ],
            bio: "With pinpoint precision and patient compassion, Dr. Sen transforms radiation into a healing science. Her protocols improve outcomes while minimizing long-term side effects."
        },
        {
            name: "Dr. Aarav Suri",
            gender: "Male",
            image: "/male-doctors/maledoc3.png",
            role: "Hemato-Oncologist – Leukemia & Lymphoma",
            qualifications: "MBBS, MD (Pediatrics), DM (Hematology), Fellowship – USA",
            experience: "8 years",
            achievements: [
                "Designed pediatric AML and ALL care pathways",
                "Contributor to Journal of Hematologic Oncology",
                "Helped double transplant survival at his previous institute"
            ],
            bio: "Quietly determined and clinically sharp, Dr. Suri is a trusted name in blood cancer care. His personalized regimens have helped many patients achieve full remission."
        },
        {
            name: "Dr. Rhea Thomas",
            gender: "Female",
            image: "/female-doctors/femaledoc4.png",
            role: "Surgical Oncologist – Breast & Head-Neck",
            qualifications: "MBBS, MS (General Surgery), MCh (Surgical Oncology) – AIIMS",
            experience: "7 years",
            achievements: [
                "Established women-centric oncology OPD",
                "National award for breast conservation surgical excellence",
                "Published surgical margin techniques in Indian Oncosurgery Journal"
            ],
            bio: "Focused on preserving life and quality of life, Dr. Thomas performs high-precision surgeries with empathy and elegance. Her work is redefining oncologic surgery standards."
        },
        {
            name: "Dr. Varun Malhotra",
            gender: "Male",
            image: "/male-doctors/maledoc5.png",
            role: "Onco-Pathologist & Tumor Board Director",
            qualifications: "MBBS, MD (Pathology), Fellowship in Molecular Oncology",
            experience: "10 years",
            achievements: [
                "Developed hospital’s AI-integrated biopsy workflow",
                "Authored over 20 publications on cancer biomarker detection",
                "Trained 200+ oncopathologists across India"
            ],
            bio: "Dr. Malhotra ensures that every cancer diagnosis is precise, timely, and treatment-guided. He is the analytical backbone of the oncology team, driving accurate tumor mapping."
        },
        {
            name: "Dr. Sakshi Desai",
            gender: "Female",
            image: "/female-doctors/femaledoc6.png",
            role: "Oncology ICU & Palliative Care Specialist",
            qualifications: "MBBS, Fellowship in Onco-ICU and End-of-Life Care",
            experience: "6 years",
            achievements: [
                "Integrated pain scale tracking in all oncology ICU units",
                "Developed emotional support SOPs for terminal-stage patients",
                "Regular speaker at Indian Palliative Care Forum"
            ],
            bio: "Compassionate yet clinical, Dr. Desai ensures critical care in oncology is patient-centered and humane. Her palliative methods are a gold standard in dignified cancer care."
        },
        {
            name: "Dr. Rajat Menon",
            gender: "Male",
            image: "/male-doctors/maledoc7.png",
            role: "Onco-Critical Care & Emergency Response Lead",
            qualifications: "MBBS, Fellowship in Cancer ICU Management, IDCCM",
            experience: "7 years",
            achievements: [
                "Pioneered emergency sepsis bundles in cancer ICU",
                "Reduced ICU mortality from tumor lysis syndrome by 18%",
                "Faculty at ISCCM Cancer ICU Summit"
            ],
            bio: "Tactical and composed, Dr. Menon leads urgent oncologic crisis response with clinical finesse. His contributions in ICU protocol design have saved countless lives in critical windows."
        }
    ]
  },
  {
    name: "Pediatrics",
    doctors: [
        {
            name: "Dr. Aditi Kulkarni",
            gender: "Female",
            image: "/female-doctors/femaledoc1.png",
            role: "Senior Pediatrician – Infectious Diseases & Immunization",
            qualifications: "MBBS, MD (Pediatrics), Fellowship in Pediatric Infectious Diseases – Singapore",
            experience: "10 years",
            achievements: [
                "Led hospital’s Universal Vaccination Strategy",
                "Published on RSV and rotavirus management in toddlers",
                "WHO consultant on child flu-vaccine implementation"
            ],
            bio: "With expertise in disease prevention and outbreak management, Dr. Kulkarni is a trusted name in pediatric immunity and infection control. Her work has shaped regional child health programs."
        },
        {
            name: "Dr. Rohan Sharma",
            gender: "Male",
            image: "/male-doctors/maledoc2.png",
            role: "Consultant – Pediatric Critical Care",
            qualifications: "MBBS, MD (Pediatrics), Fellowship in Pediatric Intensive Care – UK",
            experience: "8 years",
            achievements: [
                "Designed 24x7 pediatric rapid response code",
                "Reduced mortality in septic shock cases by 20%",
                "Member of International Pediatric Sepsis Taskforce"
            ],
            bio: "Calm under pressure and intensely focused, Dr. Sharma leads the pediatric ICU with excellence. His data-backed protocols ensure better survival rates and faster recovery for children in critical care."
        },
        {
            name: "Dr. Swati Menon",
            gender: "Female",
            image: "/female-doctors/femaledoc3.png",
            role: "Pediatric Neurologist",
            qualifications: "MBBS, MD (Pediatrics), DM (Neurology), Fellowship in Pediatric Neurodevelopment – Canada",
            experience: "7 years",
            achievements: [
                "Developed neuro-behavioral screening tool for children",
                "Published work on pediatric epilepsy and autism",
                "Founded early-intervention clinic for neurodiverse kids"
            ],
            bio: "Dr. Menon combines clinical neuroscience with deep empathy, offering a structured care pathway for children with neurological and developmental disorders."
        },
        {
            name: "Dr. Nikhil Varma",
            gender: "Male",
            image: "/male-doctors/maledoc4.png",
            role: "Neonatologist – NICU & High-Risk Newborn Care",
            qualifications: "MBBS, MD (Pediatrics), Fellowship in Neonatology – Australia",
            experience: "9 years",
            achievements: [
                "Introduced non-invasive ventilation in NICU",
                "Reduced infection rate in preemies by 30%",
                "Led India’s first breast milk bank within NICU ecosystem"
            ],
            bio: "With a passion for micro-preemies and high-risk deliveries, Dr. Varma runs one of the safest NICU units in the region. His clinical protocols ensure both survival and development for fragile newborns."
        },
        {
            name: "Dr. Anjali Mishra",
            gender: "Female",
            image: "/female-doctors/femaledoc5.png",
            role: "Consultant – Pediatric Gastroenterology & Nutrition",
            qualifications: "MBBS, MD (Pediatrics), Fellowship in Pediatric GI – CMC Vellore",
            experience: "6 years",
            achievements: [
                "Devised malnutrition reversal program across 3 states",
                "Conducted India’s first toddler gut microbiome study",
                "Panelist at Asian Pediatric Digestive Conference"
            ],
            bio: "Dr. Mishra’s integrative approach ensures healthy digestion, growth, and energy for young children. Her deep nutritional insights have changed the lives of many undernourished kids."
        },
        {
            name: "Dr. Kabir Sinha",
            gender: "Male",
            image: "/male-doctors/maledoc6.png",
            role: "Pediatric Pulmonologist – Asthma & Lung Development",
            qualifications: "MBBS, MD (Pediatrics), Diploma in Pediatric Pulmonology – UK",
            experience: "7 years",
            achievements: [
                "Founded India’s first child lung rehab center",
                "Published guidelines on pediatric asthma stratification",
                "Regular speaker at Global Pediatric Pulmocare Summit"
            ],
            bio: "Dr. Sinha addresses both chronic and acute respiratory issues in children, offering modern, low-stress treatment solutions for asthma and bronchitis."
        },
        {
            name: "Dr. Isha Khanna",
            gender: "Female",
            image: "/female-doctors/femaledoc7.png",
            role: "Pediatric ICU & Emergency Specialist",
            qualifications: "MBBS, Fellowship in Pediatric Emergency & Resuscitation (FIPEM)",
            experience: "5 years",
            achievements: [
                "Developed CPR simulator training for pediatric staff",
                "Cut pediatric code blue response time by 40%",
                "Published case series on acute trauma resuscitation"
            ],
            bio: "With nerves of steel and a heart for children, Dr. Khanna ensures every pediatric emergency is met with speed, skill, and safety. She’s a core pillar of the hospital’s child emergency unit."
        }
    ]
  },
  {
    name: "Dermatology & Cosmetology",
    doctors: [
        {
            name: "Dr. Priya Nambiar",
            gender: "Female",
            image: "/female-doctors/femaledoc1.png",
            role: "Senior Dermatologist – Clinical & Autoimmune Dermatology",
            qualifications: "MBBS, MD (Dermatology), Fellowship in Immuno-Dermatology – AIIMS",
            experience: "11 years",
            achievements: [
                "Developed regional treatment protocols for psoriasis and vitiligo",
                "National award for excellence in autoimmune skin disorders",
                "Published over 15 research papers on lupus, eczema, and pemphigus"
            ],
            bio: "Dr. Nambiar brings depth and clarity to complex skin conditions. Known for her diagnostic accuracy, she provides relief and long-term care to patients with chronic skin ailments."
        },
        {
            name: "Dr. Raghav Arora",
            gender: "Male",
            image: "/male-doctors/maledoc2.png",
            role: "Consultant Dermatologist – Acne, Scarring & Teen Skin",
            qualifications: "MBBS, MD (Skin & VD), Diploma in Cosmetic Dermatology",
            experience: "8 years",
            achievements: [
                "Introduced teen-focused acne therapy program",
                "Featured on National Skin Health Campaign for Youth",
                "Trainer for microdermabrasion and chemical peel techniques"
            ],
            bio: "Dr. Arora specializes in adolescent dermatology with a balanced approach to hormonal acne and post-acne care. His easy rapport with younger patients builds both trust and results."
        },
        {
            name: "Dr. Sneha Das",
            gender: "Female",
            image: "/female-doctors/femaledoc3.png",
            role: "Cosmetologist – Laser & Aesthetic Procedures",
            qualifications: "MBBS, MD (Dermatology), Fellowship in Laser Cosmetology – Korea",
            experience: "9 years",
            achievements: [
                "Performed 3,000+ successful laser treatments",
                "Established hospital’s aesthetic skin enhancement unit",
                "Faculty speaker at Asia-Aesthetic Congress"
            ],
            bio: "A perfectionist in precision skin care, Dr. Das blends science and art in aesthetic treatments. From pigmentation to rejuvenation, her treatments elevate both confidence and complexion."
        },
        {
            name: "Dr. Manan Trivedi",
            gender: "Male",
            image: "/male-doctors/maledoc4.png",
            role: "Consultant – Hair Restoration & Trichology",
            qualifications: "MBBS, Diploma in Dermatology, Fellowship in Trichology – USA",
            experience: "7 years",
            achievements: [
                "Performed 1,000+ PRP and FUE hair procedures",
                "Created lifestyle-hairfall link protocol used across 6 cities",
                "Guest contributor to Hair India Magazine"
            ],
            bio: "Specializing in hair loss and restoration, Dr. Trivedi delivers cutting-edge, non-invasive solutions for hair wellness. His protocol-based care has transformed self-esteem for hundreds."
        },
        {
            name: "Dr. Meenal Kapoor",
            gender: "Female",
            image: "/female-doctors/femaledoc5.png",
            role: "Pediatric Dermatologist",
            qualifications: "MBBS, MD (Dermatology), Fellowship in Pediatric Skin – Singapore",
            experience: "6 years",
            achievements: [
                "Established first pediatric eczema daycare protocol",
                "Published India's first survey on child psoriasis",
                "Runs monthly pediatric skin camps"
            ],
            bio: "Gentle and deeply knowledgeable, Dr. Kapoor treats infants and children with complex skin conditions. Her soothing demeanor makes skin care less intimidating for both child and parent."
        },
        {
            name: "Dr. Anshika Rao",
            gender: "Female",
            image: "/female-doctors/femaledoc6.png",
            role: "Dermato-Surgeon – Scar & Mole Removal",
            qualifications: "MBBS, MD (Dermatology), Fellowship in Dermatosurgery – Germany",
            experience: "7 years",
            achievements: [
                "Developed scar-free mole excision technique",
                "Created SOPs for post-surgical cosmetic aftercare",
                "TEDx speaker on “Healing Skin, Healing Self”"
            ],
            bio: "Dr. Rao offers surgical precision and aesthetic sensibility in dermatosurgery. Her minimally invasive techniques have redefined the patient experience in skin procedures."
        },
        {
            name: "Dr. Kunal Vernekar",
            gender: "Male",
            image: "/male-doctors/maledoc7.png",
            role: "Dermatology ICU Consultant – Severe Skin Reactions & SJS Care",
            qualifications: "MBBS, MD, Fellowship in Critical Dermatology – AIIMS",
            experience: "6 years",
            achievements: [
                "Developed critical care pathway for SJS/TEN patients",
                "ICU lead for autoimmune blistering diseases",
                "Published ICU dermatology protocols in Indian Derm Review"
            ],
            bio: "Dr. Vernekar provides life-saving care for patients with severe dermatological emergencies. His ICU work in toxic skin reactions has elevated survival and recovery standards."
        }
    ]
  },
  {
    name: "ENT (Otorhinolaryngology)",
    doctors: [
        {
            name: "Dr. Nivedita Rao",
            gender: "Female",
            image: "/female-doctors/femaledoc1.png",
            role: "Senior ENT Surgeon – Otology & Hearing Disorders",
            qualifications: "MBBS, MS (ENT), Fellowship in Otology – Australia",
            experience: "10 years",
            achievements: [
                "Led 2,500+ middle ear surgeries, including cochlear implants",
                "Developed tinnitus and vertigo rehabilitation program",
                "Contributor to WHO's Global Hearing Strategy"
            ],
            bio: "Known for her meticulous surgical skill and sound judgment, Dr. Rao specializes in ear surgeries that restore hearing and balance. She’s a pioneer in auditory restoration at the hospital."
        },
        {
            name: "Dr. Aditya Pillai",
            gender: "Male",
            image: "/male-doctors/maledoc2.png",
            role: "Rhinologist – Sinus & Nasal Surgery",
            qualifications: "MBBS, MS (ENT), Fellowship in Endoscopic Sinus Surgery – UK",
            experience: "9 years",
            achievements: [
                "Introduced balloon sinuplasty and advanced nasal polypectomy",
                "Published guidelines on allergic rhinitis surgical care",
                "Trained 100+ ENT surgeons in FESS technique"
            ],
            bio: "Dr. Pillai is the hospital’s go-to expert for complex nasal and sinus surgeries. His minimally invasive techniques ensure high precision and faster patient recovery."
        },
        {
            name: "Dr. Isha D'Souza",
            gender: "Female",
            image: "/female-doctors/femaledoc3.png",
            role: "Laryngologist – Voice, Throat & Airway Disorders",
            qualifications: "MBBS, MS (ENT), Fellowship in Laryngeal Surgery – USA",
            experience: "8 years",
            achievements: [
                "Developed the region’s first Voice Therapy Unit",
                "Speech rehabilitation expert for laryngeal cancer survivors",
                "Published research on vocal fold microsurgery"
            ],
            bio: "Dr. D’Souza ensures vocal health for both common people and professionals. Her work merges surgical expertise with therapeutic care, helping patients regain their voice in every sense."
        },
        {
            name: "Dr. Karan Chopra",
            gender: "Male",
            image: "/male-doctors/maledoc4.png",
            role: "Pediatric ENT Specialist",
            qualifications: "MBBS, DNB (ENT), Fellowship in Pediatric Otorhinolaryngology – Singapore",
            experience: "6 years",
            achievements: [
                "Created ENT care pathway for children with special needs",
                "Reduced pediatric adenotonsillectomy complications by 30%",
                "Panelist at Asia Pediatric ENT Forum"
            ],
            bio: "Dr. Chopra delivers calm, child-centric ENT care with precision. He is trusted by families for treating airway obstructions, infections, and congenital ENT anomalies in young patients."
        },
        {
            name: "Dr. Amrita Singh",
            gender: "Female",
            image: "/female-doctors/femaledoc5.png",
            role: "Consultant – Head & Neck Onco-Surgery",
            qualifications: "MBBS, MS (ENT), MCh (Head & Neck Surgery)",
            experience: "7 years",
            achievements: [
                "Performed 500+ surgeries for thyroid, laryngeal, and oral cancers",
                "Created speech-preservation surgical protocols",
                "Faculty at National Head-Neck Oncology Consortium"
            ],
            bio: "Dr. Singh combines oncology expertise with functional preservation. Her surgeries prioritize survival without compromising speech, swallowing, or self-confidence."
        },
        {
            name: "Dr. Rishi Desai",
            gender: "Male",
            image: "/male-doctors/maledoc6.png",
            role: "ENT ICU & Emergency Airway Specialist",
            qualifications: "MBBS, MS (ENT), Fellowship in Tracheal & Emergency ENT",
            experience: "6 years",
            achievements: [
                "Developed rapid tracheostomy and emergency airway SOPs",
                "Reduced ENT emergency response time by 50%",
                "Published case studies on foreign body airway rescue"
            ],
            bio: "Dr. Desai ensures swift and lifesaving intervention in ENT emergencies. His calm leadership in airway obstruction cases has made him the backbone of ENT emergency response."
        },
        {
            name: "Dr. Neha Patil",
            gender: "Female",
            image: "/female-doctors/femaledoc7.png",
            role: "ENT Anesthetist & ICU Care Consultant",
            qualifications: "MBBS, MD (Anesthesia), Fellowship in ENT-ICU Monitoring",
            experience: "5 years",
            achievements: [
                "Designed ENT-specific ICU sedation and airway monitoring protocols",
                "Led anesthesia for over 1,200 ENT surgeries",
                "Published sedation guidelines in Indian Journal of Airway Management"
            ],
            bio: "Dr. Patil plays a crucial behind-the-scenes role in ensuring surgical and post-operative ENT care safety. Her focused experience in ENT anesthesiology enhances patient outcomes significantly."
        }
    ]
  }
];
export const achievements = [
  { title: "NABH Full Accreditation", description: "Meeting the highest national standards for patient safety and quality." },
  { title: "24×7 ICU Command Center", description: "Centralized monitoring for all critical care units, ensuring rapid response." },
  { title: "Zero Surgical Infection Rate", description: "Achieved infection-free status through advanced protocols and sterilization." },
  { title: "3000+ Successful Cancer Surgeries", description: "Delivered high-precision oncology care with excellent recovery outcomes." },
  { title: "100% Digital Patient Records", description: "Fully paperless records enabling secure and efficient care delivery." },
  { title: "First Robotic Surgery Unit", description: "Pioneered advanced robotic-assisted procedures in the region." },
  { title: "India’s Youngest Liver Transplant", description: "Successfully operated on a 9-month-old with exceptional outcome." },
  { title: "30-Minute Stroke Response Time", description: "Rapid-response neurology team reduced stroke mortality significantly." },
  { title: "AI-Based Patient Triage System", description: "Implemented machine-learning for smarter, faster patient triage." },
  { title: "In-house Blood Bank Certified", description: "Round-the-clock safe and efficient transfusion services." },
  { title: "Organ Donation Leader – State", description: "Top contributor to organ transplant and donor programs." },
  { title: "Women’s Health Flagship Program", description: "Launched comprehensive care from puberty to menopause." },
  { title: "Mobile Rural Clinic Network Launched", description: "Extended healthcare access to underserved rural communities." },
  { title: "First NICU Milk Bank", description: "Enabled nutrition support for premature and at-risk infants." },
  { title: "Accredited Clinical Research Hub", description: "Recognized center for ethical, innovative medical research." },
  { title: "ISO 9001 Quality Certification", description: "International quality management standard for hospital operations." },
  { title: "10,000+ Cataract-Free Lives", description: "Restored vision through outreach and expert ophthalmology." },
  { title: "Multi-Language Patient Support Team", description: "Inclusive care with support in 10+ regional languages." },
  { title: "CPR Certified for All Staff", description: "Every staff member trained in life-saving emergency care." },
  { title: "First Endoscopic Spine Program", description: "Minimally invasive spinal care with fast recovery times." },
  { title: "Post-Op Recovery Suite Opened", description: "Luxury recovery space for enhanced patient experience." },
  { title: "Autism-Friendly Pediatric Wing", description: "Sensory-safe zones designed for neurodiverse children." },
  { title: "Toxicology & Snakebite Unit", description: "Critical response unit for bites and poison management." },
  { title: "Zero COVID Mortality ICU Month", description: "One full month without ICU COVID-19 fatalities." },
  { title: "Fully Solar-Powered Facility Wing", description: "Clean energy hospital expansion promoting sustainability." },
  { title: "30+ Telemedicine Campuses Linked", description: "Remote consults available across satellite locations." },
  { title: "Public Health Literacy Program", description: "Educated over 1 lakh citizens on preventive health." },
  { title: "Paperless Billing & Discharge", description: "Faster and greener hospital administration experience." },
  { title: "3D Printed Prosthetics Lab", description: "Customized limb solutions for trauma and cancer patients." },
  { title: "Medical Tourism Excellence Award", description: "Recognized as a preferred destination for global patients." }
];

export const branches = [
  { name: "New Delhi Flagship", location: "101, Main Healthcare Road", mapLink: "https://maps.google.com/?q=New+Delhi" },
  { name: "Mumbai Branch", location: "Marine Drive, Mumbai", mapLink: "https://maps.google.com/?q=Mumbai" },
  { name: "Bangalore Center", location: "Indiranagar, Bengaluru", mapLink: "https://maps.google.com/?q=Bangalore" },
  { name: "Hyderabad Specialty Hub", location: "Banjara Hills, Hyderabad", mapLink: "https://maps.google.com/?q=Hyderabad" },
  { name: "Chennai Advanced Care", location: "OMR Road, Chennai", mapLink: "https://maps.google.com/?q=Chennai" },
  { name: "Kolkata East Wing", location: "Salt Lake Sector V, Kolkata", mapLink: "https://maps.google.com/?q=Kolkata" },
  { name: "Pune Medical Center", location: "FC Road, Pune", mapLink: "https://maps.google.com/?q=Pune" },
  { name: "Ahmedabad Wellness Branch", location: "SG Highway, Ahmedabad", mapLink: "https://maps.google.com/?q=Ahmedabad" },
  { name: "Jaipur Regional Hospital", location: "Tonk Road, Jaipur", mapLink: "https://maps.google.com/?q=Jaipur" },
  { name: "Lucknow Satellite Clinic", location: "Gomti Nagar, Lucknow", mapLink: "https://maps.google.com/?q=Lucknow" ,image: "/hospital1.png",}
];