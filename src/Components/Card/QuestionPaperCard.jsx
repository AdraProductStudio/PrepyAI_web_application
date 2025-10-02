import { Card } from "react-bootstrap";

const QuestionPaperCard = ({ title, questions, onClickCard, className }) => {
  return (
    <Card
      className={`border-0 shadow-sm w-100 cursor-pointer ${className}`}
      onClick={onClickCard}
    >
      <Card.Body>
        <Card.Title className="text-center mb-3">{title}</Card.Title>

        {/* ✅ Preview Questions */}
        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          {questions?.map((q) => (
            <div key={q.Question_no} className="mb-2">
              <strong>Q{q.Question_no}:</strong> {q.Question}
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default QuestionPaperCard;
