import axiosInstance from "Services/axiosInstance";
import {
  get_teacher_timetable,
  handldeGetAllSubjects,
  handldeGetPerfomanceBySubject,
  handleAllClassRooms,
  handleGetClassrooms,
  handleGetClassroomTeachers,
  handleGetStudentOverviewOverallPerfomance,
  handleGetStudentOverviewPerfomance,
  handleGetStudentOverviewSpendingHours,
  handleGetStudentOverviewTestCount,
  handleGetStudentsList,
  handleGetStudentsListBySubject,
  handleGetStudentsListByTeacher,
  handleGetSubjects,
  handleGetTeachers,
  handleGradeByClassroom,
  handleSubjectsByClassroom,
  handleTeacherDashboard, handleTestHistoryGet,
  update_button_spinner
} from "../Slice/teachersSlice";
import { update_app_data, update_error, updateModalShow } from "Views/Common/Slices/Common_slice";
import { getTestRecords } from "./TeacherActions";

const validateStudentForm = (values) => {
  
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  } else if (!/^[A-Za-z\s]+$/.test(values.name)) {
    errors.name = "Name should contain alphabets only";
  }

  if (!values.contact_no) {
    errors.contact_no = "Contact number is required";
  } else if (!/^\d{10}$/.test(values.contact_no)) {
    errors.contact_no = "Contact number must be exactly 10 digits";
  }

  if (!values.email_id) {
    errors.email_id = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email_id)) {
    errors.email_id = "Please enter a valid email address";
  }

  if (!values.register_no) {
    errors.register_no = "Register number is required";
  } else if (!/^[A-Z0-9]+$/.test(values.register_no)) {
    errors.register_no = "Registration number must contain only uppercase letters and numbers";
  }

  if (!values.classroom_name) {
    errors.classroom_name = "Classroom name is required";
  }

  return errors;
};

const validateStudentEditForm = (values) => {
  
  const errors = {};

  if (!values.student_email) {
    errors.student_email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.student_email)) {
    errors.student_email = "Invalid email format";
  }

  if (!values.first_name) {
    errors.first_name = "First name is required";
  } else if (!/^[A-Za-z\s]+$/.test(values.first_name)) {
    errors.first_name = "Only alphabets allowed";
  }

  if (!values.last_name) {
    errors.last_name = "Last name is required";
  } else if (!/^[A-Za-z\s]+$/.test(values.last_name)) {
    errors.last_name = "Only alphabets allowed";
  }

  if (!values.student_reg_no) {
    errors.student_reg_no = "Registration number is required";
  } else if (!/^[A-Z0-9]+$/.test(values.student_reg_no)) {
    errors.student_reg_no = "Only uppercase letters and numbers allowed";
  }


  if (!values.contact_no) {
    errors.contact_no = "Contact number is required";
  } else if (!/^\d{10}$/.test(values.contact_no)) {
    errors.contact_no = "Contact number must be exactly 10 digits";
  }

  return errors;
};

const validateClassroomForm = (values) => {
  
  const errors = {};

  if (!values.classroom_name) {
    errors.classroom_name = "Classroom name is required";
  }
  if (!values.teachers || values.teachers.length === 0) {
    errors.teachers = "Teachers is required";
  }
  
  if (!values.student_file) {
    errors.student_file = "Student List is required";
  }

  return errors;
};

const validateSubjectForm = (values) => {
  
  const errors = {};

  if (!values.teachers_id) {
    errors.teachers = "Teachers is required";
  }

  if(!values.subject_name) {
    errors.subject_name = "Subject name is required";
  }

  return errors;
};


// GET
export const getTeachers = () => async (dispatch) => {
  try {
    dispatch(handleGetTeachers({ type: "request" }))
    const { data } = await axiosInstance.get("/teachers/get_teachers_list");
    if (data?.error_code === 0) {
      dispatch(handleGetTeachers({ type: "response", data: data?.data || [] }));
    } else {
      dispatch(handleGetTeachers({ type: "failure", message: data?.message || "" }));
    }
  } catch (err) {
    dispatch(handleGetTeachers({ type: "failure", message: err?.message || "" }));
  }
};

export const getTeacherDashboardDatas = (params) => async (dispatch) => {
  try {
    dispatch(handleTeacherDashboard({ type: "request" }));
    const { data } = await axiosInstance.get("/teachers/dashboard");
    if (data?.error_code === 0) {
      dispatch(
        handleTeacherDashboard({ type: "response", data: data?.data || [] })
      );
    } else {
      dispatch(
        handleTeacherDashboard({
          type: "failure",
          message: data?.message || "",
        })
      );
    }
  } catch (err) {
    dispatch(
      handleTeacherDashboard({ type: "failure", message: err?.message || "" })
    );
  }
};

export const getAllClassRooms = (params) => async (dispatch) => {
  try {
    dispatch(handleAllClassRooms({ type: "request" }));
    const { data } = await axiosInstance.get("/teachers/get_all_classrooms");
    if (data?.error_code === 0) {
      dispatch(
        handleAllClassRooms({ type: "response", data: data?.data || [] })
      );
    } else {
      dispatch(
        handleAllClassRooms({
          type: "failure",
          message: data?.message || "",
        })
      );
    }
  } catch (err) {
    dispatch(
      handleAllClassRooms({ type: "failure", message: err?.message || "" })
    );
  }
};

export const getGradeByClassroom = (params) => async (dispatch) => {
  try {
    dispatch(handleGradeByClassroom({ type: "request" }));
    const { data } = await axiosInstance.post("/teachers/classroom_performance", { classroom_id: params?.classroom_id[0] });
    if (data?.error_code === 0) {
      dispatch(
        handleGradeByClassroom({ type: "response", data: data?.data || [] })
      );
    } else {
      dispatch(
        handleGradeByClassroom({
          type: "failure",
          message: data?.message || "",
        })
      );
    }
  } catch (err) {
    dispatch(
      handleGradeByClassroom({ type: "failure", message: err?.message || "" })
    );
  }
};

export const getSubjectByClassroom = (params) => async (dispatch) => {
  try {
    dispatch(handleSubjectsByClassroom({ type: "request" }));
    const { data } = await axiosInstance.post("/teachers/classroom_performance", { classroom_id: params?.classroom_id[0] });
    if (data?.error_code === 0) {
      dispatch(
        handleSubjectsByClassroom({ type: "response", data: data?.data || [] })
      );
    } else {
      dispatch(
        handleSubjectsByClassroom({
          type: "failure",
          message: data?.message || "",
        })
      );
    }
  } catch (err) {
    dispatch(
      handleSubjectsByClassroom({ type: "failure", message: err?.message || "" })
    );
  }
};

export const getClassrooms = (params) => async (dispatch) => {
  try {
    dispatch(handleGetClassrooms({ type: "request" }));
    const { data } = await axiosInstance.get("/teachers/get_classroom");

    if (data?.error_code === 0) {
      dispatch(handleGetClassrooms({ type: "response", data: data?.data?.classrooms || [] }));
    } else {
      dispatch(handleGetClassrooms({ type: "failure", message: data?.message || "" }));
    }
  } catch (err) {
    dispatch(
      handleGetClassrooms({ type: "failure", message: err?.message || "" })
    );
  }
};

export const getClassroomTeachers = (params) => async (dispatch) => {
  try {
    dispatch(handleGetClassroomTeachers({ type: "request" }));
    const { data } = await axiosInstance.post("/teachers/get_classroom_teachers", params);
    if (data?.error_code === 0) {
      dispatch(handleGetClassroomTeachers({ type: "response", data: data?.data || [] }));
    } else {
      dispatch(handleGetClassroomTeachers({ type: "failure", message: data?.message || "" }));
    }
  } catch (err) {
    dispatch(handleGetClassroomTeachers({ type: "failure", message: err?.message || "" })
    );
  }
};

export const getSubjects = (params) => async (dispatch) => {
  try {
    dispatch(handleGetSubjects({ type: "request" }));
    const { data } = await axiosInstance.post("/teachers/get_subjects", params);
    if (data?.error_code === 0) {
      dispatch(
        handleGetSubjects({ type: "response", data: data?.data || [] })
      );
    } else {
      dispatch(
        handleGetSubjects({ type: "failure", message: data?.message || "" })
      );
    }
  } catch (err) {
    dispatch(
      handleGetSubjects({ type: "failure", message: err?.message || "" })
    );
  }
};

export const GetStudentsListBySubject = (params) => async (dispatch) => {
  try {
    dispatch(handleGetStudentsListBySubject({ type: "request" }));
    const { data } = await axiosInstance.post("/teachers/get_students_by_subject", params);
    if (data?.error_code === 0) {
      dispatch(
        handleGetStudentsListBySubject({ type: "response", data: data?.data || [] })
      );
    } else {
      dispatch(
        handleGetStudentsListBySubject({ type: "failure", message: data?.message || "" })
      );
    }
  } catch (err) {
    dispatch(
      handleGetStudentsListBySubject({ type: "failure", message: err?.message || "" })
    );
  }
};

export const GetStudentsListByTeacher = (params) => async (dispatch) => {
  try {
    dispatch(handleGetStudentsListByTeacher({ type: "request" }));
    const { data } = await axiosInstance.post("/teachers/get_students_by_teacher", params);
    if (data?.error_code === 0) {
      dispatch(
        handleGetStudentsListByTeacher({ type: "response", data: data?.data || [] })
      );
    } else {
      dispatch(
        handleGetStudentsListByTeacher({ type: "failure", message: data?.message || "" })
      );
    }
  } catch (err) {
    dispatch(
      handleGetStudentsListByTeacher({ type: "failure", message: err?.message || "" })
    );
  }
};

export const GetStudentOverviewPerfomance = (params) => async (dispatch) => {
  try {
    dispatch(handleGetStudentOverviewPerfomance({ type: "request" }));
    const { data } = await axiosInstance.post("/teachers/get_per_student_performance_by_subject", params);
    if (data?.error_code === 0) {
      dispatch(
        handleGetStudentOverviewPerfomance({ type: "response", data: data?.data || [] })
      );
    } else {
      dispatch(
        handleGetStudentOverviewPerfomance({ type: "failure", message: data?.message || "" })
      );
    }
  } catch (err) {
    dispatch(
      handleGetStudentOverviewPerfomance({ type: "failure", message: err?.message || "" })
    );
  }
};

export const GetStudentOverviewOverallPerfomance = (params) => async (dispatch) => {
  try {
    dispatch(handleGetStudentOverviewOverallPerfomance({ type: "request" }));
    const { data } = await axiosInstance.post("/teachers/get_per_student_overall_performance", params);
    if (data?.error_code === 0) {
      dispatch(
        handleGetStudentOverviewOverallPerfomance({ type: "response", data: data?.data || [] })
      );
    } else {
      dispatch(
        handleGetStudentOverviewOverallPerfomance({ type: "failure", message: data?.message || "" })
      );
    }
  } catch (err) {
    dispatch(
      handleGetStudentOverviewOverallPerfomance({ type: "failure", message: err?.message || "" })
    );
  }
};

export const GetStudentOverviewTestCount = (params) => async (dispatch) => {
  try {
    dispatch(handleGetStudentOverviewTestCount({ type: "request" }));
    const { data } = await axiosInstance.post("/teachers/get_per_student_test_count", params);
    if (data?.error_code === 0) {
      dispatch(
        handleGetStudentOverviewTestCount({ type: "response", data: data?.data || [] })
      );
    } else {
      dispatch(
        handleGetStudentOverviewTestCount({ type: "failure", message: data?.message || "" })
      );
    }
  } catch (err) {
    dispatch(
      handleGetStudentOverviewTestCount({ type: "failure", message: err?.message || "" })
    );
  }
};

export const GetStudentOverviewSpendingHours = (params) => async (dispatch) => {
  try {
    dispatch(handleGetStudentOverviewSpendingHours({ type: "request" }));
    const { data } = await axiosInstance.post("/teachers/get_per_student_spending_hrs", params);
    if (data?.error_code === 0) {
      dispatch(
        handleGetStudentOverviewSpendingHours({ type: "response", data: data?.data || [] })
      );
    } else {
      dispatch(
        handleGetStudentOverviewSpendingHours({ type: "failure", message: data?.message || "" })
      );
    }
  } catch (err) {
    dispatch(
      handleGetStudentOverviewSpendingHours({ type: "failure", message: err?.message || "" })
    );
  }
};

export const GetStudentsList = (params) => async (dispatch) => {
  try {
    dispatch(handleGetStudentsList({ type: "request" }));
    const { data } = await axiosInstance.post("/teachers/get_students_by_subject", params);
    if (data?.error_code === 0) {
      dispatch(
        handleGetStudentsList({ type: "response", data: data?.data || [] })
      );
    } else {
      dispatch(
        handleGetStudentsList({ type: "failure", message: data?.message || "" })
      );
    }
  } catch (err) {
    dispatch(
      handleGetStudentsList({ type: "failure", message: err?.message || "" })
    );
  }
};

export const GetPerformanceBysubject = (params) => async (dispatch) => {
  try {
    dispatch(handldeGetPerfomanceBySubject({ type: "request" }));
    const { data } = await axiosInstance.post("/teachers/get_student_performance_by_subject", { classroom_id: params?.classroom_id[0], subject_id: params?.subject_id[0] });
    if (data?.error_code === 0) {
      dispatch(
        handldeGetPerfomanceBySubject({ type: "response", data: data?.data || [] })
      );
    } else {
      dispatch(
        handldeGetPerfomanceBySubject({ type: "failure", message: data?.message || "" })
      );
    }
  } catch (err) {
    dispatch(
      handldeGetPerfomanceBySubject({ type: "failure", message: err?.message || "" })
    );
  }
}

export const GetAllsubjects = (params) => async (dispatch) => {
  try {
    dispatch(handldeGetAllSubjects({ type: "request" }));
    const { data } = await axiosInstance.get("/teachers/get_all_subjects", {});
    if (data?.error_code === 0) {
      dispatch(
        handldeGetAllSubjects({ type: "response", data: data?.data || [] })
      );
    } else {
      dispatch(
        handldeGetAllSubjects({ type: "failure", message: data?.message || "" })
      );
    }
  } catch (err) {
    dispatch(
      handldeGetAllSubjects({ type: "failure", message: err?.message || "" })
    );
  }
}

// POST

export const postClassrooms = (form_data) => async (dispatch) => {
  const { classroom_name, teachers, student_file } = form_data;
      const errors = validateClassroomForm(form_data || {});

      if (Object.keys(errors).length > 0) {
        dispatch(update_app_data({ type: "validation", data: true }));
        dispatch(update_app_data({ type: "validationMessage", data: errors }));
        return; 
      }

  try {
    const formData = new FormData();

    formData.append("classroom_name", classroom_name);

    formData.append("teachers", JSON.stringify(teachers));

    formData.append("student_file", student_file[0]);
    dispatch(update_button_spinner({status:true}))
    const response = await axiosInstance.post("/teachers/create_classroom", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(update_button_spinner({status:false}))

    const { message, success } = response?.data;

    if (!success) {
      dispatch(update_error({ Err: message, Toast_Type: "error" }));
    }
    if (success) {
      dispatch(update_error({ Err: message, Toast_Type: "success" }));
      dispatch(getClassrooms());
      dispatch(getTeachers());
      dispatch(updateModalShow({ show: false }))
    }
  } catch (error) {
    console.warn(error, "error from Register");
  }
};

export const postSubjects = (form_data) => async (dispatch) => {
  const {classroom_id } = form_data;
  // console.log(teachers_id,subject_name,"sadasdew")
  // if (!subject_name || !teachers_id || !classroom_id) {
  //   return dispatch(update_app_data({ type: "validation", data: true }));
  // }

  const errors = validateSubjectForm(form_data || {});

  if (Object.keys(errors).length > 0) {
    dispatch(update_app_data({ type: "validation", data: true }));
    dispatch(update_app_data({ type: "validationMessage", data: errors }));
    return; 
  }

  try {
    dispatch(update_button_spinner({status:true}))
    const response = await axiosInstance.post("/teachers/add_subject", form_data);
    dispatch(update_button_spinner({status:false}))
    const { message, success } = response?.data;

    if (!success) {
      dispatch(update_error({ Err: message, Toast_Type: "error" }));
    }
    if (success) {
      dispatch(update_error({ Err: message, Toast_Type: "success" }));
      dispatch(getSubjects({ classroom_id }))
      dispatch(updateModalShow({ show: false }))
    }

  } catch (error) {
    console.warn(error, "error from post subject");
  }
};

export const postStudents = (form_data) => async (dispatch) => {

  const { student_name, contact_no, student_email, student_reg_no, } = form_data?.data;
  const id = form_data?.getdata?.id;
  const id_from = form_data?.getdata?.from;
  const pagination = form_data?.getdata?.pagination;
  // const student_id = form_data?.getdata?.student_id;

   const errors = validateStudentEditForm(form_data?.data || {});

   if (Object.keys(errors).length > 0) {
    dispatch(update_app_data({ type: "validation", data: true }));
    dispatch(update_app_data({ type: "validationMessage", data: errors }));
    return; 
  }
 
  try {
    dispatch(update_button_spinner({status:true}))
    const response = await axiosInstance.post("/teachers/edit_student", form_data?.data);
    dispatch(update_button_spinner({status:false}))
    const { message, success } = response?.data;

    if (!success) {
      dispatch(update_error({ Err: message, Toast_Type: "error" }));
    }
    if (success) {
      dispatch(update_error({ Err: message, Toast_Type: "success" }));
      if (id_from === "classroom") {
        dispatch(
          GetStudentsListByTeacher({
            classroom_id: ["all_classrooms"],
            search_query: pagination?.search_query,
            show_entries: pagination?.show_entries,
            page: pagination?.page,
            sort_by: "joined_at",
            sort_order: "asc",
          })
        );
      } else if (id_from === "student") {
        dispatch(
          GetStudentsListBySubject({
            subject_id: id,
            search_query: pagination?.search_query,
            show_entries: pagination?.show_entries,
            page: pagination?.page,
            sort_by: "joined_at",
            sort_order: "asc",
          })
        );
      }
      dispatch(updateModalShow({ show: false }))
    }

  } catch (error) {
    console.warn(error, "error from post subject");
  }
};

export const postCreateStudent = (form_data) => async (dispatch) => {
  const { name, contact_no, email_id, register_no, classroom_name } = form_data;
  console.log(form_data,"Dasdasdas")

  let response;

  try {
    if (form_data?.student_file) {

      if (!form_data?.student_file) {
        return dispatch(update_app_data({ type: "validation", data: true }));
      }

      const formData = new FormData();
      formData.append("student_file", form_data?.student_file[0]);
      dispatch(update_button_spinner({status:true}))
      response = await axiosInstance.post("/teachers/add_students", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(update_button_spinner({status:false}))
    } else {
      const errors = validateStudentForm(form_data || {});

      console.log("Validation errors:", errors);


      if (Object.keys(errors).length > 0) {
        dispatch(update_app_data({ type: "validation", data: true }));
        dispatch(update_app_data({ type: "validationMessage", data: errors }));
        return; 
      }
      dispatch(update_button_spinner({status:true}))
      response = await axiosInstance.post("/teachers/add_student", form_data);
      dispatch(update_button_spinner({status:false}))
    }

    const { message, success } = response?.data;

    if (!success) {
      dispatch(update_error({ Err: message, Toast_Type: "error" }));
    }
    if (success) {
      dispatch(update_error({ Err: message, Toast_Type: "success" }));
      dispatch(updateModalShow({ show: false }));
    }

  } catch (error) {
    console.log(error, "error from create student");
  }
}


// Delete

export const deleteStudents = (data) => async (dispatch) => {
  const id = data?.id;
  const id_from = data?.from;
  const pagination = data?.pagination;
  const student_id = data?.student_id;
  let response;

  try {
    switch (id_from) {
      case "student":
        dispatch(update_button_spinner({status:true}))
        response = await axiosInstance.post("/teachers/delete_student", {
          student_id,
        });
        dispatch(update_button_spinner({status:false}))
        break;

      case "classroom":
        dispatch(update_button_spinner({status:true}))
        response = await axiosInstance.post("/teachers/delete_student", {
          student_id,
        });
        dispatch(update_button_spinner({status:false}))
        break;

      default:
        return;
    }

    const { message, success } = response?.data || {};

    if (!success) {
      return dispatch(update_error({ Err: message, Toast_Type: "error" }));
    }
    dispatch(update_error({ Err: message, Toast_Type: "success" }));

    if (id_from === "classroom") {
      dispatch(
        GetStudentsListByTeacher({
          classroom_id: ["all_classrooms"],
          search_query: pagination?.search_query,
          show_entries: pagination?.show_entries,
          page: pagination?.page,
          sort_by: "joined_at",
          sort_order: "asc",
        })
      );
    } else if (id_from === "student") {
      dispatch(
        GetStudentsListBySubject({
          subject_id: id,
          search_query: pagination?.search_query,
          show_entries: pagination?.show_entries,
          page: pagination?.page,
          sort_by: "joined_at",
          sort_order: "asc",
        })
      );
    }

    dispatch(updateModalShow({ show: false }));
  } catch (error) {
    console.error("Error while deleting student:", error);
    dispatch(update_error({ Err: "Something went wrong", Toast_Type: "error" }));
  }
};

export const deleteSubjects = (id,classroom_id) => async (dispatch) => {

  try {
    dispatch(update_button_spinner({status:true}))
    const response = await axiosInstance.delete(`/teachers/delete_subject?subject_id=${id}`);
    dispatch(update_button_spinner({status:false}))
    const { message, success } = response?.data;
    if (!success) {
      dispatch(update_error({ Err: message, Toast_Type: "error" }));
    }
    if (success) {
      dispatch(update_error({ Err: message, Toast_Type: "success" }));
      dispatch(getSubjects({classroom_id}))
      dispatch(getAllClassRooms())
      dispatch(updateModalShow({ show: false }));
    }
  } catch (error) {
    console.warn(error, "error from delete subject");
  }
}

export const deleteClassrooms = (id) => async (dispatch) => {

  try {
    dispatch(update_button_spinner({status:true}))
    const response = await axiosInstance.delete(`/teachers/delete_classroom?classroom_id=${id}`);
    dispatch(update_button_spinner({status:false}))
    const { message, success } = response?.data;
    if (!success) {
      dispatch(update_error({ Err: message, Toast_Type: "error" }));
    }
    if (success) {
      dispatch(update_error({ Err: message, Toast_Type: "success" }));
      dispatch(getClassrooms())
      dispatch(updateModalShow({ show: false }));
    }
  } catch (error) {
    console.log(error, "error from delete subject");
  }
};

export const deleteUpcomingTest = (data) => async (dispatch) => {
  const { id, subject_id, status } = data;

  try {

    dispatch(update_button_spinner({ status: true }));

    let response = {};
    if (status) {
      if (status === "cancelled") {
        response = await axiosInstance.delete(
          `teachers/delete_test?test_id=${id}`
        );
      } else {
        response = await axiosInstance.delete(
          `teachers/cancel_test?test_id=${id}`
        );
      }
    }

    dispatch(update_button_spinner({ status: false }));
    const { message, success } = response?.data;
    if (!success) {
      dispatch(update_error({ Err: message, Toast_Type: "error" }));
    }
    if (success) {
      dispatch(update_error({ Err: message, Toast_Type: "success" }));
      if (status) {
        if (status === "cancelled") {
          dispatch(getTestRecords({ subject_id, type: "cancelled" }));
        } else {
          dispatch(getTestRecords({ subject_id, type: "upcoming" }));
        }
      }
      dispatch(updateModalShow({ show: false }));
    }
  } catch (error) {
    console.log(error, "error from delete Upcoming Test");
  }
};

export const getTestHistory = (params) => async (dispatch) => {
  try {
    dispatch(handleTestHistoryGet({ type: "request" }));
    const { data } = await axiosInstance.post(
      "/teachers/get_students_by_test",
      params
    );

    if (data?.error_code === 0)
      dispatch(
        handleTestHistoryGet({ type: "response", data: data?.data || [] })
      );
    else
      dispatch(
        handleTestHistoryGet({ type: "failure", message: data?.message || "" })
      );
  } catch (err) {
    dispatch(
      handleTestHistoryGet({ type: "failure", message: err?.message || "" })
    );
  }
};

export const getTeacherTimetable = () => async (dispatch) => {
  try {
    dispatch(get_teacher_timetable({ type: "request" }))
    const { data } = await axiosInstance.get('teachers/timetable')
    if (data?.error_code === 0) {
      let { timetable, timing } = data?.data
      const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      const sortedTimetable = Object.keys(timetable).sort((a, b) =>
        (dayOrder.indexOf(a.toLowerCase()) === -1 ? 99 : dayOrder.indexOf(a.toLowerCase())) -
        (dayOrder.indexOf(b.toLowerCase()) === -1 ? 99 : dayOrder.indexOf(b.toLowerCase()))
      ).reduce((acc, key) => {
        acc[key] = timetable[key]
        return acc
      }, {})
      dispatch(get_teacher_timetable({ type: "response",data:{timetable:sortedTimetable,timing} }))
    } else {
      dispatch(get_teacher_timetable({ type: "failure", message: data?.message || "Failed to get timetable" }))
    }

  } catch (error) {
    dispatch(get_teacher_timetable({ type: "failure", message: error?.response?.data?.message || "Failed to get timetable" }))
  }
}