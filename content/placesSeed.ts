// Real Places content — hand-verified (real Wikimedia Commons photos, a
// corrected misattributed lake photo, a replaced fabricated destination).
// Shared by prisma/seed.ts (loaded into the database once DATABASE_URL is
// set) and app/api/places/route.ts (served directly if the database isn't
// reachable yet, so the public site never shows an empty section over what
// is genuine, already-verified content).
export const PLACES_SEED: Record<
  string,
  {
    primaryNe: string; primaryEn: string; primaryDescNe: string; primaryDescEn: string; primaryImg: string;
    attractions: { placeNe: string; placeEn: string; descNe: string; descEn: string; typeNe: string; typeEn: string; infoLink: string; img: string }[];
  }
> = {
  besisahar: {
    primaryNe: "बेसीशहर — अन्नपूर्ण प्रवेशद्वार",
    primaryEn: "Besisahar — Gateway to Annapurna",
    primaryDescNe: "लमजुङको मुख्य शहर र आरम्भिक बिन्दु, जहाँ अन्नपूर्ण सर्किट ट्रेक सुरु हुन्छ।",
    primaryDescEn: "Lamjung's main city and starting point for Annapurna Circuit Trek.",
    primaryImg: "/places/besisahar.jpg",
    attractions: [
      { placeNe: "अन्नपूर्ण सर्किट ट्रेक", placeEn: "Annapurna Circuit Trek", descNe: "विश्वको सबैभन्दा लोकप्रिय ट्रेकिङ मार्गहरूमध्ये एक।", descEn: "One of the world's most popular trekking routes.", typeNe: "ट्रेकिङ", typeEn: "Trekking", infoLink: "https://www.google.com/search?q=annapurna+circuit+trek", img: "/places/besisahar.jpg" },
      { placeNe: "मार्ग टी हाउस र होटलहरू", placeEn: "Trek Tea Houses & Hotels", descNe: "ट्रेकरहरूका लागि अनौपचारिक आश्रय र खाना सेवा।", descEn: "Traditional lodging and meal services for trekkers.", typeNe: "आवास", typeEn: "Accommodation", infoLink: "https://www.google.com/search?q=besisahar+teahouses", img: "/places/besisahar.jpg" },
    ],
  },
  madhyanepal: {
    primaryNe: "ईशानेश्वर महादेव मन्दिर",
    primaryEn: "Ishaneshwor Mahadev Temple",
    primaryDescNe: "धार्मिक महत्त्वको प्राचीन मन्दिर जहाँ हजारौं भक्तहरू दर्शन गर्न आउँछन्।",
    primaryDescEn: "Ancient temple of religious significance attracting thousands of devotees.",
    primaryImg: "/places/ishaneshwor-mahadev.jpg",
    attractions: [
      { placeNe: "मन्दिरको परिसर", placeEn: "Temple Complex", descNe: "परम्परागत नेवारी आर्किटेक्चरको उत्कृष्ट उदाहरण।", descEn: "Exemplary traditional Newari architecture.", typeNe: "धार्मिक स्थल", typeEn: "Religious Site", infoLink: "https://www.google.com/search?q=ishaneshwor+mahadev+temple", img: "/places/ishaneshwor-mahadev.jpg" },
      { placeNe: "स्थानीय संस्कृति केन्द्र", placeEn: "Local Culture Center", descNe: "मिथिला कला र स्थानीय शिल्पहरू प्रदर्शन गर्ने केन्द्र।", descEn: "Center showcasing Mithila art and local crafts.", typeNe: "सांस्कृतिक केन्द्र", typeEn: "Cultural Center", infoLink: "https://www.google.com/search?q=lamjung+local+culture", img: "/places/ishaneshwor-mahadev.jpg" },
    ],
  },
  kwholasothar: {
    primaryNe: "घलेगाउँ — सांस्कृतिक गहना",
    primaryEn: "Ghalegaun — Cultural Gem",
    primaryDescNe: "परम्परागत थानी आवास र संस्कृति संरक्षणको लागि प्रसिद्ध गाउँ।",
    primaryDescEn: "Traditional Thani settlement famous for cultural preservation and homestays.",
    primaryImg: "/places/ghalegaun.jpg",
    attractions: [
      { placeNe: "थानी होमस्टे अनुभव", placeEn: "Thani Homestay Experience", descNe: "पारम्परिक आवास र साँचो सांस्कृतिक मिथेलापको अनुभव।", descEn: "Experience traditional living and authentic cultural interaction.", typeNe: "सांस्कृतिक पर्यटन", typeEn: "Cultural Tourism", infoLink: "https://www.google.com/search?q=ghalegaun", img: "/places/ghalegaun.jpg" },
      { placeNe: "कृषि क्षेत्र भ्रमण", placeEn: "Agricultural Field Tours", descNe: "परम्परागत खेती पद्धति र स्थानीय जीवनयापन सीख्नुहोस्।", descEn: "Learn traditional farming methods and local livelihoods.", typeNe: "अगो-पर्यटन", typeEn: "Agro-tourism", infoLink: "https://www.google.com/search?q=ghalegaun+agricultural+tourism", img: "/places/ghalegaun.jpg" },
    ],
  },
  dudhpokhari: {
    primaryNe: "दूधपोखरी ताल — पवित्र झील",
    primaryEn: "Dudh Pokhari Lake — Sacred Lake",
    primaryDescNe: "दूधको रंगको पानी भएको पवित्र वरदान ताल, धार्मिक महत्त्वको स्थान।",
    primaryDescEn: "Sacred lake with milky waters, spiritually significant pilgrimage site.",
    primaryImg: "",
    attractions: [
      { placeNe: "देवता माता मन्दिर", placeEn: "Devata Mata Temple", descNe: "ताल किनारमा अवस्थित प्राचीन मन्दिर।", descEn: "Ancient temple located near the lake shore.", typeNe: "धार्मिक स्थल", typeEn: "Religious Site", infoLink: "https://www.google.com/search?q=dudh+pokhari+lake+lamjung", img: "" },
      { placeNe: "धार्मिक यात्री मौसम", placeEn: "Pilgrimage Season", descNe: "विशेषकर ग्रीष्मकालमा हजारौं भक्तहरूले पूजा गर्न आउँछन्।", descEn: "Thousands of devotees visit during summer for worship.", typeNe: "धार्मिक कार्यक्रम", typeEn: "Religious Festival", infoLink: "https://www.google.com/search?q=dudh+pokhari+pilgrimage", img: "" },
    ],
  },
  marsyangdi: {
    primaryNe: "मर्स्याङ्दी नदी किनार — प्राकृतिक सौन्दर्य",
    primaryEn: "Marsyangdi River — Natural Beauty",
    primaryDescNe: "क्षेत्रको सबैभन्दा महत्त्वपूर्ण नदी, जलविद्युत् उद्योग र पर्यटनको केन्द्र।",
    primaryDescEn: "Region's main river, center for hydropower industries and water sports.",
    primaryImg: "/places/marsyangdi.jpg",
    attractions: [
      { placeNe: "र‍्याफ्टिङ र काइयाकिङ", placeEn: "Rafting & Kayaking", descNe: "रोमाञ्चक जल क्रीडा गतिविधि।", descEn: "Thrilling water sports activities.", typeNe: "जल खेल", typeEn: "Water Sports", infoLink: "https://www.google.com/search?q=marsyangdi+river+rafting", img: "/places/marsyangdi.jpg" },
      { placeNe: "जलविद्युत् बाँध भ्रमण", placeEn: "Hydropower Dam Tours", descNe: "आधुनिक प्रविधि र शक्तिनिर्माणको आश्चर्य।", descEn: "Wonder of modern technology and power generation.", typeNe: "औद्योगिक पर्यटन", typeEn: "Industrial Tourism", infoLink: "https://www.google.com/search?q=marsyangdi+hydropower+lamjung", img: "/places/marsyangdi.jpg" },
    ],
  },
  dordi: {
    primaryNe: "दोर्दी खोला उपत्यका — रोमाञ्चक दुःसाहस",
    primaryEn: "Dordi River Valley — Adventure Hub",
    primaryDescNe: "पर्वतीय नदी र वन क्षेत्र जहाँ साहस र प्रकृति एकै साथ मेल खान्छन्।",
    primaryDescEn: "Mountain river and forest area where adventure meets nature.",
    primaryImg: "/places/dordi.jpg",
    attractions: [
      { placeNe: "दोर्दी जलप्रपात", placeEn: "Dordi Waterfall", descNe: "मनोरम जलप्रपात र चिहान वन।", descEn: "Scenic waterfall and pine forest.", typeNe: "प्राकृतिक दर्श्य", typeEn: "Natural Scenic", infoLink: "https://www.google.com/search?q=dordi+waterfall+lamjung", img: "/places/dordi.jpg" },
      { placeNe: "हाइकिङ र क्याम्पिङ", placeEn: "Hiking & Camping", descNe: "वनमा साहसिक यात्रा र बोनफायरि रातहरू।", descEn: "Adventure trails through forests and camping nights.", typeNe: "बाह्य क्रीडा", typeEn: "Outdoor Sports", infoLink: "https://www.google.com/search?q=dordi+hiking+camping", img: "/places/dordi.jpg" },
    ],
  },
  sundarbazar: {
    primaryNe: "सुन्दरबजार — व्यापार केन्द्र",
    primaryEn: "Sundarbazar — Trade Hub",
    primaryDescNe: "लमजुङको महत्त्वपूर्ण व्यापार केन्द्र र पर्यटकहरूको अन्य पडाइ।",
    primaryDescEn: "Lamjung's important trade center and tourist stopover point.",
    primaryImg: "/places/sundarbazar.jpg",
    attractions: [
      { placeNe: "स्थानीय बजार र कारिगरी पण्य", placeEn: "Local Market & Crafts", descNe: "पारम्परिक कारिगरी र स्थानीय उत्पादन।", descEn: "Traditional crafts and local products.", typeNe: "बजार", typeEn: "Market", infoLink: "https://www.google.com/search?q=sundarbazar+market+lamjung", img: "/places/sundarbazar.jpg" },
      { placeNe: "खानपान र आतिथ्य", placeEn: "Food & Hospitality", descNe: "पर्वतीय व्यञ्जन र पारम्परिक खाना।", descEn: "Mountain cuisine and traditional dishes.", typeNe: "खानपान", typeEn: "Cuisine", infoLink: "https://www.google.com/search?q=sundarbazar+food+lamjung", img: "/places/sundarbazar.jpg" },
    ],
  },
  rainas: {
    primaryNe: "रैनासकोट — ऐतिहासिक किल्ला",
    primaryEn: "Rainaskot — Historic Hilltop Fort",
    primaryDescNe: "पूर्व लमजुङ राज्यको रणनीतिक किल्ला (उचाइ १,६७५ मी); अहिले होमस्टे र हिमाल दृश्यका लागि चिनिन्छ।",
    primaryDescEn: "A strategic fort of the historic Lamjung Kingdom at 1,675m elevation, now known for homestays and sweeping Himalayan views.",
    primaryImg: "",
    attractions: [
      { placeNe: "रैनासकोट किल्ला", placeEn: "Rainaskot Fort", descNe: "चौबीसे राजा द्रव्य शाहको पालामा निर्मित ऐतिहासिक किल्ला, रैनास–९ मा अवस्थित।", descEn: "A historic fort built during the reign of chaubise King Dravya Shah, located in Rainas-9.", typeNe: "ऐतिहासिक स्थल", typeEn: "Historic Site", infoLink: "https://tourisminfonepal.com/rainaskot-emerging-as-tourist-destination/", img: "" },
      { placeNe: "होमस्टे र हिमाल दृश्य", placeEn: "Homestay & Himalayan Panorama", descNe: "धौलागिरी, अन्नपूर्ण, मनास्लु र लाङटाङ हिमशृंखलाको दृश्यसहित स्थानीय होमस्टे अनुभव।", descEn: "Local homestays with views of the Dhaulagiri, Annapurna, Manaslu, and Langtang ranges.", typeNe: "होमस्टे", typeEn: "Homestay", infoLink: "https://ghumnajaau.com/blog/A-Guide-to-Visiting-Rainaskot-History-Homestay-and-Adventures", img: "" },
    ],
  },
};
