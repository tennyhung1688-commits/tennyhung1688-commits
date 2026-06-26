import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://jrhung@localhost:5432/commerceos",
  },
  migrations: {
    path: "prisma/migrations",
  },
});
