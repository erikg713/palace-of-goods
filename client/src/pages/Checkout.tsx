import { useState } from "react";
import { createPayment, verifyPayment } from "../api";
import { Button, Typography, CircularProgress, Container } from "@mui/material";
import { PiNetwork } from "@pinetwork/pi-ui";

const pi = new PiNetwork("your-app-id");

const Checkout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handlePayment = async () => {
    setLoading(true);
    setMessage("");

    try {
      const userId = "test-user"; // Replace with actual logged-in user ID
      const amount = 10; // Example amount

      // Step 1: Create Payment Request
      const payment = await createPayment(amount, userId);
      if (!payment || !payment.paymentId) throw new Error("Failed to create payment");

      // Step 2: Start Pi Payment
      const piPayment = await pi.createPayment({
        amount,
        memo: "Palace of Goods Purchase",
        metadata: { userId, paymentId: payment.paymentId },
      });

      if (piPayment.status === "completed") {
        // Step 3: Verify Payment
        const verification = await verifyPayment(piPayment.paymentId);
        if (verification.success) {
          setMessage("Payment successful!");
        } else {
          setMessage("Payment verification failed.");
        }
      } else {
        setMessage("Payment not completed.");
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Payment failed.");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h4">Checkout</Typography>
      <Typography variant="h6" color="textSecondary">Total: $10</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handlePayment}
        disabled={loading}
        sx={{ marginTop: 2 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Pay with Pi Network"}
      </Button>

      {message && <Typography color={message.includes("failed") ? "error" : "success"} sx={{ marginTop: 2 }}>{message}</Typography>}
    </Container>
  );
};

export default Checkout;
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { PaymentContext } from "../context/PaymentContext";
import PaymentButton from "../components/PaymentButton";
import { Typography, Container } from "@mui/material";

const Checkout = () => {
  const userContext = useContext(UserContext);
  const paymentContext = useContext(PaymentContext);

  if (!userContext || !paymentContext) return null;

  const { user } = userContext;
  const { message } = paymentContext;

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h4">Checkout</Typography>
      <Typography variant="h6" color="textSecondary">Total: $10</Typography>

      {user ? <PaymentButton userId={user.id} amount={10} /> : <Typography>Please log in to continue.</Typography>}

      {message && <Typography color={message.includes("failed") ? "error" : "success"} sx={{ marginTop: 2 }}>{message}</Typography>}
    </Container>
  );
};

export default Checkout;
