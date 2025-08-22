import ButtonComponent from "Components/Button/Button";
import Icons from "Utils/Icons";
// import 'Stylesheet/Css/Learners.css';

const LongAnswersCard = ({ questions = [] }) => {
  return (
          <div>
            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="mb-4">
                <div className="d-flex justify-content-between">
                  <div>
                    <h5>Question {questionIndex + 1}</h5>
                    <p>{question.question}</p>
                  </div>
                  <div>
                    <ButtonComponent
                      className="gradient text-white p-1 record-text"
                      type="button"
                      buttonName={
                        <span className="d-flex gap-2 align-items-center">
                          {Icons.recordericon} Record Your Audio
                        </span>
                      }
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    className="col-12 rounded-4 border"
                    style={{ height: "15vh" }}
                  />
                </div>
              </div>
            ))}
          </div>
  );
};

export default LongAnswersCard;