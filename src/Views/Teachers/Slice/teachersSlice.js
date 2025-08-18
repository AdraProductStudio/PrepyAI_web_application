import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected_books: {},
  studentsPerformance: {
    activeTab: "teachers",
    searchResults: [],
    jsonStudentsData: []
  },
  teacher_DashboardData: {
    glow: true,
    data: []
  },
  teacher_GetClassrooms: {
    glow: true,
    data: []
  },
  teacher_GetSubjects: {
    glow: true,
    data: []
  },
  teacher_GetStudentList: {
    glow: true,
    data: [],
  },
  test_records: {
    glow: true,
    data: []
  },
  test_dropDown_data: {
    data: []
  },
  test_create: {
    glow: true,
    data: [],
    input_data: {}
  },
  create_test: {
    selected_books: {},
    selected_chapter: "",

  },
  student_details: {},
  save_schedule_status: {},
  save_schedule_error: {},
  studentsPerformance: {
    classroom_id: null,
    subject_id: null,
    placeholder: false,
    assignedTest: {
      jsonStudentsData: [],
      pagination: {
        page: 1,
        show_entries: 10,
        total_pages: null
      }
    },

    selfTest: {
      jsonStudentsData: [],
      pagination: {
        page: 1,
        show_entries: 10,
        total_pages: null
      }
    },
  }
}

const teachersSlice = createSlice({
  name: "teachersSlice",
  initialState: initialState,
  reducers: {
    handleStudentsPerformance(state, action) { },
    handleJsonStudentsData(state, action) { },
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
    handleDropDownchange(state, action) {
      state.test_dropDown_data.data = action.data;
    }
    ,
    handleGetTestRecords(state, action) {
      const { type, data } = action.payload;
      console.log(data, '41-data')

      switch (type) {
        case "request":
          state.test_records['glow'] = true;
          state.test_records['data'] = [];
          break;

        case "response":
          state.test_records['glow'] = false;
          state.test_records.data = data;
          break;

        case "failure":
          state.test_records['glow'] = false;
          state.test_records['data'] = [];
          break;

        default:
          break;
      }

    },
    handelGetCreate(state, action) {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.test_create['glow'] = true;
          state.test_create['data'] = [];
          break;

        case "response":
          state.test_create['glow'] = false;
          state.test_create['data'] = data;
          break;

        case "failure":
          state.test_create['glow'] = false;
          state.test_create['data'] = [];
          break;

        default:
          break;
      }
    },
    create_test_onchange(state, action) {
      Object.entries(action.payload)?.forEach(([key, value]) => (
        state.test_create.input_data[key] = value
      ))
    },
    update_selected_books(state, action) {
      const { key, value } = action.payload
      state.create_test[key] = value

    },
    get_student_details_slice(state, action) {
      const { key, value } = action.payload
      state.student_details[key] = value
    },
    save_schedule_request(state) {
      state.save_schedule_status = "loading";
      state.save_schedule_error = null;
    },
    save_schedule_success(state, action) {
      state.save_schedule_status = "succeeded";
      state.student_details = {
        ...state.student_details,
        schedule: action.payload
      };
    },
    save_schedule_failure(state, action) {
      state.save_schedule_status = "failed";
      state.save_schedule_error = action.payload;
    }
  },
  handledAssignedStudentsTestData(state, action) {
    const { type, data } = action.payload

    switch (type) {
      case "request":
        state.studentsPerformance.assignedTest.jsonStudentsData = []
        state.studentsPerformance.placeholder = true;
        break;

      case "response":
        state.studentsPerformance.assignedTest.jsonStudentsData = data || []
        state.studentsPerformance.placeholder = false;
        break;

      case "failure":
        state.studentsPerformance.assignedTest.jsonStudentsData = []
        state.studentsPerformance.placeholder = false;
        break;
      default:
        break;

    }
  },
  updateAssignedTestPaginationPage(state, action) {
    state.studentsPerformance.assignedTest.pagination.page = action.payload;
  },
  updateAssingnedTestTotalPageCount(state, action) {
    state.studentsPerformance.assignedTest.pagination.total_pages = action.payload
  },


  updateStudentClassAndSubject(state, action) {
    const { class_id, subject_id } = action.payload
    state.studentsPerformance.classroom_id = class_id
    state.studentsPerformance.subject_id = subject_id
  },


  handleSelfStudentsTestData(state, action) {
    const { type, data } = action.payload

    switch (type) {
      case "request":
        state.studentsPerformance.selfTest.jsonStudentsData = []
        state.studentsPerformance.placeholder = true;
        break;

      case "response":
        state.studentsPerformance.selfTest.jsonStudentsData = data || []
        state.studentsPerformance.placeholder = false;
        break;

      case "failure":
        state.studentsPerformance.selfTest.jsonStudentsData = []
        state.studentsPerformance.placeholder = false;
        break;
      default:
        break;

    }
  },

  updateSelfTestPaginationPage(state, action) {
    state.studentsPerformance.selfTest.pagination.page = action.payload;
  },
  updateSelfTestTotalPageCount(state, action) {
    state.studentsPerformance.selfTest.pagination.total_pages = action.payload
  },

});

const { actions, reducer } = teachersSlice

export const {
  handleStudentsPerformance,
  handleJsonStudentsData,
  handleTeacherDashboard,
  handleGetClassrooms,
  handleGetSubjects,
  handleGetStudentsList,
  handleGetTestRecords,
  handelGetCreate,
  create_test_onchange,
  update_selected_books,
  get_student_details_slice,
  save_schedule_request,
  save_schedule_success,
  save_schedule_failure,
  handledAssignedStudentsTestData, updateAssignedTestPaginationPage, updateAssingnedTestTotalPageCount,
  updateStudentClassAndSubject,
  handleSelfStudentsTestData, updateSelfTestPaginationPage, updateSelfTestTotalPageCount,

} = actions

export default reducer