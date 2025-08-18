import ButtonComponent from "Components/Button/Button";
import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";
import ModalComponent from "Components/Modal/Modal";
import { Card } from "react-bootstrap";
import Icons from "Utils/Icons";
import { updateAudioRecording, updateQuestionType } from "../Slices/StudentSlice";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import Image from "Utils/Image";
import Img from "Components/Img/Img";
import StatusCard from "Components/Card/StatusCard";
import JsonData from "./JsonData";


export function OverallModel() {
    const { commonState, studentState } = useCommonState();
    const dispatch = useDispatch()
    const navigate = useCustomNavigate()
    const { jsonOnly } = JsonData()


    const submitQuestionType = () => {
        if (studentState?.question_type == "mcq_questions") {
            navigate('mcq_questions')
            dispatch(updateModalShow({ show: false }))
        } else if (studentState?.question_type == "long_questions") {
            navigate('long_questions')
            dispatch(updateModalShow({ show: false }))

        }
    }

    function modalHeaderFun() {
        switch (commonState?.modal?.from) {
            case "Home":
                switch (commonState?.modal?.type) {
                    case "":
                        return <h5>Home</h5>

                    default:
                        break;
                }
            case "Generate_Question":
                switch (commonState?.modal?.type) {
                    case "select_question_type":
                        return <h5 className="text-secondary fw-bold">Select Question Type</h5>
                    case "record_audio":
                        return <h5 className="text-secondary">Record your Answer</h5>
                    case "test_result":
                        return <h5 className="text-secondary">Status - Emergent</h5>

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }

    function modalBodyFun() {
        switch (commonState?.modal?.from) {
            case "Home":
                switch (commonState?.modal?.type) {
                    case " ":
                        return;
                    default:
                        break;
                }
                break;

            case "Generate_Question":
                switch (commonState?.modal?.type) {
                    case "select_question_type":
                        return (
                            <div>
                                <div className="d-flex justify-content-center align-items-center gap-3">
                                    <Card
                                        className={
                                            studentState?.question_type === "mcq_questions"
                                                ? "brand_color shadow-sm py-3 active-card border-0"
                                                : "shadow-lg py-3 inactive-card border-0"
                                        }
                                        onClick={() => dispatch(updateQuestionType("mcq_questions"))}
                                    >
                                        <Card.Body className="p-2 d-flex flex-column align-items-center gap-2">
                                            <span>{studentState?.question_type === "mcq_questions" ? Icons.mcqActiveIcon : Icons.mcqIcon}</span>
                                            <p
                                                className={
                                                    studentState?.question_type === "mcq_questions"
                                                        ? "mb-0 text-white text-center fs-5"
                                                        : "mb-0 text-secondary text-center fs-5"
                                                }
                                            >
                                                Multiple Choice Questions
                                            </p>
                                        </Card.Body>
                                    </Card>

                                    <Card
                                        className={
                                            studentState?.question_type === "long_questions"
                                                ? "brand_color shadow-sm py-3 active-card border-0"
                                                : "shadow-lg py-3 inactive-card border-0"
                                        }
                                        onClick={() => dispatch(updateQuestionType("long_questions"))}
                                    >
                                        <Card.Body className="p-2 d-flex flex-column align-items-center gap-2">
                                            <span>{studentState?.question_type === "long_questions" ? Icons.longQueActiveIcon : Icons.longQueIcon}</span>
                                            <p
                                                className={
                                                    studentState?.question_type === "long_questions"
                                                        ? "mb-0 text-white text-center fs-5"
                                                        : "mb-0 text-secondary text-center fs-5"
                                                }
                                            >
                                                Long Answer Questions
                                            </p>
                                        </Card.Body>
                                    </Card>
                                </div>

                                <div className="d-flex justify-content-end mt-5">
                                    <ButtonComponent
                                        type="button"
                                        buttonName="Continue"
                                        className="brand_color text-white"
                                        clickFunction={submitQuestionType}
                                    />
                                </div>
                            </div>
                        );


                    case "record_audio":
                        return studentState?.recording === "completed" ? (
                            <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                            <div className="d-flex justify-content-center align-items-center gap-2 w-100 px-5">
                                <span>{Icons.playIcon}</span>
                                <Img
                                    src={Image?.record_isolation}
                                    alt="Record"
                                    fluid
                                    width="100%"
                                    height="100%"
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                            <ButtonComponent type="button" className="btn-brand-color px-5" buttonName="Continue"  />
                            </div>
                        ) : (
                            <div
                                className="d-flex flex-column justify-content-center align-items-center w-100"
                                onClick={() => {
                                    dispatch(updateAudioRecording("recording"))
                                    setTimeout(() => {
                                        dispatch(updateAudioRecording("completed"))
                                    }, 5000)
                                }}
                            >
                                <Img
                                    src={studentState?.recording === "recording" ? Image?.recording : Image?.record}
                                    alt="Record"
                                    fluid
                                    width="100px"
                                    height="100%"
                                    style={{ cursor: "pointer" }}
                                />
                                <p className="text-secondary fw-bold fs-5 mt-2">
                                    {studentState?.recording === "recording"
                                        ? "Recording..."
                                        : "Tap and Start speaking..."}
                                </p>
                            </div>
                        );
                    case 'test_result':
                        return (jsonOnly?.cardDetails?.map((card) => {
                            return <StatusCard cardTitle={card.cardTitle} titleValue={card.titleValue} explanation={card.explanation} />
                        })
                        )


                    default:
                        return null;
                }
                break;

            default:
                break;
        }
    }


    function modalFooterFun() {
        switch (commonState?.modal?.from) {
            case "Generate_Question":
                switch (commonState?.modal?.type) {
                    case "test_result":
                        return <div className="d-flex gap-3">
                            <ButtonComponent type="button" buttonName="Cancell" className="custom-btn" clickFunction={()=>dispatch(updateModalShow({show:false}))} />
                            <ButtonComponent type="button" buttonName="Take a Retest" className="brand_color text-white" clickFunction={() => dispatch(updateModalShow({ show: true, close_btn: true, size: "md", modal_from: "Generate_Question", modal_type: "select_question_type" }))} />
                        </div>

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }

    return (
        <ModalComponent
            show={commonState?.modal?.show}
            modalSize={commonState?.modal?.size}
            modalCentered={true}
            modalCloseButton={commonState?.modal?.close_btn}
            showModalHeader={true}
            modalHeaderClassname="border-0"
            modalHeader={modalHeaderFun()}
            modalBodyClassname="py-2"
            modalBody={<div className='d-flex flex-wrap p-3 py-0'>{modalBodyFun()}</div>}
            showModalFooter={true}
            modalFooterClassname="border-0"
            modalFooter={modalFooterFun()}
            modalClassname={["lg", "xl"].includes(commonState?.modal?.size) ? "model_height_lg" : ''}
        />
    )
}