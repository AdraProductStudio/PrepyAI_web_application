import ButtonComponent from "Components/Button/Button";
import { Card, Row, Col } from "react-bootstrap";
import { FaRegClock } from "react-icons/fa";
import Icons from "Utils/Icons";

const NoteCard = ({data, addFavoriteOnClick,notesEditOnClick, notesDeleteOnClick,onShowMore,noteFavoriteIcon}) => {
     
      const normaltext = (data?.notes);
      const char = 500;
      const longertext = normaltext.length > char;
      const shortertext = longertext ? normaltext.slice(0, char) + "..." : normaltext;


    return (
        <Card className="NoteCard rounded-4 p-3 shadow-sm border-0 h-100 mb-3" style={{ backgroundColor: '#F4FAB3' || '#fafaf8ff'}} >
            <Row className="align-items-center justify-content-between py-1 mb-3 heading ">
                <Col>
                    <p className="text-secondary fs-13 m-0">{data?.date || ''}</p>
                    <h5 className="fw-semibold mt-2 mb-1">{data?.title || ''}</h5>
                </Col>
                <Col xs="auto" className="d-flex">
                    <ButtonComponent className="btn" buttonName={noteFavoriteIcon} clickFunction={addFavoriteOnClick} />
                    <ButtonComponent className="btn" buttonName={Icons?.NotesEditIcon} clickFunction={notesEditOnClick} />
                    <ButtonComponent className="btn" buttonName={Icons?.NoteDeleteIcon} clickFunction={notesDeleteOnClick} />
                </Col>
            </Row>
            <div className="text-dark" style={{ fontSize: "15px" }}>
                {shortertext}
                {longertext && (
                    <ButtonComponent 
                    className="btn btn-link text-decoration-none p-0 ms-1 " 
                    clickFunction={() => onShowMore?.(normaltext)}
                    buttonName='show more' />     
                )}
            </div>
            <div className="d-flex align-items-center text-muted mt-3" style={{ fontSize: "14px" }}>
                <FaRegClock className="me-2" />
                {data?.time || ''}
            </div>
        </Card>
    );
};

export default NoteCard;