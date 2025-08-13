import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    classroom_id: null,
    classroomsJson : [],
    classroom_overview: {
        teachers: null,
        students: null,
        tests: null
    },
    teachersTableData: [],
    studentsTableData: [],
    placeholder: false,
    classroom_name: "",

    file: null,
    staffForm: {
      name: "",
      email_id: "",
      subject_name: "",
      institute_name: "",
    },
    loading: false,
    success: false,
    error: null,
}

const adminSlice = createSlice({    
    name: 'adminSlice',
    initialState,
    reducers: {
        updateGetAllClassroomsData(state, action) {
            const { type , data } = action.payload

            switch(type){
                case "request":
                    state.classroomsJson = []
                    state.placeholder = true;
                    break;

                case "response":
                    state.classroomsJson = data || []
                    state.placeholder = false;
                    break;

                case "failure":
                    state.classroomsJson = []
                    state.placeholder = false;
                    break;
                default:
                    break;

            }       
        },

        handleUpdateClassroomId(state, action){
            state.classroom_id = action.payload
        },

        updateClassroomsOverviewData(state, action){
            const { type , data } = action.payload
            const { staffs, students, tests } = data || {}
            
            switch(type){
                case "request":
                    state.placeholder = true;
                    break;

                case "response":
                    state.classroom_overview.teachers = staffs
                    state.classroom_overview.students = students
                    state.classroom_overview.tests = tests
                    state.placeholder = false;
                    break;

                case "failure":
                    state.placeholder = false;
                    break;
                default:
                    break;
            }  
        },

        updateTeachersTableData(state, action){
            const { type , data } = action.payload
            switch(type){
                case "request":
                    state.placeholder = true;
                    break;

                case "response":
                    state.teachersTableData = data || []
                    state.placeholder = false;
                    break;

                case "failure":
                    state.placeholder = false;
                    break;
                default:
                    break;
            }  
        },

        updateStudentsTableData(state, action){
            const { type , data } = action.payload
            console.log("data :", data)
            switch(type){
                case "request":
                    state.placeholder = true;
                    break;

                case "response":
                    state.studentsTableData = data || []
                    state.placeholder = false;
                    break;

                case "failure":
                    state.placeholder = false;
                    break;
                default:
                    break;
            }  
        },

        handleUpdateClassroomName(state, action){
            state.classroom_name = action.payload
        },

        setFile: (state, action) => {
            state.file = action.payload;
        },
        updateStaffForm: (state, action) => {
            state.staffForm = { ...state.staffForm, ...action.payload };
        },
    }
})

const { actions, reducer } = adminSlice;

export const {
    updateGetAllClassroomsData,
    handleUpdateClassroomId,
    updateClassroomsOverviewData,
    updateTeachersTableData,
    updateStudentsTableData,
    handleUpdateClassroomName,
    
    setFile, updateStaffForm
} = actions

export default reducer