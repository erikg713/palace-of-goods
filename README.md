# palace-of-goods #
----
# Project Structure #

palace-of-goods/
├── backend/
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── utils/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── api.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
---
Backend Setup (Node.js + Express + TypeScript)
1. Install Dependencies
2. cd backend
npm install express cors mongoose dotenv
npm install --save-dev typescript @types/node @types/express ts-node nodemon
npx tsc --init
