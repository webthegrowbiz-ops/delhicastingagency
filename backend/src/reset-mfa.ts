import dotenv from "dotenv";
import { prisma } from "./config/prisma.js";

dotenv.config();

const email = (process.env.RESET_MFA_EMAIL || process.env.INITIAL_ADMIN_EMAIL || "").trim().toLowerCase();

if (!email) {
  console.error("ERROR: Missing RESET_MFA_EMAIL or INITIAL_ADMIN_EMAIL environment variable.");
  process.exit(1);
}

async function main() {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { adminMfa: true },
  });

  if (!user || user.role !== "ADMIN") {
    console.error(`ERROR: No ADMIN user found with email: ${email}`);
    process.exit(1);
  }

  if (user.adminMfa) {
    await prisma.adminMfaBackupCode.deleteMany({
      where: { adminMfaId: user.adminMfa.id },
    });
    await prisma.adminMfa.delete({
      where: { id: user.adminMfa.id },
    });
  }

  console.log(`Admin MFA reset successfully for ${user.email}.`);
  console.log("Next login will initiate a fresh MFA setup challenge.");
}

main()
  .catch((err) => {
    console.error("MFA reset failed:", err.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
