import { getBooks, saveSchedule } from "../Actions/TeacherActions";
import { useDispatch } from "react-redux";
import ButtonComponent from "Components/Button/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions"
import JsonData from "Views/Teachers/Utils/JsonData";
import { get_student_details, } from "../Actions/TeacherActions";
import { useNavigate } from "react-router-dom";
import SpinnerComponent from "Components/Spinner/Spinner";
import { useCommonState } from "Components/CustomHooks";

const CreateTest = () => {
    const { jsxJson } = JsonData();
    const { class_id, subject_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const { teachersState } = useCommonState();

    
    useEffect(() => {
        if (class_id && subject_id) {
            dispatch(getBooks({ classroom_id: class_id, subject_id: subject_id }));
            dispatch(get_student_details({ classroom_id: class_id, page: 1 }));
        }
    }, [dispatch, class_id, subject_id]);

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
        <div className="p-5 h-100">
            {teachersState?.books?.loading ? (
                <div className="w-100 h-100 row align-items-center justify-content-center">
                    <div className="col-6 text-center">
                        <SpinnerComponent />
                        <p className="py-3">Getting Books...</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="col" style={{ height: "80%" }}>
                        <div className="h-100 overflowY">
                            <div className="row">
                                {Inputfunctions(jsxJson?.create_test || [])}
                            </div>
                        </div>
                    </div>

                    <div
                        className="col d-flex justify-content-end align-items-center" style={{ height: "20%" }}>
                        <ButtonComponent
                            type="button"
                            className="btn-brand-color px-5 py-2"
                            clickFunction={handleNextClick}
                            btnDisable={teachersState?.save_schedule_status === "loading"}
                            buttonName={
                                teachersState?.save_schedule_status === "loading" ? (
                                    <span className="d-flex align-items-center justify-content-center gap-2">
                                        <SpinnerComponent size="sm" /> Schedule Test
                                    </span>
                                ) : (
                                    "Schedule Test"
                                )
                            }
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default CreateTest;

