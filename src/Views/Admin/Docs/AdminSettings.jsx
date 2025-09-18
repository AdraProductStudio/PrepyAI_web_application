import ButtonComponent from "Components/Button/Button";
import React from "react";
import { Col, Row } from "react-bootstrap";
import JsonData from "../Utils/JsonData";
import { useDispatch } from "react-redux";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import { useCommonState } from "Components/CustomHooks";
import { changePassword } from "../Actions/Admin_action";
import { setErrors } from "../Slices/adminSlice";

const AdminSettings = () => {
  const { jsxJson } = JsonData();
  const dispatch = useDispatch();
  const { settingsInputs } = useCommonState()?.adminState;

  const handleSettings = (e) => {
    e.preventDefault();
    const newErrors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!settingsInputs?.old_password?.trim()) {
      newErrors.old_password = "Current password is required";
    }
    if (!settingsInputs?.new_password?.trim()) {
      newErrors.new_password = "New password is required";
    } else if (!passwordRegex.test(settingsInputs.new_password)) {
      newErrors.new_password =
        "Password must be at least 8 characters, include uppercase, lowercase, number & special character";
    }
    if (!settingsInputs?.confirm_password?.trim()) {
      newErrors.confirm_password = "Confirm password is required";
    } else if (
      settingsInputs.new_password !== settingsInputs.confirm_password
    ) {
      newErrors.confirm_password = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      dispatch(setErrors(newErrors));
      return;
    }

    dispatch(changePassword(settingsInputs));
  };

  return (
    <div className="container h-100 pt-xl-4 pe-xxl-5">
      <Row className="justify-content-center justify-content-xl-start ms-xl-5">
        <Col xs={12} xl={7}>
          <h5 className="text-primary-emphasis fw-bold border-bottom pb-3">
            CHANGE PASSWORD
          </h5>
          <section className="overflow-auto mt-4">
            <form className="row">
              {Inputfunctions(jsxJson?.settings_details)}
              <div className="d-flex justify-content-center py-md-2">
                <ButtonComponent
                  type={"button"}
                  className={
                    "btn-primary border-0 col-12 py-2 fs-5 fs-md-3 mt-4 mt-md-2 mt-lg-2 brand_color"
                  }
                  buttonName={"Save"}
                  clickFunction={handleSettings}
                />
              </div>
            </form>
          </section>
        </Col>
      </Row>
    </div>
  );
};

export default AdminSettings;
