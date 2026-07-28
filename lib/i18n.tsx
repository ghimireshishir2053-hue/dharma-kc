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
  navVideos:      { ne: "भिडियो",        en: "Videos" },
  navNews:        { ne: "समाचार",        en: "News" },
  navGrievance:   { ne: "गुनासो",        en: "Grievance" },
  navEvents:      { ne: "कार्यक्रम",      en: "Events" },
  navCalendar:    { ne: "आजको कार्यक्रम", en: "Today's Program" },

  calTitle:       { ne: "कार्यक्रम क्यालेन्डर", en: "Program Calendar" },
  calSubtitle:    { ne: "सांसद धर्मराज के.सी.को दैनिक तालिका र सार्वजनिक कार्यक्रमहरू", en: "Hon. Dharma Raj K.C.'s public schedule and daily engagements" },
  calToday:       { ne: "आज", en: "Today" },
  calNoEvents:    { ne: "यो मितिमा कुनै कार्यक्रम छैन", en: "No events on this date" },
  calEventsOn:    { ne: "का कार्यक्रमहरू", en: "Events on" },
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
  mapSub:       { ne: "पालिकामा क्लिक गर्नुहोस् — जनसंख्या, क्षेत्रफल र मुख्य आकर्षण हेर्नुहोस्।", en: "Tap a palika to see its population, area and top attractions." },
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

  videosKicker: { ne: "भाषण र अन्तर्वार्ता",        en: "Talks & interviews" },
  videosTitle:  { ne: "भिडियो",                     en: "Videos" },
  videosSub:    { ne: "सांसद धर्मराज के.सी.का सामाजिक सञ्जालमा प्रकाशित भाषण र अन्तर्वार्ता।", en: "Talks and interviews by MP Dharma Raj K.C. published across social media." },
  videosWatch:  { ne: "हेर्नुहोस्",                  en: "Watch" },
  videosEmpty:  { ne: "भिडियो छिट्टै थपिनेछन्।",      en: "Videos will be added soon." },

  newsKicker: { ne: "समाचार र प्रेस", en: "News & press" },
  newsTitle:  { ne: "भर्खरका अपडेट",  en: "Recent updates" },
  newsAll:    { ne: "सबै हेर्नुहोस्",   en: "View all" },

  grKicker:       { ne: "नागरिक सेवा",                                       en: "Citizen service" },
  grTitle:        { ne: "गुनासो वा सुझाव दर्ता गर्नुहोस्",                    en: "File a grievance or suggestion" },
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
  grSuccessTitle: { ne: "दर्ता भयो",                                          en: "Submitted" },
  grSuccessSub:   { ne: "तपाईंको दर्ता नम्बर:",                                en: "Your reference ID:" },
  grSuccessNote:  { ne: "७२ घण्टाभित्र तपाईंलाई SMS मार्फत अपडेट आउनेछ।",     en: "You will receive an SMS update within 72 hours." },
  grConfidential: { ne: "गुनासो दर्ता गर्ने व्यक्तिको पहिचान गोप्य राखिनेछ।",   en: "The identity of the person filing the grievance will be kept confidential." },

  optional:       { ne: "वैकल्पिक",                                           en: "optional" },

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
  pbSuccessTitle: { ne: "परियोजना दर्ता भयो",                                  en: "Project submitted" },
  pbSuccessSub:   { ne: "तपाईंको परियोजना दर्ता नम्बर:",                        en: "Your project reference ID:" },
  pbSuccessNote:  { ne: "सांसद कार्यालयले समीक्षा गरी प्राथमिकता तोक्नेछ र तपाईंलाई जानकारी गराइनेछ।", en: "The MP office will review, assign a priority, and keep you informed." },

  eventsKicker: { ne: "क्यालेन्डर",      en: "Calendar" },
  eventsTitle:  { ne: "आगामी कार्यक्रम", en: "Upcoming events" },

  navKrishiBank: { ne: "कृषि बैंक", en: "Krishi Bank" },
  navDiaspora:   { ne: "डायस्पोरा", en: "Diaspora" },

  kbButton:       { ne: "कृषि बैंक",                                          en: "Krishi Bank" },
  kbButtonSub:    { ne: "आफ्नो उत्पादन बेच्नुहोस् वा किन्ने व्यापारी खोज्नुहोस्", en: "Sell your produce or find a buyer" },
  kbKicker:       { ne: "कृषि बैंक",                                          en: "Krishi Bank" },
  kbTitle:        { ne: "किसान र बजार बीचको सिधा पुल",                        en: "A direct bridge between farmers and markets" },
  kbSub:          { ne: "लमजुङका किसानले आफ्नो उत्पादन यहाँ सूचीबद्ध गर्न सक्नुहुन्छ, र नेपालका सहरका व्यापारीले चाहिने उत्पादन खोज्न सक्नुहुन्छ। सिधा फोन सम्पर्क — बिचौलिया छैन।", en: "Lamjung farmers can list their produce here, and traders from cities across Nepal can find what they need. Direct phone contact — no middleman." },
  kbToggleFarmer: { ne: "म किसान हुँ — उत्पादन बेच्छु",                        en: "I'm a farmer — selling produce" },
  kbToggleBuyer:  { ne: "म व्यापारी हुँ — उत्पादन किन्छु",                      en: "I'm a buyer — sourcing produce" },
  kbProduce:      { ne: "उत्पादन छान्नुहोस्",                                  en: "Select produce" },
  kbQty:          { ne: "परिमाण",                                             en: "Quantity" },
  kbQtyPh:        { ne: "जस्तै: ५०० के.जी.",                                   en: "e.g. 500 kg" },
  kbPrice:        { ne: "मूल्य (वैकल्पिक)",                                    en: "Price" },
  kbPricePh:      { ne: "जस्तै: रू. ३५/के.जी. वा मोलमोलाइ योग्य",              en: "e.g. NPR 35/kg or Negotiable" },
  kbBusiness:     { ne: "पसल/व्यापारको नाम",                                   en: "Business name" },
  kbBusinessPh:   { ne: "जस्तै: थोक तरकारी पसल",                               en: "e.g. Wholesale vegetable shop" },
  kbCity:         { ne: "सहर",                                                en: "City" },
  kbCityPh:       { ne: "जस्तै: पोखरा, काठमाडौं",                              en: "e.g. Pokhara, Kathmandu" },
  kbSubmitFarmer: { ne: "उत्पादन सूचीबद्ध गर्नुहोस्",                           en: "List my produce" },
  kbSubmitBuyer:  { ne: "अनुरोध पेश गर्नुहोस्",                                en: "Post buyer request" },
  kbSuccessTitle: { ne: "सूचीबद्ध भयो",                                        en: "Listed successfully" },
  kbSuccessSub:   { ne: "तपाईंको सन्दर्भ नम्बर:",                              en: "Your reference ID:" },
  kbSuccessNoteFarmer: { ne: "तपाईंको सूचना दर्ता भएका व्यापारीलाई SMS मार्फत तुरुन्तै पठाइयो।", en: "Your listing was sent by SMS to registered buyers immediately." },
  kbNotifiedCount:     { ne: "जना व्यापारीलाई SMS सूचना पठाइयो",                     en: "buyers notified by SMS" },
  kbSuccessNoteBuyer:  { ne: "तपाईं दर्ता हुनुभयो। यस उत्पादनमा नयाँ किसानले सूची राख्दा तपाईंलाई SMS मार्फत सूचना जानेछ।", en: "You're registered. You'll get an SMS whenever a farmer lists this produce." },
  kbOtherProduce:   { ne: "उत्पादनको नाम लेख्नुहोस्",                          en: "Name your produce" },
  kbOtherProducePh: { ne: "जस्तै: कागती, अम्बा, बेसार",                        en: "e.g. Lime, Guava, Turmeric" },
  kbHowTitle:       { ne: "यसरी काम गर्छ — ३ सजिला चरण",                       en: "How it works — 3 simple steps" },
  kbHowFarmer:      { ne: "किसानका लागि",                                     en: "For farmers" },
  kbHowFarmer1:     { ne: "उत्पादन छान्नुहोस्",                                en: "Pick your produce" },
  kbHowFarmer2:     { ne: "परिमाण र फोन नम्बर लेख्नुहोस्",                     en: "Enter quantity & phone" },
  kbHowFarmer3:     { ne: "मिल्दो व्यापारीलाई SMS मार्फत तुरुन्तै सूचना जान्छ",  en: "Matching buyers get an SMS instantly" },
  kbHowBuyer:       { ne: "व्यापारीका लागि",                                   en: "For buyers" },
  kbHowBuyer1:      { ne: "चाहिने उत्पादन छान्नुहोस्",                         en: "Pick what you need" },
  kbHowBuyer2:      { ne: "सहर र फोन नम्बर लेख्नुहोस्",                        en: "Enter your city & phone" },
  kbHowBuyer3:      { ne: "मिल्दो किसानले सूची राख्दा SMS पाउनुहोस्",           en: "Get an SMS when a matching farmer lists produce" },

  dlButton:       { ne: "लमजुङ डायस्पोरा",                                     en: "Diaspora Lamjung" },
  dlButtonSub:    { ne: "विदेशमा बस्ने लमजुङबासीसँग सिधा जोडिनुहोस्",           en: "Connect directly with Lamjung's global diaspora" },
  dlKicker:       { ne: "लमजुङ डायस्पोरा",                                     en: "Diaspora Lamjung" },
  dlTitle:        { ne: "विदेशमा बस्ने लमजुङबासीसँग सिधा जोडिनुहोस्",           en: "Connect directly with Lamjung's global diaspora" },
  dlSub:          { ne: "सांसद, नागरिक र राष्ट्रलाई विदेशमा बस्ने लमजुङबासीसँग जोड्ने नेटवर्क — लगानी, मार्गदर्शन, सीप हस्तान्तरण र व्यापारका अवसरमा सहकार्यका लागि।", en: "A network connecting the MP, citizens, and the nation with Lamjung's diaspora abroad — for collaboration on investment, mentorship, skill transfer, and trade opportunities." },
  dlJoinTitle:    { ne: "डायस्पोरा सदस्यको रूपमा जोडिनुहोस्",                   en: "Join as a diaspora member" },
  dlSector:       { ne: "पेशा/क्षेत्र",                                        en: "Profession / sector" },
  dlSectorPh:     { ne: "जस्तै: सफ्टवेयर इन्जिनियर",                          en: "e.g. Software engineer" },
  dlCountry:      { ne: "हाल बसोबास गर्ने देश",                                en: "Country of residence" },
  dlCountryPh:    { ne: "जस्तै: अस्ट्रेलिया",                                   en: "e.g. Australia" },
  dlOrigin:       { ne: "लमजुङमा पैतृक घर (पालिका)",                           en: "Home palika in Lamjung" },
  dlInterest:     { ne: "सहकार्यको रुचि",                                      en: "Collaboration interest" },
  dlMessage:      { ne: "थप विवरण",                                          en: "Tell us more" },
  dlMessagePh:    { ne: "तपाईंको अनुभव, विशेषज्ञता वा योगदान गर्न चाहेको कुरा थप विस्तारमा लेख्नुहोस्…", en: "Share more about your experience, expertise, or how you'd like to contribute…" },
  dlCv:           { ne: "बायोडाटा/सीभी संलग्न गर्नुहोस्",                       en: "Attach CV / resume" },
  dlCvHint:       { ne: "वैकल्पिक — PDF वा Word फाइल (अधिकतम १० MB)",           en: "Optional — PDF or Word file (max 10 MB)" },
  dlSubmit:       { ne: "नेटवर्कमा जोडिनुहोस्",                                en: "Join the network" },
  dlSuccessTitle: { ne: "नेटवर्कमा जोडियो",                                    en: "Joined the network" },
  dlSuccessSub:   { ne: "तपाईंको सन्दर्भ नम्बर:",                              en: "Your reference ID:" },
  dlSuccessNote:  { ne: "सांसद कार्यालयले उपयुक्त अवसर आउँदा तपाईंलाई सम्पर्क गर्नेछ।", en: "The MP office will reach out when a relevant opportunity comes up." },

  footerAddress:    { ne: "सांसद सम्पर्क कार्यालय · बेसीशहर–३, लमजुङ",   en: "MP Liaison Office · Besisahar-3, Lamjung" },
  footerDisclaimer: { ne: "यो आधिकारिक पोर्टल हो। कुनै पनि विवरण प्रयोगको अनुमतिका लागि सम्पर्क गर्नुहोस्।", en: "Official portal. Contact the office for permission before reusing content." },
  footerMadeWith:   { ne: "लमजुङबासीका लागि बनाइएको",                       en: "Built for the people of Lamjung" },
};
