import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import initializeSocket from './socket.js';

dotenv.config();

const app = express();
app.use(express.json());

// API routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Export the app for server.js
export default app;
