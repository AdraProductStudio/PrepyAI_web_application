import React from 'react'
import { Badge, Card } from 'react-bootstrap'
import Image from 'Utils/Image';
import JsonDataStudent from '../Utils/JsonDataStudent';



const History = () => {
    const { jsonOnly } = JsonDataStudent();

    return (
        <>

            <Card
                className="card px-2 py-1 border-0"
                style={{ height: "53.8vh", maxHeight: "69vh" }}
            >
                <Card.Body className="d-flex flex-column h-100">

                    <div>
                        <Card.Title className="mb-1 greeting-text">History</Card.Title>
                        <hr style={{ marginTop: 4, marginBottom: 8 }} />
                    </div>


                    <div className="custom-scroll" style={{ overflowY: "auto", flex: 1, paddingRight: "6px" }} >
                        {jsonOnly?.historyData2.map((item, idx) => (
                            <Card
                                key={idx}
                                className="mb-2 shadow-sm border-0 rounded-3 position-relative"
                            >
                                <Badge
                                    className="position-absolute top-0 end-0 m-0 px-2 py-1"
                                    style={{
                                        borderRadius: "10px",
                                        fontSize: "0.6rem",
                                        zIndex: 1,
                                        backgroundColor: "#dbe2feff",
                                        color: "#FFF"
                                    }}
                                >
                                    {item.status}
                                </Badge>

                                <Card.Body className="d-flex align-items-center flex-wrap rounded border p-3 small mt-">
                                    <img
                                        src={Image.Pdf}
                                        alt="pdf"
                                        className="img-fluid"
                                        style={{ width: 40, marginRight: 15 }}
                                    />

                                <div className="flex-grow-1 min-w-0">
                                        <div className="greeting-text text-truncate">{item.name}</div>
                                        <div className="text-muted small text-truncate">{item.chapter}</div>
                                        <div className="text-muted small text-truncate ">
                                            {item.date} &nbsp;&nbsp; {item.time}
                                        </div>
                                    </div> 
                                </Card.Body>
                            </Card>
                        ))}
                    </div>



                </Card.Body>
            </Card>
        </>
    )
}

export default History