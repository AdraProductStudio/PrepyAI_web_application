import React from "react";
import Images from "Utils/Image";
import LoginScreen from "Components/Form/LoginScreen";
import JsonData from "Views/Auth/Auth_utils/JsonData";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import ButtonSpinner from "Components/Spinner/ButtonSpinner";
import { handleForgetPass, handleOtpVerification } from "Views/Auth/Actions/authActions";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import { useLocation, useNavigate } from "react-router-dom";

const Verification = () => {
  const { jsxJson } = JsonData();
  const dispatch = useDispatch();
  const { authState } = useCommonState();
  const navigate = useNavigate();
  const location = useLocation();

  const routeState = location.state;

  const Children = (
    <div className="d-flex justify-content-center">
      {Inputfunctions(jsxJson?.otpVerfication)}
    </div>
  );

  const Button = (
    <ButtonSpinner
      type="button"
      className="btn-brand-color py-3 w-100"
      clickFunction={() => dispatch(handleOtpVerification(authState?.otpVerificationdata, routeState, navigate, `${process.env.REACT_APP_API_URL}/verify_otp`))}
      title={"Verify code"}
      is_spinner={authState?.app_data?.ButtonSpinner}
    />
  );

  const subTitle = "Enter the verification code we just sent on your email address.";
  const title = "OTP Verification";
  const bottomalert = "Haven’t got the email yet?";
  const navigatepath = () => dispatch(handleForgetPass(routeState, navigate, "/forget_password"));
  const linkTitle = "Resend email";

  return (
    <LoginScreen
      title={title}
      button={Button}
      children={Children}
      Formfor={"forgotForm"}
      subTitle={subTitle}
      img={Images?.ForgotPassword}
      bottomalert={bottomalert}
      navigatepath={navigatepath}
      linkTitle={linkTitle}
      navigateBack={"/forgot_password"}
    />
  );
};

export default Verification;
