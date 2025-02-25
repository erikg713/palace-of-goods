# palace-of-goods #

# Project Structure #
---
palace-of-goods/
├── backend/
│   ├── app.js
│   ├── package.json
│   ├── routes/
│   └── models/
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
---
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

