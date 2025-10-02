import { Card } from "react-bootstrap";
import CountShowingCard from "Components/Card/CountShowingCard";
import TimeTableCard from "Components/Card/TimeTableCard";
import ActivityCard from "Components/Card/ActivtyCard";
import NotesDisplayCard from "Components/Card/NotesDisplayCard";
import StudentsPerformanceChart from "Components/Charts/StudentsPerformanceChart";
import GradeByClassroomChart from "Components/Charts/GradeByClassroomChart";
import { useEffect } from "react";
import JsonData from "../Utils/JsonData";
import { useDispatch } from "react-redux";
import { useCommonState } from "Components/CustomHooks";
import { getAllClassRooms, GetAllsubjects, getGradeByClassroom, GetPerformanceBysubject, getSubjectByClassroom, getTeacherDashboardDatas } from "../Actions/teacherAction";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import Spinner from "Components/Spinner/CustomSpinner";



const TeacherDashboard = () => {
    const { teachersState } = useCommonState();

    const dispatch = useDispatch();
    const { jsonOnly } = JsonData()
    const { glow } = teachersState?.teacher_DashboardData
    const { jsxJson } = JsonData();
    const { data } = teachersState?.teacher_Current_Grade_Classroom;
    const gradeByClassroom = teachersState?.teacher_GradeByClassroom?.data;
    const studentPerfomancedata = teachersState?.teacher_GetStudencePerfomanceBySubject?.data;
    const currentStudentSubjectForPerfomance = teachersState?.teacher_Current_perfomance_Classroom?.data;

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

    useEffect(() => {
        dispatch(getTeacherDashboardDatas());
        dispatch(getAllClassRooms())
        dispatch(getGradeByClassroom())
        dispatch(GetPerformanceBysubject())
        dispatch(GetAllsubjects())
    }, [])

    useEffect(() => {
        dispatch(getGradeByClassroom(data))
    }, [data])

    useEffect(() => {
        dispatch(GetPerformanceBysubject(currentStudentSubjectForPerfomance))
    }, [currentStudentSubjectForPerfomance?.subject_id])

    return (
        <>
            {glow ? (
                <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <Spinner />
                    <p className="py-3">Getting Records</p>
                </div>
            ) : <div className="d-flex flex-wrap pb-3 pe-3 overflowY h-100">
                <div className="col-12 col-xxl-5 d-flex flex-wrap pb-md-3">
                    {jsonOnly?.dashboard_count_details?.map((item, index) => (
                        <div className="col-12 pb-2 pb-md-0 col-md-6 px-2" key={index}>
                            <CountShowingCard data={item} className="border-1" />
                        </div>
                    ))}

                    <div className="col-12 mt-3 px-2 pb-2 pb-md-0">
                        <div className="w-100">
                            <TimeTableCard />
                        </div>
                    </div>
                </div>

                <div className="col-12 col-xxl-7 row pb-xxl-3">
                    <div className="col-12 col-md-7 px-2 pe-0 pe-md-3">
                        <Card className='border-0 rounded-4 shadow-sm py-3 h-100'>
                            <Card.Header className="row border-bottom bg-transparent">
                                <Card.Title className='col-12 fs-16'> Student Performance </Card.Title>
                                <div className="col-12 col-xxl-6">{Inputfunctions(jsxJson.selectClassRoomForPerfomance)}</div>
                                <div className="col-12 col-xxl-6">{Inputfunctions(jsxJson?.selectStudentPerfomance)}</div>
                            </Card.Header>
                            <Card.Body className="pe-none">
                                <StudentsPerformanceChart data={Array.isArray(studentPerfomancedata) ? studentPerfomancedata : []} />
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-12 col-md-5 p-2 p-md-0">
                        <Card className='border-0 rounded-4 shadow-sm py-3 h-100'>
                            <Card.Header className="border-bottom bg-transparent">
                                <Card.Title className='fs-16'> Activities </Card.Title>
                            </Card.Header>
                            <Card.Body className="activity_card_body">
                                {Array.isArray(teachersState?.teacher_DashboardData?.data?.activites) ? teachersState?.teacher_DashboardData?.data?.activites?.map((data, index) => (
                                    <ActivityCard key={index} data={data} />
                                )) : <div className="d-flex justify-content-center align-items-center h-100"><p>no data found</p></div>}
                            </Card.Body>
                        </Card>
                    </div>
                </div>

                <div className="col-12 col-md-7 mt-2 px-2">
                    <Card className='border-0 rounded-4 shadow-sm py-2 h-100'>
                        <Card.Header className="border-bottom bg-transparent row row-cols-1 row-cols-md-2">
                            <Card.Title className='fs-16 mt-2'> Grade by Classroom </Card.Title>
                            <div className="d-flex justify-content-start justify-content-md-end align-items-start">{Inputfunctions(jsxJson.selectGradeByClassRoom)}</div>
                        </Card.Header>
                        <Card.Body className="row">
                            <div className="col-12 col-md-4 pb-2 pb-md-0 px-2">
                                <Card className="border shadow-sm">
                                    <Card.Body>
                                        <div className="py-4 text-center">
                                            <h5 className="grade_by_classroom">Emergent</h5>
                                            <h4>{Number(gradeByClassroom[0]?.emergent || 0)}%</h4>
                                        </div>
                                        <GradeByClassroomChart color="#26B18D" graphData={graphData} />
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className="col-12 col-md-4 pb-2 pb-md-0 px-2">
                                <Card className="border shadow-sm">
                                    <Card.Body>
                                        <div className="py-4 text-center">
                                            <h5 className="grade_by_classroom">Developing</h5>
                                            <h4>{Number(gradeByClassroom[0]?.developing || 0)}%</h4>
                                        </div>
                                        <GradeByClassroomChart color="#E44646" graphData={graphData} />
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className="col-12 col-md-4 px-2">
                                <Card className="border shadow-sm">
                                    <Card.Body>
                                        <div className="py-4 text-center">
                                            <h5 className="grade_by_classroom">Exemplar</h5>
                                            <h4>{Number(gradeByClassroom[0]?.exemplar || 0)}%</h4>
                                        </div>
                                        <GradeByClassroomChart color="#26B18D" graphData={graphData} />
                                    </Card.Body>
                                </Card>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-12 col-md-5 mt-2 px-2">
                    <Card className='border-0 rounded-4 shadow-sm py-2 h-100'>
                        <Card.Header className="border-bottom bg-transparent">
                            <Card.Title className='fs-16'> Notes </Card.Title>
                        </Card.Header>
                        <Card.Body className="row">
                            {Array.isArray(teachersState?.teacher_DashboardData?.data?.notes) ? teachersState?.teacher_DashboardData?.data?.notes?.map((data, index) => (
                                <div className="col-12 col-md-6 p-2">
                                    <NotesDisplayCard className="border-0 overflow-hidden" style={{ background: '#FFAFAF' }} params={data} />
                                </div>
                            )) : <div className="d-flex justify-content-center align-items-center h-100"><p>Notes Not found</p></div>}
                        </Card.Body>
                    </Card>
                </div>
            </div>}
        </>
    );
}

export default TeacherDashboard;