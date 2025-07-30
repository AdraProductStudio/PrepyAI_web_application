import ButtonComponent from "Components/Button/Button";
import { Card, Row, Col } from "react-bootstrap";
import { FaRegClock } from "react-icons/fa";
import Icons from "Utils/Icons";


const NoteCard = ({ date, title, description, time }) => {
    return (
        <Card className="NoteCard rounded-4 p-3 shadow-sm border-0 mb-3">
            <div className="text-muted small ">{date}</div>
            <Row className="align-items-start justify-content-between">
                <Col>
                    <h5 className="fw-semibold mt-2">{title}</h5>
                </Col>
                <Col xs="auto" className="d-flex" >
                    <ButtonComponent
                        className="btn"
                        buttonName={Icons.NoteStarIcon}
                    />
                    <ButtonComponent
                        className="btn"
                        buttonName={Icons?.NotesEditIcon}
                    />
                    <ButtonComponent
                        className="btn"
                        buttonName={Icons?.NoteDeleteIcon}
                    />
                </Col>
            </Row>
            <hr className="my-2" />
            <div className="text-dark" style={{ fontSize: "15px" }}>
                {description}
            </div>
            <div className="d-flex align-items-center text-muted mt-3" style={{ fontSize: "14px" }}>
                <FaRegClock className="me-2" />
                {time}
            </div>
        </Card>
    );
};

export default NoteCard;
