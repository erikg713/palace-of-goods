import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile, uploadProfilePicture } from "../api";
import { TextField, Button, Typography, Container, Avatar, CircularProgress } from "@mui/material";

interface User {
  id: number;
  username: string;
  email: string;
  profile_pic?: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [profilePic, setProfilePic] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData.data);
        setForm({ username: userData.data.username, email: userData.data.email, password: "" });
        setProfilePic(userData.data.profile_pic);
      } catch (error) {
        setMessage("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const updatedUser = await updateUserProfile(form);
      setUser(updatedUser.data);
      setMessage("Profile updated successfully!");
    } catch {
      setMessage("Update failed.");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const response = await uploadProfilePicture(file);
      setProfilePic(response.data.profilePic);
      setMessage("Profile picture updated!");
    } catch {
      setMessage("Upload failed.");
    }
  };

  if (loading) return <CircularProgress style={{ display: "block", margin: "20px auto" }} />;

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h4">User Dashboard</Typography>
      {user && (
        <>
          <Avatar
            src={profilePic ? `https://your-backend-url.com${profilePic}` : "/default-avatar.png"}
            alt="Profile"
            sx={{ width: 100, height: 100, margin: "10px auto" }}
          />
          <Typography variant="h6">Username: {user.username}</Typography>
          <Typography variant="h6">Email: {user.email}</Typography>
        </>
      )}

      <Typography variant="h5" sx={{ marginTop: 3 }}>Edit Profile</Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <TextField label="Username" name="username" value={form.username} onChange={handleChange} required />
        <TextField label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
        <TextField label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary">Update Profile</Button>
      </form>

      <Typography variant="h5" sx={{ marginTop: 3 }}>Change Profile Picture</Typography>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      
      {message && <Typography color={message.includes("failed") ? "error" : "success"}>{message}</Typography>}
    </Container>
  );
};

export default Dashboard;
