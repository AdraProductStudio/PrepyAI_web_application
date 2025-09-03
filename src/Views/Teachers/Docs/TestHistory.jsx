import ReactPaginateComp from 'Components/Pagination/ReactPaginateComp';
import LinkComponent from 'Components/Router_components/LinkComponent';
import React, { useEffect } from 'react'
import { Table, Card } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import Icons from 'Utils/Icons';
import JsonData from '../Utils/JsonData';
import { useParams, useSearchParams } from 'react-router-dom';
import { decryptData } from 'Security/Crypto/Crypto';
import { getTestHistory } from '../Actions/teacherAction';
import { useCommonState, useDispatch } from 'Components/CustomHooks';
import Spinner from 'Components/Spinner/CustomSpinner';

const TestHistory = () => {
    const { class_id, subject_id } = useParams();
    const [searchParams] = useSearchParams();
    const { jsonOnly } = JsonData();
    const dispatch = useDispatch();
    const { teachersState } = useCommonState();

    useEffect(() => {
        if (searchParams.get("data")) {
            let decrypt_test_data = decryptData(searchParams.get("data"))
            dispatch(getTestHistory(decrypt_test_data))
        }
    }, [])

    return (
        <div className='h-100'>
            <div className='container-fluid h-100'>
                <div className="w-100 row justify-content-between align-items-center border-bottom pb-3 mt-3">
                    <div className="col">
                        <LinkComponent to={`/teachers_dashboard/classrooms/${class_id}/${subject_id}/test/ongoing_test`} className="brand-link-color">
                            <span>{Icons.back_button_icon_blue}</span>
                            <span className="align-middle">Back</span>
                        </LinkComponent>
                    </div>
                </div>
                {teachersState?.test_history?.glow ?
                    <div className="h-100 row align-items-center justify-content-center">
                        <div className="col-10 col-lg-6 text-center">
                            <Spinner />
                            <p>Getting Test Results...</p>
                        </div>
                    </div>
                    :
                    teachersState?.test_history?.data?.length ?
                        <Card className="shadow-sm border-0 rounded-4 p-3 mt-4" style={{ height: '85%' }} >
                            {/* Header */}
                            <h5 className="fw-semibold mb-1">Students Score</h5>
                            <p className="text-muted small">{teachersState?.test_history?.data?.length} Students</p>

                            {/* Table */}
                            <div className="table-responsive">
                                <Table bordered hover className="align-middle text-center">
                                    <thead>
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
                                        {teachersState?.test_history?.data?.map((student, index) => (
                                            <tr key={index}>
                                                <td>{String(index + 1).padStart(2, "0")}</td>
                                                <td>{student?.register_no || ""}</td>
                                                <td>{student?.student_name || ""}</td>
                                                <td>{student?.contact_no || ""}</td>
                                                <td>{student?.email || ""}</td>
                                                <td>{student?.overall || ""}</td>
                                                <td>{student?.score || ""}</td>
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
                        :
                        <div className="h-100 row align-items-center justify-content-center">
                            <div className="col-10 col-lg-6 text-center">
                                <p>No Data Found...</p>
                            </div>
                        </div>
                }
                {/* <div className="mt-3">
                    <ReactPaginateComp />
                </div> */}
            </div>

        </div>
    )
}

export default TestHistory






