const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
// middleware
app.use(cors());
app.use(express.json());
const feedbackRoutes = require("./Routes/FeedbackRoutes");
app.use("/api/feedback", feedbackRoutes);

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