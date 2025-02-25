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

**BACKEND**
mkdir palace-of-goods
cd palace-of-goods
mkdir backend
cd backend
npm init -y
---
# Backend Dependencies #
---
npm install express mongoose dotenv cors
cd backend
npm install express cors mongoose dotenv
npm install --save-dev typescript @types/node @types/express ts-node nodemon
npx tsc --init
---
## Start the Server ##
---
node app.js 
---
## Set Up the Frontend ##
Create the frontend folder and initialize a React project:

bash Install dependencies (if needed):
cd ../
npx create-react-app frontend
cd frontend

bash Configure the React development server:
1.Open frontend/package.json and add a proxy to your backend server
json2.Modify 
frontend/src/App.js to fetch data from the backend
javascript
