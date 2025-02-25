import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Typography, CircularProgress, Container } from "@mui/material";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to fetch product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <CircularProgress style={{ display: "block", margin: "20px auto" }} />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!product) return <Typography>No product found.</Typography>;

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h4">{product.name}</Typography>
      <Typography variant="h5" color="primary">
        ${product.price.toFixed(2)}
      </Typography>
      <Typography variant="body1" style={{ marginBottom: "20px" }}>
        {product.description}
      </Typography>
      <Button variant="contained" color="primary">
        Add to Cart
      </Button>
    </Container>
  );
};

export default ProductDetails;
