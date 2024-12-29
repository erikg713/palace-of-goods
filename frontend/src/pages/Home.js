import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductList from '../components/ProductList';
import WalletConnector from '../components/WalletConnector';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productList = await fetchProducts();
        setProducts(productList);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome to Palace of Goods</h1>
      <WalletConnector />
      <ProductList products={products} />
    </div>
  );
};

export default HomePage;
