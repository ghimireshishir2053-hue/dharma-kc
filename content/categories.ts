import type { Category, StatusDef, StatusId } from "@/lib/types";

export const CATEGORIES: Category[] = [
  { id: "agri",    ne: "कृषि",            en: "Agriculture",        icon: "sprout",   hue: "#8FB865" },
  { id: "hydro",   ne: "जलविद्युत्",       en: "Hydropower",         icon: "bolt",     hue: "#E8B14A" },
  { id: "tour",    ne: "पर्यटन",           en: "Tourism",            icon: "mountain", hue: "#C86B3F" },
  { id: "road",    ne: "सडक र पुल",        en: "Roads & Bridges",    icon: "road",     hue: "#9A89C4" },
  { id: "water",   ne: "खानेपानी",         en: "Water Supply",       icon: "drop",     hue: "#3E7DB8" },
  { id: "edu",     ne: "शिक्षा र स्वास्थ्य", en: "Education & Health", icon: "building", hue: "#5FBA89" },
  { id: "digital", ne: "डिजिटल",           en: "Digital",            icon: "globe",    hue: "#6FA8D8" },
];

export const STATUS: Record<StatusId, StatusDef> = {
  concept:    { ne: "अवधारणा",       en: "Concept",     color: "#6F7E90" },
  dpr:        { ne: "DPR/सर्वेक्षण",   en: "DPR / Survey", color: "#9A89C4" },
  tender:     { ne: "टेन्डर",         en: "Tendering",   color: "#6FA8D8" },
  ongoing:    { ne: "निर्माणाधीन",     en: "In progress", color: "#E8B14A" },
  delayed:    { ne: "ढिलाइ",          en: "Delayed",     color: "#D94A4A" },
  completed:  { ne: "सम्पन्न",         en: "Completed",   color: "#5FBA89" },
  monitoring: { ne: "अनुगमन",         en: "Monitoring",  color: "#3E7DB8" },
};
