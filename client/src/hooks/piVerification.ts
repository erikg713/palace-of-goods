import { Pi } from "pi-sdk";
import dotenv from "dotenv";

dotenv.config();

// Initialize Pi SDK
Pi.init({ version: "2.0", sandbox: false }); // Use `sandbox: true` for testing

export const verifyPiTransaction = async (paymentId: string) => {
  try {
    const payment = await Pi.getPayment(paymentId);
    if (payment?.status === "COMPLETED") {
      console.log(`✅ Pi Payment Verified: ${paymentId}`);
      return true;
    } else {
      console.log(`❌ Pi Payment Not Verified: ${paymentId}`);
      return false;
    }
  } catch (error) {
    console.error("⚠️ Error verifying Pi transaction:", error);
    return false;
  }
};
