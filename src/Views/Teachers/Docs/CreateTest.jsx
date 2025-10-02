import { getBooks, saveSchedule } from "../Actions/TeacherActions";
import { useDispatch } from "react-redux";
import { useEffect} from "react";
import { useParams } from "react-router-dom";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions"
import JsonData from "Views/Teachers/Utils/JsonData";
import { get_student_details, } from "../Actions/TeacherActions";
import { useNavigate } from "react-router-dom";
import { useCommonState } from "Components/CustomHooks";
import Spinner from "Components/Spinner/CustomSpinner";
import ButtonSpinner from "Components/Spinner/ButtonSpinner";

const CreateTest = () => {
    const { jsxJson } = JsonData();
    const { class_id, subject_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { teachersState } = useCommonState();

    
    useEffect(() => {
        if (class_id && subject_id) {
            dispatch(getBooks({ classroom_id: class_id, subject_id: subject_id }));
            dispatch(get_student_details({ classroom_id: class_id, page: 1 }));
        }
    }, []);

    const handleNextClick = () => {
            const payload = {
                classroom_id: Number(class_id) ||"",
                subject_id: Number(subject_id) || "",
            };

            const jsonData = teachersState?.scheduleTest_values;
            const formdata = {...payload,...jsonData}
            dispatch(saveSchedule(formdata, navigate));
        
    };


    return (
        <div className="p-5 h-100 overflow-y-auto">
            {teachersState?.books?.loading ? (
                <div className="w-100 h-100 row align-items-center justify-content-center">
                    <div className="col-6 text-center">
                       <Spinner />
                    </div>
                </div>
            ) : (
                <>
                    <div className="col" >
                        <div className="h-100 overflowY">
                            <div className="row">
                                {Inputfunctions(jsxJson?.create_test || [])}
                            </div>
                        </div>
                    </div>

                    <div
                        className="col d-flex justify-content-end align-items-center mt-5">
                            <ButtonSpinner
                                className="btn-brand-color px-5 py-2 w-auto"
                                clickFunction={handleNextClick}
                                is_spinner={teachersState?.save_schedule_status === "loading"}
                                title="Schedule Test"  
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default CreateTest;

