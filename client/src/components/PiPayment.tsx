import React, { useState } from "react";
import { Pi } from "pi-sdk";
import { placeOrder } from "../services/orderService";
import { useCartStore } from "../state/cartStore";

const PiPayment: React.FC<{ amount: number; memo: string; onSuccess: () => void }> = ({ amount, memo, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { cart, clearCart } = useCartStore();
  const token = localStorage.getItem("token");

  const handlePiPayment = async () => {
    setLoading(true);
    try {
      const payment = await Pi.createPayment({
        amount,
        memo,
        metadata: { type: "purchase" },
        callbacks: {
          onReadyForServerApproval: (paymentId) => console.log("Payment ready for approval:", paymentId),
          onPending: (paymentId) => console.log("Payment is pending:", paymentId),
          onCompleted: async (paymentId) => {
            console.log("Payment successful:", paymentId);
            alert("Payment successful!");

            // Store order with transaction ID
            await placeOrder(cart, amount, paymentId, token || "");
            clearCart();
            onSuccess();
          },
          onCancelled: (paymentId) => {
            console.warn("Payment cancelled:", paymentId);
            alert("Payment was cancelled.");
          },
          onError: (error) => {
            console.error("Payment error:", error);
            alert("Payment failed. Please try again.");
          },
        },
      });

      return payment;
    } catch (error) {
      console.error("Payment failed:", error);
      alert("An error occurred during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handlePiPayment} disabled={loading}>
        {loading ? "Processing..." : `Pay ${amount} Pi`}
      </button>
    </div>
  );
};

export default PiPayment;
