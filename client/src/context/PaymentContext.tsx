import { createContext, useState, ReactNode } from "react";
import axios from "axios";
import { createPayment } from "../api";
import { PiNetwork } from "@pinetwork/pi-ui";

const pi = new PiNetwork("your-app-id");

interface PaymentContextType {
  loading: boolean;
  message: string;
  processPayment: (userId: string, amount: number) => Promise<void>;
}

const defaultPaymentContext: PaymentContextType = {
  loading: false,
  message: "",
  processPayment: async () => {},
};

export const PaymentContext = createContext<PaymentContextType>(defaultPaymentContext);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const processPayment = async (userId: string, amount: number) => {
    setLoading(true);
    setMessage("");

    try {
      // Step 1: Create a new payment
      const payment = await createPayment(amount, userId);
      if (!payment || !payment.paymentId) throw new Error("Failed to create payment");

      // Step 2: Initiate Pi payment
      const piPayment = await pi.createPayment({
        amount,
        memo: "Palace of Goods Purchase",
        metadata: { userId, paymentId: payment.paymentId },
      });

      if (!piPayment || !piPayment.identifier) {
        throw new Error("Pi Payment initiation failed");
      }

      // Step 3: Approve the payment using Pi API
      const APIKEY = process.env.REACT_APP_PI_SERVER_KEY; // Store securely
      const headers = { headers: { authorization: `key ${APIKEY}` } };
      const approveURL = `https://api.minepi.com/v2/payments/${piPayment.identifier}/approve`;

      const approvalResponse = await axios.post(approveURL, null, headers);
      if (!approvalResponse.data || !approvalResponse.data.status.developer_approved) {
        throw new Error("Payment approval failed");
      }

      // Step 4: Verify the payment
      const verifyURL = `https://api.minepi.com/v2/payments/${piPayment.identifier}`;
      const verificationResponse = await axios.get(verifyURL, headers);
      if (!verificationResponse.data || !verificationResponse.data.status.transaction_verified) {
        throw new Error("Payment verification failed");
      }

      // Step 5: Complete the payment if transaction is verified
      if (verificationResponse.data.transaction?.txid) {
        const completeURL = `https://api.minepi.com/v2/payments/${piPayment.identifier}/complete`;
        const completeResponse = await axios.post(
          completeURL,
          { txid: verificationResponse.data.transaction.txid },
          headers
        );

        if (completeResponse.data.status.developer_completed) {
          setMessage("Payment successful!");
        } else {
          throw new Error("Payment completion failed");
        }
      } else {
        throw new Error("Transaction ID missing");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      setMessage(error.response?.data?.error || "An error occurred while processing payment.");
    }

    setLoading(false);
  };

  return (
    <PaymentContext.Provider value={{ loading, message, processPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};
