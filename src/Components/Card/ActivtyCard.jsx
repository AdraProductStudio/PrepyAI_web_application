import { useEffect, useState } from "react";
import ButtonComponent from "Components/Button/Button";
import { Card } from "react-bootstrap";
import Icons from "Utils/Icons";

const ActivityCard = ({ data, startFunction }) => {
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        function checkTime() {
            const testTime = new Date(data?.time_stamp).getTime()
            const now = new Date(new Date().toUTCString()).getTime()
            setDisabled(now < testTime)
        }

        checkTime();
        const timer = setInterval(checkTime, 20000)

        return () => clearInterval(timer)
    }, [data?.time_stamp])

    function dynamicContent() {
        const path = window.location.pathname;

        switch (true) {
            case /student_dashboard/.test(path):
                return (
                    <div className="col row">
                        <div className="col-8 px-2">
                            <h6 className="mb-1 fs-14">{data?.test_name}</h6>
                            <p className="text-secondary fs-13 mb-0">
                                <span>{data?.mode_of_test} - {data?.type_of_question}</span>
                                <br />
                                <span>{data?.test_date}, {data?.test_time}</span>
                            </p>
                        </div>
                        <div className="col-4 text-end">
                            {data?.mode_of_test == "Offline" ? null :
                                <ButtonComponent
                                    type="button"
                                    className="btn btn-brand-color"
                                    buttonName="Start test"
                                    clickFunction={startFunction}
                                    btnDisable={disabled}
                                />
                            }
                            
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