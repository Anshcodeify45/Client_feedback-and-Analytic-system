import React, { useState, useEffect } from "react";
import FeedbackList from "../Components/FeedbackList";
import FeedbackForm from "../Components/FeedbackForm";
import API_URL from "../config";
import Navbar from "../Components/Navbar";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    const res = await fetch(`${API_URL}/feedback`);
    const data = await res.json();
    setFeedbacks(data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const styles = {
    container: {
      backgroundColor: "#020617",
      minHeight: "100vh",
      padding: "20px",
      color: "#fff",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
      gap: "20px",
    },

    box: {
      background: "#0f172a",
      padding: "20px",
      borderRadius: "12px",
    },
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1 style={{ marginBottom: "20px" }}>Client Feedback</h1>

        <div className="feedback-grid" style={styles.grid}>
          <div style={styles.box}>
            <FeedbackForm refreshData={fetchFeedbacks} />
          </div>

          <div style={styles.box}>
            <FeedbackList feedbacks={feedbacks} />
          </div>
        </div>

        {/* Responsive CSS */}
        <style>
          {`
          @media (max-width: 768px) {
            .feedback-grid {
              grid-template-columns: 1fr !important;
            }
          }
          `}
        </style>
      </div>
    </>
  );
};

export default FeedbackPage;