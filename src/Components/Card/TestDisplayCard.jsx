import ButtonComponent from "Components/Button/Button";
import { Card } from "react-bootstrap";
import Icons from "Utils/Icons";

const TestDisplayCard = ({
    data = {}
}) => {
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
                return <div className="p-2">
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
                    {ongoingStatus("Completed")}
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
                                <ButtonComponent type="button" className="bg-transparent" buttonName={Icons.upcoming_test_edit_icon} />
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