import Image from "Utils/Image";
import JsonData from "Views/Auth/Auth_utils/JsonData";
import LoginScreen from "Components/Form/LoginScreen";
import ButtonSpinner from "Components/Spinner/ButtonSpinner";
import { handleRegister } from "Views/Auth/Actions/authActions";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";

const TeacherRegister = () => {
  const { authState } = useCommonState()
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const { jsxJson } = JsonData();

  const form =
    Inputfunctions(jsxJson?.teacherRegister)

  const button = (
    <ButtonSpinner
      type="button"
      className="btn-brand-color py-3 w-100"
      clickFunction={() => dispatch(handleRegister(authState?.teacherRegisterdata, navigate, "/register/teacher"))}
      title={authState?.app_data?.buttonSpinner ? "Processing..." : "Register"}
      is_spinner={authState?.app_data?.buttonSpinner}
    />
  );

  const bottomalert = "Already Have an Account?";

  const navigatepath = "/";

  const linkTitle = "Login";
  const title = "Register as a Teacher";
  return (
    <LoginScreen
      img={Image?.OrganizationImage}
      children={form}
      button={button}
      title={title}
      bottomalert={bottomalert}
      navigatepath={navigatepath}
      linkTitle={linkTitle}
      as="Sign up"
    />
  );
};

export default TeacherRegister;
