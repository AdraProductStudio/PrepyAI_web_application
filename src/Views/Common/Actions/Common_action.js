import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';
import axiosInstance from 'Services/axiosInstance';
import {
    // update_app_data, 
    // login_reducer
    updateToast, updateToken,handleGetStudentsNotes,handleDeleteStudentNotes,handleNotePriority,updateNoteField,
    updateModalShow,
    update_error} from 'Views/Common/Slices/Common_slice';


// const BASE_URL = process.env.REACT_APP_API_URL || '';

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

//------------------------Student Notes------------------//


export const getStudentsNotes = (params) => async (dispatch) => {
  try {
    dispatch(handleGetStudentsNotes({ type: "request" }))
    const { data } = await axiosInstance.get("/students/get_user_notes", params || {}
    );

    if (data?.error_code === 0) {
      dispatch(handleGetStudentsNotes({ type: "response", data: data?.data || [] }));
    } else {
      dispatch(handleGetStudentsNotes({ type: "failure",message: data?.message || '' }));

    }
  } catch (err){
    dispatch(handleGetStudentsNotes({ type: "failure",message: err?.message || '' }));
  } 
};


export const deleteStudentNotes = (id) => async(dispatch) =>{
  try{
      dispatch(handleDeleteStudentNotes({ type:"request", id}))
      const {data} = await axiosInstance.delete('/students/delete_user_notes',{ data:{id} })
      if (data?.error_code === 0){
        dispatch(handleDeleteStudentNotes({ type:"response", id }));
      }
      else{
        dispatch(handleDeleteStudentNotes({ type: "failure",id,message: data?.message || '' }));
      }
  }
  catch(err){
    dispatch(handleDeleteStudentNotes({ type: "failure",id,message: err?.message || '' }));
  }
};


export const updateNotePriority = (id) => async (dispatch) => {
  try {
    dispatch(handleNotePriority({ id }));
    const { data } = await axiosInstance.put('/students/priority_user_notes',{ id });
    if (data?.error_code !== 0) {
      console.error("Failed  priority:", data?.message);
      dispatch(handleNotePriority({ id }));
    }
  } catch (err) {
    console.error("Error in priority:", err.message);
    dispatch(handleNotePriority({ id }));
  }
};


export const createStudentNote = () => async (dispatch, getState) => {
  const { title, content } = getState().commonState.students_notes;
  if (!title?.trim() || !content?.trim()) {
    return dispatch(update_error({ Err: "Title and Content are required", Toast_Type: "error" }));
  }
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("priority", "low");
    const { data } = await axiosInstance.post("/students/create_user_notes",formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });

    if (data?.error_code === 0) {
      dispatch(getStudentsNotes());
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


export const updateStudentNote = (id) => async (dispatch, getState) => {
  const { title, content } = getState().commonState.students_notes;
  if (!title?.trim() || !content?.trim()) {
    return dispatch(update_error({ Err: "Title and Content are required", Toast_Type: "error" }));
  }
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("priority", "low");
    formData.append("id", id);
    const { data } = await axiosInstance.put("/students/edit_user_notes", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (data?.error_code === 0) {
      dispatch(getStudentsNotes());
      dispatch(updateModalShow({ show: false }));
      dispatch(update_error({ Err: "Note updated successfully", Toast_Type: "success" }));
    } else {
      dispatch(update_error({ Err: data?.message || "Failed to update note", Toast_Type: "error" }));
    }
  } catch (err) {
    dispatch(update_error({ Err: err?.message || "Server error", Toast_Type: "error" }));
  }
};