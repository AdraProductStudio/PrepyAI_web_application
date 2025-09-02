// import ButtonComponent from "Components/Button/Button";
// import QuestionPaperCard from "Components/Card/QuestionPaperCard";
// import { useDispatch } from "Components/CustomHooks";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import Icons from "Utils/Icons";
// import { get_test_questions } from "../Actions/TeacherActions";



// const PreviewTest = ({ test_id }) => {
//     const location = useLocation();
//     const payload = location.state?.payload || {}; 
//     const [sets, setSets] = useState(0);
//      const dispatch = useDispatch();

//     useEffect(() => {
//         if (payload?.set_questions) {
//             setSets(payload.set_questions);
//         }
//     }, [payload]);

   

//     const handleDownload = () => {
//         const payload = {
//             test_id
//         };
//         dispatch(get_test_questions(payload)).then(() => {
//             console.log("Download Questions & Answers");
           
//         });
//     };

//     const handlePrint = () => {
//         const payload = {
//             test_id
//         };
//         dispatch(get_test_questions(payload)).then(() => {
//             console.log("Print Test for Offline");
            
//         });
//     };


//     return (
//         <div className="p-5 h-100">
//             <div className="col" style={{ height: "80%" }}>
//                 <div className="h-100 overflowY">
//                     <div className="row">
//                         {Array.from({ length: sets }).map((_, index) => (
//                             <div className="col-3 p-2" key={index}>
//                                 <QuestionPaperCard
//                                     className="mb-3"
//                                     title={`Question Paper Set ${index + 1}`}
                                    
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             <div className="col d-flex justify-content-between align-items-center" style={{ height: "20%" }}>
//                 <div className="col-3">
//                     <ButtonComponent
//                         type="button"
//                         className="w-100 btn-brand-outline py-2"
//                         clickFunction={handleDownload}
//                     >
//                         <span className="col-2 pe-4">{Icons.download_question_icon}</span>
//                         Download Question & Answer
//                     </ButtonComponent>
//                 </div>
//                 <div className="col-4 row justify-content-end">
//                     <div className="col p-2">
//                         <ButtonComponent
//                             type="button"
//                             className="w-100 btn-brand-color py-2"
//                             buttonName="Print Test for Offline"
//                             clickFunction={handlePrint}
//                         />
//                     </div>
//                     <div className="col p-2">
//                         <ButtonComponent
//                             type="button"
//                             className="w-100 btn-brand-color py-2"
//                             onClick={() => console.log("Schedule Test")}
//                             buttonName="Schedule Test in Online"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PreviewTest;


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { saveAs } from "file-saver";
import ButtonComponent from "Components/Button/Button";
import QuestionPaperCard from "Components/Card/QuestionPaperCard";
import Icons from "Utils/Icons";
import { get_test_questions } from "../Actions/TeacherActions";
import { useCommonState } from "Components/CustomHooks";

const PreviewTest = ({ test_id }) => {
    const location = useLocation();
    const payload = location.state?.payload || {};
    const [sets, setSets] = useState(0);
    const dispatch = useDispatch();
    const { test_questions } = useSelector((state) => state.teachersState);
    const { teachersState } = useCommonState()

    useEffect(() => {
        if (payload?.set_questions) {
            setSets(payload.set_questions);
        }
    }, [payload]);

    // --- Download with answers ---
    const handleDownload = async () => {
        dispatch(get_test_questions({ test_id : teachersState?.test_id}));
        const questions = test_questions?.question_with_answer?.Set_1 || [];

        if (!questions.length) {
            alert("No questions with answers found!");
            return;
        }

        let content = "";
        questions.forEach((q) => {
            content += `Q${q.Question_no}: ${q.Question}\n`;
            q.options.forEach((opt) => {
                content += `   ${opt.option} ${opt.answer ? "(Correct)" : ""}\n`;
            });
            content += `Explanation: ${q.Explanation}\n\n`;
        });

        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "questions_with_answers.txt");
    };

    // --- Print without answers ---
    const handlePrint = async () => {
        dispatch(get_test_questions({ test_id }));
        const questions = test_questions?.questions_without_answer?.Set_1 || [];

        if (!questions.length) {
            alert("No questions found for print!");
            return;
        }

        let content = "";
        questions.forEach((q) => {
            content += `Q${q.Question_no}: ${q.Question}\n`;
            q.options.forEach((opt) => {
                content += `   ${opt.option}\n`;
            });
            // content += `Explanation: ${q.Explanation}\n\n`;
        });

        const printWindow = window.open("", "_blank");
        printWindow.document.write(`<pre>${content}</pre>`);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="p-5 h-100">
            <div className="col" style={{ height: "80%" }}>
                <div className="h-100 overflowY">
                    <div className="row">
                        {Array.from({ length: sets }).map((_, index) => (
                            <div className="col-3 p-2" key={index}>
                                <QuestionPaperCard
                                    className="mb-3"
                                    title={`Question Paper Set ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div
                className="col d-flex justify-content-between align-items-center"
                style={{ height: "20%" }}
            >
                <div className="col-3">
                    <ButtonComponent
                        type="button"
                        className="w-100 btn-brand-outline py-2"
                        clickFunction={handleDownload}
                    >
                        <span className="col-2 pe-4">{Icons.download_question_icon}</span>
                        Download Question & Answer
                    </ButtonComponent>
                </div>
                <div className="col-4 row justify-content-end">
                    <div className="col p-2">
                        <ButtonComponent
                            type="button"
                            className="w-100 btn-brand-color py-2"
                            buttonName="Print Test for Offline"
                            clickFunction={handlePrint}
                        />
                    </div>
                    <div className="col p-2">
                        <ButtonComponent
                            type="button"
                            className="w-100 btn-brand-color py-2"
                            onClick={() => console.log("Schedule Test")}
                            buttonName="Schedule Test in Online"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewTest;
