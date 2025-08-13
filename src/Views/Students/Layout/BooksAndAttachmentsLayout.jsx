import Icons from "Utils/Icons";
import { Card } from "react-bootstrap";
import JsonData from "Views/Students/Utils/JsonData";
import { Outlet, useParams } from "react-router-dom";
import ActivityCard from "Components/Card/ActivtyCard";
import { SearchComponent } from "ResuableFunctions/SearchFun";
import NavLinkComp from "Components/Router_components/NavLink";
import LinkComponent from "Components/Router_components/LinkComponent";
import TestPerformanceChartStudent from "Components/Charts/TestPerformanceChart_student";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import { useEffect } from "react";
import { handleGetSubjectAttachments, handleGetSubjectBooks, handleGetUpcomingTests } from "../Actions/StudentAction";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { updateTestId } from "../Slices/StudentSlice";
import { OverallModel } from "../Utils/OverallModal";


const BooksAndAttachmentsLayout = () => {
    const { subject_id } = useParams();
    const { jsonOnly } = JsonData({ subject_id });
    const dispatch = useDispatch()
    const {studentState} = useCommonState()

    useEffect(() => {
        dispatch(handleGetSubjectBooks(subject_id))
        dispatch(handleGetSubjectAttachments(subject_id))
        dispatch(handleGetUpcomingTests(subject_id))
    }, [])

    return (
        <div className="container-fluid">
            <div className="w-100 border-bottom pb-3">
                <LinkComponent to='/student_dashboard/subjects' className="brand-link-color">
                    <span>{Icons.back_button_icon_blue}</span>
                    <span className="align-middle">Subjects</span>
                </LinkComponent>
            </div>

            <div className="w-100 small_header_content_main d-flex overflowY">
                <div className="col-8 p-1">
                    <Card className="border-0 rounded-3 shadow-sm px-3 h-100">
                        <Card.Header className="bg-transparent border-0 border-bottom d-flex flex-wrap align-items-center">
                            <div className="col-9 d-flex flex-wrap">
                                {jsonOnly.book_attachment_navlink?.map((link, link_index) => (
                                    <div className="col-2" key={link_index}>
                                        <NavLinkComp to={link.route} className="text-decoration-none book_attachment_navlink" end={true}>
                                            <span className="text-secondary">{link.name}</span>
                                        </NavLinkComp>
                                    </div>
                                ))}
                            </div>
                            <div className="col-3 text-end">
                                <SearchComponent />
                            </div>
                        </Card.Header>
                        <Card.Body style={{ height: "calc(100% - 3rem)" }} className="overflowY">
                            <Outlet />
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-4">
                    <div className="col p-2">
                        <Card className="rounded-4 shadow-sm border-0">
                            <Card.Header className="bg-transparent border-0 py-2">
                                <h5>Performance</h5>
                            </Card.Header>
                            <Card.Body>
                                <TestPerformanceChartStudent />
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col p-2">
                        <Card className="rounded-4 shadow-sm border-0">
                            <Card.Header className="bg-transparent border-0 py-2">
                                <h5>Upcoming Tests</h5>
                            </Card.Header>
                            <Card.Body className="upcoming_test_history_body">
                                {
                                    studentState?.upcoming_tests.length > 0 ? (
                                        studentState?.upcoming_tests.map((test, idx)=> (
                                            <ActivityCard key={idx} data={test} 
                                                startFunction={() => {
                                                    dispatch(updateModalShow({ show: true, close_btn: false, modal_from: "dashboard", modal_type: "start_test" }))
                                                    dispatch(updateTestId({ id: test.test_id }))
                                                }}
                                             />
                                        ))
                                    ):(
                                        <p className="text-center">No upcoming tests</p>
                                    )
                                }
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            <OverallModel />
        </div>
    )
}

export default BooksAndAttachmentsLayout;