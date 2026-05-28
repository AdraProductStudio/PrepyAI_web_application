import ButtonComponent from "Components/Button/Button";
import { Card } from "react-bootstrap";
import JsonData from "Views/Learners/Utils/JsonData";
// import 'Stylesheet/Css/Learners.css'
import LongAnswersCard from "Components/Card/LongAnswersCard";

const LongAnswers = () => {
      const { jsonOnly } = JsonData();
      const questions = jsonOnly?.questions
  return (
    <div className="h-100">
      <Card className="h-100 border-0 rounded-3">
        <Card.Body className="overflow-auto  py-4 px-5">
          <div>
            <LongAnswersCard questions={questions} />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LongAnswers;
