// One-time seed for Places — this is real, hand-verified content (real
// Wikimedia Commons photos, a corrected misattributed lake photo, a
// replaced fabricated destination), not demo data, so it must be migrated
// into the database rather than left to start empty like Projects/Events.
// Run with: npx prisma db seed (after DATABASE_URL is set and migrated).
import { PrismaClient } from "@prisma/client";
import { VIDEOS_SEED } from "../content/videosSeed";
import { PLACES_SEED } from "../content/placesSeed";

const prisma = new PrismaClient();

async function main() {
  for (const [palika, place] of Object.entries(PLACES_SEED)) {
    const profile = await prisma.palikaProfile.upsert({
      where: { palika },
      create: {
        palika,
        primaryNe: place.primaryNe,
        primaryEn: place.primaryEn,
        primaryDescNe: place.primaryDescNe,
        primaryDescEn: place.primaryDescEn,
        primaryImg: place.primaryImg || null,
      },
      update: {
        primaryNe: place.primaryNe,
        primaryEn: place.primaryEn,
        primaryDescNe: place.primaryDescNe,
        primaryDescEn: place.primaryDescEn,
        primaryImg: place.primaryImg || null,
      },
    });

    await prisma.attraction.deleteMany({ where: { palikaProfileId: profile.id } });
    for (const a of place.attractions) {
      await prisma.attraction.create({
        data: {
          palikaProfileId: profile.id,
          placeNe: a.placeNe, placeEn: a.placeEn,
          descNe: a.descNe, descEn: a.descEn,
          typeNe: a.typeNe, typeEn: a.typeEn,
          infoLink: a.infoLink,
          img: a.img || null,
        },
      });
    }
    console.log(`Seeded ${palika}`);
  }

  for (const v of VIDEOS_SEED) {
    await prisma.video.upsert({ where: { refId: v.refId }, create: v, update: v });
  }
  console.log(`Seeded ${VIDEOS_SEED.length} videos`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
