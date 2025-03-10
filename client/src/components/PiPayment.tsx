import React, { useState } from "react";
import { Pi } from "pi-sdk";
import { placeOrder } from "../services/orderService";
import { useCartStore } from "../state/cartStore";
const handlePiPayment = async () => {
  setLoading(true);
  try {
    const payment = await Pi.createPayment({
      amount,
      memo,
      metadata: { type: "purchase" },
      callbacks: {
        onCompleted: async (paymentId) => {
          console.log("Payment successful:", paymentId);
          alert("Payment successful!");
          await placeOrder(cart, amount, paymentId, token || "");
          clearCart();
          onSuccess();
        },
        onError: (error) => {
          console.error("Payment failed:", error);
          alert("Payment failed. Please try again.");
        }
      },
    });
    return payment;
  } catch (error) {
    alert("An error occurred during payment.");
    console.error(error);
  }
  setLoading(false);
};
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
          onCompleted: async (paymentId) => {
            console.log("Payment completed:", paymentId);
            alert("Payment successful!");

            // Store order with transaction ID
            await placeOrder(cart, amount, paymentId, token || "");
            clearCart();
            onSuccess();
          },
        },
      });

      return payment;
    } catch (error) {
      alert("Payment failed.");
      console.error(error);
    }
    setLoading(false);
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
import { useState } from "react";
import { initiatePiPayment } from "../utils/pi";

const PiPayment = () => {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const handlePayment = async () => {
    const payment = await initiatePiPayment(1, "Test Payment");
    if (payment) {
      setPaymentStatus(`Payment ${payment.status}`);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay 1 Pi</button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default PiPayment;
import React, { useState } from "react";
import { Pi } from "pi-sdk";

const PiPayment: React.FC<{ amount: number; memo: string; onSuccess: () => void }> = ({ amount, memo, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handlePiPayment = async () => {
    setLoading(true);
    try {
      const payment = await Pi.createPayment({
        amount,
        memo,
        metadata: { type: "purchase" },
        callbacks: {
          onReadyForServerApproval: (paymentId) => console.log("Payment ready:", paymentId),
          onPending: (paymentId) => console.log("Payment pending:", paymentId),
          onCompleted: (paymentId) => {
            console.log("Payment completed:", paymentId);
            alert("Payment successful!");
            onSuccess();
          },
          onCancelled: (paymentId) => alert("Payment cancelled."),
          onError: (error) => console.error("Payment error:", error),
        },
      });

      return payment;
    } catch (error) {
      alert("Payment failed.");
      console.error(error);
    }
    setLoading(false);
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
