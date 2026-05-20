import { Card } from "react-bootstrap";
import Icons from "Utils/Icons";

const StudentOverviewCard = ({
    style, className,data
}) => {

    return (
        <Card className={`h-100 border-0 rounded-3 shadow-sm ${className}`} style={style}>
            <Card.Body className="p-4">
                <div className="overview_calender_icon">
                    {Icons.calender_icon}
                </div>
                <div className="pt-3">
                    <h6 className="fw-bold">{data?.question_types || ''}</h6>
                    <div className="student_overview_content mt-3 row">
                        <div className="col border-end">
                            {Icons?.no_of_books}
                            <span className="fs-14 ps-2">{data?.no_of_books || 0}</span>
                        </div>
                        <div className="col ps-3">
                            {Icons?.single_book_icon}
                            <span className="fs-14 ps-2">{data?.no_of_tests || 0}</span>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default StudentOverviewCard;