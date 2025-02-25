import React from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { removeFromCart, clearCart } from "../cartSlice";

const Cart: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const calculateTotalPrice = (): string => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cartItems.map((item) => (
              <li key={item.id} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc", padding: "10px" }}>
                <strong>{item.name}</strong> - ${item.price} x {item.quantity}
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  aria-label={`Remove ${item.name} from cart`}
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h3>Total Price: <span style={{ color: "green" }}>${calculateTotalPrice()}</span></h3>
        </>
      ) : (
        <p style={{ color: "gray" }}>Your cart is empty. Please add items to your cart.</p>
      )}
      <button
        onClick={() => dispatch(clearCart())}
        aria-label="Clear all items from cart"
        disabled={cartItems.length === 0}
        style={{
          marginTop: "20px",
          backgroundColor: cartItems.length > 0 ? "#ff4d4d" : "#ccc",
          color: "white",
          border: "none",
          padding: "10px 15px",
          cursor: cartItems.length > 0 ? "pointer" : "not-allowed",
        }}
      >
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
