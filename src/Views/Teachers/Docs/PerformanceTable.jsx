import React, { useMemo, useRef, useState } from "react";
import { DateTime } from "luxon";
import { CgProfile } from "react-icons/cg";
import { CustomUseLocationHook, useCommonState } from "Components/CustomHooks";
import SpinnerComponent from "Components/Spinner/Spinner";


const PerformanceTable = ({ studentsData, testType }) => {
    const modalRef = useRef(null);
    const modalInstanceRef = useRef(null);
    const [activeArrow, setActiveArrow] = useState("");
    const [modalArray, setModalArray] = useState([]);

    const [currentMonth, setCurrentMonth] = useState(DateTime.local());
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");

    const { teachersState } = useCommonState()

    //Generate month dates (only changes recalculated when month changes)
    const monthDates = useMemo(() => {
        const dates = [];
        let currentDate = startOfMonth;

        while (currentDate <= endOfMonth) {
            dates.push({
                date: currentDate.toISODate(),
                day: currentDate.weekdayLong,
            });
            currentDate = currentDate.plus({ days: 1 });
        }
        return dates;
    }, [startOfMonth, endOfMonth])


    //Compute colored boxes from StudentsData (memoized for performance)
    const studentsWithColors = useMemo(() => {
        return studentsData?.map((std) => {
            if(!std?.student_name) return std;
            
            return {
                name: std.student_name,
                test_results: std.test_results,
                greenBox: std.test_results
                    .filter((t) => t.status === "exemplar")
                    .map((t) => t.testDate),
                yellowBox: std.test_results
                    .filter((t) => t.status === "developing")
                    .map((t) => t.testDate),
                redBox: std.test_results
                    .filter(((t) => t.status === "emergent"))
                    .map((t) => t.testDate),
                grayBox: std.test_results
                    .filter((t) => t.status === "not_attempted")
                    .map((t) => t.testDate)
            }
        })
       
    }, [studentsData]);

    const goToNextMonth = () => {
        setCurrentMonth((prevMonth) => prevMonth.plus({ months: 1 }));
        // setActiveArrow("rightArrow");
    };

    const goToPreviousMonth = () => {
        setCurrentMonth((prevMonth) => prevMonth.minus({ months: 1 }));
        // setActiveArrow("leftArrow");
    };

    return (
        <div
            className="card rounded-4 d-flex flex-column border border-light-subtle bg-succes ms-2 "
            style={{ height: "65vh", overflow: "hidden", boxShadow: "0px 6px 58px 0px rgba(196, 203, 214, 0.10)" }}
        >

            <div className="row d-flex justify-content-start  m-2">
                <div className="col-12 d-flex justify-content-between align-items-center gap-2" style={{ paddingLeft: '220px' }}>
                    <div className="fw-bolder" >
                        {currentMonth.toFormat("MMMM")}
                    </div>

                    <div className="ms-4">
                        <button
                            onClick={goToPreviousMonth}
                            className="btn border-0 "
                            style={{ fontSize: "1.2rem" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M4.2097 11.3871L4.29289 11.2929L9.29289 6.29289C9.68342 5.90237 10.3166 5.90237 10.7071 6.29289C11.0676 6.65338 11.0953 7.22061 10.7903 7.6129L10.7071 7.70711L7.415 11H19C19.5523 11 20 11.4477 20 12C20 12.5128 19.614 12.9355 19.1166 12.9933L19 13H7.415L10.7071 16.2929C11.0676 16.6534 11.0953 17.2206 10.7903 17.6129L10.7071 17.7071C10.3466 18.0676 9.77939 18.0953 9.3871 17.7903L9.29289 17.7071L4.29289 12.7071C3.93241 12.3466 3.90468 11.7794 4.2097 11.3871Z" fill='#C9CCD1' />
                            </svg>
                        </button>
                        &nbsp;
                        <button
                            onClick={goToNextMonth}
                            className="btn border-0 "
                            style={{ fontSize: "1.2rem" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M19.7903 11.3871L19.7071 11.2929L14.7071 6.29289C14.3166 5.90237 13.6834 5.90237 13.2929 6.29289C12.9324 6.65338 12.9047 7.22061 13.2097 7.6129L13.2929 7.70711L16.585 11H5C4.44772 11 4 11.4477 4 12C4 12.5128 4.38604 12.9355 4.88338 12.9933L5 13H16.585L13.2929 16.2929C12.9324 16.6534 12.9047 17.2206 13.2097 17.6129L13.2929 17.7071C13.6534 18.0676 14.2206 18.0953 14.6129 17.7903L14.7071 17.7071L19.7071 12.7071C20.0676 12.3466 20.0953 11.7794 19.7903 11.3871Z" fill="#C9CCD1" />
                            </svg>
                        </button>
                    </div>

                </div>

            </div>

            <div style={{ flex: 1, overflow: "auto", width: "100%" }} className="">
                <table className="table table-hover mb-0" style={{ minWidth: "800px", marginLeft: '-1px' }}>
                    <thead className="position-sticky top-0 bg-white" style={{ zIndex: 10 }}>
                        <tr className="p-2 bg-white ">
                            <th
                                className="text-center align-middle "
                                style={{ position: "sticky", top: "-2px", left: '-1px', zIndex: 11, width: "220px" }}
                            >
                                Students List
                            </th>
                            {monthDates.map((date, index) => (
                                <th key={index} className="text-center p-0 pb-2">
                                    <button key={index} className="btn btn-info border border-none px-0 text-center" style={{ backgroundColor: "#F4F9FD", color: "#7D8593", fontSize: "0.7rem", width: '30px', height: '40px' }}>
                                        <span className="d-inline-block" >{DateTime.fromISO(date.date).toFormat("dd")}</span><br />
                                        <span style={{ fontSize: "0.5rem", color: "#7D8594" }}>{DateTime.fromISO(date.date).toFormat("cccc").slice(0, 3)}</span>
                                    </button>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {
                        teachersState?.studentsPerformance.placeholder ?
                            <div className="d-flex justify-content-center align-items-center w-100">
                                <SpinnerComponent />
                            </div>  
                            :
                            <tbody>
                                {studentsData?.map((std, idx) =>  {
                                    const colorInfo = studentsWithColors.find((obj) => obj.name === std.student_name);
                                    return (
                                        <tr key={idx} className="border border-white bg-white">
                                            <td
                                                className="bg-white d-flex justify-content-start align-items-center "
                                                style={{ position: "sticky", left: 0, zIndex: 9, width: "220px" }}
                                            >
                                                <CgProfile  className="me-2"/>
                                                <span style={{ fontSize: "0.9rem" }}>{(std.student_name).length <= 12 ? std.student_name : `${(std.student_name).slice(0, 12)}...`}</span>
                                            </td>
                                            {monthDates?.map((date) => {
                                                let bg =  "#E3F3FF";
                                                if(colorInfo?.greenBox.includes(date.date)) bg = "#64DD6C";
                                                else if(colorInfo?.yellowBox.includes(date.date)) bg = "#E0E96C";
                                                else if(colorInfo?.redBox.includes(date.date)) bg = "#FF5C5C";
                                                else if(colorInfo?.grayBox.includes(date.date)) bg = "#FF8383";
                                            
                                                return (
                                                    <td key={date.date} className="text-center p-1 ">
                                                        <button
                                                            className="btn btn-sm"
                                                            style={{
                                                                width: "30px",
                                                                height: "40px",
                                                                cursor: "pointer",
                                                                backgroundColor: bg,
                                                            }}
                                                            // onClick={()=> dispatch(handleStudentPerformanceModel({id: std.student_id, date: date.date , testType}))}
                                                            onClick={()=> console.log({id: std.student_id, date: date.date , testType})}
                                                        >
                                                            &nbsp;
                                                        </button>

                                                    </td>
                                                );

                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                    }
                </table>
            </div>



            <div className="row flex-wrap  m-2 mx-0" style={{ paddingLeft: '220px' }}>
                <div className="col-12 col-md-3 ">
                    <p className="text-secondary ms-2 mb-0" style={{ fontSize: "0.8rem" }}>
                        Status
                    </p>
                    <div className="d-flex align-items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="5" fill={'#F65160'} />
                        </svg>
                        <span>Emergent</span>
                    </div>
                </div>
                <div className="col-12 col-md-3 ">
                    <p className="text-secondary ms-2 mb-0" style={{ fontSize: "0.8rem" }}>
                        Status
                    </p>
                    <div className="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="5" fill={'#FFCB33'} />
                        </svg>
                        <span>Developing</span>
                    </div>
                </div>
                <div className="col-12 col-md-3 ">
                    <p className="text-secondary ms-2 mb-0" style={{ fontSize: "0.8rem" }}>
                        Status
                    </p>
                    <div className="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="5" fill={'#28D196'} />
                        </svg>
                        <span>Exemplar</span>
                    </div>
                </div>
                <div className="col-12 col-md-3 ">
                    <p className="text-secondary ms-2 mb-0" style={{ fontSize: "0.8rem" }}>
                        Status
                    </p>
                    <div className="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="5" fill={'#FF8383'} />
                        </svg>
                        <span>Not attempted</span>
                    </div>
                </div>

            </div>



        </div>

    );
};

export default PerformanceTable;
