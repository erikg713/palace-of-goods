import { useState } from "react";
import { createPayment, verifyPayment } from "../api";
import { PiNetwork } from "@pinetwork/pi-ui";

const pi = new PiNetwork("your-app-id");

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setMessage("");

    try {
      const userId = "test-user"; // Replace with logged-in user ID
      const amount = 10; // Example amount

      // Step 1: Create Payment Request
      const payment = await createPayment(amount, userId);

      // Step 2: Start Pi Payment
      const piPayment = await pi.createPayment({
        amount,
        memo: "Palace of Goods Purchase",
        metadata: { userId },
      });

      if (piPayment.status === "completed") {
        // Step 3: Verify Payment
        await verifyPayment(piPayment.paymentId);
        setMessage("Payment successful!");
      } else {
        setMessage("Payment not completed.");
      }
    } catch (error) {
      setMessage("Payment failed.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay with Pi Network"}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default Checkout;
