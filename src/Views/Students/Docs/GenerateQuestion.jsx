import ButtonComponent from 'Components/Button/Button'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Dropdown, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { updateModalShow } from 'Views/Common/Slices/Common_slice'
import { getBookmarks } from '../Actions/StudentAction'
import { useCommonState } from 'Components/CustomHooks'
import { updateGenerateQuestionFields } from '../Slices/StudentSlice'
import { Router, useParams } from 'react-router-dom'
import ReactDropdownSelect from 'Components/Input/ReactDropdownSelect'
import Spinner from 'Components/Spinner/CustomSpinner'

const GenerateQuestion = () => {
    const dispatch = useDispatch()
    const {generate_question} = useCommonState()?.studentState
      const { id } = useParams()


    useEffect(()=>{
        if(!id) return
        if(!generate_question?.bookmarks?.bookmarks || generate_question?.bookmarks?.bookmarks.length === 0){
        dispatch(getBookmarks(id))
        dispatch(updateGenerateQuestionFields({book_id:id}))
        }
    },[])

    useEffect(() => {
        if (generate_question?.bookmarks?.[0]?.title) {
            const chapter_name = generate_question.bookmarks[0].title;
            dispatch(updateGenerateQuestionFields({chapter_name:chapter_name}));
        }
    }, [])


    const options = [
        { value: "english", label: "English" },
        { value: "hindi", label: "Hindi" },
        { value: "tamil", label: "Tamil" }
    ]

    const levelOptions = [
        { value: "easy", label: "Easy" },
        { value: "medium", label: "Medium" },
        { value: "hard", label: "Hard" }

    ]

    return (
        <Container fluid>
            <Row className='my-3'>
                <Col className='d-flex align-items-start align-items-lg-end' xs={12} md={6}>
                    <p className="mb-0 chapter-title text-center">{generate_question?.chapter_name ||generate_question?.bookmarks?.bookmarks?.[0]?.title}</p>
                </Col>
                <Col className="d-flex flex-wrap justify-content-center justify-content-lg-end gap-4" xs={12} md={6}>
                    <div className="">
                        <ReactDropdownSelect
                            isMandatory={true}
                            multi={false}
                            options={levelOptions}
                            value={
                                generate_question?.level_of_test
                                    ? levelOptions.filter(opt => opt.value === generate_question.level_of_test)
                                    : []
                            }
                            change={(values) =>
                                dispatch(updateGenerateQuestionFields({level_of_test: values[0]?.value}))
                            }
                            labelField="label"
                            valueField="value"
                            className="custom-dropdown"
                            placeholder="Select Type"
                        />

                    </div>
                    <div className="">
                        <ReactDropdownSelect
                            isMandatory={true}
                            multi={false}
                            options={options}
                            value={
                                generate_question?.test_language
                                    ? options.filter(opt => opt.value === generate_question.test_language)
                                    : []
                            }
                            change={(values) =>
                                dispatch(updateGenerateQuestionFields({test_language: values[0]?.value}))
                            }
                            labelField="label"
                            valueField="value"
                            className="custom-dropdown"
                            placeholder="Select Language"
                        />

                    </div>

                    <ButtonComponent type="button" buttonName="Generate Questions" className="brand_color text-white" clickFunction={()=>dispatch(updateModalShow({show:true,close_btn:true,size:"md",modal_from:"Generate_Question",modal_type:"select_question_type"}))} />
                </Col>
            </Row>
            <hr className='w-100 text-secondary' />
            <Row className="mt-3">
                {generate_question?.loading ? <div className='d-flex justify-content-center align-items-center'  style={{ minHeight: "75vh", width: "100%" }}>
                        <Spinner  /> 
                        </div> :
                        <Card className="border-0 shadow-0 overflow-auto">
                            <Card.Body className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
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
                                        <ButtonComponent type="button" buttonName="Generate Questions" className="brand_color text-white mt-5" clickFunction={() => dispatch(updateModalShow({ show: true, close_btn: true, size: "md", modal_from: "Generate_Question", modal_type: "select_question_type" }))} />
                                    </div>
                                </Col>
                            </Card.Body>
                        </Card>
                }
            </Row>

        </Container>
    )
}

export default GenerateQuestion
