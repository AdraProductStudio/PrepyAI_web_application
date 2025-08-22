import React from "react"
import { useCommonState, useDispatch } from "Components/CustomHooks"
import { Card, Row, Col, Badge, ProgressBar } from "react-bootstrap"
import TestResultsChart from "Components/Charts/TestResultsChart"
import Icons from "Utils/Icons"
import LinkComponent from "Components/Router_components/LinkComponent"
import ButtonComponent from "Components/Button/Button"
import { updateModalShow } from "Views/Common/Slices/Common_slice"
import { resetMcq } from "../Slices/StudentSlice"
import { useNavigate } from "react-router-dom"

function McqTestStatus() {
  const { studentState } = useCommonState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const summary = studentState?.mcq_test?.summary || {}
  const results = studentState?.mcq_test?.result || []

  const { correct = 0, wrong = 0, unanswered = 0 } = summary

  const goBack = ()=>{
    dispatch(resetMcq())
    localStorage.removeItem('test_id')
  }

  return (

    <div className="px-5">
      <Card className="mb-4 py-3 px-4 shadow-sm">
        <Row>
          <Col md={6}>
            <LinkComponent to={"/student_dashboard/home"} onLinkClick={goBack} className="brand-link-color">
              <span>{Icons.back_button_icon_blue}</span>
              <span className="align-middle">Back to Dashboard</span>
            </LinkComponent>

            <h5 className="fw-bold my-3">Test Results</h5>

            <ButtonComponent
              type="button"
              className="btn btn-brand-color px-5 py-2 my-3"
              buttonName="Developing"
              clickFunction={() => console.log('developing')}
            />

          </Col>

          <Col md={6} className="d-flex justify-content-end">
            <div className="d-flex flex-column flex-sm-row align-items-center gap-4">

              <div style={{ minWidth: "200px" }}>
                <TestResultsChart correct={correct} wrong={wrong} unanswered={unanswered} />
              </div>

              <div>
                <p className="mb-2 d-flex align-items-center">
                  <span
                    className="me-2 rounded-circle d-inline-block"
                    style={{ width: "12px", height: "12px", backgroundColor: "#28a745" }}
                  ></span>
                  <span className="text-success fw-semibold">Correct Answers</span>: {correct}
                </p>
                <p className="mb-2 d-flex align-items-center">
                  <span
                    className="me-2 rounded-circle d-inline-block"
                    style={{ width: "12px", height: "12px", backgroundColor: "#ed6c79ff" }}
                  ></span>
                  <span className="text-danger fw-semibold">Wrong Answers</span>: {wrong}
                </p>
                <p className="mb-0 d-flex align-items-center">
                  <span
                    className="me-2 rounded-circle d-inline-block"
                    style={{ width: "12px", height: "12px", backgroundColor: "#6c757d" }}
                  ></span>
                  <span className="text-secondary fw-semibold">Unanswered</span>: {unanswered}
                </p>
              </div>
            </div>
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
                    className={`p-3 rounded mb-2 border ${correctAnswer
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

              <div className="mt-3">
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
