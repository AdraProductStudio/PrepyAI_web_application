import ButtonComponent from "Components/Button/Button";
import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { encryptData } from "Security/Crypto/Crypto";
import Icons from "Utils/Icons";

const TestDisplayCard = ({
    data = {}

}) => {
    const navigate = useNavigate();
    const { class_id, subject_id } = useParams();

    function handleShowTable(status) {
        switch (status) {
            case "Completed":
                return navigate(`/teachers_dashboard/classrooms/${class_id}/${subject_id}/test_history?data=${encryptData({ test_id: data?.test_id, mode: data?.mode })}`);

            case "Not Completed":
                return navigate(`/test/details?status=NotCompleted`);

            default:
                return null
        }
    }
    function ongoingStatus(status) {
        switch (status) {
            case "Completed":
                return <div className="test_completed">
                    Completed
                </div>

            case "Not Completed":
                return <div className="test_not_completed">
                    Not Completed
                </div>

            default:
                return null
        }
    }

    function displayCard() {
        const path = window.location.pathname;
        switch (true) {
            case /test\/ongoing_test/.test(path):
                return <div className="p-2 pointer" onClick={() => handleShowTable("Completed")}>
                    <div className="w-100 row align-items-end">
                        <div className="col-8">
                            <h6 className="">{data?.title || 'heading'}</h6>
                            <p className="fs-13 text-secondary mb-1">{data?.test_date || ''} | {data?.test_time || ''}</p>
                            <p className="fs-13 text-secondary mb-1">{data?.mode}</p>
                        </div>
                        <div className="col-4">
                            <div className="upcoming_card_time">
                                {Icons.upcoming_card_clock_icon}
                                30 mins
                            </div>
                        </div>
                    </div>
                    <div className="cursor-pointer text-success mt-2" >
                        {ongoingStatus("Completed")}
                    </div>
                    <div
                        className="cursor-pointer text-danger mt-2"
                        onClick={() => handleShowTable("NotCompleted")}>
                        {ongoingStatus("NotCompleted")}
                    </div>
                </div>

            case /test\/completed_test/.test(path):
                return <div className="p-2">
                    <div className="w-100">
                        <h6 className="">{data?.test_name || ''}</h6>
                        <p className="fs-13 text-secondary mb-1">{data?.test_date || ''} | {data?.test_time || ''}</p>
                        <p className="fs-13 text-secondary mb-1">{data?.mode}</p>
                    </div>
                </div>

            case /test/.test(path):
                return <div className="p-2">
                    <div className="w-100 row">
                        <div className="col-8">
                            <h6 className="">{data?.title || 'heading'}</h6>
                            <p className="fs-13 text-secondary mb-1">{data?.test_date || ''} | {data?.test_time || ''}</p>
                            <p className="fs-13 text-secondary mb-1">{data?.mode}</p>
                        </div>
                        <div className="col-4">
                            <div className="col-12 text-end">
                                <ButtonComponent type="button" className="bg-transparent" buttonName={Icons.delete_icons} />
                            </div>
                            <div className="upcoming_card_time">
                                {Icons.upcoming_card_clock_icon}
                                30 mins
                            </div>
                        </div>
                    </div>
                </div>

            default:
                return null
        }
    }

    return (
        <Card className="border-0 shadow-sm rounded-4 position-relative">
            <Card.Body className="test_card_color">
                {displayCard()}
            </Card.Body>
        </Card>
    )
}

export default TestDisplayCard;