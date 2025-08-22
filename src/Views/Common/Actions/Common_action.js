import axios from 'axios';
import axiosInstance from 'Services/axiosInstance';
import {
    updateToast, updateToken, handleGetBooks,
    handleGetNotes,
    handleDeleteNotes,setDeleteId,handleNotePriority,updateNoteField,
    updateModalShow,
    update_error

} from 'Views/Common/Slices/Common_slice';


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



//-----------------------------------Notes------------------------------------------------//



const getNotesEndpoint = () => {
  if (window.location.pathname.startsWith("/student_dashboard")) {
    return "/students";
  } else if (window.location.pathname.startsWith("/teachers_dashboard")) {
    return "/teachers";
  }
};


export const getNotes = (params) => async (dispatch) => {
  try {
    const endpoint = getNotesEndpoint();
    dispatch(handleGetNotes({ type: "request" }));
    const { data } = await axiosInstance.get(`${endpoint}/get_user_notes`, params || {}
    );

    if (data?.error_code === 0) {
      dispatch(handleGetNotes({ type: "response", data: data?.data || [] }));
    } else {
      dispatch(handleGetNotes({ type: "failure",message: data?.message || '' }));

    }
  } catch (err){
    dispatch(handleGetNotes({ type: "failure",message: err?.message || '' }));
  } 
};


export const deleteNotes = (id) => async(dispatch) =>{
  try{
      const endpoint = getNotesEndpoint();
      dispatch(handleDeleteNotes({ type:"request", id}))
      const {data} = await axiosInstance.delete(`${endpoint}/delete_user_notes`,{ data:{id} })
      if (data?.error_code === 0){
        dispatch(updateModalShow({ show: false }));
        dispatch(getNotes())
        dispatch(handleDeleteNotes({ type:"response", id }));
        dispatch(setDeleteId(null)); 
      }
      else{
        dispatch(handleDeleteNotes({ type: "failure",id,message: data?.message || '' }));
      }
  }
  catch(err){
    dispatch(handleDeleteNotes({ type: "failure",id,message: err?.message || '' }));
  }
};


export const updateNotePriority = (id) => async (dispatch) => {
  try {
    const endpoint = getNotesEndpoint();
    dispatch(handleNotePriority({ id }));
    const { data } = await axiosInstance.put(`${endpoint}/priority_user_notes`,{ id });
    if (data?.error_code !== 0) {
      console.error("Failed  priority:", data?.message);
      dispatch(handleNotePriority({ id }));
    }
  } catch (err) {
    console.error("Error in priority:", err.message);
    dispatch(handleNotePriority({ id }));
  }
};


export const createNote = () => async (dispatch, getState) => {
  const endpoint = getNotesEndpoint();
  const { title, content } = getState().commonState.notes;
  if (!title?.trim() || !content?.trim()) {
    return dispatch(update_error({ Err: "Title and Content are required", Toast_Type: "error" }));
  }
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("priority", "low");
    const { data } = await axiosInstance.post(`${endpoint}/create_user_notes`,formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });

    if (data?.error_code === 0) {
      dispatch(getNotes());
      dispatch(updateNoteField({ field: "title", value: "" }));
      dispatch(updateNoteField({ field: "content", value: "" }));
      dispatch(updateModalShow({ show: false }));
      dispatch(update_error({ Err: "Note created successfully", Toast_Type: "success" }));
    } else {
      dispatch(update_error({ Err: data?.message || "Failed to create note", Toast_Type: "error" }));
    }
  } catch (err) {
    dispatch(update_error({ Err: err?.message || "Server error", Toast_Type: "error" }));
  }
};


export const updateNote = (id) => async (dispatch, getState) => {
  const endpoint = getNotesEndpoint();
  const { title, content } = getState().commonState.notes;
  if (!title?.trim() || !content?.trim()) {
    return dispatch(update_error({ Err: "Title and Content are required", Toast_Type: "error" }));
  }
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("priority", "low");
    formData.append("id", id);
    const { data } = await axiosInstance.put(`${endpoint}/edit_user_notes`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (data?.error_code === 0) {
      dispatch(getNotes());
      dispatch(updateModalShow({ show: false }));
      dispatch(update_error({ Err: "Note updated successfully", Toast_Type: "success" }));
    } else {
      dispatch(update_error({ Err: data?.message || "Failed to update note", Toast_Type: "error" }));
    }
  } catch (err) {
    dispatch(update_error({ Err: err?.message || "Server error", Toast_Type: "error" }));
  }
};