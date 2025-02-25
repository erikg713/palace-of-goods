import { createContext, useState, ReactNode } from "react";
import { createPayment, verifyPayment } from "../api";
import { PiNetwork } from "@pinetwork/pi-ui";

const pi = new PiNetwork("your-app-id");

interface PaymentContextType {
  loading: boolean;
  message: string;
  processPayment: (userId: string, amount: number) => Promise<void>;
}

export const PaymentContext = createContext<PaymentContextType | null>(null);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const processPayment = async (userId: string, amount: number) => {
    setLoading(true);
    setMessage("");

    try {
      const payment = await createPayment(amount, userId);
      if (!payment || !payment.paymentId) throw new Error("Failed to create payment");

      const piPayment = await pi.createPayment({
        amount,
        memo: "Palace of Goods Purchase",
        metadata: { userId, paymentId: payment.paymentId },
      });

      if (piPayment.status === "completed") {
        const verification = await verifyPayment(piPayment.paymentId);
        setMessage(verification.success ? "Payment successful!" : "Payment verification failed.");
      } else {
        setMessage("Payment not completed.");
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Payment failed.");
    }

    setLoading(false);
  };

  return (
    <PaymentContext.Provider value={{ loading, message, processPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};
