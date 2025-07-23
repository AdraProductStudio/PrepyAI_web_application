import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";
import ModalComponent from "Components/Modal/Modal";
import UploadTestPaperModal from "../Docs/UploadTestPaperModal ";
import EditorModal from "../Docs/ EditorModal";


export function OverallModel() {
    const { commonState } = useCommonState();
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();

    function modalHeaderFun() {
        switch (commonState?.modal?.from) {
            case "student_dashboard":
                switch (commonState?.modal?.type) {
                    case "upload_test":
                        return <h5 className="fw-bold mb-4">Upload Test Paper</h5>

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
            case "student_dashboard":
                switch (commonState?.modal?.type) {
                    case "upload_test":
                        return <UploadTestPaperModal />
                        
                    case "upload_notes":
                        return <EditorModal/>
                    default:
                        break;
                }
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