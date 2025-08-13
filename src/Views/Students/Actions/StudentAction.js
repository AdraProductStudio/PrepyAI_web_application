import { initializeDB } from "Components/CustomHooks";
import axiosInstance from "Services/axiosInstance";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import {
    updateAnswers,getLearnerBooks,getAllTests,
    getAllSubjects,
    getSubjectBooks,
    getSubjectAttachments,
    getUpcomingTests,
    updateMcqQuestionNumbers,
    setUploadLearnerBook,
    getOverallPerformance,
    setClassroomCode,
    getAllTestHistory,
    getBookTestHistory,

} from "Views/Students/Slices/StudentSlice";


export const handleUpdateAnswer = (data) => (dispatch) => {
    initializeDB(process.env.REACT_APP_INDEXEDDB_DATABASE_NAME, process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION, process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME)
        .then((db) => {
            const transaction = db.transaction(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME, "readwrite");
            const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME);

            const targetIndex = data?.updationInd;
            const updatedAnswer = data?.ans;

            const getRequest = store.get(targetIndex);

            getRequest.onsuccess = function () {
                const targetObject = getRequest.result;
                if (targetObject) {
                    targetObject.candidate_answer = updatedAnswer;

                    const putRequest = store.put(targetObject);

                    putRequest.onsuccess = function () {
                        const getAllRequest = store.getAll();
                        getAllRequest.onsuccess = function () {
                            dispatch(updateAnswers(getAllRequest.result));
                        };
                    };

                    putRequest.onerror = function (event) {
                        console.error("Failed to update object:", event.target.error);
                    };
                } else {
                    console.error(`No object found with id: ${targetIndex}`);
                }
            };

            getRequest.onerror = function (event) {
                console.error("Failed to fetch object:", event.target.error);
            };

            transaction.oncomplete = function () {
                console.log("Transaction completed successfully.");
            };

            transaction.onerror = function (event) {
                console.error("Transaction failed:", event.target.error);
            };
        })
        .catch((error) => {
            console.error("Failed to open database:", error);
        })
};

export const handleGetLearnerBooks = () => async (dispatch) => {
    try {
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
        const { data } = await axiosInstance.get("students/get_book_test_history", {book_id})
        console.log(data, 'boktesttt')
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

export const handleStartTest = (test_id, navigate) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.post("students/start_test", {test_id})

        if (data?.error_code === 0) {
            dispatch(updateMcqQuestionNumbers({ type: "response", data: data?.data }))
            navigate(`/student_dashboard/test`)
        } else {
            dispatch(updateMcqQuestionNumbers({ type: "failure", message: data?.message }))
        }
    } catch (error) {
        dispatch(updateMcqQuestionNumbers({ type: "failure", message: error?.message }))
    } finally{
        dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
    }
}

export const handleUploadLearnerBook = (formData) => async (dispatch) => {
  try {
    dispatch(setUploadLearnerBook({ type: "request", loading: true}))

    const { data } = await axiosInstance.post("students/upload_book", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    if (data?.error_code === 0) {
        alert(data.message)
      dispatch(setUploadLearnerBook({ type: "response", loading: false }))
      dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
    } else {
      dispatch(setUploadLearnerBook({ type: "failure", data: data?.message || "Something went wrong", loading: false}))
    }
  } catch (error) {
    dispatch(setUploadLearnerBook({ type: "failure", data: error.message, loading: false}))
  }finally {
    dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
  }
}

export const handleJoinClassRoom = (code) => async (dispatch) => {

  try {
    dispatch(setClassroomCode({ type: "request", loading: true}))

    const { data } = await axiosInstance.post("students/join_classroom", {classroom_code: code}, )

    if (data?.error_code === 0) {
      alert(data.message)
      dispatch(setClassroomCode({ type: "response", loading: false }))
      dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }))
    } else {
        alert(data.message)
      dispatch(setClassroomCode({ type: "failure", data: data?.message || "Something went wrong", loading: false}))
    }
  } catch (error) {
    dispatch(setClassroomCode({ type: "failure", data: error.message, loading: false}))
  }
}
