import React from 'react';
import UploadYourbook from './UploadYourbook';
import Barchart from './Barchart';
import { Card, Col, Container, Row } from 'react-bootstrap';
import History from './History';
import TestScheduler from './TestScheduler';
import TimeTable from './TimeTable';





const StudentDashboard = () => {

    return (
        <>
            <div className="py-2    ">
                <Row className="gx-3 align-items-stretch">
                    {/* Left Column */}
                    <Col xs={12} lg={6} className="mb-3 d-flex p-1 h-100">
                        <div className=" w-100">
                            <UploadYourbook />
                        </div>
                    </Col>

                    {/* Middle Column */}
                    <Col xs={12} lg={3} className="mb-3 d-flex flex-column p-1">
                        <div>
                            <Barchart />
                        </div>
                        <div className="mt-0">
                            <History />
                        </div>
                    </Col>

                    {/* Right Column */}
                    <Col xs={12} lg={3} className="mb-3 d-flex flex-column p-1 border-none ">
                        <div className="bg-white border-none">
                            <TestScheduler />
                        </div>
                        <div className='mt-3 bg-white border-none '
                            style={{
                                height: '319px',    
                                width: '100%',      
                                overflowY: 'auto', 
                            }}>
                            <TimeTable />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default StudentDashboard;

