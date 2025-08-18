import React from "react";

const MCQCard = ({ questions }) => {
  return (
    <div>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="mb-4">
          <h5>Question {questionIndex + 1}</h5>
          <p className="fs-5 mt-3">{question.question}</p>

          <div>
            {question.options.map((option, optionIndex) => {
              const optionId = `q${questionIndex}-option${optionIndex}`;
              return (
                <div key={optionIndex} className="mb-4 ms-4 border d-flex align-items-center rounded-3">
                  <input
                    className="form-check-input p-2 mb-2 ms-2 bold-none"
                    type="radio"
                    name={`question-${questionIndex}`}
                    value={option}
                    id={optionId}/>

                  <label
                    className="form-check-label fw-medium p-3"
                    htmlFor={optionId}>
                    {option}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MCQCard;