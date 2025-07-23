import ButtonComponent from "Components/Button/Button";
import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { BsClock } from "react-icons/bs";
import Icons from "Utils/Icons";

const TestCard = ({
  testName = "",
  date = "",
  time = "",
  active = "",
  duration = "",
  cardfor = "",
  ongoingStatus = "",
}) => {
  return (
    <Card className="pt-3 pb-3 ps-2 pe-2 my-3 shadow-sm border-0 rounded-4 w-25">
      {cardfor === "ongoing" && (
        <span
          className={`position-absolute top-0 end-0 px-3 py-1 ${
            ongoingStatus ? "bg-success-subtle" : "bg-danger-subtle"
          } text-dark rounded-bottom-start ongoingtestcard`}
        >
          {ongoingStatus ? "Completed" : "Not Completed"}
        </span>
      )}
      <Row className="align-items-center g-0">
        {/* Colored Left Bar */}
        <Col xs="auto">
          <div
            className="bg-danger rounded "
            style={{ width: "4px", height: "90px" }}
          />
        </Col>

        {/* Main Content */}
        <Col className="ms-3 d-flex flex-column gap-2">
          <h6 className="mb-1 fw-semibold">{testName}</h6>
          <p className="mb-1 text-muted small">
            {date} | {time}
          </p>
          <p className="mb-0 text-muted small">
            {active ? "online" : "offline"}
          </p>
        </Col>

        {/* Right Side Icons & Duration */}
        {cardfor !== "cancelled" && (
          <Col xs="auto" className={`d-flex flex-column gap-2`}>
            {cardfor !== "ongoing" && (
              <div className={`d-flex align-items-center`}>
                <div>
                  <ButtonComponent
                    className="text-secondary"
                    buttonName={Icons?.testScreenEditIcon}
                    clickFunction={""}
                  />
                </div>
                <div>
                  <ButtonComponent
                    className="text-danger"
                    buttonName={Icons?.pdfDeleteIcon}
                    clickFunction={""}
                  />
                </div>
              </div>
            )}
            <div className="d-flex align-items-center bg-light px-2 py-1 rounded">
              <BsClock size={16} className="me-1 text-muted" />
              <span className="small text-secondary">{duration}</span>
            </div>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default TestCard;
