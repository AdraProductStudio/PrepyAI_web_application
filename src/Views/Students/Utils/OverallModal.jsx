import ButtonComponent from "Components/Button/Button";
import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";
import Img from "Components/Img/Img";
import Input from "Components/Input/Input";
import ModalComponent from "Components/Modal/Modal";
import { useRef } from "react";
import Icons from "Utils/Icons";
import Image from "Utils/Image";
import { update_error, updateModalShow } from "Views/Common/Slices/Common_slice";
import { handleEditProfileDetails, handleGenerateQuestion, handleJoinClassRoom, handleStartTest, handleSubmitTest, handleUploadLearnerBook, handleUploadTestPaper } from "../Actions/StudentAction";
import { setClassroomCode, setUploadLearnerBook, setUploadTestPaper, updateGenerateQuestionFields } from "../Slices/StudentSlice";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import JsonData from "./JsonData";
import SpinnerComponent from "Components/Spinner/Spinner";
import { Card } from "react-bootstrap";
import { updateAudioRecording, updateQuestionType } from "../Slices/StudentSlice";
import StatusCard from "Components/Card/StatusCard";
import { postTeacherNote } from "Views/Common/Actions/Common_action";
import AudioRecorder from "../Docs/AudioRecorder";
import { useParams } from "react-router-dom";

export function OverallModel() {
    const { commonState, studentState } = useCommonState();
    const fileInputRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useCustomNavigate()
    const { jsonOnly, jsxJson } = JsonData()
    const { id } = useParams()

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
        const {test_language,level_of_test,book_id,type_of_question,chapter_name,bookmarks} = studentState?.generate_question || {};

        if (!test_language || !level_of_test || !book_id || !type_of_question || !chapter_name) {
            navigate(`/student_dashboard/generate_question/${id}`)
            dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
            return dispatch(update_error({ Err: "Required All the fields", Toast_Type: "error" }));

        }

        const selectedBookMarks = bookmarks?.bookmarks?.find(b => b.title === chapter_name);
        const questionRoutes = {mcq: "mcq_questions",long_answer: "long_questions",}

        const targetRoute = questionRoutes[type_of_question];
        if (!targetRoute) {
            return dispatch(update_error({ Err: "Invalid question type", Toast_Type: "error" }));
        }
        const payload = {
            chapter_range: [selectedBookMarks?.chapter_range],
            type_of_question,
            level_of_question: level_of_test,
            chapters: [chapter_name],
            book_id,
            test_language,
        }
        dispatch(handleGenerateQuestion(payload,navigate,targetRoute,type_of_question))
    }


    function modalHeaderFun() {
        switch (commonState?.modal?.from) {
            case "dashboard":
                switch (commonState?.modal?.type) {
                    case "upload_book":
                        return <h5 className="m-0">Upload book</h5>
                    case "upload_test_paper":
                        return <h5 className="m-0">Upload test paper</h5>
                    case "start_test":
                        return <h5 className="m-0">Start test</h5>
                    default:
                        break;
                }
                break;

            case "test":
                switch (commonState?.modal?.type) {
                    case "submit_test":
                        return <h5 className="m-0">Submit test</h5>
                    default:
                        break;
                }
                break;

            case "Generate_Question":
                switch (commonState?.modal?.type) {
                    case "select_question_type":
                        return <h5 className="text-secondary fw-bold mb-0">Select Question Type</h5>
                    case "record_audio":
                        return <h5 className="text-secondary mb-0">Record your Answer</h5>
                    case "test_result":
                        return <h5 className="text-secondary mb-0">Status - {studentState?.generate_question?.performance}</h5>

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


            case "profile":
                switch (commonState?.modal?.type) {
                    case "edit_profile":
                        return <h5>Edit Profile</h5>
                    default:
                        break
                }
                break;

            case "notes":
                switch (commonState?.modal?.type) {
                    case "add_note":
                        return <h5 className="m-0 ps-4">Add  Notes</h5>

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
                        return <h5 className="text-secondary">Status - {studentState?.generate_question?.performance}</h5>

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
            case "dashboard":
                switch (commonState?.modal?.type) {
                    case "upload_book":
                        return <div className='p-2 mt-2'>
                            {Inputfunctions(jsxJson.uploadBook)}
                            <div className="d-flex justify-content-center align-items-center p-3 my-4 cursor-pointer upload_book_div" 
                                onClick={() => fileInputRef.current && fileInputRef.current.click()}>

                                <div className="mx-3">
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
                                    <span>{Icons.studentUploadLarge}</span>
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
                            <div className="d-flex justify-content-between align-items-center mt-5">
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
                                                <p className="m-0">Uploading...</p> <SpinnerComponent className="my-0 ms-2 p-0 small-spinner" />
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
                                <span><Img src={Image.start_test_pic} width={100} className="mt-3" /></span>
                                <p className="gradient-text mb-5 mt-3">Are you sure you want to start the test</p>
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
                                                <p className="m-0">Starting...</p> <SpinnerComponent className="p-0 my-0 ms-2 small-spinner" />
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
                            <div className="d-flex justify-content-center align-items-center p-3 m-2 my-4 cursor-pointer upload_book_div" 
                                onClick={() => fileInputRef.current && fileInputRef.current.click()}>

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
                                    <span className="d-flex" >{Icons.studentUploadLarge}</span>
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
                            <div className="d-flex justify-content-between align-items-center mt-5">
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
                                                <p className="m-0">Uploading...</p> <SpinnerComponent className="p-0 my-0 ms-2 small-spinner" />
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
                                <span><Img src={Image.start_test_pic} width={100} className="mt-3" /></span>
                                <p className="gradient-text mt-3 mb-5">Are you sure you want to submit your test?</p>
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
                                                <p className="m-0">Submitting...</p> <SpinnerComponent className="p-0 my-0 ms-2 small-spinner" />
                                            </div>
                                        )
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
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="col-5 p-2">
                                    <Card
                                        className={
                                            studentState?.generate_question?.type_of_question === "mcq"
                                                ? "brand_color shadow-sm py-3 active-card border-0 cursor-pointer"
                                                : "shadow-lg py-3 inactive-card border-0 cursor-pointer"
                                        }
                                        onClick={() => dispatch(updateGenerateQuestionFields({type_of_question:"mcq"}))}
                                    >
                                        <Card.Body className="p-2 d-flex flex-column align-items-center gap-2">
                                            <span>{studentState?.generate_question?.type_of_question === "mcq" ? Icons.mcqActiveIcon : Icons.mcqIcon}</span>
                                            <p
                                                className={
                                                     studentState?.generate_question?.type_of_question === "mcq"
                                                        ? "mb-0 text-white text-center fs-5"
                                                        : "mb-0 text-secondary text-center fs-5"
                                                }
                                            >
                                                Multiple Choice Questions
                                            </p>
                                        </Card.Body>
                                    </Card>
                                    </div>
                                    <div className="col-5 p-2">
                                    <Card
                                        className={
                                             studentState?.generate_question?.type_of_question === "long_answer"
                                                ? "brand_color shadow-sm py-3 active-card border-0 cursor-pointer"
                                                : "shadow-lg py-3 inactive-card border-0 cursor-pointer"
                                        }
                                        onClick={() => dispatch(updateGenerateQuestionFields({type_of_question:"long_answer"}))}
                                    >
                                        <Card.Body className="p-2 d-flex flex-column align-items-center gap-2">
                                            <span>{ studentState?.generate_question?.type_of_question === "long_answer" ? Icons.longQueActiveIcon : Icons.longQueIcon}</span>
                                            <p
                                                className={
                                                     studentState?.generate_question?.type_of_question === "long_answer"
                                                        ? "mb-0 text-white text-center fs-5"
                                                        : "mb-0 text-secondary text-center fs-5"
                                                }
                                            >
                                                Long Answer Questions
                                            </p>
                                        </Card.Body>
                                    </Card>
                                    </div>
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
                        return (
                            <div className="d-flex flex-column justify-content-center align-items-center w-100">
                                <AudioRecorder
                                    onComplete={(url, blob) => {
                                        dispatch(updateAudioRecording("completed"));
                                    }}
                                />
                            </div>
                        )
                    case 'test_result':
                        return (studentState?.generate_question?.overall_levels?.map((card) => {
                            return <StatusCard cardTitle={card.level} titleValue={card.status} explanation={card.reasoning} />
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

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="col p-1">
                                    <ButtonComponent
                                        type="button"
                                        className="btn btn-outline-dark w-100"
                                        buttonName="Cancel"
                                        clickFunction={() => dispatch(updateModalShow({ show: null, close_btn: false, modal_from: "notes", modal_type: "add_note" }))}
                                    />
                                </div>
                                <div className="col p-1">
                                    <ButtonComponent
                                        type="button"
                                        className="btn btn-brand-color w-100 py-2"
                                        buttonName={commonState?.notesdata?.id ? "Update" : "Add"}
                                        clickFunction={() => dispatch(postTeacherNote(commonState?.notesdata?.id ? "students/edit_user_notes" : "students/create_user_notes", { title: commonState?.notesdata?.title || "", content: commonState?.notesdata?.content || "", id: commonState?.notesdata?.id || null }))}
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
                                        <p className="m-0">Processing...</p> <SpinnerComponent className="p-0 my-0 ms-2 small-spinner" />
                                    </div>
                                ) :
                                    'Submit'
                                }
                                className="brand_color w-100 text-white"
                                clickFunction={() => dispatch(handleEditProfileDetails(studentState?.editProfileInputs))}
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
            case "Generate_Question":
                switch (commonState?.modal?.type) {
                    case "test_result":
                        return <div className="d-flex gap-3">
                            <ButtonComponent type="button" buttonName="Cancell" className="custom-btn" clickFunction={() => dispatch(updateModalShow({ show: false }))} />
                            <ButtonComponent type="button" buttonName="Take a Retest" className="brand_color text-white" clickFunction={() => {
                                dispatch(updateModalShow({ show: true, close_btn: true, size: "md", modal_from: "Generate_Question", modal_type: "select_question_type" }))}} />
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
            modalHeaderClassname=""
            modalHeader={modalHeaderFun()}
            modalBodyClassname="py-2 overflow-auto"
            modalBody={<div className=''>{modalBodyFun()}</div>}
            showModalFooter={true}
            modalFooterClassname="border-0"
            modalFooter={modalFooterFun()}
            modalClassname={["lg", "xl"].includes(commonState?.modal?.size) ? "model_height_lg" : ''}
        />
    )
}