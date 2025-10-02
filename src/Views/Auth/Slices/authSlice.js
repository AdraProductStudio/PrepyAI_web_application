import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logindata: {},
  loginisLoading: false,
  learnersregisterdata: {},
  organizationRegisterdata: {},
  adminRegisterdata: {},
  teacherRegisterdata: {},
  studentRegisterdata: {},
  forgotPassworddata: {},
  otpVerificationdata: {},
  createPassworddata: {},
  app_data: {
    buttonSpinner: false,
    shownewPassword: false,
    showConfirmPassword: false,
    validated: false,
  },
};

const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    update_login_data(state, action) {
      const [key, value] = Object.entries(action.payload)[0] || [];
      state.logindata[key] = value || "";
    },
    update_learners_register(state, action) {
      const [key, value] = Object.entries(action.payload)[0] || [];
      state.learnersregisterdata[key] = value || "";
    },
    update_organization_register(state, action) {
      if (Array.isArray(action.payload)) {
        action.payload.forEach((val) => {
          const [[key, value]] = Object.entries(val);
          state.organizationRegisterdata[key] = value || "";
        });
      } else {
        const [key, value] = Object.entries(action.payload)[0] || [];
        state.organizationRegisterdata[key] = value || "";
      }
    },
    update_admin_register(state, action) {
      if (Array.isArray(action.payload)) {
        action.payload.forEach((val) => {
          const [[key, value]] = Object.entries(val);
          state.adminRegisterdata[key] = value || "";
        });
      } else {
        const [key, value] = Object.entries(action.payload)[0] || [];
        state.adminRegisterdata[key] = value || "";
      }
    },
    update_teacher_register(state, action) {
      if (Array.isArray(action.payload)) {
        action.payload.forEach((val) => {
          const [[key, value]] = Object.entries(val);
          state.teacherRegisterdata[key] = value || "";
        });
      } else {
        const [key, value] = Object.entries(action.payload)[0] || [];
        state.teacherRegisterdata[key] = value || "";
      }
    },
    update_student_register(state, action) {
      if (Array.isArray(action.payload)) {
        action.payload.forEach((val) => {
          const [[key, value]] = Object.entries(val);
          state.studentRegisterdata[key] = value || "";
        });
      } else {
        const [key, value] = Object.entries(action.payload)[0] || [];
        state.studentRegisterdata[key] = value || "";
      }
    },

    update_spinner_loadning(state, action) {
      const { status } = action?.payload || {};
      state.app_data.buttonSpinner = status || false;
    },
    update_validation(state, action) {
      const { status } = action?.payload || {};
      state.app_data.validated = status || false;
    },
    update_input_eye(state, action) {
      const { shownewPassword, showConfirmPassword } = action?.payload || {};
      state.app_data.shownewPassword = shownewPassword || false;
      state.app_data.showConfirmPassword = showConfirmPassword || false;
    },
    update_forgot_password(state, action) {
      const [key, value] = Object.entries(action.payload)[0] || [];
      state.forgotPassworddata[key] = value || "";
    },
    update_otp_verification(state, action) {
      const [key, value] = Object.entries(action.payload)[0] || [];
      state.otpVerificationdata[key] = value || "";
    },
    update_create_password(state, action) {
      const [key, value] = Object.entries(action.payload)[0] || [];
      state.createPassworddata[key] = value || "";
    },
    reset_forget_details(state,action){
      state.otpVerificationdata={};
      state.forgotPassworddata = {};
      state.createPassworddata={};
      state.organizationRegisterdata = {};
      state.adminRegisterdata = {};
      state.teacherRegisterdata = {};
      state.studentRegisterdata = {};
      state.learnersregisterdata = {};
    },

    // Login api 
    login_endpoint(state, action) {
      const { type } = action.payload || {};
      switch (type) {
        case "request":
          state.loginisLoading = true;
          break;

        case "response":
          state.loginisLoading = false;
          state.logindata = {};
          break;

        case "failure":
          state.loginisLoading = false;
          break;

        default:
          break;
      }
    }
  }
});

const { actions, reducer } = authSlice;

export default reducer;

export const {
  update_login_data, update_learners_register, update_organization_register, update_admin_register,
  update_spinner_loadning, update_teacher_register, update_student_register, update_input_eye,
  update_forgot_password, update_otp_verification, update_create_password, update_validation,reset_forget_details,
  login_endpoint
} = actions;
