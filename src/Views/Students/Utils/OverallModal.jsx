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
import { handleJoinClassRoom, handleStartTest, handleSubmitTest, handleUploadLearnerBook, handleUploadTestPaper } from "../Actions/StudentAction";
import { setClassroomCode, setUploadLearnerBook, setUploadTestPaper } from "../Slices/StudentSlice";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import JsonData from "./JsonData";
import SpinnerComponent from "Components/Spinner/Spinner";


export function OverallModel() {
    const { commonState, studentState } = useCommonState();
    const fileInputRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useCustomNavigate()
    const { jsxJson } = JsonData()

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

    function modalHeaderFun() {
        switch (commonState?.modal?.from) {
            case "dashboard":
                switch (commonState?.modal?.type) {
                    case "upload_book":
                        return <h5>Upload Book</h5>
                    case "upload_test_paper":
                        return <h5>Upload Test Paper</h5>
                    default:
                        break;
                }
                break;

            case "subjects":
                switch (commonState?.modal?.type) {
                    case "add_class":
                        return <h5>Join class room</h5>
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
                                    <strong>Browse your book</strong>
                                    <p>Formats pdf, docs, doc & Max file size 1 GB</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="">
                                    <ButtonComponent
                                        type="button"
                                        className="btn border border-dark px-5"
                                        buttonName="Cancel"
                                        clickFunction={() => {
                                            dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
                                            dispatch(setUploadLearnerBook({ type: 'set', book_name: '', book_file: null }))
                                        }
                                        }
                                    />
                                </div>
                                <div>
                                    <ButtonComponent
                                        type="button"
                                        className="btn btn-brand-color px-5 py-2"
                                        buttonName={`${studentState?.upload_learner_book.loading ? 'uploading...' : 'upload'}`}
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
                                        buttonName={studentState?.mcq_loading ? (<>starting <SpinnerComponent /></>) : ('Start')}
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
                                    <strong>Browse your test file</strong>
                                    <p>Formats pdf, docs, doc & Max file size 1 GB</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="">
                                    <ButtonComponent
                                        type="button"
                                        className="btn border border-dark px-5"
                                        buttonName="Cancel"
                                        clickFunction={() => {
                                            dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
                                            dispatch(setUploadTestPaper({ type: 'set', test_name: '', register_number: '', test_file: null }))
                                        }
                                        }
                                    />
                                </div>
                                <div>
                                    <ButtonComponent
                                        type="button"
                                        className="btn btn-brand-color px-5 py-2"
                                        buttonName={`${studentState?.upload_test_paper.loading ? 'uploading...' : 'upload'}`}
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
                                <p className="gradient-text my-3">Are you sure do you want to submit this</p>
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
                                        clickFunction={() => dispatch(handleSubmitTest(studentState?.test_id, navigate)) }
                                    />
                                </div>
                            </div>
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