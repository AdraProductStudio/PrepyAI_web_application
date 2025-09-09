import axiosInstance from "Services/axiosInstance"
import { clearForm, editClassroomStudentsData, editClassroomTeachersData, editDashboardTeachersData, getCreateClassroomModalTeachers, handlechangePassword, handleEditProfileDetails, handleGetClassroomChartData, handleGetDashboardChartData, onChangeClassroomForm, setLoading, updateClassroomsOverviewData, updateDashboardOverviewData, updateDashboardTeachersList, updateGetAllClassroomsData, updatePersonalInfoInputs, updateStudentsTableData, updateTeachersTableData } from "../Slices/adminSlice"
import { update_error, updateModalShow } from "Views/Common/Slices/Common_slice"

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
        setTimeout(()=>{
            const data = {data:[{total_teachers: 10, total_students: 20, total_classrooms: 30, total_tests: 40}]}
            // if(data?.error_code === 0) {
            if(data) {
                dispatch(updateDashboardOverviewData({type: "response", data: data?.data[0]}))
            } else{
                dispatch(updateDashboardOverviewData({type: "failure", message: data?.message}))
            }
        }, 10000)
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
    // dispatch(updateStudentsTableData({type: "request"}))
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
        } else {
            dispatch(setLoading(false));
            dispatch(update_error({ Err: data?.message, Toast_Type: "error" }));
        }
    } catch (error) {
        dispatch(setLoading(false));
        dispatch(update_error({ Err: "Network Error", Toast_Type: "error" }));
    }
};

export const getDashboardTeachersList = () => async (dispatch) => {
      try {
        dispatch(updateDashboardTeachersList({type: "request"}))
        // const { data } = await axiosInstance.get("");
        setTimeout( () => {
            const data = [
                { s_no: 1, staff_name: "John Doe1", institute_name: "ABC Institute", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
                { s_no: 2, staff_name: "John Doe2", institute_name: "ABC Institute", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
                { s_no: 3, staff_name: "John Doe3", institute_name: "ABC Institute", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
                { s_no: 4, staff_name: "John Doe4", institute_name: "ABC Institute", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
                { s_no: 5, staff_name: "John Doe5", institute_name: "ABC Institute", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
                { s_no: 6, staff_name: "John Doe6", institute_name: "ABC Institute", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
            ]
            if (data) {
                dispatch(updateDashboardTeachersList({type: "response", data: data}))
            } else {
                dispatch(updateDashboardTeachersList({type: "failure", message: data?.message}))
            }
        } , 500)
    } catch (error) {
        dispatch(update_error({ Err: "Network Error", Toast_Type: "error" }));
    }
} 


export const handleDashboardTeacherEdit = (params, teachers_list) => async (dispatch) => {
    // console.log("params", params)
    // console.log("teachers_list", teachers_list)
    try {
        dispatch(editDashboardTeachersData({type: "request"}))
        // const { data } = await axiosInstance.post("", params)
        // if(data?.error_code === 0) {
        setTimeout(()=>{
            if(true) {
                const updated_teachers_list = teachers_list.map((t) =>
                    t.s_no ===  params.s_no ? {...t, ...params} : t
                );
                // console.log("edited_teachers_list :", edited_teachers_list)
                dispatch(editDashboardTeachersData({type: "response" , data: updated_teachers_list}))
                dispatch(updateModalShow({ show: false, close_btn: true, modal_from: "admin", modal_type: "edit_dashboard_teacher" }))
                dispatch(update_error({ Err: "Teacher data Updated Successfully", Toast_Type: "success"}))
    
            } else {
                dispatch(editDashboardTeachersData({type: "failure"}))
            }
        } , 2000)

    } catch (error) {
        dispatch(update_error({ Err: "Network Error", Toast_Type: "error" }));
    }
}

export const handleDeleteDashboardTeacher = (id, teachers_list) => async (dispatch) => {
    try {
        dispatch(editDashboardTeachersData({type: "request"}))
        // // const { data } = await axiosInstance.post("", params)
        // // if(data?.error_code === 0){
        setTimeout(()=> {
            if (true) {
                const updated_teachers_list = teachers_list.filter(t => t.s_no !== id)
                dispatch(editDashboardTeachersData({type: "response", data: updated_teachers_list}))
                dispatch(updateModalShow({ show: false, close_btn: true, modal_from: "admin", modal_type: "delete_dashboard_teacher" }))
                dispatch(update_error({ Err: "Teacher deleted Successfully", Toast_Type: "success"}))
            } else {
                dispatch(editDashboardTeachersData({type: "failure"}))
            }
        }, 2000)
    } catch (error) {
        dispatch(update_error({ Err: "Network Error", Toast_Type: "error"}))
    }
}

export const handleClassroomTeacherEdit = (params, teachers_list) => async (dispatch) => {
    // console.log("params :", params)
    // console.log("teachers_list :", teachers_list)
    try {
        dispatch(editClassroomTeachersData({type: "request"}))
        // const { data } = await axiosInstance.post("", params)
        // if(data?.error_code === 0){
        setTimeout(() => {
            if(true) {
                const updated_teachers_list = teachers_list.map(t => 
                    t.s_no === params.s_no ? {...t, ...params} : t
                )
                // console.log("updated_teachers_list :", updated_teachers_list)
                dispatch(editClassroomTeachersData({type: "response", data: updated_teachers_list}))
                dispatch(updateModalShow({ show: false, close_btn: true, modal_from: "admin", modal_type: "edit_classroom_teacher" }))
                dispatch(update_error({ Err: "Teacher data Updated Successfully", Toast_Type: "success"}))
            } else {
                dispatch(editClassroomTeachersData({type: "failure"}))
            }
        }, 2000)
        
    } catch (error) {
        dispatch(update_error({ Err: "Network Error", Toast_Type: "error" }))
    }
}

export const handleDeleteClassroomTeacher = (params, teachers_list) => async (dispatch) => {
    try {
        dispatch(editClassroomTeachersData({type: "request"}))
        // const { data } = await axiosInstance.delete("", params)
        // if(data?.error_code === 0){
        setTimeout(()=> {
            if(true){
                const updated_teachers_list = teachers_list.filter(t => 
                    t.s_no !== params.s_no
                )
                dispatch(editClassroomTeachersData({type: "response", data: updated_teachers_list}))
                dispatch(updateModalShow({show: false, closebtn: true, modal_from: "admin", modal_type: "delete_classroom_teacher"}))
                dispatch(update_error({ Err: "Teacher deleted Successfully ", Toast_Type: "success"}))
            } else {
                dispatch(editClassroomTeachersData({type: "failure"}))
            }
        }, 1000)      
    } catch (error) {
        dispatch(update_error({ Err: "Network Error", Toast_Type: "error" }))
    }
} 

export const handleDeleteClassroomStudent = (params, student_list) => async (dispatch) => {
    try {
        // console.log("params :", params)
        // console.log("student_list :", student_list)
        dispatch(editClassroomStudentsData({type: "request"}))
        // const { data } = await axiosInstance.delete("", params)
        // if(data?.error_code === 0)
        setTimeout(() => {
            if(true){
                const updated_student_list = student_list.filter(s => 
                    s.s_no !== params.s_no
                )
                // console.log("updated_student_list :", updated_student_list)
                dispatch(editClassroomStudentsData({type: "response", data: updated_student_list}))
                dispatch(updateModalShow({show: false, closebtn: true, modal_from: "admin", modal_type: "delete_classroom_student"}))
                dispatch(update_error({Err: "Student deleted Successfully", Toast_Type: "success"}))
            } else {
                dispatch(editClassroomStudentsData({type: "failure"}))
            }
        }, 1000)
    } catch (error) {
        dispatch(update_error({ Err: "Network Error", Toast_Type: "error" }))
    }
}

export const getProfileDetails = () => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get('/admin/get_profile')
    // console.log("data?.data :", data?.data)
    dispatch(updatePersonalInfoInputs(data?.data))

  } catch (error) {
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
  }
}

export const editProfileDetails = (payload) => async (dispatch) => {
  try {
    dispatch(handleEditProfileDetails({type: "request"}))
    const { data } = await axiosInstance.post('/admin/edit_profile', payload)
    if (data?.error_code === 0) {
        dispatch(handleEditProfileDetails({type: "response"}))
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
    const { data } = await axiosInstance.post('/admin/update_password', payload)
     if (data?.error_code === 0) {
        dispatch(handlechangePassword({type: "response"}))
        dispatch(update_error({ Err: data?.message, Toast_Type: "success" }));
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

export const getDashboardChartData = () => async (dispatch) => {
    try {
        dispatch(handleGetDashboardChartData({type: "request"}))
        // const { data } = await axiosInstance.post('', payload)
        setTimeout(()=> {
            const data = [
                { name: "Jan", uv: 4 },
                { name: "Feb", uv: 8 },
                { name: "Mar", uv: 7 },
                { name: "Apr", uv: 9 },
                { name: "May", uv: 7 },
                { name: "Jun", uv: 20 },
                { name: "Jul", uv: 6 },
                { name: "Aug", uv: 10 },
                { name: "Sep", uv: 5 },
                { name: "Oct", uv: 9 },
                { name: "Nov", uv: 6 },
                { name: "Dec", uv: 8 },
            ];
            //  if (data?.error_code === 0) {
            if(data) {
                dispatch(handleGetDashboardChartData({type: "response", data: data}))
            } else {
                dispatch(handleGetDashboardChartData({type: "failure"}))
            }
        }, 10000)
    } catch (error) {
        dispatch(handleGetDashboardChartData({type: "failure"}))
    }
}

export const handleClassroomChart = () => async (dispatch) => {
    try {
        dispatch(handleGetClassroomChartData({type: "request"}))
        // const { data } = await axiosInstance.post('', payload)
        setTimeout(()=> {
            const data = [
                { name: "Jan", Emergent: 8, Developing: 8, Exemplar: 8 },
                { name: "Feb", Emergent: 5, Developing: 5, Exemplar: 5 },
                { name: "Mar", Emergent: 15, Developing: 3, Exemplar: 3 },
                { name: "Apr", Emergent: 8, Developing: 4, Exemplar: 4 },
                { name: "May", Emergent: 3, Developing: 2, Exemplar: 2 },
                { name: "Jun", Emergent: 8, Developing: 2, Exemplar: 2 },
                { name: "Jul", Emergent: 8, Developing: 2, Exemplar: 2 },
                { name: "Aug", Emergent: 8, Developing: 2, Exemplar: 2 },
                { name: "Sep", Emergent: 8, Developing: 2, Exemplar: 2 },
                { name: "Oct", Emergent: 4, Developing: 2, Exemplar: 1 },
                { name: "Nov", Emergent: 6, Developing: 3, Exemplar: 2 },
                { name: "Dec", Emergent: 7, Developing: 2, Exemplar: 1 },
            ];
            //  if (data?.error_code === 0) {
            if(data) {
                dispatch(handleGetClassroomChartData({type: "response", data: data}))
            } else {
                dispatch(handleGetClassroomChartData({type: "failure"}))
            }
        }, 1000)
    } catch (error) {
        dispatch(handleGetClassroomChartData({type: "failure"}))
    }
}