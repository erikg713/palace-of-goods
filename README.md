Palace of Goods

A Web3-powered decentralized marketplace using Node.js, Express, and React (TypeScript).


---

Table of Contents

Features

Technology Stack

Getting Started

Installation

Environment Variables

Database Schema

API Endpoints

Future Roadmap

Contributing

License



---

Features

✅ Buy & sell goods using Pi Network cryptocurrency
✅ Secure transactions with blockchain integration
✅ JWT-based user authentication for secure access
✅ Node.js & Express.js backend with PostgreSQL database
✅ React.js (TypeScript) frontend for an optimized UI/UX
✅ Redux Toolkit (planned) for state management
✅ Cross-chain transactions (Ethereum, Bitcoin, Polygon) - Future expansion


---

Technology Stack

Backend (Node.js / Express.js)

Express.js – Lightweight and scalable backend framework

PostgreSQL – Relational database for scalable data storage

JWT (jsonwebtoken) – Secure authentication system

Multer & Cloudinary – Image uploads & cloud storage

Docker – Containerized development & production

PM2 – Process management for production


Frontend (React.js with TypeScript)

React.js (TypeScript) – Type-safe and scalable UI

Redux Toolkit (Future) – State management for better UX

Material-UI – Modern component-based UI framework


Blockchain & Web3

Pi Network SDK – Pi-based cryptocurrency payments

Ethereum, Bitcoin, Polygon (Future) – Multi-chain transaction support



---

Getting Started

Prerequisites

Ensure you have the following installed on your system:

Node.js (16+) & npm/yarn

MongoDB 

Docker (Optional for deployment)



---

Installation

1️⃣ Clone the Repository

git clone https://github.com/your-username/palace-of-goods.git
cd palace-of-goods

2️⃣ Backend Setup (Node.js + Express API)

Install Dependencies

cd server
npm install
npm install node-cron
npm install pi-sdk web3 dotenv
npx terser js/main.js -o js/main.min.js --compress --mangle
npx clean-css -o css/styles.min.css css/styles.css
npm install express fs moment
Run Migrations & Start the Server

npm run migrate  # Apply database migrations
npm run dev      # Start development server

Backend will be running at http://127.0.0.1:5000.


---

3️⃣ Frontend Setup (React with TypeScript)

Install Dependencies

cd client
npm install 
npm install axios react-query react-router-dom
npm install pi-sdk
Start the Development Server
node sitemap.ts
npm start

Frontend will be running at http://localhost:3000.


---

Environment Variables

Create a .env file in the server directory and add:

PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/palace_of_goods
JWT_SECRET=your_jwt_secret
PI_NETWORK_API_KEY=your_pi_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret


---

Database Schema

Users Table

Products Table


---

API Endpoints

Authentication

POST /api/users/signup – Register new users

POST /api/users/login – Login and receive JWT

GET /api/users/profile – Get user details (Requires JWT)


Products

GET /api/products – Fetch all products

POST /api/products – Add new product (Admin only)

PUT /api/products/:id – Edit product details (Admin only)

DELETE /api/products/:id – Remove product (Admin only)


Payments (Pi Network)

POST /api/payment/create – Initiate a Pi Network payment

POST /api/payment/verify – Confirm and validate Pi payment



---

Docker Setup

1️⃣ Build and Run the Server in Docker

docker build -t palace-of-goods-server .
docker run -d -p 5000:5000 --env-file .env palace-of-goods-server

2️⃣ Use Docker Compose for Backend & Database

Create a docker-compose.yml file in the root directory:

version: "3.8"

services:
  backend:
    build: ./server
    ports:
      - "5000:5000"
    env_file:
      - ./server/.env
    depends_on:
      - postgres

  postgres:
    image: postgres:14
    container_name: palace-of-goods-db
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: palace_of_goods
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:

Start the Docker Containers

docker-compose up -d

✅ Now, both the backend and database run inside Docker!


---

Future Roadmap

🔹 React Native Mobile App for Android & iOS
🔹 Cross-chain Bridge with Ethereum & Bitcoin
🔹 NFT Marketplace for digital goods
🔹 Automated dispute resolution system
🔹 Advanced search & filters for better product discovery


---

Contributing

We welcome contributions! Follow these steps:

1️⃣ Fork the repo
2️⃣ Create a feature branch:

git checkout -b feature-name

3️⃣ Commit changes:

git commit -m "Added new feature"

4️⃣ Push to your branch:

git push origin feature-name

5️⃣ Submit a pull request


---

License

This project is licensed under the MIT License. See the LICENSE file for details.


---

🚀 Palace of Goods - The Future of Decentralized Commerce!

