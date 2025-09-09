import axiosInstance from "Services/axiosInstance";
import { handledAssignedStudentsTestData, updateSelfTestTotalPageCount, updateAssingnedTestTotalPageCount, handleSelfStudentsTestData, handlePerformanceModalData, updatePersonalInfoInputs, handleEditProfileDetails, handlechangePassword, resetSettingPasswordField } from "../Slice/teachersSlice";
import { update_error, updateModalShow } from "Views/Common/Slices/Common_slice";

export const handleTeacherAssingnedTestResult = (params) => async (dispatch) => {
    try {
        dispatch(handledAssignedStudentsTestData({type: "request"}))
        const { classroom_id, subject_id, page, show_entries} = params
        const { data } = await axiosInstance.post("/teachers/get_students_performance_by_teacher", 
            {
                classroom_id,
                subject_id,
                page,
                show_entries
            }
        )

        if(data?.error_code === 0) {
            dispatch(handledAssignedStudentsTestData({type: "response", data: data?.data.students}))
            dispatch(updateAssingnedTestTotalPageCount(data?.data.total_pages))

        } else{
            dispatch(handledAssignedStudentsTestData({type: "failure", message: data?.message}))
        }
    } catch (Err) {
        dispatch(handledAssignedStudentsTestData({type: "failure", message: Err.message}))
    }
}

export const handleSelfTestResult = (params) => async (dispatch) => {
    try {
        dispatch(handleSelfStudentsTestData({type: "request"}))
        const { classroom_id, subject_id, page, show_entries} = params
        const { data } = await axiosInstance.post("/teachers/get_students_self_test_performance_by_teacher",
            {
                classroom_id,
                subject_id,
                page,
                show_entries
            }
        )

        if(data?.error_code === 0) {
            dispatch(handleSelfStudentsTestData({type: "response", data: data?.data.students}))
            dispatch(updateSelfTestTotalPageCount(data?.data.total_pages))

        } else{
            dispatch(handleSelfStudentsTestData({type: "failure", message: data?.message}))
        }
    } catch (Err) {
        dispatch(handleSelfStudentsTestData({type: "failure", message: Err.message}))
    }
}

export const handlePerformanceModal = (params) => async (dispatch) => {
    try {
        dispatch(handlePerformanceModalData({type: "request"}))
        const { id, date, testType, } = params
        if(testType === "teachers_assigned"){
            const { data } = await axiosInstance.post("/teachers/get_student_performane_by_date", 
                {
                    student_id: id,
                    test_date: date
                }
            )
            if(data?.error_code === 0) {
                dispatch(handlePerformanceModalData({type: "response", data: data?.data}))
            } else{
                dispatch(handlePerformanceModalData({type: "failure", message: data?.message}))
            }
        }
        else {
            const { data } = await axiosInstance.post("/teachers/get_student_self_test_performane_by_date",
                {
                    student_id: id,
                    test_date: date
                }
            )
            if(data?.error_code === 0) {
                dispatch(handlePerformanceModalData({type: "response", data: data?.data}))
    
            } else{
                dispatch(handlePerformanceModalData({type: "failure", message: data?.message}))
            }
        }
    } catch (Err) {
        dispatch(handlePerformanceModalData({type: "failure", message: Err.message}))
    }
}

export const getProfileDetails = () => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get('/teachers/get_profile')
    dispatch(updatePersonalInfoInputs(data?.data))

  } catch (error) {
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
  }
}

export const editProfileDetails = (payload) => async (dispatch) => {
  try {
    dispatch(handleEditProfileDetails({type: "request"}))
    const { data } = await axiosInstance.post('/teachers/edit_profile', payload)
    if (data?.error_code === 0) {
        dispatch(handleEditProfileDetails({type: "response"}))
        dispatch(update_error({ Err: data?.message, Toast_Type: "success" }))
        dispatch(updatePersonalInfoInputs([payload]))
        dispatch(updateModalShow({ show: false }))
    } else {
        dispatch(handleEditProfileDetails({type: "failure"}))
        dispatch(update_error({ Err: data?.message, Toast_Type: "error" }))
    }
  } catch (error) {
    dispatch(handleEditProfileDetails({type: "failure"}))
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
  }
}

export const changePassword = (payload) => async (dispatch) => {
  try {
    dispatch(handlechangePassword({type: "request"}))
    const { data } = await axiosInstance.post('/teachers/update_password', payload)
     if (data?.error_code === 0) {
        dispatch(handlechangePassword({type: "response"}))
        dispatch(update_error({ Err: data?.message, Toast_Type: "success" }));
        dispatch(resetSettingPasswordField())
        dispatch(updateModalShow({ show: false }))
    } else {
        dispatch(handlechangePassword({type: "failure"}))
        dispatch(update_error({ Err: data?.message, Toast_Type: "error" }));
    }
  } catch (error) {
    dispatch(handlechangePassword({type: "failure"}))
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
  }
}