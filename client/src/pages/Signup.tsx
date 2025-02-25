import { useState } from "react";
import { signup } from "../api";

interface SignupForm {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [form, setForm] = useState<SignupForm>({ username: "", email: "", password: "" });
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await signup(form.username, form.email, form.password);
      setMessage("Signup successful! Please login.");
      setForm({ username: "", email: "", password: "" }); // Reset form
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          value={form.username} 
          onChange={handleChange} 
          required 
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={form.email} 
          onChange={handleChange} 
          required 
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={form.password} 
          onChange={handleChange} 
          required 
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
      {message && <p style={{ color: message.includes("successful") ? "green" : "red" }}>{message}</p>}
    </div>
  );
};

export default Signup;
