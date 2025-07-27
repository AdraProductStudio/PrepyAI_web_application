import React from 'react';
import { Card } from 'react-bootstrap';
import JsonData from 'Views/Teachers/Utils/JsonData';

const TimeTableCard = () => {
    const { jsonOnly } = JsonData();

    const schedule = {
        Monday: {
            "8.30AM - 9.15AM": "Math 10A",
            "9.15AM - 10AM": "English",
            "10.30AM - 11.15AM": "Science",
            "11.15AM - 12PM": "History",
            "1PM - 1.45PM": "Geography",
            "1.45PM - 2.30PM": "Physical Education"
        },
        Wednesday: {
            "11.15AM - 12PM": "History",
            "2.30PM - 3.15PM": "Physical Education"
        },
        Friday: {
            "10.30AM - 11.15AM": "Science",
            "11.15AM - 12PM": "History",
            "2.30PM - 3.15PM": "Physical Education"
        }
    };

    return (
        <Card className='border-0 rounded-4 shadow-sm py-3'>
            <Card.Title className='ps-3 fs-16'> Time Table </Card.Title>
            <Card.Body>
                <div className="table-responsive">
                    <table className="table text-center align-middle timetable">
                        <tbody>
                            {jsonOnly.days.map((day) => (
                                <tr key={day}>
                                    <td className="timetable_heading">{day}</td>
                                    {jsonOnly.timeSlots.map((slot) => (
                                        <td key={slot} className="text-nowrap periods">
                                            {schedule[day]?.[slot] || "-"}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="">
                            <tr>
                                <th className='border-0'>Day / Time</th>
                                {jsonOnly?.timeSlots.map((slot) => (
                                    <th key={slot} className="timetable_heading">{slot}</th>
                                ))}
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </Card.Body>
        </Card>
    );
};

export default TimeTableCard;
