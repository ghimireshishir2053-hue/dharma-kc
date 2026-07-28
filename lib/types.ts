export type CategoryId = "agri" | "hydro" | "tour" | "road" | "water" | "edu" | "digital" | "other";

export type StatusId =
  | "concept"
  | "dpr"
  | "tender"
  | "ongoing"
  | "delayed"
  | "completed"
  | "monitoring";

export type Category = {
  id: CategoryId;
  ne: string;
  en: string;
  icon: string;
  hue: string;
};

export type StatusDef = { ne: string; en: string; color: string };

export type PalikaId =
  | "besisahar"
  | "sundarbazar"
  | "madhyanepal"
  | "rainas"
  | "marsyangdi"
  | "dordi"
  | "dudhpokhari"
  | "kwholasothar";

export type Municipality = {
  id: PalikaId;
  ne: string;
  en: string;
  type: string;
  typeEn: string;
  hq?: boolean;
  pop: string;
  area: string;
  wards: number;
};

export type Project = {
  id: string;
  cat: CategoryId;
  palika: PalikaId;
  titleNe: string;
  titleEn: string;
  status: StatusId;
  progress?: number;
  budgetNe: string;
  budgetEn: string;
  startNe: string;
  startEn: string;
  etaNe: string;
  etaEn: string;
  updateNe: string;
  updateEn: string;
  updatedNe: string;
  updatedEn: string;
  tagsNe: string[];
  tagsEn: string[];
};

export type Priority = {
  id: string;
  numNe: string;
  numEn: string;
  titleNe: string;
  titleEn: string;
  descNe: string;
  descEn: string;
  statusNe: string;
  statusEn: string;
  progress: number;
  tagNe: string;
  tagEn: string;
};

export type Video = {
  id: string;
  titleNe: string;
  titleEn: string;
  // Platform label shown as a tag, e.g. "YouTube", "Facebook", "TikTok".
  platform: string;
  // Full watch URL on the social platform. Empty string = placeholder (not yet linked).
  url: string;
  // Optional YouTube video id — used to derive the thumbnail automatically.
  youtubeId?: string;
  dateNe: string;
  dateEn: string;
};

export type ParliamentItem = {
  type: "bill" | "question" | "committee" | "speech";
  titleNe: string;
  titleEn: string;
  roleNe: string;
  roleEn: string;
  dateNe: string;
  dateEn: string;
  statusNe: string;
  statusEn: string;
  statusKind: "ok" | "pending" | "new";
};

export type EventItem = {
  id: string;
  // Canonical AD date (ISO "YYYY-MM-DD") — drives calendar grid placement.
  date: string;
  titleNe: string;
  titleEn: string;
  timeNe: string;
  timeEn: string;
  locNe: string;
  locEn: string;
  // EventKindId, see content/eventKinds.ts
  kind: string;
};

export type Grievance = {
  id: string;
  kindNe: string;
  kindEn: string;
  summaryNe: string;
  summaryEn: string;
  statusNe: string;
  statusEn: string;
  days: number;
  kind: "ok" | "pending" | "new";
};

export type ProduceId =
  | "coffee" | "orange" | "ginger" | "vegetable"
  | "dairy" | "honey" | "cardamom" | "potato" | "maize" | "other";

export type ProduceType = { id: ProduceId; ne: string; en: string; hue: string; emoji: string };

export type FarmerListing = {
  id: string;
  palika: PalikaId;
  ward: number;
  produce: ProduceId;
  qtyNe: string;
  qtyEn: string;
  priceNe: string;
  priceEn: string;
  phone: string;
  days: number;
};

export type BuyerListing = {
  id: string;
  businessNe: string;
  businessEn: string;
  cityNe: string;
  cityEn: string;
  produce: ProduceId;
  qtyNe: string;
  qtyEn: string;
  phone: string;
  days: number;
};

export type CollabInterestId = "invest" | "mentor" | "skill" | "trade" | "tourism" | "other";

export type CollabInterest = { id: CollabInterestId; ne: string; en: string; icon: string };

export type MP = {
  nameNe: string;
  nameEn: string;
  honorificNe: string;
  honorificEn: string;
  titleNe: string;
  titleEn: string;
  constituencyNe: string;
  constituencyEn: string;
  districtNe: string;
  districtEn: string;
  email: string;
  altEmail: string;
  phone: string;
  dob: string;
  elected: string;
  electedEn: string;
  oath: string;
  oathEn: string;
};
