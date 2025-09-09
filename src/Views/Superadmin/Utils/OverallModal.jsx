import { useCommonState, useDispatch } from "Components/CustomHooks";
import ModalComponent from "Components/Modal/Modal";
import JsonData from "./JsonData";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import ButtonComponent from "Components/Button/Button";
import { createOrganization, deleteOrganisation, editProfileDetails } from "../Actions/superAdminAction";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { selectOrgToDelete } from "../Slices/SuperAdmin_slice";


export function OverallModel() {
    const { commonState,superadminState } = useCommonState();
    const{ jsxJson} = JsonData()
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
                            <ButtonComponent type="button" buttonName="Send Mail" className="brand_color w-100 text-white" clickFunction={()=>dispatch(createOrganization(superadminState?.createOrganization))} />
                        </div>
                    case "delete_org":
                        return <div className="w-100">
                           <p className="mb-0 fs-5 text-muted">Are you want to delete this organization</p>
                            <div className="d-flex mt-4 gap-3">
                                <ButtonComponent type="button" buttonName="Cancel" className="btn-light w-100" 
                                clickFunction={()=>{
                                    dispatch(updateModalShow({show:false,close_btn:false,size:"",modal_from:"",modal_type:""}))
                                    dispatch(dispatch(selectOrgToDelete({})))
                            }} />
                                 <ButtonComponent type="button" buttonName="Confirm" className="brand_color w-100 text-white" clickFunction={()=>dispatch(deleteOrganisation(superadminState?.selected_org_to_delete?.org_id))} />
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
                            <ButtonComponent type="button" buttonName="Submit" className="brand_color w-100 text-white" clickFunction={()=>dispatch(editProfileDetails(superadminState?.editProfileInputs))} />
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