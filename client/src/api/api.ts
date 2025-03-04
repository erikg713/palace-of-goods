import axios from "axios";

const API_URL = "https://your-backend-url.com/api";

// 🔐 Helper: Get Auth Headers
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// 🛍️ Products API
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const addToCart = async (product: { id: string; quantity: number }) => {
  try {
    const response = await axios.post(`${API_URL}/cart`, product);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

// 💰 Payments API
export const createPayment = async (amount: number, userId: string) => {
  try {
    const response = await axios.post(`${API_URL}/payment/create`, { amount, userId });
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

export const verifyPayment = async (paymentId: string) => {
  try {
    const response = await axios.post(`${API_URL}/payment/verify`, { paymentId });
    return response.data;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};

// 🔐 Authentication API
export const signup = async (username: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/users/signup`, { username, email, password });
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// 👤 User Profile API
export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/profile`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (data: { name?: string; email?: string }) => {
  try {
    const response = await axios.put(`${API_URL}/users/profile`, data, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const uploadProfilePicture = async (file: File) => {
  const formData = new FormData();
  formData.append("profilePic", file);

  try {
    const response = await axios.post(`${API_URL}/users/profile/picture`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...getAuthHeaders(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};

// 📦 Orders API
export const getUserOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

// 🔄 Session API
export const checkSession = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/session`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Error checking session:", error);
    throw error;
  }
};
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (userData: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};
