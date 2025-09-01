import { Card } from "react-bootstrap";

import CountShowingCard from "Components/Card/CountShowingCard";
import TimeTableCard from "Components/Card/TimeTableCard";
import Icons from "Utils/Icons";
import ActivityCard from "Components/Card/ActivtyCard";
import NotesDisplayCard from "Components/Card/NotesDisplayCard";
import StudentsPerformanceChart from "Components/Charts/StudentsPerformanceChart";
import GradeByClassroomChart from "Components/Charts/GradeByClassroomChart";
import { useEffect, useState } from "react";
import axiosInstance from "Services/axiosInstance";
import JsonData from "../Utils/JsonData";
import { handleTeacherDashboard } from "../Slice/teachersSlice";
import { useDispatch } from "react-redux";
import { useCommonState } from "Components/CustomHooks";
import { getAllClassRooms, getGradeByClassroom, getTeacherDashboardDatas } from "../Actions/teacherAction";
import SpinnerComponent from "Components/Spinner/Spinner";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";



const TeacherDashboard = () => {
    const { teachersState } = useCommonState();

    const dispatch = useDispatch();
    const {jsonOnly} = JsonData()
    const {glow} = teachersState?.teacher_DashboardData 
    const { jsxJson } = JsonData();
    const {data} = teachersState?.teacher_Current_Grade_Classroom
    const gradeByClassroom = teachersState?.teacher_GradeByClassroom?.data
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

    useEffect(()=>{
        dispatch(getTeacherDashboardDatas());
        dispatch(getAllClassRooms())
        dispatch(getGradeByClassroom())
    },[])

    useEffect(()=>{
        dispatch(getGradeByClassroom(data))
    },[data])

    return (
        <>
        {glow ? (
            <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center py-4">
              <SpinnerComponent />
              <p className="py-3">Getting Records</p>
            </div>
          ) :<div className="d-flex flex-wrap pb-3 pe-3 overflowY h-100">
            <div className="col-5 d-flex flex-wrap">
                {jsonOnly?.dashboard_count_details?.map((item, index) => (
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
                            {/* {teachersState?.teacher_DashboardData?.data?.activites?.map((data, index) => (
                                <ActivityCard key={index} data={data} />
                            ))} */}
                        </Card.Body>
                    </Card>
                </div>
            </div>

            <div className="col-7 mt-3 px-2">
                <Card className='border-0 rounded-4 shadow-sm py-2 h-100'>
                    <Card.Header className="border-bottom bg-transparent d-flex justify-content-between">
                        <Card.Title className='fs-16'> Grade by Classroom </Card.Title>
                        <div>{Inputfunctions(jsxJson.selectGradeByClassRoom)}</div>
                    </Card.Header>
                    <Card.Body className="row">
                        <div className="col-4 px-2">
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

                        <div className="col-4 px-2">
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

                        <div className="col-4 px-2">
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

            <div className="col-5 mt-3 px-2">
                <Card className='border-0 rounded-4 shadow-sm py-2 h-100'>
                    <Card.Header className="border-bottom bg-transparent">
                        <Card.Title className='fs-16'> Notes </Card.Title>
                    </Card.Header>
                    <Card.Body className="row">
                            {teachersState?.teacher_DashboardData?.data?.notes?.map((data,index)=>(
                        <div className="col-6 p-2">
                                <NotesDisplayCard className="border-0 overflow-hidden" style={{ background: '#FFAFAF' }} params={data} />
                        </div>
                            ))}
                    </Card.Body>
                </Card>
            </div>
        </div>}</>
    );
}

export default TeacherDashboard;