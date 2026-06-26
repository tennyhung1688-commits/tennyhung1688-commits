/* ===================================================================
   Prisma Client Singleton — hot-reload safe

   Ensures only one Prisma client instance exists in development
   (Next.js hot reload creates many Module instances).
   =================================================================== */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
