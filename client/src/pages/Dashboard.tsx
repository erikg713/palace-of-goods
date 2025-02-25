import { useEffect, useState } from "react";
import { getUserProfile, getUserOrders } from "../api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserProfile();
        const ordersData = await getUserOrders();
        setUser(userData.data);
        setOrders(ordersData.data);
      } catch (error) {
        console.error("Error loading data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      {user && (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      <h3>Order History</h3>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>Order #{order.id} - ${order.amount}</li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Dashboard;
