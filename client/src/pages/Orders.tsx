import React, { useEffect, useState } from "react";
import { fetchOrders } from "../services/orderService";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadOrders = async () => {
      if (!token) return;
      const data = await fetchOrders(token);
      setOrders(data);
    };
    loadOrders();
  }, [token]);

  return (
    <div>
      <h1>Your Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Total: {order.totalPrice} Pi</p>
              <p>Status: {order.status}</p>
              <p>Transaction ID: {order.transactionId}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
