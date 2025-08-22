import { useEffect } from "react";
import Icons from 'Utils/Icons'
import Img from "Components/Img/Img";
import Image from "Utils/Image";
import NoteCard from "Components/Card/NoteCard";
import ButtonComponent from "Components/Button/Button";
import SpinnerComponent from "Components/Spinner/Spinner";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import {setDeleteId, setEditNoteData, showMoreModal, updateModalShow} from "Views/Common/Slices/Common_slice"
import { getNotes, updateNotePriority } from "Views/Common/Actions/Common_action";
import 'Stylesheet/Css/StudentsNotes.css'



const Notes = () => {
  const dispatch = useDispatch();
  const { commonState } = useCommonState();
  const{glow,data}=commonState.notes
  useEffect(() => {
    dispatch(getNotes());
  }, []);

  const handleDeleteNote = (id) => {
    dispatch(setDeleteId(id));
    dispatch(updateModalShow({show:true, close_btn:true, modal_from:"Notes", modal_type:"delete_note"}))
  }
    
  const handlepriority = (id) =>{
    dispatch(updateNotePriority(id))
  }

  const handleEdit = (note_data) =>{
      dispatch(setEditNoteData({id: note_data.id, title: note_data.title, content: note_data.notes}));
      dispatch(updateModalShow({ show: true, size:"lg",close_btn: true, modal_from: "Notes", modal_type: "edit_notes",}));
  }

  const handleShowMore = (note_data) => {
  dispatch(showMoreModal({id: note_data.id, title: note_data.title,content: note_data.notes}));
  dispatch(updateModalShow({size:'lg', show: true, close_btn: true,modal_from: "Notes",modal_type: "show_more_note"}));
}



  return (<>
    <div className="container-fluid">
      <div className="w-100  border-bottom pb-3">
        <div className="col d-flex align-items-center justify-content-between">
          <h4 className="m-0">My Notes</h4>
          <ButtonComponent 
            className='gradient text-white px-4' 
            buttonName='+ Add Notes' 
            clickFunction={() => dispatch(updateModalShow({ show: true, size:"lg", close_btn: true ,modal_from: "Notes", modal_type: "add_notes"}))}/>
        </div>
      </div>


        {glow ? (
          <div className="w-100  row align-items-center justify-content-center mt-5">
            <div className="col-6 text-center">
              <SpinnerComponent />
              <p className="py-3">Getting Notes</p>
            </div>
          </div>
        ) : data?.length ? (
          <div className="w-100 small_header_content_main row overflowY">
         { data?.map((note_data) => (
               <div className="col-md-6 col-lg-4 col-xxl-3 p-2 " key={note_data.s_no}>
                 <NoteCard 
                 data={note_data} 
                 onShowMore={() => handleShowMore(note_data)} 
                 notesDeleteOnClick={() => handleDeleteNote(note_data.id)}
                 addFavoriteOnClick={()=> handlepriority(note_data.id)}
                 noteFavoriteIcon={note_data.priority === "high" ? Icons.NoteStarIcon : Icons.favorite_outline_icon}
                 notesEditOnClick={()=>handleEdit(note_data)}
                 />
               </div>
           ))}
          </div>
        ) : (
          <div className="w-100 row  align-items-center justify-content-center mt-5">
            <div className="col-6 text-center">
              <Img src={Image?.no_data_found} alt="No classes Found" className="no_data_found_image"/>
              <h6>No Data Found</h6>
            </div>
          </div>
        )}
      </div>
  </>);
};

export default Notes;