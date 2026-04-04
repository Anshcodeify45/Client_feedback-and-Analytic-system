import React from "react";

function FeedbackCard({ fb }) {
  return (
    <div>
      <h3>{fb.name} ({fb.rating}⭐)</h3>
      <p>{fb.message}</p>
      <small>{fb.email}</small>
    </div>
  );
}

export default FeedbackCard;