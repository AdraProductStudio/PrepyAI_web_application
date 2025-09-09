import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected_books: {},
  teacher_DashboardData: {
    glow: true,
    data: [],
  },
  teacher_GetClassrooms: {
    glow: true,
    data: [],
  },
  teacher_GetSubjects: {
    glow: true,
    data: [],
  },
  teacher_GetStudentList: {
    glow: true,
    data: [],
  },
  test_records: {
    glow: true,
    data: [],
  },
  test_dropDown_data: {
    data: [],
  },
  test_create: {
    glow: true,
    data: [],
    input_data: {},
  },
  create_test: {
    selected_books: {},
    selected_chapter: "",
  },

  scheduleTest_values: {},
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
    placeholder2: false,
    assignedTest: {
      jsonStudentsData: [],
      pagination: {
        page: 1,
        show_entries: 10,
        total_pages: null,
      },
    },
    selfTest: {
      jsonStudentsData: [],
      pagination: {
        page: 1,
        show_entries: 10,
        total_pages: null,
      },
    },
    performance_modalData: [],
  },

  teacher_GetAllClassRooms: {
    glow: true,
    data: [],
  },
  teacher_GradeByClassroom: {
    gloe: true,
    data: [],
  },
  teacher_GetTeachers: {
    glow: true,
    data: [],
  },
  teacher_GetClassroomTeachers: {
    glow: true,
    data: [],
  },
  teacher_GetStudencePerfomanceBySubject: {
    glow: true,
    data: [],
  },
  teacher_GetAllSubjects: {
    glow: true,
    data: [],
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
    data: [],
  },
  teacher_GetStudentOverviewOverallPerfomance: {
    glow: true,
    data: [],
  },
  teacher_GetStudentOverviewTestCount: {
    glow: true,
    data: [],
  },
  teacher_GetStudentOverviewSpendingHours: {
    glow: true,
    data: [],
  },
  teacher_PostClassrooms: {
    data: {},
  },
  teacher_PostSubjects: {
    data: {},
  },
  teacher_PostStudents: {
    data: {},
  },
  teacher_CreateStudents: {
    data: {},
  },
  teacher_Current_Grade_Classroom: {
    data: {},
  },
  subject_attachments: {
    glow: false,
    data: {},
  },

  upload_attachment: {
    glow: false,
    data: [],
    message: null,
  },
  params_data: {},
  attachment_books_upload: {
    glow: false,
    data: {},
  },
  teacher_Current_perfomance_Classroom: {
    data: {},
  },
  teacher_Current_perfomance_history_subject: {
    data: {},
  },
  teacher_overview_perfomance_date: {
    data: {},
  },
  teacher_students_Classroom: {
    data: {},
  },
  test_history: {},

  books: {
    loading: false,
    data: [],
  },
  test_questions: [],
  get_test_questions_status: "idle",
  get_test_questions_error: null,
  test_id: null,
  delete_attachment_status: "idle",
  delete_attachment_error: null,

  delete_attachment_id: null,

  upload_books: {
    loading: false,
    data: [],
    error: null,
  },
  schedule_test: {
    loading: false,
    data: null,
    error: null,
    glow: false,
  },


  profileInputs: {
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    address: ""
  },
  editProfileInputs: {},
  isProfileEditing: false,
  settingsInputs: {
    old_password: "",
    confirm_password: "",
    new_password: ""
  },
  placeholder: false
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
          state.teacher_GetStudentList["data"] = Array.isArray(data)
            ? data
            : [];
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
          state.test_records["glow"] = true;
          state.test_records["data"] = [];
          break;

        case "response":
          state.test_records["glow"] = false;
          state.test_records.data = Array.isArray(data) ? data : [];
          break;

        case "failure":
          state.test_records["glow"] = false;
          state.test_records["data"] = [];
          break;

        default:
          break;
      }
    },
    handelGetCreate(state, action) {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.test_create["glow"] = true;
          state.test_create["data"] = [];
          break;

        case "response":
          state.test_create["glow"] = false;
          state.test_create["data"] = Array.isArray(data) ? data : [];
          break;

        case "failure":
          state.test_create["glow"] = false;
          state.test_create["data"] = [];
          break;

        default:
          break;
      }
    },
    create_test_onchange(state, action) {
      Object.entries(action.payload)?.forEach(
        ([key, value]) => (state.test_create.input_data[key] = value)
      );
    },
    selected_students_in_schedule(state, action) {
      const [[key, value]] = Object.entries(action.payload);
      state.scheduleTest_values[key] = value;
    },
    update_selected_books(state, action) {
      const { key, value } = action.payload
      if (key === "selected_books") state.create_test["chapters"] = ""
      state.create_test[key] = value

    },
    get_student_details_slice(state, action) {
      const { type, data } = action.payload;
      switch (type) {
        case "request":
          state.studentsPerformance.assignedTest.jsonStudentsData = [];
          state.studentsPerformance.placeholder = true;
          break;

        case "response":
          state.studentsPerformance.assignedTest.jsonStudentsData =
            Array.isArray(data) ? data : [];
          state.studentsPerformance.placeholder = false;
          break;

        case "failure":
          state.studentsPerformance.assignedTest.jsonStudentsData = [];
          state.studentsPerformance.placeholder = false;
          break;
        default:
          break;
      }
    },
    save_schedule_request(state) {
      state.save_schedule_status = "loading";
      state.save_schedule_error = null;
    },
    save_schedule_success(state, action) {
      state.save_schedule_status = "succeeded";
      state.create_test = {};
    },
    save_schedule_failure(state, action) {
      state.save_schedule_status = "failed";
      state.save_schedule_error = action.payload;
    },

    get_test_questions_request(state) {
      state.get_test_questions_status = "loading";
      state.get_test_questions_loading = true
      state.get_test_questions_error = null;
    },
    get_test_questions_success(state, action) {
      state.get_test_questions_status = "succeeded";
      state.get_test_questions_loading = false
      state.test_questions = action.payload;
    },
    get_test_questions_failure(state, action) {
      state.get_test_questions_status = "failed";
      state.get_test_questions_loading = false
      state.get_test_questions_error = action.payload;
    },

    handledAssignedStudentsTestData(state, action) {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.studentsPerformance.assignedTest.jsonStudentsData = [];
          state.studentsPerformance.placeholder = true;
          break;

        case "response":
          state.studentsPerformance.assignedTest.jsonStudentsData =
            Array.isArray(data) ? data : [];
          state.studentsPerformance.placeholder = false;
          break;

        case "failure":
          state.studentsPerformance.assignedTest.jsonStudentsData = [];
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
      state.studentsPerformance.assignedTest.pagination.total_pages =
        action.payload;
    },
    updateStudentClassAndSubject(state, action) {
      const { class_id, subject_id } = action.payload;
      state.studentsPerformance.classroom_id = class_id;
      state.studentsPerformance.subject_id = subject_id;
    },
    handleSelfStudentsTestData(state, action) {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.studentsPerformance.selfTest.jsonStudentsData = [];
          state.studentsPerformance.placeholder = true;
          break;

        case "response":
          state.studentsPerformance.selfTest.jsonStudentsData = Array.isArray(
            data
          )
            ? data
            : [];
          state.studentsPerformance.placeholder = false;
          break;

        case "failure":
          state.studentsPerformance.selfTest.jsonStudentsData = [];
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
      state.studentsPerformance.selfTest.pagination.total_pages =
        action.payload;
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
    handleSubjectsByClassroom(state, action) {
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
    handldeGetPerfomanceBySubject(state, action) {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.teacher_GetStudencePerfomanceBySubject["glow"] = true;
          state.teacher_GetStudencePerfomanceBySubject["data"] = [];
          break;

        case "response":
          state.teacher_GetStudencePerfomanceBySubject["glow"] = false;
          state.teacher_GetStudencePerfomanceBySubject["data"] = data;
          break;

        case "failure":
          state.teacher_GetStudencePerfomanceBySubject["glow"] = false;
          state.teacher_GetStudencePerfomanceBySubject["data"] = [];
          break;

        default:
          break;
      }
    },
    handldeGetAllSubjects(state, action) {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.teacher_GetAllSubjects["glow"] = true;
          state.teacher_GetAllSubjects["data"] = [];
          break;

        case "response":
          state.teacher_GetAllSubjects["glow"] = false;
          state.teacher_GetAllSubjects["data"] = data;
          break;

        case "failure":
          state.teacher_GetAllSubjects["glow"] = false;
          state.teacher_GetAllSubjects["data"] = [];
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
      state.teacher_PostStudents.data.data[key] = value || "";
    },
    update_edit_student(state, action) {
      const { data, getdata } = action.payload;
      state.teacher_PostStudents.data = { data, getdata };
    },
    update_Create_student(state, action) {
      const [key, value] = Object.entries(action.payload)[0] || [];
      state.teacher_CreateStudents.data[key] = value || "";
    },
    update_Grade_by_classroom(state, action) {
      const [key, value] = Object.entries(action.payload)[0] || [];
      state.teacher_Current_Grade_Classroom.data[key] = value || "";
    },
    update_Students_classroom(state, action) {
      const [key, value] = Object.entries(action.payload)[0] || [];
      state.teacher_students_Classroom.data[key] = value || "";
    },
    update_perfomance_by_classroom(state, action) {
      const [key, value] = Object.entries(action.payload)[0] || [];
      state.teacher_Current_perfomance_Classroom.data[key] = value || "";
    },
    update_perfomance_history_by_subject(state, action) {
      const [key, value] = Object.entries(action.payload)[0] || [];
      state.teacher_Current_perfomance_history_subject.data[key] = value || "";
    },
    clear_form_fields(state, action) {
      state.teacher_CreateStudents.data = {};
    },
    getSubjectAttachments(state, action) {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.subject_attachments.glow = true;
          state.subject_attachments.data = {};
          break;

        case "response":
          state.subject_attachments.glow = false;
          state.subject_attachments.data = data || {};
          break;

        case "failure":
          state.subject_attachments.glow = false;
          break;

        default:
          break;
      }
    },
    handleUploadAttachment(state, action) {
      const { type, data, message } = action.payload;

      switch (type) {
        case "request":
          state.upload_attachment.glow = true;
          state.upload_attachment.data = [];
          state.upload_attachment.message = null;
          break;

        case "response":
          state.upload_attachment.glow = false;
          state.upload_attachment.data = data;
          state.upload_attachment.message = null;
          break;

        case "failure":
          state.upload_attachment.glow = false;
          state.upload_attachment.data = [];
          state.upload_attachment.message = message;
          break;

        default:
          break;
      }
    },
    updateParams(state, action) {
      state.params_data = action.payload;
    },
    handle_attachment_books_upload(state, action) {
      state.attachment_books_upload = action.payload;
    },
    handlePerformanceModalData(state, action) {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.studentsPerformance.performance_modalData = [];
          state.studentsPerformance.placeholder2 = true;
          break;

        case "response":
          state.studentsPerformance.performance_modalData = data || [];
          state.studentsPerformance.placeholder2 = false;
          break;

        case "failure":
          state.studentsPerformance.performance_modalData = [];
          state.studentsPerformance.placeholder2 = false;
          break;
        default:
          break;
      }
    },
    handleTestHistoryGet(state, action) {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.test_history.glow = true;
          state.test_history.data = [];
          break;

        case "response":
          state.test_history.glow = false;
          state.test_history.data = data || [];
          break;

        case "failure":
          state.test_history.glow = false;
          break;

        default:
          break;
      }
    },
    handleGetBooks: (state, action) => {
      const { type, data } = action.payload || {};

      switch (type) {
        case "request":
          state.books.loading = true;
          state.create_test = {};
          state.books.data = [];
          break;
        case "response":
          state.books.loading = false;
          state.books.data = data || [];
          break;
        case "failure":
          state.books.loading = false;
          break;
        default:
          return;
      }
    },

    delete_attachment_request(state) {
      state.delete_attachment_status = "loading";
      state.delete_attachment_error = null;
    },
    delete_attachment_success(state) {
      state.delete_attachment_status = "succeeded";
    },
    delete_attachment_failure(state, action) {
      state.delete_attachment_status = "failed";
      state.delete_attachment_error = action.payload;
    },
    updateDeleteAttachment(state, action) {
      state.delete_attachment_id = action.payload;
    },
    deleteBook(state, action) {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.delete_book_spinner = true;
          break;
        case "response":
          state.books.data =
            state.books?.data?.filter(
              (book) => book.book_id !== data.book_id
            ) || [];
          state.delete_book_spinner = false;
          break;
        case "failure":
          state.delete_book_spinner = false;
          break;
        default:
          break;
      }
    },
    update_overview_month_for_perfomance(state, action) {
      const [key, value] = Object.entries(action.payload)[0] || [];
      state.teacher_overview_perfomance_date.data[key] = value || "";
    },
    resetStudentState(state) {
      state.studentsPerformance.assignedTest.jsonStudentsData = [{ student_id: "all", student_name: "All" }]
    },

    resetStudentJsonDataState(state) {
      state.studentsPerformance.assignedTest.jsonStudentsData = [{ student_id: "all", student_name: "All" }]
    },

    handleUploadBooks(state, action) {
      const { type, data, message } = action.payload || {};

      switch (type) {
        case "request":
          state.upload_books.loading = true;
          state.upload_books.data = [];
          state.upload_books.error = null;
          state.upload_books.glow = true;
          break;

        case "response":
          state.upload_books.loading = false;
          state.upload_books.data = data || [];
          state.upload_books.error = null;
          state.upload_books.glow = false;
          break;

        case "failure":
          state.upload_books.loading = false;
          state.upload_books.error = message || "Something went wrong";
          state.upload_books.glow = false;
          break;

        default:
          return;
      }
    },
    handleScheduleTest(state, action) {
      const { type, data, message } = action.payload || {};

      switch (type) {
        case "request":
          state.schedule_test = {
            loading: true,
            data: null,
            error: null,
            glow: true,
          };
          break;

        case "response":
          state.schedule_test = {
            loading: false,
            data: data || null,
            error: null,
            glow: false,
          };
          break;

        case "failure":
          state.schedule_test = {
            loading: false,
            data: null,
            error: message || "Something went wrong",
            glow: false,
          };
          break;

        default:
          return;
      }
    },

    updateProfileEditing: (state, action) => {
      state.isProfileEditing = !state.isProfileEditing
    },
    updatePersonalInfoInputs(state, action) {
      const { first_name, last_name, email_id, phone_number, address } = action?.payload?.[0]
      state.profileInputs.first_name = first_name
      state.profileInputs.last_name = last_name
      state.profileInputs.email_id = email_id
      state.profileInputs.phone_number = phone_number
      state.profileInputs.address = address
      state.editProfileInputs.first_name = first_name
      state.editProfileInputs.last_name = last_name
      state.editProfileInputs.email_id = email_id
      state.editProfileInputs.phone_number = phone_number
      state.editProfileInputs.address = address
    },
    updateSettingsInputs: (state, action) => {
      const { field, value } = action.payload;
      state.settingsInputs[field] = value
    },
    edit_profile_Inputs: (state, action) => {
      const { field, value } = action.payload;
      state.editProfileInputs[field] = value
    },
    handleEditProfileDetails(state, action) {
      const { type } = action.payload
      switch (type) {
        case "request":
          state.placeholder = true;
          break;

        case "response":
          state.placeholder = false
          break;

        case "failure":
          state.placeholder = false;
          break;

        default:
          break;
      }
    },
    handlechangePassword(state, action) {
      const { type } = action.payload
      switch (type) {
        case "request":
          state.placeholder = true;
          break;

        case "response":
          state.placeholder = false
          break;

        case "failure":
          state.placeholder = false;
          break;

        default:
          break;
      }
    },
    resetSettingPasswordField(state, action) {
      state.settingsInputs = initialState.settingsInputs
    }

  },

  extraReducers(builder) {
    builder
      .addCase("common_slice/updateModalShow", (state, action) => {
        const { show } = action.payload;
        if (!show) {
          state.teacher_PostClassrooms.data = {};
          state.teacher_PostSubjects.data = {};
          state.teacher_PostStudents.data = {};
          state.teacher_CreateStudents.data = {};
        }
      })

      .addCase("common_slice/update_app_data", (state, action) => {
        const { type } = action.payload;

        if (type === "menu_name") {
          state.teacher_Current_perfomance_history_subject = {
            data: {},
          };
          state.teacher_Current_perfomance_Classroom = {
            data: {}
          };
          state.teacher_Current_Grade_Classroom = {
            data: {}
          };
          state.teacher_students_Classroom = {
            data: {},
          };
          state.teacher_overview_perfomance_date = {
            data: {},
          };
          state.teacher_GetStudentOverviewTestCount = {
            data: {},
          }
        }
      });
  },
});

const { actions, reducer } = teachersSlice;

export const {
  handleStudentsPerformance,
  handleJsonStudentsData,
  handleGetClassrooms,
  handleGetSubjects,
  handleGetStudentsList,
  handelGetCreate,
  update_selected_books,
  handledAssignedStudentsTestData,
  updateAssignedTestPaginationPage,
  updateAssingnedTestTotalPageCount,
  updateStudentClassAndSubject,
  handleSelfStudentsTestData,
  updateSelfTestPaginationPage,
  updateSelfTestTotalPageCount,
  handleGetTestRecords,
  create_test_onchange,
  get_student_details_slice,
  save_schedule_request,
  save_schedule_success,
  save_schedule_failure,
  getSubjectAttachments,
  handleUploadAttachment,
  handlePerformanceModalData,
  handleGetTeachers,
  handleTeacherDashboard,
  handleAllClassRooms,
  handleGradeByClassroom,
  handleSubjectsByClassroom,
  handldeGetPerfomanceBySubject,
  handleGetStudentsListBySubject,
  update_edit_student,
  handleGetStudentOverviewPerfomance,
  handleGetStudentOverviewOverallPerfomance,
  handleGetStudentOverviewTestCount,
  handleGetStudentOverviewSpendingHours,
  updatePostClassroomsData,
  updatePostSubjectsData,
  handleGetStudentsListByTeacher,
  handleGetClassroomTeachers,
  updatePostStudentData,
  update_edit_classroom,
  update_Create_student,
  update_Grade_by_classroom,
  clear_form_fields,
  handldeGetAllSubjects,
  update_perfomance_by_classroom,
  update_perfomance_history_by_subject,
  update_student_perfomance_dashboard,
  update_Students_classroom,
  get_students_by_test_slice,
  updateParams,
  handle_attachment_books_upload,
  handleTestHistoryGet,
  handleGetBooks,
  get_test_questions_failure,
  get_test_questions_success,
  get_test_questions_request,
  delete_attachment_request,
  delete_attachment_success,
  delete_attachment_failure,
  updateDeleteAttachment,
  deleteBook,
  update_overview_month_for_perfomance, handleUploadBooks,
  handleScheduleTest,
  resetStudentState,
  selected_students_in_schedule, updatePersonalInfoInputs,
  handleEditProfileDetails, handlechangePassword, resetSettingPasswordField,updateProfileEditing,
  updateSettingsInputs,edit_profile_Inputs
} = actions;

export default reducer;
