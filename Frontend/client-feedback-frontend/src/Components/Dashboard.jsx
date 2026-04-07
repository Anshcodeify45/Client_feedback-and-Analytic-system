import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
import { Star, MessageSquare, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import API_URL from "../config";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

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

  const totalFeedback = feedbacks.length;

  const avgRating =
    feedbacks.length > 0
      ? (feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length).toFixed(1)
      : 0;

  const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  feedbacks.forEach((f) => {
    ratingCounts[f.rating]++;
  });

  const data = {
    labels: ["1⭐", "2⭐", "3⭐", "4⭐", "5⭐"],
    datasets: [
      {
        data: [
          ratingCounts[1],
          ratingCounts[2],
          ratingCounts[3],
          ratingCounts[4],
          ratingCounts[5],
        ],
        backgroundColor: [
          "#ef4444",
          "#f97316",
          "#eab308",
          "#3b82f6",
          "#22c55e",
        ],
        borderRadius: 12,
        barThickness: 40,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#020617",
        borderColor: "#333",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: "#aaa" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#aaa" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  const styles = {
    container: {
      padding: "30px",
      background: "#020617",
      minHeight: "100vh",
      color: "#fff",
    },
    title: {
      fontSize: "28px",
      display: "flex",
      gap: "10px",
      marginBottom: "25px",
      fontWeight: "700",
    },
    cards: {
      display: "flex",
      gap: "20px",
      marginBottom: "30px",
    },
    card: {
      flex: 1,
      padding: "20px",
      borderRadius: "16px",
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    },
    chartBox: {
      padding: "20px",
      borderRadius: "16px",
      background: "rgba(255,255,255,0.04)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    },
    
  };
  

        // Add this at bottom of return
        <style>
        {`
        @media (max-width: 768px) {
          .dashboard-title {
            font-size: 22px !important;
          }
        }
        `}
        </style>
  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.title}>
          <BarChart3 /> Dashboard
        </h1>

        {/* Cards */}
        <div style={styles.cards}>
          <motion.div
            style={styles.card}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>Total Feedback</p>
            <h2>{totalFeedback}</h2>
            <MessageSquare />
          </motion.div>

          <motion.div
            style={{ ...styles.card, background: "linear-gradient(135deg, #064e3b, #022c22)" }}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>Avg Rating</p>
            <h2>{avgRating}</h2>
            <Star />
          </motion.div>
        </div>

        {/* Chart */}
        <motion.div
          style={styles.chartBox}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>Ratings Overview</h3>
          <Bar data={data} options={options} />
        </motion.div>
      </div>
    </>
  );
};

export default Dashboard;