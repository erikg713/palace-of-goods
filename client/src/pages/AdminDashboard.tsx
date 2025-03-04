import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.email} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

const AdminDashboard = () => {
  return <h1>Welcome, Admin!</h1>;
};

export default AdminDashboard;
