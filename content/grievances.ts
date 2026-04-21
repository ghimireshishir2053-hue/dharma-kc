import type { Grievance } from "@/lib/types";

export const GRIEVANCES_SAMPLE: Grievance[] = [
  { id: "LJ-2082-0418", kindNe: "सडक",   kindEn: "Road",        summaryNe: "राइनास–२ बाटो पहिरोले अवरुद्ध",  summaryEn: "Rainas-2 road blocked by landslide",   statusNe: "कारबाहीमा", statusEn: "In progress", days: 3,  kind: "pending" },
  { id: "LJ-2082-0402", kindNe: "खानेपानी", kindEn: "Water",       summaryNe: "सुन्दरबजार–८ टंकी मर्मत",         summaryEn: "Sundarbazar-8 tank repair",            statusNe: "समाधान",   statusEn: "Resolved",    days: 11, kind: "ok" },
  { id: "LJ-2082-0389", kindNe: "विद्युत्",  kindEn: "Electricity", summaryNe: "मर्स्याङ्दी–४ ट्रान्सफर्मर जलेको",   summaryEn: "Marsyangdi-4 transformer burnt",       statusNe: "समाधान",   statusEn: "Resolved",    days: 14, kind: "ok" },
  { id: "LJ-2082-0374", kindNe: "शिक्षा",    kindEn: "Education",   summaryNe: "दूधपोखरी–२ विद्यालय भवन",          summaryEn: "Dudhpokhari-2 school building",        statusNe: "पठाइएको",  statusEn: "Forwarded",   days: 21, kind: "new" },
];
