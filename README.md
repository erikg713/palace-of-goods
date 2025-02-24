# palace-of-goods #

# Project Structure #
palace-of-goods/
├── client/          (React TypeScript Frontend)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/       (web3.js interactions)
│   │   ├── App.tsx
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── server/          (Node.js/Express Backend)
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/     (database interactions)
│   │   ├── app.ts
│   │   └── ...
│   ├── package.json
│   ├── tsconfig.json
│   └── .env           (Environment variables)
├── package.json      (Root package.json for monorepo)
└── README.md

# Install Dependencies #
**BACKEND**
Initialize a Node.js project in the server directory:npm init -y
Install dependencies: npm install express mongoose dotenv cors @types/express @types/node typescript ts-node-dev
Initialize Typescript: npx tsc --init (configure tsconfig.json)
Create a .env file for your MongoDB connection string
**FRONTEND**
Frontend (React TypeScript):

Setup:

Create a React app in the client directory: npx create-react-app . --template typescript
Install web3.js and other dependencies: npm install web3 axios

