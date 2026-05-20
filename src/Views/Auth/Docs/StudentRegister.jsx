import Image from "Utils/Image";
import JsonData from "Views/Auth/Auth_utils/JsonData";
import LoginScreen from "Components/Form/LoginScreen";
import ButtonSpinner from "Components/Spinner/ButtonSpinner";
import { handleRegister } from "Views/Auth/Actions/authActions";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";

const StudentRegister = () => {
  const { authState } = useCommonState();
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const { jsxJson } = JsonData();

  const form = (
    <div className="pb-3">{Inputfunctions(jsxJson?.studentRegister)}</div>
  );

  const button = (
    <ButtonSpinner
      type="button"
      className="btn-md btn-brand-color py-3 w-100"
      clickFunction={() => dispatch(handleRegister(authState?.studentRegisterdata, navigate, "/register/student"))}
      title={authState?.app_data?.buttonSpinner ? "Processing..." : "Register"}
      is_spinner={authState?.app_data?.buttonSpinner}
    />
  );

  const bottomalert = "Already Have an Account?";

  const navigatepath = "/";

  const linkTitle = "Login";

  const title = "Register as a Student";

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

export default StudentRegister;
