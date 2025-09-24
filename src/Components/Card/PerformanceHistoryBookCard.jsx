import Img from "Components/Img/Img";
import { Card } from "react-bootstrap";
import Image from "Utils/Image";

const PerformanceHistoryBookCard = ({
    className = '', data = {}
}) => {

 function dynamicColor(status){
    switch(status){
      case "emergent":
        return "#4B3CFA"
      case "developing":
        return "#45D655"
      case "exemplar":
        return "#EC008C"
    }
  }
    return (
        <Card className={`border rounded-4 ${className} position-relative`}>
            <Card.Body className="row justify-content-between pb-1">
                <div className="col-2 text-center">
                    <Img src={Image?.pdfImage || ''} width="70%" height="70%" alt="pdf-image" />
                </div>
                <div className="col-9">
                    <p className="mb-1 fs-16">{data?.test_name || 'English Grammar Book term V1'}</p>
                    <p className="mb-0 fs-14">
                        Chapters:
                        <strong>{data?.chapter_count || 0}</strong>
                    </p>

                    <div className="col-12 text-end fs-12 text-secondary">
                        <span>{data?.test_date || null}</span>
                        <br/>
                        <span>{data?.test_time || 0}</span>
                    </div>
                </div>

                <div className="performance_history_badge" style={{backgroundColor:dynamicColor(data?.performance_status)}}>
                   {data?.performance_status}
                </div>
            </Card.Body>
        </Card>
    )
}

export default PerformanceHistoryBookCard;