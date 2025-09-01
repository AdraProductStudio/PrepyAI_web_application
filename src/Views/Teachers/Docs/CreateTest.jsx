// import ButtonComponent from "Components/Button/Button";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { Form, useParams } from "react-router-dom";
// import { Inputfunctions } from "ResuableFunctions/Inputfunctions"
// import { getBooks } from "Views/Common/Actions/Common_action";
// import JsonData from "Views/Teachers/Utils/JsonData";
// import { get_student_details, saveSchedule } from "../Actions/TeacherActions";


// const CreateTest = () => {
//     const { jsxJson } = JsonData();
//     const { class_id, subject_id } = useParams();
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(getBooks({ classroom_id: "18", subject_id: "1" }));
//         dispatch(get_student_details({ classroom_id: "18", page: 1 }))
//     }, [dispatch, class_id, subject_id]);

//     const handleNextClick = () => {
//         const payload = {
//             classroom_id: 18,
//             subject_id: 1,
//             book_id: 41,
//             start_date: "2025-08-07",
//             start_time: "13:00:00",
//             type_of_questions: "long_answer",
//             mode_of_test: "Online",
//             students: [88, 90, 91],
//             set_questions: 1,
//             no_of_questions: 5,
//             level_of_test: "Easy",
//             chapter_range: [
//                 [32, 87]
//             ]
//         };


//         dispatch(saveSchedule(payload));
//     };

//     return (
//         <div className="p-5 h-100">
//             <div className="col" style={{ height: "80%" }}>
//                 <div className="h-100 overflowY">
//                     <div className="row">
//                         {Inputfunctions(jsxJson?.create_test || [])}
//                     </div>
//                 </div>
//             </div>
//             <div className="col d-flex justify-content-end align-items-center" style={{ height: "20%" }}>
//                 <ButtonComponent
//                     type="button"
//                     className="btn-brand-color px-5"
//                     clickFunction={handleNextClick}
//                     buttonName="Next"
//                 />
//             </div>
//         </div>
//     );
// };

// export default CreateTest;


import { saveSchedule } from "../Actions/TeacherActions";
import { useSelector, useDispatch } from "react-redux";
import ButtonComponent from "Components/Button/Button";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions"
import { getBooks } from "Views/Common/Actions/Common_action";
import JsonData from "Views/Teachers/Utils/JsonData";
import { get_student_details, } from "../Actions/TeacherActions";
import { useNavigate } from "react-router-dom";

// const CreateTest = () => {
//     const { jsxJson } = JsonData();
//     const { class_id, subject_id } = useParams();
//     const dispatch = useDispatch();

//     // Access form values from Redux
//     const teachersState = useSelector((state) => state.teachersState);

//     useEffect(() => {
//         dispatch(getBooks({ classroom_id: "18", subject_id: "1" }));
//         dispatch(get_student_details({ classroom_id: "18", page: 1 }));
//     }, [dispatch, class_id, subject_id]);


//     const handleNextClick = () => {
//         const payload = {
//             classroom_id: Number(class_id) || 18,
//             subject_id: Number(subject_id) || 1,
//             book_id: teachersState?.create_test?.selected_books?.book_id,
//             start_date: teachersState?.create_test?.selected_date,
//             start_time: teachersState?.create_test?.selected_time,
//             type_of_questions:
//                 teachersState?.create_test?.question_type === "Long Questions"
//                     ? "long_answer"
//                     : "mcq",
//             mode_of_test: teachersState?.create_test?.test_mode,

//             students: [88,89,90,91],
//             set_questions: Number(teachersState?.create_test?.question_set),
//             no_of_questions: Number(teachersState?.create_test?.question_quantity),
//             level_of_test: "Easy",
//             chapter_range: [[32, 87]] 
//         };

//         console.log("Sending payload:", payload);
//         dispatch(saveSchedule(payload));
//     };

//     return (
//         <div className="p-5 h-100">
//             <div className="col" style={{ height: "80%" }}>
//                 <div className="h-100 overflowY">
//                     <div className="row">
//                         {Inputfunctions(jsxJson?.create_test || [])}
//                     </div>
//                 </div>
//             </div>
//             <div className="col d-flex justify-content-end align-items-center" style={{ height: "20%" }}>
//                 <ButtonComponent
//                     type="button"
//                     className="btn-brand-color px-5"
//                     clickFunction={handleNextClick}
//                     buttonName="Next"
//                 />
//             </div>
//         </div>
//     );
// };
const CreateTest = () => {
    const { jsxJson } = JsonData();
    const { class_id, subject_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const teachersState = useSelector((state) => state.teachersState);
    const isLoading = teachersState?.save_schedule_loading; 

    useEffect(() => {
        dispatch(getBooks({ classroom_id: "18", subject_id: "1" }));
        dispatch(get_student_details({ classroom_id: "18", page: 1 }));
    }, [dispatch, class_id, subject_id]);

    const handleNextClick = () => {
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
    };

    return (
        <div className="p-5 h-100">
            <div className="col" style={{ height: "80%" }}>
                <div className="h-100 overflowY">
                    <div className="row">
                        {Inputfunctions(jsxJson?.create_test || [])}
                    </div>
                </div>
            </div>
            <div className="col d-flex justify-content-end align-items-center" style={{ height: "20%" }}>
                <ButtonComponent
                    type="button"
                    className="btn-brand-color px-5"
                    clickFunction={handleNextClick}
                    buttonName={isLoading ? "Loading..." : "Next"}
                    disabled={isLoading}
                />
            </div>
        </div>
    );
};

export default CreateTest;



