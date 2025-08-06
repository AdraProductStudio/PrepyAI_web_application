import Image from "Utils/Image";
import { handleLogin } from "Views/Auth/Actions/authActions";
import LoginScreen from "Components/Form/LoginScreen";
import JsonData from "Views/Auth/Auth_utils/JsonData";
import ButtonSpinner from "Components/Spinner/ButtonSpinner";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import LinkComponent from "Components/Router_components/LinkComponent";
import { useCommonState, useDispatch } from "Components/CustomHooks";

const LoginForm = () => {
  const { authState } = useCommonState();
  const dispatch = useDispatch();
  const { jsxJson } = JsonData();

  const form = (
    <div className="pb-3">
      {Inputfunctions(jsxJson?.login)}

      <div className="">
        <div className="mt-3 d-flex">
          <div className="remember-me col-5 d-flex gap-2 align-items-center">
            <input type="checkbox" id="rememberMe" className="accent-pink" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <LinkComponent
            to="/forgot_password"
            className="w-100 text-end d-inline-block mb-2 fw-normal gradient-text"
            title="Forgot Password?"
          />
        </div>
      </div>
    </div>
  ); 

  const button = (
    <ButtonSpinner
      type="button"
      className="btn-brand-color py-3 w-100"
      clickFunction={() => dispatch(handleLogin(authState?.logindata))}
      title={authState?.loginisLoading ? "Logging in..." : "Login"}
      is_spinner={authState?.loginisLoading}
    />
  );

  const title = "Login to your Account";

  return (
    <LoginScreen
      img={Image?.loginImage}
      children={form}
      title={title}
      button={button}
      as="Sign in"
      bottomalert={"Not Registered Yet?"}
      navigatepath={"/learners_registration"}
      linkTitle="Create an account"
    />
  );
};

export default LoginForm;
