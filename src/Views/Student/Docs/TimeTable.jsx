import React from 'react';
import JsonDataStudent from '../Utils/JsonDataStudent';
import { Card } from 'react-bootstrap';

const timeSlots = ['8 AM', '10 AM', '12 PM', '2 PM', '3 PM', '5 PM'];

const TimeTable = () => {
  const { jsonOnly } = JsonDataStudent();
  return (
    <>
      {/* <Card className="p-3 w-100">
        <div className="mb-2">
          <h5 className="text-center fw-semibold">Time Table</h5>
        </div>

        <Card
          className="w-100"
          style={{
            maxHeight: '60vh',
            overflowX: 'auto',
            overflowY: 'auto',
            background: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            fontFamily: 'Arial, sans-serif',
            fontSize: '0.85rem',
          }}
        >
          <div
            style={{
              minWidth: '600px', 
              display: 'grid',
              gridTemplateColumns: '80px repeat(6, 1fr)',
              border: '1px solid #dee2e6',
            }}
          >   {/* <Card className="p-3 w-100">
        <div className="mb-2">
          <h5 className="text-center fw-semibold">Time Table</h5>
        </div>

        <Card
          className="w-100"
          style={{
            maxHeight: '60vh',
            overflowX: 'auto',
            overflowY: 'auto',
            background: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            fontFamily: 'Arial, sans-serif',
            fontSize: '0.85rem',
          }}
        >
          <div
            style={{
              minWidth: '600px', 
              display: 'grid',
              gridTemplateColumns: '80px repeat(6, 1fr)',
              border: '1px solid #dee2e6',
            }}
          >
  
            <div
              style={{
                border: '1px solid #dee2e6',
                backgroundColor: '#f1f1f1',
              }}
            ></div>
            {timeSlots.map((slot) => (
              <div
                key={slot}
                style={{
                  border: '1px solid #dee2e6',
                  backgroundColor: '#f8f9fa',
                  textAlign: 'center',
                  padding: '4px',
                  fontWeight: 600,
                }}
              >
                {slot}
              </div>
            ))}

        
            {jsonOnly?.scheduleJson.map((entry) => (
              <React.Fragment key={entry.day}>
               
                <div
                  style={{
                    border: '1px solid #dee2e6',
                    textAlign: 'center',
                    fontWeight: 600,
                    color: '#6c757d',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  {entry.day}
                  {entry.time && (
                    <div style={{ fontSize: '0.7rem', color: '#888' }}>{entry.time}</div>
                  )}
                </div>

        
                {timeSlots.map((slot) => (
                  <div
                    key={slot}
                    style={{
                      border: '1px solid #dee2e6',
                      textAlign: 'center',
                      padding: '4px',
                    }}
                  >
                    {entry.slots?.[slot] && (
                      <div
                        style={{
                          borderRadius: '4px',
                          padding: '2px',
                          color: '#000',
                          whiteSpace: 'pre-line',
                          fontSize: '0.75rem',
                        }}
                      >
                        {entry.slots[slot]}
                      </div>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </Card>
      </Card>
  
            <div
              style={{
                border: '1px solid #dee2e6',
                backgroundColor: '#f1f1f1',
              }}
            ></div>
            {timeSlots.map((slot) => (
              <div
                key={slot}
                style={{
                  border: '1px solid #dee2e6',
                  backgroundColor: '#f8f9fa',
                  textAlign: 'center',
                  padding: '4px',
                  fontWeight: 600,
                }}
              >
                {slot}
              </div>
            ))}

        
            {jsonOnly?.scheduleJson.map((entry) => (
              <React.Fragment key={entry.day}>
               
                <div
                  style={{
                    border: '1px solid #dee2e6',
                    textAlign: 'center',
                    fontWeight: 600,
                    color: '#6c757d',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  {entry.day}
                  {entry.time && (
                    <div style={{ fontSize: '0.7rem', color: '#888' }}>{entry.time}</div>
                  )}
                </div>

        
                {timeSlots.map((slot) => (
                  <div
                    key={slot}
                    style={{
                      border: '1px solid #dee2e6',
                      textAlign: 'center',
                      padding: '4px',
                    }}
                  >
                    {entry.slots?.[slot] && (
                      <div
                        style={{
                          borderRadius: '4px',
                          padding: '2px',
                          color: '#000',
                          whiteSpace: 'pre-line',
                          fontSize: '0.75rem',
                        }}
                      >
                        {entry.slots[slot]}
                      </div>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </Card>
      </Card> */}
      <Card className="p-3 w-100 border-0 shadow-sm rounded-4" style={{ background: "#fff" }}>
        <h5 className="text-center fw-semibold mb-3">Time Table</h5>

        <div
          className="timetable-wrapper overflow-auto rounded-3"
          style={{ maxHeight: "60vh" }}
        >
          <div
            className="timetable-grid"
            style={{
              minWidth: "720px", // Enables horizontal scroll on small devices
              display: "grid",
              gridTemplateColumns: "100px repeat(6, 1fr)",
            }}
          >
            {/* Header Row */}
            <div style={{ backgroundColor: "#f1f1f1", border: "1px solid #dee2e6" }}></div>
            {timeSlots.map((slot, index) => (
              <div
                key={index}
                className="text-center fw-semibold py-2"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #dee2e6",
                  position: "sticky",
                  top: 0,
                  zIndex: 2,
                }}
              >
                {slot}
              </div>
            ))}

            {/* Rows for each day */}
            {jsonOnly?.scheduleJson.map((entry, i) => (
              <React.Fragment key={i}>
                {/* Day Column */}
                <div
                  className="text-center fw-semibold text-secondary"
                  style={{
                    backgroundColor: "#f9f9f9",
                    border: "1px solid #dee2e6",
                    padding: "10px 4px",
                    minHeight: "60px",
                    fontSize: "0.9rem",
                  }}
                >
                  {entry.day}
                  {entry.time && (
                    <div className="text-muted" style={{ fontSize: "0.7rem" }}>
                      {entry.time}
                    </div>
                  )}
                </div>

                {/* Time Slot Cells */}
                {timeSlots.map((slot, j) => (
                  <div
                    key={j}
                    className="text-center align-middle"
                    style={{
                      border: "1px solid #dee2e6",
                      padding: "8px 4px",
                      fontSize: "0.8rem",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {entry.slots?.[slot] && (
                      <div
                        style={{
                          backgroundColor: "#f0f4ff",
                          borderRadius: "6px",
                          padding: "4px 6px",
                          color: "#333",
                          fontWeight: 500,
                        }}
                      >
                        {entry.slots[slot]}
                      </div>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Card>


    </>
  );
};

export default TimeTable;


