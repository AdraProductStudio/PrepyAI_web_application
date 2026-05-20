import ButtonComponent from "Components/Button/Button";
import { useDispatch } from "Components/CustomHooks";
import { Card } from "react-bootstrap";
import { FaRegClock } from "react-icons/fa";
import Icons from "Utils/Icons";
import { addAndRemoveFavNotes } from "Views/Common/Actions/Common_action";
import { updateModalShow, view_notes_data } from "Views/Common/Slices/Common_slice";

const NoteCard = ({
    data, addFavoriteOnClick,
    notesEditOnClick, notesDeleteOnClick
}) => {
    const dispatch = useDispatch()

    return (
        <Card className="rounded-4 shadow-sm border-0 mb-3" style={{ backgroundColor: '#F4FAB3' || '#fafaf8ff' }}>
            <Card.Header className="d-flex flex-wrap bg-transparent pt-3" style={{ borderBottom: '1px dashed #dee2e6' }}>
                <div className="col-5">
                    <p className="text-secondary fs-13 mb-0">{data?.date || ''}</p>
                    <h5 className="fw-semibold mt-2 text-truncate">{data?.title || ''}</h5>
                </div>
                <div className="col d-flex justify-content-end" >
                    <ButtonComponent className="btn border-0" buttonName={data?.priority == "high" ?  Icons.NoteStarIcon : Icons.NotesStarOutlineIcon  } 
                    clickFunction={()=>dispatch(addAndRemoveFavNotes(data?.id))} />
                    <ButtonComponent className="btn border-0" buttonName={Icons?.NotesEditIcon} clickFunction={notesEditOnClick} />
                    <ButtonComponent className="btn border-0" buttonName={Icons?.NoteDeleteIcon}
                        clickFunction={() => {
                            dispatch(updateModalShow({ show: true, close_btn: true, size: "md", modal_from: "notes", modal_type: "delete_note" }))
                            dispatch(view_notes_data({ title: data?.title, content: data?.notes,id:data?.id }))
                        }}

                     />
                </div>
            </Card.Header>

            <Card.Body className="text-dark fs-15 p-3 py-2" style={{ minHeight: '15rem' }}>
                <p className="m-0">{data?.notes.length > 400 ? data?.notes?.slice(0, 400) + "..." : data?.notes}
                    {data?.notes.length > 400 && (
                        <ButtonComponent
                            className="btn btn-link text-decoration-none p-0 "
                            clickFunction={() => {
                                dispatch(updateModalShow({ show: true, close_btn: true, size:"lg", modal_from: "notes", modal_type: "view_note" }))
                                dispatch(view_notes_data({title:data?.title,content:data?.notes}))
                            }}
                            buttonName='show more' />
                    )}
                </p>
            </Card.Body>

            <Card.Footer className="bg-transparent d-flex align-items-center text-muted py-2 fs-14" style={{ borderTop: '1px dashed #dee2e6' }}>
                <FaRegClock className="me-2" />
                {data?.time || ''}
            </Card.Footer>
        </Card>
    );
};

export default NoteCard;
