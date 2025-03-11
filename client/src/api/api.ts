import axios from "axios";

// ✅ Base API URL (from .env)
const API_URL = process.env.REACT_APP_API_URL || "https://your-backend-url.com/api";

// ✅ Helper: Get Auth Headers
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ✅ Centralized Error Handler
const handleRequestError = (error: any) => {
  console.error("API Error:", error.response?.data?.message || error.message);
  throw error.response?.data || error;
};

// 🔄 Set up Axios Interceptors for Authenticated Requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔐 **Authentication API**
export const signup = async (username: string, email: string, password: string) => {
  try {
    const { data } = await axios.post(`${API_URL}/users/signup`, { username, email, password });
    return data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const { data } = await axios.post(`${API_URL}/users/login`, { email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  } catch (error) {
    handleRequestError(error);
  }
};

// 👤 **User Profile API**
export const getUserProfile = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/users/profile`);
    return data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const updateUserProfile = async (profileData: { name?: string; email?: string }) => {
  try {
    const { data } = await axios.put(`${API_URL}/users/profile`, profileData);
    return data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const uploadProfilePicture = async (file: File) => {
  const formData = new FormData();
  formData.append("profilePic", file);

  try {
    const { data } = await axios.post(`${API_URL}/users/profile/picture`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    handleRequestError(error);
  }
};

// 🛍️ **Products API**
export const getProducts = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/products`);
    return data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getProduct = async (id: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/products/${id}`);
    return data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const addToCart = async (product: { id: string; quantity: number }) => {
  try {
    const { data } = await axios.post(`${API_URL}/cart`, product);
    return data;
  } catch (error) {
    handleRequestError(error);
  }
};

// 💰 **Payments API**
export const createPayment = async (amount: number, userId: string) => {
  try {
    const { data } = await axios.post(`${API_URL}/payment/create`, { amount, userId });
    return data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const verifyPayment = async (paymentId: string) => {
  try {
    const { data } = await axios.post(`${API_URL}/payment/verify`, { paymentId });
    return data;
  } catch (error) {
    handleRequestError(error);
  }
};

// 📦 **Orders API**
export const getUserOrders = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/orders`);
    return data;
  } catch (error) {
    handleRequestError(error);
  }
};

// 🔄 **Session API**
export const checkSession = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/users/session`);
    return data;
  } catch (error) {
    handleRequestError(error);
  }
};

// 🔑 **Logout**
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.reload(); // Ensures the app resets to a logged-out state
};
