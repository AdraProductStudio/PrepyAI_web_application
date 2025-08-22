import Checkbox from 'Components/Input/Checkbox';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import ButtonComponent from 'Components/Button/Button';
import { updateModalShow } from 'Views/Common/Slices/Common_slice';
import { useCommonState, useDispatch } from 'Components/CustomHooks';
import { updateGenerateMcqQuestions, updateGenerateQuestionFields } from '../Slices/StudentSlice';
import { getBookmarks, submitTest } from '../Actions/StudentAction';
import Spinner from 'Components/Spinner/CustomSpinner';
import { useParams } from 'react-router-dom';

const McqQuestions = () => {
  const dispatch = useDispatch()
  const { generate_question } = useCommonState()?.studentState
  const { id } = useParams()

  useEffect(() => {
    if (!id) return
    dispatch(getBookmarks(id))
    dispatch(updateGenerateQuestionFields({ book_id: id }))
  }, [])


  const handleTestSubmit = () => {
    let answers = generate_question.mcq_questions?.test_questions?.map((q) => {
      return {
        Question_no: q.Question_no,
        clicked_answer: q.candidate_answer || 0
      }
    })
    const payload = {
      test_id: generate_question?.mcq_questions?.test_id,
      type_of_question: "mcq",
      responses: answers

    }
    dispatch(submitTest(payload))
  }

  const handleOptionSelect = (queId, optId) => {
    const updatedQuestions = generate_question?.mcq_questions?.test_questions?.map((q) =>
      q.Question_no === queId ? { ...q, candidate_answer: optId } : q
    )

    dispatch(updateGenerateMcqQuestions({
      ...generate_question.mcq_questions,
      test_questions: updatedQuestions
    }))
  }



  return (
    <Container fluid>
      <Row className='mb-4'>
        <Col className='d-flex align-items-center'>
          <p className="mb-0 chapter-title">Chapter 1. An Introduction to the Human Body</p>
        </Col>
        <Col className='d-flex justify-content-end me-5'>
          {generate_question?.test_status === "submitted" ? <ButtonComponent type="button" buttonName="Re-Generate" className="brand_color text-white px-5" clickFunction={() => {
            dispatch(updateModalShow({ show: true, close_btn: true, size: "md", modal_from: "Generate_Question", modal_type: "select_question_type" }))
            dispatch(updateGenerateQuestionFields({ mcq_questions: [],summary:{},test_status:"" }))
          }} /> :
            generate_question?.test_status === "generated" ?
              <ButtonComponent type="button" buttonName="Submit" className="brand_color text-white px-5" clickFunction={handleTestSubmit} /> : null
          }
        </Col>
      </Row>
      <hr className='text-secondary' />
      {
        generate_question?.test_status === "submitted" && <Row className='me-5'>
          <Col className='d-flex justify-content-end gap-5'>
            <p>Correct Answers: <span className='fw-bold text-dark'>{generate_question?.summary?.correct}</span></p>
            <p>Wrong Answers: <span className='fw-bold text-dark'>{generate_question?.summary?.wrong}</span></p>
            <p>Unanswered: <span className='fw-bold text-dark'>{generate_question?.summary?.unanswered}</span></p>
          </Col>
        </Row>
      }

      <Row className="w-100">
        {generate_question?.loading ? <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "75vh", width: "100%" }}>
          <Spinner size={100} />
        </div> :
          <Card className='border-0'>
            <Card.Body>
              {generate_question?.mcq_questions?.test_questions?.map((question, qidx) => (
                <div key={question.Question_no} className="mb-5">
                  <div className="fw-bold mb-1">Question {qidx + 1}</div>
                  <div className="mb-3">{question.Question}</div>
                  <div className='d-flex flex-column justify-content-center align-items-center'>
                    {question.options.map((opt, idx) => (
                      <div
                        key={opt.id}
                        className={`border px-3 py-2 mb-2 rounded-2 cursor-pointer col-11 
                        ${generate_question?.test_status !== "submitted" && question.candidate_answer === opt.id ? "selected_question_active" : ""}
                        ${generate_question?.test_status === "submitted" && opt.id === question.correct_answer ? "correct_answer_active" : ""}
                        ${generate_question?.test_status === "submitted" && opt.id === question.candidate_answer && question.candidate_answer !== question.correct_answer ? "wrong_answer_active" : ""}
                        `}
                        onClick={() => {
                          if (generate_question?.test_status === "generated") {
                            handleOptionSelect(question.Question_no, opt.id);
                          }
                        }}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Checkbox
                          formType="radio"
                          formLabel={opt.option}
                          name={`option-${qidx}`}
                          formClassName="ps-4 test_radio_btn"
                          formId={`${opt.id}-${idx}`}
                          change={() => handleOptionSelect(question.Question_no, opt.id)}
                          formChecked={question.candidate_answer === opt.id}
                        />
                      </div>

                    ))}
                    {generate_question?.test_status === "submitted" && question.Explanation && (
                      <div className="border px-3 py-2 mt-2 rounded-2 col-11">
                        <strong>Explanation:</strong> {question.Explanation}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        }
      </Row>

    </Container>

  );
};

export default McqQuestions;
