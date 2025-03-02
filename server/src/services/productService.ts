import axios from "axios";
import { Product } from "../types/product";

const API_URL = process.env.API_URL || "http://localhost:5000/api/products";

interface ProductResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const fetchProducts = async (): Promise<ProductResponse> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error: any) {
    console.error("❌ Failed to fetch products:", error.response?.data || error.message);
    return { success: false, message: "Failed to retrieve products" };
  }
};

export const createProduct = async (
  productData: Product,
  token: string
): Promise<ProductResponse> => {
  try {
    const response = await axios.post(API_URL, productData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("❌ Failed to create product:", error.response?.data || error.message);
    return { success: false, message: "Failed to create product" };
  }
};
