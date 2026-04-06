import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const res = await axios.get("http://localhost:5000/api/analytics");

    setTotal(res.data.total);
    setAvg(res.data.avgRating.toFixed(1));

    const formatted = res.data.ratings.map(item => ({
      rating: item._id,
      count: item.count
    }));

    setData(formatted);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Analytics Dashboard</h2>

      <div style={styles.cards}>
        <div style={styles.card}>Total: {total}</div>
        <div style={styles.card}>Avg Rating: {avg}</div>
      </div>

      <BarChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="rating" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" />
      </BarChart>
    </div>
  );
};

const styles = {
  container: {
    background: "#0f172a",
    padding: "20px",
    borderRadius: "12px",
    marginTop: "20px",
    color: "#fff"
  },

  title: {
    marginBottom: "20px"
  },

  cards: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px"
  },

  card: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "8px"
  }
};

export default Analytics;