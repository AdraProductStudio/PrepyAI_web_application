import ButtonComponent from "Components/Button/Button";
import { Card, Row, Col } from "react-bootstrap";
import { FaRegClock } from "react-icons/fa";
import Icons from "Utils/Icons";

const NoteCard = ({
    data, addFavoriteOnClick,
    notesEditOnClick, notesDeleteOnClick
}) => {

    return (
        <Card className="NoteCard rounded-4 p-3 shadow-sm border-0 mb-3 h-100" style={{ backgroundColor: '#F4FAB3' || '#fafaf8ff' }}>
            <Row className="align-items-start justify-content-between py-1 mb-3 heading">
                <Col>
                    <p className="text-secondary fs-13">{data?.date || ''}</p>
                    <h5 className="fw-semibold mt-2">{data?.title || ''}</h5>
                </Col>
                <Col xs="auto" className="d-flex" >
                    <ButtonComponent className="btn" buttonName={Icons.NoteStarIcon} clickFunction={addFavoriteOnClick} />
                    <ButtonComponent className="btn" buttonName={Icons?.NotesEditIcon} clickFunction={notesEditOnClick} />
                    <ButtonComponent className="btn" buttonName={Icons?.NoteDeleteIcon} clickFunction={notesDeleteOnClick} />
                </Col>
            </Row>
            <div className="text-dark" style={{ fontSize: "15px" }}>
                {data?.description || ''}
            </div>
            <div className="d-flex align-items-center text-muted mt-3" style={{ fontSize: "14px" }}>
                <FaRegClock className="me-2" />
                {data?.time || ''}
            </div>
        </Card>
    );
};

export default NoteCard;
