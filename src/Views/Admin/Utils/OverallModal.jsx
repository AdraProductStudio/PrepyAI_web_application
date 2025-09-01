import { useCommonState } from "Components/CustomHooks";
import Input from "Components/Input/Input";
import ModalComponent from "Components/Modal/Modal";
import JsonData from "./JsonData";
import ButtonComponent from "Components/Button/Button";
import { useDispatch } from "react-redux";
import { clearClassroomForm, clearFieldError, clearForm, onChangeClassroomForm, setClassroomErrors, setErrors, setFile } from "../Slices/adminSlice";
import { createClassroom, handleClassroomTeacherEdit, handleDashboardTeacherEdit, handleDeleteClassroomStudent, handleDeleteClassroomTeacher, handleDeleteDashboardTeacher, submitStaffFile, submitStaffManual } from "../Actions/Admin_action";
import React, { useRef } from "react";
import Icons from "Utils/Icons";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import SpinnerComponent from "Components/Spinner/Spinner";

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
  
  const { jsonOnly, jsxJson } = JsonData()
  const dispatch = useDispatch();
  const { adminState } = useCommonState();
  const { staffForm, file, loading, edit_dashboard_teacher, placeholder, placeholder2, edit_classroom_teacher } = adminState

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
    if (!adminState.classroomForm.class_name?.trim()) errors.class_name = "Class name is required";
    if (!adminState.classroomForm.teachers || adminState.classroomForm.teachers.length === 0)errors.teachers = "Please select at least one teacher";
    if (!adminState.classroomForm.student_file) errors.student_file = "Please upload a student file";

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
      const fileInput = document.querySelector('input[name="student_file"]');
      if (fileInput) fileInput.value = "";
    })
  };

  const handleEditDashboardTeacher = (e) => {
    e.preventDefault();
    const newErrors = {};
    if(!edit_dashboard_teacher.staff_name.trim()) newErrors.staff_name = "Staff Name is required"
    if(!edit_dashboard_teacher.institute_name.trim()) newErrors.institute_name = "Institute Name is required"
    if(!edit_dashboard_teacher.subject.trim()) newErrors.subject = "Subject Name is required"
    if(!edit_dashboard_teacher.contact_no.trim()) newErrors.contact_no = "Contact Number is required"
    if(!edit_dashboard_teacher.email.trim()) newErrors.email = "Email Id is required";
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(edit_dashboard_teacher.email)) newErrors.email = "Invalid email"
    if(!edit_dashboard_teacher.qualification.trim()) newErrors.qualification = "Qualification is required"

    if(Object.keys(newErrors).length > 0) {
      dispatch(setErrors(newErrors))
      return;
    }

    dispatch(handleDashboardTeacherEdit(edit_dashboard_teacher, adminState?.dashboard_teachers_list))
      .then(() => dispatch(clearForm()))
  }

  const handleEditClassroomTeacher = (e) => {
    e.preventDefault();
    const newErrors = {}

    if(!edit_classroom_teacher.staff_name.trim()) newErrors.staff_name = "Staff Name is required"
    if(!edit_classroom_teacher.subject_name.trim()) newErrors.subject_name = "Subject Name is required"
    if(!edit_classroom_teacher.contact_no.trim()) newErrors.contact_no = "Contact Number is required"
    if(!edit_classroom_teacher.email.trim()) newErrors.email = "Email Id is required"
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(edit_classroom_teacher.email)) newErrors.email = "Invalid email"
    if(!edit_classroom_teacher.qualification.trim()) newErrors.qualification = "Qualification is required"
    
    if(Object.keys(newErrors).length > 0 ){
      dispatch(setErrors(newErrors))
      return;
    }

    dispatch(handleClassroomTeacherEdit(edit_classroom_teacher, adminState?.teachersTableData))
      // .then(dispatch(clearForm()))
  }


  function modalHeaderFun() {
    switch (commonState?.modal?.from) {
      case "admin":
        switch (commonState?.modal?.type) {
          case "dashboard":
            return <h5 className="fw-bold">Create Staff</h5>;

          case "create_classroom":
            return <h5 className="fw-bold">Create Classroom</h5>;

          case "edit_dashboard_teacher":
            return <h5 className="fw-bold">Edit Teacher Data</h5>;

          case "edit_classroom_teacher":
            return <h5 className="fw-bold">Edit Teacher Data</h5>;
          
          case "edit_classroom_student":
            return <h5 className="fw-bold">Edit Student Data</h5>;

          case "delete_dashboard_teacher":
            return <h5 className="fw-bold"></h5>;

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
                      label={ adminState.file ? (
                        <div className="position-relative d-flex align-items-center justify-content-center gap-2 py-3 rounded cursor-pointer text-success" style={{border: "1px dashed green", background: "#f8fff8"}}>
                          {Icons.uploadIcon}
                          <span>
                            <p className="fw-bold mb-0">{adminState?.file.name}</p>
                            <p className="mb-0" style={{fontSize: "0.75rem"}}>File selected successfully</p>
                          </span>
                          <ButtonComponent
                            type={"button"}
                            className={"btn-close position-absolute top-0 end-0 m-2"}
                            clickFunction={ (e) => {
                              e.preventDefault()
                              // e.stopPropagation()
                              dispatch(setFile(null))
                              fileInputRef.current.value = ""
                            }}
                          />
                        </div>
                      ) : (
                        <div className="d-flex align-items-center justify-content-center py-3 rounded cursor-pointer" style={{border: "1px dashed pink"}}>
                          {Icons.uploadIcon}
                          <div className="ms-2">
                            <p className="fw-bold mb-0">Upload CSV File</p>
                            <p className="mb-0" style={{fontSize: "0.75rem"}}>Format: pdf,docx,doc & Max file size: 25 MB</p>
                          </div>
                        </div>)
                      }
                      labelClassName={"w-100"}
                      className={"d-none"}
                      htmlFor={"staff_file"}
                      type={"file"}
                      name={"staff_file"}
                      accept={".csv"}
                      change={ (e) => {
                        const file = e.target.files[0] || null;
                        dispatch(setFile(file));
                        if(file) {
                          dispatch(clearFieldError(["name", "email_id", "subject_name", "institute_name"]));
                        }
                      }}
                    />
                    {adminState.errors.file && (
                      <small className="text-danger">{adminState.errors.file}</small>
                    )}
                  </div>
                  <div className="col-12 text-center text-secondary text-muted mt-3">or</div>
                  {Inputfunctions(jsxJson?.create_staff_modal)}
                  <ButtonComponent
                    type={"submit"}
                    className={"btn-primary px-5 py-2 w-100 brand_color text-white border-0 mt-4"}
                    btnDisable={loading}
                    children={
                      loading ? (
                          <span className="d-flex align-items-center justify-content-center gap-2">
                            <SpinnerComponent/> Processing...
                          </span>
                      ) 
                      : 
                      ( "Send Mail" )
                    }
                  />
                </form>
              </div>
            );
          
          case "create_classroom" : 
            return (
              <div>
                <form className="row g-3" onSubmit={handleCreateClassroom}>
                  {Inputfunctions(jsxJson.create_classroom_modal)}
                  <Input
                    ref={fileInputRef}
                    label={ adminState?.classroomForm.student_file ? (
                      <div>
                        <span className="text-primary-emphasis fs-14">Upload Student File</span>
                        <div className="position-relative d-flex align-items-center justify-content-center py-3 rounded cursor-pointer mt-1 text-success gap-2" style={{border: "1px dashed green", background: "#f8fff8"}}>
                          {Icons.uploadIcon}
                          <span>
                            <p className="fw-bold mb-0">{adminState.classroomForm.student_file.name}</p>
                            <p className="mb-0" style={{fontSize: "0.75rem"}}>File selected successfully</p>
                          </span>
                          <ButtonComponent
                            type={"button"}
                            className={"btn-close position-absolute top-0 end-0 m-2"}
                            clickFunction={(e) => {
                              e.preventDefault()
                              dispatch(onChangeClassroomForm({ field: "student_file", data: null }))
                              fileInputRef.current.value = ""
                            }}
                          />
                        </div>
                      </div>
                      ) : (
                        <>
                          <span className="text-primary-emphasis fs-14">Upload Student File</span>
                          <div className="d-flex align-items-center justify-content-center py-3 rounded cursor-pointer" style={{border: "1px dashed pink"}}>
                            <span>{Icons.uploadIcon}</span>
                            <div className="ms-2">
                              <p className="fw-bold mb-0">Upload CSV File</p>
                              <p className="mb-0" style={{fontSize: "0.75rem"}}>Format: pdf,docx,doc & Max file size: 25 MB</p>
                            </div>
                          </div>
                        </>
                      )
                    }
                    labelClassName={"w-100 mt-4"}
                    className={"col-12 mb-2 d-none"}
                    htmlFor={"student_file"}
                    type={"file"}
                    name={"student_file"}
                    accept={".csv"}
                    change={(e) => {
                      dispatch(clearFieldError(e.target.name))
                      dispatch(onChangeClassroomForm({field: "student_file", data: e.target.files[0] || null }))
                    }}
                  />
                  {adminState?.errors.student_file && (
                    <small className="text-danger">{adminState?.errors.student_file}</small>
                  )}
                  <div className="col-12 text-center mt-4">
                    <ButtonComponent
                      type={"submit"}
                      className={"btn-primary px-5 py-2 w-100 brand_color text-white border-0"}
                      btnDisable={loading}
                      children={
                        loading ? (
                          <span className="d-flex align-items-center justify-content-center gap-2">
                              <SpinnerComponent/> Processing...
                          </span>
                          ) 
                          : 
                          ( "Create" )
                      }
                    />
                  </div>
                </form>
              </div>
            );

          case "edit_dashboard_teacher" : 
            return (
              <div className="w-100">
                {Inputfunctions(jsxJson?.edit_dashboard_teacher_model)}
                <ButtonComponent
                  type={"button"}
                  className={"btn-primary w-100 brand_color border-0 mt-4"} 
                  clickFunction={handleEditDashboardTeacher}
                  btnDisable={placeholder2}
                  children={
                    placeholder2 ? (
                      <span className="d-flex align-items-center justify-content-center gap-2">
                        <SpinnerComponent /> Processing...
                      </span>
                    )
                    :
                    ( "Submit" )
                  }
                />
              </div>
            );

          case "edit_classroom_teacher" : 
            return (
              <div className="w-100">
                {Inputfunctions(jsxJson?.edit_classroom_teacher_model)}
                <ButtonComponent
                  type={"button"}
                  className={"btn-primary w-100 brand_color border-0 mt-4"}
                  clickFunction={handleEditClassroomTeacher}
                  btnDisable={placeholder2}
                  children={
                    placeholder2 ? (
                      <span className="d-flex align-items-center justify-content-center gap-2">
                        <SpinnerComponent /> Processing...
                      </span>
                    )
                    : ( "Submit" )
                  }
                />
              </div>
            )  

          // case "edit_classroom_student" : 
          //   return (
          //     <div className="w-100">
          //       {Inputfunctions(jsxJson?.edit_classroom_student_model)}
          //       <ButtonComponent
          //         type={"button"}
          //         className={"btn-primary w-100"}
          //         children={"Submit"}
          //       />
          //     </div>
          //   )  

          case "delete_dashboard_teacher":
            return (
              <div className="w-100">
                <div className="text-center mb-4">
                  {Icons.delete_model_icon}
                </div>
                <h5 className="text-center">Are you want to Delete the Teacher </h5>
                {Inputfunctions(jsxJson?.delete_dashboard_teacher_model)}
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <ButtonComponent
                    type={"button"}
                    className={"btn-outline-secondary px-5"}
                    children={"No"}
                    clickFunction={() => dispatch(updateModalShow({ show: false, close_btn: true, modal_from: "admin", modal_type: "delete_dashboard_teacher" })) }
                  />
                  <ButtonComponent
                    type={"button"}
                    className={"btn-danger brand_color px-5 border-0"}
                    clickFunction={() => dispatch(handleDeleteDashboardTeacher(adminState?.edit_dashboard_teacher.s_no, adminState?.dashboard_teachers_list))}
                    btnDisable={placeholder2}
                    children={
                      placeholder2 ? (
                        <span className="d-flex align-items-center justify-content-center gap-2">
                          <SpinnerComponent />
                        </span>
                      )
                      :
                      ("Yes")
                    }
                  />
                </div>
              </div>
            )

          case "delete_classroom_teacher":
            return (
              <div className="w-100">
                <div className="text-center mb-4">
                  {Icons.delete_model_icon}
                </div>
                <h5 className="text-center">Are you want to Delete the Teacher </h5>
                {Inputfunctions(jsxJson?.delete_classroom_teacher_model)}
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <ButtonComponent
                    type={"button"}
                    className={"btn-outline-secondary px-5"}
                    children={"No"}
                    clickFunction={() => dispatch(updateModalShow({ show: false, close_btn: true, modal_from: "admin", modal_type: "delete_classroom_teacher" })) }
                  />
                  <ButtonComponent
                    type={"button"}
                    className={"btn-danger brand_color px-5 border-0"}
                    clickFunction={()=> dispatch(handleDeleteClassroomTeacher(adminState?.edit_classroom_teacher, adminState?.teachersTableData))}
                    btnDisable={placeholder2}
                    children={
                      placeholder2 ? (
                        <span className="d-flex align-items-center justify-content-center"> 
                          <SpinnerComponent />
                        </span>
                      )
                      : ( "Yes" )
                    }

                  />
                </div>
              </div>
            )
            
          case "delete_classroom_student":
            return (
              <div className="w-100">
                <div className="text-center mb-4">
                  {Icons.delete_model_icon}
                </div>
                <h5 className="text-center">Are you want to Delete this Student </h5>
                {Inputfunctions(jsxJson?.delete_classroom_student_model)}
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <ButtonComponent
                    type={"button"}
                    className={"btn-outline-secondary px-5"}
                    children={"No"}
                    clickFunction={() => dispatch(updateModalShow({ show: false, close_btn: true, modal_from: "admin", modal_type: "delete_classroom_student" })) }
                  />
                  <ButtonComponent
                    type={"button"}
                    className={"btn-danger brand_color px-5 border-0"}
                    clickFunction={() => dispatch(handleDeleteClassroomStudent(adminState?.edit_classroom_student, adminState?.studentsTableData))}
                    btnDisable={placeholder2}
                    children={
                      placeholder2 ?(
                        <span className="d-flex align-items-center justify-content-center"> 
                          <SpinnerComponent />
                        </span>
                      )
                      : 
                      ("Yes")
                    }
                  />
                </div>
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
