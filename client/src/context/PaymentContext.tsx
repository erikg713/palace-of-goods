import { createContext, useState, ReactNode } from "react";
import { createPayment, verifyPayment } from "../api";
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
  processPayment: async () => {}, // No-op function to prevent errors
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

      // Step 3: Handle different payment statuses
      if (piPayment.status === "completed") {
        // Step 4: Verify payment
        const verification = await verifyPayment(piPayment.paymentId);
        setMessage(verification.success ? "Payment successful!" : "Payment verification failed.");
      } else if (piPayment.status === "pending") {
        setMessage("Payment is pending. Please wait for confirmation.");
      } else if (piPayment.status === "cancelled") {
        setMessage("Payment was cancelled.");
      } else {
        setMessage("Payment not completed.");
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
