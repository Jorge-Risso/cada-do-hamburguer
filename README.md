# Casa do Hamburguer

Projeto full-stack — backend em Node.js + Prisma e frontend em Vite + React/TypeScript.

## Estrutura

- `back-end/` — API Node.js (TypeScript) com Prisma
- `front-end/` — aplicação React (TypeScript) com Vite

## Requisitos

- Node.js 18+ (ou LTS atual)
- npm ou yarn

## Configuração

1. Copie variáveis de ambiente de exemplo (se houver):

```powershell
cp back-end/.env.example back-end/.env
cp front-end/.env.example front-end/.env
```

2. Instale dependências:

```powershell
# no diretório raiz
cd back-end
npm install
cd ../front-end
npm install
```

3. Banco de dados (Prisma):

```powershell
# no back-end
npx prisma migrate deploy
npx prisma generate
```

4. Rodar em desenvolvimento:

```powershell
# backend
cd back-end
npm run dev

# frontend (em outra aba)
cd front-end
npm run dev
```

## Scripts úteis

- `back-end`: `npm run dev`, `npm run build`, `npm run start`
- `front-end`: `npm run dev`, `npm run build`, `npm run preview`

## Deploy

Coloque instruções aqui sobre o provedor (Vercel, Netlify, Heroku, etc.) se quiser.

## Licença

MIT
