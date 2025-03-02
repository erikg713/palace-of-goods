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
import React from "react";
import { useCartStore } from "../state/cartStore";
import PiPayment from "../components/PiPayment";

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCartStore();

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h1>Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>{item.price} Pi</p>
            </div>
          ))}
          <h3>Total: {totalPrice} Pi</h3>
          <PiPayment amount={totalPrice} memo="Marketplace Purchase" onSuccess={clearCart} />
        </>
      )}
    </div>
  );
};

export default Checkout;
