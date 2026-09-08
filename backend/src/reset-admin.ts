import bcrypt from "bcrypt";
import { prisma } from "./config/prisma.js";

const email = (process.env.RESET_ADMIN_EMAIL || "").trim();
const newPassword = (process.env.RESET_ADMIN_PASSWORD || "").trim();

if (!email || !newPassword) {
  console.error("ERROR: Missing RESET_ADMIN_EMAIL or RESET_ADMIN_PASSWORD environment variables.");
  process.exit(1);
}

const passwordHash = await bcrypt.hash(newPassword, 12);

const admin = await prisma.user.update({
  where: { email },
  data: { password: passwordHash, role: "ADMIN" },
});

console.log("Admin password reset successfully for:", admin.email);
await prisma.$disconnect();
