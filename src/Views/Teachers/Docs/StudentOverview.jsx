import StudentOverviewCard from "Components/Card/StudentOverviewCard";
import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Icons from "Utils/Icons";
import GaugeChart from "Components/Charts/GaugeChart";
import Input from "Components/Input/Input";
import SpendingHoursChart from "Components/Charts/SpendingHoursChart";
import JsonData from "Views/Teachers/Utils/JsonData";

const StudentOverview = () => {
    const { class_id, subject_id } = useParams();
    const { jsonOnly } = JsonData();

    const data = [
        { backgroundColor: "#FDADC7", title: "Overall Question Answers", no_of_books: 24, no_of_tests: 4 },
        { backgroundColor: "#FFB6B9", title: "Multiple Question Answers", no_of_books: 24, no_of_tests: 4 },
        { backgroundColor: "#F1D4D4", title: "Short Question Answers", no_of_books: 24, no_of_tests: 4 }
    ]

    const book_data = [
        { bookName: "English", chapter: "Chapter 1", date: "2023-01-01", duration: "30 mins", status: "Emergent" },
        { bookName: "English", chapter: "Chapter 1", date: "2023-01-01", duration: "30 mins", status: "Developing" },
        { bookName: "English", chapter: "Chapter 1", date: "2023-01-01", duration: "30 mins", status: "Developing" },
        { bookName: "English", chapter: "Chapter 1", date: "2023-01-01", duration: "30 mins", status: "Developing" },
        { bookName: "English", chapter: "Chapter 1", date: "2023-01-01", duration: "30 mins", status: "Emergent" },
        { bookName: "English", chapter: "Chapter 1", date: "2023-01-01", duration: "30 mins", status: "Developing" },
        { bookName: "English", chapter: "Chapter 1", date: "2023-01-01", duration: "30 mins", status: "Developing" },
        { bookName: "English", chapter: "Chapter 1", date: "2023-01-01", duration: "30 mins", status: "Developing" },
        { bookName: "English", chapter: "Chapter 1", date: "2023-01-01", duration: "30 mins", status: "Emergent" },
        { bookName: "English", chapter: "Chapter 1", date: "2023-01-01", duration: "30 mins", status: "Developing" },
        { bookName: "English", chapter: "Chapter 1", date: "2023-01-01", duration: "30 mins", status: "Developing" },
        { bookName: "English", chapter: "Chapter 1", date: "2023-01-01", duration: "30 mins", status: "Developing" },
        { bookName: "English", chapter: "Chapter 1", date: "2023-01-01", duration: "30 mins", status: "Emergent" },
        { bookName: "English", chapter: "Chapter 1", date: "2023-01-01", duration: "30 mins", status: "Developing" },
        { bookName: "English", chapter: "Chapter 1", date: "2023-01-01", duration: "30 mins", status: "Developing" },
        { bookName: "English", chapter: "Chapter 1", date: "2023-01-01", duration: "30 mins", status: "Developing" }
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
                            {data?.map((item, index) => (
                                <div className="col-12 col-sm-6 col-xxl-3 p-2" key={index}>
                                    <StudentOverviewCard data={item} style={{ backgroundColor: item?.backgroundColor || '' }} />
                                </div>
                            ))}

                            <div className="col-12 col-sm-6 col-xxl-3 p-2">
                                <Card className="h-100 border-0 rounded-4 shadow">
                                    <Card.Body className="p-2 row justify-content-center">
                                        <GaugeChart width={300} height={150} value={30} data={[{ name: 'Emergent', value: 100, color: '#4CD964' }]} label="Emergent" needleColor="#FF914D" />
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
                                                <tbody>
                                                    {book_data?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="text-center fs-14">{item.bookName}</td>
                                                            <td className="text-center fs-14">{item.chapter}</td>
                                                            <td className="text-center fs-14">{item.date}</td>
                                                            <td className="text-center fs-14">{item.duration}</td>
                                                            <td className="text-center fs-14">{item.status}</td>
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
                                        <SpendingHoursChart />
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