import { env } from "@/env/server";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_DATABASE_AUTH_TOKEN,
});

const db = drizzle(client, {
  logger: {
    logQuery: (query, params) => {
      console.log(query, params);
    },
  },
});

export default db;
