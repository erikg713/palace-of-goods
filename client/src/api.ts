import axios from "axios";

const API_URL = "https://your-backend-url.com/api";

// 🛍️ Products API
export const getProducts = async () => axios.get(`${API_URL}/products`);
export const getProduct = async (id) => axios.get(`${API_URL}/products/${id}`);
export const addToCart = async (product) => axios.post(`${API_URL}/cart`, product);

// 💰 Payments API
export const createPayment = async (amount: number, userId: string) => {
  const response = await axios.post(`${API_URL}/payment/create`, { amount, userId });
  return response.data;
};

export const verifyPayment = async (paymentId: string) => {
  const response = await axios.post(`${API_URL}/payment/verify`, { paymentId });
  return response.data;
};

// 🔐 Authentication API
export const signup = async (username, email, password) =>
  axios.post(`${API_URL}/users/signup`, { username, email, password });

export const login = async (email, password) =>
  axios.post(`${API_URL}/users/login`, { email, password });

// 👤 User Profile API
export const getUserProfile = async () =>
  axios.get(`${API_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const updateUserProfile = async (data) =>
  axios.put(`${API_URL}/users/profile`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const uploadProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append("profilePic", file);

  return axios.post(`${API_URL}/users/profile/picture`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// 📦 Orders API
export const getUserOrders = async () =>
  axios.get(`${API_URL}/orders`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

// 🔄 Session API
export const checkSession = async () =>
  axios.get(`${API_URL}/users/session`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
