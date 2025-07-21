import React from 'react'
import { Card, Badge } from 'react-bootstrap';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import JsonDataStudent from '../Utils/JsonDataStudent';



const legendStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  fontSize: '14px',
};

const style = {
  width: '100%',
  height: '200px',
};

const historyData = [
  { name: 'Test Paper 1', chapter: 'Ch 1: Introduction', date: '2025-05-19', time: '10:30 AM' },
  { name: 'Test Paper 2', chapter: 'Ch 2: Plants', date: '2025-05-18', time: '02:15 PM' },
 
];


const Barchart = () => {


  const {jsonOnly} = JsonDataStudent();


    return (
        <>
            <Card className="card shadow-sm rounded border-0 mb-2">
                <Card.Body>
                    <Card.Title className="greeting-text mb-3">Performance</Card.Title>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center" style={style}>
                        {/* Chart */}
                        <div style={{ width: '60%', height: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="60%"
                                    outerRadius="100%"
                                    barSize={10}
                                    data={jsonOnly?.data}
                                    startAngle={90}
                                    endAngle={-270}
                                >
                                    <RadialBar
                                        minAngle={15}
                                        background
                                        clockWise
                                        dataKey="uv"
                                    />
                                </RadialBarChart>
                            </ResponsiveContainer>
                        </div>

                        <div style={{ width: '40%' }}>
                            <div style={legendStyle}>
                                {jsonOnly?.data.map((item) => (
                                    <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', }}>
                                        <div
                                            style={{
                                                width: '10px',
                                                height: '10px',
                                                borderRadius: '50%',
                                                backgroundColor: item.fill,
                                            }}
                                        />
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default Barchart
