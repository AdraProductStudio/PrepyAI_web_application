import ButtonComponent from "Components/Button/Button";
import Input from "Components/Input/Input";
import React from "react";
import { Col, Row } from "react-bootstrap";
import JsonData from "../Utils/JsonData";
import { useDispatch, useSelector } from "react-redux";
import { updateSettingsInputs } from "../Slices/SuperAdmin_slice";

const Settings = () => {
  const { jsonOnly } = JsonData();

  const dispatch = useDispatch();
  const settingInputs = useSelector((state) => state.superAdminState.settingInputs)

  const onInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateSettingsInputs({field: name, value}))
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
              {jsonOnly?.settingsInputs.map((input, idx) => (
                <div key={idx} className="mb-3 col-12 py-md-2">
                  <Input
                    key={idx}
                    label={input.label}
                    labelClassName={"form-label text-primary-emphasis"}
                    mandatory={true}
                    type={"password"}
                    htmlFor={input.id}
                    name={input.id}
                    placeholder={input.placeholder}
                    value={settingInputs?.[input.id]}
                    change={onInputChange}
                    // eyeFunction={Icons.}
                    // eyeIcon={Icons.NoteDeleteIcon}
                    // eyeFunction={true}
                  />
                </div>
              ))}
              <div className="d-flex justify-content-center py-md-2">
                <ButtonComponent
                  type={"button"}
                  className={
                    "btn-primary border-0 col-12 py-2 fs-5 fs-md-3 mt-4 mt-md-2 mt-lg-2 brand_color"
                  }
                  buttonName={"Save"}
                />
              </div>
            </form>
          </section>
        </Col>
      </Row>
    </div>
  );
};

export default Settings;
