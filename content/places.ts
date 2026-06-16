import type { PalikaId } from "@/lib/types";

export type Place = {
  placeNe: string;
  placeEn: string;
  // Photo in /public/places/. A branded placeholder shows until the file exists.
  img: string;
};

// One popular/landmark place per municipality, shown as the map-panel background.
export const PLACES: Record<PalikaId, Place> = {
  besisahar:    { placeNe: "बेसीशहर — अन्नपूर्ण प्रवेशद्वार", placeEn: "Besisahar — Annapurna gateway", img: "/places/besisahar.jpg" },
  madhyanepal:  { placeNe: "ईशानेश्वर महादेव मन्दिर",        placeEn: "Ishaneshwor Mahadev Temple",   img: "/places/ishaneshwor-mahadev.jpg" },
  kwholasothar: { placeNe: "घलेगाउँ",                       placeEn: "Ghalegaun",                    img: "/places/ghalegaun.jpg" },
  dudhpokhari:  { placeNe: "दूधपोखरी ताल",                  placeEn: "Dudh Pokhari Lake",            img: "/places/dudh-pokhari.jpg" },
  marsyangdi:   { placeNe: "मर्स्याङ्दी नदी किनार",          placeEn: "Marsyangdi riverside",         img: "/places/marsyangdi.jpg" },
  dordi:        { placeNe: "दोर्दी खोला उपत्यका",            placeEn: "Dordi river valley",           img: "/places/dordi.jpg" },
  sundarbazar:  { placeNe: "सुन्दरबजार",                     placeEn: "Sundarbazar",                  img: "/places/sundarbazar.jpg" },
  rainas:       { placeNe: "भोटेओडार",                      placeEn: "Bhoteodar",                    img: "/places/bhoteodar.jpg" },
};
