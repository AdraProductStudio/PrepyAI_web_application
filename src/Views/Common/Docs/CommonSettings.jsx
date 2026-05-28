import ButtonComponent from "Components/Button/Button";
import { CustomUseLocationHook, useCommonState } from "Components/CustomHooks";
import SpinnerComponent from "Components/Spinner/Spinner";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";

const CommonSettings = ({
  formDetailsJson,
  stateSelector,
  submitAction,
  title = "Settings",
  buttonLabel = "Save",
  btnDisableState,
  setErrors
}) => {
  const dispatch = useDispatch();
  const state = stateSelector ? stateSelector() : {};
  const location = CustomUseLocationHook();
  const { studentState, teachersState } = useCommonState()

  const teacherValidation = () => {
    const newErrors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!teachersState?.settingsInputs?.old_password?.trim()) newErrors.old_password = "Current password is required"
    if (!teachersState?.settingsInputs?.new_password?.trim())newErrors.new_password = "New password is required" 
    else if (!passwordRegex.test(teachersState?.settingsInputs.new_password)) {
      newErrors.new_password = "Password must be at least 8 characters, include uppercase, lowercase, number & special character"
    }
    if (!teachersState?.settingsInputs?.confirm_password?.trim()) newErrors.confirm_password = "Confirm password is required"
    else if (teachersState?.settingsInputs.new_password !== teachersState?.settingsInputs.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      if(setErrors){
        dispatch(setErrors(newErrors));
      }
      return;
    }

    if (submitAction && state) {
      dispatch(submitAction(state));
    }
  }

  const studentValidation = () => {
    const newErrors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!studentState?.settingsInputs?.old_password?.trim()) newErrors.old_password = "Current password is required"
    if (!studentState?.settingsInputs?.new_password?.trim())newErrors.new_password = "New password is required" 
    else if (!passwordRegex.test(studentState?.settingsInputs.new_password)) {
      newErrors.new_password = "Password must be at least 8 characters, include uppercase, lowercase, number & special character"
    }
    if (!studentState?.settingsInputs?.confirm_password?.trim()) newErrors.confirm_password = "Confirm password is required"
    else if (studentState?.settingsInputs.new_password !== studentState?.settingsInputs.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      if(setErrors){
        dispatch(setErrors(newErrors));
      }
      return;
    }

    if (submitAction && state) {
      dispatch(submitAction(state));
    }
  }



  const handleValidation = (e) => {
    e.preventDefault();

    if (location.includes("teachers_dashboard")) {
      teacherValidation();
    } else if (location.includes("student_dashboard")) {
      studentValidation();
    }
  };
  return (
    <div className="container h-100 pt-xl-4 pe-xxl-5">
      <Row className="justify-content-center justify-content-xl-start ms-xl-5">
        <Col xs={12} xl={7}>
          <h5 className="text-primary-emphasis fw-bold border-bottom pb-3">
            {title.toUpperCase()}
          </h5>
          <section className="overflow-auto mt-4">
            <form className="row">
              {Inputfunctions(formDetailsJson)}
              <div className="d-flex justify-content-center py-md-2">
                <ButtonComponent
                  type={"button"}
                  className={
                    "btn-primary border-0 col-12 py-2 fs-5 fs-md-3 mt-4 mt-md-2 mt-lg-2 brand_color"
                  }
                  btnDisable={btnDisableState}
                  clickFunction={handleValidation}
                  children={
                    btnDisableState ? (
                      <span className="d-flex align-items-center justify-content-center gap-2">
                        <SpinnerComponent /> Processing...
                      </span>
                    ) : (
                      buttonLabel
                    )
                  }
                />
              </div>
            </form>
          </section>
        </Col>
      </Row>
    </div>
  );
};

export default CommonSettings;
