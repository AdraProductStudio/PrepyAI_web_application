import Img from "Components/Img/Img";
import PerformanceHistoryBookCard from "./PerformanceHistoryBookCard";
import Image from "Utils/Image";
import SpinnerComponent from "Components/Spinner/Spinner";
import { useCommonState } from "Components/CustomHooks";

const { Card } = require("react-bootstrap");

const AttachmentBookHistoryCard = ({
    bookTestHistory,
    className,
}) => {
     const {studentState} = useCommonState()
    return (
        <Card className={`shadow-sm border-0 rounded-4 attachment_book_history ${className}`}>
            <Card.Header className="border-bottom bg-transparent p-3">
                <Card.Title className="fs-16 mb-0">History</Card.Title>
            </Card.Header>

            <Card.Body className="">
                {
                    studentState?.book_test_history_loading ? <div className="d-flex justify-content-center align-items-center" style={{minHeight: "300px"}}>
                        <SpinnerComponent /> <p className="m-0">loading...</p>
                    </div>
                        :
                        bookTestHistory.length > 0 ? (
                            bookTestHistory.map((test, idx) => (
                                <div key={idx}>
                                    <PerformanceHistoryBookCard className="p-3 pb-1 mb-2" data={test} />
                                </div>
                            ))
                        ) : (
                            <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{ minHeight: '300px' }}>
                                <span><Img src={Image.no_data_found} width={80} /></span>
                                <p>No test history</p>
                            </div>
                        )
                }
            </Card.Body>
        </Card>
    )
}

export default AttachmentBookHistoryCard;