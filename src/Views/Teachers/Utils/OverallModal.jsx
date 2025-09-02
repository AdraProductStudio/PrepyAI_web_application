import ButtonComponent from "Components/Button/Button";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import ModalComponent from "Components/Modal/Modal";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { postTeacherNote } from "Views/Common/Actions/Common_action";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import JsonData from "./JsonData";
import {
  postClassrooms,
  postCreateStudent,
  postStudents,
  postSubjects,
} from "../Actions/teacherAction";
import { useParams } from "react-router-dom";
import Icons from "Utils/Icons";
import { Form, Button } from "react-bootstrap";
import { clear_form_fields, handle_attachment_books_upload } from "../Slice/teachersSlice";
import { handleUploadBook } from "../Actions/TeacherActions";
import SpinnerComponent from "Components/Spinner/Spinner";


export function OverallModel() {
  const { class_id } = useParams();
  const { jsxJson } = JsonData();
  const dispatch = useDispatch();
  const { teachersState, commonState, } = useCommonState();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(handle_attachment_books_upload(file));
    }
  };

  const handleSubmit = () => {
    if (!teachersState?.attachment_books_upload) return alert("Please select a file before uploading");

    dispatch(handleUploadBook(teachersState?.params_data, teachersState?.attachment_books_upload));
  };

  function modalHeaderFun() {
    switch (commonState?.modal?.from) {
      case "teacher":
        switch (commonState?.modal?.type) {
          case "attachments":
            return <h5>Upload Book</h5>

          case "performance":
            return <h5 className="fw-bold">Student Score</h5>;

          default:
            break;
        }
        break;

      case "TeacherClassroom":
        switch (commonState?.modal?.type) {
          case "createClassroom":
            return <h5 className="ms-3 mb-0 fw-bold">Create Class Room</h5>;
          default:
            break;
        }
        break;

      case "notes":
        switch (commonState?.modal?.type) {
          case "add_note":
            return <h5 className="m-0 ps-4">Add  Notes</h5>

          default:
            break;
        }
        break;

      case "subjects":
        switch (commonState?.modal?.type) {
          case "subjects":
            return <h5 className="ms-3">Add Subject</h5>
          default:
            break;
        }
        break;

      case "studentsEdit":
        switch (commonState?.modal?.type) {
          case "studentsEdit":
            return <h5 className="ms-3">Edit Student</h5>

          case "studentCreateModal":
            return <h5 className="ms-3 mb-0 fw-bold">Add Students</h5>

          default:
            break;
        }

      case "books":
        switch (commonState?.modal?.type) {
          case "delete_book":
            return <h5 className="ms-3">Delete Book</h5>

          default:
            break;
        }
        break;

      default:
        break;
    }
  }

  function modalBodyFun() {
    switch (commonState?.modal?.from) {
      case "teacher":
        switch (commonState?.modal?.type) {
          case "attachments":
            return (
              <div className="p-4 shadow-lg rounded-3" style={{ maxWidth: "500px", margin: "auto" }}>
                {/* Dropdown */}
                {/* <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold text-primary">Classes</Form.Label>
                                    <Form.Select
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                    >
                                        <option>12th A section</option>
                                        <option>12th B section</option>
                                        <option>11th A section</option>
                                    </Form.Select>
                                </Form.Group> */}

                {/* Drag & Drop Style File Upload */}
                <div
                  className="border border-2 border-danger rounded p-4 text-center mb-3"
                  style={{ borderStyle: "dashed" }}
                >
                  <Form.Label className="fw-medium text-danger">
                    Drag & drop Your book File or <span className="text-primary">Browse</span>
                  </Form.Label>
                  <p className="small text-muted">
                    Format: pdf, docx, doc | Max size: 1 GB
                  </p>
                  <Form.Control
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />

                  {teachersState?.attachment_books_upload?.filename && <p className="small text-success mt-2">📘 {teachersState?.attachment_books_upload?.filename}</p>}
                </div>
              </div>
            );

          case "performance":
            return (
              <div className="modal-body p-0 m-0 ">
                <div className="table-responsive">
                  <table className="table table-bordered text-center align-middle mb-0">
                    <thead>
                      <tr>
                        {jsxJson?.student_performance_modal.map((item, idx) => (
                          <th className={item.divClassName} key={idx}>
                            {item.title}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {teachersState?.studentsPerformance.placeholder2 ?
                        <tr>
                          <td colSpan={5}>
                            <SpinnerComponent />
                          </td>
                        </tr>
                        :
                        teachersState?.studentsPerformance.performance_modalData.length > 0 ? (
                          teachersState?.studentsPerformance.performance_modalData.map((data, idx) => (
                            <tr key={idx} >
                              <td>{data.first_name}</td>
                              <td>{data.overall}</td>
                              <td>{data.score}</td>
                              <td>{data.performance_status}</td>
                              <td>{data.time_submitted}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="text-center py-4">No Data Found</td>
                          </tr>
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            )

          default:
            break;
        }
        break;

      case "TeacherClassroom":
        switch (commonState?.modal?.type) {
          case "createClassroom":
            return <> {Inputfunctions(jsxJson.classroomModal)}
              <ButtonComponent title={"Create"} className="btn-md btn-brand-color p-3 w-100" clickFunction={() => dispatch(postClassrooms(teachersState?.teacher_PostClassrooms?.data))} buttonName={"Create"} />
            </>

          default:
            break;
        }
        break;

      case "notes":
        switch (commonState?.modal?.type) {
          case "add_note":
            return <div className='p-2 w-100'>
              {Inputfunctions(jsxJson.notes_input)}

              <div className="d-flex justify-content-between align-items-center">
                <div className="col p-1">
                  <ButtonComponent
                    type="button"
                    className="btn btn-outline-dark px-4 w-100"
                    buttonName="Cancel"
                    clickFunction={() => dispatch(updateModalShow({ show: null, close_btn: false, modal_from: "notes", modal_type: "add_note" }))}
                  />
                </div>
                <div className="col p-1">
                  <ButtonComponent
                    type="button"
                    className="btn btn-brand-color px-5 py-2 w-100"
                    buttonName={commonState?.notesdata?.id ? "Update" : "Add"}
                    clickFunction={() => dispatch(postTeacherNote(commonState?.notesdata?.id ? "teachers/edit_user_notes" : "teachers/create_user_notes", { title: commonState?.notesdata?.title || "", content: commonState?.notesdata?.content || "", id: commonState?.notesdata?.id || null }))}
                  />
                </div>
              </div>
            </div>

          default:
            break;
        }
        break;

      case "subjects":
        switch (commonState?.modal?.type) {
          case "subjects":
            return <> {Inputfunctions(jsxJson.addSubjects)}<ButtonComponent className="btn-md btn-brand-color p-3 w-100" buttonName={"Add Subject"} clickFunction={() => dispatch(postSubjects({ subject_name: teachersState?.teacher_PostSubjects?.data?.subject_name, classroom_id: class_id, teachers_id: teachersState?.teacher_PostSubjects?.data?.teachers }))} /></>

          default:
            break;
        }
        break;

      case "techaersdeletemodal":
        switch (commonState?.modal?.type) {
          case "techaersdeletemodal":
            return (
              <>
                <div className="text-center w-100 p-4">
                  <div
                    style={{ fontSize: "40px", color: "#ff4d6d" }}
                    className="mb-3"
                  >
                    {Icons.deleteIcon}
                  </div>
                  <p className="fs-5 d-flex justify-content-center fw-semibold">
                    Are you sure you want to delete?
                  </p>

                  <div className="d-flex justify-content-center gap-3 mt-4 w-100">
                    <ButtonComponent
                      className="btn-md btn-light w-50"
                      buttonName={"No"}
                      clickFunction={() =>
                        dispatch(updateModalShow({ show: false }))
                      }
                    />

                    <ButtonComponent
                      className="btn-md w-50 text-white btn-brand-color"
                      buttonName={"Yes"}
                      clickFunction={commonState?.modal?.modal_data}
                    />
                  </div>
                </div>
              </>
            );

          default:
            break;
        }
        break;

      case "students":
        switch (commonState?.modal?.type) {
          case "studentCreateModal":
            return (
              <>
                <div className="row pe-3 ps-3 w-100">
                  {Inputfunctions(jsxJson.createMultiStudets)}
                </div>
                <div className="d-flex mt-3 justify-content-center w-100">
                  <hr />
                  <span>( OR )</span>
                  <hr />
                </div>
                {teachersState?.teacher_CreateStudents?.data &&
                  !Object.entries(teachersState.teacher_CreateStudents.data)
                    .filter(([key]) => key !== "student_file")
                    .every(([, value]) => value == null || value === "") && (
                    <div className="d-flex mt-2 justify-content-end me-3 w-100">
                      <ButtonComponent
                        buttonName={"clear"}
                        clickFunction={() => dispatch(clear_form_fields())}
                        type="button"
                        className="btn p-0 text-primary btn-clear"
                      />
                    </div>
                  )}

                <div className=" row pt-2 pe-3 ps-3 w-100">
                  {Inputfunctions(jsxJson.createStudent)}
                </div>

                <div className="d-flex pt-3 mt-3 pe-2 ps-3 w-100 gap-3">
                  <ButtonComponent
                    className="btn-md btn-light w-50 p-3"
                    buttonName={"Close"}
                    clickFunction={() =>
                      dispatch(updateModalShow({ show: false }))
                    }
                  />
                  <ButtonComponent
                    className="btn-md btn-brand-color w-50 p-3"
                    buttonName={"Create"}
                    clickFunction={() =>
                      dispatch(
                        postCreateStudent(
                          teachersState?.teacher_CreateStudents?.data
                        )
                      )
                    }
                  />
                </div>
              </>
            );

          case "studentsEdit":
            return (
              <>
                {Inputfunctions(jsxJson.editStudent)}
                <ButtonComponent
                  className="btn-md btn-brand-color p-3 w-100"
                  buttonName={"Edit Student"}
                  clickFunction={() =>
                    dispatch(
                      postStudents(teachersState?.teacher_PostStudents?.data)
                    )
                  }
                />
              </>
            );
          default:
            break;
        }
        break;

      case "books":
        switch (commonState?.modal?.type) {
          case "delete_book":
            return <div className="text-center w-100 p-4">
              <div
                style={{ fontSize: "40px", color: "#ff4d6d" }}
                className="mb-3"
              >
                {Icons.deleteIcon}
              </div>
              <p className="fs-5 d-flex justify-content-center fw-semibold">
                Are you sure you want to delete?
              </p>

              <div className="d-flex justify-content-center gap-3 mt-4 w-100">
                <ButtonComponent
                  className="btn-md btn-light w-50"
                  buttonName={"No"}
                  clickFunction={() =>
                    dispatch(updateModalShow({ show: false }))
                  }
                />

                <ButtonComponent
                  className="btn-md w-50 text-white btn-brand-color"
                  buttonName={"Yes"}
                  clickFunction={commonState?.modal?.modal_data}
                />
              </div>
            </div>

          default:
            break;
        }
        break;
      default:
        break;

    }
  }

  function modalFooterFun() {
    switch (commonState?.modal?.from) {
      case "teacher":
        switch (commonState?.modal?.type) {
          case "attachments":
            return <div>
              <div className="d-flex justify-content-between gap-2">
                <Button variant="outline-secondary" onClick={() => dispatch(updateModalShow({ show: false, close_btn: false, modal_from: "", modal_type: "" }))}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleSubmit} >
                  {"Upload Book"}
                </Button>
              </div>
            </div>

          default:
            break;
        }
        break;

      case "TeacherClassroom":
        switch (commonState?.modal?.type) {
          case "createClassroom":
            return;
            break;

          default:
            break;
        }
        break;
      case "subjects":
        switch (commonState?.modal?.type) {
          case "subjects":
            return

          default:
            break;
        }
        break;

      case "subjects":
        switch (commonState?.modal?.type) {
          case "subjects":
            return;

          default:
            break;
        }
        break;
      case "students":
        switch (commonState?.modal?.type) {
          case "studentCreateModal":
            return
          default:
            break;
        }
        break;

      default:
        break;
    }
  }

  return (
    <ModalComponent
      show={commonState?.modal?.show}
      modalSize={commonState?.modal?.size}
      modalCentered={true}
      modalCloseButton={commonState?.modal?.close_btn}
      showModalHeader={true}
      modalHeaderClassname="border-0 border-bottom"
      modalHeader={modalHeaderFun()}
      modalBodyClassname="py-2"
      modalBody={
        <div className="d-flex flex-wrap p-3 py-0">{modalBodyFun()}</div>
      }
      showModalFooter={true}
      modalFooterClassname="border-0"
      modalFooter={modalFooterFun()}
      modalClassname={
        ["lg", "xl"].includes(commonState?.modal?.size) ? "model_height_lg" : ""
      }
    />
  );
}
