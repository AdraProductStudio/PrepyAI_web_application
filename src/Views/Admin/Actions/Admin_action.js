import axiosInstance from "Services/axiosInstance"
import { clearForm, setLoading, updateClassroomsOverviewData, updateDashboardOverviewData, updateGetAllClassroomsData, updateStudentsTableData, updateTeachersTableData } from "../Slices/adminSlice"
import { update_error } from "Views/Common/Slices/Common_slice"

export const handleGetAllClassrooms = (params) => async (dispatch) => {
    try {
        dispatch(updateGetAllClassroomsData({type: "request"}))
        const { data } = await axiosInstance.get("/admin/get_classrooms")

        if(data?.error_code === 0) {
            dispatch(updateGetAllClassroomsData({type: "response", data: data?.data}))
        } else{
            dispatch(updateGetAllClassroomsData({type: "failure", message: data?.message}))
        }
    } catch (Err) {
        dispatch(updateGetAllClassroomsData({type: "failure", message: Err.message}))
    }
}

export const handleClassroomOverview = (params) => async (dispatch) => {
    try {
        dispatch(updateClassroomsOverviewData({type: "request"}))
        const { data } = await axiosInstance.post("/admin/get_classroom_count", { "classroom_id": params.id })

        if(data?.error_code === 0) {
            dispatch(updateClassroomsOverviewData({type: "response", data: data?.data[0]}))
        } else{
            dispatch(updateClassroomsOverviewData({type: "failure", message: data?.message}))
        }
    } catch (Err) {
        dispatch(updateClassroomsOverviewData({type: "failure", message: Err.message}))
    }
}

export const handleDashboardOverview = (params) => async (dispatch) => {
    try {
        dispatch(updateDashboardOverviewData({type: "request"}))
        // const { data } = await axiosInstance.post("/admin/get_classroom_count", { "classroom_id": params.id })
        const data = {data:[{total_teachers: 10, total_students: 20, total_classrooms: 30, total_tests: 40}]}
        // if(data?.error_code === 0) {
        if(data) {
            console.log(data)
            dispatch(updateDashboardOverviewData({type: "response", data: data?.data[0]}))
        } else{
            dispatch(updateDashboardOverviewData({type: "failure", message: data?.message}))
        }
    } catch (Err) {
        dispatch(updateDashboardOverviewData({type: "failure", message: Err.message}))
    }
}

export const handleGetTeachersTableData = (params) => async (dispatch) => {
    try {
        dispatch(updateTeachersTableData({type: "request"}))
        const { data } = await axiosInstance.post("/admin/get_teachers_details_by_classrooms", { "classroom_id": Number(params.id) })

        if(data?.error_code === 0) {
            dispatch(updateTeachersTableData({type: "response", data: data?.data}))
        } else{
            dispatch(updateTeachersTableData({type: "failure", message: data?.message}))
        }
    } catch (Err) {
        dispatch(updateTeachersTableData({type: "failure", message: Err.message}))
    }
}

export const handleGetStudentsTableData = (params) => async (dispatch) => {
    try {
        dispatch(updateStudentsTableData({type: "request"}))
        const { data } = await axiosInstance.post("/admin/get_students_details_by_classrooms", { "classroom_id": Number(params.id.id) })

        if(data?.error_code === 0) {
            dispatch(updateStudentsTableData({type: "response", data: data?.data}))
        } else{
            dispatch(updateStudentsTableData({type: "failure", message: data?.message}))
        }
    } catch (Err) {
        dispatch(updateStudentsTableData({type: "failure", message: Err.message}))
    }
}

// File upload action
export const submitStaffFile = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(updateStudentsTableData({type: "request"}))
    const { data } = await axiosInstance.post("/admin/invite_teachers", formData);
    dispatch(clearForm());
    
    if (data?.error_code === 0) {
        dispatch(setLoading(false))
        dispatch(update_error({ Err: data?.message, Toast_Type: "success" }));
    } else {
        dispatch(setLoading(false))
        dispatch(update_error({ Err: data?.message, Toast_Type: "error" }));
    }
  } catch (err) {
        dispatch(setLoading(false))
        dispatch(update_error({ Err: "Network Error", Toast_Type: "error" }));
    }
};

// Manual entry action
export const submitStaffManual = (staffForm) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const { data } = await axiosInstance.post("/admin/invite_teacher", staffForm);
        dispatch(clearForm());
        if (data?.error_code === 0) {
            dispatch(setLoading(false));
            dispatch(update_error({ Err: data?.message, Toast_Type: "success" }));
        } else {
            dispatch(setLoading(false));
            dispatch(update_error({ Err: data?.message, Toast_Type: "error" }));
        }
    } catch (err) {
        dispatch(setLoading(false));
        dispatch(update_error({ Err: "Network Error", Toast_Type: "error" }));

    }
};

export const handleFetchTeachers = (staffForm) => async (dispatch) => {
    // try {
    //     const { data } = await axiosInstance.post("", staffForm);
    //         console.log("data :", data)
    //     if (data?.error_code === 0) {
    //         console.log("data :", data)
    //     } else {
    //         console.log("error in form submit")
    //     }
    // } catch (err) {
    //     console.log("err :", err)
    // }
};

export const createClassroom = (formData) => async (dispatch) => {
  try {
        dispatch(setLoading(true));
        const { data } = await axiosInstance.post("/admin/create_classroom", formData);
        dispatch(clearForm());

        if (data?.error_code === 0) {
            dispatch(setLoading(false));
            dispatch(update_error({ Err: data?.message, Toast_Type: "success" }));
        } else {
            dispatch(setLoading(false));
            dispatch(update_error({ Err: data?.message, Toast_Type: "error" }));
        }
    } catch (error) {
        dispatch(setLoading(false));
        dispatch(update_error({ Err: "Network Error", Toast_Type: "error" }));
    }
};

    
