import express, { Router, Request, Response } from 'express';
import Product from '../models/Product';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// ... other routes (POST, PUT, DELETE)

export default router;
