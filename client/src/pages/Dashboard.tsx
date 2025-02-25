import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData.data);
        setForm({ username: userData.data.username, email: userData.data.email, password: "" });
      } catch (error) {
        console.error("Error loading data", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserProfile(form);
      setUser(updatedUser.data);
      setMessage("Profile updated successfully!");
    } catch {
      setMessage("Update failed.");
    }
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      {user && (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      <h3>Edit Profile</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="New Username" />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="New Email" />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="New Password" />
        <button type="submit">Update Profile</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Dashboard;
import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile, uploadProfilePicture } from "../api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData.data);
        setForm({ username: userData.data.username, email: userData.data.email, password: "" });
        setProfilePic(userData.data.profile_pic);
      } catch (error) {
        console.error("Error loading data", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserProfile(form);
      setUser(updatedUser.data);
      setMessage("Profile updated successfully!");
    } catch {
      setMessage("Update failed.");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await uploadProfilePicture(file);
      setProfilePic(response.data.profilePic);
      setMessage("Profile picture updated!");
    } catch {
      setMessage("Upload failed.");
    }
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      {user && (
        <div>
          {profilePic && <img src={`https://your-backend-url.com${profilePic}`} alt="Profile" width="100" />}
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      <h3>Edit Profile</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="New Username" />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="New Email" />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="New Password" />
        <button type="submit">Update Profile</button>
      </form>

      <h3>Change Profile Picture</h3>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      
      <p>{message}</p>
    </div>
  );
};

export default Dashboard;
