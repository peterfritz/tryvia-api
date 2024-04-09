require("dotenv").config({ path: "./.env" });
require("dotenv").config({ path: "./.env.local" });

const jiti = require("jiti")(__filename);

jiti("../src/env/client.ts");
jiti("../src/env/server.ts");
