import ButtonComponent from "Components/Button/Button";
import AttachmentCard from "Components/Card/AttachmentCard";
import { useCommonState} from "Components/CustomHooks";
import OffCanvas from "Components/Offcanvas/OffCanvas";
import JsonData from "Views/Teachers/Utils/JsonData";



export function OverallCanvas({ subject_id }) {
    const { commonState } = useCommonState();
    const { jsonOnly } = JsonData()



    function canvasHeaderFun() {
        switch (commonState?.canvas?.from) {
            case "teachers":
                switch (commonState?.canvas?.type) {
                    case "attachments":
                        return <h5>Attachments</h5>

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }

    function canvasBodyFun() {
        switch (commonState?.canvas?.from) {
            case "teachers":
                switch (commonState?.canvas?.type) {
                    case "attachments":
                        return (
                            <div className="row">
                                {Object.entries(jsonOnly?.attachments || []).map(([key, value]) => (
                                    <div className="row mb-3" key={key}>
                                        <div className="col-12 attachment_title">
                                            <p>{key}</p>
                                        </div>
                                        {value.map((item, index) => (
                                            <div className="col-3 mt-4" key={index}>
                                                <AttachmentCard className="attachment_books" delete_function={() => console.log("Delete function called")} download_function={() => console.log("Download function called")} />
                                            </div>
                                        ))}
                                    </div >
                                ))}
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

    function canvasFooterFun() {
        switch (commonState?.canvas?.from) {
            case "teachers":
                switch (commonState?.canvas?.type) {
                    case "attachments":
                        return (
                            <div className="shadow-sm w-100 py-3">
                                <div className="col-3 ms-auto">
                                    <ButtonComponent type="button" className="btn-brand-color px-4 py-2" buttonName="Add Attachment" />
                                </div>
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

    return (
        <OffCanvas
            offCanvasShow={commonState?.canvas?.show}
            offcanvasResponsive={commonState?.canvas?.responsive}
            offcanvasPlacement={commonState?.canvas?.placement}
            offcanvasCloseButton={commonState?.canvas?.close_btn}
            offcanvasClassname={commonState?.canvas?.extraClass}
            showModalHeader={true}
            offcanvasHeaderClassname="border-0"
            canvasHeader={canvasHeaderFun()}
            offcanvasBodyClassname="py-2"
            canvasBody={<div className='p-3 py-0'>{canvasBodyFun()}</div>}
            canvasFooter={canvasFooterFun()}
            width={commonState?.canvas?.width}
        />
    )
}