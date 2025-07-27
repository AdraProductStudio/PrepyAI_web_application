import { Card } from "react-bootstrap";

import CountShowingCard from "Components/Card/CountShowingCard";
import TimeTableCard from "Components/Card/TimeTableCard";
import Icons from "Utils/Icons";
import ActivityCard from "Components/Card/ActivtyCard";
import NotesDisplayCard from "Components/Card/NotesDisplayCard";
import StudentsPerformanceChart from "Components/Charts/StudentsPerformanceChart";
import GradeByClassroomChart from "Components/Charts/GradeByClassroomChart";



const StudentDashboard = () => {
    const data = [
        { icon: Icons.student_dashboard_to_no_stud_icon, count: 1000, description: "Total number of tests conducted" },
        { icon: Icons.student_dashboard_to_no_cls_icon, count: 4, description: "Total number of classes" }
    ]

    const graphData = [
        {
            name: 'Page A',
            pv: 6400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 7300,
            amt: 2100,
        },
    ];

    return (
        <div className="d-flex flex-wrap pb-3 pe-3 overflowY h-100">
            <div className="col-5 d-flex flex-wrap">
                {data.map((item, index) => (
                    <div className="col-6 px-2" key={index}>
                        <CountShowingCard data={item} className="border-1" />
                    </div>
                ))}

                <div className="col-12 mt-3 px-2">
                    <div className="w-100">
                        <TimeTableCard />
                    </div>
                </div>
            </div>

            <div className="col-7 row">
                <div className="col-7 px-2 pe-3">
                    <Card className='border-0 rounded-4 shadow-sm py-3 h-100'>
                        <Card.Header className="border-bottom bg-transparent">
                            <Card.Title className='fs-16'> Student Performance </Card.Title>
                        </Card.Header>
                        <Card.Body className="pe-none">
                            <StudentsPerformanceChart />
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-5">
                    <Card className='border-0 rounded-4 shadow-sm py-3 h-100'>
                        <Card.Header className="border-bottom bg-transparent">
                            <Card.Title className='fs-16'> Activities </Card.Title>
                        </Card.Header>
                        <Card.Body className="activity_card_body">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <ActivityCard key={index} />
                            ))}
                        </Card.Body>
                    </Card>
                </div>
            </div>

            <div className="col-7 mt-3 px-2">
                <Card className='border-0 rounded-4 shadow-sm py-2 h-100'>
                    <Card.Header className="border-bottom bg-transparent">
                        <Card.Title className='fs-16'> Grade by Classroom </Card.Title>
                    </Card.Header>
                    <Card.Body className="row">
                        <div className="col-4 px-2">
                            <Card className="border shadow-sm">
                                <Card.Body>
                                    <div className="py-4 text-center">
                                        <h5 className="grade_by_classroom">Emergent</h5>
                                        <h4>40%</h4>
                                    </div>
                                    <GradeByClassroomChart color="#26B18D" graphData={graphData} />
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="col-4 px-2">
                            <Card className="border shadow-sm">
                                <Card.Body>
                                    <div className="py-4 text-center">
                                        <h5 className="grade_by_classroom">Developing</h5>
                                        <h4>40%</h4>
                                    </div>
                                    <GradeByClassroomChart color="#E44646" graphData={graphData} />
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="col-4 px-2">
                            <Card className="border shadow-sm">
                                <Card.Body>
                                    <div className="py-4 text-center">
                                        <h5 className="grade_by_classroom">Exemplar</h5>
                                        <h4>40%</h4>
                                    </div>
                                    <GradeByClassroomChart color="#26B18D" graphData={graphData} />
                                </Card.Body>
                            </Card>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            <div className="col-5 mt-3 px-2">
                <Card className='border-0 rounded-4 shadow-sm py-2 h-100'>
                    <Card.Header className="border-bottom bg-transparent">
                        <Card.Title className='fs-16'> Notes </Card.Title>
                    </Card.Header>
                    <Card.Body className="row">
                        <div className="col-6 p-2">
                            <NotesDisplayCard className="border-0" style={{ background: '#FFAFAF' }} />
                        </div>
                        <div className="col-6 p-2">
                            <NotesDisplayCard className="border-0" style={{ background: '#FFAFAF' }} />
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default StudentDashboard;