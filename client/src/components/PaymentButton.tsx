import { useContext } from "react";
import { PaymentContext } from "../context/PaymentContext";
import { Button, CircularProgress } from "@mui/material";

const PaymentButton = ({ userId, amount }: { userId: string; amount: number }) => {
  const paymentContext = useContext(PaymentContext);

  if (!paymentContext) return null; // Ensure context exists

  const { loading, processPayment } = paymentContext;

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => processPayment(userId, amount)}
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : `Pay $${amount} with Pi`}
    </Button>
  );
};

export default PaymentButton;
