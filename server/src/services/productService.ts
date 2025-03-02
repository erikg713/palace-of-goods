import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createProduct = async (productData, token) => {
  const response = await axios.post(API_URL, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
