import React, { useState } from "react";
import API_URL from "../config";



const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #1e293b",
    background: "#020617",
    color: "#fff",
    outline: "none",
  },

  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #1e293b",
    background: "#020617",
    color: "#fff",
    minHeight: "100px",
    outline: "none",
  },

  button: {
    background: "#22c55e",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
};


function FeedbackForm({ refreshData }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch(`${API_URL}/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  });

  await res.json();

  alert("✅ Feedback submitted!");

  refreshData(); // already added
  setForm({
    name: "",
    email: "",
    message: "",
    rating: 5
  });
};
  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} style={styles.input} required /><br />
      <input name="email" placeholder="Email" value={form.email}  onChange={handleChange} style={styles.input} required /><br />
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} style={styles.input} required /><br />

      <select name="rating" value={form.rating} onChange={handleChange} style={styles.input}>
        <option value="5">5 ⭐</option>
        <option value="4">4 ⭐</option>
        <option value="3">3 ⭐</option>
        <option value="2">2 ⭐</option>
        <option value="1">1 ⭐</option>
      </select><br />

      <button type="submit" style={styles.input} 
      onMouseEnter={(e) => (e.target.style.background = "#16a34a")}
      onMouseLeave={(e) => (e.target.style.background = "#22c55e")}
      >Submit</button>
    </form>
  );
}

export default FeedbackForm;