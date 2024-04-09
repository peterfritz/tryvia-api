<hr />

<div align="center">
  <h1>Tryvia API</h1>
  <p>Uma API que te traz perguntas em português de forma rápida.</p>
</div>

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./public/logo_dark.svg">
    <img alt="Tryvia API logo" src="./public/logo_light.svg"  height="100">
  </picture>
</div>

<hr />

<div align="center">
  <img alt="Typescript" src="https://img.shields.io/badge/TYPESCRIPT-000000?style=for-the-badge&logo=TYPESCRIPT&logoColor=3178C6" />
  <img alt="Vercel" src="https://img.shields.io/badge/VERCEL-000000?style=for-the-badge&logo=VERCEL&logoColor=FFFFFF" />
  <img alt="Next.js" src="https://img.shields.io/badge/NEXT.JS-000000?style=for-the-badge&logo=NEXTDOTJS&logoColor=FFFFFF" />
  <img alt="Turso" src="https://img.shields.io/badge/TURSO-000000?style=for-the-badge&logo=TURSO&logoColor=4FF8D2" />
  <img alt="Drizzle" src="https://img.shields.io/badge/DRIZZLE-000000?style=for-the-badge&logo=DRIZZLE&logoColor=C5F74F" />
</div>

<br />

## Como usar?

Essa API é totalmente compatível com a [Open Trivia Database](https://opentdb.com/).

`https://tryvia.ptr.red/api_category.php` - Lista todas as categorias disponíveis e seus respectivos ids.

`https://tryvia.ptr.red/api_token.php?command=request` - Retorna um token para trazer perguntas que não se repitam (tempo de expiração de 6 horas).

`https://tryvia.ptr.red/api.php?amount=${quantidadeDePerguntas}&token=${token}` - Retorna perguntas de categoria, tipo e dificuldades aleatórias.

```url
https://tryvia.ptr.red/api.php
    ?amount=${quantidade de perguntas}
    &category=${null || 0 || id de uma categoria}
    &type=${null || 0 || multiple || boolean}
    &difficulty=${null || 0 || easy || medium || hard}
    &token=${token}
```

Não enviar um parâmetro ou enviá-lo com o valor 0 trará questões com a propriedade correspondente aleatória.
