import axiosInstance from "Services/axiosInstance"
import { clearForm, create_template, create_timetable, delete_timetable, editClassroomData, editClassroomStudentsData, editClassroomTeachersData, editDashboardTeachersData, get_classroom_timetable, get_template, get_timetable_list, getCreateClassroomModalTeachers, handlechangePassword, handleEditProfileDetails, handleGetClassroomChartData, handleGetDashboardChartData, onChangeClassroomForm, setLoading, update_time_table, updateClassroomsOverviewData, updateDashboardOverviewData, updateDashboardTeachersList, updateGetAllClassroomsData, updatePersonalInfoInputs, updateStudentsTableData, updateTeachersTableData } from "../Slices/adminSlice"
import { update_error, updateModalShow } from "Views/Common/Slices/Common_slice"
import sha256 from "sha256"
import { type } from "@testing-library/user-event/dist/type"

export const handleGetAllClassrooms = () => async (dispatch) => {
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
        const { data } = await axiosInstance.post("/admin/get_classroom_details", { "classroom_id": params.id })

        if(data?.error_code === 0) {
            dispatch(updateClassroomsOverviewData({type: "response", data: data?.data}))
        } else{
            dispatch(updateClassroomsOverviewData({type: "failure", message: data?.message}))
        }
    } catch (Err) {
        dispatch(updateClassroomsOverviewData({type: "failure", message: Err.message}))
    }
}

export const handleDashboardOverview = () => async (dispatch) => {
    try {
        dispatch(updateDashboardOverviewData({type: "request"}))
        const { data } = await axiosInstance.get("/admin/get_admin_info")
        if(data?.error_code === 0) {
            dispatch(updateDashboardOverviewData({type: "response", data: data?.data}))
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
    } finally{
        dispatch(updateModalShow({ show: false }))
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

    }finally{
        dispatch(updateModalShow({ show: false }))
    }
};

export const handleGetCreateClassroomModalTeachers = () => async (dispatch) => {
    try {
        dispatch(getCreateClassroomModalTeachers({ type:"request"}))
        const { data } = await axiosInstance.get("admin/get_all_teachers");
        if (data?.error_code === 0) {
            dispatch(getCreateClassroomModalTeachers({ type:"response", data: data?.data}))
        } else {
            dispatch(getCreateClassroomModalTeachers({ type:"failure", message: data?.message}))
        }
    } catch (Err) {
        dispatch(getCreateClassroomModalTeachers({ type:"failure", message: Err.messge || "Somthing went wrong"}))
    }
};

export const createClassroom = (formData) => async (dispatch) => {
  try {
        dispatch(setLoading(true));
        const { data } = await axiosInstance.post("/admin/create_classroom", formData);
        dispatch(clearForm());

        if (data?.error_code === 0) {
            dispatch(setLoading(false));
            dispatch(update_error({ Err: data?.message, Toast_Type: "success" }));
            dispatch(onChangeClassroomForm({field: "teachers", data: []}))
            dispatch(updateModalShow({ show: false }))
            dispatch(handleGetAllClassrooms())
        } else {
            dispatch(setLoading(false));
            dispatch(update_error({ Err: data?.message, Toast_Type: "error" }));
        }
    } catch (error) {
        dispatch(setLoading(false));
        dispatch(update_error({ Err: "Network Error", Toast_Type: "error" }));
    }
};

export const getDashboardTeachersList = (payload) => async (dispatch) => {
      try {
        dispatch(updateDashboardTeachersList({type: "request"}))
        const { data } = await axiosInstance.post("/admin/get_dashboard_teachers", {search_query : payload?.search_query || "" });
        if (data) {
            dispatch(updateDashboardTeachersList({type: "response", data: data?.data?.teachers}))
        } else {
            dispatch(updateDashboardTeachersList({type: "failure", message: data?.message}))
        }
    } catch (error) {
        dispatch(update_error({ Err: "Network Error", Toast_Type: "error" }));
    }
} 


export const handleDashboardTeacherEdit = (params, teachers_list) => async (dispatch) => {
    try {
        const {contact_no,s_no,...rest} = params
        dispatch(editDashboardTeachersData({type: "request"}))
        const { data } = await axiosInstance.post("/admin/edit_teacher",
            {
                ...rest,
                phone_number : contact_no,
            }
        )
        if(data?.error_code === 0) {
            const updated_teachers_list = teachers_list.map((t) =>
                t.teacher_id ===  params.teacher_id ? {...t, ...params} : t
            );
            dispatch(editDashboardTeachersData({type: "response" , data: updated_teachers_list}))
            dispatch(updateModalShow({ show: false }))
            dispatch(update_error({ Err: "Teacher data Updated Successfully", Toast_Type: "success"}))
        } else {
            dispatch(editDashboardTeachersData({type: "failure"}))
        }

    } catch (error) {
        dispatch(update_error({ Err: "Network Error", Toast_Type: "error" }));
    }
}

export const handleDeleteDashboardTeacher = (id, teachers_list) => async (dispatch) => {
    try {
        dispatch(editDashboardTeachersData({type: "request"}))
        const { data } = await axiosInstance.delete(`/admin/delete_teacher?teacher_id=${id}`)
        if(data?.error_code === 0){
            const updated_teachers_list = teachers_list.filter(t => t.teacher_id !== id)
            dispatch(editDashboardTeachersData({type: "response", data: updated_teachers_list}))
            dispatch(updateModalShow({ show: false, close_btn: true, modal_from: "admin", modal_type: "delete_dashboard_teacher" }))
            dispatch(update_error({ Err: "Teacher deleted Successfully", Toast_Type: "success"}))
        } else {
            dispatch(editDashboardTeachersData({type: "failure"}))
        }
    } catch (error) {
        dispatch(update_error({ Err: "Network Error", Toast_Type: "error"}))
    }
}

export const handleClassroomTeacherEdit = (params, classroom_id, teachers_list) => async (dispatch) => {
    try {
        const { contact_no,s_no,  ...rest } = params
        dispatch(editClassroomTeachersData({type: "request"}))
        const { data } = await axiosInstance.post("/admin/edit_teacher_in_classroom", 
            {
                classroom_id: Number(classroom_id),
                phone_number: contact_no,
                ...rest
            }
        )
        if(data?.error_code === 0){
            const updated_teachers_list = teachers_list.map(t => 
                t.teacher_id === params.teacher_id ? {...t, ...params, subject_id: data?.data?.subject_id } : t
            )
            dispatch(editClassroomTeachersData({type: "response", data: updated_teachers_list}))
            dispatch(updateModalShow({ show: false }))
            dispatch(update_error({ Err: data?.message || "Teacher data Updated Successfully", Toast_Type: "success"}))
        } else {
            dispatch(editClassroomTeachersData({type: "failure"}))
            dispatch(update_error({ Err: data?.message, Toast_Type: "error"}))
        }
    } catch (error) {
        dispatch(update_error({ Err: "Network Error", Toast_Type: "error" }))
    }
}

export const handleDeleteClassroomTeacher = (params, classroom_id, teachers_list) => async (dispatch) => {
    try {
        dispatch(editClassroomTeachersData({type: "request"}))
        const { data } = await axiosInstance.delete("/admin/remove_teacher_from_classroom",
            {
                data: {
                    teacher_id : params?.teacher_id,
                    classroom_id : Number(classroom_id),
                    subject_id : params?.subject_id === null ? null : params?.subject_id
                },
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        if(data?.error_code === 0){
            if(data?.data?.subject_id === null){
                const updated_teachers_list = teachers_list.map(t => 
                    t.teacher_id === params.teacher_id ? {...t, ...params, subject_id: null, subject_name: data?.data?.subject_name } : t
                )
                dispatch(editClassroomTeachersData({type: "response", data: updated_teachers_list}))
                dispatch(updateModalShow({show: false }))
                dispatch(update_error({ Err: data?.message || "Teacher deleted Successfully", Toast_Type: "success"}))
            } else {
                const updated_teachers_list = teachers_list.filter(t => 
                    t.teacher_id !== params.teacher_id
                )
                dispatch(editClassroomTeachersData({type: "response", data: updated_teachers_list}))
                dispatch(updateModalShow({show: false }))
                dispatch(update_error({ Err: data?.message || "Teacher deleted Successfully", Toast_Type: "success"}))
            }
        } else {
            dispatch(editClassroomTeachersData({type: "failure"}))
            dispatch(updateModalShow({show: false }))
            dispatch(update_error({ Err: data?.message, Toast_Type: "error"}))
        }
    } catch (error) {
        dispatch(editClassroomTeachersData({type: "failure"}))
        dispatch(update_error({ Err: "Network Error", Toast_Type: "error" }))
    }
} 

export const handleDeleteClassroomStudent = (params, student_list) => async (dispatch) => {
    try {
        dispatch(editClassroomStudentsData({type: "request"}))
        const { data } = await axiosInstance.delete(`/admin/delete_student?student_id=${params.student_id}`)
        if(data?.error_code === 0){
            const updated_student_list = student_list.filter(s => 
                s.student_id !== params.student_id
            )
            dispatch(editClassroomStudentsData({type: "response", data: updated_student_list}))
            dispatch(updateModalShow({show: false}))
            dispatch(update_error({Err: "Student deleted Successfully", Toast_Type: "success"}))
        } else {
            dispatch(editClassroomStudentsData({type: "failure"}))
        }
    } catch (error) {
        dispatch(update_error({ Err: "Network Error", Toast_Type: "error" }))
    }
}

export const handleDeleteClassroom = (params, classroom_list) => async (dispatch) => {
    try {
        dispatch(editClassroomData({type: "request"}))
        const { data } = await axiosInstance.delete(`/admin/delete_classroom?classroom_id=${params.id}`)
        if(data?.error_code === 0){
            const updated_classroom_list = classroom_list.filter(c =>
                c.id !== params.id
            )
            dispatch(editClassroomData({type: "response", data: updated_classroom_list}))
            dispatch(updateModalShow({show: false}))
            dispatch(update_error({Err: "Classroom deleted Successfully", Toast_Type: "success"}))
        } else {
            dispatch(editClassroomData({type: "failure"}))
        }
    } catch (error) {
        dispatch(update_error({ Err: "Network Error", Toast_Type: "error" }))
    }
}

export const getProfileDetails = () => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get('/profile')
    if (data?.error_code === 0) {
        dispatch(updatePersonalInfoInputs(data?.data))
    } else {
        dispatch(update_error({ Err: data?.message, Toast_Type: "error" }));
    }
  } catch (error) {
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
  }
}

export const editProfileDetails = (payload) => async (dispatch) => {
  try {
    dispatch(handleEditProfileDetails({type: "request"}))
    const { data } = await axiosInstance.put('/profile', payload)
    if (data?.error_code === 0) {
        dispatch(handleEditProfileDetails({type: "response", data : payload}))
        dispatch(updatePersonalInfoInputs([payload]))
        dispatch(update_error({ Err: data?.message, Toast_Type: "success" }));
        dispatch(updateModalShow({ show: false }))
    } else {
        dispatch(handleEditProfileDetails({type: "failure"}))
        dispatch(update_error({ Err: data?.message, Toast_Type: "error" }));
    }
  } catch (error) {
    dispatch(handleEditProfileDetails({type: "failure"}))
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
  }
}

export const changePassword = (payload) => async (dispatch) => {
  try {
    dispatch(handlechangePassword({type: "request"}))
    const { data } = await axiosInstance.put('/change_password', 
        {
            old_password : sha256(payload?.old_password),
            new_password : sha256(payload?.new_password),
            confirm_password : sha256(payload?.confirm_password),
        }
    )
     if (data?.error_code === 0) {
        dispatch(handlechangePassword({type: "response"}))
        dispatch(update_error({ Err: data?.message, Toast_Type: "success" }));
    } else {
        dispatch(handlechangePassword({type: "failure"}))
        dispatch(update_error({ Err: data?.message, Toast_Type: "error" }));
    }
  } catch (error) {
    dispatch(handlechangePassword({type: "failure"}))
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
  }
}

export const getDashboardChartData = (payload) => async (dispatch) => {
    try {
        dispatch(handleGetDashboardChartData({type: "request"}))
        const { data } = await axiosInstance.post('/admin/get_monthly_tests', payload)
        if (data?.error_code === 0) {
            dispatch(handleGetDashboardChartData({type: "response", data: data?.data}))
        } else {
            dispatch(handleGetDashboardChartData({type: "failure"}))
        }
    } catch (error) {
        dispatch(handleGetDashboardChartData({type: "failure"}))
    }
}

export const handleClassroomChart = (payload) => async (dispatch) => {
    try {
        dispatch(handleGetClassroomChartData({type: "request"}))
        const { data } = await axiosInstance.post('/admin/get_classroom_test_performance', payload)
        if (data?.error_code === 0) {
            dispatch(handleGetClassroomChartData({type: "response", data: data?.data}))
        } else {
            dispatch(handleGetClassroomChartData({type: "failure"}))
        }

    } catch (error) {
        dispatch(handleGetClassroomChartData({type: "failure"}))
    }
}

export const createTimetaleTemplate = (data) => async (dispatch) => {
    const { method, payload } = data
    try {
        dispatch(create_template({ type: "request" }))
        const { data } = await axiosInstance[method]('/admin/timetable_template', payload)
        if (data.error_code === 0) {
            dispatch(create_template({ type: "response", data: data?.data }))
            dispatch(getTimetableTemplate())
        } else {
            dispatch(create_template({ type: "failure", message: data?.message || "Failed to create template" }))
        }
    } catch (error) {
        dispatch(create_template({ type: "failure", message: error?.response?.data?.message || "Failed to create teamplate" }))
    }
}

export const getTimetableTemplate = () => async (dispatch) => {
    try {
        dispatch(get_template({ type: "request" }))
        const { data } = await axiosInstance.get('/admin/timetable_template')

        if (data?.error_code === 0) {
            const { template } = data?.data
            const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
            const sortedTemplate = Object.keys(template)
                .sort((a, b) => dayOrder.indexOf(a.toLowerCase()) - dayOrder.indexOf(b.toLowerCase()))
                .reduce((acc, key) => {
                    acc[key] = template[key]
                    return acc
                }, {})

            const payloadData = {
                ...data?.data,
                template: sortedTemplate
            }

            dispatch(get_template({ type: "response", data: payloadData }))
        } else {
            dispatch(get_template({ type: "failure",message: data?.message || "Failed to get template"  }))
        }
    } catch (error) {
        dispatch(get_template({ type: "failure",message: error?.response?.data?.message || "Failed to get template"}));
    }
}


export const getTimetableSubjects = (classroom_id)=>async(dispatch)=>{
    try {
        const {data} = await axiosInstance.get(`/admin/get_subjects?classroom_id=${classroom_id}`)
        if(data?.error_code === 0){
            dispatch(update_time_table({subjects:data?.data}))
        }else{
            dispatch(update_time_table({subjects:[]}))
        }
        
    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))      
    }
}


export const getTimeTable = ({ type, id }) => async (dispatch) => {
    try {
        dispatch(get_classroom_timetable({ type: "request" }));
        const { data } = await axiosInstance.get(`/admin/timetable?${type}=${id}`)

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

            const formattedTiming = timing?.map((t, i) => ({ ...t, label: `Period ${i + 1}` }))

            const cleanedData = { timetable: sortedTimetable, timing: formattedTiming }
            dispatch(get_classroom_timetable({ type: "response", data: cleanedData }))
        } else {
            dispatch(get_classroom_timetable({ type: "failure", data: null,message: data?.message || "Failed to get timetable"  }))
        }
    } catch (error) {
        dispatch(get_classroom_timetable({ type: "failure",message: error?.response?.data?.message || "Failed to get timetable" }))
    }
};


export const createTimeTable = (id,type,payload)=> async(dispatch)=>{
    try {
        dispatch(create_timetable({type:"request"}))
         const { data } = await axiosInstance.patch(`/admin/timetable?${type}=${id}`,payload)
         if(data?.error_code === 0){
            dispatch(create_timetable({type:"response"}))
            dispatch(getTimeTable({type,id}))
         }else{
            dispatch(create_timetable({type:"failure",message: data?.message || "failed to edit timetable"}))
         }
    } catch (error) {
        dispatch(create_timetable({type:"failure",message: error?.response?.data?.message || "failed to edit timetable"}))
    }

}

export const getTitmetableList = (view_type) => async (dispatch) => {
    try {
        dispatch(get_timetable_list({ type: "request" }))
        const { data } = await axiosInstance.get(`/admin/get_timetable_list?view_type=${view_type}`)
        if (data?.error_code === 0) {
            dispatch(get_timetable_list({ type: "response", data: data?.data?.timetable_list }))
        } else {
            dispatch(get_timetable_list({ type: "failure",message: data?.message || "Failed to get timetable" }))
        }
    } catch (error) {
        dispatch(get_timetable_list({ type: "failure",message: error?.response?.data?.message || "Failed to get timetable" }))
    }
}

export const getTeacherClassrooms = (id) => async(dispatch)=>{
    try {
        const { data} = await axiosInstance.get(`/admin/get_teacher_classrooms?teacher_id=${id}`)
        if(data?.error_code === 0){
            dispatch(update_time_table({classrooms:data?.data}))
        }else{
             dispatch(update_time_table({classrooms:[]}))
        }
        
    } catch (error) {
         dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    }
}

export const deleteTimetable = ({ type, id }) => async (dispatch) => {
    try {
        dispatch(delete_timetable({ type: "request" }))
        const { data } = await axiosInstance.delete(`admin/timetable?${type}=${id}`)
        if (data?.error_code === 0) {
            dispatch(delete_timetable({ type: "response" }))

        } else {
            dispatch(delete_timetable({ type: "failure", message: data?.message || "Failed to delete timetable" }))
        }

    } catch (error) {
        dispatch(delete_timetable({ type: "failure", message: error?.response?.data?.message || "Failed to delete timetable" }))
    }
}