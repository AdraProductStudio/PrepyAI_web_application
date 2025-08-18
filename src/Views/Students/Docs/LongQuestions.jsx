import ButtonComponent from 'Components/Button/Button';
import React, { useState } from 'react';
import { Card, Col, Container, Row, Form } from 'react-bootstrap';
import JsonData from '../Utils/JsonData';
import { updateModalShow } from 'Views/Common/Slices/Common_slice';
import { useDispatch } from 'Components/CustomHooks';

const LongQuestions = () => {
  const [submited, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState({})

  const { jsonOnly } = JsonData();
  const dispatch = useDispatch()

  const handleTestSubmit = () => {
    setSubmitted(true);
  };

  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <Container fluid>

      <Row className="mb-4">
        <Col className="d-flex align-items-center">
          <p className="mb-0" style={{ color: '#182988' }}>
            Chapter 1. An Introduction to the Human Body
          </p>
        </Col>
        <Col className="d-flex justify-content-end me-5">
          <ButtonComponent
            type="button"
            buttonName={submited? "Re-Generate" :"Submit"}
            className="brand_color text-white px-5"
            clickFunction={handleTestSubmit}
          />
        </Col>
      </Row>

      <hr className="text-secondary" />
      {submited && <Row className='me-5'>
        <Col className='d-flex justify-content-end gap-5'>
          <p>Score: 80%</p>
          <p className='long-question-test' onClick={()=>dispatch(updateModalShow({show:true,close_btn:true,size:"lg",modal_from:"Generate_Question",modal_type:'test_result'}))}>Status <span className='fw-bold'>Emergent</span></p>
        </Col>
      </Row>
      }
  
      <Row className="w-100">
        <Card className="border-0">
          {jsonOnly?.longQuestions?.map((question, index) => (
            <Card.Body key={question.id} className="mb-4">
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <div className="fw-bold mb-1">Question {index + 1}</div>
                  <div className="mb-3">{question?.question}</div>
                </div>
                <ButtonComponent
                  type="button"
                  buttonName="Record Your Audio"
                  className="brand_color text-white px-5"
                  clickFunction={()=>dispatch(updateModalShow({show:true,close_btn:true,size:"md",modal_from:"Generate_Question",modal_type:"record_audio"}))} 
                />
              </div>

              <Form.Control
                as="textarea"
                rows={3}
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                disabled={submited}
                className="p-3 text-secondary"
                style={{
                  borderRadius: '8px',
                  border: "1px solid #ddd",
                  backgroundColor: '#fff',
                  resize: 'none',
                }}
              />
              {submited && question.explanation && (
                <div
                  className="mt-2 p-4 rounded"
                  style={{
                    backgroundColor: '#DDF3CF',
                    border: '1px solid #ddd',
                    fontSize: '0.9rem',
                  }}
                >
                  <strong>Explanation:</strong> <p>{question.explanation}</p>
                </div>
              )}
            </Card.Body>
          ))}
        </Card>
      </Row>
    </Container>
  );
};

export default LongQuestions;
