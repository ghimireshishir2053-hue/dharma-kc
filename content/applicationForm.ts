export type Opt = { value: string; ne: string; en: string };

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "textarea"
  | "select"
  | "checkboxes"
  | "radio"
  | "consent";

export type FieldDef = {
  id: string;
  type: FieldType;
  labelNe: string;
  labelEn: string;
  helperNe?: string;
  helperEn?: string;
  placeholderNe?: string;
  placeholderEn?: string;
  required?: boolean;
  options?: Opt[];
  rows?: number;
  maxLength?: number;
};

export type SectionDef = {
  id: string;
  titleNe: string;
  titleEn: string;
  descNe?: string;
  descEn?: string;
  fields: FieldDef[];
};

const SECTORS: Opt[] = [
  { value: "education", ne: "शिक्षा", en: "Education" },
  { value: "health", ne: "स्वास्थ्य", en: "Health" },
  { value: "tourism", ne: "पर्यटन", en: "Tourism" },
  { value: "hydro", ne: "जलविद्युत् र ऊर्जा", en: "Hydropower & Energy" },
  { value: "water", ne: "खानेपानी र सरसफाइ", en: "Water Supply & Sanitation" },
  { value: "roads", ne: "सडक र पूर्वाधार", en: "Roads & Infrastructure" },
  { value: "agri", ne: "कृषि", en: "Agriculture" },
  { value: "finance", ne: "वित्त र आर्थिक विकास", en: "Finance & Economic Development" },
  { value: "other", ne: "अन्य", en: "Other" },
];

const CONNECTION: Opt[] = [
  { value: "born", ne: "लमजुङमा जन्मेको", en: "Born in Lamjung" },
  { value: "raised", ne: "लमजुङमा हुर्केको", en: "Raised in Lamjung" },
  { value: "roots", ne: "पारिवारिक जरा लमजुङमा", en: "Family roots in Lamjung" },
  { value: "living", ne: "हाल लमजुङमा बस्दै", en: "Currently living in Lamjung" },
  { value: "working", ne: "लमजुङसँग काम गर्दै", en: "Working in/with Lamjung" },
  { value: "other", ne: "अन्य", en: "Other" },
];

const AGE: Opt[] = [
  { value: "u25", ne: "२५ मुनि", en: "Under 25" },
  { value: "25-34", ne: "२५–३४", en: "25–34" },
  { value: "35-44", ne: "३५–४४", en: "35–44" },
  { value: "45-54", ne: "४५–५४", en: "45–54" },
  { value: "55+", ne: "५५+", en: "55+" },
];

const GENDER: Opt[] = [
  { value: "woman", ne: "महिला", en: "Woman" },
  { value: "man", ne: "पुरुष", en: "Man" },
  { value: "nb", ne: "अन्य", en: "Non-binary" },
  { value: "prefer", ne: "भन्न चाहन्न", en: "Prefer not to say" },
];

const YEARS: Opt[] = [
  { value: "u3", ne: "३ भन्दा कम", en: "Under 3" },
  { value: "3-5", ne: "३–५", en: "3–5" },
  { value: "6-10", ne: "६–१०", en: "6–10" },
  { value: "11-15", ne: "११–१५", en: "11–15" },
  { value: "16+", ne: "१६+", en: "16+" },
];

const QUAL: Opt[] = [
  { value: "bachelor", ne: "स्नातक", en: "Bachelor" },
  { value: "masters", ne: "स्नातकोत्तर", en: "Masters" },
  { value: "phd", ne: "विद्यावारिधि", en: "PhD" },
  { value: "prof", ne: "व्यावसायिक प्रमाणपत्र", en: "Professional certification" },
  { value: "other", ne: "अन्य", en: "Other" },
];

const YES_NO: Opt[] = [
  { value: "yes", ne: "छु", en: "Yes" },
  { value: "no", ne: "छैन", en: "No" },
];

const YES_NO_MAYBE: Opt[] = [
  { value: "yes", ne: "छु", en: "Yes" },
  { value: "maybe", ne: "सायद (मितिमा निर्भर)", en: "Maybe (depends on dates)" },
  { value: "no", ne: "छैन", en: "No" },
];

const HOURS: Opt[] = [
  { value: "1-3", ne: "१–३ घण्टा", en: "1–3 hrs" },
  { value: "4-7", ne: "४–७ घण्टा", en: "4–7 hrs" },
  { value: "8-15", ne: "८–१५ घण्टा", en: "8–15 hrs" },
  { value: "16+", ne: "१६+ घण्टा", en: "16+ hrs" },
  { value: "project", ne: "परियोजना-आधारित", en: "Project-based" },
];

const TRAVEL: Opt[] = [
  { value: "full", ne: "पूर्ण सहयोग चाहिन्छ", en: "Yes (full support needed)" },
  { value: "partial", ne: "आंशिक", en: "Partial" },
  { value: "none", ne: "चाहिँदैन", en: "No" },
];

const MENTOR: Opt[] = [
  { value: "yes", ne: "इच्छुक छु", en: "Yes" },
  { value: "maybe", ne: "सायद", en: "Maybe" },
  { value: "no", ne: "छैन", en: "No" },
];

const LANGS: Opt[] = [
  { value: "ne", ne: "नेपाली", en: "Nepali" },
  { value: "en", ne: "अंग्रेजी", en: "English" },
  { value: "gurung", ne: "गुरुङ", en: "Gurung" },
  { value: "tamang", ne: "तामाङ", en: "Tamang" },
  { value: "other", ne: "अन्य", en: "Other" },
];

export const FORM: SectionDef[] = [
  {
    id: "basic",
    titleNe: "आधारभूत विवरण",
    titleEn: "Basic Information",
    descNe: "तपाईं को हुनुहुन्छ र हामी कसरी सम्पर्क गर्न सक्छौँ भन्नुहोस्।",
    descEn: "Tell us who you are and how to reach you.",
    fields: [
      { id: "name", type: "text", labelNe: "पूरा नाम", labelEn: "Full name", required: true },
      { id: "email", type: "email", labelNe: "इमेल", labelEn: "Email", required: true },
      {
        id: "phone", type: "tel",
        labelNe: "मोबाइल (देशको कोडसहित, जस्तै +९७७)",
        labelEn: "Phone (with country code, e.g. +977)",
        placeholderNe: "+९७७ ९८xxxxxxxx",
        placeholderEn: "+977 98xxxxxxxx",
        required: true,
      },
      {
        id: "currentLocation", type: "text",
        labelNe: "हालको स्थान (सहर, देश)",
        labelEn: "Current location (city, country)",
        required: true,
      },
      {
        id: "permanentAddress", type: "textarea",
        labelNe: "स्थायी ठेगाना",
        labelEn: "Permanent address",
        rows: 2, required: true,
      },
      {
        id: "connection", type: "select",
        labelNe: "लमजुङसँगको सम्बन्ध",
        labelEn: "Connection to Lamjung",
        required: true, options: CONNECTION,
      },
      { id: "age", type: "select", labelNe: "उमेर समूह", labelEn: "Age group", options: AGE },
      { id: "gender", type: "select", labelNe: "लिङ्ग", labelEn: "Gender", options: GENDER },
    ],
  },
  {
    id: "professional",
    titleNe: "पेशागत पृष्ठभूमि",
    titleEn: "Professional Background",
    fields: [
      { id: "role", type: "text", labelNe: "हालको पद / भूमिका", labelEn: "Current role / title", required: true },
      { id: "organization", type: "text", labelNe: "हालको संस्था", labelEn: "Current organization", required: true },
      {
        id: "sectors", type: "checkboxes",
        labelNe: "विशेषज्ञताको क्षेत्र (लागू हुने सबै)",
        labelEn: "Sector(s) of expertise (select all that apply)",
        required: true, options: SECTORS,
      },
      {
        id: "subSpecialization", type: "text",
        labelNe: "उप-विशेषज्ञता (वैकल्पिक)",
        labelEn: "Sub-specialization (optional)",
        placeholderNe: "जस्तै: मातृ स्वास्थ्य, लघु-जलविद्युत्",
        placeholderEn: "e.g., maternal health, micro-hydro",
      },
      {
        id: "yearsExperience", type: "select",
        labelNe: "क्षेत्रमा अनुभवका वर्ष",
        labelEn: "Years of experience in sector",
        required: true, options: YEARS,
      },
      {
        id: "qualification", type: "select",
        labelNe: "उच्चतम शैक्षिक योग्यता",
        labelEn: "Highest qualification",
        required: true, options: QUAL,
      },
      {
        id: "achievements", type: "textarea",
        labelNe: "प्रमुख ३ उपलब्धि (एक हरफ प्रति)",
        labelEn: "Top 3 achievements (one per line)",
        rows: 4, required: true,
      },
    ],
  },
  {
    id: "validation",
    titleNe: "विशेषज्ञता प्रमाणीकरण",
    titleEn: "Expertise Validation",
    fields: [
      {
        id: "lamjungExperience", type: "textarea",
        labelNe: "लमजुङ वा समान पहाडी जिल्लासँगको अनुभव वर्णन गर्नुहोस्",
        labelEn: "Describe your experience relevant to Lamjung or comparable hill districts",
        helperNe: "अधिकतम २५० शब्द",
        helperEn: "Max 250 words",
        rows: 5, required: true, maxLength: 2000,
      },
      {
        id: "projects", type: "textarea",
        labelNe: "मापनयोग्य प्रभावसहित १–२ परियोजना साझा गर्नुहोस्",
        labelEn: "Share 1–2 projects with measurable impact",
        helperNe: "के थियो, कसलाई फाइदा, अंकमा। अधिकतम ३०० शब्द",
        helperEn: "What, who benefited, with numbers. Max 300 words",
        rows: 6, required: true, maxLength: 2500,
      },
      {
        id: "portfolioLink", type: "url",
        labelNe: "पोर्टफोलियो / LinkedIn / वेबसाइट लिङ्क",
        labelEn: "Portfolio / LinkedIn / website link",
        placeholderNe: "https://…", placeholderEn: "https://…",
      },
      {
        id: "cvLink", type: "url",
        labelNe: "CV लिङ्क (Google Drive, Dropbox, etc.)",
        labelEn: "CV link (Google Drive, Dropbox, etc.)",
        helperNe: "लिङ्क सार्वजनिक वा 'view' पहुँच भएको सुनिश्चित गर्नुहोस्",
        helperEn: "Make sure the link is public or view-accessible",
      },
    ],
  },
  {
    id: "problem",
    titleNe: "समस्या समाधान क्षमता",
    titleEn: "Problem-Solving Ability",
    fields: [
      {
        id: "topProblems", type: "textarea",
        labelNe: "लमजुङमा तपाईंको क्षेत्रका प्रमुख ३ समस्या",
        labelEn: "Top 3 problems in your sector in Lamjung",
        rows: 4, required: true, maxLength: 1500,
      },
      {
        id: "solution", type: "textarea",
        labelNe: "त्यस मध्ये एउटा समस्या रोजेर व्यावहारिक समाधान प्रस्ताव गर्नुहोस्",
        labelEn: "Pick one of those problems and propose a practical solution",
        helperNe: "ठोस बन्नुहोस्। अधिकतम ३०० शब्द",
        helperEn: "Be concrete. Max 300 words",
        rows: 6, required: true, maxLength: 2500,
      },
      {
        id: "implementation", type: "textarea",
        labelNe: "स्थानीय स्तरमा कार्यान्वयन रणनीति (साझेदार, बजेट स्तर, समयरेखा)",
        labelEn: "Implementation approach at local level (partners, budget scale, timeline)",
        helperNe: "अधिकतम २०० शब्द",
        helperEn: "Max 200 words",
        rows: 4, required: true, maxLength: 1600,
      },
      {
        id: "kpis", type: "textarea",
        labelNe: "सफलता मापनका KPI (वैकल्पिक)",
        labelEn: "KPIs to measure success (optional)",
        rows: 3,
      },
    ],
  },
  {
    id: "commitment",
    titleNe: "प्रतिबद्धता र उपलब्धता",
    titleEn: "Commitment & Availability",
    fields: [
      {
        id: "virtualMeet", type: "radio",
        labelNe: "६०–९० मिनेटको भर्चुअल परामर्शमा सहभागी हुन इच्छुक?",
        labelEn: "Willing to join a 60–90 min virtual consultation?",
        required: true, options: YES_NO,
      },
      {
        id: "workshop", type: "radio",
        labelNe: "बेसीशहरमा २–३ दिने कार्यशालामा सहभागी हुन इच्छुक?",
        labelEn: "Willing to attend a 2–3 day workshop in Besisahar?",
        required: true, options: YES_NO_MAYBE,
      },
      {
        id: "hoursPerWeek", type: "select",
        labelNe: "अर्को ३ महिनामा प्रति हप्ता कति समय दिन सक्नुहुन्छ?",
        labelEn: "Hours/week you can commit over the next 3 months",
        required: true, options: HOURS,
      },
      {
        id: "travelSupport", type: "radio",
        labelNe: "कार्यशालाका लागि यात्रा/बसाइ सहयोग आवश्यक?",
        labelEn: "Travel / accommodation support needed for workshop?",
        required: true, options: TRAVEL,
      },
    ],
  },
  {
    id: "optional",
    titleNe: "वैकल्पिक तर मूल्यवान",
    titleEn: "Optional but Valuable",
    fields: [
      {
        id: "priorCollaboration", type: "textarea",
        labelNe: "नीति / सरकारसँगको अघिल्लो सहकार्य अनुभव",
        labelEn: "Prior policy / government collaboration experience",
        rows: 3,
      },
      {
        id: "mentorLead", type: "radio",
        labelNe: "क्षेत्रगत कार्यदलको नेतृत्व वा मार्गदर्शन गर्न इच्छुक?",
        labelEn: "Willing to mentor or lead a sector working group?",
        options: MENTOR,
      },
      {
        id: "languages", type: "checkboxes",
        labelNe: "काम गर्न सजिलो लाग्ने भाषा(हरू)",
        labelEn: "Language(s) you're comfortable working in",
        options: LANGS,
      },
      {
        id: "notes", type: "textarea",
        labelNe: "समितिलाई थप केही भन्न चाहानुहुन्छ?",
        labelEn: "Anything else we should know?",
        rows: 3,
      },
    ],
  },
  {
    id: "consent",
    titleNe: "सहमति",
    titleEn: "Consent",
    fields: [
      {
        id: "consent", type: "consent",
        labelNe: "म यो आवेदन समीक्षाका लागि सांसद कार्यालयको छनोट समितिले सम्पर्क गर्ने र जानकारी हेर्ने कुरामा सहमत छु।",
        labelEn: "I consent to be contacted and reviewed by the MP office's selection committee.",
        required: true,
      },
    ],
  },
];
