const express = require('express');
const router = express.Router();
const { createOrder, getOrderById, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

// Route to create a new order
router.post('/', async (req, res) => {
    try {
        const order = await createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order', error });
    }
});

// Route to get a specific order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await getOrderById(req.params.id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch order', error });
    }
});

// Route to get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error });
    }
});

// Route to update an order's status
router.put('/:id', async (req, res) => {
    try {
        const updatedOrder = await updateOrderStatus(req.params.id, req.body.status);
        if (updatedOrder) {
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order', error });
    }
});

module.exports = router;
