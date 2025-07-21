import React, { useState } from 'react';
import { Card, Form, Button, ListGroup } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import Icons from '../../utils/Icons';
// import "../DashboardComp/Dashboard.css"


const CalendarCard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventName, setEventName] = useState('');
  const [events, setEvents] = useState({});


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const addEvent = () => {
    if (!eventName.trim()) return;

    const dateKey = selectedDate.toISOString().split('T')[0];

    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: [...(prevEvents[dateKey] || []), eventName]
    }));

    setEventName('');
  };

  return (
    <Card className="calendar-card " style={{ height: "58.5vh"}}>

      <div className="calendar-container1  p-1" style={{ height: "" }}>
        <Calendar
         onClickDay={handleDateChange} 
         value={selectedDate} className="custom-calendar rounded-2 w-100" 
         showNeighboringMonth={false} />
      </div>
      <p className="activities-title d-flex align-items-center px-3">Activities</p>

      <div className="event-input-container d-flex gap-2 px-2 align-items-center">
        <Form.Control type="text" placeholder="Enter event name" value={eventName} onChange={(e) => setEventName(e.target.value)} className="event-input" />
        <Button className="add-event-btn d-flex align-items-center" onClick={addEvent}> +</Button>
      </div>


      <ListGroup className="event-list overflow-y-scroll mt-2 mx-2">
        {events[selectedDate.toISOString().split('T')[0]] ? (
          events[selectedDate.toISOString().split('T')[0]].map((event, index) => (
            <ListGroup.Item key={index} className="event-item d-flex gap-3">
              <div className="event-icon d-flex align-items-center justify-content-center">
                {Icons.EventBell}
              </div>
              <div className="event-details d-flex flex-column ">
                <strong className="event-name">{event}</strong>
                <div className="event-date">{selectedDate.toDateString()}</div>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <p className="no-events">No events for this day.</p>
        )}
      </ListGroup>
    </Card>
  );
};

export default CalendarCard;