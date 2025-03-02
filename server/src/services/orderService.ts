import axios from "axios";
import { Product } from "../types/product";

const API_URL = process.env.API_URL || "http://localhost:5000/api/orders";

interface OrderResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const placeOrder = async (
  products: Product[],
  totalPrice: number,
  transactionId: string,
  token: string
): Promise<OrderResponse> => {
  try {
    const response = await axios.post(
      API_URL,
      { products, totalPrice, transactionId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error: any) {
    console.error("❌ Order placement failed:", error.response?.data || error.message);
    return { success: false, message: "Failed to place order" };
  }
};

export const fetchOrders = async (token: string): Promise<OrderResponse> => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("❌ Failed to fetch orders:", error.response?.data || error.message);
    return { success: false, message: "Failed to retrieve orders" };
  }
};
