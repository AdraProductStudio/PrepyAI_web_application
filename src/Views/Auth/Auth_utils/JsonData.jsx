import { useRef } from "react";
import {
  update_admin_register, update_create_password, update_forgot_password,
  update_input_eye, update_learners_register, update_login_data,
  update_organization_register, update_otp_verification, update_student_register,
  update_teacher_register,
} from "Views/Auth/Slices/authSlice";
import { handleRegister, handleLogin, handleForgetPass, handleCreatePassword } from "Views/Auth/Actions/authActions";
import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";
import Icons from "Utils/Icons";

const JsonData = () => {
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const { commonState, authState } = useCommonState();
  const otpRefs = useRef([]);
  const jsonOnly = {};

  const jsxJson = {
    login: [
      {
        name: "Email",
        type: "text",
        category: "input",
        placeholder: "mail@abc",
        value: authState?.logindata?.username || "",
        change: (e) => dispatch(update_login_data({ username: e.target.value })),
        keyDown: (e) => {
          if (e.key === "Enter") dispatch(handleLogin(authState?.logindata, navigate));
        },
        divClassName: "mb-3",
        className: "login-input",
        isMandatory: false,
        Err: commonState?.app_data?.validated && !authState?.logindata?.username ? "username required" : null,
      },
      {
        name: "Password",
        type: authState?.app_data?.shownewPassword ? "text" : "password",
        category: "input",
        placeholder: "********",
        className: "pe-5 login-input",
        value: authState?.logindata?.password || "",
        change: (e) => dispatch(update_login_data({ password: e.target.value })),
        keyDown: (e) => {
          if (e.key === "Enter") dispatch(handleLogin(authState?.logindata, navigate));
        },
        eyeFunction: () => dispatch(update_input_eye({ shownewPassword: !authState?.app_data?.shownewPassword })),
        eyeIcon: authState?.app_data?.shownewPassword
          ? Icons?.EyeClose
          : Icons?.EyeOpen,
        divClassName: "mb-1",
        isMandatory: false,
        Err: commonState?.app_data?.validated && !authState?.logindata?.password ? "password required" : null,
      },
    ],
    learnersRegister: [
      {
        name: "First Name",
        type: "text",
        category: "input",
        placeholder: "Enter Your First Name",
        value: authState?.learnersregisterdata?.first_name || "",
        change: (e) => dispatch(update_learners_register({ first_name: e.target.value })),
        keyDown: (e) => {
          if (e.key === "Enter")
            dispatch(handleRegister(authState?.learnersregisterdata, navigate, `${process.env.REACT_APP_API_URL}/register/learner`));
        },
        divClassName: "mb-3",
        className: "login-input",
        isMandatory: true,
        Err: commonState?.app_data?.validated && !authState?.learnersregisterdata?.firstName ? "firstName required" : null,
      },
      {
        name: "Last Name",
        type: "text",
        category: "input",
        placeholder: "Enter Your Last Name",
        className: "pe-5 login-input",
        value: authState?.learnersregisterdata?.last_name || "",
        change: (e) => dispatch(update_learners_register({ last_name: e.target.value })),
        divClassName: "mb-3",
        isMandatory: false,
        Err: commonState?.app_data?.validated && !authState?.learnersregisterdata?.last_name ? "lastName required" : null,
      },
      {
        name: "Email",
        type: "text",
        category: "input",
        placeholder: "mail@abc",
        value: authState?.learnersregisterdata?.email_id || "",
        change: (e) => dispatch(update_learners_register({ email_id: e.target.value })),
        divClassName: "mb-3",
        className: "pe-5 login-input",
        isMandatory: true,
        Err: commonState?.app_data?.validated && !authState?.learnersregisterdata?.email_id ? "email required" : null,
      },
      {
        name: "Password",
        type: authState?.app_data?.shownewPassword ? "text" : "password",
        category: "input",
        placeholder: "********",
        className: "pe-5 login-input",
        value: authState?.learnersregisterdata?.new_password || "",
        change: (e) => dispatch(update_learners_register({ new_password: e.target.value })),
        eyeFunction: () =>
          dispatch(update_input_eye({ shownewPassword: !authState?.app_data?.shownewPassword })),
        eyeIcon: authState?.app_data?.shownewPassword
          ? Icons?.EyeClose
          : Icons?.EyeOpen,
        divClassName: "mb-3",
        isMandatory: true,
        Err: commonState?.app_data?.validated && !authState?.learnersregisterdata?.shownewPassword ? "password required" : null,
      },
      {
        name: "Confirm Password",
        type: authState?.app_data?.showConfirmPassword ? "text" : "password",
        category: "input",
        placeholder: "********",
        className: "pe-5 login-input",
        value: authState?.learnersregisterdata?.confirm_password || "",
        change: (e) => dispatch(update_learners_register({ confirm_password: e.target.value })),
        eyeFunction: () =>
          dispatch(
            update_input_eye({
              showConfirmPassword: !authState?.app_data?.showConfirmPassword,
            })
          ),
        eyeIcon: authState?.app_data?.showConfirmPassword
          ? Icons?.EyeClose
          : Icons?.EyeOpen,
        divClassName: "mb-3",
        isMandatory: true,
        Err: commonState?.app_data?.validated && !authState?.learnersRegister?.showConfirmPassword ? "confirmPassword required" : null,
      },
    ],
    organizationRegister: [
      {
        name: "First Name",
        type: "text",
        category: "input",
        className: "pe-5 login-input",
        placeholder: "Enter Your First Name",
        value: authState?.organizationRegisterdata?.first_name || "",
        change: (e) =>
          dispatch(
            update_organization_register({ first_name: e.target.value })
          ),
        keyDown: (e) => {
          if (e.key === "Enter") dispatch(handleRegister(authState?.organizationRegisterdata, navigate, `${process.env.REACT_APP_API_URL}/register/organization`));
        },
        divClassName: "mb-3",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !authState?.organizationRegisterdata?.first_name
            ? "firstName required"
            : null,
      },
      {
        name: "Last Name",
        type: "text",
        category: "input",
        placeholder: "Enter Your Last Name",
        className: "pe-5 login-input",
        value: authState?.organizationRegisterdata?.last_name || "",
        change: (e) => dispatch(update_organization_register({ last_name: e.target.value })),
        divClassName: "mb-3",
        isMandatory: false,
        Err:
          commonState?.app_data?.validated &&
            !authState?.organizationRegisterdata?.last_name
            ? "lastName required"
            : null,
      },
      {
        name: "Organization Name",
        type: "text",
        category: "input",
        placeholder: "Enter Your Organization Name",
        disabled: true,
        value: authState?.organizationRegisterdata?.organization_name || "",
        change: (e) =>
          dispatch(
            update_organization_register({ organization_name: e.target.value })
          ),
        divClassName: "mb-3",
        className: "login-input",
        isMandatory: false,
        Err:
          commonState?.app_data?.validated &&
            !authState?.organizationRegisterdata?.organization_name
            ? "Organization Name required"
            : null,
      },
      {
        name: "Business Email",
        type: "text",
        category: "input",
        placeholder: "mail@abc",
        disabled: true,
        value: authState?.organizationRegisterdata?.email_id || "",
        change: (e) =>
          dispatch(update_organization_register({ email_id: e.target.value })),
        divClassName: "mb-3 ",
        className: "pe-5 login-input",
        isMandatory: false,
        Err:
          commonState?.app_data?.validated &&
            !authState?.organizationRegisterdata?.email_id
            ? "email required"
            : null,
      },
      {
        name: "Phone Number",
        type: "number",
        category: "input",
        placeholder: "999-999-9999",
        value: authState?.organizationRegisterdata?.phone_number || "",
        change: (e) =>
          dispatch(
            update_organization_register({ phone_number: e.target.value })
          ),
        divClassName: "mb-3",
        className: "pe-5 login-input",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !authState?.organizationRegisterdata?.phone_number
            ? "Phone Number required"
            : null,
      },
      {
        name: "Location",
        type: "text",
        category: "input",
        placeholder: "Enter Organization Location",
        value: authState?.organizationRegisterdata?.location || "",
        change: (e) =>
          dispatch(update_organization_register({ location: e.target.value })),
        divClassName: "mb-3",
        className: "pe-5 login-input",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !authState?.organizationRegister?.location
            ? "location required"
            : null,
      },
      {
        name: "Password",
        type: authState?.app_data?.shownewPassword ? "text" : "password",
        category: "input",
        placeholder: "********",
        className: "pe-5 login-input",
        value: authState?.organizationRegisterdata?.new_password || "",
        change: (e) =>
          dispatch(
            update_organization_register({ new_password: e.target.value })
          ),
        eyeFunction: () =>
          dispatch(
            update_input_eye({
              shownewPassword: !authState?.app_data?.shownewPassword,
            })
          ),
          eyeIcon: authState?.app_data?.shownewPassword
          ? Icons?.EyeClose
          : Icons?.EyeOpen,
        divClassName: "mb-3",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !authState?.organizationRegister?.new_password
            ? "password required"
            : null,
      },
      {
        name: "Confirm Password",
        type: authState?.app_data?.showConfirmPassword ? "text" : "password",
        category: "input",
        placeholder: "********",
        className: "pe-5 login-input",
        value: authState?.organizationRegisterdata?.confirm_password || "",
        change: (e) =>
          dispatch(
            update_organization_register({ confirm_password: e.target.value })
          ),
        eyeFunction: () =>
          dispatch(
            update_input_eye({
              showConfirmPassword: !authState?.app_data?.showConfirmPassword,
            })
          ),
          eyeIcon: authState?.app_data?.showConfirmPassword
          ? Icons?.EyeClose
          : Icons?.EyeOpen,
        divClassName: "mb-3",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !authState?.organizationRegister?.confirmPassword
            ? "confirmPassword required"
            : null,
      },
    ],
    adminRegister: [
      {
        name: "First Name",
        type: "text",
        category: "input",
        placeholder: "Enter Your First Name",
        value: authState?.adminRegisterdata?.first_name || "",
        change: (e) =>
          dispatch(update_admin_register({ first_name: e.target.value })),
        keyDown: (e) => {
            if (e.key === 'Enter') dispatch(handleRegister(authState?.adminRegisterdata, navigate, "/register/admin"))
        },
        divClassName: "mb-3",
        className: "login-input",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.adminRegister?.firstName
            ? "firstName required"
            : null,
      },
      {
        name: "Last Name",
        type: "text",
        category: "input",
        placeholder: "Enter Your Last Name",
        className: "pe-5 login-input",
        value: authState?.adminRegisterdata?.last_name || "",
        change: (e) =>
        dispatch(update_admin_register({ last_name: e.target.value })),
        divClassName: "mb-3",
        isMandatory: false,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.adminRegister?.lastName
            ? "lastName required"
            : null,
      },
      {
        name: "Institute Name",
        type: "text",
        category: "input",
        placeholder: "Enter Your Institute Name",
        value: authState?.adminRegisterdata?.institute_name || "",
        change: (e) =>
        dispatch(update_admin_register({ institute_name: e.target.value })),
        divClassName: "mb-3",
        disabled: true,
        className: "login-input",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.adminRegister?.instituteName
            ? "Institute Name required"
            : null,
      },
      {
        name: "Email",
        disabled: true,
        type: "text",
        category: "input",
        placeholder: "mail@abc",
        value: authState?.adminRegisterdata?.email_id || "",
        change: (e) =>
        dispatch(update_admin_register({ email_id: e.target.value })),
        divClassName: "mb-3 ",
        className: "pe-5 login-input",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated && !commonState?.adminRegister?.email
            ? "email required"
            : null,
      },
      {
        name: "Phone Number",
        type: "number",
        category: "input",
        placeholder: "999-999-9999",
        value: authState?.adminRegisterdata?.phone_number || "",
        change: (e) =>
        dispatch(update_admin_register({ phone_number: e.target.value })),
        divClassName: "mb-3",
        className: "pe-5 login-input",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.adminRegister?.phoneNumber
            ? "Phone Number required"
            : null,
      },
      {
        name: "Location",
        type: "text",
        category: "input",
        placeholder: "Enter Institute Location",
        value: authState?.adminRegisterdata?.location || "",
        change: (e) =>
        dispatch(update_admin_register({ location: e.target.value })),
        divClassName: "mb-3 ",
        className: "pe-5 login-input",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.adminRegister?.location
            ? "location required"
            : null,
      },
      {
        name: "Password",
        type: authState?.app_data?.shownewPassword ? "text" : "password",
        category: "input",
        placeholder: "********",
        className: "pe-5 login-input",
        value: authState?.adminRegisterdata?.new_password || "",
        change: (e) =>
        dispatch(update_admin_register({ new_password: e.target.value })),
        eyeFunction: () =>
          dispatch(
            update_input_eye({
              shownewPassword: !authState?.app_data?.shownewPassword,
            })
          ),
        eyeIcon: authState?.app_data?.shownewPassword
          ? Icons?.EyeClose
          : Icons?.EyeOpen,
        divClassName: "mb-3",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.adminRegister?.password
            ? "password required"
            : null,
      },
      {
        name: "Confirm Password",
        type: authState?.app_data?.showConfirmPassword ? "text" : "password",
        category: "input",
        placeholder: "********",
        className: "pe-5 login-input",
        value: authState?.adminRegisterdata?.confirm_password || "",
        change: (e) =>
        dispatch(update_admin_register({ confirm_password: e.target.value })),
        eyeFunction: () =>
          dispatch(
            update_input_eye({
              showConfirmPassword: !authState?.app_data?.showConfirmPassword,
            })
          ),
        eyeIcon: authState?.app_data?.showConfirmPassword
          ? Icons?.EyeClose
          : Icons?.EyeOpen,
        divClassName: "mb-3",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.adminRegister?.confirmPassword
            ? "confirmPassword required"
            : null,
      },
    ],
    teacherRegister: [
      {
        name: "First Name",
        type: "text",
        category: "input",
        placeholder: "Enter Your First Name",
        value: authState?.teacherRegisterdata?.first_name || "",
        change: (e) =>
          dispatch(update_teacher_register({ first_name: e.target.value })),
        keyDown: (e) => {
            if (e.key === 'Enter') dispatch(handleRegister(authState?.teacherRegisterdata, navigate, "/register/teacher"))
        },
        divClassName: "mb-3",
        className: "login-input",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.teacherRegister?.firstName
            ? "firstName required"
            : null,
      },
      {
        name: "Last Name",
        type: "text",
        category: "input",
        placeholder: "Enter Your Last Name",
        className: "pe-5 login-input",
        value: authState?.teacherRegisterdata?.last_name || "",
        change: (e) =>
        dispatch(update_teacher_register({ last_name: e.target.value })),
        divClassName: "mb-3",
        isMandatory: false,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.teacherRegister?.firstName
            ? "lastName required"
            : null,
      },
      {
        name: "Institute Name",
        type: "text",
        category: "input",
        placeholder: "Enter Your Institute Name",
        value: authState?.teacherRegisterdata?.institute_name || "",
        change: (e) =>
        dispatch(update_teacher_register({ institute_name: e.target.value })),
        divClassName: "mb-3",
        disabled: true,
        className: "login-input",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.teacherRegister?.instituteName
            ? "Institute Name required"
            : null,
      },
      {
        name: "Email",
        type: "text",
        category: "input",
        placeholder: "mail@abc",
        value: authState?.teacherRegisterdata?.email_id || "",
        change: (e) =>
        dispatch(update_teacher_register({ email_id: e.target.value })),
        divClassName: "mb-3",
        disabled: true,
        className: "pe-5 login-input",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.teacherRegister?.email
            ? "email required"
            : null,
      },
      {
        name: "Phone Number",
        type: "number",
        category: "input",
        placeholder: "999-999-9999",
        value: authState?.teacherRegisterdata?.phone_number || "",
        change: (e) =>
        dispatch(update_teacher_register({ phone_number: e.target.value })),
        divClassName: "mb-3",
        className: "pe-5 login-input",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.teacherRegister?.phoneNumber
            ? "Phone Number required"
            : null,
      },
      {
        name: "Password",
        type: authState?.app_data?.shownewPassword ? "text" : "password",
        category: "input",
        placeholder: "********",
        className: "pe-5 login-input",
        value: authState?.teacherRegisterdata?.new_password || "",
        change: (e) =>
        dispatch(update_teacher_register({ new_password: e.target.value })),
        eyeFunction: () =>
          dispatch(
            update_input_eye({
              shownewPassword: !authState?.app_data?.shownewPassword,
            })
          ),
        eyeIcon: authState?.app_data?.shownewPassword
          ? Icons?.EyeClose
          : Icons?.EyeOpen,
        divClassName: "mb-3",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.teacherRegister?.password
            ? "password required"
            : null,
      },
      {
        name: "Confirm Password",
        type: authState?.app_data?.showConfirmPassword ? "text" : "password",
        category: "input",
        placeholder: "********",
        className: "pe-5 login-input",
        value: authState?.teacherRegisterdata?.confirm_password || "",
        change: (e) =>
          dispatch(
            update_teacher_register({ confirm_password: e.target.value })
          ),
        eyeFunction: () =>
          dispatch(
            update_input_eye({
              showConfirmPassword: !authState?.app_data?.showConfirmPassword,
            })
          ),
        eyeIcon: authState?.app_data?.showConfirmPassword
          ? Icons?.EyeClose
          : Icons?.EyeOpen,
        divClassName: "mb-3",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.teacherRegister?.confirmPassword
            ? "confirmPassword required"
            : null,
      },
    ],
    studentRegister: [
      {
        name: "First Name",
        type: "text",
        category: "input",
        placeholder: "Enter Your First Name",
        value: authState?.studentRegisterdata?.first_name || "",
        change: (e) =>
          dispatch(update_student_register({ first_name: e.target.value })),
        keyDown: (e) => {
            if (e.key === 'Enter') dispatch(handleRegister(authState?.studentRegisterdata, navigate, "/register/student"))
        },
        divClassName: "mb-3",
        className: "login-input",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.studentRegister?.firstName
            ? "firstName required"
            : null,
      },
      {
        name: "Last Name",
        type: "text",
        category: "input",
        placeholder: "Enter Your Last Name",
        className: "pe-5 login-input",
        value: authState?.studentRegisterdata?.last_name || "",
        change: (e) =>
          dispatch(update_student_register({ last_name: e.target.value })),
        divClassName: "mb-3",
        isMandatory: false,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.studentRegister?.firstName
            ? "lastName required"
            : null,
      },
      {
        name: "Institute Name",
        type: "text",
        category: "input",
        placeholder: "Enter Your Institute Name",
        value: authState?.studentRegisterdata?.institute_name || "",
        change: (e) =>
        dispatch(update_student_register({ institute_name: e.target.value })),
        divClassName: "mb-3",
        className: "login-input",
        disabled: true,
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.studentRegister?.instituteName
            ? "Institute Name required"
            : null,
      },
      {
        name: "Email",
        type: "text",
        category: "input",
        placeholder: "mail@abc",
        value: authState?.studentRegisterdata?.email_id || "",
        change: (e) =>
        dispatch(update_student_register({ email_id: e.target.value })),
        divClassName: "mb-3",
        className: "pe-5 login-input",
        disabled: true,

        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.studentRegister?.email
            ? "email required"
            : null,
      },
      {
        name: "Phone Number",
        type: "number",
        category: "input",
        placeholder: "999-999-9999",
        value: authState?.studentRegisterdata?.phone_number || "",
        change: (e) =>
        dispatch(update_student_register({ phone_number: e.target.value })),
        divClassName: "mb-3",
        className: "pe-5 login-input",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.studentRegister?.phoneNumber
            ? "Phone Number required"
            : null,
      },
      {
        name: "Password",
        type: authState?.app_data?.shownewPassword ? "text" : "password",
        category: "input",
        placeholder: "********",
        className: "pe-5 login-input",
        value: authState?.studentRegisterdata?.new_password || "",
        change: (e) =>
        dispatch(update_student_register({ new_password: e.target.value })),
        eyeFunction: () =>
          dispatch(
            update_input_eye({
              shownewPassword: !authState?.app_data?.shownewPassword,
            })
          ),
        eyeIcon: authState?.app_data?.shownewPassword
          ? Icons?.EyeClose
          : Icons?.EyeOpen,
        divClassName: "mb-3",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.studentRegister?.password
            ? "password required"
            : null,
      },
      {
        name: "Confirm Password",
        type: authState?.app_data?.showConfirmPassword ? "text" : "password",
        category: "input",
        placeholder: "********",
        className: "pe-5 login-input",
        value: authState?.studentRegisterdata?.confirm_password || "",
        change: (e) =>
          dispatch(
            update_student_register({ confirm_password: e.target.value })
          ),
        eyeFunction: () =>
          dispatch(
            update_input_eye({
              showConfirmPassword: !authState?.app_data?.showConfirmPassword,
            })
          ),
        eyeIcon: authState?.app_data?.showConfirmPassword
          ? Icons?.EyeClose
          : Icons?.EyeOpen,
        divClassName: "mb-3",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.studentRegister?.confirmPassword
            ? "confirmPassword required"
            : null,
      },
    ],
    forgot: [
      {
        name: "Email",
        type: "text",
        category: "input",
        placeholder: "mail@abc",
        value: authState?.forgotPassworddata?.email_id || "",
        change: (e) =>
          dispatch(update_forgot_password({ email_id: e.target.value })),
        keyDown: (e) => {
            if (e.key === 'Enter') dispatch(handleForgetPass(authState?.forgotPassworddata, navigate, "/forget_password"))
        },
        divClassName: "mb-1",
        className: "login-input",
        isMandatory: false,
        Err:
          commonState?.app_data?.validated && !commonState?.login_data?.username
            ? "email required"
            : null,
      },
    ],
    createPassword: [
      {
        name: "New Password",
        type: authState?.app_data?.shownewPassword ? "text" : "password",
        category: "input",
        placeholder: "********",
        className: "pe-5 login-input",
        value: authState?.createPassworddata?.new_password || "",
        change: (e) => dispatch(update_create_password({ new_password: e.target.value })),
        // keyDown: (e) => {
        //     if (e.key === 'Enter') dispatch(handleCreatePassword(authState?.createPassworddata, routeState, navigate, "/reset_password"))
        // },
        eyeFunction: () =>
          dispatch(
            update_input_eye({
              shownewPassword: !authState?.app_data?.shownewPassword,
            })
          ),
        eyeIcon: authState?.app_data?.shownewPassword
          ? Icons?.EyeClose
          : Icons?.EyeOpen,
        divClassName: "mb-3",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.learnersRegister?.password
            ? "password required"
            : null,
      },
      {
        name: "Confirm Password",
        type: authState?.app_data?.showConfirmPassword ? "text" : "password",
        category: "input",
        placeholder: "********",
        className: "pe-5 login-input",
        value: authState?.createPassworddata?.confirm_password || "",
        change: (e) => dispatch(update_create_password({ confirm_password: e.target.value })),
        eyeFunction: () =>
          dispatch(
            update_input_eye({
              showConfirmPassword: !authState?.app_data?.showConfirmPassword,
            })
          ),
        eyeIcon: authState?.app_data?.showConfirmPassword
          ? Icons?.EyeClose
          : Icons?.EyeOpen,
        divClassName: "mb-3",
        isMandatory: true,
        Err:
          commonState?.app_data?.validated &&
            !commonState?.learnersRegister?.confirmPassword
            ? "confirmPassword required"
            : null,
      },
    ],
    otpVerfication: [
      {
        name: "",
        type: "text",
        category: "input",
        value: authState?.otpVerificationdata?.otp1 || '',     
        change: (e) => {
          let v = e.target.value.replace(/\D/g, "");

          if (v.length > 1) v = v[0];

          dispatch(update_otp_verification({ otp1: v }));

          if (v && otpRefs.current[1]) {
            otpRefs.current[1].focus();
          }
        },
        ref: (el) => (otpRefs.current[0] = el),
        keyDown: (e) => {
          if (e.key === "Backspace") {
            const val = authState?.otpVerificationdata?.otp1;
            if (val) {
              dispatch(update_otp_verification({ otp1: "" }));
            } else if (otpRefs.current[0]) {
              otpRefs.current[0].focus();
            }
          }
        },
        divClassName: "mb-1",
        className: "otp-input",
        isMandatory: false,
        placeholder: "-",
      },
      {
        name: "",
        type: "text",
        category: "input",
        value: authState?.otpVerificationdata?.otp2 || '',
        change: (e) => {
          let v = e.target.value;

          v = v.replace(/\D/g, "");

          if (v.length > 1) v = v[0];

          dispatch(update_otp_verification({ otp2: v }));
          if (v && otpRefs.current[2]) {
            otpRefs.current[2].focus();
          }
        },
        ref: (el) => (otpRefs.current[1] = el),
        keyDown: (e) => {
          if (e.key === "Backspace") {
            const val = authState?.otpVerificationdata?.otp2;
            if (val) {
              dispatch(update_otp_verification({ otp2: "" }));
            } else {
              otpRefs.current[0]?.focus();
            }
          }
        },
        divClassName: "mb-1",
        className: "otp-input",
        isMandatory: false,
        placeholder: "-",
      },
      {
        name: "",
        type: "text",
        category: "input",
        value: authState?.otpVerificationdata?.otp3 || '',
        change: (e) => {
          let v = e.target.value;

          v = v.replace(/\D/g, "");

          if (v.length > 1) v = v[0];

          dispatch(update_otp_verification({ otp3: v }));
          if (v && otpRefs.current[3]) {
            otpRefs.current[3].focus();
          }
        },
        ref: (el) => (otpRefs.current[2] = el),

        keyDown: (e) => {
          if (e.key === "Backspace") {
            const val = authState?.otpVerificationdata?.otp3;
            if (val) {
              dispatch(update_otp_verification({ otp3: "" }));
            } else {
              otpRefs.current[1]?.focus();
            }
          }
        },
        divClassName: "mb-1",
        className: "otp-input",
        isMandatory: false,
        placeholder: "-",
      },
      {
        name: "",
        type: "text",
        category: "input",
        value: authState?.otpVerificationdata?.otp4 || '',
        change: (e) => {
          let v = e.target.value;

          v = v.replace(/\D/g, "");

          if (v.length > 1) v = v[0];

          dispatch(update_otp_verification({ otp4: v }));
          if (v && otpRefs.current[4]) {
            otpRefs.current[4].focus();
          }
        },
        ref: (el) => (otpRefs.current[3] = el),

        keyDown: (e) => {
          if (e.key === "Backspace") {
            const val = authState?.otpVerificationdata?.otp4;
            if (val) {
              dispatch(update_otp_verification({ otp4: "" }));
            } else {
              otpRefs.current[2]?.focus();
            }
          }
        },
        divClassName: "mb-1",
        className: "otp-input",
        isMandatory: false,
        placeholder: "-",
      },
    ],
  };

  return {
    jsonOnly: jsonOnly,
    jsxJson: jsxJson,
  };
};

export default JsonData;
