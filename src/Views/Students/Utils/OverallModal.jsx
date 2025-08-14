import ButtonComponent from "Components/Button/Button";
import { useCommonState, useDispatch} from "Components/CustomHooks";
import ModalComponent from "Components/Modal/Modal";
import { createStudentNote, updateStudentNote } from "Views/Common/Actions/Common_action";
import { updateNoteField } from "Views/Common/Slices/Common_slice";


export function OverallModel() {
    const { commonState } = useCommonState();
    const dispatch = useDispatch();
    const { title, content } = commonState?.students_notes
    const { title:showMore_title, content:showMore_content } = commonState?.students_notes.showMoreNote || {}
   

    function modalHeaderFun() {
        switch (commonState?.modal?.from) {
            case "Notes":
                switch (commonState?.modal?.type) {
                    case "add_notes":
                        return<h4 className="m-0">Add Note</h4>
                    
                    case "edit_notes":
                        return<h4 className="m-0">Edit Note</h4>

                    case "show_more_note":
                        return<h4 className="m-0">Note</h4>
                    
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
                                    style={{height:"20vh"}} 
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
                                    style={{height:"20vh"}} 
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
                            <div className="overflowY">
                                <h5 className="mt-3">{showMore_title}</h5>
                                <p className="mt-5 text-muted">{showMore_content}</p>
                            </div>
                            
                            )
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
            case "Notes":
                switch (commonState?.modal?.type) {
                    case "add_notes":
                        return (
                          <div className="d-flex justify-content-end ">
                            <ButtonComponent
                              className="gradient text-white px-5"
                              buttonName="Add"
                              clickFunction={() =>
                              dispatch(createStudentNote())
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
                              dispatch(updateStudentNote(commonState.students_notes.editNote.id))
                              }
                            />
                          </div>
                          );
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