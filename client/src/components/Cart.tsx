import React from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { removeFromCart, clearCart, updateQuantity } from "../cartSlice";

const Cart: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const calculateTotalPrice = (): string => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toLocaleString("en-US", { style: "currency", currency: "USD" });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cartItems.map((item) => (
              <li key={item.id} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc", padding: "10px" }}>
                <strong>{item.name}</strong> - ${item.price.toFixed(2)} x {item.quantity}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5px" }}>
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                    disabled={item.quantity <= 1}
                    style={{
                      backgroundColor: "#f0ad4e",
                      color: "white",
                      border: "none",
                      padding: "5px",
                      marginRight: "5px",
                      cursor: item.quantity > 1 ? "pointer" : "not-allowed",
                    }}
                  >
                    -
                  </button>
                  <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    style={{
                      backgroundColor: "#5cb85c",
                      color: "white",
                      border: "none",
                      padding: "5px",
                      marginLeft: "5px",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
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
                </div>
              </li>
            ))}
          </ul>
          <h3>Total Price: <span style={{ color: "green" }}>{calculateTotalPrice()}</span></h3>
        </>
      ) : (
        <p style={{ color: "gray" }}>Your cart is empty. Please add items to your cart.</p>
      )}
      <button
        onClick={() => dispatch(clearCart())}
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
