"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "ne" | "en";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (s: BiString) => string;
};

const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ne");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (stored === "ne" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);

  const value: Ctx = {
    lang,
    setLang,
    t: (s) => (lang === "en" ? s.en : s.ne),
  };

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}

export type BiString = { ne: string; en: string };
export type BiArr = { ne: string[]; en: string[] };

/** Pull a bilingual field stored as `<base>Ne` / `<base>En`. */
export function lt<T extends Record<string, any>>(obj: T | undefined | null, base: string, lang: Lang): string {
  if (!obj) return "";
  const key = base + (lang === "en" ? "En" : "Ne");
  return (obj[key] ?? obj[base] ?? "") as string;
}

export const STR: Record<string, BiString> = {
  navHome:        { ne: "गृह",          en: "Home" },
  navPriorities:  { ne: "प्राथमिकता",    en: "Priorities" },
  navLamjung:     { ne: "लमजुङ",         en: "Lamjung" },
  navSectors:     { ne: "क्षेत्र",        en: "Sectors" },
  navParliament:  { ne: "संसद",          en: "Parliament" },
  navNews:        { ne: "समाचार",        en: "News" },
  navGrievance:   { ne: "गुनासो",        en: "Grievance" },
  navEvents:      { ne: "कार्यक्रम",      en: "Events" },
  navContact:     { ne: "सम्पर्क",        en: "Contact" },

  heroKicker:  { ne: "सांसद, प्रतिनिधि सभा · लमजुङ १", en: "Member of Parliament, HoR · Lamjung 1" },
  heroCTA1:    { ne: "गुनासो दर्ता गर्नुहोस्",          en: "File a grievance" },
  heroCTA2:    { ne: "दृष्टिकोण हेर्नुहोस्",            en: "See the vision" },
  heroScroll:  { ne: "तल स्क्रोल गर्नुहोस्",           en: "Scroll" },

  liveBadge: { ne: "सदन बैठक प्रत्यक्ष",             en: "House in session" },
  inSession: { ne: "संघीय संसद — हिउँदे अधिवेशन",   en: "Federal Parliament — winter session" },

  prioritiesKicker: { ne: "कार्य योजना",                              en: "Action plan" },
  prioritiesTitle:  { ne: "लमजुङका ६ प्राथमिकता, अहिले सदनमा",       en: "Six priorities for Lamjung — on the floor now" },
  prioritiesSub:    { ne: "प्रत्येक विधेयक, बजेट र निरीक्षणको अद्यावधिक स्थिति।", en: "Live status of every bill, budget ask and site inspection." },

  mapKicker:    { ne: "लमजुङ — ८ स्थानीय तह",                    en: "Lamjung — 8 local levels" },
  mapTitle:     { ne: "जिल्लाको अन्तरक्रियात्मक नक्सा",            en: "Interactive district map" },
  mapSub:       { ne: "पालिकामा क्लिक गर्नुहोस् — परियोजना, जनसंख्या र मुख्य विषय हेर्नुहोस्।", en: "Tap a palika to see projects, population and key issues." },
  mapTotalProj: { ne: "कुल सक्रिय परियोजना",                      en: "Total active projects" },
  mapPop:       { ne: "जनसंख्या",                                 en: "Population" },
  mapArea:      { ne: "क्षेत्रफल",                                 en: "Area" },
  mapWards:     { ne: "वडा",                                       en: "Wards" },
  mapProjects:  { ne: "सक्रिय परियोजना",                           en: "Active projects" },
  mapKeyIssues: { ne: "मुख्य विषय",                                en: "Key issues" },
  mapHQ:        { ne: "जिल्ला सदरमुकाम",                          en: "District HQ" },

  sectorsKicker:  { ne: "लमजुङका क्षेत्रहरू",                      en: "Sectors" },
  sectorsTitle:   { ne: "समस्या, सम्भावना र हाम्रो जवाफ",         en: "Problems, potential and our response" },
  sectorProjects: { ne: "हालका परियोजना",                          en: "Current projects" },

  parlKicker:    { ne: "सदनमा",   en: "On the floor" },
  parlTitle:     { ne: "सांसदीय कार्य", en: "Parliamentary activity" },
  parlAll:       { ne: "सबै",       en: "All" },
  parlBills:     { ne: "विधेयक",   en: "Bills" },
  parlQuestions: { ne: "प्रश्न",    en: "Questions" },
  parlCommittee: { ne: "समिति",    en: "Committee" },
  parlSpeeches:  { ne: "भाषण",     en: "Speeches" },

  newsKicker: { ne: "समाचार र प्रेस", en: "News & press" },
  newsTitle:  { ne: "भर्खरका अपडेट",  en: "Recent updates" },
  newsAll:    { ne: "सबै हेर्नुहोस्",   en: "View all" },

  grKicker:       { ne: "नागरिक सेवा",                                       en: "Citizen service" },
  grTitle:        { ne: "गुनासो वा सुझाव दर्ता गर्नुहोस्",                    en: "File a grievance or suggestion" },
  grSub:          { ne: "तपाईंको नाम र ठेगानासहित दर्ता गर्नुहोस् — ७२ घण्टाभित्र जवाफ।", en: "Submit with your name and address — response within 72 hours." },
  grName:         { ne: "पूरा नाम",                                           en: "Full name" },
  grPhone:        { ne: "मोबाइल नम्बर",                                      en: "Mobile number" },
  grPalika:       { ne: "पालिका",                                             en: "Palika" },
  grWard:         { ne: "वडा",                                                en: "Ward" },
  grCategory:     { ne: "विषय वर्ग",                                          en: "Category" },
  grMessage:      { ne: "विवरण",                                              en: "Details" },
  grAttach:       { ne: "फाइल/पत्र संलग्न गर्नुहोस्",                          en: "Attach file / letter" },
  grAttachHint:   { ne: "वैकल्पिक — हार्डकपी पत्र, फोटो वा PDF (अधिकतम १० MB)", en: "Optional — hardcopy letter, photo or PDF (max 10 MB)" },
  grAttachRemove: { ne: "हटाउनुहोस्",                                         en: "Remove" },
  grSubmit:       { ne: "दर्ता गर्नुहोस्",                                     en: "Submit" },
  grTrack:        { ne: "दर्ता न. बाट खोज्नुहोस्",                             en: "Track by ID" },
  grTrackPlaceholder: { ne: "LJ-2082-XXXX",                                    en: "LJ-2082-XXXX" },
  grRecent:       { ne: "हालका दर्ता (नमुना)",                                en: "Recent entries (sample)" },
  grSuccessTitle: { ne: "दर्ता भयो",                                          en: "Submitted" },
  grSuccessSub:   { ne: "तपाईंको दर्ता नम्बर:",                                en: "Your reference ID:" },
  grSuccessNote:  { ne: "७२ घण्टाभित्र तपाईंलाई SMS मार्फत अपडेट आउनेछ।",     en: "You will receive an SMS update within 72 hours." },
  grConfidential: { ne: "गुनासो दर्ता गर्ने व्यक्तिको पहिचान गोप्य राखिनेछ।",   en: "The identity of the person filing the grievance will be kept confidential." },

  optional:       { ne: "वैकल्पिक",                                           en: "optional" },
  mapPlaces:      { ne: "लोकप्रिय स्थलहरू",                                    en: "Popular places" },
  mapPlacesNote:  { ne: "यस पालिकाका उल्लेखनीय स्थल र आकर्षणहरू।",             en: "Notable places and attractions in this palika." },
  mapPlacesEmpty: { ne: "यस पालिकाका स्थलहरू छिट्टै थपिनेछन्।",                 en: "Places for this palika will be added soon." },

  pbButton:       { ne: "परियोजना बैंक",                                      en: "Project Bank" },
  pbButtonSub:    { ne: "आफ्नो ठाउँको परियोजना दर्ता गरी बजेट माग्नुहोस्",     en: "Submit a project from your area & request funding" },
  pbKicker:       { ne: "परियोजना बैंक",                                      en: "Project Bank" },
  pbTitle:        { ne: "आफ्नो ठाउँको परियोजना दर्ता गर्नुहोस्",               en: "Submit a project from your area" },
  pbSub:          { ne: "लमजुङका नागरिकहरूले आफ्नो वडा/पालिकाको आवश्यक परियोजना यहाँ दर्ता गरी सांसद धर्मराज के.सी. मार्फत सरकारबाट बजेट माग्न सक्नुहुन्छ।", en: "Lamjung citizens can register a project their ward/palika needs and request government funding through MP Dharma Raj K.C." },
  pbProjTitle:    { ne: "परियोजनाको नाम",                                      en: "Project title" },
  pbProjTitlePh:  { ne: "जस्तै: राइनास–२ खानेपानी लिफ्ट योजना",                en: "e.g. Rainas-2 lift water supply scheme" },
  pbBudget:       { ne: "अनुमानित बजेट (रू.)",                                 en: "Estimated budget (NPR)" },
  pbBudgetPh:     { ne: "जस्तै: ५० लाख",                                       en: "e.g. 50 lakh" },
  pbBenef:        { ne: "लाभान्वित घरधुरी (अनुमानित)",                          en: "Households benefited (est.)" },
  pbOrg:          { ne: "संस्था वा सामुदायिक समूहको नाम",                       en: "Organization / community group name" },
  pbResp:         { ne: "जिम्मेवार व्यक्ति र पद",                              en: "Responsible person & designation" },
  pbRespPh:       { ne: "जस्तै: सीता गुरुङ — अध्यक्ष",                          en: "e.g. Sita Gurung — Chairperson" },
  pbDesc:         { ne: "परियोजनाको विवरण र औचित्य",                           en: "Project details & justification" },
  pbDescPh:       { ne: "के–कस्तो परियोजना, किन आवश्यक, हालको अवस्था लेख्नुहोस्…", en: "What the project is, why it is needed, current status…" },
  pbSubmit:       { ne: "परियोजना दर्ता गर्नुहोस्",                            en: "Submit project" },
  pbList:         { ne: "दर्ता भएका परियोजना (नमुना)",                          en: "Submitted projects (sample)" },
  pbListNote:     { ne: "सांसद कार्यालयले परियोजनाको प्रकृति हेरी प्राथमिकता निर्धारण गर्छ।", en: "The MP office reviews each request and assigns a priority." },
  pbPriority:     { ne: "प्राथमिकता",                                          en: "MP priority" },
  pbPrioHigh:     { ne: "उच्च",                                               en: "High" },
  pbPrioMed:      { ne: "मध्यम",                                              en: "Medium" },
  pbPrioLow:      { ne: "सामान्य",                                            en: "Low" },
  pbPrioReview:   { ne: "समीक्षामा",                                          en: "Under review" },
  pbSuccessTitle: { ne: "परियोजना दर्ता भयो",                                  en: "Project submitted" },
  pbSuccessSub:   { ne: "तपाईंको परियोजना दर्ता नम्बर:",                        en: "Your project reference ID:" },
  pbSuccessNote:  { ne: "सांसद कार्यालयले समीक्षा गरी प्राथमिकता तोक्नेछ र तपाईंलाई जानकारी गराइनेछ।", en: "The MP office will review, assign a priority, and keep you informed." },

  eventsKicker: { ne: "क्यालेन्डर",      en: "Calendar" },
  eventsTitle:  { ne: "आगामी कार्यक्रम", en: "Upcoming events" },

  footerAddress:    { ne: "सांसद सम्पर्क कार्यालय · बेसीशहर–३, लमजुङ",   en: "MP Liaison Office · Besisahar-3, Lamjung" },
  footerDisclaimer: { ne: "यो आधिकारिक पोर्टल हो। कुनै पनि विवरण प्रयोगको अनुमतिका लागि सम्पर्क गर्नुहोस्।", en: "Official portal. Contact the office for permission before reusing content." },
  footerMadeWith:   { ne: "लमजुङबासीका लागि बनाइएको",                       en: "Built for the people of Lamjung" },
};
