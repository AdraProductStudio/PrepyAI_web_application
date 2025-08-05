import React, { Fragment, useEffect } from "react";
import { initializeDB, useCommonState, useDispatch } from "Components/CustomHooks";
// import { CalculateTestTime } from "ResuableFunctions/CalculateTestTime";
import { getQuestionFromDb, updateSelectedQuestionIndex } from "Views/Students/Slices/TeacherSlice";
import { Card } from "react-bootstrap";
import ProgressBarComp from "Components/Progress/ProgressBar";
import ButtonComponent from "Components/Button/Button";
import Icons from "Utils/Icons";
import Checkbox from "Components/Input/Checkbox";
import { handleUpdateAnswer } from "Views/Students/Actions/TeacherAction";

const McqTest = () => {
    const { teacherState } = useCommonState();
    const dispatch = useDispatch();

    const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") alert("Tab switch is not allowed during the session!");
    };

    useEffect(() => {
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);


    useEffect(() => {
        initializeDB(process.env.REACT_APP_INDEXEDDB_DATABASE_NAME, process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION, process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME)
            .then((db) => {
                const transaction = db.transaction(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME, "readonly");
                const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME);

                const getAllRequest = store.getAll();
                getAllRequest.onsuccess = function () {
                    dispatch(getQuestionFromDb(getAllRequest.result))
                };
                getAllRequest.onerror = function (event) {
                    console.error("Error fetching data from object store:", event.target.error);
                };
            })
            .catch((error) => {
                console.error("Database initialization failed:", error);
            });
    }, [dispatch]);

    // useEffect(() => {
    //     if (!teacherState?.mcq_test?.isDataPresentInIndexedDb) {
    //         dispatch(handleGetQuestions)
    //     }
    // }, [teacherState?.mcq_test?.isDataPresentInIndexedDb,dispatch])

    useEffect(() => {
        if (teacherState?.mcq_test?.test_end_on) {
            // const timer = setInterval(() => {
            //     const updatedTimeLeft = CalculateTestTime(teacherState?.mcq_test?.test_end_on);
            //     dispatch(caluculateRemainingTime({ remaining_time: updatedTimeLeft }))

            //     // if (!updatedTimeLeft) {
            //     //     initializeDB(process.env.REACT_APP_INDEXEDDB_DATABASE_NAME, process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION, process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME)
            //     //         .then((db) => {
            //     //             const transaction = db.transaction(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME, "readonly");
            //     //             const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME);
            //     //             const getAllRequest = store.getAll();
            //     //             getAllRequest.onsuccess = function () {
            //     //                 dispatch(handleCloseTestAutomatic(getAllRequest.result));
            //     //             };
            //     //             getAllRequest.onerror = function (event) {
            //     //                 console.error("Error fetching data from object store:", event.target.error);
            //     //             };
            //     //         })
            //     //         .catch((error) => {
            //     //             console.error("Database initialization failed:", error);
            //     //         });
            //     //     clearInterval(timer);
            //     // }
            // }, 1000);

            // return () => clearInterval(timer);
        }
    }, [teacherState?.mcq_test?.test_end_on, dispatch])

    return (
        <section className='main'>
            <div className="h-100 d-flex flex-wrap p-5">
                <div className="col-3 d-flex flex-column">
                    <Card className='h-100 border-0 shadow-sm rounded-3'>
                        <Card.Header>
                            <h5 className='mb-0 py-2'>Number of Questions</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="col-12 d-flex flex-wrap">
                                {teacherState?.mcq_test?.questions?.map((question, questionInd) => (
                                    <div className="col-2 my-2" key={questionInd}>
                                        <ButtonComponent
                                            className={`question_number_btn p-1 ${question?.candidate_answer ? "questions_answerd" : questionInd === teacherState?.mcq_test?.selectedQuestionIndex || 0 ? "active" : ""}`}
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
                    <Card className='h-100 border-0 shadow-sm rounded-3'>
                        <Card.Header>
                            <h5 className='mb-0 py-2'>Questions</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className='mb-4'>
                                <ProgressBarComp progressNow={teacherState?.mcq_test?.answeredQuestionPercentage} animated={false} className="question-progress-bar" />
                            </div>
                            <div className="w-100 d-flex flex-wrap mb-3">
                                <div className="col">
                                    <h5>
                                        <strong>Question No:</strong>
                                        <span>{teacherState?.mcq_test?.selectedQuestionIndex + 1}</span>
                                    </h5>
                                </div>
                                <div className="col text-end me-3">
                                    {
                                        teacherState?.mcq_test?.remaining_time ?
                                            <Fragment>
                                                <span className='pe-2'>
                                                    {Icons?.timerIcon}
                                                </span>

                                                <span className='text-secondary pt-2'>
                                                    {teacherState?.mcq_test?.remaining_time?.minutes || '00'} : {teacherState?.mcq_test?.remaining_time?.seconds || '00'}
                                                </span>
                                            </Fragment>
                                            :
                                            null
                                    }
                                </div>
                            </div>

                            <p>{teacherState?.mcq_test?.questions[teacherState?.mcq_test?.selectedQuestionIndex]?.question}</p>
                            <div className='w-100'>
                                {teacherState?.mcq_test?.questions[teacherState?.mcq_test?.selectedQuestionIndex]?.options?.map((val, ind) => (
                                    <div className='border p-3 my-2 rounded-2 cursor-pointer' onClick={() => document.getElementById(val + ind)?.click()}>
                                        <Checkbox
                                            formType="radio"
                                            formLabel={val}
                                            name={val}
                                            formClassName="ps-4 test_radio_btn"
                                            formId={val + ind}
                                            formName={"options"}
                                            change={() => dispatch(handleUpdateAnswer({ questionsArray: teacherState?.mcq_test?.questions, updationInd: teacherState?.mcq_test?.selectedQuestionIndex, ans: val }))}
                                            formChecked={teacherState?.mcq_test?.questions[teacherState?.mcq_test?.selectedQuestionIndex]?.candidate_answer === val}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                        <Card.Footer className='py-4 bg-transparent border-0 d-flex flex-wrap'>
                            <div className="col">
                                <ButtonComponent
                                    className="btn-secondary px-5"
                                    buttonName="Previous"
                                    clickFunction={() => dispatch(updateSelectedQuestionIndex({ selectedQuestionIndex: teacherState?.mcq_test?.selectedQuestionIndex - 1 }))}
                                    btnDisable={teacherState?.mcq_test?.selectedQuestionIndex === 0}
                                />
                            </div>
                            <div className="col text-end">
                                <ButtonComponent
                                    className="btn-secondary px-5"
                                    buttonName={teacherState?.mcq_test?.questions?.length - 1 <= teacherState?.mcq_test?.selectedQuestionIndex ? "Submit" : "Next"}
                                    clickFunction={teacherState?.mcq_test?.questions?.length - 1 <= teacherState?.mcq_test?.selectedQuestionIndex ?
                                        // () => dispatch(handleCloseTestManual)
                                        null
                                        :
                                        () => dispatch(updateSelectedQuestionIndex({ selectedQuestionIndex: teacherState?.mcq_test?.selectedQuestionIndex + 1 }))
                                    }
                                />
                            </div>
                        </Card.Footer>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default McqTest;