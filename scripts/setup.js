require("dotenv").config({ path: "./.env" });
require("dotenv").config({ path: "./.env.local" });

const fs = require("fs");
const crypto = require("crypto");

/** Define uma váriavel de ambiente usada para gerar tokens. */
const setSecretKey = () => {
  // Checa se já existe uma variável de ambiente chamada SECRET_KEY
  if (process.env.SECRET_KEY) {
    console.warn("\nusing custom SECRET_KEY\n");

    return;
  }

  // Gera uma sequência hexadecimal de 84 caracteres
  const newServerSecret = crypto.randomBytes(42).toString("hex");

  // Grava a SECRET_KEY em um arquivo .env
  fs.writeFile(
    ".env",
    `SECRET_KEY="${newServerSecret}"\r\n`,
    { flag: "a" },
    (err) => {
      if (err) throw err;

      console.log("\nSECRET_KEY set\n");
    }
  );

  process.env.SECRET_KEY = newServerSecret;
};

const main = async () => {
  setSecretKey();
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
