import React, { useEffect } from "react"
import { Row, Col, Card } from "react-bootstrap";
import StudentUpload from 'Views/Students/Docs/StudentUpload';
import PerformanceHistoryCard from 'Components/Card/PerformanceHistoryCard';
import TimeTableCard from 'Components/Card/TimeTableCard';
import ActivityCard from 'Components/Card/ActivtyCard';
import { useCommonState, useDispatch } from "Components/CustomHooks"
import { handleGetAllTestHistory, handleGetAllTests, handleGetOfflineTests, handleGetOverallPerformance } from "../Actions/StudentAction"
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { OverallModel } from "../Utils/OverallModal";
import { updateTestId } from "../Slices/StudentSlice";
import '../../../Stylesheet/Css/Student.css'
import ButtonComponent from "Components/Button/Button";
import Icons from "Utils/Icons";
import Img from "Components/Img/Img";
import Image from "Utils/Image";
import SpinnerComponent from "Components/Spinner/Spinner";

const StudentDashboard = () => {
    const dispatch = useDispatch();
    const { studentState } = useCommonState()

    useEffect(() => {
        dispatch(handleGetAllTests())
        dispatch(handleGetOverallPerformance())
        dispatch(handleGetAllTestHistory())
        dispatch(handleGetOfflineTests())
    }, [])
    return (
        <Row className="g-3">
            <Col xs={12} md={5} className="p-2">
                <StudentUpload />
            </Col>

            <Col xs={12} md={7} >
                <Row>
                    <Col xs={12} sm={6} className="p-2">
                        <PerformanceHistoryCard history_data={studentState?.all_test_history} />
                    </Col>
                    <Col xs={12} sm={6} className="p-2">
                        <Card className='border-0 rounded-4 shadow-sm h-100'>
                            <Card.Header className="border-bottom bg-transparent py-3">
                                <Card.Title className='fs-16 mb-0'> Activities </Card.Title>
                            </Card.Header>
                            <Card.Body className="activity_card_body">
                                { studentState?.all_tests_loading ? 
                                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                                        <SpinnerComponent /> <p className="m-0">loading...</p>
                                    </div> 
                                    :
                                    studentState?.all_tests.length > 0 ?
                                    (
                                        studentState?.all_tests?.map((test, idx) => (
                                            <ActivityCard key={idx} data={test}
                                                startFunction={() => {
                                                    dispatch(updateModalShow({ show: true, close_btn: false, modal_from: "dashboard", modal_type: "start_test" }))
                                                    dispatch(updateTestId({id: test.test_id}))
                                                }}

                                            />
                                        ))
                                    ) : (
                                        <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{ minHeight: '200px' }}>
                                            <span><Img src={Image.no_data_found} width={100} /></span>
                                            <p>No activities</p>
                                        </div>
                                    )
                                }
                            </Card.Body>
                            <Card.Footer className="border-0 bg-transparent p-3">
                                {/* <div class="mb-3">
                                    <label for="upload_test_paper" class="form-label">Offline Test</label>
                                    <input class="form-control" type="file" id="upload_test_paper" />
                                </div> */}
                                <ButtonComponent className="Uploadbtn w-100" clickFunction={() => dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "dashboard", modal_type: "upload_test_paper" }))} >
                                    <span className="d-flex justify-content-center align-items-center">{Icons.studentUpload} <span className="ms-3">Upload Test Paper</span></span>
                                </ButtonComponent>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col xs={12} className='p-2'>
                        <TimeTableCard />
                    </Col>
                </Row>
            </Col >
            <OverallModel/>
        </Row>
    )
}

export default StudentDashboard


