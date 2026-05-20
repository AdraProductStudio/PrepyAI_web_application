import Image from "Utils/Image";
import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";
import LoginScreen from "Components/Form/LoginScreen";
import JsonData from "Views/Auth/Auth_utils/JsonData";
import { handleRegister } from "Views/Auth/Actions/authActions";
import ButtonSpinner from "Components/Spinner/ButtonSpinner";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";

const LearnersRegister = () => {
  const { commonState, authState } = useCommonState();

  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const { jsxJson } = JsonData();

  const form = <div className="pb-3">{Inputfunctions(jsxJson?.learnersRegister)}</div>
  const button = (
    <ButtonSpinner
      type="button"
      className="btn-md btn-brand-color py-3 w-100"
      clickFunction={() => dispatch(handleRegister(authState?.learnersregisterdata, navigate, "/register/learner"))}
      title={authState?.buttonSpinner ? "Processing..." : "Register"}
      is_spinner={commonState?.app_data?.buttonSpinner}
    />
  );

  const bottomalert = "Already Have an Account?";
  const navigatepath = "/";
  const linkTitle = "Login";
  const title = "Register to your Account";

  return (
    <LoginScreen
      img={Image?.learnersImage}
      children={form}
      button={button}
      title={title}
      bottomalert={bottomalert}
      navigatepath={navigatepath}
      linkTitle={linkTitle}
      as="Sign Up"
    />
  );
};

export default LearnersRegister;
