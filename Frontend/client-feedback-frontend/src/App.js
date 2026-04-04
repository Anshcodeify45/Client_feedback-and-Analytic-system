import './App.css';
import React, { useState, useEffect } from "react";
import FeedbackList from './Components/FeedbackList';
import FeedbackForm from './Components/FeedbackForm';
import API_URL from "./config";


function App() {
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
    <div className="App">
      <FeedbackForm refreshData={fetchFeedbacks}/>
      <FeedbackList feedbacks={feedbacks}/>
    </div>
  );
}

export default App;
