import { Pi } from "pi-sdk";
import dotenv from "dotenv";

dotenv.config();

// Initialize Pi SDK
Pi.init({
  version: "2.0",
  sandbox: process.env.PI_SANDBOX === "true", // Use environment variable for flexibility
});

/**
 * Verifies a Pi payment transaction.
 * @param {string} paymentId - The unique payment identifier from Pi.
 * @returns {Promise<boolean>} - Returns true if the payment is verified, false otherwise.
 */
export const verifyPiTransaction = async (paymentId: string): Promise<boolean> => {
  try {
    // Fetch payment details from Pi API
    const payment = await Pi.getPayment(paymentId);

    // Log transaction details for debugging (remove in production)
    console.log("🔍 Verifying Pi Payment:", payment);

    // Validate response structure
    if (!payment || typeof payment.status !== "string") {
      console.error("⚠️ Invalid response from Pi API");
      return false;
    }

    // Check if payment is successfully completed
    if (payment.status.toUpperCase() === "COMPLETED") {
      console.log(`✅ Pi Payment Verified: ${paymentId}`);
      return true;
    } else {
      console.warn(`❌ Pi Payment Not Verified (Status: ${payment.status}): ${paymentId}`);
      return false;
    }
  } catch (error) {
    console.error("⚠️ Error verifying Pi transaction:", error);
    return false;
  }
};
