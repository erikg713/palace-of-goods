import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchAllOrders, updateOrderStatus } from "../services/adminService";

const AdminOrders: React.FC = () => {
  const { isAdmin } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!isAdmin) return;

    const loadOrders = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await fetchAllOrders(token);
        setOrders(data);
      }
    };

    loadOrders();
  }, [isAdmin]);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const updatedOrder = await updateOrderStatus(orderId, newStatus, token);
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? updatedOrder : order))
    );
  };

  if (!isAdmin) {
    return <p>Access Denied</p>;
  }

  return (
    <div>
      <h1>Admin Order Management</h1>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Transaction ID</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.totalPrice} Pi</td>
                <td>{order.status}</td>
                <td>{order.transactionId || "N/A"}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;
