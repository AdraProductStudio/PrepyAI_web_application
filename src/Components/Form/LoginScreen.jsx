import React, { useEffect } from "react";
import Icons from "Utils/Icons";
import Image from "Components/Img/Img";
import { useLocation } from "react-router-dom";
import LoginCenterCircle from "Assets/Image/Vector.svg";
import { Button, Col, Container, Row } from "react-bootstrap";
import { authVerification, handleOAuth } from "Views/Auth/Actions/authActions";
import { useCustomNavigate, useDispatch } from "Components/CustomHooks";
import LinkComponent from "Components/Router_components/LinkComponent";
import Images from "Utils/Image"

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const LoginScreen = ({
  img, title, children, button,
  bottomalert, navigatepath, linkTitle,
  Formfor, subTitle, navigateBack, as = "",
}) => {
  const getQuery = useQuery();
  const location = useLocation();
  const auth = getQuery.get("auth");
  const dispatch = useDispatch();
  const currenPath = location.pathname.split("/")[1];
  const navigate = useCustomNavigate();

  useEffect(() => {
    if (auth) {
      dispatch(authVerification(currenPath, navigate, `${process.env.REACT_APP_API_URL}/validate_invite?auth=${auth}`));
    }
  }, [currenPath, auth, dispatch, navigate]);

  // const containerWidth =
  //   title === "Register as a Admin" || title === "Register as a Organization"
  //     ? "700px"
  //     : "500px";

  const contentScroll =
    title === "Register as a Teacher" ||
      title === "Register as a Student" ||
      title === "Register as a Organization" ||
      title === "Register as a Admin" ||
      title === "Register to your Account"
      ? ""
      : "d-flex align-items-center";

  // const googleButtonWidth =
  //   title === "Register as a Admin" || title === "Register as a Organization"
  //     ? "w-120"
  //     : "w-110";

  const otpVerification = title === "OTP Verification" && "align-items-center";

  return (
    <Container fluid className="p-0">
      <Row className="justify-content-center backgroundcolor m-0" style={{ height: "100vh", overflow: "hidden" }} >
        {/* Left Side Image */}
        <Col md={7} className="backgroundcolor d-none d-md-flex justify-content-center align-items-center p-0" style={{ height: "100vh", overflow: "hidden" }} >
          <Image src={img} alt="login image" className="w-90 h-100" style={{ objectFit: "cover" }} fluid />

          <div className="login-center-circle d-none d-md-block">
            <svg xmlns="http://www.w3.org/2000/svg" width="167" height="100" viewBox="0 0 167 100" fill="none">
              <path opacity="0.4" d="M83.4999 167C129.616 167 167 129.616 167 83.5C167 37.3842 129.616 0 83.4999 0C37.3842 0 0 37.3842 0 83.5C0 129.616 37.3842 167 83.4999 167Z" fill="url(#paint0_linear_1_15158)" />
              <defs>
                <linearGradient id="paint0_linear_1_15158" x1="160.074" y1="116.862" x2="6.88778" y2="50.177" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#860752" />
                  <stop offset="1" stopColor="#FFD9A8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </Col>

        {/* Right Side Form */}
        <Col sm={12} md={5} className="bg-white position-relative p-0" style={{ height: "100vh" }} >
          <div style={{ height: "100vh", overflowY: "auto", padding: "2rem 1rem" }} className={`${contentScroll}`}>
            {Formfor !== "forgotForm" ? (
              <Row className="flex-column gap-md-3 gap-lg-5 w-100 pb-3">
                {/* Top Section */}
                <Col className="d-flex justify-content-center pb-4">
                  <div className="d-flex flex-column align-items-center gap-4 w-100 px-3" style={{ maxWidth: "500px" }}>
                    <Image src={Images?.logo} alt="PrepyAi" fluid className="mb-3 prepy-logo" />
                    <h3 className="text-center fw-bold login-title-colour">
                      {title}
                    </h3>
                    <Button variant="light" className={`d-flex align-items-center justify-content-center border rounded px-3 py-2 google-button-background gap-2 w-110`}
                      onClick={() => dispatch(handleOAuth(navigate, "/oauth_learners"))} >
                      {Icons?.googleIcon}
                      <strong className="text-secondary">
                        Continue with Google
                      </strong>
                    </Button>
                    <p className="mb-0 small fw-5 text-muted">
                      ------- or {as} --------
                    </p>
                  </div>
                </Col>

                {/* Middle Section */}
                <Col className="d-flex justify-content-center px-4 mb-3">
                  <div className="w-100 row d-flex align-items-center justify-content-center gap-4" style={{ maxWidth: "500px" }}>
                    {children}
                    {button}
                  </div>
                </Col>

                {/* Bottom Section */}
                <Col className="d-flex justify-content-center">
                  <p className="text-muted mb-0">
                    {bottomalert}{" "}
                    <LinkComponent to={navigatepath} className="gradient-text fs-6 fw-semibold">
                      {linkTitle}
                    </LinkComponent>
                  </p>
                </Col>
              </Row>
            ) : (
              <Row className="flex-column gap-md-3 gap-lg-5 align-items-center w-100 pb-3">
                <div className="text-center mt-4 mb-md-4">
                  <Image src={Images?.logo} alt="PrepyAi" fluid className="mb-3 prepy-logo" />
                </div>
                <Col sm={6} md={6}>
                  <Row className="d-flex flex-column gap-3 mb-5 pb-5">
                    {as !== "success" && (
                      <Col>
                        <p className="text-secondary cursor-pointer" onClick={() => navigate(navigateBack)}  >
                          {Icons?.back_icon}back
                        </p>
                      </Col>
                    )}
                    <Col>
                      <h4 className="fw-5">{title}</h4>
                      <p className="text-secondary">{subTitle}</p>
                    </Col>
                    <Col className={`d-flex flex-column justify-content-center gap-3 ${otpVerification}`}  >
                      {children}
                      {button}
                    </Col>
                    <Col className="d-flex justify-content-center">
                      <p className="text-muted small mb-0">
                        {bottomalert}{" "}
                        <LinkComponent to={navigatepath} className="gradient-text fw-medium">
                          {linkTitle}
                        </LinkComponent>
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
