import { useCommonState, useDispatch } from "Components/CustomHooks";
import ModalComponent from "Components/Modal/Modal";
import JsonData from "./JsonData";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import ButtonComponent from "Components/Button/Button";
import { createAdmin, editOrgProfileDetails } from "../Actions/organisationAction";


export function OverallModel() {
    const { commonState,organisationState } = useCommonState();
    const{ jsxOnly} = JsonData()
    const dispatch = useDispatch()

    function modalHeaderFun() {
        switch (commonState?.modal?.from) {
            case "Home":
                switch (commonState?.modal?.type) {
                    case "create_admin":
                        return <h5>Create Admin</h5>
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
                                <ButtonComponent
                                    type="button"
                                    buttonName="Send Mail"
                                    className="brand_color w-100 text-white"
                                    clickFunction={() =>
                                        dispatch(createAdmin(organisationState?.createAdminInputs))
                                    }
                                />
                            </div>
                        );
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
                                <ButtonComponent
                                    type="button"
                                    buttonName="Submit"
                                    className="brand_color w-100 text-white"
                                    clickFunction={() => dispatch(editOrgProfileDetails(organisationState?.editProfileInputs))}
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