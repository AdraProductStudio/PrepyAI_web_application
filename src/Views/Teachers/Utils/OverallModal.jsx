import ButtonComponent from "Components/Button/Button";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import ModalComponent from "Components/Modal/Modal";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import JsonData from "./JsonData";
import { postTeacherNote } from "Views/Common/Actions/Common_action";


export function OverallModel() {
    const { commonState } = useCommonState();
    const dispatch = useDispatch();
    const { jsxJson } = JsonData();

    function modalHeaderFun() {
        switch (commonState?.modal?.from) {
            case "notes":
                switch (commonState?.modal?.type) {
                    case "add_note":
                        return <h5 className="m-0 ps-4">Add  Notes</h5>

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
            case "notes":
                switch (commonState?.modal?.type) {
                    case "add_note":
                        return <div className='p-2 w-100'>
                            {Inputfunctions(jsxJson.notes_input)}

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="col p-1">
                                    <ButtonComponent
                                        type="button"
                                        className="btn btn-outline-dark px-4 w-100"
                                        buttonName="Cancel"
                                        clickFunction={() => dispatch(updateModalShow({ show: null, close_btn: false, modal_from: "notes", modal_type: "add_note" }))}
                                    />
                                </div>
                                <div className="col p-1">
                                    <ButtonComponent
                                        type="button"
                                        className="btn btn-brand-color px-5 py-2 w-100"
                                        buttonName={commonState?.notesdata?.id ? "Update" : "Add"}
                                        clickFunction={() => dispatch(postTeacherNote(commonState?.notesdata?.id ? "teachers/edit_user_notes" : "teachers/create_user_notes", { title: commonState?.notesdata?.title || "", content: commonState?.notesdata?.content || "", id: commonState?.notesdata?.id || null }))}
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