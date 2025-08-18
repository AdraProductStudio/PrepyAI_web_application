import axios from 'axios';
import axiosInstance from 'Services/axiosInstance';
import {
    handleDeleteNote,
    handlePostNote,
    handleTeacherNotesData,
    updateToast, updateToken, handleGetBooks

} from 'Views/Common/Slices/Common_slice';

export const deleteTeacherNote = (endpoint, noteId) => async (dispatch) => {
    let callback_from;
    if (/student_dashboard/.test(endpoint)) callback_from = "/students/get_user_notes"
    else callback_from = "/teachers/get_user_notes"

    try {
        dispatch(handleDeleteNote({ type: "request" }));
        const { data } = await axiosInstance.delete(endpoint, { data: { id: noteId } });

        if (data?.error_code === 0) {
            dispatch(handleDeleteNote({ type: "success" }));
            dispatch(getTeacherNotesData(callback_from));
        } else {
            dispatch(handleDeleteNote({ type: "failure", message: data?.message || "Error deleting note" }));
        }
    } catch (err) {
        dispatch(handleDeleteNote({ type: "failure", message: err.message || "Error" }));
    }
};


export const postTeacherNote = (endpoint, noteData) => async (dispatch) => {
    let callback_from;
    if (/student_dashboard/.test(endpoint)) callback_from = "/students/get_user_notes"
    else callback_from = "/teachers/get_user_notes"

    const fd = new FormData();
    Object.entries(noteData).map(([key, value]) => {
        fd.append(key, value);
    });
    
    try {
        dispatch(handlePostNote({ type: "request" }));
        const { data } = await axiosInstance.post(endpoint, fd);

        if (data?.error_code === 0) {
            dispatch(handlePostNote({ type: "success" }));
            dispatch(getTeacherNotesData(`/${callback_from}/get_user_notes`));
        } else {
            dispatch(handlePostNote({ type: "failure", message: data?.message || "Error" }));
        }
    } catch (err) {
        dispatch(handlePostNote({ type: "failure", message: err.message || "Error" }));
    }
};


export const getTeacherNotesData = (endpoint) => async (dispatch) => {
    try {
        dispatch(handleTeacherNotesData({ type: "request" }));
        const { data } = await axiosInstance.get(endpoint);
        if (data?.error_code === 0) {
            dispatch(handleTeacherNotesData({ type: "response", data: data?.data || [] }));
        } else {
            dispatch(handleTeacherNotesData({ type: "failure", message: data?.message || "" }));
        }
    } catch (err) {
        dispatch(handleTeacherNotesData({ type: "failure", message: err?.message || "" }));
    }
}
// export const getTeacherNotesData = (params = {}) => async (dispatch) => {
//     try {
//         // Start loading state
//         dispatch(handleTeacherNotesData({ type: "request" }));

//         // API call with params
//         const { data } = await axiosInstance.get("/teachers/get_user_notes", { params });

//         if (data?.error_code === 0) {
//             dispatch(
//                 handleTeacherNotesData({
//                     type: "response",
//                     data: Array.isArray(data?.data) ? data.data : []
//                 })
//             );
//         } else {
//             dispatch(
//                 handleTeacherNotesData({
//                     type: "failure",
//                     data: [],
//                     message: data?.message || "Failed to fetch notes."
//                 })
//             );
//         }
//     } catch (err) {
//         dispatch(
//             handleTeacherNotesData({
//                 type: "failure",
//                 data: [],
//                 message: err?.message || "Something went wrong."
//             })
//         );
//     }
// };


// login api 
export const handleLogin = (login_data, navigate) => async (dispatch) => {
    //     let username = login_data?.username || '';
    //     let password = login_data?.password || '';
    //     if (!username || !password) return dispatch(update_app_data({ type: "validation", data: true }));

    //     try {
    //         dispatch(login_reducer({ type: 'request' }))
    //         const {data} = await axios.post(`${BASE_URL}/login/`, {}, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Basic ${btoa(`${username}:${password}`)}`
    //             }
    //         });

    //         if (data.error_code === 200) {
    //             dispatch(login_reducer({ type: 'response', data: data?.data }))
    //             LoginSuccessNavigateTo(data?.data?.role, navigate)
    //         }
    //         else dispatch(login_reducer({ type: 'failure', data: { message:data?.message, type: "error" } }))
    //     } catch (err) {
    //         dispatch(login_reducer({ type: 'failure', data: { message: err?.message, type: "error" } }))
    //     }
}



//refresh token
export const handlerefreshToken = (refresh_token) => async (dispatch) => {
    return null
    try {
        const { data } = await axios.get(`/refresh_token`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refresh_token}`,
            }
        });

        if (data?.error_code === 200) dispatch(updateToken(data?.data?.access_token))
        else dispatch(updateToast({ message: data?.message, type: "error" }))
    } catch (err) {
        dispatch(updateToast({ message: err?.message, type: "error" }))
    }
}

// books api
export const getBooks = (params) => async (dispatch) => {
    try {

        dispatch(handleGetBooks({ type: "request" }));
        const { data } = await axiosInstance.post("/teachers/get_books", params || {});

        if (data?.error_code === 0) {
            dispatch(handleGetBooks({
                type: "response",
                data: data?.data?.books || []
            }));
        } else {

            dispatch(handleGetBooks({
                type: "failure",
                message: data?.message || "Failed to load books"
            }));
        }
    } catch (err) {

        dispatch(handleGetBooks({
            type: "failure",
            message: err?.message || "Network Error"
        }));
    }
};