import ButtonComponent from "Components/Button/Button";
import React from "react";
import { Col, Row } from "react-bootstrap";
import JsonData from "../Utils/JsonData";
import { useDispatch } from "react-redux";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import { useCommonState } from "Components/CustomHooks";
import { changePassword } from "../Actions/Admin_action";

const AdminSettings = () => {
  const {jsxJson } = JsonData();
  const dispatch = useDispatch();
  const {settingsInputs} = useCommonState()?.adminState


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
                  clickFunction={()=>dispatch(changePassword(settingsInputs))}
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
