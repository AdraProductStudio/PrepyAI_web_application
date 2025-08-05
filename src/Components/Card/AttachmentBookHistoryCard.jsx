import PerformanceHistoryBookCard from "./PerformanceHistoryBookCard";

const { Card } = require("react-bootstrap");

const AttachmentBookHistoryCard = ({
    className,
}) => {

    return (
        <Card className={`shadow-sm border-0 rounded-4 attachment_book_history ${className}`}>
            <Card.Header className="border-bottom bg-transparent p-3">
                <Card.Title className="fs-16 mb-0">History</Card.Title>
            </Card.Header>

            <Card.Body className="">
                {Array.from({ length: 4 }).map((_, index) => (
                     <PerformanceHistoryBookCard className="p-3 pb-1 mb-2" key={index} />
                ))}
            </Card.Body>
        </Card>
    )
}

export default AttachmentBookHistoryCard;