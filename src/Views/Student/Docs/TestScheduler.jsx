import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Card, Button, Container, Row, Col, Badge } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';

import { useDispatch } from 'Components/CustomHooks';
import ButtonComponent from 'Components/Button/Button';
import { updateModalShow } from 'Views/Common/Slices/Common_slice';



const TestScheduler = () => {
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();

    const activities = [
        {
            title: 'Class 12 th Maths Test',
            type: 'Online - (Multiple Questions)',
            date: 'May 12, 2025',
            time: '11:30am',
        },
        {
            title: 'Class 12 th Maths Test',
            type: 'Online - (Multiple Questions)',
            date: 'May 12, 2025',
            time: '11:30am',
        },
        {
            title: 'Class 12 th Maths Test',
            type: 'Online - (Long Answer Questions)',
            date: 'May 12, 2025',
            time: '11:30am',
        },
        {
            title: 'Class 12 th Maths Test',
            type: 'Online - (Multiple Questions)',
            date: 'May 12, 2025',
            time: '11:30am',
        },
    ];

    return (
        <>
           
            <Card className="p-2 d-flex flex-column border-0 w-100"style={{ maxHeight: "100vh" }} >
                {/* Section Heading */}
                <h5 className="mb-2 text-muted border-bottom text-center">Activities</h5>
                {/* Activities List (Scrollable) */}
                <div
                    className="flex-grow-1 overflow-auto"
                    style={{ minHeight: "100px", maxHeight: "35vh" }}
                >
                    {activities.map((activity, index) => (
                        <Card
                            key={index}
                            className="mb-2 shadow-sm border-0"
                            style={{
                                borderRadius: "12px",
                                backgroundColor: "#fdfdfd",
                            }}
                        >
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <div className="me-2">
                                    <div className="fw-semibold" style={{ fontSize: "1rem" }}>
                                        {activity.title}
                                    </div>
                                    <div className="text-muted small">{activity.type}</div>
                                    <div className="text-muted small">
                                        {activity.date}, {activity.time}
                                    </div>
                                </div>
                                <Button
                                    variant="outline-pink"
                                    className="btn-sm text-white"
                                    style={{
                                        backgroundColor: "#ff2e9a",
                                        borderRadius: "20px",
                                        padding: "0.25rem 0.75rem",
                                        fontSize: "0.8rem",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    Start Test
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>

                {/* Offline Test Upload Section */}
                <div className="mt-3">
                    <ButtonComponent
                        variant="light"
                        className="w-100 py-2 border border-dashed text-pink"
                        clickFunction={() =>
                            dispatch(
                                updateModalShow({
                                    show: true,
                                    size: "md",
                                    modal_from: "student_dashboard",
                                    modal_type: "upload_test",
                                    modal_close_btn: true,
                                })
                            )
                        }
                        style={{
                            borderColor: "#ff2e9a",
                            color: "#ff2e9a",
                        }}
                        buttonName={
                            <span>
                                <FaUpload className="me-2" />
                                Upload Test Paper
                            </span>
                        }
                    />
                </div>
            </Card>

        </>
    );
};

export default TestScheduler;
