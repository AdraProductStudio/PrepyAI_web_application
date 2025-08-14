import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "Services/axiosInstance"
import {
    create_test_onchange,
    get_student_details_slice,
    getSubjectAttachments,
    handelGetCreate,
    handleGetTestRecords,
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
            dispatch(handleGetTestRecords({ type: "response", data: data?.data?.bookmarks?.[0] || [] }))
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
        const { data } = await axiosInstance.post("/teachers/get_students_for_test", classroom_id || {})
        if (data?.error_code === 0) {
            dispatch(get_student_details_slice({ type: "response", data: data?.data?.bookmarks?.[0] || [] }))
        }
        else {
            dispatch(get_student_details_slice({ type: "failure", message: data?.message || '' }))
        }


    } catch (error) {

    }

}

// export const saveSchedule = (payload) => async (dispatch) => {
//     try {
//         dispatch(save_schedule_request());
//         const response = await axiosInstance.post("/teachers/save_schedule", payload);
//         if (response.data?.error_code === 0) {
//             dispatch(save_schedule_success(response.data?.data));
//         } else {
//             dispatch(save_schedule_failure(response.data?.message || "Unknown error"));
//         }
//     } catch (error) {
//         dispatch(save_schedule_failure(error.message));
//     }
// };

export const saveSchedule = (payload, navigate) => async (dispatch) => {
    try {
        dispatch(save_schedule_request());
        const response = await axiosInstance.post("/teachers/save_schedule", payload);

        if (response.data?.error_code === 0) {
            dispatch(save_schedule_success(response.data?.data));
            // navigate("/teachers_dashboard/classrooms/0/0/preview_test");
            navigate("/teachers_dashboard/classrooms/0/0/preview_test", { state: { payload } });

        } else {
            dispatch(save_schedule_failure(response.data?.message || "Unknown error"));
        }
    } catch (error) {
        dispatch(save_schedule_failure(error.message));
    }
};

export const handleGetSubjectAttachments = (subject_id) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get(
            "/teachers/get_classroom_attachments",
            { params: { subject_id } }
        );

        if (data?.error_code === 0) {
            dispatch(getSubjectAttachments({ type: "response", data: data?.data }));
        } else {
            dispatch(getSubjectAttachments({ type: "failure", message: data?.message }));
        }
    } catch (error) {
        dispatch(getSubjectAttachments({ type: "failure", message: error?.message }));
    }
};


