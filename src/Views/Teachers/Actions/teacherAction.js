import axiosInstance from "Services/axiosInstance";
import {
  handleGetClassrooms,
  handleGetClassroomTeachers,
  handleGetStudentOverviewOverallPerfomance,
  handleGetStudentOverviewPerfomance,
  handleGetStudentOverviewSpendingHours,
  handleGetStudentOverviewTestCount,
  handleGetStudentsList,
  handleGetSubjects,
  handleGetTeachers,
  handleTeacherDashboard,
} from "../Slice/teachersSlice";
import { update_app_data, update_error, updateModalShow } from "Views/Common/Slices/Common_slice";


// GET

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

export const getClassrooms = (params) => async (dispatch) => {
  try {
    dispatch(handleGetClassrooms({ type: "request" }));
    const { data } = await axiosInstance.get("/teachers/get_classroom");
    if (data?.error_code === 0) {
      dispatch(handleGetClassrooms({ type: "response", data: data?.data || [] }));
    } else 
    {
      dispatch(handleGetClassrooms({ type: "failure", message: data?.message || "" }));
    }
  } catch (err) {
    dispatch(
      handleGetClassrooms({ type: "failure", message: err?.message || "" })
    );
  }
};

export const getTeachers = (params) => async (dispatch) => {
  try {
    dispatch(handleGetTeachers({ type: "request" }));
    const { data } = await axiosInstance.get("/teachers/get_teachers_list");
    if (data?.error_code === 0) {
      dispatch(handleGetTeachers({ type: "response", data: data?.data || [] }));
    } else 
    {
      dispatch(handleGetTeachers({ type: "failure", message: data?.message || "" }));
    }
  } catch (err) {
    dispatch(
      handleGetTeachers({ type: "failure", message: err?.message || "" })
    );
  }
};

export const getClassroomTeachers = (params) => async (dispatch) => {
  try {
    dispatch(handleGetClassroomTeachers({ type: "request" }));
    const { data } = await axiosInstance.post("/teachers/get_classroom_teachers",params);
    if (data?.error_code === 0) {
      dispatch(handleGetClassroomTeachers({ type: "response", data: data?.data || [] }));
    } else 
    {
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
    const { data } = await axiosInstance.post("/teachers/get_subjects",params);
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

export const GetStudentsList = (params) => async (dispatch) => {
  try {
    dispatch(handleGetStudentsList({ type: "request" }));
    const { data } = await axiosInstance.post("/teachers/get_students_by_subject",params);
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

export const GetStudentOverviewPerfomance = (params) => async (dispatch) => {
  try {
    dispatch(handleGetStudentOverviewPerfomance({ type: "request" }));
    const { data } = await axiosInstance.post("/teachers/get_per_student_performance_by_subject",params);
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
    const { data } = await axiosInstance.post("/teachers/get_per_student_overall_performance",params);
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
    const { data } = await axiosInstance.post("/teachers/get_per_student_test_count",params);
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
    const { data } = await axiosInstance.post("/teachers/get_per_student_spending_hrs",params);
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
      dispatch(updateModalShow({show:false}))
    }

  } catch (error) {
    console.log(error, "error from Register");
  }
};

export const postSubjects = (form_data) => async (dispatch) => {
  const { subject_name, classroom_id,teachers_id, } = form_data;
  if (!subject_name || !teachers_id ||!classroom_id ) {
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
      dispatch(updateModalShow({show:false}))
    }

  } catch (error) {
    console.log(error, "error from post subject");
  }
};

export const postStudents= (form_data) => async (dispatch) => {

  const { student_name, contact_no,student_email,student_reg_no, } = form_data;
  if (!student_name || !contact_no ||!student_email ||!student_reg_no ) {
    return dispatch(update_app_data({ type: "validation", data: true }));
  }

  try {
    const response = await axiosInstance.post("/teachers/edit_student", form_data);

    const { message, success } = response?.data;

    if (!success) {
      dispatch(update_error({ Err: message, Toast_Type: "error" }));
    }
    if (success) {
      dispatch(update_error({ Err: message, Toast_Type: "success" }));
      dispatch(updateModalShow({show:false}))
    }

  } catch (error) {
    console.log(error, "error from post subject");
  }
};


