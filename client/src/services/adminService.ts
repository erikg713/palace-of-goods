import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

export const fetchAllOrders = async (token: string) => {
  const response = await axios.get(`${API_URL}/admin`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateOrderStatus = async (orderId: string, status: string, token: string) => {
  const response = await axios.put(
    `${API_URL}/${orderId}`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
