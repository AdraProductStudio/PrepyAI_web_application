import ReactPaginateComp from 'Components/Pagination/ReactPaginateComp';
import LinkComponent from 'Components/Router_components/LinkComponent';
import React from 'react'
import { Table, Card } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import Icons from 'Utils/Icons';
import JsonData from '../Utils/JsonData';

const TestHistory = () => {

    const { jsonOnly } = JsonData();

    return (
        <div className='h-100'>
            <div className='container-fluid'>
                <div className="w-100 row justify-content-between align-items-center border-bottom pb-3">
                    <div className="col">
                        <LinkComponent to={`/teachers_dashboard/classrooms/0/0/test/ongoing_test`} className="brand-link-color">
                            <span>{Icons.back_button_icon_blue}</span>
                            <span className="align-middle">Back to Subjects</span>
                        </LinkComponent>
                    </div>
                </div>
                <Card className="shadow-sm border-0 rounded-4 p-3 mt-4" >
                    {/* Header */}
                    <h5 className="fw-semibold mb-1">Students Score</h5>
                    <p className="text-muted small">{jsonOnly?.students_details.length} Students</p>

                    {/* Table */}
                    <div className="table-responsive">
                        <Table bordered hover className="align-middle text-center">
                            <thead className="table-light">
                                <tr>
                                    <th>S.No</th>
                                    <th>Reg.No</th>
                                    <th>Student Name</th>
                                    <th>Contact No</th>
                                    <th>Email</th>
                                    <th>Over all</th>
                                    <th>Score</th>
                                    <th>Status</th>
                                    <th>View Test Paper</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jsonOnly?.students_details.map((student, index) => (
                                    <tr key={index}>
                                        <td>{String(index + 1).padStart(2, "0")}</td>
                                        <td>{student.regNo}</td>
                                        <td>{student.name}</td>
                                        <td>{student.contact}</td>
                                        <td>{student.email}</td>
                                        <td>{student.overall}</td>
                                        <td>{student.score}</td>
                                        <td>{student.status}</td>
                                        <td>
                                            <FaEye style={{ cursor: "pointer", color: "deeppink" }} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card>
                <div className="mt-3">
                    <ReactPaginateComp />
                </div>
            </div>
        </div>
    )
}

export default TestHistory






