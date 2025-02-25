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

## FRONTEND STRUCTURE ##
---
frontend/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/   # Reusable UI elements
│   ├── pages/        # Main pages
│   ├── redux/        # State management
│   ├── types/        # TypeScript interfaces
│   ├── api.ts        # API handler
│   ├── App.tsx       # Main component
│   ├── index.tsx     # Entry point
│   └── styles.css    # Global styles
├── package.json
└── tsconfig.json
---
## BACKEND SETUP ##
cd backend
npm init -y
npm install express cors dotenv pg axios
npm install --save-dev typescript ts-node nodemon @types/express @types/node @types/cors
npm install @pinetwork/pi-backend
npm install bcryptjs jsonwebtoken
npm install --save-dev @types/jsonwebtoken
npm install express-jwt
npm install multer
npm install --save-dev @types/multer

## FRONTEND SETUP ##
npm install @pinetwork/pi-ui

# Deployment #
npm install -g vercel
npm run build
vercel
