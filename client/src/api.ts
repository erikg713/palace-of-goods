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
import axios from "axios";

const API_URL = "https://your-backend-url.com/api";

// Create a payment request
export const createPayment = async (amount: number, userId: string) => {
  const response = await axios.post(`${API_URL}/payment/create`, { amount, userId });
  return response.data;
};

// Verify payment
export const verifyPayment = async (paymentId: string) => {
  const response = await axios.post(`${API_URL}/payment/verify`, { paymentId });
  return response.data;
};
