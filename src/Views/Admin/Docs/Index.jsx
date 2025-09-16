import ButtonComponent from "Components/Button/Button";
import CountShowingCard from "Components/Card/CountShowingCard";
import TestConductedChart from "Components/Charts/TestConductedChart";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { SearchComponent } from "ResuableFunctions/SearchFun";
import Icons from "Utils/Icons";
import JsonData from "Views/Admin/Utils/JsonData";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { getDashboardChartData, getDashboardTeachersList, handleDashboardOverview } from "../Actions/Admin_action";
import { useEffect } from "react";
import { useCommonState } from "Components/CustomHooks";
import { updateEditDashboardTeacher } from "../Slices/adminSlice";
import SpinnerComponent from "Components/Spinner/Spinner";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { jsonOnly, jsxJson } = JsonData();
    const { adminState, commonState } = useCommonState()
    
    useEffect(() => {
        let currentYear = new Date().getFullYear();
        dispatch(handleDashboardOverview())
        dispatch(getDashboardChartData({year: `${currentYear}`}))
        dispatch(getDashboardTeachersList())
    }, [dispatch])

    return (
        <>
            <section className="row h-100 ">
                <div className="col-5 row">
                    {jsonOnly?.card_data.map((item, index) => (
                        <div className="col-6 p-1" key={index}>
                            <CountShowingCard data={item} />
                        </div>
                    ))}
                </div>
                <div className="col-7 p-1">
                    <Card className="h-100 border-0 rounded-4 shadow-sm test_conducted_chart_height">
                        <Card.Header className="bg-transparent border-bottom pt-3 d-flex align-items-center justify-content-between">
                            <div>
                                <h6 className="mb-2">Test Conducted</h6>
                                <p className="fs-15 text-secondary mb-0">110 Test</p>
                            </div>
                            {Inputfunctions(jsxJson?.dashboard_chart_months)}
                        </Card.Header>
                        <Card.Body>
                            <TestConductedChart data = {adminState?.dashboard_chart_data}/>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-12 p-1 test_conducted_table_height" style={{height: "30rem"}}>
                    <Card className="h-100 border-0 rounded-4 shadow-sm h-100">
                        <Card.Header className="bg-transparent border-bottom pt-3">
                            <div className="row justify-content-between">
                                <div className="col-3">
                                    <h6 className="mb-2">Teachers</h6>
                                    <p className="fs-15 text-secondary mb-0">25 Teachers</p>
                                </div>
                                <div className="col-4 row justify-content-end">
                                    <div className="col px-1">
                                        <SearchComponent className="px-5 py-2" placeholder="Search" onClick={() => dispatch(getDashboardTeachersList(commonState?.search?.value)) } />
                                    </div>
                                    {/* <div className="col px-1">
                                        <ButtonComponent
                                            type="button"
                                            className="btn-transparent w-100 border py-2"
                                            buttonName="Filter"
                                        />
                                    </div> */}
                                    <div className="col px-1">
                                        <ButtonComponent 
                                            type="button" 
                                            className="w-100 btn-brand-color border py-2" 
                                            clickFunction={() => dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "admin", modal_type: "dashboard" }))}
                                        >
                                            {Icons.add_icon}
                                            <span className="lign-middle">Create Staff</span>
                                        </ButtonComponent>
                                    </div>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body className="overflowY h-100" >
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            {jsonOnly?.staff_table_headers?.map((header, index) => (
                                                <th key={index} className="text-center staff_table_heading">{header}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="staff_table_data">
                                        {   
                                            adminState?.placeholder ? 
                                            <tr>
                                                <td colSpan={8}> <SpinnerComponent/> </td>
                                            </tr>
                                            :
                                            adminState?.dashboard_teachers_list.length > 0 
                                                ?
                                                adminState?.dashboard_teachers_list?.map((row, index) => (
                                                    <tr key={row?.teacher_id}>
                                                        <td>{index + 1}</td>
                                                        <td>{row?.first_name} {row?.last_name}</td>
                                                        <td>{row?.institute_name}</td>
                                                        {/* <td>{row?.subject}</td> */}
                                                        <td>{row?.contact_no}</td>
                                                        <td>{row?.email}</td>
                                                        <td>{row?.qualification}</td>
                                                        <td>
                                                            <ButtonComponent type="button" className="btn-transparent" buttonName={Icons?.edit_icon} clickFunction={()=> {   dispatch(updateEditDashboardTeacher(row))
                                                                dispatch(updateModalShow({show: true, close_btn: true, modal_from: "admin", modal_type: "edit_dashboard_teacher"}))
                                                            }} />
                                                            <ButtonComponent type="button" className="btn-transparent" buttonName={Icons?.delete_icons} clickFunction={ () => {
                                                                dispatch(updateEditDashboardTeacher(row))
                                                                dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "admin", modal_type: "delete_dashboard_teacher" }))
                                                            }}/>
                                                        </td>
                                                    </tr>
                                                ))
                                                :
                                                 <tr>
                                                    <td colSpan={8}>No Data Found</td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </section>
        </>

    )

}

export default AdminDashboard;