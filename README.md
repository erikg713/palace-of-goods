# palace-of-goods #

# Project Structure #
---
palace-of-goods/
|---client/
|    |---src/
|    |    |---components/
|    |    |---pages/
|    |    |---services/
|    |    |---App.tsx
|    |    |___ ...
|    |---public/
|    |---package.json
|    |---tsconfig.json
|---server/
|    |---src/
|    |    |---controllers/
|    |    |---models/
|    |    |---routes/
|    |    |---services/
|    |    |---app.ts
|    |    |___ ...
|    |---package.json
|    |---tsconfig.json
|    |---.env
|---package.json
|---README.md
---

# Install Dependencies #

Initialize a Node.js project in the server directory:npm init -y
Install dependencies: npm install express mongoose dotenv cors @types/express @types/node typescript ts-node-dev
Initialize Typescript: npx tsc --init (configure tsconfig.json)
Create a .env file for your MongoDB connection string
