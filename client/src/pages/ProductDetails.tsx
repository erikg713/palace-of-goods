import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Typography } from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  return product ? (
    <div>
      <Typography variant="h4">{product.name}</Typography>
      <Typography>${product.price}</Typography>
      <Typography>{product.description}</Typography>
      <Button variant="contained">Add to Cart</Button>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default ProductDetails;
