import React from "react";
import Images from "Utils/Image"
import JsonData from "../Auth_utils/JsonData";
import LoginScreen from "Components/Form/LoginScreen";
import ButtonSpinner from "Components/Spinner/ButtonSpinner";
import { handleForgetPass } from "Views/Auth/Actions/authActions";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";


const ForgotPassword = () => {
  const { jsxJson } = JsonData();
  const { authState } = useCommonState();
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();

  const Children = Inputfunctions(jsxJson?.forgot);
  const Button = (
    <ButtonSpinner
      type="button"
      className="btn-brand-color py-3 w-100"
      clickFunction={() => dispatch(handleForgetPass(authState?.forgotPassworddata, navigate, "/forget_password"))}
      title={authState?.app_data?.buttonSpinner ? "sending..." : "send Otp"}
      is_spinner={authState?.app_data?.buttonSpinner}
    />
  );
  
  const subTitle = "Don’t worry, happens to all of us. Enter your email below to recover your password"
  const title = "Forgot your password"

  return (
    <LoginScreen
      title={title}
      button={Button}
      children={Children}
      Formfor={"forgotForm"}
      subTitle={subTitle}
      img={Images?.ForgotPassword}
      navigateBack={"/"}
    />
  );
};

export default ForgotPassword;
