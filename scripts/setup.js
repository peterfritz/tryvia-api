require('dotenv').config({ path: './.env' })
require('dotenv').config({ path: './.env.local' })

const fs = require('fs')
const crypto = require('crypto')

/** Define uma váriavel de ambiente usada para gerar tokens. */
const setSecretKey = () => {
  // Checa se já existe uma variável de ambiente chamada SECRET_KEY
  if (!process.env.SECRET_KEY) {
    // Gera uma sequência hexadecimal de 84 caracteres
    const newServerSecret = crypto.randomBytes(42).toString('hex')

    // Grava a SECRET_KEY em um arquivo .env
    fs.writeFile('.env', `SECRET_KEY=${newServerSecret}\r\n`, (err) => {
      if (err) throw err

      console.log('\nSECRET_KEY set\n')
    })
  } else {
    // Se a variável SECRET_KEY customizada tem menos de 42 caracteres, retorna um erro
    if (process.env.SECRET_KEY.length <= 42) {
      throw new Error('your SECRET_KEY must be at least 42 characters long')
    } else {
      console.warn('\nusing custom SECRET_KEY\n')
    }
  }
}

const main = async () => {
  setSecretKey()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})