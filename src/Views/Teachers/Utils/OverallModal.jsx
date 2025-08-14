import ButtonComponent from "Components/Button/Button";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import Input from "Components/Input/Input";
import ModalComponent from "Components/Modal/Modal";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import JsonData from "./JsonData";
import { handlecreateNote, handleUpdateNote, postTeacherNote } from "Views/Common/Actions/Common_action";


export function OverallModel() {
    const { commonState } = useCommonState();
    const dispatch = useDispatch();
    const { jsxJson } = JsonData(dispatch, commonState);

    function modalHeaderFun() {
        if (commonState?.modal?.from === "notes") {
            if (commonState?.modal?.type === "add_note") {
                return <h5 className="m-0 ps-4">Add Notes</h5>;
            }
            if (commonState?.modal?.type === "edit_note") {
                return <h5 className="m-0 ps-4">Edit Note</h5>;
            }
        }
        return null;
    }

    function modalBodyFun() {
        if (commonState?.modal?.from === "notes") {
            if (commonState?.modal?.type === "add_note") {
                return (
                    <div className='p-2 w-100'>
                        {Inputfunctions(jsxJson.notes_input)}
                        <div className="d-flex justify-content-between align-items-center gap-5">
                            <ButtonComponent
                                type="button"
                                className="btn btn-outline-dark px-4"
                                buttonName="Cancel"
                                clickFunction={() => dispatch(updateModalShow({ show: false }))}
                            />
                            <ButtonComponent
                                type="button"
                                className="btn btn-brand-color px-5 py-2"
                                buttonName="Add"
                                clickFunction={() => {
                                    dispatch(handlecreateNote(commonState.notesdata));
                                }}
                            />
                        </div>
                    </div>
                );
            }

            if (commonState?.modal?.type === "edit_note") {
                return (
                    <div className='p-2 w-100'>
                        {Inputfunctions(jsxJson.edits_input)}
                        <div className="d-flex justify-content-between align-items-center gap-5">
                            <ButtonComponent
                                type="button"
                                className="btn btn-outline-dark px-4"
                                buttonName="Cancel"
                                clickFunction={() => dispatch(updateModalShow({ show: false }))}
                            />
                            <ButtonComponent
                                type="button"
                                className="btn btn-brand-color px-5 py-2"
                                buttonName="Update"
                                clickFunction={() => {
                                    dispatch(handleUpdateNote(commonState.notesdata));
                                }}
                            />
                        </div>
                    </div>
                );
            }
        }
        return null;
    }

    return (
        <ModalComponent
            show={commonState?.modal?.show}
            modalSize={commonState?.modal?.size}
            modalCentered={true}
            modalCloseButton={commonState?.modal?.close_btn}
            showModalHeader={true}
            modalHeader={modalHeaderFun()}
            modalBody={<div className='d-flex flex-wrap p-3 py-0'>{modalBodyFun()}</div>}
            showModalFooter={false}
        />
    );
}
