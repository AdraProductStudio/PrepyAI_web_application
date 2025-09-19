import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import ButtonComponent from "Components/Button/Button";
import QuestionPaperCard from "Components/Card/QuestionPaperCard";
import Icons from "Utils/Icons";
import { get_test_questions, scheduleTest } from "../Actions/TeacherActions";
import { useCommonState } from "Components/CustomHooks";
import ButtonSpinner from "Components/Spinner/ButtonSpinner";
import Spinner from "Components/Spinner/CustomSpinner";

const PreviewTest = () => {
    const { test_id } = useParams();
    const dispatch = useDispatch();
    const { teachersState } = useCommonState()
    const navigate = useNavigate();
    const {class_id,subject_id} = useParams();

    useEffect(() => {
        dispatch(get_test_questions({ test_id: test_id }));
    }, []);

    // --- Download with answers ---
    const handleDownload = async () => {
        const questions = teachersState?.test_questions?.question_with_answer?.Set_1 || [];

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
        dispatch(get_test_questions({ test_id: test_id }));
        const questions = teachersState?.test_questions?.questions_without_answer?.Set_1 || [];

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
            {teachersState?.get_test_questions_loading ?
                <div className="h-100 row align-items-center justify-content-center">
                    <div className="col-6 text-center">
                        <Spinner />
                        <p>Getting Questions...</p>
                    </div>
                </div>
                :
                <React.Fragment>
                    <div className="col" style={{ height: "80%" }}>
                        <div className="h-100 overflowY">
                            <div className="row">
                                {Array.from({ length: 3 }).map((_, index) => (
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

                    <div className="col d-flex justify-content-between align-items-center" style={{ height: "20%" }} >
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
                                <ButtonSpinner
                                    type="button"
                                    className="w-100 btn-brand-color py-2"
                                    title={teachersState?.schedule_test?.glow ? "Scheduleing Test " : " Schedule Test in Online"}
                                    is_spinner={teachersState?.schedule_test?.glow}
                                    clickFunction={() => dispatch(scheduleTest(test_id,navigate,class_id,subject_id))}
                                    buttonName="Schedule Test in Online"
                                />
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            }
        </div>
    );
};

export default PreviewTest;