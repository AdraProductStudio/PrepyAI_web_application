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
        dispatch(getBooks({ classroom_id: "18", subject_id: "1" }));
        dispatch(get_student_details({ classroom_id: "18", page: 1 }));
    }, [dispatch, class_id, subject_id]);

    const handleNextClick = () => {
        if (currentStep === 1 && !teachersState?.create_test?.selected_books?.book_id) {
            alert("Please select a book before continuing.");
            return;
        }

        if (currentStep === 2 && (!teachersState?.create_test?.selected_date || !teachersState?.create_test?.selected_time)) {
            alert("Please select date and time.");
            return;
        }

        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        } else {
            // Final step → build payload and save
            const payload = {
                classroom_id: Number(class_id) || 18,
                subject_id: Number(subject_id) || 1,
                book_id: teachersState?.create_test?.selected_books?.book_id,
                start_date: teachersState?.create_test?.selected_date,
                start_time: teachersState?.create_test?.selected_time,
                type_of_questions:
                    teachersState?.create_test?.question_type === "Long Questions"
                        ? "long_answer"
                        : "mcq",
                mode_of_test: teachersState?.create_test?.test_mode,
                students: [88, 89, 90, 91],
                set_questions: Number(teachersState?.create_test?.question_set),
                no_of_questions: Number(teachersState?.create_test?.question_quantity),
                level_of_test: "Easy",
                chapter_range: [[32, 87]]
            };

            dispatch(saveSchedule(payload, navigate));
        }
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

