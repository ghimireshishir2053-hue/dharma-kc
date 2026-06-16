import type { ProjectRequest } from "@/lib/types";

// Sample citizen-submitted project requests. The MP office assigns the priority.
export const PROJECT_REQUESTS_SAMPLE: ProjectRequest[] = [
  { id: "PB-2082-0231", cat: "water", palika: "rainas",      ward: 2, titleNe: "राइनास–२ खानेपानी लिफ्ट योजना",       titleEn: "Rainas-2 lift water supply scheme",        budgetNe: "रू. ५० लाख",  budgetEn: "NPR 50 lakh",  priority: "high",   days: 2 },
  { id: "PB-2082-0228", cat: "road",  palika: "marsyangdi",  ward: 5, titleNe: "मर्स्याङ्दी–५ कृषि सडक स्तरोन्नति",      titleEn: "Marsyangdi-5 agri-road upgrade",           budgetNe: "रू. १.२ करोड", budgetEn: "NPR 1.2 crore", priority: "medium", days: 5 },
  { id: "PB-2082-0219", cat: "edu",   palika: "dudhpokhari", ward: 3, titleNe: "दूधपोखरी–३ विद्यालय विज्ञान प्रयोगशाला", titleEn: "Dudhpokhari-3 school science lab",         budgetNe: "रू. २८ लाख",  budgetEn: "NPR 28 lakh",  priority: "high",   days: 8 },
  { id: "PB-2082-0207", cat: "tour",  palika: "kwholasothar", ward: 1, titleNe: "क्व्होलासोथार–१ पदमार्ग पुनर्निर्माण",   titleEn: "Kwholasothar-1 trekking trail rebuild",    budgetNe: "रू. ७५ लाख",  budgetEn: "NPR 75 lakh",  priority: "review", days: 12 },
  { id: "PB-2082-0198", cat: "agri",  palika: "sundarbazar", ward: 8, titleNe: "सुन्दरबजार–८ सामूहिक शीतभण्डार",        titleEn: "Sundarbazar-8 community cold storage",     budgetNe: "रू. ९० लाख",  budgetEn: "NPR 90 lakh",  priority: "medium", days: 15 },
  { id: "PB-2082-0185", cat: "hydro", palika: "dordi",       ward: 4, titleNe: "दोर्दी–४ लघु जलविद्युत् सुधार",          titleEn: "Dordi-4 micro-hydro rehabilitation",       budgetNe: "रू. ४० लाख",  budgetEn: "NPR 40 lakh",  priority: "low",    days: 21 },
];
