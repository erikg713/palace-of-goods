import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:5000/api/auth";

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: any;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error: any) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    return { success: false, message: "Login failed" };
  }
};

export const register = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
  } catch (error: any) {
    console.error("❌ Registration failed:", error.response?.data || error.message);
    return { success: false, message: "Registration failed" };
  }
};
