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
    errors: {},

    classroomForm: {
      class_name: "",
      teachers: [],
      student_file:null
    },

    dashboard_overview: {
        total_teachers: null,
        total_students: null,
        total_classrooms: null,
        total_tests: null
    },

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

        setErrors(state, action) {
            state.errors = action.payload;
        },
        clearForm(state) {
            state.staffForm = {
                name: "",
                email_id: "",
                subject_name: "",
                institute_name: "",
            };
            state.file = null;
            state.errors = {};
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },

        updateClassroomForm: (state, action) => {
            state.classroomForm = { ...state.classroomForm, ...action.payload };
        },

        updateDashboardOverviewData(state, action){
            const { type , data } = action.payload
            const { total_teachers, total_students, total_classrooms, total_tests } = data || {}
            
            switch(type){
                case "request":
                    state.placeholder = true;
                    break;

                case "response":
                    state.dashboard_overview.total_teachers = total_teachers
                    state.dashboard_overview.total_students = total_students
                    state.dashboard_overview.total_classrooms = total_classrooms
                    state.dashboard_overview.total_tests = total_tests
                    state.placeholder = false;
                    break;

                case "failure":
                    state.placeholder = false;
                    break;
                default:
                    break;
            }  
        },

        setClassroomErrors: (state, action) => {
            state.errors = action.payload;
        },
        clearClassroomForm: (state) => {
            state.classroomForm = {
            class_name: "",
            teachers: [],
            student_file: null
        };
            state.errors = {};
        },

        clearFieldError: (state, action) => {
            const fieldName = action.payload;
            if (state.errors[fieldName]) {
                const { [fieldName]: removed, ...rest } = state.errors;
                state.errors = rest;
            }
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
    
    setFile, updateStaffForm,
    setErrors, clearForm, setLoading,
    updateClassroomForm,
    updateDashboardOverviewData,
    setClassroomErrors,
    clearClassroomForm,
    clearFieldError
} = actions

export default reducer