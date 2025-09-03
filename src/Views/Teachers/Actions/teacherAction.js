import axiosInstance from "Services/axiosInstance";
import {
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
  handleTeacherDashboard, handleTestHistoryGet
} from "../Slice/teachersSlice";
import { update_app_data, update_error, updateModalShow } from "Views/Common/Slices/Common_slice";


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
  if (!classroom_name || !teachers?.length || !student_file) {
    return dispatch(update_app_data({ type: "validation", data: true }));
  }

  try {
    const formData = new FormData();

    formData.append("classroom_name", classroom_name);

    formData.append("teachers", JSON.stringify(teachers));

    formData.append("student_file", student_file[0]);

    const response = await axiosInstance.post("/teachers/create_classroom", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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
  const { subject_name, classroom_id, teachers_id, } = form_data;
  if (!subject_name || !teachers_id || !classroom_id) {
    return dispatch(update_app_data({ type: "validation", data: true }));
  }

  try {
    const response = await axiosInstance.post("/teachers/add_subject", form_data);

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
  const student_id = form_data?.getdata?.student_id;

  if (!student_name || !contact_no || !student_email || !student_reg_no) {
    return dispatch(update_app_data({ type: "validation", data: true }));
  }
  
  try {
    const response = await axiosInstance.post("/teachers/edit_student", form_data?.data);

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

  let response;

  try {
    if (form_data?.student_file) {
      if (!form_data?.student_file) {
        return dispatch(update_app_data({ type: "validation", data: true }));
      }

      const formData = new FormData();
      formData.append("student_file", form_data?.student_file[0]);
      response = await axiosInstance.post("/teachers/add_students", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      if (!name || !contact_no || !email_id || !register_no || !classroom_name) {
        return dispatch(update_app_data({ type: "validation", data: true }));
      }
      response = await axiosInstance.post("/teachers/add_student", form_data);
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
  if (!id || !id_from) {
    return dispatch(update_app_data({ type: "validation", data: true }));
  }

  try {
    switch (id_from) {
      case "student":
        response = await axiosInstance.post("/teachers/delete_student", {
          student_id,
        });
        break;

      case "classroom":
        response = await axiosInstance.post("/teachers/delete_student", {
          student_id,
        });
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

export const deleteSubjects = (id) => async (dispatch) => {
  if (!id) {
    return dispatch(update_app_data({ type: "validation", data: true }));
  }

  try {
    const response = await axiosInstance.delete(`/teachers/delete_subject?subject_id=${id}`);
    const { message, success } = response?.data;
    if (!success) {
      dispatch(update_error({ Err: message, Toast_Type: "error" }));
    }
    if (success) {
      dispatch(update_error({ Err: message, Toast_Type: "success" }));
      dispatch(getSubjects())
      dispatch(getAllClassRooms())
      dispatch(updateModalShow({ show: false }));
    }
  } catch (error) {
    console.warn(error, "error from delete subject");
  }
}

export const deleteClassrooms = (id) => async (dispatch) => {
  if (!id) {
    return dispatch(update_app_data({ type: "validation", data: true }));
  }

  try {
    const response = await axiosInstance.delete(`/teachers/delete_classroom?classroom_id=${id}`);
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

export const getTestHistory = (params) => async (dispatch) => {
  try {
    dispatch(handleTestHistoryGet({ type: "request" }))
    const { data } = await axiosInstance.post("/teachers/get_students_by_test", params);

    if (data?.error_code === 0) dispatch(handleTestHistoryGet({ type: "response", data: data?.data || [] }));
    else dispatch(handleTestHistoryGet({ type: "failure", message: data?.message || "" }));
  }
  catch (err) {
    dispatch(handleTestHistoryGet({ type: "failure", message: err?.message || "" }));
  }
}