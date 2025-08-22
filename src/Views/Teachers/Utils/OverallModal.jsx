import { useCommonState } from "Components/CustomHooks";
import ModalComponent from "Components/Modal/Modal";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import JsonData from "./JsonData";
import ButtonComponent from "Components/Button/Button";
import ButtonSpinner from "Components/Spinner/ButtonSpinner";
import { useDispatch } from "react-redux";
import {
  postClassrooms,
  postStudents,
  postSubjects,
} from "../Actions/teacherAction";
import { useParams } from "react-router-dom";
import Icons from "Utils/Icons";
import { updateModalShow } from "Views/Common/Slices/Common_slice";

export function OverallModel() {
  const { class_id } = useParams();
  const { jsxJson } = JsonData();
  const dispatch = useDispatch();
  const { teachersState, commonState } = useCommonState();

  function modalHeaderFun() {
    switch (commonState?.modal?.from) {
      case "TeacherClassroom":
        switch (commonState?.modal?.type) {
          case "createClassroom":
            return <h5 className="ms-3 mb-0 fw-bold">Create Class Room</h5>;
          default:
            break;
        }
        break;
      case "subjects":
        switch (commonState?.modal?.type) {
          case "subjects":
            return <h5 className="ms-3 mb-0 fw-bold">Add Subject</h5>;
          default:
            break;
        }
        break;
      case "students":
        switch (commonState?.modal?.type) {
          case "studentsEdit":
            return <h5 className="ms-3">Edit Student</h5>;
          case "studentCreateModal":
            return (
              <h5 className="ms-3 mb-0 fw-bold">Add Students</h5>
            )
          
          default:
            break;
        }
      default:
        break;
    }
  }

  function modalBodyFun() {
    switch (commonState?.modal?.from) {
      case "TeacherClassroom":
        switch (commonState?.modal?.type) {
          case "createClassroom":
            return (
              <>
                {" "}
                {Inputfunctions(jsxJson.classroomModal)}
                <ButtonComponent
                  title={"Create"}
                  className="btn-md btn-brand-color p-3 w-100"
                  clickFunction={() =>
                    dispatch(
                      postClassrooms(
                        teachersState?.teacher_PostClassrooms?.data
                      )
                    )
                  }
                  buttonName={"Create"}
                />
              </>
            );

          default:
            break;
        }
        break;
      case "subjects":
        switch (commonState?.modal?.type) {
          case "subjects":
            return (
              <>
                {" "}
                {Inputfunctions(jsxJson.addSubjects)}
                <ButtonComponent
                  className="btn-md btn-brand-color p-3 w-100"
                  buttonName={"Add Subject"}
                  clickFunction={() =>
                    dispatch(
                      postSubjects({
                        subject_name:
                          teachersState?.teacher_PostSubjects?.data
                            ?.subject_name,
                        classroom_id: class_id,
                        teachers_id:
                          teachersState?.teacher_PostSubjects?.data?.teachers,
                      })
                    )
                  }
                />
              </>
            );

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
                <div className=" row pt-3 pe-3 ps-3 w-100">{Inputfunctions(jsxJson.createStudent)}</div>
                <div className="d-flex pt-3 pe-2 ps-3 w-100 gap-3">
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
                      postStudents(teachersState?.teacher_PostStudents?.data)
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
      default:
        break;
    }
  }

  function modalFooterFun() {
    switch (commonState?.modal?.from) {
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
            return;
            break;

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
