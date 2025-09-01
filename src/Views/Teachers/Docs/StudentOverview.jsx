import StudentOverviewCard from "Components/Card/StudentOverviewCard";
import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Icons from "Utils/Icons";
import GaugeChart from "Components/Charts/GaugeChart";
import Input from "Components/Input/Input";
import SpendingHoursChart from "Components/Charts/SpendingHoursChart";
import JsonData from "Views/Teachers/Utils/JsonData";
import { useEffect } from "react";
import { useCommonState } from "Components/CustomHooks";
import { useDispatch } from "react-redux";
import { GetStudentOverviewOverallPerfomance, GetStudentOverviewPerfomance, GetStudentOverviewSpendingHours, GetStudentOverviewTestCount } from "../Actions/teacherAction";

const StudentOverview = () => {
    const { class_id, student_id, subject_id } = useParams();
    const dispatch = useDispatch();
    const { jsonOnly } = JsonData();
    const { teachersState } = useCommonState();
    const book_data = teachersState?.teacher_GetStudentOverviewPerfomance?.data
    const overallPerfomanceData = teachersState?.teacher_GetStudentOverviewOverallPerfomance?.data[0]
    const testCardDetails = teachersState?.teacher_GetStudentOverviewTestCount?.data;
    const spendingHours = Array.isArray(teachersState?.teacher_GetStudentOverviewSpendingHours?.data) ? teachersState?.teacher_GetStudentOverviewSpendingHours?.data : [];
    const filteredMonthly_Perfomance = (overallPerfomanceData?.monthly_performance * 100).toFixed(0);

    const data = [
        { backgroundColor: "#FDADC7", question_types: "Overall Question Answers", no_of_books: testCardDetails[0]?.no_of_books, no_of_tests: testCardDetails[0]?.no_of_tests },
        { backgroundColor: "#FFB6B9", question_types: "Multiple Question Answers", no_of_books: testCardDetails[1]?.no_of_books, no_of_tests: testCardDetails[1]?.no_of_tests },
        { backgroundColor: "#F1D4D4", question_types: "Short Question Answers", no_of_books: testCardDetails[2]?.no_of_books, no_of_tests: testCardDetails[2]?.no_of_tests }
    ]


    function dynamicBackto() {
        switch (true) {
            case window.location.pathname.includes('/teachers_dashboard/classrooms'):
                return `/teachers_dashboard/classrooms/${class_id}/${subject_id}`;
            case window.location.pathname.includes('/teachers_dashboard/students_details'):
                return '/teachers_dashboard/students_details';
            default:
                return '';
        }
    }

    useEffect(() => {
        dispatch(GetStudentOverviewPerfomance({ classroom_id: class_id, student_id }))
        dispatch(GetStudentOverviewOverallPerfomance({ classroom_id: class_id, student_id }))
        dispatch(GetStudentOverviewTestCount({ classroom_id: class_id, student_id }))
        dispatch(GetStudentOverviewSpendingHours({ classroom_id: class_id, student_id }))
    }, [])

    return (
        <section>
            <div className="border-bottom pb-3">
                <Link to={dynamicBackto()} className="brand-link-color">
                    {Icons.back_button_icon_blue}
                    <span className="align-middle"> Student Overview</span>
                </Link>
            </div>

            <div className="student_overview_main">
                <Card className="h-100 border-0 rounded-4 shadow-sm py-3 px-2 overflowY">
                    <Card.Body className="p-2">
                        <div className="row">
                            {data?.length > 0 && data?.map((item, index) => (
                                <div className="col-12 col-sm-6 col-xxl-3 p-2" key={index}>
                                    <StudentOverviewCard data={item} style={{ backgroundColor: item?.backgroundColor || '' }} />
                                </div>
                            ))}

                            <div className="col-12 col-sm-6 col-xxl-3 p-2">
                                <Card className="h-100 border-0 rounded-4 shadow">
                                    <Card.Body className="p-2 row justify-content-center">
                                        <GaugeChart width={300} height={150} value={filteredMonthly_Perfomance} data={[{ name: 'Emergent', value: 100, color: '#4CD961' }]} label="Emergent" needleColor="#FF914D" />
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className="col-6 pt-3 px-2">
                                <Card className="student_overview_table_height border-0 rounded-4 shadow">
                                    <Card.Header className="row align-items-center bg-transparent pt-3 border-0">
                                        <div className="col">
                                            <h5 className="mb-0 brand-heading-color">History</h5>
                                        </div>
                                        <div className="col">
                                            <Input type="text" placeholder="Search History" className="form-control px-4" />
                                        </div>
                                    </Card.Header>
                                    <Card.Body className="p-0 mt-3">
                                        <div className="table-responsive">
                                            <table className="table students_list_table">
                                                <thead>
                                                    <tr>
                                                        {jsonOnly?.history_table_header?.map((header, index) => (
                                                            <th key={index} className="text-center">{header}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="p-2">
                                                    {book_data?.length > 0 && book_data?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="text-center fs-14">{item.book_name}</td>
                                                            {/* <td className="text-center fs-14">{item.chapters}</td> */}
                                                            <td className="text-center fs-14">{item.date}</td>
                                                            <td className="text-center fs-14">{item.duration}</td>
                                                            <td className="text-center fs-14">{item.performance_status}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className="col-6 pt-3 px-2">
                                <Card className="h-100 border-0 rounded-4 shadow">
                                    <Card.Header className="row align-items-center bg-transparent pt-3 border-0">
                                        <div className="col">
                                            <h5 className="mb-0 brand-heading-color">Spending hours</h5>
                                        </div>
                                    </Card.Header>
                                    <Card.Body className="p-2 row justify-content-center">
                                        <SpendingHoursChart data={spendingHours} />
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>

        </section>
    )
}

export default StudentOverview;