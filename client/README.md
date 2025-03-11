# 🏪 Palace of Goods - Client

## 📜 Table of Contents
- [Description](#description)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [API Connection](#api-connection)
- [Contributing](#contributing)
- [License](#license)

---

## 📝 Description
Palace of Goods is a **Web3 eCommerce Marketplace** built with **React + Express + TypeScript**.  
The client-side is a **React + Vite + TypeScript** app that communicates with an **Express.js backend**.

---

## 🛠 Tech Stack
**Client:** React, TypeScript, Vite, Redux Toolkit, React Router  
**Server:** Express.js, TypeScript, Node.js  
**Database:** MongoDB (if applicable)  
**Authentication:** JWT & Pi Network

---

## ✅ Prerequisites
Ensure you have the following installed:

- [Node.js (LTS)](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

---

## 📥 Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/erikg713/palace-of-goods.git
cd palace-of-goods

2️⃣ Install Dependencies

Client (React + Vite + TypeScript)

cd client
npm install

Server (Express + TypeScript)

cd ../server
npm install


---

🚀 Usage

Start the Client (React)

cd client
npm run dev

Start the Server (Express)

cd ../server
npm run dev

The client will run on http://localhost:5173 and the server on http://localhost:5000.


---

📂 Folder Structure

/palace-of-goods
│── /client             # Frontend - React + Vite + TypeScript
│   │── /public         # Static assets
│   │── /src            # Main source code
│   │   │── /api        # API requests (Axios)
│   │   │── /components # UI components
│   │   │── /context    # Global state (Auth, Cart)
│   │   │── /hooks      # Custom hooks
│   │   │── /pages      # Page components (Home, Login, Dashboard, etc.)
│   │   │── /utils      # Helper functions
│   │   │── App.tsx     # Main app component
│   │   │── main.tsx    # Entry point
│   │── tsconfig.json   # TypeScript config
│   │── vite.config.ts  # Vite config
│── /server             # Backend - Express + TypeScript
│   │── /src            # Express API source
│   │   │── /routes     # API routes
│   │   │── /controllers# Logic for routes
│   │   │── /models     # Mongoose/Prisma models
│   │   │── server.ts   # Main Express server
│   │── tsconfig.json   # TypeScript config
│   │── nodemon.json    # Hot reloading config
│── .env                # Environment variables
│── package.json        # Project metadata
│── README.md           # Documentation


---

🌍 Environment Variables

Client (/client/.env)

Create a .env file in the client/ directory:

VITE_API_BASE_URL=http://localhost:5000
VITE_PI_SANDBOX=true

Server (/server/.env)

Create a .env file in the server/ directory:

PORT=5000
MONGO_URI=mongodb://localhost:27017/palaceofgoods
JWT_SECRET=your_jwt_secret_key

> ⚠️ Never commit .env files to GitHub! Add them to .gitignore.




---

🔗 API Connection

The React client communicates with the Express backend via the following base URL:

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

Ensure the server is running before making API requests.


---

🤝 Contributing

Steps to contribute:

1. Fork the repository.


2. Create a new branch (feature-branch).


3. Make changes and commit (git commit -m "Added new feature").


4. Push to your fork and submit a Pull Request.



Please follow our CONTRIBUTING.md for detailed contribution guidelines.


---

📜 License

This project is licensed under the MIT License. See the LICENSE file for details.


---

💡 Need Help? Contact erikg713.
🚀 Happy Coding!

---

### 🔥 **Fixes & Optimizations**
1. **Added Express + TypeScript Server Setup**  
   - Included `server/` details (backend setup instructions).
   - Clarified **how to run both client & server**.

2. **Fixed API Environment Variables**  
   - Ensured **`VITE_API_BASE_URL`** is correctly referenced in the client.

3. **Fixed Folder Structure**  
   - Clearly **separated `client/` and `server/`** for better navigation.

4. **Ensured `package.json` Compatibility**  
   - Commands now work for **both frontend (Vite) & backend (Express)**.

---
