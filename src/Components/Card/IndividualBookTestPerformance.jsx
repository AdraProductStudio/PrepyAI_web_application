import PerformanceAndHistoryChart from "Components/Charts/PerformanceAndHistoryChart";
import { Card } from "react-bootstrap";
import JsonData from "Views/Students/Utils/JsonData";

const IndividualBookTestPerformance = () => {
    const { jsonOnly } = JsonData();

    return (
        <Card className="shadow-sm rounded-4 border-0">
            <Card.Header className="bg-transparent border-0 py-3 border-bottom">
                Performance
            </Card.Header>
            <Card.Body className="py-4">
                <div className="row align-items-center">
                    <div className="col-12 col-md-6 d-flex justify-content-center">
                        <PerformanceAndHistoryChart data={jsonOnly?.bookTest} />
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="d-flex flex-column justify-content-between">
                            {jsonOnly?.data?.map((item) => (
                                <div key={item.name} className="d-flex justify-content-center align-items-center mb-2">
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.fill, marginRight: '5px' }} />
                                    <span>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default IndividualBookTestPerformance;