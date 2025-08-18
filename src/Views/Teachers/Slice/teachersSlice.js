import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentsPerformance: {
    activeTab: "teachers",
    searchResults: [],
    jsonStudentsData: []
    },
    teacher_DashboardData:{
    glow: true,
    data: []
    },
    teacher_GetTeachers:{
      glow:true,
      data:[]
    },
    teacher_GetClassroomTeachers:{
      glow:true,
      data:[]
    },
    teacher_GetClassrooms:{
    glow: true,
    data: [],
    },
    teacher_GetSubjects:{
    glow: true,
    data: []
    },
    teacher_GetStudentListByTeacher:{
      glow:true,
      data:[],
    },
    teacher_GetStudentListBySubject:{
      glow:true,
      data:[],
    },
    teacher_GetStudentOverviewPerfomance:{
      glow:true,
      data:[]
    },
    teacher_GetStudentOverviewOverallPerfomance:{
      glow:true,
      data:[]
    },
    teacher_GetStudentOverviewTestCount:{
      glow:true,
      data:[]
    },
    teacher_GetStudentOverviewSpendingHours:{
      glow:true,
      data:[]
    },
    teacher_PostClassrooms:{
      data:{}
    },
    teacher_PostSubjects:{
      data:{}
    },  
    teacher_PostStudents:{
      data:{}
    },
}

const teachersSlice = createSlice({
  name: "teachersSlice",
  initialState: initialState,
  reducers: {
    handleTeacherDashboard(state, action) {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.teacher_DashboardData["glow"] = true;
          state.teacher_DashboardData["data"] = [];
          break;

        case "response":
          state.teacher_DashboardData["glow"] = false;
          state.teacher_DashboardData["data"] = data;
          break;

        case "failure":
          state.teacher_DashboardData["glow"] = false;
          state.teacher_DashboardData["data"] = [];
          break;

        default:
          break;
      }
    },
    handleGetClassrooms(state, action) {
        const { type, data } = action.payload;
  
        switch (type) {
          case "request":
            state.teacher_GetClassrooms["glow"] = true;
            state.teacher_GetClassrooms["data"] = [];
            break;
  
          case "response":
            state.teacher_GetClassrooms["glow"] = false;
            state.teacher_GetClassrooms["data"] = data;
            break;
  
          case "failure":
            state.teacher_GetClassrooms["glow"] = false;
            state.teacher_GetClassrooms["data"] = [];
            break;
          
          case "POST":
            const [key, value] = Object.entries(action.payload)[0] || [];
            state.teacher_GetClassrooms.postData[key] = value || "";

          default:
            break;
        }
    },
    handleGetSubjects(state, action) {
        const { type, data } = action.payload;
  
        switch (type) {
          case "request":
            state.teacher_GetSubjects["glow"] = true;
            state.teacher_GetSubjects["data"] = [];
            break;
  
          case "response":
            state.teacher_GetSubjects["glow"] = false;
            state.teacher_GetSubjects["data"] = data;
            break;
  
          case "failure":
            state.teacher_GetSubjects["glow"] = false;
            state.teacher_GetSubjects["data"] = [];
            break;
  
          default:
            break;
        }
    },
    handleGetStudentsListBySubject(state, action) {
        const { type, data } = action.payload;
  
        switch (type) {
          case "request":
            state.teacher_GetStudentListBySubject["glow"] = true;
            state.teacher_GetStudentListBySubject["data"] = [];
            break;
  
          case "response":
            state.teacher_GetStudentListBySubject["glow"] = false;
            state.teacher_GetStudentListBySubject["data"] = data;
            break;
  
          case "failure":
            state.teacher_GetStudentListBySubject["glow"] = false;
            state.teacher_GetStudentListBySubject["data"] = [];
            break;
  
          default:
            break;
        }
    },
    handleGetStudentsListByTeacher(state, action) {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.teacher_GetStudentListByTeacher["glow"] = true;
          state.teacher_GetStudentListByTeacher["data"] = [];
          break;

        case "response":
          state.teacher_GetStudentListByTeacher["glow"] = false;
          state.teacher_GetStudentListByTeacher["data"] = data;
          break;

        case "failure":
          state.teacher_GetStudentListByTeacher["glow"] = false;
          state.teacher_GetStudentListByTeacher["data"] = [];
          break;

        default:
          break;
      }
  },
    handleGetStudentOverviewPerfomance(state, action) {
        const { type, data } = action.payload;
  
        switch (type) {
          case "request":
            state.teacher_GetStudentOverviewPerfomance["glow"] = true;
            state.teacher_GetStudentOverviewPerfomance["data"] = [];
            break;
  
          case "response":
            state.teacher_GetStudentOverviewPerfomance["glow"] = false;
            state.teacher_GetStudentOverviewPerfomance["data"] = data;
            break;

          case "failure":
            state.teacher_GetStudentOverviewPerfomance["glow"] = false;
            state.teacher_GetStudentOverviewPerfomance["data"] = [];
            break;
  
          default:
            break;
        }
    },
    handleGetStudentOverviewOverallPerfomance(state, action) {
        const { type, data } = action.payload;
  
        switch (type) {
          case "request":
            state.teacher_GetStudentOverviewOverallPerfomance["glow"] = true;
            state.teacher_GetStudentOverviewOverallPerfomance["data"] = [];
            break;
  
          case "response":
            state.teacher_GetStudentOverviewOverallPerfomance["glow"] = false;
            state.teacher_GetStudentOverviewOverallPerfomance["data"] = data;
            break;

          case "failure":
            state.teacher_GetStudentOverviewOverallPerfomance["glow"] = false;
            state.teacher_GetStudentOverviewOverallPerfomance["data"] = [];
            break;
  
          default:
            break;
        }
    },
    handleGetStudentOverviewTestCount(state, action) {
        const { type, data } = action.payload;
  
        switch (type) {
          case "request":
            state.teacher_GetStudentOverviewTestCount["glow"] = true;
            state.teacher_GetStudentOverviewTestCount["data"] = [];
            break;
  
          case "response":
            state.teacher_GetStudentOverviewTestCount["glow"] = false;
            state.teacher_GetStudentOverviewTestCount["data"] = data;
            break;

          case "failure":
            state.teacher_GetStudentOverviewTestCount["glow"] = false;
            state.teacher_GetStudentOverviewTestCount["data"] = [];
            break;
  
          default:
            break;
        }
    },
    handleGetStudentOverviewSpendingHours(state, action) {
        const { type, data } = action.payload;
  
        switch (type) {
          case "request":
            state.teacher_GetStudentOverviewSpendingHours["glow"] = true;
            state.teacher_GetStudentOverviewSpendingHours["data"] = [];
            break;
  
          case "response":
            state.teacher_GetStudentOverviewSpendingHours["glow"] = false;
            state.teacher_GetStudentOverviewSpendingHours["data"] = data;
            break;

          case "failure":
            state.teacher_GetStudentOverviewSpendingHours["glow"] = false;
            state.teacher_GetStudentOverviewSpendingHours["data"] = [];
            break;
  
          default:
            break;
        }
    },
    handleGetTeachers(state,action){
      const { type, data } = action.payload;
  
      switch (type) {
        case "request":
          state.teacher_GetTeachers["glow"] = true;
          state.teacher_GetTeachers["data"] = [];
          break;

        case "response":
          state.teacher_GetTeachers["glow"] = false;
          state.teacher_GetTeachers["data"] = data;
          break;

        case "failure":
          state.teacher_GetTeachers["glow"] = false;
          state.teacher_GetTeachers["data"] = [];
          break;

        default:
          break;
      }
    },
    handleGetClassroomTeachers(state,action){
      const { type, data } = action.payload;
  
      switch (type) {
        case "request":
          state.teacher_GetClassroomTeachers["glow"] = true;
          state.teacher_GetClassroomTeachers["data"] = [];
          break;

        case "response":
          state.teacher_GetClassroomTeachers["glow"] = false;
          state.teacher_GetClassroomTeachers["data"] = data;
          break;

        case "failure":
          state.teacher_GetClassroomTeachers["glow"] = false;
          state.teacher_GetClassroomTeachers["data"] = [];
          break;

        default:
          break;
      }
    },

    // post
    updatePostClassroomsData(state,action){
      const [key, value] = Object.entries(action.payload)[0] || [];
      state.teacher_PostClassrooms.data[key] = value || "";
    },
    updatePostSubjectsData(state,action){
      const [key, value] = Object.entries(action.payload)[0] || [];
      state.teacher_PostSubjects.data[key] = value || "";
    },
    updatePostStudentData(state,action){
      const [key, value] = Object.entries(action.payload)[0] || [];
      state.teacher_PostStudents.data[key] = value || "";
    },
    update_edit_student(state,action){
      const { data } = action.payload;
      state.teacher_PostStudents.data = data
    },
  },
});

const { actions, reducer } = teachersSlice

export const {
    handleStudentsPerformance,
    handleJsonStudentsData,
    handleTeacherDashboard,
    handleGetClassrooms,
    handleGetSubjects,
    handleGetStudentsListBySubject,
    update_edit_student,
    handleGetStudentOverviewPerfomance,
    handleGetStudentOverviewOverallPerfomance,
    handleGetStudentOverviewTestCount,
    handleGetStudentOverviewSpendingHours,
    updatePostClassroomsData,
    handleGetTeachers,
    updatePostSubjectsData,
    handleGetStudentsListByTeacher,
    handleGetClassroomTeachers,
    updatePostStudentData
} = actions

export default reducer