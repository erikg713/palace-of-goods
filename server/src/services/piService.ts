import { Pi } from "pi-sdk";
import dotenv from "dotenv";

dotenv.config();

Pi.init({
  version: "2.0",
  sandbox: process.env.PI_SANDBOX === "true",
});

export const getPiPayment = async (paymentId) => {
  return await Pi.getPayment(paymentId);
};import { Pi } from "pi-sdk";
import dotenv from "dotenv";

dotenv.config();

// Initialize Pi SDK
Pi.init({
  version: "2.0",
  sandbox: process.env.PI_SANDBOX === "true", // Ensure this environment variable is correctly set
});

/**
 * Verifies a Pi payment transaction.
 * @param {string} paymentId - The unique payment identifier from Pi.
 * @returns {Promise<boolean>} - Returns true if the payment is verified, false otherwise.
 */
export const verifyPiTransaction = async (paymentId) => {
  try {
    if (!paymentId) {
      throw new Error("❌ Payment ID is required for verification.");
    }

    // Fetch payment details from Pi API
    const payment = await Pi.getPayment(paymentId);

    // Debugging logs (remove in production)
    console.log("🔍 Verifying Pi Payment:", JSON.stringify(payment, null, 2));

    // Validate response structure
    if (!payment || typeof payment.status !== "string") {
      console.error("⚠️ Invalid response from Pi API:", payment);
      return false;
    }

    // Normalize and check payment status
    const status = payment.status.toUpperCase();
    if (status === "COMPLETED") {
      console.log(`✅ Pi Payment Verified: ${paymentId}`);
      return true;
    } else {
      console.warn(`❌ Pi Payment Not Verified (Status: ${status}): ${paymentId}`);
      return false;
    }
  } catch (error) {
    console.error("⚠️ Error verifying Pi transaction:", error);
    return false;
  }
};
