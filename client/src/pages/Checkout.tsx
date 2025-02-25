import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { PaymentContext } from "../context/PaymentContext";
import PaymentButton from "../components/PaymentButton";
import { Typography, Container } from "@mui/material";

const Checkout = () => {
  const userContext = useContext(UserContext);
  const paymentContext = useContext(PaymentContext);

  if (!userContext || !paymentContext) return <Typography>Loading...</Typography>;

  const { user } = userContext;
  const { message } = paymentContext;

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h4">Checkout</Typography>
      <Typography variant="h6" color="textSecondary">Total: $10</Typography>

      {user ? <PaymentButton userId={user.id} amount={10} /> : <Typography>Please log in to continue.</Typography>}

      {message && (
        <Typography color={message.includes("failed") ? "error" : "success"} sx={{ marginTop: 2 }}>
          {message}
        </Typography>
      )}
    </Container>
  );
};

export default Checkout;
