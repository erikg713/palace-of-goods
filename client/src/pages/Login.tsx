import { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data } = await login(form.email, form.password);
      localStorage.setItem("token", data.token);
      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {message && <p style={{ color: message.includes("successful") ? "green" : "red" }}>{message}</p>}
    </div>
  );
};

export default Login;
