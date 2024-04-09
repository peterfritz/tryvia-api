import createJiti from "jiti";
import { fileURLToPath } from "node:url";
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./src/env/client.ts");
jiti("./src/env/server.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "Access-Control-Allow-Credentials", value: "true" },
        { key: "Access-Control-Allow-Origin", value: "*" },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
        },
        {
          key: "Access-Control-Allow-Headers",
          value: "*",
        },
      ],
    },
  ],
  rewrites: async () => [
    {
      source: "/api.php",
      destination: "/api/questions/list",
    },
    {
      source: "/api_token.php",
      destination: "/api/token/create",
    },
    {
      source: "/api_category.php",
      destination: "/api/categories/list",
    },
    {
      source: "/favicon.ico",
      destination: "/icon.svg",
    },
  ],
};

export default nextConfig;
