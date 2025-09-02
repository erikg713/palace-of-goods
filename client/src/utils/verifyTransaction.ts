import { getPiPayment } from "../services/piService.js";

export const verifyPiTransaction = async (paymentId) => {
  try {
    const payment = await getPiPayment(paymentId);
    return payment?.status?.toUpperCase() === "COMPLETED";
  } catch (error) {
    console.error("Error verifying Pi transaction:", error);
    return false;
  }
};
