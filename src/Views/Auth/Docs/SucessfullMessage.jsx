import LoginScreen from "Components/Form/LoginScreen";
import React from "react";
import ButtonSpinner from "Components/Spinner/ButtonSpinner";
import Images from "Utils/Image";
import Image from "Components/Img/Img";
import { useNavigate } from "react-router-dom";


const SucessfullMessage = () => {
  const navigate = useNavigate();

  const Children = (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Image
        src={Images?.SuccessImage}
        alt="success"
        fluid
        className="mb-3 mb-lg-3 prepy-logo pb-5"
      />
      <h3>Password Changed!</h3>
      <p>Your password has been changed successfully.</p>
    </div>
  );
  
  const Button = (
    <ButtonSpinner
      type="button"
      className="forgot-button fw-semibold otp-button-size"
      clickFunction={()=>navigate("/")
      }
      title={"Back to Login"}
    />
  );

  return (
    <LoginScreen
      button={Button}
      children={Children}
      Formfor={"forgotForm"}
      img={Images?.ForgotPassword}
      as="success"
    />
  );
};

export default SucessfullMessage;
