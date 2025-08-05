import Img from "Components/Img/Img";
import { Card } from "react-bootstrap";
import Image from "Utils/Image";

const PerformanceHistoryBookCard = ({
    className = '', data = {}
}) => {


    return (
        <Card className={`border rounded-4 ${className} position-relative`}>
            <Card.Body className="row justify-content-between pb-1">
                <div className="col-2 text-center">
                    <Img src={Image?.pdfImage || ''} width="70%" height="70%" alt="pdf-image" />
                </div>
                <div className="col-9">
                    <p className="mb-1 fs-16">{data?.title || 'English Grammar Book term V1'}</p>
                    <p className="mb-0 fs-14">
                        Chapters:
                        <strong>{data?.chapters || 0}</strong>
                    </p>

                    <div className="col-12 text-end fs-12 text-secondary">
                        <span className="pe-2">16 Sep 2023 </span>
                        <span>11:21 AM</span>
                    </div>
                </div>

                <div className="performance_history_badge">
                    Developing
                </div>
            </Card.Body>
        </Card>
    )
}

export default PerformanceHistoryBookCard;