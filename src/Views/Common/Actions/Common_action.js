import axios from 'axios';
import axiosInstance from 'Services/axiosInstance';
import {
    handleDeleteNote,
    handlePostNote,
    handleusernotesdata,
    update_error,
    updateToast, updateToken
 

} from 'Views/Common/Slices/Common_slice';

export const deleteTeacherNote = (noteId) => async (dispatch) => {
    try {
        dispatch(handleDeleteNote({ type: "request" }));
        const { data } = await axiosInstance.delete("notes/delete_user_notes", { data: { id: noteId } });

        if (data?.error_code === 0) {
            dispatch(handleDeleteNote({ type: "response" }));
            dispatch(getusernotesdata());
        } else {
            dispatch(handleDeleteNote({ type: "failure", message: data?.message || "Error deleting note" }));
        }
    } catch (err) {
        dispatch(handleDeleteNote({ type: "failure", message: err.message || "Error" }));
    }
};


export const postTeacherNote = (endpoint, noteData) => async (dispatch) => {
    if (!noteData?.title || !noteData?.content) return
    const fd = new FormData();
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
            dispatch(getusernotesdata());
        } else {
            dispatch(handlePostNote({ type: "failure", message: data?.message || "Error" }));
        }
    } catch (err) {
        dispatch(handlePostNote({ type: "failure", message: err.message || "Error" }));
    }
};


export const getusernotesdata = () => async (dispatch) => {
    try {
        dispatch(handleusernotesdata({ type: "request" }));
        const { data } = await axiosInstance.get("notes/get_user_notes");
        if (data?.error_code === 0) {
            dispatch(handleusernotesdata({ type: "response", data: data?.data || [] }));
        } else {
            dispatch(handleusernotesdata({ type: "failure", message: data?.message || "" }));
        }
    } catch (err) {
        dispatch(handleusernotesdata({ type: "failure", message: err?.message || "" }));
    }
}

export const addAndRemoveFavNotes = (id)=> async(dispatch)=>{
    try {
        const { data} = await axiosInstance.patch('notes/priority_user_notes',{id:id})
        if(data?.error_code === 0){
            dispatch(getusernotesdata())
        }else{
             dispatch(update_error({ Err: data.message || "Failed to add fav", Toast_Type: "error" }))
        }
        
    } catch (error) {
          dispatch(update_error({ Err: error?.response?.data?.message || 'Something went wrong', Toast_Type: "error" }))
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


// attachment



