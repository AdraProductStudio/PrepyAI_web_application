import Spinner from "Components/Spinner/CustomSpinner";
import React from "react";
import { Card } from 'react-bootstrap';

const TimeTableCard = ({ data, loading }) => {

    const format12Hour = (time24) => {
        if (!time24) return "";
        const [hourStr, min] = time24.split(":");
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12;
        if (hour === 0) hour = 12;
        return `${hour}:${min} ${ampm}`;
    }
    let days = []
    if (data) {
        days = Object.keys(data?.timetable) || []
    }

    return (
        <Card className='border-0 rounded-4 shadow-sm py-3'>
            <Card.Title className='ps-3 fs-16'> Time Table </Card.Title>
            <Card.Body>
                {loading ? <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="col-5 text-center">
                        <Spinner />
                    </div>
                </div> :
                    <div className="table-responsive">
                        <table className="table text-center align-middle timetable">
                            <tbody>
                                {days?.map((day) => (
                                    <tr key={day}>
                                        <td className="timetable_heading">{day}</td>
                                        {data?.timetable?.[day]?.map((period, index) => (
                                            <td key={period?.period_id} className="text-nowrap periods">
                                                {period?.classroom_name || period?.subject_name || "-"}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="">
                                <tr>
                                    <th className='border-0'>Day / Time</th>
                                    {data?.timing.map((slot) => (
                                        <th key={slot?.period_id} className="timetable_heading">{format12Hour(slot?.start_time)}{'-'}{format12Hour(slot?.end_time)}</th>
                                    ))}
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                }
            </Card.Body>
        </Card>
    );
};

export default TimeTableCard;
