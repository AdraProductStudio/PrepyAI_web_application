import ButtonComponent from "Components/Button/Button";
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
  btnDisableState
}) => {
  const dispatch = useDispatch();
  const state = stateSelector ? stateSelector() : {}
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
                  clickFunction={() => {
                    if (submitAction && state) {
                      dispatch(submitAction(state));
                    }
                  }}
                  children={
                    btnDisableState
                    ?
                    <span className="d-flex align-items-center justify-content-center gap-2">
                      <SpinnerComponent /> Processing...
                    </span>
                    :
                    (buttonLabel)
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
