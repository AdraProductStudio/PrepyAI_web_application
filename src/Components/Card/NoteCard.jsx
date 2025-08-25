import ButtonComponent from "Components/Button/Button";
import { Card, Col, Row } from "react-bootstrap";
import { FaRegClock } from "react-icons/fa";
import Icons from "Utils/Icons";

const NoteCard = ({data, addFavoriteOnClick,notesEditOnClick, notesDeleteOnClick,onShowMore,noteFavoriteIcon}) => {
     
      const normaltext = (data?.notes);
      const char = 400;
      const longertext = normaltext.length > char;
      const shortertext = longertext ? normaltext.slice(0, char) + "..." : normaltext;


    return (
        <Card className="NoteCard rounded-4 p-3 shadow-sm border-0 h-100 mb-3" style={{ backgroundColor: '#F4FAB3' || '#fafaf8ff'}} >
            <Row className="align-items-end justify-content-between py-1 mb-3 heading ">
                <Col className="text-truncate">
                    <p className="text-secondary fs-13 m-0">{data?.date || ''}</p>
                    <h5 className="fw-semibold mt-2 mb-2 text-truncate">{data?.title || ''}</h5>
                </Col>
                <Col xs="auto" className="d-flex ">
                    <ButtonComponent className="btn pb-2" buttonName={noteFavoriteIcon} clickFunction={addFavoriteOnClick} />
                    <ButtonComponent className="btn pb-2" buttonName={Icons?.NotesEditIcon} clickFunction={notesEditOnClick} />
                    <ButtonComponent className="btn pb-2" buttonName={Icons?.NoteDeleteIcon} clickFunction={notesDeleteOnClick} />
                </Col>
            </Row>
            <div className="text-dark " style={{ fontSize: "15px" }}>
                <p className="m-0">{shortertext}
                {longertext && (
                    <ButtonComponent 
                    className="btn btn-link text-decoration-none p-0 " 
                    clickFunction={() => onShowMore?.(normaltext)}
                    buttonName='show more' />     
                )}
                </p>
            </div>
            <footer className="h-100 d-flex align-items-end">
                <div className="d-flex align-items-center text-muted " style={{ fontSize: "14px" }}>
                <FaRegClock className="me-2" />
                {data?.time || ''}
            </div>
            </footer>
            
        </Card>
    );
};

export default NoteCard;