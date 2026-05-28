import Image from "Utils/Image";
import JsonData from "Views/Auth/Auth_utils/JsonData";
import LoginScreen from "Components/Form/LoginScreen";
import { handleRegister } from "Views/Auth/Actions/authActions";
import ButtonSpinner from "Components/Spinner/ButtonSpinner";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";

const AdminRegister = () => {
  const { authState } = useCommonState();
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const { jsxJson } = JsonData();

  const button = (
    <ButtonSpinner
      type="button"
      className="btn-brand-color py-3 fw-semibold"
      clickFunction={() => dispatch(handleRegister(authState?.adminRegisterdata, navigate, "/register/admin"))}
      title={authState?.app_data?.buttonSpinner ? "Processing..." : "Register"}
      is_spinner={authState?.app_data?.buttonSpinner}
    />
  );

  const form = Inputfunctions(jsxJson?.adminRegister);

  const title = "Register as a Admin";

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

export default AdminRegister;
