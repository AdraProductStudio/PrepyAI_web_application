import ButtonComponent from "Components/Button/Button";
import { Card } from "react-bootstrap"
import { data } from "react-router-dom";
import Icons from "Utils/Icons";

const ActivityCard = ({data}) => {
    function dynamicContent() {
        const path = window.location.pathname;
        switch (true) {
            case /student_dashboard/.test(path):
                return (
                    <div className="col row">
                        <div className="col-8 px-2">
                            <h6 className="mb-1 fs-14">Class 12 th Maths Test</h6>
                            <p className="text-secondary fs-13 mb-0">Online - (Multiple Questions) May 12, 2025, 11:30am</p>
                        </div>
                        <div className="col-4 text-end">
                            <ButtonComponent
                                type="button"
                                className="btn btn-brand-color"
                                buttonName="Start test"
                                clickFunction={() => console.log("View Details Clicked")}
                            />
                        </div>
                    </div>
                )

            case /teachers_dashboard/.test(path):
                return (
                    <div className="col">
                        <h6 className="mb-1 fs-14">{data?.classroom_name || "" + " "+ data?.subject_name || ""}</h6>
                        <p className="text-secondary fs-13 mb-0">{data?.mode_of_test || ""} - ({data?.type_of_question || ""}) {data?.test_date || ""}, {data?.test_time || ""}</p>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <Card className='border rounded-3 mb-2'>
            <Card.Body className="row align-items-center">
                <div className="col-2">
                    <div className="activity_bell_icon">
                        {Icons.activity_bell_icon}
                    </div>
                </div>
                {dynamicContent()}
            </Card.Body>
        </Card>
    )
}

export default ActivityCard;