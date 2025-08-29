import ButtonComponent from "Components/Button/Button";
import { Card } from "react-bootstrap";
import { FaRegClock } from "react-icons/fa";
import Icons from "Utils/Icons";

const NoteCard = ({
    data, addFavoriteOnClick,
    notesEditOnClick, notesDeleteOnClick
}) => {

    return (
        <Card className="rounded-3 shadow-sm border-0 mb-3 h-100" style={{ backgroundColor: '#F4FAB3' || '#fafaf8ff' }}>
            <Card.Header className="d-flex flex-wrap bg-transparent pt-3" style={{ borderBottom: '1px dashed #dee2e6' }}>
                <div className="col-5">
                    <p className="text-secondary fs-13 mb-0">{data?.date || ''}</p>
                    <h5 className="fw-semibold mt-2 text-truncate">{data?.title || ''}</h5>
                </div>
                <div className="col d-flex justify-content-end" >
                    <ButtonComponent className="btn border-0" buttonName={Icons.NoteStarIcon} clickFunction={addFavoriteOnClick} />
                    <ButtonComponent className="btn border-0" buttonName={Icons?.NotesEditIcon} clickFunction={notesEditOnClick} />
                    <ButtonComponent className="btn border-0" buttonName={Icons?.NoteDeleteIcon} clickFunction={notesDeleteOnClick} />
                </div>
            </Card.Header>

            <Card.Body className="text-dark fs-15 p-3 py-2" style={{ minHeight: '15rem' }}>
                {data?.notes?.slice(0, 400) + "..."}
            </Card.Body>

            <Card.Footer className="bg-transparent d-flex align-items-center text-muted py-3 fs-14" style={{ borderTop: '1px dashed #dee2e6' }}>
                <FaRegClock className="me-2" />
                {data?.time || ''}
            </Card.Footer>
        </Card>
    );
};

export default NoteCard;
