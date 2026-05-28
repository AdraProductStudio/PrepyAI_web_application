import Image from "Utils/Image";
import JsonData from "Views/Auth/Auth_utils/JsonData";
import LoginScreen from "Components/Form/LoginScreen";
import ButtonSpinner from "Components/Spinner/ButtonSpinner";
import { handleRegister } from "Views/Auth/Actions/authActions";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";

const OrganizationRegister = () => {
  const { authState } = useCommonState();
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const { jsxJson } = JsonData();

  const button = (
    <ButtonSpinner
      type="button"
      className="btn-brand-color py-3"
      clickFunction={() => dispatch(handleRegister(authState?.organizationRegisterdata, navigate, "/register/organization"))}
      title={authState?.app_data?.buttonSpinner ? "Processsing..." : "Register"}
      is_spinner={authState?.app_data?.buttonSpinner}
    />
  );

  const form = Inputfunctions(jsxJson?.organizationRegister);

  const title = "Register as a Organization";

  const bottomalert = "Already Have an Account?";

  const navigatepath = "/";

  const linkTitle = "Login";
  return (
    <LoginScreen
      img={Image?.OrganizationImage}
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

export default OrganizationRegister;
