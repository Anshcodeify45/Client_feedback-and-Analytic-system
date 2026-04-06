const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./Routes/auth");
const Feedback = require("./models/Feedback");

dotenv.config();
const app = express();
// middleware
app.use(cors());
app.use(express.json());
const feedbackRoutes = require("./Routes/FeedbackRoutes");
app.use("/api/feedback", feedbackRoutes);
app.use("/api", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Client Feedback API!" });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Connection Error:", err));

  // Start the server on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api/analytics", async (req, res) => {
  try {
    const total = await Feedback.countDocuments();

    const avgRating = await Feedback.aggregate([
      { $group: { _id: null, avg: { $avg: "$rating" } } }
    ]);

    const ratings = await Feedback.aggregate([
      { $group: { _id: "$rating", count: { $sum: 1 } } }
    ]);

    res.json({
      total,
      avgRating: avgRating[0]?.avg || 0,
      ratings
    });

  } catch (err) {
    res.status(500).json({ msg: "Error fetching analytics" });
  }
});