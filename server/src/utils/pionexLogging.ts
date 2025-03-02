import axios from "axios";
import dotenv from "dotenv";
import Web3 from "web3";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PIONEX_API_URL = "https://api.pionex.us/api/v1";

export const cancelPionexTrade = async (tradeId: string) => {
  try {
    // Cancel order on Pionex.US
    const response = await axios.delete(`${PIONEX_API_URL}/orders/${tradeId}`, {
      headers: { Authorization: `Bearer ${process.env.PIONEX_API_KEY}` },
    });

    if (response.data.success) {
      console.log(`✅ Trade Canceled: ${tradeId}`);
      return true;
    } else {
      console.log(`❌ Failed to Cancel Trade: ${tradeId}`);
      return false;
    }
  } catch (error) {
    console.error("⚠️ Error canceling trade:", error);
    return false;
  }
};
dotenv.config();
const web3 = new Web3("https://rpc-mumbai.maticvigil.com");

const PIONEX_API_URL = "https://api.pionex.us/api/v1";

export const logPionexTrade = async (tradeId: string) => {
  try {
    // Fetch trade details from Pionex.US API
    const response = await axios.get(`${PIONEX_API_URL}/orders/${tradeId}`, {
      headers: { Authorization: `Bearer ${process.env.PIONEX_API_KEY}` },
    });

    if (response.data.status === "FILLED") {
      console.log(`✅ Trade Verified: ${tradeId}`);

      // Log in Web3
      const transaction = await web3.eth.sendTransaction({
        from: process.env.ADMIN_WALLET,
        to: process.env.LOGGING_CONTRACT,
        value: web3.utils.toWei("0.001", "ether"),
        data: web3.utils.utf8ToHex(`Trade ${tradeId} executed on Pionex.US`),
      });

      return transaction.transactionHash;
    } else {
      console.log(`❌ Trade Not Verified: ${tradeId}`);
      return null;
    }
  } catch (error) {
    console.error("⚠️ Error verifying trade:", error);
    return null;
  }
};
