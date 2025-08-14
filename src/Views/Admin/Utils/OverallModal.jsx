import { useCommonState } from "Components/CustomHooks";
import Input from "Components/Input/Input";
import ModalComponent from "Components/Modal/Modal";
import JsonData from "./JsonData";
import ButtonComponent from "Components/Button/Button";
import { useDispatch } from "react-redux";
import { clearClassroomForm, clearFieldError, clearForm, setClassroomErrors, setErrors, setFile, updateClassroomForm } from "../Slices/adminSlice";
import { createClassroom, submitStaffFile, submitStaffManual } from "../Actions/Admin_action";
import React, { useRef } from "react";
import { Dropdown, FormCheck } from "react-bootstrap";

export function OverallModel() {
  const { commonState } = useCommonState();
  const fileInputRef = useRef(null);
  // const dispatch = useDispatch();
  // const navigate = useCustomNavigate();

  // const handleDrop = () => {
  //     if (fileInputRef.current) {
  //         fileInputRef.current.click();
  //     }
  // };
  
  const { jsonOnly } = JsonData()
  const dispatch = useDispatch();
  const { adminState } = useCommonState();
  const { staffForm, file, loading } = adminState

  React.useEffect(() => {
    if (!file && fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }, [file]);

  const handleCreateStaff = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (file) {
        const formData = new FormData();
        formData.append("teacher_file", file);
        dispatch(submitStaffFile(formData))
            .then(() => dispatch(clearForm()));
    } else {
        if (!staffForm.name.trim()) newErrors.name = "Staff Name is required";
        if (!staffForm.email_id.trim()) newErrors.email_id = "Email ID is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(staffForm.email_id)) newErrors.email_id = "Invalid email";
        if (!staffForm.subject_name.trim()) newErrors.subject_name = "Subject Name is required";
        if (!staffForm.institute_name.trim()) newErrors.institute_name = "Institute Name is required";

        if (Object.keys(newErrors).length > 0) {
            dispatch(setErrors(newErrors));
            return;
        }
        dispatch(submitStaffManual(staffForm))
            .then(() => dispatch(clearForm()));
    }
  };

  const handleCreateClassroom = (e) => {
    e.preventDefault();
    const errors = {};
    if (!adminState.classroomForm.class_name?.trim()) {
      errors.class_name = "Class name is required";
    }

    if (!adminState.classroomForm.teachers || adminState.classroomForm.teachers.length === 0) {
      errors.teachers = "Please select at least one teacher";
    }

    if (!adminState.classroomForm.student_file) {
      errors.file = "Please upload a student file";
    }

    if (Object.keys(errors).length > 0) {
      dispatch(setClassroomErrors(errors));
      return;
    }

    dispatch(setClassroomErrors({}));

    const formData = new FormData();
    formData.append("student_file", adminState.classroomForm.student_file);
    formData.append("classroom_name", adminState.classroomForm.class_name);
    adminState.classroomForm.teachers.forEach((teacherId) => {
      formData.append("teachers", teacherId);
    });

    dispatch(createClassroom(formData)).then((res) => {
      dispatch(clearClassroomForm());
      const fileInput = document.querySelector('input[name="studentFile"]');
      if (fileInput) fileInput.value = "";
    });
  };


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
              <div>
                <form className="row g-3" onSubmit={handleCreateStaff} noValidate>
                  <div className="col-12">
                    <Input
                      ref={fileInputRef}
                      label={"Upload CSV File"}
                      labelClassName={"text-primary-emphasis"}
                      htmlFor={"staff_file"}
                      type={"file"}
                      name={"staff_file"}
                      accept={".csv"}
                      change={(e) => dispatch(setFile(e.target.files[0] || null))}
                    />
                    {adminState.errors.file && (
                      <small className="text-danger">{adminState.errors.file}</small>
                    )}
                  </div>
                  <div className="col-12 text-center text-secondary text-muted mt-3">or</div>
                  {
                    jsonOnly?.create_staff.map((val, idx) => (
                      <div key={idx}>
                        <Input
                          label={val.label}
                          labelClassName={"text-primary-emphasis mt-3"}
                          className={""}
                          htmlFor={val.id}
                          type={val.type}
                          name={val.name}
                          value={val.value}
                          change={val.change}
                        />
                        {adminState.errors[val.name] && (
                            <small className="text-danger">{adminState.errors[val.name]}</small>
                        )}
                      </div>
                    ))
                  }
                  <div className="col-12 text-center mt-4">
                    <ButtonComponent
                      type={"submit"}
                      className={"btn-primary px-5 py-2 w-100 brand_color text-white border-0"}
                      btnDisable={loading}
                      children={
                         loading ? (
                              <span className="d-flex align-items-center justify-content-center">
                                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                  Processing...
                              </span>
                          ) : (
                              "Send Mail"
                          )
                      }
                    />
                  </div>
                </form>
              </div>
            );
          
          case "create_classroom" : 
            return (
              <div>
                <form className="row g-3" onSubmit={handleCreateClassroom}>
                  <Input
                    label={"Enter a Class Name"}
                    labelClassName={"text-primary-emphasis"}
                    className={"mb-2"}
                    htmlFor={"class_name"}
                    type={"text"}
                    name={"class_name"}
                    value= {adminState?.classroomForm.class_name || ''}
                    change={ (e) => {
                      dispatch(updateClassroomForm({ [e.target.name]: e.target.value }))
                      dispatch(clearFieldError(e.target.name))
                    }}
                  />
                  {adminState?.errors.class_name && (
                    <small className="text-danger">{adminState?.errors.class_name}</small>
                  )}
                
                  <h6 className="mt-3 text-primary-emphasis fw-normal">Select Teacher</h6>
                  <Dropdown className="w-100 mb-1">
                    <Dropdown.Toggle variant="outline- border-light-subtle" className="w-100 text-start">
                      {adminState?.classroomForm.teachers?.length
                        ? `Selected: ${adminState?.classroomForm.teachers.join(", ")}`
                        : "Select Teachers"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {[222, 2, 3, 4, 5].map((t) => (
                        <Dropdown.Item
                          as="div"
                          key={t}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FormCheck
                            type="checkbox"
                            label={`Teacher ${t}`}
                            checked={adminState?.classroomForm.teachers?.includes(t)}
                            onChange={(e) => {
                              const selected = adminState?.classroomForm.teachers || [];
                              const updated = e.target.checked
                                ? [...selected, t]
                                : selected.filter((id) => id !== t);
                                dispatch(clearFieldError(e.target.name));
                              dispatch(updateClassroomForm({ teachers: updated }));
                            }}
                          />
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  {adminState?.errors.teachers && (
                    <small className="text-danger">{adminState?.errors.teachers}</small>
                  )}
                
                  <Input
                    label={"Upload Student File"}
                    labelClassName={"text-primary-emphasis mt-3"}
                    className={"col-12 mb-3"}
                    htmlFor={"studentFile"}
                    type={"file"}
                    name={"studentFile"}
                    accept={".csv"}
                    change={(e) => {
                      dispatch(clearFieldError(e.target.name))
                      dispatch(updateClassroomForm({ student_file: e.target.files[0] || null }))
                    }}
                  />
                  {adminState?.errors.file && (
                    <small className="text-danger">{adminState?.errors.file}</small>
                  )}

                  <div className="col-12 text-center mt-4">
                    <ButtonComponent
                      type={"submit"}
                      className={"btn-primary px-5 py-2 w-100 brand_color text-white border-0"}
                      btnDisable={loading}
                      children={
                        loading ? (
                          <span className="d-flex align-items-center justify-content-center">
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Processing...
                          </span>
                          ) 
                          : 
                          (
                            "Create"
                          )
                      }
                    />
                  </div>
                </form>
              </div>
            );

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
