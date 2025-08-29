import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected_books: {},
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
    activeTab: "teachers",
    searchResults: [],
    jsonStudentsData: [],
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
  },

  teacher_GetAllClassRooms: {
    glow: true,
    data: []
  },
  teacher_GradeByClassroom: {
    gloe: true,
    data: []
  },
  teacher_GetTeachers: {
    glow: true,
    data: []
  },
  teacher_GetClassroomTeachers: {
    glow: true,
    data: []
  },
  teacher_GetStudentListByTeacher: {
    glow: true,
    data: [],
  },
  teacher_GetStudentListBySubject: {
    glow: true,
    data: [],
  },
  teacher_GetStudentOverviewPerfomance: {
    glow: true,
    data: []
  },
  teacher_GetStudentOverviewOverallPerfomance: {
    glow: true,
    data: []
  },
  teacher_GetStudentOverviewTestCount: {
    glow: true,
    data: []
  },
  teacher_GetStudentOverviewSpendingHours: {
    glow: true,
    data: []
  },
  teacher_PostClassrooms: {
    data: {}
  },
  teacher_PostSubjects: {
    data: {}
  },
  teacher_PostStudents: {
    data: {}
  },
  teacher_CreateStudents: {
    data: {}
  },
  teacher_Current_Grade_Classroom: {
    data: {}
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
          state.teacher_GetClassrooms["data"] = Array.isArray(data) ? data : [];
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
          state.teacher_GetStudentList["data"] = Array.isArray(data) ? data : [];
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
    },
    handleGetTestRecords(state, action) {
      const { type, data } = action.payload;
      switch (type) {
        case "request":
          state.test_records['glow'] = true;
          state.test_records['data'] = [];
          break;

        case "response":
          state.test_records['glow'] = false;
          state.test_records.data = Array.isArray(data) ? data : [];
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
          state.test_create['data'] = Array.isArray(data) ? data : [];
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
    },
    handledAssignedStudentsTestData(state, action) {
      const { type, data } = action.payload

      switch (type) {
        case "request":
          state.studentsPerformance.assignedTest.jsonStudentsData = []
          state.studentsPerformance.placeholder = true;
          break;

        case "response":
          state.studentsPerformance.assignedTest.jsonStudentsData = Array.isArray(data) ? data : [];
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
          state.studentsPerformance.selfTest.jsonStudentsData = Array.isArray(data) ? data : [];
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
    handleAllClassRooms(state, action) {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.teacher_GetAllClassRooms["glow"] = true;
          state.teacher_GetAllClassRooms["data"] = [];
          break;

        case "response":
          state.teacher_GetAllClassRooms["glow"] = false;
          state.teacher_GetAllClassRooms["data"] = data;
          break;

        case "failure":
          state.teacher_GetAllClassRooms["glow"] = false;
          state.teacher_DashboardData["data"] = [];
          break;

        default:
          break;
      }
    },
    handleGradeByClassroom(state, action) {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.teacher_GradeByClassroom["glow"] = true;
          state.teacher_GradeByClassroom["data"] = [];
          break;

        case "response":
          state.teacher_GradeByClassroom["glow"] = false;
          state.teacher_GradeByClassroom["data"] = data;
          break;

        case "failure":
          state.teacher_GradeByClassroom["glow"] = false;
          state.teacher_GradeByClassroom["data"] = [];
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
    handleGetTeachers(state, action) {
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
    handleGetClassroomTeachers(state, action) {
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
    updatePostClassroomsData(state, action) {
      const [key, value] = Object.entries(action.payload)[0] || [];
      state.teacher_PostClassrooms.data[key] = value || "";
    },
    updatePostSubjectsData(state, action) {
      const [key, value] = Object.entries(action.payload)[0] || [];
      state.teacher_PostSubjects.data[key] = value || "";
    },
    updatePostStudentData(state, action) {
      const [key, value] = Object.entries(action.payload)[0] || [];
      state.teacher_PostStudents.data[key] = value || "";
    },
    update_edit_student(state, action) {
      const { data } = action.payload;
      state.teacher_PostStudents.data = data;
    },
    update_edit_classroom(state, action) {
      const { data } = action.payload;
      state.teacher_PostClassrooms.data = data;
    },
    update_Create_student(state, action) {
      const [key, value] = Object.entries(action.payload)[0] || [];
      state.teacher_CreateStudents.data[key] = value || "";
    },
    update_Grade_by_classroom(state, action) {
      const [key, value] = Object.entries(action.payload)[0] || [];
      state.teacher_Current_Grade_Classroom.data[key] = value || "";
    },
    clear_form_fields(state,action){
      state.teacher_CreateStudents.data={}
    }
  },
  
  extraReducers(builder) {
    builder.addCase("common_slice/updateModalShow", (state, action) => {
      const { show } = action.payload;
      if (!show) {
        state.teacher_PostClassrooms.data = {};
        state.teacher_PostSubjects.data = {};
        state.teacher_PostStudents.data = {};
        state.teacher_CreateStudents.data = {};
      }
    });
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

  handleGetStudentsListBySubject,
  update_edit_student,
  handleGetStudentOverviewPerfomance,
  handleGetStudentOverviewOverallPerfomance,
  handleGetStudentOverviewTestCount,
  handleGetStudentOverviewSpendingHours,
  handleAllClassRooms,
  updatePostClassroomsData,
  handleGetTeachers,
  updatePostSubjectsData,
  handleGetStudentsListByTeacher,
  handleGetClassroomTeachers,
  updatePostStudentData,
  update_edit_classroom,
  update_Create_student,
  update_Grade_by_classroom,
  handleGradeByClassroom,
  clear_form_fields
} = actions

export default reducer