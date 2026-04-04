
import FeedbackCard from "./FeedbackCard";

function FeedbackList({ feedbacks }) {
 

  return (
    <div>
      <h2>All Feedback</h2>
      {feedbacks.map((fb) => (
  <FeedbackCard key={fb._id} fb={fb} />
  ))}
    </div>
  );
}

export default FeedbackList;