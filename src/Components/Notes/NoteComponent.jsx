import PdfCard from "Components/DashboardCard /PdfCard";
import React from "react";
import { Card } from "react-bootstrap";
import Icons from "Utils/Icons";


const NoteComponent = ({
  note,
  onDelete,
  onEdit,
  onToggleStar,
  isStarred,
}) => {
  return (
    <Card className=" col-11 p-3 mb-3 shadow-sm rounded-3">
      <div className="NotesCompontents">
        {/* Header */}
        <div className="NotesHeader border-bottom pb-2 mb-2 d-flex justify-content-between align-items-center">
          <div className="NotesTitle fw-bold">
            <p className="mb-0"></p>
            <small className="text-muted"></small>
          </div>

          <div className="NotesButtons d-flex align-items-center gap-2">
            {/* Star Toggle */}
            <input
              type="checkbox"
              // id={`checkbox-${id}`}
              checked={isStarred}
              onChange={() => onToggleStar()}
              style={{ display: "none" }}
            />
            {/* <label htmlFor={`checkbox-${note._id}`} style={{ cursor: "pointer" }}>
              {isStarred ? Icons.NotesStarIcon : Icons.NotesStarIconWithoutColour}
            </label> */}

            {/* Edit */}
            <button
              type="button"
              className="btn btn-sm btn-link p-0"
              onClick={() => onEdit(note)}
              title="Edit"
            >
              {Icons.NotesEditIcon}
            </button>

            {/* Delete */}
            <button
              type="button"
              className="btn btn-sm btn-link p-0"
              onClick={() => onDelete(note.id)}
              title="Delete"
            >
              {Icons.NotesDeleteIcon}
            </button>
          </div>
        </div>

        {/* Note Body */}
        <div className="NotesMainBody"  style={{ height: "25vh" }} >
          <p className="mb-0"></p>
        </div>

        {/* Footer */}
        <div className="mt-3 text-muted d-flex align-items-center gap-2 small">
          {Icons.NotesTimer}

        </div>
      </div>
    </Card>
  );
};

export default NoteComponent;




// import React from "react";
// import { Card } from "react-bootstrap";
// import Icons from "Utils/Icons";


// const NoteCardComponent = () => {
//   return (
//     <Card className="col-11 p-2 shadow-sm rounded-3">
//       <div className="NotesCompontents">
//         {/* Header */}
//         <div className="NotesHeader border-bottom border-dashed pb-2">
//           <div className="NotesDate mb-1">
//             <p className="mb-0 text-muted small">12 Jul 2025</p>
//           </div>
//           <div className="d-flex justify-content-between align-items-start">
//             <div className="NotesTitle">
//               <p className="mb-0">Meeting Notes</p>
//             </div>
//             <div className="NotesButtons d-flex gap-2">
//               <span>{Icons.NotesStarIcon}</span>
//               <span>{Icons.NotesEditIcon}</span>
//               <span>{Icons.NotesDeleteIcon}</span>
//             </div>
//           </div>
//         </div>

//         {/* Body */}
//         <div
//           className="NotesMainBody d-flex flex-column justify-content-cente mt-2"
//           style={{ height: "25vh" }}
//         >
//           <p className="text-dark">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
//             nec lorem at turpis fermentum varius.
//           </p>
//         </div>

//         {/* Footer */}
//         <div className="footer text-muted small">
//           {Icons.NotesTimer} 10:30 AM, Monday
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default NoteCardComponent;

