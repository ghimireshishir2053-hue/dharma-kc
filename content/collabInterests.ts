import type { CollabInterest } from "@/lib/types";

export const COLLAB_INTERESTS: CollabInterest[] = [
  { id: "invest",  ne: "लगानी",           en: "Investment",       icon: "building" },
  { id: "mentor",  ne: "मार्गदर्शन",       en: "Mentorship",       icon: "users" },
  { id: "skill",   ne: "सीप हस्तान्तरण",   en: "Skill transfer",   icon: "check" },
  { id: "trade",   ne: "व्यापार",          en: "Trade",            icon: "globe" },
  { id: "tourism", ne: "पर्यटन प्रवर्द्धन",  en: "Tourism promotion", icon: "mountain" },
  { id: "other",   ne: "अन्य",             en: "Other",            icon: "more" },
];
