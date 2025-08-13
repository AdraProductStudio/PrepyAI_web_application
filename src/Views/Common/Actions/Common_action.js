import axios from 'axios';
import axiosInstance from 'Services/axiosInstance';

import {
    handleDeleteNote,
    handlePostNote,
    handleTeacherNotesData,
    // update_app_data, 
    // login_reducer
    updateToast, updateToken,

} from 'Views/Common/Slices/Common_slice';

// const BASE_URL = process.env.REACT_APP_API_URL || '';

//teachersnotes api


export const deleteTeacherNote = (noteId) => async (dispatch) => {
    console.log(noteId, "ASDdsdfsa")
    try {
        dispatch(handleDeleteNote({ type: "request" }));

        const { data } = await axiosInstance.delete("/teachers/delete_user_notes", { data: { id: noteId } });

        if (data?.error_code === 0) {
            dispatch(handleDeleteNote({ type: "success" }));
            dispatch(getTeacherNotesData()); // refresh after delete
        } else {
            dispatch(handleDeleteNote({ type: "failure", message: data?.message || "Error deleting note" }));
        }
    } catch (err) {
        dispatch(handleDeleteNote({ type: "failure", message: err.message || "Error" }));
    }
};


    export const handlecreateNote = (formdata) => async (dispatch) => {
        const {content,title } = formdata
        const fd = new FormData();
        fd.append("title", title);
        fd.append("content", content);
        fd.append("priority","low")
        
        // If you actually have a file:
        if (formdata.file) {
        fd.append("file", formdata.file); // this should be a File or Blob object
        }

        if (!title || !content) {
            return dispatch(handlePostNote({ type: "validation", data: true }));
        }

        try {
            dispatch(handlePostNote({ type: "request" }));

            const { data } = await axiosInstance.post("/teachers/create_user_notes", fd);

            if (data?.error_code === 0) {
                dispatch(handlePostNote({ type: "success", data: data }));
                dispatch(getTeacherNotesData()); 
            } else {
                dispatch(handlePostNote({
                    type: "failure",
                    data: data?.message || "Error creating note",
                }));
            }
        } catch (error) {
            dispatch(handlePostNote({
                type: "failure",
                data: error?.message || "Error creating note",
            }));
        }
    };

export const getTeacherNotesData = (params) => async (dispatch) => {
    try {
        dispatch(handleTeacherNotesData({ type: "request" }));
        const { data } = await axiosInstance.get("/teachers/get_user_notes");
        if (data?.error_code === 0) {
            dispatch(
                handleTeacherNotesData({ type: "response", data: data?.data || "" })
            );
        } else {
            dispatch(
                handleTeacherNotesData({
                    type: "failure",
                    message: data?.message || "",
                })
            );
        }
    } catch (err) {
        dispatch(
            handleTeacherNotesData({ type: "failure", message: err?.message || "" })
        );
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