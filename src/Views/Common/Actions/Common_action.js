import axios from 'axios';
import axiosInstance from 'Services/axiosInstance';
import {
    // update_app_data, 
    // login_reducer
    updateToast, updateToken, handleGetBooks,
 

} from 'Views/Common/Slices/Common_slice';

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
// attachment



