import type { Municipality } from "@/lib/types";

// Population figures are from Nepal's 2021 National Population and Housing
// Census, cross-checked against citypopulation.de (which cites the same
// census) — see https://citypopulation.de/en/nepal/mun/admin/37__lamjung/.
// Area/wards are administrative facts (Ministry of Federal Affairs local
// level profiles) and don't change with each census.
export const MUNICIPALITIES: Municipality[] = [
  { id: "besisahar", ne: "बेसीशहर नगरपालिका", en: "Besisahar Municipality", type: "नगरपालिका", typeEn: "Municipality", hq: true,
    pop: "३८,२३२", area: "१४४ वर्ग किमी", wards: 11 },
  { id: "sundarbazar", ne: "सुन्दरबजार नगरपालिका", en: "Sundarbazar Municipality", type: "नगरपालिका", typeEn: "Municipality",
    pop: "२७,०४३", area: "१८५ वर्ग किमी", wards: 12 },
  { id: "madhyanepal", ne: "मध्यनेपाल नगरपालिका", en: "Madhya Nepal Municipality", type: "नगरपालिका", typeEn: "Municipality",
    pop: "२१,९७१", area: "२३७ वर्ग किमी", wards: 13 },
  { id: "rainas", ne: "राइनास नगरपालिका", en: "Rainas Municipality", type: "नगरपालिका", typeEn: "Municipality",
    pop: "१७,४०२", area: "१६२ वर्ग किमी", wards: 10 },
  { id: "marsyangdi", ne: "मर्स्याङ्दी गाउँपालिका", en: "Marsyangdi Rural Municipality", type: "गाउँपालिका", typeEn: "Rural Municipality",
    pop: "१७,०८०", area: "४५२ वर्ग किमी", wards: 8 },
  { id: "dordi", ne: "दोर्दी गाउँपालिका", en: "Dordi Rural Municipality", type: "गाउँपालिका", typeEn: "Rural Municipality",
    pop: "१६,०५०", area: "२८३ वर्ग किमी", wards: 7 },
  { id: "dudhpokhari", ne: "दूधपोखरी गाउँपालिका", en: "Dudhpokhari Rural Municipality", type: "गाउँपालिका", typeEn: "Rural Municipality",
    pop: "८,५९२", area: "३८१ वर्ग किमी", wards: 8 },
  { id: "kwholasothar", ne: "क्व्होलासोथार गाउँपालिका", en: "Kwholasothar Rural Municipality", type: "गाउँपालिका", typeEn: "Rural Municipality",
    pop: "७,९६०", area: "३०६ वर्ग किमी", wards: 6 },
];
