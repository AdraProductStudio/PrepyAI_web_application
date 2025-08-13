import PerformanceHistoryBookCard from "./PerformanceHistoryBookCard";

const { Card } = require("react-bootstrap");

const AttachmentBookHistoryCard = ({
    bookTestHistory,
    className,
}) => {

    return (
        <Card className={`shadow-sm border-0 rounded-4 attachment_book_history ${className}`}>
            <Card.Header className="border-bottom bg-transparent p-3">
                <Card.Title className="fs-16 mb-0">History</Card.Title>
            </Card.Header>

            <Card.Body className="">
            {
                bookTestHistory.length > 0 ? (
                    bookTestHistory.map((test, idx)=>(
                        <div key={idx}>
                           <PerformanceHistoryBookCard className="p-3 pb-1 mb-2" data={test} />
                        </div>
                    ))
                ):(
                    <p className="text-center">No History</p>
                )
            }
            </Card.Body>
        </Card>
    )
}

export default AttachmentBookHistoryCard;