import ButtonComponent from "Components/Button/Button";
import { useCommonState } from "Components/CustomHooks";
import OffCanvas from "Components/Offcanvas/OffCanvas";


export function OverallCanvas() {
    const { commonState } = useCommonState();
    // const dispatch = useDispatch();
    // const navigate = useCustomNavigate();

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
                        return(
                            <>
                                {Array.from({ length: 60 }, (_, index) => (
                                    <p key={index}>asd</p>
                                ))}
                            </>
                        )

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
                                <div className="w-100">
                                    <div className="col-3 ms-auto">
                                        <ButtonComponent type="button" className="btn-brand-color px-4 py-2" buttonName="Add Attachment" />
                                    </div>
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