import axios from "axios";
import { Product } from "../types/product";

const API_URL = "http://localhost:5000/api/orders";

export const placeOrder = async (products: Product[], totalPrice: number, transactionId: string, token: string) => {
  const response = await axios.post(
    API_URL,
    { products, totalPrice, transactionId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const fetchOrders = async (token: string) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
