import ButtonComponent from "Components/Button/Button";
import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";
import Img from "Components/Img/Img";
import Input from "Components/Input/Input";
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
import { updateNoteField } from "Views/Common/Slices/Common_slice";
import { createNote, deleteNotes, updateNote,} from "Views/Common/Actions/Common_action";



export function OverallModel() {
    const { commonState, studentState } = useCommonState();
    const fileInputRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useCustomNavigate()
    const { jsonOnly, jsxJson } = JsonData()
    const { title, content } = commonState?.notes
    const { title:showMore_title, content:showMore_content } = commonState?.notes.showMoreNote || {}

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

            case "Notes":
                switch (commonState?.modal?.type) {
                    case "add_notes":
                        return<h4 className="m-0">Add Note</h4>
                    
                    case "edit_notes":
                        return<h4 className="m-0">Edit Note</h4>

                    case "show_more_note":
                        return<h4 className="m-0">Note</h4>

                    case "delete_note":
                        return <h5 className="m-0">Delete Note</h5>
                    
                    default:
                        break;
                }
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
                                        buttonName={studentState?.mcq_test?.submit_spinner ? (<>submiting... <SpinnerComponent /></>) : ('Submit')}
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

                    case "Notes":
                        switch (commonState?.modal?.type) {
                            case "add_notes":
                                return(
                                    <div className="d-flex flex-column col">
                                        <div className="col-12 ">
                                            <label htmlFor="notes_title" className="col-12 fs-6 text-muted">Add Title Here
                                            <input
                                                type="text"
                                                id="notes_title" 
                                                className="col-12 p-2 border rounded-3 mt-1"
                                                value={title}
                                                onChange={(e) => dispatch(updateNoteField({ field: "title", value: e.target.value }))}/>
                                        </label>
                                        </div>
                                        <div className="col-12 mt-3">
                                            <label htmlFor="notes_content" className="col-12 fs-6 text-muted">Add Content Here
                                            <textarea 
                                            name="notes"
                                            style={{minHeight:"35vh"}} 
                                            id="notes_content" 
                                            className="col-12 border rounded-3 mt-1"
                                            value={content}
                                            onChange={(e) => dispatch(updateNoteField({ field: "content", value: e.target.value }))} />
                                        </label>
                                        </div>   
                                    </div>
                                )
                                case "edit_notes":
                                    return(
                                        <div className="d-flex flex-column col">
                                        <div className="col-12 ">
                                            <label htmlFor="notes_title" className="col-12 fs-6 text-muted"> Title
                                            <input
                                                type="text"
                                                id="notes_title" 
                                                className="col-12 p-2 border rounded-3 mt-1"
                                                value={title}
                                                onChange={(e) => dispatch(updateNoteField({ field: "title", value: e.target.value }))}/>
                                        </label>
                                        </div>
                                        <div className="col-12 mt-3">
                                            <label htmlFor="notes_content" className="col-12 fs-6 text-muted">Content
                                            <textarea 
                                            name="notes"
                                            style={{minHeight:"35vh"}} 
                                            id="notes_content" 
                                            className="col-12 border rounded-3 mt-1"
                                            value={content}
                                            onChange={(e) => dispatch(updateNoteField({ field: "content", value: e.target.value }))} />
                                        </label>
                                        </div>   
                                    </div>
                                    )
        
                                case "show_more_note":
                                    return(
                                    <div>
                                        <h5 className="mt-3">{showMore_title}</h5>
                                        <div className="overflowY mt-4" style={{height:"48vh"}}>
                                            <p className="text-muted">{showMore_content}</p>
                                        </div>
                                    </div>
                                    
                                    )
                                
                                case "delete_note":
                                    return<div className="col-12 text-center mt-4"><p>Are you sure want to delete the note ?</p></div>
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
                            <ButtonComponent type="button" buttonName="Take a Retest" className="brand_color text-white" clickFunction={() => dispatch(updateModalShow({ show: true, close_btn: true, size: "md", modal_from: "Generate_Question", modal_type: "select_question_type" }))} />
                        </div>

                    default:
                        break;
                }
                break;

            
            case "Notes":
                switch (commonState?.modal?.type) {
                    case "add_notes":
                        return (
                          <div className="d-flex justify-content-end ">
                            <ButtonComponent
                              className="gradient text-white px-5"
                              buttonName="Add"
                              clickFunction={() =>
                              dispatch(createNote())
                              }
                            />
                          </div>
                        );
                        case 'edit_notes':
                          return(<div className="d-flex justify-content-end ">
                            <ButtonComponent
                              className="gradient text-white px-5"
                              buttonName="Update"
                              clickFunction={() =>
                              dispatch(updateNote(commonState.notes.editNote.id))
                              }
                            />
                          </div>
                          );
                        
                        case 'delete_note':
                            return(
                            <div>
                                <ButtonComponent
                                className="gradient text-white px-5 mt-3"
                                buttonName="Delete"
                                clickFunction={()=>dispatch(deleteNotes(commonState.notes.deleteId))}/>
                            </div>
                            )

                    default:
                        break;
                }
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