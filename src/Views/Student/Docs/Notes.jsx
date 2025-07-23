import ButtonComponent from 'Components/Button/Button';
import { useDispatch } from 'Components/CustomHooks';
import NoteCardComponent from 'Components/Notes/NoteComponent';
import React from 'react'
import Icons from 'Utils/Icons';
import { updateModalShow } from 'Views/Common/Slices/Common_slice';


const Notes = () => {
  const dispatch = useDispatch();
  const notesList = [
    {
      _id: '1',
      title: 'Meeting Notes',
      notes: 'Discussed about project timelines.',
      date: '2025-07-22',
      time: '10:30 AM',
      day: 'Monday',
    },
    {
      _id: '2',
      title: 'Ideas',
      notes: 'Think about new feature implementations.',
      date: '2025-07-21',
      time: '4:00 PM',
      day: 'Sunday',
    },
  ];

  const starredNotes = new Set(['1']);

  const toggleStar = (id) => {
    console.log('Toggled star for note:', id);
  };

  const onEdit = (note) => {
    console.log('Edit clicked for:', note);
  };

  const onDelete = (id) => {
    console.log('Delete clicked for ID:', id);
  };
  return (
    <>
      <div className="NotesPageHeader d-flex justify-content-between px-4">
        <div className="NotesPageTitle ">
          <p className="fs-4 text-dark">My Notes</p>
        </div>
        <div className="NotesPageButton">
          <ButtonComponent
            type="button"
            className="btn"
            style={{
              background: 'linear-gradient(to right, #ff2e9a, #ff5c8a)',
              border: 'none',
              color: "#FFF",
            }}
            clickFunction={() => dispatch(
              updateModalShow({
                show: true,
                size: "md",
                modal_from:"student_dashboard",
                modal_type: "upload_notes",
                modal_close_btn: true,
              }))

            }
            buttonName={<span>+ Add notes </span>}
          />

        </div>
      </div>
      <hr />
      <div className="row">
        {notesList.map((note) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={note._id}>
            <NoteCardComponent
              note={note}
              isStarred={starredNotes.has(note._id)}
              toggleStar={toggleStar}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default Notes
