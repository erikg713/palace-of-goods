import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Button, CircularProgress, Container, CardMedia } from "@mui/material";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <CircularProgress style={{ display: "block", margin: "20px auto" }} />;
  if (error) return <Typography color="error" style={{ textAlign: "center" }}>{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Our Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image || "/placeholder.jpg"}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="h5" color="primary">
                  ${product.price.toFixed(2)}
                </Typography>
                <Button component={Link} to={`/product/${product.id}`} variant="contained" color="primary" fullWidth>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
