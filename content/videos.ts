import type { Video } from "@/lib/types";

// MP Dharma Raj K.C.'s talks & interviews published on social media.
// Real videos use a `youtubeId` — the thumbnail loads automatically and the
// clip plays inline on click. The date field shows the source channel/show.
// To add more, copy an entry and set `youtubeId` + titles.
export const VIDEOS: Video[] = [
  { titleNe: "बालेनकै शैलीमा धर्म: ४२,३१८ मतले जित्छु — Hard Talk", titleEn: "Hard Talk: campaigning Balen-style in Lamjung",
    platform: "YouTube", youtubeId: "QKMwiizLdAY", url: "https://www.youtube.com/watch?v=QKMwiizLdAY",
    dateNe: "Nepal Lead", dateEn: "Nepal Lead" },
  { titleNe: "कलेजदेखि कर्पोरेटसम्म — धर्म के.सी.", titleEn: "College to Corporate with Dharma K.C.",
    platform: "YouTube", youtubeId: "clUwrL1G04s", url: "https://www.youtube.com/watch?v=clUwrL1G04s",
    dateNe: "The Sunway Show", dateEn: "The Sunway Show" },
  { titleNe: "चियागफ — धर्म के.सी. (CAI संस्थापक)", titleEn: "Chiya Guff — Dharma K.C., Founder of CAI",
    platform: "YouTube", youtubeId: "kc4T_3LTj3Y", url: "https://www.youtube.com/watch?v=kc4T_3LTj3Y",
    dateNe: "Prime TV", dateEn: "Prime TV" },
];
