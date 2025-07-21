import React from 'react';
import JsonDataStudent from '../Utils/JsonDataStudent';

const timeSlots = ['8 AM', '10 AM', '12 PM', '2 PM', '3 PM', '5 PM'];

const TimeTable = () => {
  const { jsonOnly } = JsonDataStudent();
  return (
    <>
      <div className='mt-2'>
        <h5 className="text-center text-muted" style={{ fontWeight: 500 }}>Time Table</h5>
      </div>
      <div 
        style={{
          height: '278px',
          width: '100%',
          overflowY: 'auto',
          background: '#fff',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          fontFamily: 'Arial, sans-serif',
          fontSize: '0.85rem'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '80px repeat(6, 1fr)',
            border: '1px solid #dee2e6',
          }}
        >
          {/* Top row (time slots) */}
          <div style={{ border: '1px solid #dee2e6', backgroundColor: '#f1f1f1' }}></div>
          {timeSlots.map((slot) => (
            <div
              key={slot}
              style={{
                border: '1px solid #dee2e6',
                backgroundColor: '#f8f9fa',
                // fontWeight: 'bold',
                textAlign: 'center',
                padding: '4px',
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
                  color: "#AEB9E1",
                  fontWeight: 600,
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
      </div>
    </>
  );
};

export default TimeTable;


