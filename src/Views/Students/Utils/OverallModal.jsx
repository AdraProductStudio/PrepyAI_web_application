import ButtonComponent from "Components/Button/Button";
import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";
import Img from "Components/Img/Img";
import Input from "Components/Input/Input";
import InputGroup from "Components/Input/InputGroup";
import ModalComponent from "Components/Modal/Modal";
import { useRef} from "react";
import Icons from "Utils/Icons";
import Image from "Utils/Image";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { handleJoinClassRoom, handleStartTest, handleUploadLearnerBook } from "../Actions/StudentAction";
import { setClassroomCode, setUploadLearnerBook } from "../Slices/StudentSlice";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import JsonData from "./JsonData";


export function OverallModel() {
    const { commonState, studentState } = useCommonState();
    const fileInputRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useCustomNavigate()

    const { jsxJson } = JsonData()

    const handleUpload = () => {
        const formData = new FormData()
        formData.append("book_name", studentState?.upload_book_payload?.bookName)
        formData.append("book", studentState?.upload_book_payload?.bookFile)
        dispatch(handleUploadLearnerBook(formData))
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
                            <InputGroup
                                inputType='text'
                                inputHeading="Book Name"
                                change={(e)=> dispatch(setUploadLearnerBook({type: "set", book_name: e.target.value})) }
                            />
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
                                                if (file) dispatch(setUploadLearnerBook({type: "set", book_file: file}))
                                            }}
                                        />
                                    </span>
                                    <span className="d-flex" onClick={() => fileInputRef.current && fileInputRef.current.click()}>{Icons.studentUploadLarge}</span>
                                </div>
                                <div className="pt-3">
                                    <strong>Browse your book file</strong>
                                    <p>Formats pdf, docs, doc & Max file size 1 GB</p>
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
                                        buttonName={`${studentState?.upload_book_payload.loading ? 'uploading...' : 'upload'}`}
                                        clickFunction={() => handleUpload() }
                                    />
                                </div>
                            </div>
                        </div>

                    case "start_test":
                        return <div className="">
                            <div className="text-center">
                            <span><Img src={Image.start_test_pic} width={200}/></span>
                            <p className="gradient-text my-3">Are you sure do you want to Start Test</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="">
                                    <ButtonComponent
                                        type="button"
                                        className="btn border border-dark px-5"
                                        buttonName="Cancel"
                                        clickFunction={()=>dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))}
                                    />
                                </div>
                                <div>
                                    <ButtonComponent
                                        type="button"
                                        className="btn btn-brand-color px-5 py-2"
                                        buttonName="Start"
                                        clickFunction={() => dispatch(handleStartTest(studentState.test_id, navigate))}
                                    />
                                </div>
                            </div>
                        </div>
                    case "upload_test_paper":
                        return <div>
                             
                        </div> 
                    
                    default:
                        break;
                }
                break;

            case "subjects":
                switch(commonState?.modal?.type) {
                    case "add_class":
                        return <div>
                            <label className="my-2">Classroom Code</label>
                            {Inputfunctions(jsxJson.classroom)}
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="">
                                    <ButtonComponent
                                        type="button"
                                        className="btn border border-dark px-5"
                                        buttonName="Cancel"
                                        clickFunction={() => {
                                            dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
                                            dispatch(setClassroomCode({type: 'set', validated: false}))
                                            }
                                        }
                                    />
                                </div>
                                <div>
                                    <ButtonComponent
                                        type="button"
                                        className="btn btn-brand-color px-5 py-2"
                                        buttonName="Join"
                                        clickFunction={() => dispatch(handleJoinClassRoom(studentState?.classroom_data?.classroom_code)) }
                                    />
                                </div>
                            </div>
                        </div>
                }

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