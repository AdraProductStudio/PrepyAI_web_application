import React, { Fragment, useEffect } from "react";
import { initializeDB, useCommonState, useDispatch } from "Components/CustomHooks";
import { CalculateTestTime } from "ResuableFunctions/CalculateTestTime";
import { caluculateRemainingTime, getQuestionFromDb, updateSelectedQuestionIndex } from "Views/Students/Slices/StudentSlice";
import { Card } from "react-bootstrap";
import ProgressBarComp from "Components/Progress/ProgressBar";
import ButtonComponent from "Components/Button/Button";
import Icons from "Utils/Icons";
import Checkbox from "Components/Input/Checkbox";
import { handleUpdateAnswer } from "Views/Students/Actions/StudentAction";

const McqTest = () => {
    const { studentState } = useCommonState();
    const dispatch = useDispatch();

    const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") alert("Tab switch is not allowed during the session!");
    };

    useEffect(() => {
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    useEffect(() => {
        if (studentState?.mcq_test.is_question_loaded) return;
        initializeDB(process.env.REACT_APP_INDEXEDDB_DATABASE_NAME, process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION, process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME)
            .then((db) => {
                const transaction = db.transaction(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME, "readonly");
                const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME);

                const getAllRequest = store.getAll();
                getAllRequest.onsuccess = function () {
                    dispatch(getQuestionFromDb(getAllRequest.result));
                };
                getAllRequest.onerror = function (event) {
                    console.error("Error fetching data from object store:", event.target.error);
                };
            })
            .catch((error) => {
                console.error("Database initialization failed:", error);
            });
        // dispatch(getQuestionsEndpoint({ type: "response" }))
    }, [studentState?.mcq_test.is_question_loaded, dispatch]);

    useEffect(() => {
        if (!studentState?.mcq_test?.isDataPresentInIndexedDb) {
            // dispatch(handleGetQuestions)
        }
    }, [studentState?.mcq_test?.isDataPresentInIndexedDb, dispatch])

    useEffect(() => {
        if (studentState?.mcq_test?.test_end_on) {
            const timer = setInterval(() => {
                const updatedTimeLeft = CalculateTestTime(studentState?.mcq_test?.test_end_on);

                dispatch(caluculateRemainingTime({ remaining_time: updatedTimeLeft }))
                // if (!updatedTimeLeft) {
                //     initializeDB(process.env.REACT_APP_INDEXEDDB_DATABASE_NAME, process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION, process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME)
                //         .then((db) => {
                //             const transaction = db.transaction(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME, "readonly");
                //             const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME);
                //             const getAllRequest = store.getAll();
                //             getAllRequest.onsuccess = function () {
                //                 dispatch(handleCloseTestAutomatic(getAllRequest.result));
                //             };
                //             getAllRequest.onerror = function (event) {
                //                 console.error("Error fetching data from object store:", event.target.error);
                //             };
                //         })
                //         .catch((error) => {
                //             console.error("Database initialization failed:", error);
                //         });
                //     clearInterval(timer);
                // }
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [studentState?.mcq_test?.test_end_on, dispatch])

    return (
        <section className="d-flex align-items-center test_page_card_height px-5">
            <div className="test_page_card_body_height d-flex flex-wrap">
                <div className="col-3">
                    <Card className="border-0 shadow-sm rounded-3" style={{ height: "100%" }}>
                        <Card.Header className="bg-transparent border-bottom">
                            <h5 className="mb-0 py-2">Number of Questions</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="col-12 d-flex flex-wrap">
                                {studentState?.mcq_test?.questions?.map((question, questionInd) => (
                                    <div className="col-2 my-2" key={questionInd}>
                                        <ButtonComponent
                                            className={`question_number_btn p-1 ${question?.candidate_answer ? "questions_answerd" : questionInd === studentState?.mcq_test?.selectedQuestionIndex || 0 ? "active" : ""}`}
                                            buttonName={questionInd + 1}
                                            clickFunction={() => dispatch(updateSelectedQuestionIndex({ selectedQuestionIndex: questionInd }))}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-9 px-2">
                    <Card className="border-0 shadow-sm rounded-3" style={{ height: "90%" }}>
                        <Card.Header className="bg-transparent border-bottom">
                            <h5 className="mb-0 py-2">Book Name : Chapter -2</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="mb-4">
                                <ProgressBarComp progressNow={studentState?.mcq_test?.answeredQuestionPercentage} animated={false} className="question-progress-bar" />
                            </div>
                            <div className="w-100 d-flex flex-wrap mb-3">
                                <div className="col">
                                    <h5>
                                        <strong>Question No:</strong>
                                        <span>{studentState?.mcq_test?.selectedQuestionIndex + 1}</span>
                                    </h5>
                                </div>
                                <div className="col text-end me-3">
                                    {
                                        studentState?.mcq_test?.remaining_time ?
                                            <Fragment>
                                                <span className="pe-2">
                                                    {Icons?.timerIcon}
                                                </span>

                                                <span className="text-secondary pt-2">
                                                    {studentState?.mcq_test?.remaining_time?.minutes || "00"} : {studentState?.mcq_test?.remaining_time?.seconds || "00"}
                                                </span>
                                            </Fragment>
                                            :
                                            null
                                    }
                                </div>
                            </div>

                            <p>{studentState?.mcq_test?.questions[studentState?.mcq_test?.selectedQuestionIndex]?.question}</p>
                            <div className="w-100">
                                {studentState?.mcq_test?.questions[studentState?.mcq_test?.selectedQuestionIndex]?.options?.map((val, ind) => (
                                    <div className={`border p-3 my-2 rounded-2 cursor-pointer ${studentState?.mcq_test?.questions[studentState?.mcq_test?.selectedQuestionIndex]?.candidate_answer === val ? "selected_question_active" : ''}`} onClick={() => document.getElementById(val + ind)?.click()} key={ind}>
                                        <Checkbox
                                            formType="radio"
                                            formLabel={val}
                                            name={val}
                                            formClassName="ps-4 test_radio_btn"
                                            formId={val + ind}
                                            formName={"options"}
                                            change={() => dispatch(handleUpdateAnswer({ questionsArray: studentState?.mcq_test?.questions, updationInd: studentState?.mcq_test?.selectedQuestionIndex, ans: val }))}
                                            formChecked={studentState?.mcq_test?.questions[studentState?.mcq_test?.selectedQuestionIndex]?.candidate_answer === val}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                    <div className="py-4 bg-transparent border-0 d-flex flex-wrap">
                        <div className="col">
                            <ButtonComponent className="btn-transparent border px-3"
                                clickFunction={() => dispatch(updateSelectedQuestionIndex({ selectedQuestionIndex: studentState?.mcq_test?.selectedQuestionIndex - 1 }))}
                                btnDisable={studentState?.mcq_test?.selectedQuestionIndex === 0} >

                                <span className="pe-2">{Icons?.arrowLeftIcon}</span>
                                Previous
                            </ButtonComponent>
                        </div>
                        <div className="col text-end">
                            <ButtonComponent
                                className={`btn-transparent border px-4 py-2 ${studentState?.mcq_test?.questions?.length - 1 <= studentState?.mcq_test?.selectedQuestionIndex ? "btn-brand-color" : ""}`}
                                clickFunction={studentState?.mcq_test?.questions?.length - 1 <= studentState?.mcq_test?.selectedQuestionIndex ?
                                    // () => dispatch(handleCloseTestManual)
                                    null
                                    :
                                    () => dispatch(updateSelectedQuestionIndex({ selectedQuestionIndex: studentState?.mcq_test?.selectedQuestionIndex + 1 }))
                                }>

                                {studentState?.mcq_test?.questions?.length - 1 <= studentState?.mcq_test?.selectedQuestionIndex ?
                                    <Fragment>
                                        Submit
                                        <span className="ps-2">{Icons?.arrowRightWhiteIcon}</span>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        Next
                                        <span className="ps-2">{Icons?.arrowRightIcon}</span>
                                    </Fragment>
                                }
                            </ButtonComponent>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default McqTest;