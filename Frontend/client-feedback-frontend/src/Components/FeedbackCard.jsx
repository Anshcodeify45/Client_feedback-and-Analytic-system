import React from "react";


const styles = {
  card: {
    background: "#020617",
    border: "1px solid #1e293b",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "12px",
    transition: "0.3s",
    cursor: "pointer",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    margin: 0,
    fontSize: "18px",
    color: "#fff",
  },

  email: {
    margin: 0,
    fontSize: "13px",
    color: "#94a3b8",
  },

  rating: {
    background: "#22c55e",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "8px",
    fontSize: "14px",
  },

  message: {
    marginTop: "15px",
    fontSize: "15px",
    color: "#cbd5e1",
    lineHeight: "1.5",
  },
};


function FeedbackCard({ fb }) {
  return (
        <div
      style={styles.card}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div style={styles.header}>
        <div>
          <h3 style={styles.name}>{fb.name}</h3>
          <p style={styles.email}>{fb.email}</p>
        </div>

        <span style={styles.rating}>{fb.rating}⭐</span>
      </div>

      <p style={styles.message}>{fb.message}</p>
    </div>
  );
}

export default FeedbackCard;