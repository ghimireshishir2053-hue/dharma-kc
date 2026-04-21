export type CategoryId = "agri" | "hydro" | "tour" | "road" | "water" | "edu" | "digital";

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
  projNe: string;
  projEn: string;
  issueNe: string;
  issueEn: string;
  x: number;
  y: number;
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
  img?: string;
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

export type NewsItem = {
  kindNe: string;
  kindEn: string;
  titleNe: string;
  titleEn: string;
  outletNe: string;
  outletEn: string;
  dateNe: string;
  dateEn: string;
  imgLabel: string;
};

export type EventItem = {
  dayNe: string;
  dayEn: string;
  monNe: string;
  monEn: string;
  yr: string;
  titleNe: string;
  titleEn: string;
  timeNe: string;
  timeEn: string;
  locNe: string;
  locEn: string;
  kindNe: string;
  kindEn: string;
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
