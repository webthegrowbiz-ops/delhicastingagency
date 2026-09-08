import path from "node:path";
import fs from "node:fs";
import { prisma } from "../config/prisma.js";
import { uploadToCloudinary, isCloudinaryConfigured } from "../services/cloudinary.service.js";

export async function migrateLocalImagesToCloudinary(options: { dryRun?: boolean } = {}) {
  const { dryRun = true } = options;
  console.log(`=== CLOUDINARY IMAGE MIGRATION UTILITY (DryRun = ${dryRun}) ===`);

  if (!isCloudinaryConfigured()) {
    console.warn("Cloudinary is not configured in environment. Migration skipped.");
    return { migrated: 0, skipped: 0, failed: 0 };
  }

  const profiles = await prisma.artistProfile.findMany({
    where: {
      OR: [
        { profilePhoto: { contains: "/uploads/" } },
        { headshots: { contains: "/uploads/" } },
      ],
    },
  });

  console.log(`Found ${profiles.length} artist profiles with local upload references.`);

  let migrated = 0;
  let skipped = 0;
  let failed = 0;

  const uploadsDir = path.resolve(process.cwd(), "uploads");

  for (const profile of profiles) {
    let updatedPhoto = profile.profilePhoto;
    const updatedHeadshots = profile.headshots;
    let modified = false;

    // 1. Migrate profilePhoto
    if (profile.profilePhoto && profile.profilePhoto.includes("/uploads/")) {
      const filename = path.basename(profile.profilePhoto);
      const localPath = path.join(uploadsDir, filename);

      if (fs.existsSync(localPath)) {
        if (dryRun) {
          console.log(`[DRY-RUN] Would migrate profile photo for ${profile.id}: ${filename}`);
          migrated++;
        } else {
          try {
            const res = await uploadToCloudinary(localPath, `dca/artists/${profile.userId}`);
            if (res?.url) {
              updatedPhoto = res.url;
              modified = true;
              migrated++;
              console.log(`Migrated profile photo for ${profile.id} -> ${res.url}`);
            }
          } catch (err) {
            console.error(`Failed to migrate ${filename}:`, err);
            failed++;
          }
        }
      } else {
        console.warn(`Local file missing for ${profile.id}: ${localPath}`);
        skipped++;
      }
    }

    if (!dryRun && modified) {
      await prisma.artistProfile.update({
        where: { id: profile.id },
        data: {
          profilePhoto: updatedPhoto,
          headshots: updatedHeadshots,
        },
      });
    }
  }

  console.log(`=== MIGRATION COMPLETE: Migrated: ${migrated}, Skipped: ${skipped}, Failed: ${failed} ===`);
  return { migrated, skipped, failed };
}
