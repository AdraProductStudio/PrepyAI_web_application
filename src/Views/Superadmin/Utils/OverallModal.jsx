import { useCommonState, useDispatch } from "Components/CustomHooks";
import ModalComponent from "Components/Modal/Modal";
import JsonData from "./JsonData";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import ButtonComponent from "Components/Button/Button";
import { createOrganization, deleteOrganisation, editProfileDetails } from "../Actions/superAdminAction";
import ButtonSpinner from "Components/Spinner/ButtonSpinner";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { selectOrgToDelete } from "../Slices/SuperAdmin_slice";
import Icons from "Utils/Icons";


export function OverallModel() {
    const { commonState, superadminState } = useCommonState();
    const { jsxJson } = JsonData()
    const dispatch = useDispatch()


    // const navigate = useCustomNavigate();
    function modalHeaderFun() {
        switch (commonState?.modal?.from) {
            case "Home":
                switch (commonState?.modal?.type) {
                    case "create_organisation":
                        return <h5>Create Organisation</h5>;
                    case "delete_org":
                        return <h5>Delete Organisation</h5>;
                    default:
                        break
                }

            case "Profile":
                switch (commonState?.modal?.type) {
                    case "edit_profile":
                        return <h5>Edit Profile</h5>;
                    default:
                        break
                }

            default:
                break
        }
    }


    function modalBodyFun() {
        switch (commonState?.modal?.from) {
            case "Home":
                switch (commonState?.modal?.type) {
                    case "create_organisation":
                        return <div className="w-100">
                            {Inputfunctions(jsxJson?.create_organization)}
                            <ButtonSpinner
                                className="brand_color w-100 text-white"
                                title={superadminState?.createOrganization?.is_sending ? "Sending..." : "Send Email"}
                                is_spinner={superadminState?.createOrganization?.is_sending}
                                clickFunction={
                                    superadminState?.createOrganization?.is_sending
                                        ? null
                                        :
                                        () => dispatch(createOrganization(superadminState?.createOrganization))
                                } />
                        </div>

                    case "delete_org":
                        return <div className="w-100">
                            <div className="col text-center pt-5 pb-3">
                                {Icons?.deleteIcon}
                                <p className="my-3 fs-5 text-muted">Are you want to delete this organization</p>
                            </div>
                            <div className="d-flex mt-4 gap-3">
                                <ButtonComponent type="button" buttonName="Cancel" className="btn-light w-100"
                                    clickFunction={() => {
                                        dispatch(updateModalShow({ show: false, close_btn: false, size: "", modal_from: "", modal_type: "" }))
                                        dispatch(dispatch(selectOrgToDelete({})))
                                    }} />


                                <ButtonSpinner
                                    className="brand_color w-100 text-white"
                                    title={superadminState?.organisation_delete_spinner ? "Deleting..." : "Delete"}
                                    is_spinner={superadminState?.organisation_delete_spinner}
                                    clickFunction={
                                        superadminState?.organisation_delete_spinner
                                            ? null
                                            :
                                            () => dispatch(deleteOrganisation({ org_id: superadminState?.selected_org_to_delete?.org_id, data: superadminState?.organizationDetails.data }))
                                    } />
                            </div>
                        </div>

                    default:
                        break;
                }

            case "Profile":
                switch (commonState?.modal?.type) {
                    case "edit_profile":
                        return <div className="w-100">
                            {Inputfunctions(jsxJson?.super_admin_profile)}

                            <ButtonSpinner
                                className="brand_color w-100 text-white"
                                title={superadminState?.editProfileInputs?.is_fetching ? "Submitting..." : "Submit"}
                                is_spinner={superadminState?.editProfileInputs?.is_fetching}
                                clickFunction={
                                    superadminState?.editProfileInputs?.is_fetching
                                        ? null
                                        :
                                        () => dispatch(editProfileDetails(superadminState?.editProfileInputs))
                                } />
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