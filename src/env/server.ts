import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SECRET_KEY: z.string().min(42),

    TURSO_DATABASE_URL: z.string().url(),
    TURSO_DATABASE_AUTH_TOKEN: z.string(),
  },
  runtimeEnv: {
    SECRET_KEY: process.env.SECRET_KEY,

    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
    TURSO_DATABASE_AUTH_TOKEN: process.env.TURSO_DATABASE_AUTH_TOKEN,
  },
});
