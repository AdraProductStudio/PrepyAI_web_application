import React from "react";
import { Col, Row } from "react-bootstrap";
import JsonData from "../Utils/JsonData";
import { useDispatch } from "react-redux";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import { changePassword } from "../Actions/superAdminAction";
import { useCommonState, useCustomNavigate } from "Components/CustomHooks";
import ButtonSpinner from "Components/Spinner/ButtonSpinner";

const Settings = () => {
  const { superadminState } = useCommonState();
  const navigate = useCustomNavigate();
  const dispatch = useDispatch();
  const { jsxJson } = JsonData();

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
                <ButtonSpinner
                  className="brand_color w-100 text-white"
                  title={superadminState?.change_password_is_saving ? "Saving..." : "Save"}
                  is_spinner={superadminState?.change_password_is_saving}
                  clickFunction={
                    superadminState?.change_password_is_saving
                      ? null
                      :
                      () => dispatch(changePassword(superadminState?.settingsInputs, navigate))
                  } />
              </div>
            </form>
          </section>
        </Col>
      </Row>
    </div>
  );
};

export default Settings;
