import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:5000/api/payments";

interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export const initiatePayment = async (amount: number, userUid: string): Promise<PaymentResponse> => {
  try {
    const response = await axios.post(`${API_URL}/create`, { amount, userUid });
    return response.data;
  } catch (error: any) {
    console.error("❌ Payment initiation failed:", error.response?.data || error.message);
    return { success: false, error: "Payment initiation failed" };
  }
};

export const verifyPayment = async (paymentId: string): Promise<PaymentResponse> => {
  try {
    const response = await axios.get(`${API_URL}/verify/${paymentId}`);
    return response.data;
  } catch (error: any) {
    console.error("❌ Payment verification failed:", error.response?.data || error.message);
    return { success: false, error: "Payment verification failed" };
  }
};
