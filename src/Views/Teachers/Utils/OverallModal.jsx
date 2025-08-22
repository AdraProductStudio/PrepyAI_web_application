import ButtonComponent from "Components/Button/Button";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import ModalComponent from "Components/Modal/Modal";
import { updateModalShow, updateNoteField } from "Views/Common/Slices/Common_slice";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import JsonData from "./JsonData";
import { postClassrooms, postStudents, postSubjects } from "../Actions/teacherAction";
import { useParams } from "react-router-dom";
import { createNote, deleteNotes, updateNote,} from "Views/Common/Actions/Common_action";



export function OverallModel() {
    const { class_id } = useParams();
    const { jsxJson } = JsonData();
    const dispatch = useDispatch();
    const { teachersState, commonState } = useCommonState();
    const { title, content } = commonState?.notes
    const { title:showMore_title, content:showMore_content } = commonState?.notes.showMoreNote || {}

    function modalHeaderFun() {
        switch (commonState?.modal?.from) {
            case "TeacherClassroom":
                switch (commonState?.modal?.type) {
                    case "createClassroom":
                        return <h5 className="ms-3">Create Class Room</h5>
                    default:
                        break;
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
                break;
            case "subjects":
                switch (commonState?.modal?.type) {
                    case "subjects":
                        return <h5 className="ms-3">Add Subject</h5>
                    default:
                        break;
                }
                break;
            case "studentsEdit":
                switch (commonState?.modal?.type) {
                    case "studentsEdit":
                        return <h5 className="ms-3">Edit Student</h5>
                    default:
                        break;
                }
            default:
                break;
        }
    }

    function modalBodyFun() {
        switch (commonState?.modal?.from) {
            case "TeacherClassroom":
                switch (commonState?.modal?.type) {
                    case "createClassroom":
                        return <> {Inputfunctions(jsxJson.classroomModal)}
                            <ButtonComponent title={"Create"} className="btn-md btn-brand-color p-2 w-100" clickFunction={() => dispatch(postClassrooms(teachersState?.teacher_PostClassrooms?.data))} buttonName={"Create"} />
                        </>

                    default:
                        break;
                }
                break;
                
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
            case "subjects":
                switch (commonState?.modal?.type) {
                    case "subjects":
                        return <> {Inputfunctions(jsxJson.addSubjects)}<ButtonComponent className="btn-md btn-brand-color w-100" buttonName={"Add Subject"} clickFunction={() => dispatch(postSubjects({ subject_name: teachersState?.teacher_PostSubjects?.data?.subject_name, classroom_id: class_id, teachers_id: teachersState?.teacher_PostSubjects?.data?.teachers }))} /></>

                    default:
                        break;
                }
                break;
            case "studentsEdit":
                switch (commonState?.modal?.type) {
                    case "studentsEdit":
                        return <> {Inputfunctions(jsxJson.editStudent)}<ButtonComponent className="btn-md btn-brand-color w-100" buttonName={"Edit sutudents"} clickFunction={() => dispatch(postStudents(teachersState?.teacher_PostStudents?.data))} /></>

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
            case "TeacherClassroom":
                switch (commonState?.modal?.type) {
                    case "createClassroom":
                        return
                        break

                    default:
                        break;
                }
                break;
            case "subjects":
                switch (commonState?.modal?.type) {
                    case "subjects":
                        return
                        break

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