import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get('/api/products').then(res => setProducts(res.data));
    }, []);

    return (
        <div>
            <h2>Product List</h2>
            {products.map(product => (
                <div key={product._id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
