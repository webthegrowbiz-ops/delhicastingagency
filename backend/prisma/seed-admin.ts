import dotenv from "dotenv";
import bcrypt from "bcrypt";

import { prisma } from "../src/config/prisma.js";

dotenv.config();

/**
 * DCA Secure Admin Bootstrap Script
 *
 * Safely creates the initial ADMIN user using environment variables.
 * Must be executed explicitly as a deliberate CLI operation:
 *   INITIAL_ADMIN_EMAIL=admin@example.com INITIAL_ADMIN_PASSWORD=strongpassword npx tsx prisma/seed-admin.ts
 */
async function main(): Promise<void> {
  const adminEmail = (process.env.INITIAL_ADMIN_EMAIL || "").trim();
  const adminPassword = (process.env.INITIAL_ADMIN_PASSWORD || "").trim();

  if (!adminEmail || !adminPassword) {
    console.error("ERROR: Missing required environment variables.");
    console.error("Please supply INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_PASSWORD to run admin bootstrap.");
    process.exit(1);
  }

  if (adminPassword.length < 8) {
    console.error("ERROR: INITIAL_ADMIN_PASSWORD must be at least 8 characters long.");
    process.exit(1);
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
  });

  if (existingUser) {
    console.log(`Admin account already exists for ${adminEmail}; no changes made.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Initial admin account created successfully.");
  console.log({
    id: admin.id,
    email: admin.email,
    role: admin.role,
  });
}

main()
  .catch((error: unknown) => {
    console.error("Failed to execute admin bootstrap script:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
