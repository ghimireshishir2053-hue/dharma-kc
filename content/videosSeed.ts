// Real videos — shared by prisma/seed.ts (loaded into the database once
// DATABASE_URL is set) and app/api/videos/route.ts (served directly if the
// database isn't reachable yet, so the public site never shows an empty
// section over what is genuine, already-verified content).
export const VIDEOS_SEED = [
  { refId: "VD-2082-0001", titleNe: "बालेनकै शैलीमा धर्म: ४२,३१८ मतले जित्छु — Hard Talk", titleEn: "Hard Talk: campaigning Balen-style in Lamjung", platform: "YouTube", youtubeId: "QKMwiizLdAY", url: "https://www.youtube.com/watch?v=QKMwiizLdAY", dateNe: "Nepal Lead", dateEn: "Nepal Lead" },
  { refId: "VD-2082-0002", titleNe: "कलेजदेखि कर्पोरेटसम्म — धर्म के.सी.", titleEn: "College to Corporate with Dharma K.C.", platform: "YouTube", youtubeId: "clUwrL1G04s", url: "https://www.youtube.com/watch?v=clUwrL1G04s", dateNe: "The Sunway Show", dateEn: "The Sunway Show" },
  { refId: "VD-2082-0003", titleNe: "चियागफ — धर्म के.सी. (CAI संस्थापक)", titleEn: "Chiya Guff — Dharma K.C., Founder of CAI", platform: "YouTube", youtubeId: "kc4T_3LTj3Y", url: "https://www.youtube.com/watch?v=kc4T_3LTj3Y", dateNe: "Prime TV", dateEn: "Prime TV" },
];
