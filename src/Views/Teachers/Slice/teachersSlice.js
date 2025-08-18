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
    teacher_GetClassrooms:{
    glow: true,
    data: []
    },
    teacher_GetSubjects:{
    glow: true,
    data: []
    },
    teacher_GetStudentList:{
      glow:true,
      data:[],
    }
    
}

const teachersSlice = createSlice({
  name: "teachersSlice",
  initialState: initialState,
  reducers: {
    handleStudentsPerformance(state, action) {},
    handleJsonStudentsData(state, action) {},
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
      handleGetStudentsList(state, action) {
        const { type, data } = action.payload;
  
        switch (type) {
          case "request":
            state.teacher_GetStudentList["glow"] = true;
            state.teacher_GetStudentList["data"] = [];
            break;
  
          case "response":
            state.teacher_GetStudentList["glow"] = false;
            state.teacher_GetStudentList["data"] = data;
            break;
  
          case "failure":
            state.teacher_GetStudentList["glow"] = false;
            state.teacher_GetStudentList["data"] = [];
            break;
  
          default:
            break;
        }
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
    handleGetStudentsList
} = actions

export default reducer