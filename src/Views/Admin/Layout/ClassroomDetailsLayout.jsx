import ClassroomOverviewChart from "Components/Charts/ClassroomOverviewChart";
import TestPerformanceChart from "Components/Charts/TestPerformanceChart";
import LinkComponent from "Components/Router_components/LinkComponent";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useParams } from "react-router-dom";
import Icons from "Utils/Icons";
import { handleUpdateClassroomId } from "../Slices/adminSlice";
import { handleClassroomChart, handleClassroomOverview } from "../Actions/Admin_action";
import { useCommonState } from "Components/CustomHooks";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import JsonData from "../Utils/JsonData";

const ClassroomDetailsLayout = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { adminState } = useCommonState()
    const { jsxJson } = JsonData()

    useEffect(() => {
        let year = new Date().getFullYear()
        dispatch(handleUpdateClassroomId({id}))
        dispatch(handleClassroomOverview({id}))
        dispatch(handleClassroomChart({classroom_id: id, year : `${year}`}))
    }, [id, dispatch])

    return (
        <div className="h-100">
            <div className="container-fluid">
                <div className="w-100 border-bottom pb-3">
                    <LinkComponent to="/admin_dashboard/classrooms" className="brand-link-color">
                        <span>{Icons.back_button_icon_blue}</span>
                        <span className="align-middle">{adminState?.classroom_overview.classroom_name}</span>
                    </LinkComponent>
                </div>
                <div className="w-100 row py-3">
                    <div className="col-12 col-xl-4">
                        <Card className="shadow-sm border-0 rounded-4 h-100">
                            <Card.Header className="py-3 border-0 bg-transparent">
                                Classroom Overview
                            </Card.Header>
                            <Card.Body>
                                <ClassroomOverviewChart />
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-12 col-xl-8 p-1">
                        <Card className="h-100 border-0 rounded-4 shadow-sm test_conducted_chart_height">
                            <Card.Header className="bg-transparent border-0 pt-3 d-flex align-items-center align-items-md-start justify-content-between">
                                <h6 className="mb-">Test Conducted</h6>
                                {Inputfunctions(jsxJson?.classroom_chart_months)}
                            </Card.Header>
                            <Card.Body onMouseDown={(e) => e.preventDefault()}>
                                <TestPerformanceChart data={adminState?.classroom_chart_data} loading={adminState?.overall_loading} />
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-12 p-1" style={{height: "30rem"}}>
                        <Card className="h-100 border-0 rounded-4 shadow-sm">
                            <Card.Header className="bg-transparent border-0 pt-3">
                                <NavLink to={`/admin_dashboard/classrooms/${id}/teachers`} className="admin_classroom_overview_navlink" 
                                >Teachers</NavLink>
                                <NavLink to={`/admin_dashboard/classrooms/${id}/students`} className="admin_classroom_overview_navlink" 
                                >Students</NavLink>
                            </Card.Header>
                            <Card.Body className="admin_classroom_overview_table_height mt-3">
                                <Outlet />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassroomDetailsLayout;