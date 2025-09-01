import axios from 'axios';
import axiosInstance from 'Services/axiosInstance';
import {
    handleDeleteNote,
    handlePostNote,
    handleTeacherNotesData,
    updateToast, updateToken,  handleGetBooks,
 

} from 'Views/Common/Slices/Common_slice';

export const deleteTeacherNote = (endpoint, noteId) => async (dispatch) => {
    let callback_endpoint;
    if (/students/.test(endpoint)) callback_endpoint = "/students/get_user_notes"
    else callback_endpoint = "/teachers/get_user_notes"

    try {
        dispatch(handleDeleteNote({ type: "request" }));
        const { data } = await axiosInstance.delete(endpoint, { data: { id: noteId } });

        if (data?.error_code === 0) {
            dispatch(handleDeleteNote({ type: "response" }));
            dispatch(getTeacherNotesData(callback_endpoint));
        } else {
            dispatch(handleDeleteNote({ type: "failure", message: data?.message || "Error deleting note" }));
        }
    } catch (err) {
        dispatch(handleDeleteNote({ type: "failure", message: err.message || "Error" }));
    }
};


export const postTeacherNote = (endpoint, noteData) => async (dispatch) => {
    let callback_endpoint;
    if (/students/.test(endpoint)) callback_endpoint = "/students/get_user_notes"
    else callback_endpoint = "/teachers/get_user_notes"

    const fd = new FormData();
    fd.append("priority", "low");
    if (noteData?.id) fd.append("id", noteData.id);
    Object.entries(noteData).map(([key, value]) => {
        if (key !== "id") fd.append(key, value);
    });

    try {
        dispatch(handlePostNote({ type: "request" }));
        const method = noteData?.id ? "put" : "post";
        const { data } = await axiosInstance[method](endpoint, fd);

        if (data?.error_code === 0) {
            dispatch(handlePostNote({ type: "response" }));
            dispatch(getTeacherNotesData(callback_endpoint));
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
// attachment



