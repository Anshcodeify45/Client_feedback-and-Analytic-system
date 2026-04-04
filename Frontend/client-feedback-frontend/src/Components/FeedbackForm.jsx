import React, { useState } from "react";
import API_URL from "../config";

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
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required /><br />
      <input name="email" placeholder="Email" value={form.email}  onChange={handleChange} required /><br />
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required /><br />

      <select name="rating" value={form.rating} onChange={handleChange}>
        <option value="5">5 ⭐</option>
        <option value="4">4 ⭐</option>
        <option value="3">3 ⭐</option>
        <option value="2">2 ⭐</option>
        <option value="1">1 ⭐</option>
      </select><br />

      <button type="submit">Submit</button>
    </form>
  );
}

export default FeedbackForm;