export type EventKind = { id: string; ne: string; en: string };

export const EVENT_KINDS: EventKind[] = [
  { id: "open", ne: "सार्वजनिक", en: "Open" },
  { id: "field", ne: "क्षेत्र भ्रमण", en: "Field visit" },
  { id: "sector", ne: "सेक्टर", en: "Sector" },
  { id: "parliamentary", ne: "सांसदीय", en: "Parliamentary" },
  { id: "cultural", ne: "सांस्कृतिक", en: "Cultural" },
];
