import ButtonComponent from "Components/Button/Button";
import CountShowingCard from "Components/Card/CountShowingCard";
import TestConductedChart from "Components/Charts/TestConductedChart";
import { Card } from "react-bootstrap";
import { SearchComponent } from "ResuableFunctions/SearchFun";
import Icons from "Utils/Icons";
import JsonData from "Views/Admin/Utils/JsonData";

const AdminDashboard = () => {
    const { jsonOnly } = JsonData();
    const data = [
        { icon: Icons.student_dashboard_to_no_stud_icon, count: 1000, description: "Total No.of Teacher" },
        { icon: Icons.multiple_people_icon, count: 4, description: "Total No.of Students" },
        { icon: Icons.admin_computer_icon_pink, count: 1000, description: "Total No.of Classrooms" },
        { icon: Icons.admin_test_icon, count: 4, description: "Total No.of Tests" }
    ]

    const table_data = [
        { s_no: 1, staff_name: "John Doe", institute_name: "ABC Institute", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
        { s_no: 1, staff_name: "John Doe", institute_name: "ABC Institute", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
        { s_no: 1, staff_name: "John Doe", institute_name: "ABC Institute", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
        { s_no: 1, staff_name: "John Doe", institute_name: "ABC Institute", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
        { s_no: 1, staff_name: "John Doe", institute_name: "ABC Institute", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
        { s_no: 1, staff_name: "John Doe", institute_name: "ABC Institute", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
    ]

    return (
        <section className="row h-100 ">
            <div className="col-5 row">
                {data.map((item, index) => (
                    <div className="col-6 p-1" key={index}>
                        <CountShowingCard data={item} />
                    </div>
                ))}
            </div>
            <div className="col-7 p-1">
                <Card className="h-100 border-0 rounded-4 shadow-sm test_conducted_chart_height">
                    <Card.Header className="bg-transparent border-bottom pt-3">
                        <h6 className="mb-2">Test Conducted</h6>
                        <p className="fs-15 text-secondary mb-0">110 Test</p>
                    </Card.Header>
                    <Card.Body>
                        <TestConductedChart />
                    </Card.Body>
                </Card>
            </div>

            <div className="col-12 p-1 test_conducted_table_height">
                <Card className="h-100 border-0 rounded-4 shadow-sm h-100">
                    <Card.Header className="bg-transparent border-bottom pt-3">
                        <div className="row justify-content-between">
                            <div className="col-3">
                                <h6 className="mb-2">Teachers</h6>
                                <p className="fs-15 text-secondary mb-0">25 Teachers</p>
                            </div>
                            <div className="col-6 row justify-content-end">
                                <div className="col px-1">
                                    <SearchComponent className="px-5 py-2" placeholder="Search" onClick={() => alert("hii")} />
                                </div>
                                <div className="col px-1">
                                    <ButtonComponent
                                        type="button"
                                        className="btn-transparent w-100 border py-2"
                                        buttonName="Filter"
                                    />
                                </div>
                                <div className="col px-1">
                                    <ButtonComponent type="button" className="w-100 btn-brand-color border py-2">
                                        {Icons.add_icon}
                                        <span className="lign-middle">Create Staff</span>
                                    </ButtonComponent>
                                </div>
                            </div>
                        </div>
                    </Card.Header>
                    <Card.Body className="overflowY h-100">
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
                                    {table_data?.map((row, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{row?.staff_name}</td>
                                            <td>{row?.institute_name}</td>
                                            <td>{row?.subject}</td>
                                            <td>{row?.contact_no}</td>
                                            <td>{row?.email}</td>
                                            <td>{row?.qualification}</td>
                                            <td>
                                                <ButtonComponent type="button" className="btn-transparent" buttonName={Icons?.edit_icon} />
                                                <ButtonComponent type="button" className="btn-transparent" buttonName={Icons?.delete_icons} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </section>
    )

}

export default AdminDashboard;