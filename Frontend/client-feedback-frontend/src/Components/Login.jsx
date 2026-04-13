import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const res = await axios.post(`${API_URL}/login`, form);

      localStorage.setItem("token", res.data.token);
      console.log("API:", API_URL);
      console.log("FINAL URL:", `${API_URL}/login`);

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtitle}>Login to your dashboard</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.linkText}>
          Don’t have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    padding: "40px",
    borderRadius: "16px",
    width: "320px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    textAlign: "center",
  },

  title: {
    color: "#fff",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#94a3b8",
    marginBottom: "20px",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    background: "#1e293b",
    color: "#fff",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#3b82f6",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },

  linkText: {
    marginTop: "15px",
    color: "#94a3b8",
    fontSize: "14px",
  },

  link: {
    color: "#3b82f6",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;