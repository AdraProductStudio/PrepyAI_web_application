import ButtonComponent from "Components/Button/Button";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { encryptData } from "Security/Crypto/Crypto";
import Icons from "Utils/Icons";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { deleteUpcomingTest } from "Views/Teachers/Actions/teacherAction";

const TestDisplayCard = ({
    data = {}

}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { class_id, subject_id } = useParams();

    function canDeleteTest(data) {
        if (!data?.owned) return false;
        if (data?.status === "completed" || data?.status === "cancelled") return false;
        // if (data?.status === "ongoing") return false;
        if (data?.time_stamp) {
            const testTime = new Date(data.time_stamp).getTime();
            const now = new Date().getTime();
            const oneHour = 60 * 60 * 1000;
            if (testTime - now <= oneHour) {
                return false;
            }
        }
        return true;
    }


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
            case "completed":
                return <div className="test_completed">
                    Completed
                </div>

            case "not_completed":
                return <div className="test_not_completed">
                    Not Completed
                </div>
            case "ongoing":
                return <div className="test_ongoing">
                    Ongoing
                </div>

            default:
                return null
        }
    }

    function displayCard(status) {
        switch (status) {
            case "ongoing":
                return <div className="p-2 pointer" onClick={() => {handleShowTable("Completed")}}>
                    <div className="w-100 row align-items-end">
                        <div className="col-8">
                            <h6 className="">{data?.test_name || 'heading'}</h6>
                            <p className="fs-13 text-secondary mb-1">{data?.test_date || ''} | {data?.test_time || ''}</p>
                            <p className="fs-13 text-secondary mb-1">{data?.mode}</p>
                        </div>
                        <div className="col-4">
                            <div className="col-12 text-end">
                                {canDeleteTest(data) ?
                                    <ButtonComponent
                                        type="button"
                                        className="bg-transparent"
                                        buttonName={Icons.delete_icons}
                                        clickFunction={() => {
                                            dispatch(updateModalShow({
                                                show: true, close_btn: true, modal_from: "techaersdeletemodal", modal_type: "techaersdeletemodal",
                                                data: () => dispatch(deleteUpcomingTest({ id: data?.test_id, subject_id, classroom_id: class_id, status: data?.status })),
                                            }))
                                        }}
                                    /> : null
                                }
                            </div>
                            <div className="upcoming_card_time">
                                {Icons.upcoming_card_clock_icon}
                                {data?.test_duration} mins
                            </div>
                        </div>
                    </div>
                   <div className="cursor-pointer text-success mt-2" >
                        {ongoingStatus(data?.status)}
                    </div>
                    <div
                        className="cursor-pointer text-danger mt-2"
                        onClick={() => handleShowTable("not_completed")}>
                        {ongoingStatus("not_completed")}
                    </div>
                </div>

            case "completed":
                return <div className="p-2"  onClick={() => {handleShowTable("Completed")} } >
                    <div className="w-100">
                        <h6 className="">{data?.test_name || ''}</h6>
                        <p className="fs-13 text-secondary mb-1">{data?.test_date || ''} | {data?.test_time || ''}</p>
                        <p className="fs-13 text-secondary mb-1">{data?.mode}</p>
                    </div>
                </div>

            case  "upcoming":
                return (
                  <div className="p-2">
                    <div className="w-100 row">
                      <div className="col-8">
                        <h6 className="">{data?.test_name || "heading"}</h6>
                        <p className="fs-13 text-secondary mb-1">
                          {data?.test_date || ""} | {data?.test_time || ""}
                        </p>
                        <p className="fs-13 text-secondary mb-1">
                          {data?.mode}
                        </p>
                      </div>
                      <div className="col-4">
                        <div className="col-12 text-end">
                            {canDeleteTest(data) ?
                                 <ButtonComponent   
                                   type="button"
                                    className="bg-transparent"
                                    buttonName={Icons.delete_icons}
                                    clickFunction={() => {
                                        dispatch(updateModalShow({
                                        show: true, close_btn: true, modal_from: "techaersdeletemodal", modal_type: "techaersdeletemodal",
                                        data: () => dispatch(deleteUpcomingTest({ id: data?.test_id, subject_id, classroom_id: class_id, status: data?.status })),
                                        }))}}
                                        /> : null
                            }
                        </div>
                        <div className="upcoming_card_time">
                          {Icons.upcoming_card_clock_icon}
                          {data?.test_duration} mins
                        </div>
                      </div>
                    </div>
                  </div>
                );
             case "cancelled":
                return <div className="p-2">
                    <div className="w-100">
                        <h6 className="">{data?.test_name || ''}</h6>
                        <p className="fs-13 text-secondary mb-1">{data?.test_date || ''} | {data?.test_time || ''}</p>
                        <p className="fs-13 text-secondary mb-1">{data?.mode}</p>
                    </div>
                </div>

            default:
                return null
        }
    }

    return (
        <Card className="border-0 shadow-sm rounded-4 position-relative">
            <Card.Body className="test_card_color">
                {displayCard(data?.status)}
            </Card.Body>
        </Card>
    )
}

export default TestDisplayCard;