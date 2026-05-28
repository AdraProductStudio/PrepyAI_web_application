import MCQCard from "Components/Card/MCQCard";
import React from "react";
import { Card } from "react-bootstrap";
import JsonData from "Views/Learners/Utils/JsonData";

const MCQ = () => {
  const { jsonOnly } = JsonData();
  const questions = jsonOnly?.questions;
  return (
    <div className="h-100">
      <Card className="h-100 border-0 rounded-3 overflow-auto">
        <Card.Body>
          <div className=" overflow-auto col p-4">
             <MCQCard questions={questions} />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MCQ;
