import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">{product.name}</Typography>
              <Typography>${product.price}</Typography>
              <Button component={Link} to={`/product/${product.id}`} variant="contained">
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
