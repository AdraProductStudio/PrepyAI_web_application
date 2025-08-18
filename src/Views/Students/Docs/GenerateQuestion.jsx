import ButtonComponent from 'Components/Button/Button'
import React, { useState } from 'react'
import { Col, Container, Row, Dropdown, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { updateModalShow } from 'Views/Common/Slices/Common_slice'

const GenerateQuestion = () => {
    const [difficulty, setDifficulty] = useState("Easy")
    const [language, setLanguage] = useState("English")
    const dispatch = useDispatch()
    return (
        <Container fluid>
            <Row className='my-3'>
                <Col className='d-flex align-items-end'>
                    <p className="mb-0 chapter-title">Chapter 1. An Introduction to the Human Body</p>
                </Col>
                <Col className="d-flex justify-content-end  gap-4 ">
                    <Dropdown>
                        <Dropdown.Toggle className="custom-dropdown dropdown-toggle-end" id="dropdown-basic-1">
                            {difficulty}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setDifficulty("Easy")}>Easy</Dropdown.Item>
                            <Dropdown.Item onClick={() => setDifficulty("Medium")} >Medium</Dropdown.Item>
                            <Dropdown.Item onClick={() => setDifficulty("Hard")}>Hard</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle className="custom-dropdown dropdown-toggle-end " id="dropdown-basic-2">
                            {language}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setLanguage("English")}>English</Dropdown.Item>
                            <Dropdown.Item onClick={() => setLanguage("Hindi")}>Hindi</Dropdown.Item>
                            <Dropdown.Item onClick={() => setLanguage("Tamil")}>Tamil</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <ButtonComponent type="button" buttonName="Generate Questions" className="brand_color text-white" clickFunction={()=>dispatch(updateModalShow({show:true,close_btn:true,size:"md",modal_from:"Generate_Question",modal_type:"select_question_type"}))} />
                </Col>
            </Row>
            <hr className='w-100 text-secondary' />
            <Row className="mt-3">
                <Card className="border-0 shadow-0">
                    <Card.Body className="d-flex justify-content-center align-items-center" style={{ height: "700px" }}>
                        <Col xs={8} className="h-100">
                            <div className="w-100 h-100 d-flex flex-column  justify-content-center align-items-center">
                                <h4 className='mb-0 text-center generate-question-header-text'>PrepyAI is here to help you get ready for your exams or learn things faster by testing your knowledge.</h4>
                                <div className='col-10 mt-4'>
                                    <p className='mb-2 generate-question-sub-text'>1. You can generate questions either from the entire textbook or by choosing specific chapters or topics. To do this, click on the book title, chapter, or topic you're interested in from the sidebar to generate questions.</p>
                                    <p className='mb-2 generate-question-sub-text'>2. You'll get 20 questions about the topic you choose. After answering them, you'll get a summary of your results.</p>
                                    <p className='mb-2 generate-question-sub-text'>3. You can also redo tests you've done before.</p>
                                    <p className='mb-2 generate-question-sub-text'>4. If you didn't upload a book with bookmarks, the questions will be random from the entire content</p>
                                    <p className='mt-5 mb-0 generate-question-sub-text'>We hope AnatomyAI makes studying for exams easier and boosts your confidence in your learning journey!</p>
                                </div>
                                <ButtonComponent type="button" buttonName="Generate Questions" className="brand_color text-white mt-5" clickFunction={()=>dispatch(updateModalShow({show:true,close_btn:true,size:"md",modal_from:"Generate_Question",modal_type:"select_question_type"}))} />
                            </div>
                        </Col>
                    </Card.Body>
                </Card>
            </Row>

        </Container>
    )
}

export default GenerateQuestion
