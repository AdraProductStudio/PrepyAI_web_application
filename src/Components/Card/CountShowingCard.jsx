import { Card } from "react-bootstrap";

const CountShowingCard = ({
    className,
    data = {},
}) => {

    function displayCard() {
        const path = window.location.pathname;
        switch (true) {
            case /teachers_dashboard/.test(path):
                return <div className="p-3">
                    <div className="w-100 row align-items-center">
                        <div className="col-8">
                            <div className="student_dashboard_icon">{data?.icon}</div>
                        </div>
                        <div className="col-4 text-center">
                            <h5>{data?.count}</h5>
                        </div>
                    </div>
                    <div className="col-12 pt-4">
                        <h6 className="text-muted mb-0">{data?.description}</h6>
                    </div>
                </div>

            case /admin_dashboard/.test(path):
                return <div className="p-3">
                    <div className="mb-3">
                        <div className="student_dashboard_icon">{data?.icon}</div>
                    </div>
                    <div className="mb-3">
                        <h6 className="text-muted mb-0">{data?.description}</h6>
                    </div>
                    <h5>{data?.count}</h5>
                </div>

            default:
                return null
        }
    }

    return (
        <Card className={`h-100 border-0 rounded-4 shadow-sm ${className}`}>
            <Card.Body>
                {displayCard()}
            </Card.Body>
        </Card>
    );
}

export default CountShowingCard;