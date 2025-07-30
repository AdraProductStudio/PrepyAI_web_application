import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FaCircle } from "react-icons/fa";
import Icons from "Utils/Icons";
import Image from "Components/Img/Img";
import Images from "Utils/Image";

const BookCard = ({
  BookName = "",
  Chapter = "",
  QuestionSets = "",
  Perfomance = "",
  ViewFunction,
  GenerateFunction,
  cardfor = "",
}) => {
  return (
    <Card
      className="shadow-sm border-0 rounded-3 p-3"
      style={{ maxWidth: "390px" }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-start mb-2">
        <h5 className="fw-normal">{BookName}</h5>
        <ButtonComponent
          className="text-danger"
          buttonName={Icons?.pdfDeleteIcon}
          clickFunction={""}
        />
      </div>

      {/* Line after Header */}
      <div className="border-top mb-3"></div>

      {/* Content Section */}
      <Row className="d-flex justify-content-evenly align-items-center gap-3">
        {/* PDF Icon Box */}
        <Col xs="auto">
          <Image src={Images?.pdfImage} alt={"pdfImage"} width={"60px"} />
        </Col>

        {/* Details Section */}
        <Col>
          <div className="text-secondary d-flex flex-column gap-1">
            <div>
              <span>Chapters:</span>{" "}
              <span className="text-black fw-light fs-6">{Chapter}</span>
            </div>
            <div>
              <span>Question sets:</span>{" "}
              <span className="text-black fw-light fs-6">{QuestionSets}</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="me-2">Performance:</span>
              <FaCircle
                size={8}
                className={`me-2 ${Perfomance.toLowerCase()}-text`}
              />
              <span className="text-black fw-light fs-6">{Perfomance}</span>
            </div>
          </div>
        </Col>
      </Row>

      {/* Line after PDF section */}
      <div className="border-top mt-3 mb-2"></div>

      {/* Action Buttons */}
      {cardfor === "student" && (
        <div className="d-flex">
          <Button
            variant="outline"
            className="me-2 flex-fill border-0 text-primary"
            onClick={ViewFunction}
          >
            View
          </Button>
          <div
            className="mx-2"
            style={{
              width: "1px",
              height: "35px",
              backgroundColor: "#6c757d", // Bootstrap text-muted color
              opacity: 0.5,
            }}
          />{" "}
          <Button
            variant="outline"
            className="flex-fill border-0 gradient-text"
            onClick={GenerateFunction}
          >
            Generate Question
          </Button>
        </div>
      )}
    </Card>
  );
};

export default BookCard;
