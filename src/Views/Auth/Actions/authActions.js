import sha256 from "sha256";
import axios from "axios";
import { LoginSuccessNavigateTo } from "ResuableFunctions/LoginSuccessNavigateTo";

import {
  update_app_data, update_error,

} from "Views/Common/Slices/Common_slice";

import {
  login_endpoint, update_admin_register, update_organization_register,
  update_spinner_loadning, update_student_register, update_teacher_register,

} from "Views/Auth/Slices/authSlice";

const validateStudentForm = (values) => {
  const errors = {};

  if (!values.first_name) {
    errors.first_name = "First name is required";
  } else if (!/^[A-Za-z\s]+$/.test(values.first_name)) {
    errors.first_name = "Only alphabets allowed";
  }

  if (!values.last_name) {
    errors.last_name = "Last name is required";
  } else if (!/^[A-Za-z\s]+$/.test(values.last_name)) {
    errors.last_name = "Only alphabets allowed";
  }

  if (!values.email_id) {
    errors.email_id = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email_id)) {
    errors.email_id = "Invalid email format";
  }

  if (!values.phone_number) {
    errors.phone_number = "Contact number is required";
  } else if (!/^\d{10}$/.test(values.phone_number)) {
    errors.phone_number = "Must be exactly 10 digits";
  }

  if (!values.register_no) {
    errors.register_no = "Register number is required";
  } else if (!/^[A-Z0-9]+$/.test(values.register_no)) {
    errors.register_no = "Only uppercase letters and numbers allowed";
  }

  if (!values.institute_name) {
    errors.institute_name = "Institute name is required";
  }

  if (!values.organization_name) {
    errors.organization_name = "Organization name is required";
  }
  if (!values.location) {
    errors.location = "Location is required";
  }

  if (!values.new_password) {
    errors.new_password = "Password is required";
  } else if (
    !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(values.new_password)
  ) {
    errors.new_password =
      "Password must be at least 8 characters, include 1 uppercase, 1 number, and 1 symbol";
  }

  if (!values.confirm_password) {
    errors.confirm_password = "Confirm password is required";
  } else if (values.confirm_password !== values.new_password) {
    errors.confirm_password = "Passwords do not match";
  }

  return errors;
};

export const handleLogin = (formdata, navigate) => async (dispatch) => {
  const { username, password } = formdata;
  if (!username || !password) return dispatch(update_app_data({ type: "validation", data: true }));

  console.log(sha256(password))
  try {
    dispatch(login_endpoint({ type: "request" }));
    const response = await axios.get(process.env.REACT_APP_API_URL + "/login", {
      headers: {
        "Authorization": `Basic ${btoa(`${username}:${sha256(password)}`)}`,
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
  const { first_name, organization_name, institute_name, last_name, email_id, phone_number, location, new_password, confirm_password } = login_data;
  // switch (endpoint) {
  //   case "/register/learner": {
  //     if (!first_name || !last_name || !email_id || !new_password || !confirm_password) return dispatch(update_app_data({ type: "validation", data: true }));
  //     break;
  //   }
  //   case "/register/organization": {
  //     if (!first_name || !organization_name || !last_name || !email_id || !new_password || !phone_number || !location || !confirm_password) return dispatch(update_app_data({ type: "validation", data: true }));
  //     break;
  //   }
  //   case "/register/teacher": {
  //     if (!first_name || !institute_name || !last_name || !email_id || !new_password || !phone_number || !confirm_password) return dispatch(update_app_data({ type: "validation", data: true }));
  //     break;
  //   }
  //   case "/register/student": {
  //     if (!first_name || !institute_name || !last_name || !email_id || !new_password || !phone_number || !confirm_password) return dispatch(update_app_data({ type: "validation", data: true }));
  //     break;
  //   }
  //   case "/register/admin": {
  //     if (!first_name || !institute_name || !last_name || !email_id || !new_password || !phone_number || !location || !confirm_password) return dispatch(update_app_data({ type: "validation", data: true }));
  //     break;
  //   }
  // }
        const errors = validateStudentForm(login_data || {});
  
        if (Object.keys(errors).length > 0) {
          dispatch(update_app_data({ type: "validation", data: true }));
          dispatch(update_app_data({ type: "validationMessage", data: errors }));
          return; 
        }

  try {
    dispatch(update_spinner_loadning({ status: true }));
    const response = await axios.post(process.env.REACT_APP_API_URL + endpoint, { ...login_data, confirm_password: sha256(confirm_password), new_password: sha256(new_password) });

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
    // const api = process.env.REACT_APP_API_URL + endpoint
    const response = await axios.post(endpoint);
    const { message, success } = response?.data;

    if (success) {
      switch (currenPath) {
        case "organization_registration": {
          const { organization_name, code, email } = response?.data?.data;
          const defaultFields = [
            { organization_name },
            { code },
            { email_id: email },
          ];
          return dispatch(update_organization_register(defaultFields));
        }

        case "admin_registration": {
          const { institute_name, code, email } = response?.data?.data;
          const defaultFields = [
            { institute_name },
            { code },
            { email_id: email },
          ];
          return dispatch(update_admin_register(defaultFields));
        }

        case "teacher_registration": {
          const { institute_name, code, email } = response?.data?.data;
          const defaultFields = [
            { institute_name },
            { code },
            { email_id: email },
          ];
          return dispatch(update_teacher_register(defaultFields));
        }
        case "student_registration": {
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
  } catch (error) { }
};

export const handleForgetPass = (forget_data, navigate, endpoint) => async (dispatch) => {
  // const { email_id } = forget_data
  // if (!email_id) return dispatch(update_app_data({ type: "validation", data: true }));

  const errors = validateStudentForm(forget_data || {});
  
  if (Object.keys(errors).length > 0) {
    dispatch(update_app_data({ type: "validation", data: true }));
    dispatch(update_app_data({ type: "validationMessage", data: errors }));
    return; 
  }

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
  const { new_password, confirm_password } = forget_data;
  // if (!new_password || !confirm_password) return dispatch(update_app_data({ type: "validation", data: true }));
  const errors = validateStudentForm(forget_data || {});
  
  if (Object.keys(errors).length > 0) {
    dispatch(update_app_data({ type: "validation", data: true }));
    dispatch(update_app_data({ type: "validationMessage", data: errors }));
    return; 
  }
  try {
    dispatch(update_spinner_loadning({ status: true }))
    const filterData = { ...forget_data, ...routeState };
    filterData.new_password = sha256(new_password);
    filterData.confirm_password = sha256(confirm_password);

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