import { useCommonState, useDispatch } from "Components/CustomHooks";
import ModalComponent from "Components/Modal/Modal";
import JsonData from "./JsonData";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import ButtonComponent from "Components/Button/Button";
import { handleCreateAdmin,editOrgProfileDetails, deleteAdmin } from "../Actions/organisationAction";
import ButtonSpinner from "Components/Spinner/ButtonSpinner";
import { update_app_data, updateModalShow } from "Views/Common/Slices/Common_slice";
import { updateSelectedAdminToDel } from "../Slices/Organisation_slice";


export function OverallModel() {
    const { commonState,organisationState } = useCommonState();
    const{ jsxOnly} = JsonData()
    const dispatch = useDispatch()

    function modalHeaderFun() {
        switch (commonState?.modal?.from) {
            case "Home":
                switch (commonState?.modal?.type) {
                    case "create_admin":
                        return <h5 className="mb-0">Create Admin</h5>
                    case "delete_admin":
                        return <h5 className="mb-0">Delete Admin</h5>
                    default:
                        break;
                }
                 case "Profile":
                switch (commonState?.modal?.type) {
                    case "edit_profile":
                        return <h5>Edit Profile</h5>
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
                    case "create_admin":
                        return (
                            <div className="w-100">
                                {Inputfunctions(jsxOnly?.create_admin)}
                                <ButtonSpinner
                                    className="brand_color w-100 text-white border-0"
                                    title="Send Email"
                                    is_spinner={organisationState?.createAdminInputs?.is_sending}
                                    clickFunction={
                                        organisationState?.createAdminInputs?.is_sending ? null :
                                        ()=> {dispatch(handleCreateAdmin(organisationState?.createAdminInputs))
                                            dispatch(update_app_data({type:"validation",data:true}))
                                    }}
                                
                                />
                            </div>
                        );
                    case "delete_admin":
                        return <div className="w-100">
                            <p className="mb-0 fs-5 text-muted">Do you want to delete {organisationState?.selectedAdminToDel?.name} ?</p>
                            <div className="d-flex mt-4 gap-3">
                                <ButtonComponent type="button" buttonName="Cancel" className="btn-light w-100"
                                    clickFunction={() => {
                                        dispatch(updateModalShow({ show: false, close_btn: false, size: "", modal_from: "", modal_type: "" }))
                                        dispatch(dispatch(updateSelectedAdminToDel({ admin_id: null, name: "" })))
                                    }} />
                                <ButtonSpinner
                                    className="brand_color w-100 text-white border-0"
                                    title="Confirm"
                                    is_spinner={organisationState?.selectedAdminToDel?.is_spinner}
                                    clickFunction={organisationState?.selectedAdminToDel?.is_spinner ? null : 
                                      () => dispatch(deleteAdmin(organisationState?.selectedAdminToDel?.admin_id))}
                                />

                            </div>
                        </div>
                    default:
                        break;
                }
                break;

            case "Profile":
                switch (commonState?.modal?.type) {
                    case "edit_profile":
                        return (
                            <div className="w-100">
                                {Inputfunctions(jsxOnly?.organization_edit_profile)}
                                <ButtonSpinner
                                    className="brand_color w-100 text-white"
                                    title="Submit"
                                    is_spinner={organisationState?.editProfileInputs?.is_editing}
                                    clickFunction={organisationState?.selectedAdminToDel?.is_spinner ? null : 
                                      () => {
                                        dispatch(update_app_data({type:"validation",data:true}))
                                        dispatch(editOrgProfileDetails(organisationState?.editProfileInputs))}}
                                />
                            </div>
                        );
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