import React from "react";
import Images from "Utils/Image";
import { useLocation } from "react-router-dom";
import LoginScreen from "Components/Form/LoginScreen";
import JsonData from "Views/Auth/Auth_utils/JsonData";
import ButtonSpinner from "Components/Spinner/ButtonSpinner";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import { handleCreatePassword } from "Views/Auth/Actions/authActions";
import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";

const CreatePassword = () => {
  const location = useLocation();
  const routeState = location.state;
  const { authState } = useCommonState();
  const { jsxJson } = JsonData();
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();

  const Children = Inputfunctions(jsxJson?.createPassword);
  const Button = (
    <ButtonSpinner
      type="button"
      className="forgot-button fw-semibold" 
      clickFunction={() => dispatch(handleCreatePassword(authState?.createPassworddata, routeState, navigate, "/reset_password"))}
      title={"Reset Password"}
      is_spinner={authState?.app_data?.buttonSpinner}
    />
  );

  const subTitle =
    "Your new password must be unique from those previously used.";
  const title = "Create new password";

  return (
    <LoginScreen
      title={title}
      button={Button}
      children={Children}
      Formfor={"forgotForm"}
      subTitle={subTitle}
      img={Images?.ForgotPassword}
      navigateBack={"/forgot_password"}
    />
  );
};

export default CreatePassword;
