import axios from "axios";
import { config } from "./index";

const PI_API_URL = "https://api.minepi.com/v2/payments";

if (!config.piApiKey || !config.piAppId) {
  console.error("❌ Pi Network API Key or App ID missing! Payments won't work.");
  process.exit(1);
}

/**
 * Initiates a payment request on the Pi Network
 */
export const createPiPayment = async (amount: number, userUid: string, metadata: object = {}): Promise<any> => {
  try {
    const response = await axios.post(
      PI_API_URL,
      {
        amount,
        memo: `Palace-of-Goods Purchase for User ${userUid}`,
        metadata,
        user_uid: userUid,
      },
      {
        headers: {
          Authorization: `Key ${config.piApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ Pi Payment Creation Failed:", error);
    throw error;
  }
};

/**
 * Verifies a completed payment by checking the Pi Network status
 */
export const verifyPiPayment = async (paymentId: string): Promise<any> => {
  try {
    const response = await axios.get(`${PI_API_URL}/${paymentId}`, {
      headers: {
        Authorization: `Key ${config.piApiKey}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Pi Payment Verification Failed:", error);
    throw error;
  }
};
