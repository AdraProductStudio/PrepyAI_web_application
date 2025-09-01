import { useCommonState } from "Components/CustomHooks";
import ModalComponent from "Components/Modal/Modal";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import JsonData from "./JsonData";
import SpinnerComponent from "Components/Spinner/Spinner";


export function OverallModel() {
    const { commonState, teachersState } = useCommonState();
    // const dispatch = useDispatch();
    // const navigate = useCustomNavigate();

    const { jsxJson } = JsonData()

    function modalHeaderFun() {
        switch (commonState?.modal?.from) {
            case "teachers":
                switch (commonState?.modal?.type) {
                    case "performance":
                        return <h5 className="fw-bold">Student Score</h5>;

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
            case "teachers":
                switch (commonState?.modal?.type) {
                    case "performance":
                        return(
                            <div className="modal-body p-0 m-0 ">
                                <div className="table-responsive">
                                    <table className="table table-bordered text-center align-middle mb-0">
                                        <thead>
                                            <tr>
                                                {jsxJson?.student_performance_modal.map((item, idx) =>(
                                                    <th className={item.divClassName} key={idx}>
                                                        {item.title}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { teachersState?.studentsPerformance.placeholder2 ?
                                                <tr>
                                                    <td colSpan={5}>
                                                        <SpinnerComponent />
                                                    </td> 
                                                </tr> 
                                                :
                                                teachersState?.studentsPerformance.performance_modalData.length > 0 ? (
                                                teachersState?.studentsPerformance.performance_modalData.map((data, idx) => (
                                                <tr key={idx} >
                                                    <td>{data.first_name}</td>
                                                    <td>{data.overall}</td>
                                                    <td>{data.score}</td>
                                                    <td>{data.performance_status}</td>
                                                    <td>{data.time_submitted}</td>
                                                </tr>
                                            ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="text-center py-4">No Data Found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
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