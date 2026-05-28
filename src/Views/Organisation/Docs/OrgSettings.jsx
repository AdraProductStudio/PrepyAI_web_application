import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import JsonData from "../Utils/JsonData";
import { useDispatch } from "react-redux";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import ButtonSpinner from "Components/Spinner/ButtonSpinner";
import { useCommonState, useCustomNavigate } from "Components/CustomHooks";
import { changeOrgPassword } from "../Actions/organisationAction";
import { update_app_data } from "Views/Common/Slices/Common_slice";
import { clearSettingsInputs } from "../Slices/Organisation_slice";


const OrgSettings = () => {
  const {jsxOnly } = JsonData();
  const dispatch = useDispatch();
  const navigate = useCustomNavigate()
  const {settingsInputs } = useCommonState()?.organisationState

  useEffect(()=>{
    dispatch(clearSettingsInputs())
  },[])

  return (
    <div className="container h-100 pt-xl-4 pe-xxl-5">
      <Row className="justify-content-center justify-content-xl-start ms-xl-5">
        <Col xs={12} xl={7}>
          <h5 className="text-primary-emphasis fw-bold border-bottom pb-3">
            CHANGE PASSWORD
          </h5>
          <section className="overflow-auto mt-4">
            <form className="row">
              {Inputfunctions(jsxOnly.settings_details)}
              <div className="d-flex justify-content-center py-md-2">
                <ButtonSpinner
                  className="brand_color w-100 text-white border-0"
                  title="Save"
                  is_spinner={settingsInputs?.is_editing}
                  clickFunction={settingsInputs?.is_editing? null :
                    () => {dispatch(changeOrgPassword(settingsInputs,navigate))
                            dispatch(update_app_data({type:"validation",data:true}))
                    }}

                />
              </div>
            </form>
          </section>
        </Col>
      </Row>
    </div>
  );
};

export default OrgSettings;
