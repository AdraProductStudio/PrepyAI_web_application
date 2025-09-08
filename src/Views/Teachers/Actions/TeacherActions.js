import { type } from "@testing-library/user-event/dist/type"
import axiosInstance from "Services/axiosInstance"
import {
    create_test_onchange,
    delete_attachment_failure,
    delete_attachment_request,
    delete_attachment_success,
    deleteBook,
    get_student_details_slice,
    get_test_questions_failure,
    get_test_questions_request,
    get_test_questions_success,
    getSubjectAttachments,
    handleGetBooks,
    handleGetTestRecords,
    handleScheduleTest,
    handleUploadAttachment,
    handleUploadBooks,
    save_schedule_failure,
    save_schedule_request,
    save_schedule_success
} from "Views/Teachers/Slice/teachersSlice"


export const getTestRecords = (params) => async (dispatch) => {
    try {
        dispatch(handleGetTestRecords({ type: "request" }))
        const { data } = await axiosInstance.post("/teachers/get_test_history", params || {})

        if (data?.error_code === 0) {
            dispatch(handleGetTestRecords({ type: "response", data: data?.data?.history || [] }))
        }
        else {
            dispatch(handleGetTestRecords({ type: "failure", message: data?.message || '' }))
        }
    } catch (err) {
        dispatch(handleGetTestRecords({ type: "failure", message: err?.message || '' }))
    }
}

export const get_bookmarks = (params) => async (dispatch) => {
    try {
        dispatch(create_test_onchange(params))
        dispatch(create_test_onchange({ type: "request" }))
        const { data } = await axiosInstance.post("/teachers/get_bookmarks", params || {})
        if (data?.error_code === 0) {
            dispatch(handleGetTestRecords({ type: "response", data: data?.data?.bookmarks || [] }))
        }
        else {
            dispatch(handleGetTestRecords({ type: "failure", message: data?.message || '' }))
        }
    } catch (err) {
        dispatch(handleGetTestRecords({ type: "failure", message: err?.message || '' }))
    }
}

export const get_student_details = (classroom_id) => async (dispatch) => {
    try {
        dispatch(get_student_details_slice({ type: "request" }))
        const { data } = await axiosInstance.post("/teachers/get_students_for_test", classroom_id || {})
        if (data?.error_code === 0) {
            const datas = data?.data?.students || [] 
            dispatch(get_student_details_slice({ type: "response", data: datas}))
        }
        else {
            dispatch(get_student_details_slice({ type: "failure", message: data?.message || '' }))
        }


    } catch (error) {

    }

}


export const saveSchedule = (payload, navigate) => async (dispatch) => {
    try {
        dispatch(save_schedule_request());
        const response = await axiosInstance.post("/teachers/save_schedule", payload);

        if (response.data?.error_code === 0) {
            const { test_id, ...rest } = response.data?.data;

            dispatch(save_schedule_success({ test_id, ...rest }));

            navigate(
                `/teachers_dashboard/classrooms/${payload.classroom_id}/${payload.subject_id}/preview_test`
            );
        } else {
            dispatch(save_schedule_failure(response.data?.message || "Unknown error"));
        }
    } catch (error) {
        dispatch(save_schedule_failure(error.message));
    }
};
// preview
export const get_test_questions = (test_id) => async (dispatch) => {
    try {
        dispatch(get_test_questions_request({ type: "request" }));
        console.log("test_id :", test_id)
        const response = await axiosInstance.post("/teachers/get_test_questions", test_id);

        if (response.data?.error_code === 0) {
            dispatch(get_test_questions_success(response.data?.data));
        } else {
            dispatch(get_test_questions_failure(response.data?.message || "Unknown error"));
        }
    } catch (error) {
        dispatch(get_test_questions_failure(error.message));
    }
};

//delete attachments

export const deleteAttachment = (attachment_id) => async (dispatch) => {
    try {
        dispatch(delete_attachment_request({ type: "reques" }));

        const response = await axiosInstance.delete(`/teachers/delete_attachment?attachment_id=${attachment_id}`);

        if (response.data?.error_code === 0) {
            dispatch(delete_attachment_success());
        } else {
            dispatch(
                delete_attachment_failure(response.data?.message || "Delete failed")
            );
        }
    } catch (error) {
        dispatch(delete_attachment_failure(error.message));
    }
};



export const handleGetSubjectAttachments = (subject_id) => async (dispatch) => {
    try {
        dispatch(getSubjectAttachments({ type: "request" }));
        const { data } = await axiosInstance.post("/teachers/get_classroom_attachments", subject_id);

        if (data?.error_code === 0) {
            dispatch(getSubjectAttachments({ type: "response", data: data?.data }));
        } else {
            dispatch(getSubjectAttachments({ type: "failure", message: data?.message }));
        }
    } catch (error) {
        dispatch(getSubjectAttachments({ type: "failure", message: error?.message }));
    }
};



export const handleUploadBook = (params_data, file) => async (dispatch) => {
    if (!file?.name) return dispatch(handleUploadAttachment({ type: "failure", message: "File required for uploading..." }));

    try {
        dispatch(handleUploadAttachment({ type: "request" }));

        const formData = new FormData();
        formData.append("attachment", file);
        formData.append("attachment_name", file.name);

        const { data } = await axiosInstance.post(
            `/teachers/upload_attachment?classroom_id=${params_data?.class_id}&subject_id=${params_data?.subject_id}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (data?.error_code === 0) {
            dispatch(handleUploadAttachment({ type: "response", data: data?.data }));
            dispatch(handleGetSubjectAttachments({ subject_id: params_data?.subject_id }))
        } else {
            dispatch(handleUploadAttachment({ type: "failure", message: data?.message }));
        }
    } catch (error) {
        dispatch(handleUploadAttachment({ type: "failure", message: error?.message }));
    }
};


// books api
export const getBooks = (params) => async (dispatch) => {
    try {

        dispatch(handleGetBooks({ type: "request" }));
        const { data } = await axiosInstance.post("/teachers/get_books", params || {});

        if (data?.error_code === 0) {
            dispatch(handleGetBooks({ type: "response", data: data?.data?.books || [] }));
        } else {
            dispatch(handleGetBooks({ type: "failure", message: data?.message || "Failed to load books" }));
        }
    } catch (err) {

        dispatch(handleGetBooks({
            type: "failure",
            message: err?.message || "Network Error"
        }));
    }
};

// books api
export const handleDeleteBook = (params) => async (dispatch) => {
    if (!params?.book_id) dispatch(deleteBook({ type: "failure", message: "book id missing" }));

    try {

        dispatch(deleteBook({ type: "request" }));
        const { data } = await axiosInstance.delete(`/teachers/delete_book?book_id=${params?.book_id}`);

        if (data?.error_code === 0) {
            dispatch(deleteBook({ type: "response", data: params }));
        } else {
            dispatch(deleteBook({ type: "failure", message: data?.message || "Failed to delete books" }));
        }
    } catch (err) {

        dispatch(deleteBook({
            type: "failure",
            message: err?.message || "Network Error"
        }));
    }
};

export const uploadBooks = (params) => async (dispatch) => {
    if (!params?.file?.name) return dispatch(handleUploadBooks({ type: "failure", message: "Please select some books..." }));

    try {
        dispatch(handleUploadBooks({ type: "request" }));
        const fd = new FormData();
        fd.append("book", params?.file) 

        const { data } = await axiosInstance.post(`/teachers/upload_book?classroom_id=${params?.classroom_id}&subject_id=${params?.subject_id}`, fd);

        if (data?.error_code === 0) {
            dispatch(handleUploadBooks({ type: "response", data: data?.data || [], }));
            dispatch(getBooks({ classroom_id: params?.classroom_id, subject_id: params?.subject_id }));

        } else {
            dispatch(handleUploadBooks({ type: "failure", message: data?.message || "Upload failed", }));
        }
    } catch (err) {
        dispatch(handleUploadBooks({ type: "failure", message: err?.message || "Server error", }));
    }
};
 

// scheduleTest

export const scheduleTest = (test_id) => async (dispatch) => {
  try {
    dispatch(handleScheduleTest({ type: "request" }));

    const { data } = await axiosInstance.post("/teachers/schedule_test", test_id);

    if (data?.error_code === 0) { dispatch(  handleScheduleTest({ type: "response", data: data?.data || {}, }));
    } else {
      dispatch(handleScheduleTest({type: "failure", message: data?.message || "Failed to schedule test", }));
    }
  } catch (err) {
    dispatch( handleScheduleTest({ type: "failure",message: err?.message || "Server error", }));
  }
};

