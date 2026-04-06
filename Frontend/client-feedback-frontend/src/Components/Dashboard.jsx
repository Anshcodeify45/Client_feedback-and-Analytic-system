import React, { useState, useEffect } from "react";
import FeedbackList from "../Components/FeedbackList";
import FeedbackForm from "../Components/FeedbackForm";
import API_URL from "../config";
import Navbar from "../Components/Navbar";
import Analytics from "../Components/Analytics";

const styles = {
  container: {
    backgroundColor: "#020617",
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Arial",
  },

  title: {
    color: "#fff",
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "20px",
  },

  left: {
    background: "#0f172a",
    padding: "20px",
    borderRadius: "12px",
  },

  right: {
    background: "#0f172a",
    padding: "20px",
    borderRadius: "12px",
  },
};

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    const res = await fetch(`${API_URL}/feedback`);
    const data = await res.json();
    setFeedbacks(data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <>
      <Navbar /> {/* 🔥 Navbar added */}

      <div style={styles.container}>
        <h1 style={styles.title}>Client Feedback Portal</h1>

        <div style={styles.grid}>
          <div style={styles.left}>
            <FeedbackForm refreshData={fetchFeedbacks} />
          </div>

          <div style={styles.right}>
            <FeedbackList feedbacks={feedbacks} />
          </div>
        </div>
          <Analytics />
      </div>
    </>
  );
};

export default Dashboard;