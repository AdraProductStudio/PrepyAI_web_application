import { initializeDB } from "Components/CustomHooks"
import Cookies from "js-cookie";
import axiosInstance from "Services/axiosInstance"
import { update_app_data, update_error, updateModalShow } from "Views/Common/Slices/Common_slice"
import {
    updateAnswers, getLearnerBooks, getAllTests,
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
    getSubjectPerformance,
    getBookPerformance,
    getBookUrl,
    updateTestEndOn,
    updateManualCloseTest,
    updatePersonalInfoInputs,
    updateProfileEditing,
    setLoading,
    resetSettingsInputs,
    updateGenerateQuestionFields,
    updateMcqQuestionAnswer,
    updateLongQuestionAnswer,
    updateLongQuestionAnswerValue,
    resetMcq,
    handlechangePassword,
    get_bookmarks,
    update_generate_questions,
    updateGenerateMcqQuestions,
    submit_test,
    convert_audio_to_text,
    delete_learner_book,
    get_student_timetable,

} from "Views/Students/Slices/StudentSlice"
import { IndexedDbDeleteFun } from "../IndexDbDeleteFun";
import sha256 from "sha256";


import { speakText } from "Views/Common/Actions/voiceAgentActions";

const validateUploadTestPaper = (values) => {
  
  const errors = {}

  if (!values.test_name) {
    errors.test_name = "Test name is required"
  }
  if (!values.register_number) {
    errors.register_number = "Register number is required"
  }
  
  if (!values.test_file) {
    errors.test_file = "Test file is required"
  }

  return errors
}

const validateUploadLearnerBook = (values) => {
  
  const errors = {}

  if (!values.book_name) {
    errors.book_name = "Book name is required"
  }
  
  if (!values.book_file) {
    errors.book_file = "Book file is required"
  }

  return errors
}

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

export const handleStartTest = (test_id, navigate) => async (dispatch) => {
    dispatch(getMcqQuestions({ type: "request", loading: true }))

    // delete index db
    await IndexedDbDeleteFun()
    dispatch(resetMcq())
    try {
        const { data } = await axiosInstance.post("students/start_test", { test_id })

        if (data?.error_code === 0) {
            const questions = data?.data?.questions || []

            // Store in IndexedDB
            initializeDB(
                process.env.REACT_APP_INDEXEDDB_DATABASE_NAME,
                process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION,
                process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME
            ).then((db) => {
                const transaction = db.transaction(
                    process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME,
                    "readwrite"
                )
                const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME)

                questions.forEach((q, index) => {
                    store.put({
                        ...q,
                        id: index, // primary key in IndexedDB
                        candidate_answer: "" // initially empty
                    })
                })
            })
            // const testDurationMinutes = 1
            // const testDurationMinutes = Number(process.env.REACT_APP_MCQ_TEST_TIMING)
             const testDurationMinutes = Number(data?.data?.duration)
            const endTime = new Date()
            endTime.setMinutes(endTime.getMinutes() + testDurationMinutes)

            // Save to Redux state
            dispatch(updateTestEndOn({ test_end_on: endTime.toISOString() }))

            // Save to cookie
            Cookies.set("testEndOn", endTime.toISOString(), { expires: 1 })

            // Update redux
            dispatch(getMcqQuestions({ type: "response" }))
            dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
            navigate(`/student_dashboard/test`)
            dispatch(update_error({ Err: 'Test started', Toast_Type: "success" })) 

        } else {
            dispatch(getMcqQuestions({ type: "failure" }))
            dispatch(update_error({ Err: data.message, Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(getMcqQuestions({ type: "failure" }))
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
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

export const handleSubmitTest = (test_id, navigate) => async (dispatch) => {
    dispatch(updateMcqSubmitSpinner({ type: "request", submit_spinner_loading: true })) 
   

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

            try {
                dispatch(updateMcqSubmitSpinner({ type: "request", submit_spinner_loading: true }))
                const { data } = await axiosInstance.post("students/submit_mcq", payload)
                if (data?.error_code === 0) {

                    //delete index db
                    IndexedDbDeleteFun()

                    dispatch(updateMcqSubmitSpinner({ type: "response" }))
                    dispatch(update_error({ Err: data.message, Toast_Type: "success" }))
                    dispatch(updateMcqResult({ data: data.data }));
                    dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
                    navigate('/student_dashboard/test/test_status')
                    dispatch(updateManualCloseTest()) // reset local state
                } else {
                    dispatch(updateMcqSubmitSpinner({ type: "failure" }))
                    dispatch(update_error({ Err: data.message, Toast_Type: "error" }))
                }
            } catch (err) {
                dispatch(updateMcqSubmitSpinner({ type: "failure" }))
                dispatch(update_error({ Err: "Submit failed", Toast_Type: "error" }))
            }
        }
    } catch (err) {
        // console.error("Error submitting test", err)
    }
}

// auto submit when time is over
export const handleCloseTestAutomatic = (test_id, candidate_answers, navigate) => async (dispatch) => {
    dispatch(updateModalShow({ show: true, close_btn: false, modal_from: 'test', modal_type: 'auto_submit' }))

    try {
        const responses = candidate_answers
            .filter(q => q.candidate_answer) // only answered
            .map(q => ({
                Question_no: q.Question_no,
                clicked_answer: q.candidate_answer
            }));

        const payload = { test_id, responses };

        dispatch(updateMcqSubmitSpinner({ type: "request", submit_spinner_loading: true }));

        const { data } = await axiosInstance.post("students/submit_mcq", payload);

        if (data?.error_code === 0) {
            //delete index db
            IndexedDbDeleteFun()

            dispatch(updateMcqSubmitSpinner({ type: "response" }))
            dispatch(update_error({ Err: data.message, Toast_Type: "success" }))
            dispatch(updateMcqResult({ data: data.data }))
            navigate("/student_dashboard/test/test_status")
            dispatch(updateTimeOverCloseTest()) // reset local state
        } else {
            dispatch(updateMcqSubmitSpinner({ type: "failure" }))
            dispatch(update_error({ Err: data.message, Toast_Type: "error" }))
        }
    } catch (err) {
        console.error("Auto submit failed", err)
        dispatch(updateMcqSubmitSpinner({ type: "failure" }))
        dispatch(update_error({ Err: "Auto-submit failed", Toast_Type: "error" }))
    } finally {
        dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
    }
}

export const handleGetLearnerBooks = (payload) => async (dispatch) => {
    dispatch(setLoading({ key: "learner_books", value: true }))

    try {
        const { data } = await axiosInstance.post("students/get_learner_books",payload)

        if (data?.error_code === 0) {
            dispatch(getLearnerBooks(data?.data))
        } else {
            dispatch(update_error({ Err: data?.message, Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    } finally {
        dispatch(setLoading({ key: "learner_books", value: false }))
    }
}

export const handleGetAllTests = () => async (dispatch) => {
    dispatch(setLoading({ key: "all_tests", value: true }))

    try {
        const { data } = await axiosInstance.get("students/get_all_tests")

        if (data?.error_code === 0) {
            dispatch(getAllTests(data?.data))
        } else {
            dispatch(update_error({ Err: data?.message, Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    } finally {
        dispatch(setLoading({ key: "all_tests", value: false }))
    }
}

export const handleGetOverallPerformance = () => async (dispatch) => {
    dispatch(setLoading({ key: "overall_performance", value: true }))

    try {

        const { data } = await axiosInstance.get("students/get_dashboard_performance")
        if (data?.error_code === 0) {
            dispatch(getOverallPerformance(data?.data))
        } else {
            dispatch(update_error({ Err: data?.message, Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    } finally {
        dispatch(setLoading({ key: "overall_performance", value: false }))
    }
}

export const handleGetSubjectPerformance = (subjectId) => async (dispatch) => {
    dispatch(setLoading({ key: "subject_performance", value: true }))

    try {
        const { data } = await axiosInstance.post("students/get_student_performance", { subject_id: subjectId })

        if (data?.error_code === 0) {
            dispatch(getSubjectPerformance(data?.data))
        } else {
            dispatch(update_error({ Err: data?.message, Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    } finally {
        dispatch(setLoading({ key: "subject_performance", value: false }))
    }
}

export const handleGetBookPerformance = (bookId, owned) => async (dispatch) => {
    dispatch(setLoading({ key: "book_performance", value: true }))

    try {
        const { data } = await axiosInstance.post("students/get_book_performance", { book_id: bookId, owned})

        if (data?.error_code === 0) {
            dispatch(getBookPerformance(data?.data))

        } else {
            dispatch(update_error({ Err: data?.message, Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    } finally {
        dispatch(setLoading({ key: "book_performance", value: false }))
    }
}

export const handleGetAllTestHistory = () => async (dispatch) => {
    dispatch(setLoading({ key: "all_test_history", value: true }))

    try {
        
        const { data } = await axiosInstance.get("students/get_dashboard_test_history")

        if (data?.error_code === 0) {
            dispatch(getAllTestHistory(data?.data))
        } else {
            dispatch(update_error({ Err: data?.message, Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    } finally {
        dispatch(setLoading({ key: "all_test_hiistory", value: false }))
    }
}

export const handleGetBookTestHistory = (book_id, owned) => async (dispatch) => {
    dispatch(setLoading({ key: "book_test_history", value: true }))

    try {
        
        const { data } = await axiosInstance.post("students/get_book_test_history", { book_id, owned })
        if (data?.error_code === 0) {

            dispatch(getBookTestHistory(data?.data))
        } else {
            dispatch(update_error({ Err: data?.message, Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    } finally {
        dispatch(setLoading({ key: "book_test_history", value: false }))
    }
}

export const handleGetAllSubjects = () => async (dispatch) => {
    dispatch(setLoading({ key: "all_subjects", value: true }))

    try {
        
        const { data } = await axiosInstance.get("students/get_subjects")

        if (data?.error_code === 0) {
            dispatch(getAllSubjects(data?.data))
        } else {
            dispatch(update_error({ Err: data?.message, Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    } finally {
        dispatch(setLoading({ key: "all_subjects", value: false }))
    }
}

export const handleGetBookUrl = (book_id) => async (dispatch) => {
    dispatch(setLoading({ key: "book_url", value: true }))

    try {

        const { data } = await axiosInstance.get(`students/get_pdf_preview?book_id=${book_id}`)

        if (data?.error_code === 0) {
            dispatch(getBookUrl(data?.data))
        } else {
            dispatch(update_error({ Err: data?.message, Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    } finally {
        dispatch(setLoading({ key: "book_url", value: false }))
    }
}

export const handleGetSubjectBooks = (subject_id) => async (dispatch) => {
    dispatch(setLoading({ key: "subject_books", value: true }))

    try {

        const { data } = await axiosInstance.get(`students/get_subject_books?subject_id=${subject_id}`)

        if (data?.error_code === 0) {
            dispatch(getSubjectBooks(data?.data))
        } else {
            dispatch(update_error({ Err: data?.message, Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    } finally {
        dispatch(setLoading({ key: "subject_books", value: false }))
    }
}

export const handleGetSubjectAttachments = (subject_id) => async (dispatch) => {
    dispatch(setLoading({ key: "subject_attachments", value: true }))

    try {
        const { data } = await axiosInstance.get(`students/get_subject_attachments?subject_id=${subject_id}`)

        if (data?.error_code === 0) {
            dispatch(getSubjectAttachments(data?.data))
        } else {
            dispatch(update_error({ Err: data?.message, Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    } finally {
        dispatch(setLoading({ key: "subject_attachments", value: false }))
    }
}

export const handleGetUpcomingTests = (subject_id) => async (dispatch) => {
    dispatch(setLoading({ key: "upcoming_tests", value: true }))

    try {
       
        const { data } = await axiosInstance.get(`students/get_upcoming_test?subject_id=${subject_id}`)

        if (data?.error_code === 0) {
            dispatch(getUpcomingTests(data?.data))
        } else {
            dispatch(update_error({ Err: data?.message, Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    } finally {
        dispatch(setLoading({ key: "upcoming_tests", value: false }))
    }
}

export const handleGetOfflineTests = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get("students/get_offline_test")

        if (data?.error_code === 0) {
            dispatch(getOfflineTests(data?.data))
        } else {
            dispatch(update_error({ Err: data?.message, Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    }
} 

// export const handleStartTest = (test_id, navigate) => async (dispatch) => {
//     try {
//         dispatch(getMcqQuestions({ type: "request", loading: true }));
//         const { data } = await axiosInstance.post("students/start_test", { test_id });

//         if (data?.error_code === 0) {
//             const questions = data?.data || [];

//             // Store in IndexedDB
//             initializeDB(
//                 process.env.REACT_APP_INDEXEDDB_DATABASE_NAME,
//                 process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION,
//                 process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME
//             ).then((db) => {
//                 const transaction = db.transaction(
//                     process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME,
//                     "readwrite"
//                 );
//                 const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME);

//                 questions.forEach((q, index) => {
//                     store.put({
//                         ...q,
//                         id: index, // primary key in IndexedDB
//                         candidate_answer: "" // initially empty
//                     });
//                 });
//             });

//             // Update redux
//             dispatch(getMcqQuestions({ type: "response", data: questions }))
//             dispatch(update_error({ Err: data.message, Toast_Type: "success" }))
//             dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
//             navigate(`/student_dashboard/test`);
//         } else {
//             dispatch(getMcqQuestions({ type: "failure" }))
//             dispatch(update_error({ Err: data.message, Toast_Type: "error" }))
//         }
//     } catch (error) {
//         dispatch(getMcqQuestions({ type: "failure" }))
//         dispatch(update_error({ Err: 'Something went wrong', Toast_Type: "error" }))
//     }
// }

export const handleUploadLearnerBook = (formData) => async (dispatch, getState) => {
       const errors = validateUploadLearnerBook(getState().studentState.upload_learner_book || {})
    
    if (Object.keys(errors).length > 0) {
        dispatch(update_app_data({ type: "validation", data: true }));
        dispatch(update_app_data({ type: "validationMessage", data: errors }));
        return;
    }

    try {
        dispatch(setUploadLearnerBook({ type: "request", loading: true }))

        const { data } = await axiosInstance.post("students/upload_book", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (data?.error_code === 0) {
            dispatch(setUploadLearnerBook({ type: "response", loading: false }))
            dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
            dispatch(handleGetLearnerBooks({page:1}))
            dispatch(update_error({ Err: data.message, Toast_Type: "success" }))
            window.__uploadBookResolve?.({ success: true, message: data.message })
            window.__uploadBookResolve = null

        } else {
            dispatch(setUploadLearnerBook({ type: "failure", loading: false }))
            dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
            dispatch(update_error({ Err: data.message, Toast_Type: "error" }))
            window.__uploadBookResolve?.({ success: false, message: data.message })
            window.__uploadBookResolve = null
        }
    } catch (error) {
        dispatch(setUploadLearnerBook({ type: "failure", loading: false }))
        dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
        dispatch(update_error({ Err: 'Something went wrong', Toast_Type: "error" }))
        window.__uploadBookResolve?.({ success: false, message: 'Something went wrong' })
        window.__uploadBookResolve = null
    }
}

export const handleJoinClassRoom = (code) => async (dispatch, getState) => {
    const { classroom_code } = getState().studentState.classroom_data
    if (!classroom_code?.trim()) {
        return dispatch(update_error({ Err: "Classroom code is required", Toast_Type: "error" }))
    }
    try {
        dispatch(setClassroomCode({ type: "request", loading: true }))

        const { data } = await axiosInstance.post("students/join_classroom", { classroom_code: code },)

        if (data?.error_code === 0) {
            dispatch(setClassroomCode({ type: "response", loading: false }))
            dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
            dispatch(handleGetAllSubjects())
            dispatch(update_error({ Err: data.message, Toast_Type: "success" }))
        } else {
            dispatch(setClassroomCode({ type: "failure", loading: false }))
            dispatch(update_error({ Err: data.message, Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(setClassroomCode({ type: "failure", data: error.message, loading: false }))
        dispatch(update_error({ Err: 'Something went wrong', Toast_Type: "error" }))
    }
}

export const handleUploadTestPaper = (formData) => async (dispatch, getState) => {

      
    const errors = validateUploadTestPaper(getState().studentState.upload_test_paper || {})

    if (Object.keys(errors).length > 0) {
        dispatch(update_app_data({ type: "validation", data: true }));
        dispatch(update_app_data({ type: "validationMessage", data: errors }));
        return;
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
            dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
            dispatch(update_error({ Err: data.message, Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(setUploadTestPaper({ type: "failure", loading: false }))
        dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
        dispatch(update_error({ Err: 'Something went wrong', Toast_Type: "error" }))
    }
}

export const getProfileDetails = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get('/profile')
        if (data.error_code === 0) {
            const profile = Array.isArray(data?.data) ? data?.data?.[0] : data?.data
            dispatch(updatePersonalInfoInputs(profile))
        } else {
            dispatch(update_error({ Err: data?.message, Toast_Type: "error" }));
        }
    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    }
}

export const handleEditProfileDetails = (payload) => async (dispatch) => {
    dispatch(setLoading({ key: "edit_profile", value: true }))
    try {
        dispatch(updateProfileEditing())
        const { data } = await axiosInstance.put('/profile', payload)

        if (data.error_code === 0) {
            dispatch(updatePersonalInfoInputs(payload))
            dispatch(updateProfileEditing())
            dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
            dispatch(update_error({ Err: data.message, Toast_Type: "success" }))
        } else {
            dispatch(updateProfileEditing())
        }
    } catch (error) {
        dispatch(updateProfileEditing())
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    } finally {
        dispatch(setLoading({ key: "edit_profile", value: false }))
    }
}


export const changePassword = (payload) => async (dispatch) => {
  try {
    dispatch(handlechangePassword({type: "request"}))
        const { data } = await axiosInstance.put('/change_password', 
            {
                old_password : sha256(payload?.old_password),
                new_password : sha256(payload?.new_password),
                confirm_password : sha256(payload?.confirm_password),
            }
        )
     if (data?.error_code === 0) {
        dispatch(handlechangePassword({type: "response"}))
        dispatch(update_error({ Err: data?.message, Toast_Type: "success" }));
        dispatch(resetSettingsInputs())
    } else {
        dispatch(handlechangePassword({type: "failure"}))
        dispatch(update_error({ Err: data?.message, Toast_Type: "error" }));
    }
  } catch (error) {
    dispatch(handlechangePassword({type: "failure"}))
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
  }
}

export const getBookmarks = (book_id) => async (dispatch) => {
    try {
        dispatch(get_bookmarks({ type: "request" }))
        const { data } = await axiosInstance.post("students/get_bookmarks", { book_id })
        if (data?.error_code === 0) {
            dispatch(updateGenerateQuestionFields({ bookmarks: data?.data, chapter_name: data?.data?.bookmarks?.[0]?.title }))
            dispatch(get_bookmarks({ type: "response" }))
        } else {
            dispatch(get_bookmarks({ type: "failure", message: data?.message || "Failed to fetch bookmarks" }))
        }
    } catch (error) {
        dispatch(get_bookmarks({ type: "failure", message: error?.response?.data?.message || "Failed to fetch organization information" }))
    }
}

export const handleDeleteLearnerBook = (book_id) => async (dispatch,getState) => {
    try {
        const payload = getState()?.studentState?.dashboard_pagination_inputs
        dispatch(delete_learner_book({ type: "request" }))
        const { data } = await axiosInstance.delete(`students/delete_learner_book?book_id=${book_id}`,)

        if (data.error_code === 0) {
            dispatch(delete_learner_book({ type: "response" }))
            dispatch(handleGetLearnerBooks({...payload,page:payload.page+1}))
        } else {
            dispatch(delete_learner_book({ type: "failure", message: data?.message || "Failed to delete book" }))
        }
    } catch (error) {
        dispatch(delete_learner_book({ type: "failure", message: error?.response?.data?.message || "Failed to delete book" }))
    }
}


export const handleGenerateQuestion = (payload,navigate,targetRoute,type_of_question)=> async(dispatch)=>{
    try {
        dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
        dispatch(update_generate_questions({type:"request"}))
        await IndexedDbDeleteFun()
        const {data} = await axiosInstance.post('students/generate_questions',payload)
        if(data?.error_code === 0){
            const testId = data?.data?.test_id
            const updatedQues = data?.data?.test_questions?.map((q)=>{
                return {
                    ...q,
                    id:q.Question_no,
                    test_id:testId
                }
            })      
                 initializeDB(
                process.env.REACT_APP_INDEXEDDB_DATABASE_NAME,
                process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION,
                process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME
            ).then(async(db) => {
                const transaction = db.transaction(
                    process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME,
                    "readwrite"
                )
                const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME)
                updatedQues.forEach((item) => store.put(item))
                await transaction.complete
            })

            navigate(targetRoute)
            dispatch(update_generate_questions({type:"response",data:{test_questions:updatedQues,test_id:testId},type_of_question}))  
        }else{
            dispatch(update_generate_questions({type:"failure",message: data?.message || "Failed to generate questions" }))
        }
    } catch (error) {
         dispatch(update_generate_questions({type:"failure",message: error?.response?.data?.message || "Failed to generate questions" }))
    }
}

export const handleUpdateMcqQuestionAnswer = (queId, optId) => async (dispatch, getState) => {
  try {
    const state = getState()?.studentState?.generate_question
    const updatedQuestions = state?.mcq_questions?.test_questions?.map((q) =>
      q.Question_no === queId ? { ...q, candidate_answer: optId } : q
    )

    dispatch(
      updateGenerateMcqQuestions({
        ...state.mcq_questions,
        test_questions: updatedQuestions,
      })
    )
    const db = await initializeDB(
      process.env.REACT_APP_INDEXEDDB_DATABASE_NAME,
      process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION,
      process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME
    )

    const transaction = db.transaction(
      process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME,
      "readwrite"
    )
    const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME)

    const updatedQ = updatedQuestions.find((q) => q.Question_no === queId)
     store.put({
      ...updatedQ,
      id: updatedQ.Question_no,
    })

  } catch (error) {
    console.error("Error updating answer in IndexedDB:", error)
  }
}

export const submitTest = (payload)=>async(dispatch)=>{
    try {
        dispatch(submit_test({type:"request"}))
         const {data} = await axiosInstance.post('students/validate_self_test',payload)
         if(data?.error_code === 0){
            dispatch(submit_test({type:"response"}))
            dispatch(updateMcqQuestionAnswer({answers:data?.data?.results,summary:data?.data?.summary}))
            await IndexedDbDeleteFun()
         }else{
            dispatch(submit_test({type:"failure",message: data?.message || "Failed to submit test" }))
         }    
    } catch (error) {
        dispatch(submit_test({type:"failure",message:error?.response?.data?.message || error?.message || "Something went wrong"}))
    }
}

export const submitLongQuestionTest = (payload) => async (dispatch) => {
    try {
        dispatch(submit_test({ type: "request" }))
        const { data } = await axiosInstance.post('students/validate_self_test', payload)
        if (data?.error_code === 0) {
            dispatch(updateLongQuestionAnswer({answers:data?.data?.answers,overall_levels:data?.data?.overall_levels?.overall_levels,performance:data?.data?.performance}))
            dispatch(submit_test({type:"response"}))
            await IndexedDbDeleteFun()
        }else{
            dispatch(submit_test({type:"failure",message: data?.message || "Failed to submit test" }))
        }

    } catch (error) {
       dispatch(submit_test({type:"failure",message:error?.response?.data?.message || error?.message || "Something went wrong"}))

    }
}


export const convertAudioToText = (formData, test_id, question_no) => async (dispatch) => {
    try {
         dispatch(convert_audio_to_text({type:"request"}))
        const { data } = await axiosInstance.post('students/validate_speech_answer', formData)
        if (data?.error_code === 0) {
            const intervalId = setInterval(async () => {
                try {
                    const { data } = await axiosInstance.post('students/get_speech_to_text_response', {
                        test_id,
                        question_no
                    })
                    if (data?.error_code === 0) {
                        dispatch(handleUpdateLongQuestionAnswer(data?.data?.question_no, data?.data?.answer))
                        clearInterval(intervalId)
                        dispatch(convert_audio_to_text({ type: "response" }))
                        
                    }else if(data?.error_code === 2){
                        clearInterval(intervalId)
                        dispatch(convert_audio_to_text({ type: "failure",message:data?.message || "failed to convert audio" }))
                    }

                } catch (error) {
                    clearInterval(intervalId)
                    dispatch(convert_audio_to_text({ type: "failure",message:error?.response?.data?.message || error?.message  || "failed to convert audio" }))
                }

            }, 5000)

        }

    } catch (error) {
      dispatch(convert_audio_to_text({ type: "failure",message:error?.response?.data?.message || error?.message  || "failed to convert audio" }))
    }
}

export const getAllQuestionsFromDB = async () => {
  const db = await initializeDB(
    process.env.REACT_APP_INDEXEDDB_DATABASE_NAME,
    process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION,
    process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME
  )

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME,
      "readonly"
    )
    const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME)

    const request = store.getAll()
    request.onsuccess = (e) => {
      resolve(e.target.result || [])
    }
    request.onerror = (err) => {
      reject(err)
    }
  })
}

export const handleUpdateLongQuestionAnswer = (Question_no, answer) => async (dispatch, getState) => {
  try {
    const state = getState()?.studentState?.generate_question

    dispatch(updateLongQuestionAnswerValue({ Question_no, answer }))

    const db = await initializeDB(
      process.env.REACT_APP_INDEXEDDB_DATABASE_NAME,
      process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION,
      process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME
    );

    const transaction = db.transaction(
      process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME,
      "readwrite"
    )
    const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME);

    const updatedQ = state?.long_questions?.test_questions?.find(q => q.Question_no === Question_no);

    if (updatedQ) {
      store.put({
        ...updatedQ,
        id: updatedQ.Question_no,
        test_id: state?.long_questions?.test_id,
        Answer: answer 
      });
    }
  } catch (error) {
    console.error("Error updating long question in IndexedDB:", error);
  }
};


export const getStudentTimetable = () => async (dispatch) => {
  try {
    dispatch(get_student_timetable({ type: "request" }))
    const { data } = await axiosInstance.get('students/timetable')
    if (data?.error_code === 0) {
      let { timetable, timing } = data?.data
      const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      const sortedTimetable = Object.keys(timetable).sort((a, b) =>
        (dayOrder.indexOf(a.toLowerCase()) === -1 ? 99 : dayOrder.indexOf(a.toLowerCase())) -
        (dayOrder.indexOf(b.toLowerCase()) === -1 ? 99 : dayOrder.indexOf(b.toLowerCase()))
      ).reduce((acc, key) => {
        acc[key] = timetable[key]
        return acc
      }, {})
      dispatch(get_student_timetable({ type: "response",data:{timetable:sortedTimetable,timing} }))
    } else {
      dispatch(get_student_timetable({ type: "failure", message: data?.message || "Failed to get timetable" }))
    }

  } catch (error) {
    dispatch(get_student_timetable({ type: "failure", message: error?.response?.data?.message || "Failed to get timetable" }))
  }
}


