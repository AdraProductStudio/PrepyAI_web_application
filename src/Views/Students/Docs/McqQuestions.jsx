import Checkbox from 'Components/Input/Checkbox';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import JsonData from '../Utils/JsonData';
import ButtonComponent from 'Components/Button/Button';
import { updateModalShow } from 'Views/Common/Slices/Common_slice';
import { useDispatch } from 'Components/CustomHooks';

const McqQuestions = () => {
  const { jsonOnly } = JsonData()
  const [questions, setQuestions] = useState([])
  const [submited, setSubmitted] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (jsonOnly?.questions) {
      setQuestions(jsonOnly.questions);
    }
  }, []);

  const handleOptionSelect = (questionId, optId) => {
     if (submited) return;
    setQuestions(prev =>
      prev.map(q =>
        q.id === questionId
          ? { ...q, candidate_answer: optId }
          : q
      )
    )
  }

  const handleTestSubmit = ()=>{
    setSubmitted(true)
  }


  return (
    <Container fluid>
      <Row className='mb-4'>
        <Col className='d-flex align-items-center'>
          <p className="mb-0 chapter-title">Chapter 1. An Introduction to the Human Body</p>
        </Col>
        <Col className='d-flex justify-content-end me-5'>
          {submited ? <ButtonComponent type="button" buttonName="Re-Generate" className="brand_color text-white px-5" clickFunction={() => dispatch(updateModalShow({ show: true, close_btn: true, size: "md", modal_from: "Generate_Question", modal_type: "select_question_type" }))} /> :
            <ButtonComponent type="button" buttonName="Submit" className="brand_color text-white px-5" clickFunction={handleTestSubmit} />
          }
          </Col>
      </Row>
      <hr className='text-secondary' />
      {
        submited && <Row className='me-5'>
          <Col className='d-flex justify-content-end gap-5'>
            <p>Correct Answers: 10</p>
            <p>Wrong Answers: 8</p>
            <p>Unanswered: 2</p>
          </Col>
        </Row>
      }
     
      <Row className="w-100">
        <Card className='border-0'>
          <Card.Body>
            {questions.map((question, qidx) => (
              <div key={question.id} className="mb-5">
                <div className="fw-bold mb-1">Question {qidx + 1}</div>
                <div className="mb-3">{question.question}</div>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                  {question.options.map((opt, idx) => (
                    <div
                      key={opt.id}
                      className={`border px-3 py-2 mb-2 rounded-2 cursor-pointer col-11 
                      ${question.candidate_answer === opt.id ? "selected_question_active" : ""}`}
                      onClick={() => handleOptionSelect(question.id, opt.id)}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Checkbox
                        formType="radio"
                        formLabel={opt.option}
                        name={`option-${qidx}`}
                        formClassName="ps-4 test_radio_btn"
                        formId={`${opt.id}-${idx}`}
                        formName="options"
                        change={() => handleOptionSelect(question.id, opt.id)}
                        formChecked={question.candidate_answer === opt.id}
                      />
                    </div>
                  ))}
                   { submited && question.explanation && (
                      <div className="border px-3 py-2 mt-2 rounded-2 col-11">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    )}
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>
      </Row>

    </Container>

  );
};

export default McqQuestions;
