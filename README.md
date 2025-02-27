

---

Palace of Goods

Palace of Goods is a Web3-powered marketplace where users can buy and sell products using Pi Network cryptocurrency. The platform enables secure, decentralized transactions and provides a 10% profit model on each sale. Future expansions include Ethereum, Bitcoin, and Polygon network integrations.


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

✅ Buy & Sell goods using Pi Network cryptocurrency
✅ Secure transactions powered by blockchain technology
✅ User authentication with JWT (JSON Web Token)
✅ Flask-based API backend with PostgreSQL database
✅ React.js frontend (React Native planned for mobile)
✅ Decentralized finance (DeFi) integration for payments
✅ Future cross-chain support with Ethereum, Bitcoin, and Polygon


---

Technology Stack

Backend

Flask – Python-based microframework

PostgreSQL – Relational database

Flask-JWT-Extended – Secure user authentication

Docker – Containerized environment

Gunicorn – Production-ready WSGI server


Frontend

React.js – Web-based user interface

React Native (Future) – Mobile-first design

Redux (Future) – State management


Blockchain & Web3

Pi Network SDK – Pi-based payments

Ethereum, Bitcoin, and Polygon (Planned) – Cross-chain transactions



---

Getting Started

Follow these steps to set up the Palace of Goods project on your local machine.

Prerequisites

Python 3.8+

Node.js 16+ and npm/yarn

PostgreSQL

Docker (Optional)



---

Installation

1. Clone the Repository

git clone https://github.com/your-username/palace-of-goods.git
cd palace-of-goods

2. Backend Setup (Flask API)

Create a Virtual Environment & Install Dependencies

python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

pip install -r backend/requirements.txt

Run Migrations & Start the Server

python backend/manage.py db upgrade
python backend/app.py

Backend runs at http://127.0.0.1:5000.


---

3. Frontend Setup (React)

Install Dependencies

cd frontend
npm install

Start the Development Server

npm start

Frontend runs at http://localhost:3000.


---

Environment Variables

Create a .env file in the backend directory and add:

DATABASE_URL=postgresql://username:password@localhost:5432/palace_of_goods
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret
PI_NETWORK_API_KEY=your_pi_api_key


---

Database Schema

Users Table

Products Table


---

API Endpoints

Authentication

Products


---

Future Roadmap

🔹 React Native Mobile App for Android & iOS
🔹 Cross-chain Bridge with Ethereum & Bitcoin
🔹 NFT Marketplace for digital goods
🔹 Advanced Search & Filters for better discovery
🔹 Automated dispute resolution system


---

Contributing

We welcome contributions! Follow these steps:

1. Fork the repo


2. Create a new feature branch: git checkout -b feature-name


3. Commit changes: git commit -m "Added new feature"


4. Push to your branch: git push origin feature-name


5. Submit a pull request




---

License

This project is licensed under the MIT License. See the LICENSE file for details.


---

🚀 Palace of Goods - The Future of Decentralized Commerce!

