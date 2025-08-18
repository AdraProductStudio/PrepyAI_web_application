import NoteCard from "Components/Card/NoteCard";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { deleteTeacherNote, getTeacherNotesData, postTeacherNote } from "../Actions/Common_action";
import Image from "Utils/Image";
import SpinnerComponent from "Components/Spinner/Spinner";
import { handleDeleteNote, updateModalShow } from "../Slices/Common_slice";
import ButtonComponent from "Components/Button/Button";
import Icons from "Utils/Icons";
import { OverallModel } from "Views/Teachers/Utils/OverallModal";

const Notes = () => {
    const { class_id } = useParams();
    const dispatch = useDispatch();
    const { commonState } = useCommonState();

    useEffect(() => {
        dispatch(getTeacherNotesData({ classroom_id: class_id }));

    }, []);


    return (
        <div className="container-fluid">
            <div className="w-100 border-bottom bg-inf d-flex pb-2">
                <div className="col">
                    <h5 className="mt-2">My Notes</h5>
                </div>
                <div>
                    <ButtonComponent className="btn-brand-color w-100 px-5 py-2" clickFunction={() => dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "notes", modal_type: "add_note" }))} >
                        <span className="d-flex fs-6">{Icons.add_icon} Add Note</span>
                    </ButtonComponent>
                </div>
            </div>

            <div className="w-100 small_header_content_main row overflowY">

                {commonState.teachernotesdata?.glow ?
                    <div className="col-12 d-flex flex-column justify-content-center align-items-center text-center p-4">
                        <img src={Image.Task_empty} style={{ height: "180px", width: "180px" }} alt="Picture" />
                        <p className="mt-3">Getting Notes...</p>
                        <SpinnerComponent />
                    </div>
                    :
                    commonState?.teachernotesdata?.data?.length > 0 ? (
                        commonState?.teachernotesdata?.data?.map((note, index) => (
                            <div key={note.id || index} className=" col-md-6 col-lg-4 col-xxl-3 p-1">
                                <NoteCard notesDeleteOnClick={() => dispatch(deleteTeacherNote(note?.id))} data={note} />
                            </div>
                        ))
                    ) : (
                        <div className="col-12 d-flex flex-column justify-content-center align-items-center text-center p-4">
                            <img src={Image.Task_empty} style={{ height: "180px", width: "180px" }} alt="Picture" />
                            <p className="mt-3">No Notes Available</p>
                        </div>
                    )}
            </div>
            <OverallModel />
        </div>
    );
}

export default Notes;