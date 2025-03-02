import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
useEffect(() => {
  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };
  loadProducts();
}, []);
  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  return (
    <div>
      <h1>Marketplace</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span>Price: {product.price} Pi</span>
            <button>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
