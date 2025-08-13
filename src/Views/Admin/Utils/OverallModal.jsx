import { useCommonState } from "Components/CustomHooks";
import Input from "Components/Input/Input";
import ModalComponent from "Components/Modal/Modal";
import JsonData from "./JsonData";
import ButtonComponent from "Components/Button/Button";
import { useDispatch } from "react-redux";
import { setFile, updateStaffForm } from "../Slices/adminSlice";
import { submitStaffFile, submitStaffManual } from "../Actions/Admin_action";

export function OverallModel() {
  const { commonState } = useCommonState();
  // const fileInputRef = useRef(null);
  // const dispatch = useDispatch();
  // const navigate = useCustomNavigate();

  // const handleDrop = () => {
  //     if (fileInputRef.current) {
  //         fileInputRef.current.click();
  //     }
  // };

  const dispatch = useDispatch();
  const { adminState } = useCommonState();
  const { staffForm, file, loading } = adminState

  const handleFileChange = (e) => {
      dispatch(setFile(e.target.files[0] || null));
  };

  const handleInputChange = (e) => {
      dispatch(updateStaffForm({ [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
      e.preventDefault();

      if (file) {
        const formData = new FormData();
        formData.append("teacher_list", file);
        dispatch(submitStaffFile(formData));
      } else {
        dispatch(submitStaffManual(staffForm));
      }
  };

  const { jsonOnly } = JsonData()

  function modalHeaderFun() {
    switch (commonState?.modal?.from) {
      case "admin":
        switch (commonState?.modal?.type) {
          case "dashboard":
            return <h5 className="fw-bold">Create Staff</h5>;

          case "create_classroom":
            return <h5 className="fw-bold">Create Classroom</h5>;

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
      case "admin":
        switch (commonState?.modal?.type) {
          case "dashboard":
            return (
              <div className="">
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-12">
                    <label className="form-label fw-bold">Upload CSV File</label>
                    <input
                      type="file"
                      accept=".csv"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="col-12 text-center text-secondary text-muted mt-3">or</div>
                  {
                    jsonOnly?.create_staff.map((val, idx) => (
                      <Input
                        label={val.label}
                        htmlFor={val.id}
                        type={val.type}
                        name={val.name}
                        value={val.value}
                        change={val.change}
                      />
                    ))
                  }

                  <div className="col-12 text-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary px-5 py-2 w-100" 
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Mail"}
                    </button>
                  </div>

                </form>
              </div>
            );
          
          case "create_classroom" : 
            return (
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="className" className="form-label text-primary-emphasis">Enter a Class Name</label>
                    <input
                      id="className"
                      className="form-control"
                      type="text"
                      // value={className}
                      // onChange={(e) => dispatch(setClassName(e.target.value))}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="teacherSelect" className="form-label text-primary-emphasis">Select Teacher</label>
                    <select
                      id="teacherSelect"
                      className="form-select"
                      // value={teacherId}
                      // onChange={(e) => dispatch(setTeacherId(e.target.value))}
                    >
                      <option value=""></option>
                      {/* {teachers?.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))} */}
                    </select>
                    {/* {!teachers?.length && (
                      <div className="form-text">Loading teachers…</div>
                    )} */}
                  </div>
                  <div className="mb-4">
                    <label className="form-label text-primary-emphasis">Upload Student File</label>
                    <div className="input-group">
                      <input
                        type="file"
                        accept=".csv"
                        className="form-control"
                        id="studentFile"
                        // onChange={(e) => dispatch(setStudentFile(e.target.files[0]))}
                      />
                      <label className="input-group-text" htmlFor="studentFile">CSV</label>
                    </div>
                    <div className="form-text">
                      {/* {studentFile && (
                        <span className="ms-2 badge bg-secondary">
                          {studentFile.name}
                        </span>
                      )} */}
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary px-4 w-100"
                      // disabled={loading || !canSubmit}
                    >
                      {/* {loading && (
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        />
                      )} */}
                      Create
                    </button>
                  </div>

                </form>
              </div>
            )
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
      case "admin":
        switch (commonState?.modal?.type) {
          case "":
            return <h5>Home</h5>;
            break;

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
      modalHeaderClassname="border-0"
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
