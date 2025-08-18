import { initializeDB } from "Components/CustomHooks"
import axiosInstance from "Services/axiosInstance"
import { update_error, updateModalShow } from "Views/Common/Slices/Common_slice"
import {
    updateAnswers,getLearnerBooks,getAllTests,
    getAllSubjects,
    getSubjectBooks,
    getSubjectAttachments,
    getUpcomingTests,
    setUploadLearnerBook,
    getOverallPerformance,
    setClassroomCode,
    getAllTestHistory,
    getBookTestHistory,
    setUploadTestPaper,
    getMcqQuestions,
    getQuestionFromDb,
    updateTimeOverCloseTest,
    updateMcqSubmitSpinner,
    updateMcqResult,
    getOfflineTests,

} from "Views/Students/Slices/StudentSlice"


export const handleUpdateAnswer = ({ updationInd, ans }) => (dispatch) => {
    initializeDB(
        process.env.REACT_APP_INDEXEDDB_DATABASE_NAME,
        process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION,
        process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME
    ).then((db) => {
        const transaction = db.transaction(
            process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME,
            "readwrite"
        )
        const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME);

        const getRequest = store.get(updationInd)

        getRequest.onsuccess = function () {
            const questionData = getRequest.result
            if (questionData) {
                // Store clicked answer
                questionData.candidate_answer = ans

                // Save back to IndexedDB
                const putRequest = store.put(questionData)
                putRequest.onsuccess = function () {
                    // Get all updated questions and update Redux
                    const getAllRequest = store.getAll()
                    getAllRequest.onsuccess = function () {
                        dispatch(updateAnswers(getAllRequest.result))
                    }
                }
            }
        }
    }).catch(err => {
        // console.error("Error updating answer in IndexedDB", err)
    })
}

export const handleSubmitTest = (test_id, navigate) => async (dispatch) => {

    try {
        const db = await initializeDB(
            process.env.REACT_APP_INDEXEDDB_DATABASE_NAME,
            process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION,
            process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME
        )

        const transaction = db.transaction(
            process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME,
            "readonly"
        )
        const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME)
        const getAllRequest = store.getAll()

        getAllRequest.onsuccess = async function () {
            const allQuestions = getAllRequest.result

            const responses = allQuestions
                .filter(q => q.candidate_answer) // only answered
                .map(q => ({
                    Question_no: q.Question_no,
                    clicked_answer: q.candidate_answer
                }))

            const payload = { test_id, responses }
            // console.log("Submitting payload", payload)

            try {
                dispatch(updateMcqSubmitSpinner({type: "request", submit_spinner_loading: true}))
                const { data } = await axiosInstance.post("students/submit_mcq", payload)
                // console.log(data, 'validateda ansers')
                if (data?.error_code === 0) {
                    initializeDB(
                        process.env.REACT_APP_INDEXEDDB_DATABASE_NAME,
                        process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION,
                        process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME
                    ).then((db) => {
                        const transaction = db.transaction(
                            process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME,
                            "readwrite"
                        )
                        const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME);
                        const clearRequest = store.clear()

                        clearRequest.onsuccess = function () {
                            // console.log("IndexedDB cleared after successful submission.")
                        }
                        clearRequest.onerror = function (e) {
                            // console.error("Failed to clear IndexedDB:", e)
                        }
                    })
                    dispatch(updateMcqSubmitSpinner({type: "response"}))
                    dispatch(update_error({ Err: data.message, Toast_Type: "success" }))
                    dispatch(updateMcqResult({ data: data.data }));
                    dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
                    navigate('/student_dashboard/test_status')
                } else {
                    dispatch(updateMcqSubmitSpinner({type: "failure"}))
                    dispatch(update_error({ Err: data.message, Toast_Type: "error" }))
                }
            } catch (err) {
                console.error("Submit API failed", err)
                dispatch(updateMcqSubmitSpinner({type: "failure"}))
                dispatch(update_error({ Err: "Submit failed", Toast_Type: "error" }))
            }
        }
    } catch (err) {
        // console.error("Error submitting test", err)
    }
}

export const handleCloseTestAutomatic = candidate_answers => async dispatch => {
    dispatch(updateTimeOverCloseTest())
    try {
        let sendCandidateAnswers = []
        for (let i = 0; i < candidate_answers?.length; i++) {
            sendCandidateAnswers[sendCandidateAnswers?.length] = { _id: candidate_answers[i]?._id, candidate_answer: candidate_answers[i]?.candidate_answer }
        }

        dispatch(updateMcqSubmitSpinner({type: "request", submit_spinner_loading: true}))
        const { data } = await axiosInstance.post("/validate_answers", sendCandidateAnswers)
        if (data?.error_code === 0) {
            dispatch(updateMcqSubmitSpinner({type: "response"}))
        } else {
            dispatch(updateMcqSubmitSpinner({type: "failure"}))
        }
    }
    catch (Err) {
        dispatch(updateMcqSubmitSpinner({type: "failure"}))
    }
}

export const handleGetLearnerBooks = () => async (dispatch) => {
    try {
        dispatch(getLearnerBooks({ type: "request", learner_books_loading: true}))
        const {data} = await axiosInstance.get("students/get_learner_books")

        if (data?.error_code === 0) {
            dispatch(getLearnerBooks({ type: "response", data: data?.data }))
        } else {
            dispatch(getLearnerBooks({ type: "failure", message: data?.message }))
        }
    } catch (error) {
        dispatch(getLearnerBooks({ type: "failure", message: error?.message }))
    }
}

export const handleGetAllTests = () => async (dispatch) => {
    try {
        dispatch(getAllTests({ type: "request", all_tests_loading: true }))
        const { data } = await axiosInstance.get("students/get_all_tests")

        if (data?.error_code === 0) {
            dispatch(getAllTests({ type: "response", data: data?.data }))
        } else {
            dispatch(getAllTests({ type: "failure", message: data?.message }))
        }
    } catch (error) {
        dispatch(getAllTests({ type: "failure", message: error?.message }))
    }
}

export const handleGetOverallPerformance = () => async (dispatch) => {
    try {
        dispatch(getOverallPerformance({ type: "request", overall_performance_loading: true}))
        const {data} = await axiosInstance.get("students/get_dashboard_performance")
        if (data?.error_code === 0) {
            dispatch(getOverallPerformance({ type: "response", data: data?.data }))
        } else {
            dispatch(getOverallPerformance({ type: "failure", message: data?.message }))
        }
    } catch (error) {
        dispatch(getOverallPerformance({ type: "failure", message: error?.message }))
    }
}

export const handleGetAllTestHistory = () => async (dispatch) => {
    try {
        dispatch(getAllTestHistory({ type: "request", all_test_history_loading: true }))
        const {data} = await axiosInstance.get("students/get_dashboard_test_history")

        if (data?.error_code === 0) {
            dispatch(getAllTestHistory({ type: "response", data: data?.data }))
        } else {
            dispatch(getAllTestHistory({ type: "failure", message: data?.message }))
        }
    } catch (error) {
        dispatch(getAllTestHistory({ type: "failure", message: error?.message }))
    }
}

export const handleGetBookTestHistory = (book_id) => async (dispatch) => {
    try {
        dispatch(getBookTestHistory({ type: "request", book_test_history_loading: true }))
        const { data } = await axiosInstance.post("students/get_book_test_history", {book_id})
        if (data?.error_code === 0) {
            dispatch(getBookTestHistory({ type: "response", data: data?.data }))
        } else {
            dispatch(getBookTestHistory({ type: "failure", message: data?.message }))
        }
    } catch (error) {
        dispatch(getBookTestHistory({ type: "failure", message: error?.message }))
    }
}

export const handleGetAllSubjects = () => async (dispatch) => {
    try {
        dispatch(getAllSubjects({ type: "request", subjects_loading: true }))
        const {data} = await axiosInstance.get("students/get_subjects")

        if (data?.error_code === 0) {
            dispatch(getAllSubjects({ type: "response", data: data?.data }))
        } else {
            dispatch(getAllSubjects({ type: "failure", message: data?.message }))
        }
    } catch (error) {
        dispatch(getAllSubjects({ type: "failure", message: error?.message }))
    }
}

export const handleGetSubjectBooks = (subject_id) => async (dispatch) => {
    try {
         dispatch(getSubjectBooks({ type: "request", subject_books_loadingg: true }))
        const {data} = await axiosInstance.get(`students/get_subject_books?subject_id=${subject_id}`)

        if (data?.error_code === 0) {
            dispatch(getSubjectBooks({ type: "response", data: data?.data }))
        } else {
            dispatch(getSubjectBooks({ type: "failure", message: data?.message }))
        }
    } catch (error) {
        dispatch(getSubjectBooks({ type: "failure", message: error?.message }))
    }
}

export const handleGetSubjectAttachments = (subject_id) => async (dispatch) => {
    try {
        dispatch(getSubjectAttachments({ type: "request", subject_attachments_loading: true }))
        const { data } = await axiosInstance.get(`students/get_subject_attachments?subject_id=${subject_id}`)

        if (data?.error_code === 0) {
            dispatch(getSubjectAttachments({ type: "response", data: data?.data }))
        } else {
            dispatch(getSubjectAttachments({ type: "failure", message: data?.message }))
        }
    } catch (error) {
        dispatch(getSubjectAttachments({ type: "failure", message: error?.message }))
    }
}

export const handleGetUpcomingTests = () => async (dispatch) => {
    try {
         dispatch(getUpcomingTests({ type: "request", upcoming_tests_loading: true }))
        const { data } = await axiosInstance.get("students/get_upcoming_test")

        if (data?.error_code === 0) {
            dispatch(getUpcomingTests({ type: "response", data: data?.data }))
        } else {
            dispatch(getUpcomingTests({ type: "failure", message: data?.message }))
        }
    } catch (error) {
        dispatch(getUpcomingTests({ type: "failure", message: error?.message }))
    }
}

export const handleGetOfflineTests = () => async (dispatch) => {
    try {
         dispatch(getOfflineTests({ type: "request", offline_tests_loading: true }))
        const { data } = await axiosInstance.get("students/get_offline_test")

        if (data?.error_code === 0) {
            dispatch(getOfflineTests({ type: "response", data: data?.data }))
        } else {
            dispatch(getOfflineTests({ type: "failure", message: data?.message }))
        }
    } catch (error) {
        dispatch(getOfflineTests({ type: "failure", message: error?.message }))
    }
}

// export const handleStartTest = (test_id, navigate) => async (dispatch) => {
//     console.log(test_id, 'test id')
//     try {
//         dispatch(getMcqQuestions({ type: "request", loading: true }))
//         const { data } = await axiosInstance.post("students/start_test", {test_id})

//         if (data?.error_code === 0) {
//             dispatch(getMcqQuestions({ type: "response", data: data?.data, loading: false }))
//             dispatch(update_error({ Err: data.message, Toast_Type: "success" }))
//             dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
//             navigate(`/student_dashboard/test`)
//         } else {
//             dispatch(getMcqQuestions({ type: "failure", loading: false }))
//             dispatch(update_error({ Err: data.message, Toast_Type: "error" }))
//         }
//     } catch (error) {
//         dispatch(getMcqQuestions({ type: "failure", loading: false }))
//         dispatch(update_error({ Err: 'Something went wrong', Toast_Type: "error" }))
//     }
// }

export const handleStartTest = (test_id, navigate) => async (dispatch) => {
    try {
        dispatch(getMcqQuestions({ type: "request", loading: true }));
        const { data } = await axiosInstance.post("students/start_test", { test_id });

        if (data?.error_code === 0) {
            const questions = data?.data || [];

            // Store in IndexedDB
            initializeDB(
                process.env.REACT_APP_INDEXEDDB_DATABASE_NAME,
                process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION,
                process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME
            ).then((db) => {
                const transaction = db.transaction(
                    process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME,
                    "readwrite"
                );
                const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME);

                questions.forEach((q, index) => {
                    store.put({
                        ...q,
                        id: index, // primary key in IndexedDB
                        candidate_answer: "" // initially empty
                    });
                });
            });

            // Update redux
            dispatch(getMcqQuestions({ type: "response", data: questions}))
            dispatch(update_error({ Err: data.message, Toast_Type: "success" }))
            dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
            navigate(`/student_dashboard/test`);
        } else {
            dispatch(getMcqQuestions({ type: "failure" }))
            dispatch(update_error({ Err: data.message, Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(getMcqQuestions({ type: "failure"}))
        dispatch(update_error({ Err: 'Something went wrong', Toast_Type: "error" }))
    }
}

export const loadQuestionsFromIndexedDB = () => (dispatch) => {
    initializeDB(
        process.env.REACT_APP_INDEXEDDB_DATABASE_NAME,
        process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION,
        process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME
    ).then((db) => {
        const transaction = db.transaction(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME, "readonly")
        const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME)
        const request = store.getAll()

        request.onsuccess = function () {
            const questions = request.result
            if (questions.length > 0) {
                dispatch(getQuestionFromDb(questions))
            }
        }
    })
}

export const handleUploadLearnerBook = (formData) => async (dispatch, getState) => {
    const { book_name, book_file } = getState().studentState.upload_learner_book
    if (!book_name?.trim() || !book_file) {
        return dispatch(update_error({ Err: "Book name and book are required", Toast_Type: "error" }))
    }

  try {
    dispatch(setUploadLearnerBook({ type: "request", loading: true}))

    const { data } = await axiosInstance.post("students/upload_book", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (data?.error_code === 0) {
        dispatch(setUploadLearnerBook({ type: "response", loading: false }))
        dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
        dispatch(update_error({ Err: data.message, Toast_Type: "success" }))
    } else {
        dispatch(setUploadLearnerBook({ type: "failure", loading: false }))
        dispatch(update_error({ Err: data.message, Toast_Type: "error" }))
    }
  } catch (error) {
      dispatch(setUploadLearnerBook({ type: "failure", loading: false }))
      dispatch(update_error({ Err: 'Something went wrong', Toast_Type: "error" }))
  }
}

export const handleJoinClassRoom = (code) => async (dispatch, getState) => {
    const { classroom_code } = getState().studentState.classroom_data
    if (!classroom_code?.trim()) {
        return dispatch(update_error({ Err: "Classroom code is required", Toast_Type: "error" }))
    }
  try {
    dispatch(setClassroomCode({ type: "request", loading: true}))

    const { data } = await axiosInstance.post("students/join_classroom", {classroom_code: code}, )

    if (data?.error_code === 0) {
        dispatch(setClassroomCode({ type: "response", loading: false }))
        dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
        dispatch(update_error({ Err: data.message, Toast_Type: "success" }))
    } else {
      dispatch(setClassroomCode({ type: "failure", loading: false}))
      dispatch(update_error({ Err: data.message, Toast_Type: "error" }))
    }
  } catch (error) {
    dispatch(setClassroomCode({ type: "failure", data: error.message, loading: false}))
    dispatch(update_error({ Err: 'Something went wrong', Toast_Type: "error" }))
  }
}

export const handleUploadTestPaper = (formData) => async (dispatch, getState) => {
    const {test_name, register_number, test_file } = getState().studentState.upload_test_paper
    if (!test_name.trim() || !register_number.trim() || !test_file) {
        return dispatch(update_error({ Err: "Test name, Register number and Test paper are required", Toast_Type: "error" }))
    }
    try {
        dispatch(setUploadTestPaper({ type: "request", loading: true }))

        const { data } = await axiosInstance.post("students/validate_test_paper", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })

        if (data?.error_code === 0) {
            dispatch(setUploadTestPaper({ type: "response", loading: false }))
            dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
            dispatch(update_error({ Err: data.message, Toast_Type: "success" }))
        } else {
            dispatch(setUploadTestPaper({ type: "failure", loading: false }))
            dispatch(update_error({ Err: data.message, Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(setUploadTestPaper({ type: "failure", loading: false }))
        dispatch(update_error({ Err: 'Something went wrong', Toast_Type: "error" }))
    }
}
