import axiosInstance from "Services/axiosInstance";
import {
  handleGetClassrooms,
  handleGetStudentsList,
  handleGetSubjects,
  handleTeacherDashboard,
} from "../Slice/teachersSlice";

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
