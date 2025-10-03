import React, { useMemo, useState } from "react";
import { DateTime } from "luxon";
import { CgProfile } from "react-icons/cg";
import { useCommonState } from "Components/CustomHooks";
import SpinnerComponent from "Components/Spinner/Spinner";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { useDispatch } from "react-redux";
import { handlePerformanceModal } from "../Actions/Teachers_action";
import Icons from "Utils/Icons";
import { Card } from "react-bootstrap";


const PerformanceTable = ({ studentsData, testType }) => {
    const dispatch = useDispatch();
    const { teachersState } = useCommonState()
    const [currentMonth, setCurrentMonth] = useState(DateTime.local());
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");

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
            if (!std?.student_name) return std;

            return {
                name: std?.student_name,
                test_results: std?.test_results,
                greenBox: std?.test_results
                    ?.filter((t) => t?.status === "exemplar")
                    ?.map((t) => t?.testDate),
                yellowBox: std?.test_results
                    ?.filter((t) => t?.status === "developing")
                    ?.map((t) => t?.testDate),
                redBox: std?.test_results
                    ?.filter(((t) => t?.status === "emergent"))
                    ?.map((t) => t?.testDate),
                grayBox: std?.test_results
                    ?.filter((t) => t?.status === "not_attempted")
                    ?.map((t) => t?.testDate)
            }
        })

    }, [studentsData]);

    const goToNextMonth = () => {
        setCurrentMonth((prevMonth) => prevMonth.plus({ months: 1 }));
    };

    const goToPreviousMonth = () => {
        setCurrentMonth((prevMonth) => prevMonth.minus({ months: 1 }));
    };

    return (
        <>
            <Card
                className="rounded-4 border border-light-subtle"
                style={{ height: "65vh", overflow: "hidden", boxShadow: "0px 6px 58px 0px rgba(196, 203, 214, 0.10)" }}
            >
                <table>
                    <tr>
                        <td style={{width: "220px"}}>
                            &nbsp;
                        </td>
                        <td>
                            <div className="d-flex justify-content-start m-2">
                                <div className="w-100 d-flex justify-content-between align-items-center">
                                    <div className="fw-bolder" >
                                        {currentMonth.toFormat("MMMM")}
                                    </div>

                                    <div className="ms-4">
                                        <button
                                            onClick={goToPreviousMonth}
                                            className="btn border-0 "
                                            style={{ fontSize: "1.2rem" }}
                                        >
                                            {Icons.left_arrow}
                                        </button>
                                        &nbsp;
                                        <button
                                            onClick={goToNextMonth}
                                            className="btn border-0 "
                                            style={{ fontSize: "1.2rem" }}
                                        >
                                            {Icons.right_arrow}
                                        </button>
                                    </div>

                                </div>
                            </div>

                        </td>
                    </tr>
                </table>

                <div style={{ flex: 1, overflow: "auto", width: "100%" }} className="position-relative">
                    <table className="table table-hover mb-0" style={{ minWidth: "800px", marginLeft: '-1px' }}>
                        <thead className="position-sticky top-0 " style={{ zIndex: 10 }}>
                            <tr>
                                <th
                                    className="text-center align-middle"
                                    style={{ position: "sticky", top: "-2px", left: '-1px', zIndex: 11, width: "220px"}}
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
                                <div className="position-absolute top-50 start-50 translate-middle">
                                    <SpinnerComponent />
                                </div>
                                :
                                <tbody>
                                    {studentsData?.map((std, idx) => {
                                        const colorInfo = studentsWithColors.find((obj) => obj.name === std.student_name);
                                        return (
                                            <tr key={idx} className="border border-white">
                                                <td
                                                    className=" sticky-left"
                                                    style={{ position: "sticky", left: "-1px", zIndex: 9, width: "220px"}}
                                                >
                                                    <div className="d-flex align-items-center gap-2 p-1">
                                                        <CgProfile size={25} className="flex-shrink-0" style={{width: "25px", height: "25px"}}/>
                                                        <div className="text-truncate" style={{maxWidth: "120px"}}>
                                                            {/* {std?.student_name?.length <= 12 ? std.student_name : `${std?.student_name.slice(0, 12)}...`} */}
                                                            {std?.student_name}
                                                        </div>
                                                    </div>
                                                </td>
                                                {monthDates?.map((date) => {
                                                    let bg = "#E3F3FF";
                                                    if (colorInfo?.greenBox?.includes(date.date)) bg = "#64DD6C";
                                                    else if (colorInfo?.yellowBox?.includes(date.date)) bg = "#E0E96C";
                                                    else if (colorInfo?.redBox?.includes(date.date)) bg = "#FF5C5C";
                                                    else if (colorInfo?.grayBox?.includes(date.date)) bg = "#FF8383";

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
                                                                onClick={() => {
                                                                    dispatch(handlePerformanceModal({
                                                                        id: std.student_id,
                                                                        date: date.date,
                                                                        testType,
                                                                    }))
                                                                    dispatch(updateModalShow({ show: true, size: "lg", close_btn: true, modal_from: "teacher", modal_type: "performance" }))
                                                                }
                                                                }
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



                <div className="row flex-wrap  m-2 mx-0 performace_table_footer ms-4 ms-md-0">
                    <div className="col-6 col-md-3">
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
                    <div className="col-6 col-md-3">
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
                    <div className="col-6 col-md-3">
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
                    <div className="col-6 col-md-3">
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
            </Card>
        </>

    );
};

export default PerformanceTable;
