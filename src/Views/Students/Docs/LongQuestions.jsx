import ButtonComponent from 'Components/Button/Button';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Form } from 'react-bootstrap';
import { updateModalShow } from 'Views/Common/Slices/Common_slice';
import { useCommonState, useDispatch } from 'Components/CustomHooks';
import { updateGenerateQuestionFields, updateLongQuestionAnswerValue } from '../Slices/StudentSlice';
import { getBookmarks, submitLongQuestionTest } from '../Actions/StudentAction';
import Spinner from 'Components/Spinner/CustomSpinner';
import { useParams } from 'react-router-dom';

const LongQuestions = () => {
  const dispatch = useDispatch()
  const { generate_question } = useCommonState()?.studentState
  const {id} = useParams()



  useEffect(() => {
    if (!id) return
    dispatch(getBookmarks(id))
    dispatch(updateGenerateQuestionFields({book_id: id}))
  }, [])


  const handleTestSubmit = () => {
  let answers = generate_question.long_questions?.test_questions?.map((q)=>{
      return {
        Question_no:q.Question_no,
        Answer:q.Answer
      }
    })

    let payload = {
      test_id:generate_question?.long_questions?.test_id,
      type_of_question:"long_answer",
      responses:answers

    }
    dispatch(updateGenerateQuestionFields({ test_status: "" }))
    dispatch(submitLongQuestionTest(payload))
  }

const handleAnswerChange = (Question_no, value) => {
  dispatch(updateLongQuestionAnswerValue({ Question_no, answer: value }))
}


  return (
    <Container fluid>

      <Row className="mb-4">
        <Col className="d-flex align-items-center">
          <p className="mb-0 chapter-title">
            {generate_question?.chapter_name}
          </p>
        </Col>
        <Col className="d-flex justify-content-end me-5">
          {generate_question?.test_status === "submitted" ? <ButtonComponent type="button" buttonName="Re-Generate" className="brand_color text-white px-5" clickFunction={() => {
            dispatch(updateModalShow({ show: true, close_btn: true, size: "md", modal_from: "Generate_Question", modal_type: "select_question_type" }))
            dispatch(updateGenerateQuestionFields({ long_questions: [],overall_levels:[],test_status:"",performance:"" }))
          }} /> :
            generate_question?.test_status === "generated" ?
              <ButtonComponent type="button" buttonName="Submit" className="brand_color text-white px-5" clickFunction={handleTestSubmit} /> : null
          }
        </Col>
      </Row>

      <hr className="text-secondary" />
      {generate_question?.test_status === "submitted" && <Row className='me-5'>
        <Col className='d-flex justify-content-end gap-5'>
          <p className='long-question-test exemplar-text ' onClick={()=>dispatch(updateModalShow({show:true,close_btn:true,size:"lg",modal_from:"Generate_Question",modal_type:'test_result'}))}>Status: <span className='fw-bold exemplar-text' style={{textDecorationLine:"underline"}}>Emergent</span></p>
        </Col>
      </Row>
      }
  
      <Row className="w-100">
          {generate_question?.loading ? <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "75vh", width: "100%" }}>
            <Spinner />
          </div>  :
        <Card className="border-0">
          {generate_question?.long_questions?.test_questions?.map((question, index) => (
            <Card.Body key={question.Question_no} className="mb-4">
              <div className='d-flex justify-content-between align-items-center'>
                <div className='col'>
                  <div className="fw-bold mb-1">Question {index + 1}</div>
                  <div className="mb-3">{question?.Question}</div>
                </div>
                <div className='col-2 d-flex justify-content-end'>
                <ButtonComponent
                  type="button"
                  buttonName="Record Your Audio"
                  className="brand_color text-white px-5"
                  clickFunction={()=>{
                    dispatch(updateGenerateQuestionFields({ recorded_que_no: question.Question_no }))
                    dispatch(updateModalShow({show:true,close_btn:true,size:"md",modal_from:"Generate_Question",modal_type:"record_audio"}))}} 
                />
                </div>
              </div>

              <Form.Control
                as="textarea"
                rows={3}
                value={question.Answer || ""}
                onChange={(e) => handleAnswerChange(question.Question_no, e.target.value)}
                disabled={generate_question?.test_status === "submitted"}
                className="p-3 text-secondary fs-5"
                style={{
                  borderRadius: '8px',
                  border: "1px solid #ddd",
                  backgroundColor: '#fff',
                  resize: 'none',
                }}
              />

              {generate_question?.test_status === "submitted" && question.Explanation && (
                <div
                  className="mt-2 p-4 rounded"
                  style={{
                    backgroundColor: '#DDF3CF',
                    border: '1px solid #ddd',
                    fontSize: '0.9rem',
                  }}
                >
                  <strong>Explanation:</strong> <p>{question.Explanation}</p>
                </div>
              )}
            </Card.Body>
          ))}
        </Card>}
      </Row>
    </Container>
  );
};

export default LongQuestions;
