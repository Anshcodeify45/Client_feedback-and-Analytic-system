const express = require('express');
const router = express.Router();
const {createFeedback,feedbacks} = require('../Controller/feedbackController');

// Create a new feedback
router.post('/feedback', createFeedback);  

// Get all feedbacks
router.get('/feedbacks', feedbacks);

module.exports = router;