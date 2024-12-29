// Import dependencies
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Palace of Goods API!');
});

// Example route for marketplace items (placeholder)
app.get('/api/items', (req, res) => {
    res.json([
        { id: 1, name: 'Item A', price: 100 },
        { id: 2, name: 'Item B', price: 200 },
    ]);
});

// Define a port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
