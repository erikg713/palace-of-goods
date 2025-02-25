import React, { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h2>Product List</h2>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p style={{ fontWeight: "bold", color: "green" }}>${product.price.toFixed(2)}</p>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
