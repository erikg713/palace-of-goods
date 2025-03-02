export const cancelOrder = async (orderId: string, token: string) => {
  try {
    const response = await axios.post(`${API_URL}/cancel/${orderId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error canceling order:", error);
    return null;
  }
};
