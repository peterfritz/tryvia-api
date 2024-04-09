import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({
  path: ".env.local",
});

export default defineConfig({
  schema: "./src/db/**/*.ts",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || "",
    authToken: process.env.TURSO_DATABASE_AUTH_TOKEN || "",
  },
  verbose: true,
  strict: true,
});
