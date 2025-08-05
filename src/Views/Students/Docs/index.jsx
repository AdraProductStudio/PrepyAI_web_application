import React from "react"
import { Row, Col, Card } from "react-bootstrap";
import StudentUpload from 'Views/Students/Docs/StudentUpload';
import PerformanceHistoryCard from 'Components/Card/PerformanceHistoryCard';
import TimeTableCard from 'Components/Card/TimeTableCard';
import ActivityCard from 'Components/Card/ActivtyCard';

const StudentDashboard = () => {
    return (
        <Row className="g-3">
            <Col xs={12} md={5} className="p-2">
                <StudentUpload />
            </Col>

            <Col xs={12} md={7} >
                <Row>
                    <Col xs={12} sm={6} className="p-2">
                        <PerformanceHistoryCard />
                    </Col>
                    <Col xs={12} sm={6} className="p-2">
                        <Card className='border-0 rounded-4 shadow-sm h-100'>
                            <Card.Header className="border-bottom bg-transparent py-3">
                                <Card.Title className='fs-16 mb-0'> Activities </Card.Title>
                            </Card.Header>
                            <Card.Body className="activity_card_body">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <ActivityCard key={index} />
                                ))}
                            </Card.Body>
                            <Card.Footer className="border-0 bg-transparent">
                                <div class="mb-3">
                                    <label for="upload_test_paper" class="form-label">Offline Test</label>
                                    <input class="form-control" type="file" id="upload_test_paper" />
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col xs={12} className='p-2'>
                        <TimeTableCard />
                    </Col>
                </Row>
            </Col >
        </Row>
    )
}

export default StudentDashboard


