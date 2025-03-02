import { useState } from "react";
import { initiatePiPayment } from "../utils/pi";
import { PiPayment } from "../types/pi";

export const usePiPayment = () => {
  const [payment, setPayment] = useState<PiPayment | null>(null);
  const [loading, setLoading] = useState(false);

  const startPayment = async (amount: number, memo: string) => {
    setLoading(true);
    const paymentResponse = await initiatePiPayment(amount, memo);
    setPayment(paymentResponse);
    setLoading(false);
  };

  return { payment, startPayment, loading };
};
