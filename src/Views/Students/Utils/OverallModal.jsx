import ButtonComponent from "Components/Button/Button";
import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";
import Img from "Components/Img/Img";
import Input from "Components/Input/Input";
import InputGroup from "Components/Input/InputGroup";
import ModalComponent from "Components/Modal/Modal";
import { useRef } from "react";
import Icons from "Utils/Icons";
import Image from "Utils/Image";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { handleEditProfileDetails, handleJoinClassRoom, handleStartTest, handleSubmitTest, handleUploadLearnerBook, handleUploadTestPaper } from "../Actions/StudentAction";
import { setClassroomCode, setUploadLearnerBook, setUploadTestPaper } from "../Slices/StudentSlice";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import JsonData from "./JsonData";
import SpinnerComponent from "Components/Spinner/Spinner";
import { Card } from "react-bootstrap";
import { updateAudioRecording, updateQuestionType } from "../Slices/StudentSlice";
import StatusCard from "Components/Card/StatusCard";
import { postTeacherNote } from "Views/Common/Actions/Common_action";

export function OverallModel() {
    const { commonState, studentState } = useCommonState();
    const fileInputRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useCustomNavigate()
    const { jsonOnly, jsxJson } = JsonData()

    const handleUpload = (type) => {
        const formData = new FormData()

        if (type === 'learner_book') {
            formData.append("book_name", studentState?.upload_learner_book?.book_name)
            formData.append("book", studentState?.upload_learner_book?.book_file)
            dispatch(handleUploadLearnerBook(formData))
        }
        if (type === 'test_paper') {
            formData.append("test_name", studentState?.upload_test_paper?.test_name)
            formData.append("test_id", studentState?.upload_test_paper?.test_id)
            formData.append("register_number", studentState?.upload_test_paper?.register_number)
            formData.append("test_paper", studentState?.upload_test_paper?.test_file)

            dispatch(handleUploadTestPaper(formData))
        }
    }

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
            case "dashboard":
                switch (commonState?.modal?.type) {
                    case "upload_book":
                        return <h5>Upload Book</h5>
                    case "upload_test_paper":
                        return <h5>Upload Test Paper</h5>
                    case "start_test":
                        return <h5>Start Test</h5>
                    default:
                        break;
                }
                break;

            case "subjects":
                switch (commonState?.modal?.type) {
                    case "add_class":
                        return <h5>Join class room</h5>
                    default:
                        break;
                }
                break;

            case "notes":
                switch (commonState?.modal?.type) {
                    case "add_note":
                        return <h5 className="m-0 ps-4">Add  Notes</h5>

                    default:
                        break;
                }
                break;
            
            case "profile":
                switch (commonState?.modal?.type) {
                    case "edit_profile":
                        return <h5>Edit Profile</h5>
                    default:
                        break
                }
                break;

            default:
                break;
        }
    }

    function modalBodyFun() {
        switch (commonState?.modal?.from) {
            case "dashboard":
                switch (commonState?.modal?.type) {
                    case "upload_book":
                        return <div className='p-2'>
                            {Inputfunctions(jsxJson.uploadBook)}
                            <div className="d-flex justify-content-center align-items-center p-3 my-3 upload_book_div">
                                <div className="mx-3 pointer">
                                    <span style={{ display: "none" }}>
                                        <Input
                                            type='file'
                                            inputAccept=".pdf,.doc,.docx"
                                            name="bookFile"
                                            ref={fileInputRef}
                                            change={(e) => {
                                                const file = e.target.files[0]
                                                if (file) dispatch(setUploadLearnerBook({ type: "set", book_file: file }))
                                            }}
                                        />
                                    </span>
                                    <span className="d-flex" onClick={() => fileInputRef.current && fileInputRef.current.click()}>{Icons.studentUploadLarge}</span>
                                </div>
                                <div className="pt-3">
                                    {studentState?.upload_learner_book?.book_file ? (
                                            <small className="m-0">{studentState.upload_learner_book.book_file.name}</small>
                                    ) : (
                                        <>
                                            <strong>Browse your book</strong>
                                            <p>Formats pdf, docs, doc & Max file size 1 GB</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="">
                                    <ButtonComponent
                                        type="button"
                                        className="btn border border-dark px-5"
                                        buttonName="Cancel"
                                        clickFunction={() => dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))}
                                    />
                                </div>
                                <div>
                                    <ButtonComponent
                                        type="button"
                                        className="btn btn-brand-color px-5 py-2"
                                        // buttonName={`${studentState?.upload_learner_book.loading ? 'Uploading...' : 'Upload'}`}
                                        buttonName={studentState?.upload_learner_book?.loading ? (
                                            <div className="d-flex justify-content-center align-items-center">
                                                <p className="m-0">Uploading...</p> <SpinnerComponent className="my-0 ms-2 p-0" />
                                            </div>)
                                            : ('Upload')
                                        }
                                        clickFunction={() => handleUpload('learner_book')}
                                    />
                                </div>
                            </div>
                        </div>

                    case "start_test":
                        return <div className="">
                            <div className="text-center">
                                <span><Img src={Image.start_test_pic} width={200} /></span>
                                <p className="gradient-text my-3">Are you sure do you want to Start Test</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="">
                                    <ButtonComponent
                                        type="button"
                                        className="btn border border-dark px-5"
                                        buttonName="Cancel"
                                        clickFunction={() => dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))}
                                    />
                                </div>
                                <div>
                                
                                    <ButtonComponent
                                        type="button"
                                        className="btn btn-brand-color px-5 py-2"
                                        buttonName={studentState?.mcq_loading ? (
                                            <div className="d-flex justify-content-center align-items-center">
                                                <p className="m-0">Starting...</p> <SpinnerComponent className="p-0 my-0 ms-2" />
                                            </div>)
                                            : ('Start')
                                        }
                                        clickFunction={() => dispatch(handleStartTest(studentState?.test_id, navigate))}
                                        // clickFunction={() => setTimeout(()=>dispatch(handleStartTest(studentState?.test_id, navigate)), 1000) }
                                    />
                                </div>
                            </div>
                        </div>
                    case "upload_test_paper":
                        return <div>
                            {Inputfunctions(jsxJson.uploadTest)}
                            <div className="d-flex justify-content-center align-items-center p-3 m-2 my-4 upload_book_div">
                                <div className="mx-3 pointer">
                                    <span style={{ display: "none" }}>
                                        <Input
                                            type='file'
                                            inputAccept=".pdf,.doc,.docx"
                                            name="bookFile"
                                            ref={fileInputRef}
                                            change={(e) => {
                                                const file = e.target.files[0]
                                                if (file) dispatch(setUploadTestPaper({ type: "set", test_file: file }))
                                            }}
                                        />
                                    </span>
                                    <span className="d-flex" onClick={() => fileInputRef.current && fileInputRef.current.click()}>{Icons.studentUploadLarge}</span>
                                </div>
                                <div className="pt-3">
                                    {studentState?.upload_test_paper?.test_file ? (
                                            <small className="m-0">{studentState.upload_test_paper.test_file.name}</small>
                                    ) : (
                                        <>
                                            <strong>Browse your test file</strong>
                                            <p>Formats pdf, docs, doc & Max file size 1 GB</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="">
                                    <ButtonComponent
                                        type="button"
                                        className="btn border border-dark px-5"
                                        buttonName="Cancel"
                                        clickFunction={() => dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))}
                                    />
                                </div>
                                <div>
                                    <ButtonComponent
                                        type="button"
                                        className="btn btn-brand-color px-5 py-2"
                                        // buttonName={`${studentState?.upload_test_paper.loading ? 'Uploading...' : 'Upload'}`}
                                        buttonName={studentState?.upload_test_paper?.loading ? (
                                            <div className="d-flex justify-content-center align-items-center">
                                                <p className="m-0">Uploading...</p> <SpinnerComponent className="p-0 my-0 ms-2" />
                                            </div>)
                                            : ('Upload')
                                        }
                                        clickFunction={() => handleUpload('test_paper')}
                                    />
                                </div>
                            </div>
                        </div>

                    default:
                        break;
                }
                break;

            case "subjects":
                switch (commonState?.modal?.type) {
                    case "add_class":
                        return <div>
                            {Inputfunctions(jsxJson.classroom)}
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="">
                                    <ButtonComponent
                                        type="button"
                                        className="btn border border-dark px-5"
                                        buttonName="Cancel"
                                        clickFunction={() => {
                                            dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
                                            dispatch(setClassroomCode({ type: 'set', classroom_code: '' }))
                                        }
                                        }
                                    />
                                </div>
                                <div>
                                    <ButtonComponent
                                        type="button"
                                        className="btn btn-brand-color px-5 py-2"
                                        buttonName="Join"
                                        clickFunction={() => dispatch(handleJoinClassRoom(studentState?.classroom_data?.classroom_code))}
                                    />
                                </div>
                            </div>
                        </div>
                    default:
                        break;
                }
                break;
            case "test":
                switch (commonState?.modal?.type) {
                    case "submit_test":
                        return <div className="">
                            <div className="text-center">
                                <span><Img src={Image.start_test_pic} width={200} /></span>
                                <p className="gradient-text my-3">Are you sure you want to submit your test?</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="">
                                    <ButtonComponent
                                        type="button"
                                        className="btn border border-dark px-5"
                                        buttonName="Cancel"
                                        clickFunction={() => dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))}
                                    />
                                </div>
                                <div>
                                    <ButtonComponent
                                        type="button"
                                        className="btn btn-brand-color px-5 py-2"
                                        buttonName={studentState?.mcq_test?.submit_spinner_loading ? (
                                            <div className="d-flex justify-content-center align-items-center">
                                                <p className="m-0">Submiting... </p><SpinnerComponent className="p-0 my-0 ms-2" />
                                            </div>)
                                            : ('Submit')
                                        }
                                        clickFunction={() => dispatch(handleSubmitTest(studentState?.test_id, navigate))}
                                    />
                                </div>
                            </div>
                        </div>
                    
                    case "auto_submit":
                        return <div className="d-flex justify-content-center align-items-center p-4">
                            <p className="my-0 mx-2 gradient-text">Auto submitting...</p><SpinnerComponent />
                        </div>

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
                                <ButtonComponent type="button" className="btn-brand-color px-5" buttonName="Continue" />
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

            case "notes":
                switch (commonState?.modal?.type) {
                    case "add_note":
                        return <div className='p-2 w-100'>
                            {Inputfunctions(jsxJson.notes_input)}

                            <div className="d-flex justify-content-between align-items-center gap-5">
                                <div className="">
                                    <ButtonComponent
                                        type="button"
                                        className="btn btn-outline-dark px-4"
                                        buttonName="Cancel"
                                        clickFunction={() => dispatch(updateModalShow({ show: null, close_btn: false, modal_from: "notes", modal_type: "add_note" }))}
                                    />
                                </div>
                                <div>
                                    <ButtonComponent
                                        type="button"
                                        className="btn btn-brand-color px-5 py-2"
                                        buttonName="Add"
                                        clickFunction={() => {
                                            const noteData = {
                                                title: commonState?.notesdata?.title || "",
                                                content: commonState?.notesdata?.content || ""
                                            };
                                            dispatch(postTeacherNote("/students/create_user_notes", noteData));
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                    default:
                        break;
                }
                break;

            case "profile":
                switch (commonState?.modal?.type) {
                    case "edit_profile":
                        return <div className="w-100">
                            {Inputfunctions(jsxJson?.student_profile)}
                            <ButtonComponent type="button"
                                buttonName={studentState?.loading['edit_profile'] ? (
                                    <div className="d-flex justify-content-center align-items-center">
                                        <p className="m-0">Editing...</p> <SpinnerComponent className="p-0 my-0 ms-2" />
                                    </div>
                                ) :
                                    'Edit'
                                }
                             className="brand_color w-100 text-white"
                             clickFunction={()=>dispatch(handleEditProfileDetails(studentState?.editProfileInputs))} 
                            />
                        </div>

                    default:
                        break;
                }
                break;


            default:
                break;
        }
    }

    function modalFooterFun() {
        switch (commonState?.modal?.from) {
            case "":
                switch (commonState?.modal?.type) {
                    case "":
                        break

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
            modalHeaderClassname=""
            modalHeader={modalHeaderFun()}
            modalBodyClassname="py-2"
            modalBody={<div className=''>{modalBodyFun()}</div>}
            showModalFooter={true}
            modalFooterClassname="border-0"
            modalFooter={modalFooterFun()}
            modalClassname={["lg", "xl"].includes(commonState?.modal?.size) ? "model_height_lg" : ''}
        />
    )
}