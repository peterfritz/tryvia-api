<hr />

<div align="center">
  <h1>Tryvia API</h1>
  <p>Uma API que te traz perguntas rápido e em português.</p>
</div>

<div align="center">
  <a href="#">
    <img src="public/logo_dark.svg" alt="Tryvia API logo" height="100" >
  </a>
</div>

<hr />

<div align="center">
  <img src="https://img.shields.io/badge/TYPESCRIPT-000000?style=for-the-badge&logo=TYPESCRIPT&logoColor=3178C6" />
  <img src="https://img.shields.io/badge/VERCEL-000000?style=for-the-badge&logo=VERCEL&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/NEXT.JS-000000?style=for-the-badge&logo=NEXTDOTJS&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/PRISMA-000000?style=for-the-badge&logo=PRISMA&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/PLANETSCALE-000000?style=for-the-badge&logo=PLANETSCALE&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/TAILWIND%20CSS-000000?style=for-the-badge&logo=TAILWINDCSS&logoColor=06B6D4" />
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
