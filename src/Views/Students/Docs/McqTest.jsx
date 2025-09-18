import React, { Fragment, useEffect } from "react";
import { initializeDB, useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";
import { CalculateTestTime } from "ResuableFunctions/CalculateTestTime";
import { getQuestionFromDb, updateRemainingTestTiming, updateSelectedQuestionIndex } from "Views/Students/Slices/StudentSlice";
import { Card } from "react-bootstrap";
import ProgressBarComp from "Components/Progress/ProgressBar";
import ButtonComponent from "Components/Button/Button";
import Icons from "Utils/Icons";
import Checkbox from "Components/Input/Checkbox";
import { handleCloseTestAutomatic, handleUpdateAnswer, loadQuestionsFromIndexedDB } from "Views/Students/Actions/StudentAction";
import { updateModalShow } from "Views/Common/Slices/Common_slice"
import { useRef } from "react";

const McqTest = () => {
    const dispatch = useDispatch()
    const navigate = useCustomNavigate()
    const timerRef = useRef(null);

    const { studentState } = useCommonState()
    const test_end_on = studentState?.mcq_test?.test_end_on
    const remaining_time = studentState?.mcq_test?.remaining_time
    const test_id = studentState?.test_id

    // Load questions from IndexedDB when page loads
    useEffect(() => {
        dispatch(loadQuestionsFromIndexedDB())
    }, [])

    const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
            alert("Tab switch is not allowed during the session!")
        }
    }

    useEffect(() => {
        document.addEventListener("visibilitychange", handleVisibilityChange)
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, [])

    // useEffect(() => {
    //     initializeDB(process.env.REACT_APP_INDEXEDDB_DATABASE_NAME, process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION, process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME)
    //         .then((db) => {
    //             const transaction = db.transaction(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME, "readonly");
    //             const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME);

    //             const getAllRequest = store.getAll();
    //             getAllRequest.onsuccess = function () {
    //                 dispatch(getQuestionFromDb(getAllRequest.result))
    //             };
    //             getAllRequest.onerror = function (event) {
    //                 console.error("Error fetching data from object store:", event.target.error);
    //             };
    //         })
    //         .catch((error) => {
    //             console.error("Database initialization failed:", error)
    //         })
    // }, [])

    // useEffect(() => {
    //     console.log("Effect triggered with test_end_on:", test_end_on)

    //     if (!test_end_on) return

    //     timerRef.current = setInterval(() => {
    //         const timeLeft = CalculateTestTime(test_end_on);
    //         console.log(timeLeft, "leftttt");

    //         if (timeLeft) {
    //             dispatch(updateRemainingTestTiming(timeLeft));
    //         } else {
    //             clearInterval(timerRef.current);
    //             alert('auto submit')
    //             // Auto-submit here
                
    //         }
    //     }, 1000);

    //     return () => clearInterval(timerRef.current);
    // }, [test_end_on])

    useEffect(() => {
        if (!test_end_on) return
        if (studentState?.mcq_test?.submit_test) return

        timerRef.current = setInterval(() => {
            const timeLeft = CalculateTestTime(test_end_on)

            if (timeLeft) {
                dispatch(updateRemainingTestTiming(timeLeft))
            } else {
                clearInterval(timerRef.current)
                // Auto-submit
                // fetch answers from IndexedDB and auto-submit
                initializeDB(
                    process.env.REACT_APP_INDEXEDDB_DATABASE_NAME,
                    process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION,
                    process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME
                )
                    .then((db) => {
                        const tx = db.transaction(
                            process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME,
                            "readonly"
                        )
                        const store = tx.objectStore(
                            process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME
                        )
                        const getAllRequest = store.getAll();

                        getAllRequest.onsuccess = function () {
                            dispatch(handleCloseTestAutomatic(test_id, getAllRequest.result, navigate))
                        }
                        getAllRequest.onerror = (err) => {
                            console.error("IndexedDB fetch failed", err);
                            dispatch(handleCloseTestAutomatic(test_id, [], navigate))
                        }
                    })
                    .catch((err) => {
                        console.error("DB init failed for auto-submit", err)
                        dispatch(handleCloseTestAutomatic(test_id, [], navigate))
                    })
            }
        }, 1000)

        return () => clearInterval(timerRef.current)
    }, [test_end_on])

    const currentQuestionIndex = studentState?.mcq_test?.selectedQuestionIndex || 0;
    const currentQuestion = studentState?.mcq_test?.questions?.[currentQuestionIndex] || {};

    const handleOptionSelect = (optionId) => {
        dispatch(
            handleUpdateAnswer({
                updationInd: currentQuestionIndex, // Matches the IndexedDB "id"
                ans: optionId
            })
        )
    }

    const goToNext = () => {
        if (currentQuestionIndex < studentState.mcq_test.questions.length - 1) {
            dispatch(updateSelectedQuestionIndex({ selectedQuestionIndex: currentQuestionIndex + 1 }))
        }
    }

    const goToPrev = () => {
        if (currentQuestionIndex > 0) {
            dispatch(updateSelectedQuestionIndex({ selectedQuestionIndex: currentQuestionIndex - 1 }))
        }
    }

    const handleSubmit = () => {
        dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "test", modal_type: "submit_test" }))
    }


    return (
        <section className="d-flex align-items-center test_page_card_height px-5">
            <div className="test_page_card_body_height d-flex flex-wrap w-100">
                {/* Left Panel - Question Numbers */}
                <div className="col-3">
                    <Card className="border-0 shadow rounded-3" style={{ height: "100%" }}>
                        <Card.Header className="bg-transparent border-bottom">
                            <h5 className="mb-0 py-2">Number of Questions</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="col-12 d-flex flex-wrap">
                                {studentState?.mcq_test?.questions?.map((question, questionInd) => {
                                    let btnClass = "question_number_btn p-1";
                                    if (question?.candidate_answer) {
                                        btnClass += "btn btn-brand-color alt-hover"; // Pink
                                    } else if (questionInd === currentQuestionIndex) {
                                        btnClass += " active"; // Black
                                    } else {
                                        btnClass += " questions_unanswered"; // White
                                    }

                                    return (
                                        <div className="col-2 my-2" key={questionInd}>
                                            <ButtonComponent
                                                className={btnClass}
                                                buttonName={questionInd + 1}
                                                clickFunction={() =>
                                                    dispatch(updateSelectedQuestionIndex({ selectedQuestionIndex: questionInd }))
                                                }
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                {/* Right Panel - Current Question */}
                <div className="col-9 px-2">
                    <Card className="border-0 shadow rounded-3" style={{ height: "90%" }}>
                        <Card.Body>
                            <div className="col text-end m-3">
                                {remaining_time ? (
                                    <Fragment>
                                        <span className="pe-2">{Icons?.timerIcon}</span>
                                        <span className="text-secondary pt-2">
                                            {remaining_time.hours > 0 && String(remaining_time.hours).padStart(2, "0") + ":"}
                                            {String(remaining_time.minutes).padStart(2, "0")}
                                            :
                                            {String(remaining_time.seconds).padStart(2, "0")}
                                        </span>
                                    </Fragment>
                                ) : (
                                    <span className="text-secondary">⌛ Loading timer...</span>
                                )}
                            </div>


                            <div className="my-4">
                                <ProgressBarComp progressNow={studentState?.mcq_test?.answeredQuestionPercentage} animated={false} className="question-progress-bar" />
                            </div>

                            <h5>
                                <strong>Question No : </strong>
                                <span>{currentQuestionIndex + 1}</span>
                            </h5>
                            <p>{currentQuestion?.Question}</p>

                            <div className="w-100">
                                {currentQuestion?.options?.map((opt, idx) => (
                                    <div
                                        key={opt.id}
                                        className={`border p-3 my-2 rounded-2 cursor-pointer test_radio_box ${currentQuestion?.candidate_answer === opt.id
                                            ? "selected_question_active"
                                            : ""
                                            }`}
                                        onClick={() => handleOptionSelect(opt.id)}
                                    >
                                        <Checkbox
                                            formType="radio"
                                            formLabel={opt.option}
                                            name={`option-${currentQuestionIndex}`}
                                            formClassName="ps-4 test_radio_btn"
                                            formId={`${opt.id}-${idx}`}
                                            formName="options"
                                            change={() => handleOptionSelect(opt.id)}
                                            formChecked={currentQuestion?.candidate_answer === opt.id}
                                        />
                                    </div>
                                ))}
                            </div>

                        </Card.Body>
                    </Card>

                    {/* Navigation Buttons */}
                    <div className="d-flex justify-content-between mt-4">
                        <ButtonComponent
                            className="prev_btn"
                            clickFunction={goToPrev}
                            btnDisable={currentQuestionIndex === 0}
                            buttonName={<>{Icons.arrowLeftIcon} Previous</>}
                        >
                           
                        </ButtonComponent>

                        {
                            currentQuestionIndex !== studentState?.mcq_test?.questions.length - 1 ? (
                                <ButtonComponent
                                    className="nxt_btn"
                                    clickFunction={goToNext}
                                    buttonName={
                                        <>
                                            Next 
                                            <span className="arrow-white ms-2">{Icons.arrowRightWhiteIcon}</span>
                                            <span className="arrow-black ms-2">{Icons.arrowRightIcon}</span>
                                            
                                        </>
                                    }
                                />
                            )
                                : (
                                    <ButtonComponent className="btn btn-brand-color" buttonName="Submit test" clickFunction={handleSubmit} />
                                )
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}

export default McqTest