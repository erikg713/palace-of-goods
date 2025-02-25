import axios from "axios";

const API_URL = "https://your-backend-url.com/api";

export const getProducts = async () => {
  return axios.get(`${API_URL}/products`);
};

export const getProduct = async (id) => {
  return axios.get(`${API_URL}/products/${id}`);
};

export const addToCart = async (product) => {
  return axios.post(`${API_URL}/cart`, product);
};
