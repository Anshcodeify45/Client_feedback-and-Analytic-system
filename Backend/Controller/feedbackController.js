const Feedback =require("../models/Feedback");

// Create a new feedback

exports.createFeedback = async (req, res) =>{
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json({message:"Feedback created successfully", feedback});
    } catch (error) {
        res.status(500).json({message:"failed to create feedback", error: error.message}); 
    }
}

// Get all feedbacks
exports.feedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks); // ✅ FIXED
  } catch (error) {
    res.status(500).json({
      message: "failed to retrieve feedbacks",
      error: error.message
    });
  }
};