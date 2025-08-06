import axios from "axios";
import { LoginSuccessNavigateTo } from "ResuableFunctions/LoginSuccessNavigateTo";

import {
  update_app_data, update_error,

} from "Views/Common/Slices/Common_slice";

import {
  login_endpoint, update_admin_register, update_organization_register,
  update_spinner_loadning, update_student_register, update_teacher_register,

} from "Views/Auth/Slices/authSlice";


export const handleLogin = (formdata, navigate) => async (dispatch) => {
  const { username, password } = formdata;
  if (!username || !password) return dispatch(update_app_data({ type: "validation", data: true }));

  try {
    dispatch(login_endpoint({ type: "request" }));
    const response = await axios.get(process.env.REACT_APP_API_URL + "/login", {
      headers: {
        "Authorization": `Basic ${btoa(`${username}:${password}`)}`,
        "Content-Type": "application/json",
      }
    });

    if (response?.data?.error_code === 0) {
      dispatch(login_endpoint({ type: "response", data: response?.data?.data || {} }));
      LoginSuccessNavigateTo(response?.data?.data?.role_name, navigate)
    }
    else dispatch(login_endpoint({ type: "failure", message: response?.data?.message || "Login failed" }));
  } catch (error) {
    dispatch(login_endpoint({ type: "failure", message: error?.message || "Login failed" }));
  }
};

export const handleRegister = (login_data, navigate, endpoint) => async (dispatch) => {
  const { first_name, last_name, email_id, new_password, confirm_password } = login_data;
  if (!first_name || !last_name || !email_id || !new_password || !confirm_password) return dispatch(update_app_data({ type: "validation", data: true }));

  try {
    dispatch(update_spinner_loadning({ status: true }));
    const response = await axios.post(process.env.REACT_APP_API_URL + endpoint, { ...login_data });

    const { message, success } = response?.data;
    if (!success) {
      dispatch(update_error({ Err: message, Toast_Type: "error" }));
      dispatch(update_spinner_loadning({ status: false }));
    }

    if (success) {
      dispatch(update_error({ Err: message, Toast_Type: "success" }));
      dispatch(update_spinner_loadning({ status: false }));
      navigate("/");
    }
  } catch (error) {
    console.log(error, "error from Register");
  }
};

export const authVerification = (currenPath, navigate, endpoint) => async (dispatch) => {
  if (!endpoint) navigate("/");

  try {
    const api = process.env.REACT_APP_API_URL + endpoint
    const response = await axios.post(api);
    const { message, success } = response?.data;

    if (success) {
      switch (currenPath) {
        case "organizationregister": {
          const { organization_name, code, email } = response?.data?.data;
          const defaultFields = [
            { organization_name },
            { code },
            { email_id: email },
          ];
          return dispatch(update_organization_register(defaultFields));
        }

        case "adminregister": {
          const { institute_name, code, email } = response?.data?.data;
          const defaultFields = [
            { institute_name },
            { code },
            { email_id: email },
          ];
          return dispatch(update_admin_register(defaultFields));
        }

        case "teacherregister": {
          const { institute_name, code, email } = response?.data?.data;
          const defaultFields = [
            { institute_name },
            { code },
            { email_id: email },
          ];
          return dispatch(update_teacher_register(defaultFields));
        }
        case "studentregister": {
          const { institute_name, code, email } = response?.data?.data;
          const defaultFields = [
            { institute_name },
            { code },
            { email_id: email },
          ];
          return dispatch(update_student_register(defaultFields));
        }
        default:
          break;
      }
    }

    if (!success) {
      dispatch(update_error({ Err: message, Toast_Type: "error" }));
      navigate("/");
    }
  } catch (error) {
    console.log(error, "rror");
  }
};

export const handleOAuth = (navigate, endpoint) => async (dispatch) => {
  try {
    const response = await axios.get(endpoint);
    const { data, success } = response?.data;

    if (success) {
      window.location.href = data;
    }
    console.log(response, "sadsad");
  } catch (error) { }
};

export const handleForgetPass = (forget_data, navigate, endpoint) => async (dispatch) => {
  try {
    dispatch(update_spinner_loadning({ status: true }))

    const api = process.env.REACT_APP_API_URL + endpoint
    const response = await axios.post(api, forget_data);
    const { data, message, success } = response?.data;

    if (!success) {
      dispatch(update_error({ Err: message, Toast_Type: "error" }));
      dispatch(update_spinner_loadning({ status: false }))
    }
    if (success) {
      dispatch(update_error({ Err: message, Toast_Type: "success" }));
      dispatch(update_spinner_loadning({ status: false }))
      navigate("/otpverification", { state: data });
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleOtpVerification = (forget_data, routeState, navigate, endpoint) => async (dispatch) => {
  let otp;
  if (forget_data?.otp1 && forget_data?.otp2 && forget_data?.otp3 && forget_data?.otp4) otp = Object.values(forget_data).join("");

  const filterData = { email_id: routeState?.email_id, otp: otp };

  try {
    dispatch(update_spinner_loadning({ status: true }))
    const api = process.env.REACT_APP_API_URL + endpoint
    const response = await axios.post(api, filterData);
    const { data, message, success } = response?.data;

    if (!success) {
      dispatch(update_error({ Err: message, Toast_Type: "error" }));
      dispatch(update_spinner_loadning({ status: false }))
    }
    if (success) {
      dispatch(update_error({ Err: message, Toast_Type: "success" }));
      dispatch(update_spinner_loadning({ status: false }))
      navigate("/createpassword", { state: data })
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleCreatePassword = (forget_data, routeState, navigate, endpoint) => async (dispatch) => {
  try {
    dispatch(update_spinner_loadning({ status: true }))
    const filterData = { ...forget_data, ...routeState };
    const api = process.env.REACT_APP_API_URL + endpoint;
    const response = await axios.post(api, filterData);

    const { success, message } = response?.data;

    if (!success) {
      dispatch(update_error({ Err: message, Toast_Type: "error" }));
      dispatch(update_spinner_loadning({ status: false }))
    }
    if (success) {
      dispatch(update_error({ Err: message, Toast_Type: "success" }));
      dispatch(update_spinner_loadning({ status: false }))
      navigate("/successmessage");
    }
  } catch (error) {
    console.log(error)
  }
}