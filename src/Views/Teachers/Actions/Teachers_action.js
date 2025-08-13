import axiosInstance from "Services/axiosInstance";
import { handledAssignedStudentsTestData, updateSelfTestTotalPageCount, updateAssingnedTestTotalPageCount, handleSelfStudentsTestData } from "../Slice/teachersSlice";

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
        const { data } = await axiosInstance.post("/teachers/get_students_performance_by_teacher", 
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
