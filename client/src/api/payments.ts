import axios from "axios";

const PI_API_URL = "https://api.minepi.com/v2/payments"; // Pi Payment API Base URL
const API_KEY = process.env.REACT_APP_PI_SERVER_KEY; // Store securely in .env file

// ✅ Helper Function: Get Auth Headers for Pi API
const getAuthHeaders = () => ({
  Authorization: `key ${API_KEY}`,
});

/**
 * 📥 Get Payment Information
 * @param paymentId - The payment ID to fetch details
 * @returns PaymentDTO object
 */
export const getPiPayment = async (paymentId: string) => {
  try {
    const { data } = await axios.get(`${PI_API_URL}/${paymentId}`, { headers: getAuthHeaders() });
    return data;
  } catch (error) {
    console.error("Error fetching Pi payment details:", error);
    throw error;
  }
};

/**
 * ✅ Approve a Payment
 * @param paymentId - The payment ID to approve
 * @returns Approved PaymentDTO object
 */
export const approvePiPayment = async (paymentId: string) => {
  try {
    const { data } = await axios.post(`${PI_API_URL}/${paymentId}/approve`, null, { headers: getAuthHeaders() });
    return data;
  } catch (error) {
    console.error("Error approving Pi payment:", error);
    throw error;
  }
};

/**
 * 🎉 Complete a Payment
 * @param paymentId - The payment ID to complete
 * @param txid - The blockchain transaction ID
 * @returns Completed PaymentDTO object
 */
export const completePiPayment = async (paymentId: string, txid: string) => {
  try {
    const payload = { txid };
    const { data } = await axios.post(`${PI_API_URL}/${paymentId}/complete`, payload, { headers: getAuthHeaders() });
    return data;
  } catch (error) {
    console.error("Error completing Pi payment:", error);
    throw error;
  }
};
