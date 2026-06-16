import type { PalikaId } from "@/lib/types";

export type Place = {
  nameNe: string;
  nameEn: string;
  kindNe: string;
  kindEn: string;
  // Category icon (from components/Icon.tsx) used as a tag + photo fallback.
  icon: string;
  descNe: string;
  descEn: string;
  // High-quality photo. Drop the file in /public/places/ — a branded
  // placeholder shows until the image exists.
  img: string;
};

// NOTE: Place names and descriptions below are starting content for the MP
// office to verify and expand. Photos go in /public/places/.
export const PLACES: Record<PalikaId, Place[]> = {
  besisahar: [
    {
      nameNe: "बेसीशहर — अन्नपूर्ण/मनास्लु प्रवेशद्वार", nameEn: "Besisahar — Annapurna/Manaslu Gateway",
      kindNe: "पदयात्रा प्रवेशद्वार", kindEn: "Trek gateway", icon: "mountain",
      descNe: "जिल्ला सदरमुकाम र अन्नपूर्ण तथा मनास्लु परिक्रमा पदयात्राको मुख्य प्रस्थानबिन्दु।",
      descEn: "The district headquarters and main starting point for the Annapurna and Manaslu circuit treks.",
      img: "/places/besisahar-gateway.jpg",
    },
    {
      nameNe: "मर्स्याङ्दी नदी किनार", nameEn: "Marsyangdi Riverside",
      kindNe: "प्रकृति", kindEn: "Nature", icon: "drop",
      descNe: "बेसीशहर नजिकैको मर्स्याङ्दी नदी उपत्यका — दृश्यावलोकन र र्‍याफ्टिङका लागि प्रसिद्ध।",
      descEn: "The Marsyangdi river valley near Besisahar, popular for its scenery and rafting.",
      img: "/places/marsyangdi-riverside.jpg",
    },
  ],
  madhyanepal: [
    {
      nameNe: "ईशानेश्वर महादेव मन्दिर", nameEn: "Ishaneshwor Mahadev Temple",
      kindNe: "मन्दिर", kindEn: "Temple", icon: "building",
      descNe: "भगवान शिवलाई समर्पित प्रतिष्ठित हिन्दू मन्दिर — विशेषगरी शिवरात्रिमा भक्तजनको ठूलो भीड लाग्ने महत्त्वपूर्ण तीर्थस्थल।",
      descEn: "A revered Hindu temple dedicated to Lord Shiva and an important pilgrimage site, drawing large crowds especially during Shivaratri.",
      img: "/places/ishaneshwor-mahadev.jpg",
    },
  ],
  kwholasothar: [
    {
      nameNe: "घलेगाउँ", nameEn: "Ghalegaun",
      kindNe: "पर्यटकीय गाउँ", kindEn: "Tourism village", icon: "mountain",
      descNe: "नेपालकै अग्रणी सामुदायिक होमस्टे गाउँ — गुरुङ संस्कृति र हिमशृङ्खलाको मनोरम दृश्यका लागि परिचित।",
      descEn: "One of Nepal's pioneering community homestay villages, known for Gurung culture and panoramic Himalayan views.",
      img: "/places/ghalegaun.jpg",
    },
    {
      nameNe: "घनपोखरा", nameEn: "Ghanpokhara",
      kindNe: "हिमाली गाउँ", kindEn: "Hill village", icon: "mountain",
      descNe: "घलेगाउँ नजिकैको गुरुङ गाउँ — परम्परागत होमस्टे र हिमाली दृश्यका लागि प्रसिद्ध।",
      descEn: "A Gurung village near Ghalegaun offering traditional homestays and mountain vistas.",
      img: "/places/ghanpokhara.jpg",
    },
  ],
  dudhpokhari: [
    {
      nameNe: "दूधपोखरी ताल", nameEn: "Dudh Pokhari Lake",
      kindNe: "धार्मिक ताल", kindEn: "Sacred lake", icon: "drop",
      descNe: "गाउँपालिकाको नाम रहन गएको उच्च–भूभागको पवित्र ताल — धार्मिक मेलाका बेला भक्तजन पुग्ने गर्छन्।",
      descEn: "The high-altitude sacred lake after which the rural municipality is named, visited by devotees during religious fairs.",
      img: "/places/dudh-pokhari.jpg",
    },
  ],
  marsyangdi: [
    {
      nameNe: "भुलभुले", nameEn: "Bhulbhule",
      kindNe: "पदयात्रा बिसौनी", kindEn: "Trek waypoint", icon: "mountain",
      descNe: "अन्नपूर्ण परिक्रमा पदमार्गको बिसौनी — झरना र हरियाली उपत्यकाका लागि चिनिन्छ।",
      descEn: "A waypoint on the Annapurna Circuit trail, known for its waterfalls and green valley.",
      img: "/places/bhulbhule.jpg",
    },
    {
      nameNe: "तर्कुघाट", nameEn: "Tarkughat",
      kindNe: "नदी किनारको बजार", kindEn: "Riverside town", icon: "road",
      descNe: "मर्स्याङ्दी नदी किनारको पुरानो बजार र यातायात केन्द्र।",
      descEn: "An old market and transit town along the Marsyangdi river.",
      img: "/places/tarkughat.jpg",
    },
  ],
  dordi: [
    {
      nameNe: "दोर्दी खोला उपत्यका", nameEn: "Dordi Khola Valley",
      kindNe: "प्रकृति", kindEn: "Nature", icon: "drop",
      descNe: "दोर्दी नदी उपत्यका — जलविद्युत् आयोजना र हरिया गल्छीहरूका लागि परिचित।",
      descEn: "The Dordi river valley, known for its hydropower projects and green gorges.",
      img: "/places/dordi-valley.jpg",
    },
  ],
  sundarbazar: [
    {
      nameNe: "सुन्दरबजार", nameEn: "Sundarbazar",
      kindNe: "बजार र शिक्षा केन्द्र", kindEn: "Market & education hub", icon: "building",
      descNe: "दक्षिणी लमजुङको बढ्दो बजार र शिक्षा केन्द्र।",
      descEn: "A growing market and education hub in southern Lamjung.",
      img: "/places/sundarbazar.jpg",
    },
  ],
  rainas: [
    {
      nameNe: "भोटेओडार", nameEn: "Bhoteodar",
      kindNe: "बजार", kindEn: "Market town", icon: "road",
      descNe: "राजमार्ग छेउको प्रमुख व्यापारिक केन्द्र।",
      descEn: "A key commercial centre along the highway.",
      img: "/places/bhoteodar.jpg",
    },
  ],
};
