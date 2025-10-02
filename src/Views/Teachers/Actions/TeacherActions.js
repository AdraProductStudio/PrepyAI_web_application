import { type } from "@testing-library/user-event/dist/type"
import axiosInstance from "Services/axiosInstance"
import { update_app_data, update_error, updateModalShow } from "Views/Common/Slices/Common_slice"
import {
    clear_ScheduleTest_fields,
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
    handleGetchapters,
    handleGetTestRecords,
    handleScheduleTest,
    handleUploadAttachment,
    handleUploadBooks,
    save_schedule,
    save_schedule_failure,
    save_schedule_request,
    save_schedule_success
} from "Views/Teachers/Slice/teachersSlice"



const validateScheduleTestForm = (values) => {
  
    const errors = {};
  
    if (!values.test_name) {
      errors.test_name = "Test name is required";
    }

    if (!values.chapters) {
      errors.chapters = "Chapters is required";
    }

    if (!values.total_duration) {
      errors.total_duration = "Total time duration is required";
    }

    if (!values.type_of_questions) {
      errors.type_of_questions = "Type Of Question is required";
    }

    if (!values.students) {
      errors.students = "Students name is required";
    } else if (!values.students?.length > 0) {
        errors.students = "Students name is required";
      }
    
    
    if(!values?.start_time){
        errors.start_time = "Start time is required"
    }

    if(!values?.start_date){
        errors.start_date = "Start Date is required"
    }
    if(!values?.set_questions){
        errors.set_questions = "Set Quesitions is required"
    }
    if(!values?.no_of_questions){
        errors.no_of_questions = "No of Questions is required"
    }
    if(!values?.chapters){
        errors.chapters = "Chapters is required"
    }
    if(!values?.chapter_range){
        errors.chapter_range = "Chapter is required"
    }
    if(!values?.book_id){
        errors.book_id = "Book is required"
    }

    return errors;
  };

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
        dispatch(handleGetchapters({ type: "request" }))
        const { data } = await axiosInstance.post("/teachers/get_bookmarks", params || {})
        if (data?.error_code === 0) {
            dispatch(handleGetchapters({ type: "response", data: data?.data?.bookmarks || [] }))
        }
        else {
            dispatch(handleGetchapters({ type: "failure", message: data?.message || '' }))
        }
    } catch (err) {
        dispatch(handleGetchapters({ type: "failure", message: err?.message || '' }))
    }
}

export const get_student_details = (classroom_id) => async (dispatch) => {
    try {
        dispatch(get_student_details_slice({ type: "request" }))
        const { data } = await axiosInstance.post("/teachers/get_students_for_test", classroom_id || {})
        if (data?.error_code === 0) {
            const datas = data?.data?.students || []
            dispatch(get_student_details_slice({ type: "response", data: datas }))
        }
        else {
            dispatch(get_student_details_slice({ type: "failure", message: data?.message || '' }))
        }


    } catch (error) {
        dispatch(get_student_details_slice({ type: "failure", message: error?.response?.data?.message || '' }))
    }

}


export const saveSchedule = (payload, navigate) => async (dispatch) => {
    const errors = validateScheduleTestForm(payload);

    if (Object.keys(errors).length > 0) {
        dispatch(update_app_data({ type: "validation", data: true }));
        dispatch(update_app_data({ type: "validationMessage", data: errors }));
        return;
    }
    try {
        dispatch(save_schedule({ type: 'request' }))
        const { data } = await axiosInstance.post("/teachers/save_schedule", payload)

        if (data?.error_code === 0) {
            dispatch(save_schedule({ type: 'response', data: data?.data }))
            dispatch(clear_ScheduleTest_fields());
            navigate(`/teachers_dashboard/classrooms/${payload.classroom_id}/${payload.subject_id}/preview_test/${data?.data?.test_id || ""}`);
        } else {
            dispatch(save_schedule({ type: 'failure', message: data?.message || 'failed to schedule test' }))
        }
    } catch (error) {
        dispatch(save_schedule({ type: 'failure', message: error?.response?.data?.data || 'failed to schedule test' }))
    }
};
// preview
export const get_test_questions = (test_id) => async (dispatch) => {
    try {
        dispatch(get_test_questions_request({ type: "request" }));
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

export const deleteAttachment = (attachment_id,subject_id) => async (dispatch) => {
    try {
        dispatch(delete_attachment_request({ type: "reques" }));

        const response = await axiosInstance.delete(`/teachers/delete_attachment?attachment_id=${attachment_id}`);

        if (response.data?.error_code === 0) {
            dispatch(delete_attachment_success());
            dispatch(updateModalShow({ show: false}))
            dispatch(handleGetSubjectAttachments({subject_id}))
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

export const scheduleTest = (test_id,navigate,class_id,subject_id) => async (dispatch) => {
    try {
        dispatch(handleScheduleTest({ type: "request" }));

        const { data } = await axiosInstance.post("/teachers/schedule_test", {test_id});

        if (data?.error_code === 0) {
            dispatch(handleScheduleTest({ type: "response", data: data?.data || {}, }));
            navigate(`/teachers_dashboard/classrooms/${class_id}/${subject_id}`)
            dispatch(update_error({ Err: data?.message ||"Scheduled Successfully", Toast_Type: "success" }))
        } else {
            dispatch(handleScheduleTest({ type: "failure", message: data?.message || "Failed to schedule test", }));
        }
    } catch (err) {
        dispatch(handleScheduleTest({ type: "failure", message: err?.message || "Server error", }));
    }
};

