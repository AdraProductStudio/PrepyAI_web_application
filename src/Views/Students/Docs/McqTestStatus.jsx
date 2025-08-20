import React from "react"
import { useCommonState } from "Components/CustomHooks"
import { Card, Row, Col, Badge, ProgressBar } from "react-bootstrap"

function McqTestStatus() {
  const { studentState } = useCommonState()

  const summary = studentState?.mcq_test?.summary || {}
  const results = studentState?.mcq_test?.result || []

  const { correct = 0, wrong = 0, unanswered = 0 } = summary

  return (
    <div className="p-3">
      <Card className="mb-4 p-3 shadow-sm">
        <Row>
          <Col md={6}>
            <h5 className="fw-bold mb-3">Test Results</h5>
            <div className="mb-2">
              <Badge bg="success" className="me-2">
                Correct: {correct}
              </Badge>
              <Badge bg="danger" className="me-2">
                Wrong: {wrong}
              </Badge>
              <Badge bg="secondary">
                Unanswered: {unanswered}
              </Badge>
            </div>
            <ProgressBar>
              <ProgressBar
                now={(correct / (correct + wrong + unanswered)) * 100}
                variant="success"
                key={1}
              />
              <ProgressBar
                now={(wrong / (correct + wrong + unanswered)) * 100}
                variant="danger"
                key={2}
              />
              <ProgressBar
                now={(unanswered / (correct + wrong + unanswered)) * 100}
                variant="secondary"
                key={3}
              />
            </ProgressBar>
          </Col>
          <Col md={6} className="d-flex align-items-center justify-content-center">
            {/* <div className="text-center">
              <h6 className="fw-bold">Score Distribution</h6>
              <p>Pie chart placeholder</p>
            </div> */}
          </Col>
        </Row>
      </Card>

      {results.map((q, index) => {
        const isCorrect = q.Clicked_Answer === q.Correct_Answer
        const isUnanswered = q.Clicked_Answer == null

        return (
          <Card key={index} className="mb-3 shadow-sm">
            <Card.Body>
              <h6 className="fw-bold">Question {q.Question_no}</h6>
              <p>{q.Question}</p>

              {q.options.map((opt) => {
                const selected = q.Clicked_Answer === opt.id
                const correctAnswer = q.Correct_Answer === opt.id

                return (
                  <div
                    key={opt.id}
                    className={`p-2 rounded mb-2 border ${
                      correctAnswer
                        ? "bg-success bg-opacity-25"
                        : selected && !correctAnswer
                        ? "bg-danger bg-opacity-25"
                        : "bg-light"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={selected}
                      readOnly
                      className="me-2"
                    />
                    {opt.option}
                  </div>
                )
              })}

              <div className="mt-2">
                <strong>Explanation:</strong>{" "}
                <span>{q.Explanation}</span>
              </div>
            </Card.Body>
          </Card>
        )
      })}
    </div>
  );
}

export default McqTestStatus
