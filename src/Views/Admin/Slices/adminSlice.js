import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  classroom_id: null,
  classroomsJson: [],
  classroom_overview: {
    teachers: null,
    students: null,
    tests: null,
    classroom_name: null
  },
  teachersTableData: [],
  studentsTableData: [],
  placeholder: false,
  placeholder2: false,
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
    student_file: null,
  },

  dashboard_overview: {
    total_teachers: null,
    total_students: null,
    total_classrooms: null,
    total_tests: null,
  },
  dashboard_teachers_list: [],
  edit_dashboard_teacher: {},
  edit_classroom_teacher: {},
  edit_classroom_student: {},

  profileInputs: {
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    address: "",
  },
  editProfileInputs: {},
  isProfileEditing: false,
  settingsInputs: {
    old_password: "",
    confirm_password: "",
    new_password: "",
  },

  dashboard_chart_data: [],
  classroom_chart_data: [],
  classroom_chart_years: [],
  overall_loading: [],
  create_classroom_modal_teachers_list: [],
  delete_classroom_data: {},
  dashboard_chart_years: [],

  filter_params: {
    page: 1,
    show_entries: 10,
    search_query: '',
    filter_by: ''
  },
  settings_password : {
    show_old_password : false,
    show_new_password : false,
    show_confirm_password : false,
  }
};

const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    updateGetAllClassroomsData(state, action) {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.classroomsJson = [];
          state.placeholder = true;
          break;

        case "response":
          state.classroomsJson = data || [];
          state.placeholder = false;
          break;

        case "failure":
          state.classroomsJson = [];
          state.placeholder = false;
          break;
        default:
          break;
      }
    },

    handleUpdateClassroomId(state, action) {
      state.classroom_id = action.payload;
    },

    updateClassroomsOverviewData(state, action) {
      const { type, data } = action.payload;
      const { teachers, students, tests, classroom_name } = data || {};
      switch (type) {
        case "request":
          state.placeholder = true;
          break;

        case "response":
          state.classroom_overview.teachers = teachers > 0 ? teachers : 0;
          state.classroom_overview.students = students > 0 ? students : 0;
          state.classroom_overview.tests = tests > 0 ? tests : 0;
          state.classroom_overview.classroom_name = classroom_name || "";
          state.placeholder = false;
          break;

        case "failure":
          state.placeholder = false;
          break;
        default:
          break;
      }
    },

    updateTeachersTableData(state, action) {
      const { type, data } = action.payload;
      switch (type) {
        case "request":
          state.placeholder = true;
          break;

        case "response":
          state.teachersTableData = data || [];
          state.placeholder = false;
          break;

        case "failure":
          state.placeholder = false;
          break;
        default:
          break;
      }
    },

    updateStudentsTableData(state, action) {
      const { type, data } = action.payload;
      switch (type) {
        case "request":
          state.placeholder = true;
          break;

        case "response":
          state.studentsTableData = data || [];
          state.placeholder = false;
          break;

        case "failure":
          state.placeholder = false;
          break;
        default:
          break;
      }
    },

    handleUpdateClassroomName(state, action) {
      state.classroom_name = action.payload;
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

    // updateClassroomForm: (state, action) => {
    //     state.classroomForm = { ...state.classroomForm, ...action.payload };
    // },

    updateDashboardOverviewData(state, action) {
      const { type, data } = action.payload;
      const { total_teachers, total_students, total_classrooms, total_tests } =
        data || {};
      const loading = "dashboard_overview_data";
      switch (type) {
        case "request":
          state.overall_loading.push(loading);
          break;

        case "response":
          state.dashboard_overview.total_teachers = total_teachers || "";
          state.dashboard_overview.total_students = total_students || "";
          state.dashboard_overview.total_classrooms = total_classrooms || "";
          state.dashboard_overview.total_tests = total_tests || "";
          state.overall_loading = state.overall_loading.filter(
            (item) => item !== loading
          );
          break;

        case "failure":
          state.overall_loading = state.overall_loading.filter(
            (item) => item !== loading
          );
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
        student_file: null,
      };
      state.errors = {};
    },

    // clearFieldError: (state, action) => {
    //     const fieldName = action.payload;
    //     if (state.errors[fieldName]) {
    //         const { [fieldName]: removed, ...rest } = state.errors;
    //         state.errors = rest;
    //     }
    // },

    // clearErrors: (state, action) => {
    //     const fields = action.payload;
    //     if (Array.isArray(fields)) {
    //         fields.forEach(field => {
    //             if (state.errors[field]) {
    //                 delete state.errors[field];
    //             }
    //         });
    //     }
    // },

    clearFieldError: (state, action) => {
      const fields = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      fields.forEach((fieldName) => {
        if (state.errors[fieldName]) {
          delete state.errors[fieldName];
        }
      });
    },

    updateDashboardTeachersList(state, action) {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.placeholder = true;
          break;

        case "response":
          state.dashboard_teachers_list = data || [];
          state.placeholder = false;
          break;

        case "failure":
          state.placeholder = false;
          break;
        default:
          break;
      }
    },
    updateEditDashboardTeacher(state, action) {
      state.edit_dashboard_teacher = action.payload;
    },
    onChangeEditDashboardTeacher(state, action) {
      const { field, data } = action.payload;
      state.edit_dashboard_teacher[field] = data || "";
    },

    updateEditClassroomTeacher(state, action) {
      state.edit_classroom_teacher = action.payload;
    },
    onChangeEditClassroomTeacher(state, action) {
      const { field, data } = action.payload;
      state.edit_classroom_teacher[field] = data || "";
    },

    updateEditClassroomStudent(state, action) {
      state.edit_classroom_student = action.payload;
    },
    onChangeEditClassroomStudent(state, action) {
      const { field, data } = action.payload;
      state.edit_classroom_student[field] = data || "";
    },

    onChangeStaffForm(state, action) {
      const { field, data } = action.payload;
      state.staffForm[field] = data || "";
    },

    onChangeClassroomForm: (state, action) => {
      const { field, data } = action.payload;
      state.classroomForm[field] = data || "";
    },

    editDashboardTeachersData(state, action) {
      const { type, data } = action.payload;
      switch (type) {
        case "request":
          state.placeholder2 = true;
          break;

        case "response":
          state.dashboard_teachers_list = data || [];
          state.placeholder2 = false;
          break;

        case "failure":
          state.placeholder2 = false;
          break;
        default:
          break;
      }
    },

    editClassroomTeachersData(state, action) {
      const { type, data } = action.payload;
      switch (type) {
        case "request":
          state.placeholder2 = true;
          break;

        case "response":
          state.teachersTableData = data || [];
          state.placeholder2 = false;
          break;

        case "failure":
          state.placeholder2 = false;
          break;

        default:
          break;
      }
    },

    editClassroomStudentsData(state, action) {
      const { type, data } = action.payload;
      switch (type) {
        case "request":
          state.placeholder2 = true;
          break;

        case "response":
          state.studentsTableData = data || [];
          state.placeholder2 = false;
          break;

        case "failure":
          state.placeholder2 = false;
          break;

        default:
          break;
      }
    },

    editClassroomData(state, action) {
      const { type, data } = action.payload;
      const loading = "update_classrooms_Json";
      switch (type) {
        case "request":
          state.overall_loading.push(loading);
          break;
        case "response":
          state.overall_loading = state.overall_loading.filter(
            (item) => item !== loading
          );
          state.classroomsJson = data || [];
          break;
        case "failure":
          state.overall_loading = state.overall_loading.filter(
            (item) => item !== loading
          );
          break;
        default:
          break;
      }
    },

    updatePersonalInfoInputs(state, action) {
      const { first_name, last_name, email_id, phone_number, address } =
        action?.payload?.[0];
      state.profileInputs.first_name = first_name;
      state.profileInputs.last_name = last_name;
      state.profileInputs.email_id = email_id;
      state.profileInputs.phone_number = phone_number;
      state.profileInputs.address = address;
      state.editProfileInputs.first_name = first_name;
      state.editProfileInputs.last_name = last_name;
      state.editProfileInputs.email_id = email_id;
      state.editProfileInputs.phone_number = phone_number;
      state.editProfileInputs.address = address;
    },

    updateProfileEditing: (state, action) => {
      state.isProfileEditing = !state.isProfileEditing;
    },
    updateSettingsInputs: (state, action) => {
      const { field, value } = action.payload;
      state.settingsInputs[field] = value;
    },
    edit_profile_Inputs: (state, action) => {
      const { field, value } = action.payload;
      state.editProfileInputs[field] = value;
    },

    handleEditProfileDetails(state, action) {
      const { type , data} = action.payload;
      console.log("data :", data)
      switch (type) {
        case "request":
          state.placeholder = true;
          break;

        case "response":
          state.placeholder = false;
          break;

        case "failure":
          state.placeholder = false;
          break;

        default:
          break;
      }
    },

    handlechangePassword(state, action) {
      const { type } = action.payload;
      switch (type) {
        case "request":
          state.placeholder = true;
          break;

        case "response":
          state.placeholder = false;
          state.settingsInputs = {
            old_password: "",
            confirm_password: "",
            new_password: "",
          }
          break;

        case "failure":
          state.placeholder = false;
          break;

        default:
          break;
      }
    },

    handleGetDashboardChartData(state, action) {
      const { type, data } = action.payload;
      const loading = "dashboard_chart_data";
      switch (type) {
        case "request":
          state.overall_loading.push(loading);
          break;
        case "response":
          state.overall_loading = state.overall_loading.filter(
            (item) => item !== loading
          );
          state.dashboard_chart_data = data?.test_performance || [];
          state.dashboard_chart_years = data?.years;
          break;
        case "failure":
          state.overall_loading = state.overall_loading.filter(
            (item) => item !== loading
          );
          break;
        default:
          break;
      }
    },

    updateDashboardOverviewData(state, action) {
      const { type, data } = action.payload;
      const { total_teachers, total_students, total_classrooms, total_tests } =
        data || {};
      const loading = "dashboard_overview_data";
      switch (type) {
        case "request":
          state.overall_loading.push(loading);
          break;

        case "response":
          state.dashboard_overview.total_teachers = total_teachers || "";
          state.dashboard_overview.total_students = total_students || "";
          state.dashboard_overview.total_classrooms = total_classrooms || "";
          state.dashboard_overview.total_tests = total_tests || "";
          state.overall_loading = state.overall_loading.filter(
            (item) => item !== loading
          );
          break;

        case "failure":
          state.overall_loading = state.overall_loading.filter(
            (item) => item !== loading
          );
          break;
        default:
          break;
      }
    },

    handleGetClassroomChartData(state, action) {
      const { type, data } = action.payload;
      const loading = "classroom_chart_data";
      switch (type) {
        case "request":
          state.overall_loading.push(loading);
          break;
        case "response":
          state.overall_loading = state.overall_loading.filter((item) => item !== loading);
          state.classroom_chart_data = data.performance || [];
          state.classroom_chart_years = data.years || []
          break;
        case "failure":
          state.overall_loading = state.overall_loading.filter((item) => item !== loading);
          break;
        default:
          break;
      }
    },

    getCreateClassroomModalTeachers(state, action) {
      const { type, data } = action.payload;
      const loading = "create_classroom_modal_teachers_list";
      switch (type) {
        case "request":
          state.overall_loading.push(loading);
          break;
        case "response":
          state.overall_loading = state.overall_loading.filter(
            (item) => item !== loading
          );
          state.create_classroom_modal_teachers_list = data || [];
          break;
        case "failure":
          state.overall_loading = state.overall_loading.filter(
            (item) => item !== loading
          );
          break;
        default:
          break;
      }
    },

    updateDeleteClassroomData(state, action) {
      const data = action.payload;
      state.delete_classroom_data = {
        id: data.id || "",
        classroom_name: data.classroom_name || "",
      };
    },

    update_settings_eye(state, action) {
      const [key , value] = Object.entries(action.payload || {})?.[0]
      state.settings_password[key] = value || false
    },

  },

  extraReducers(builder) {
    builder.addCase("common_slice/updateModalShow", (state, action) => {
      const { show } = action.payload;
      if (!show) {
        state.staffForm = {
          name: "",
          email_id: "",
          subject_name: "",
          institute_name: "",
        };
        state.errors = {};
        state.file = null;
        state.classroomForm = {
          class_name: "",
          teachers: [],
          student_file: null,
        };
      }
    });
  },
});

const { actions, reducer } = adminSlice;

export const {
  updateGetAllClassroomsData,
  handleUpdateClassroomId,
  updateClassroomsOverviewData,
  updateTeachersTableData,
  updateStudentsTableData,
  handleUpdateClassroomName,

  setFile,
  updateStaffForm,
  setErrors,
  clearForm,
  setLoading,
  updateClassroomForm,
  updateDashboardOverviewData,
  setClassroomErrors,
  clearClassroomForm,
  clearFieldError,
  clearErrors,
  updateDashboardTeachersList,
  updateEditDashboardTeacher,
  onChangeEditDashboardTeacher,
  updateEditClassroomTeacher,
  onChangeEditClassroomTeacher,
  updateEditClassroomStudent,
  onChangeEditClassroomStudent,
  onChangeStaffForm,
  onChangeClassroomForm,
  editDashboardTeachersData,
  editClassroomTeachersData,
  editClassroomStudentsData,
  updatePersonalInfoInputs,
  updateProfileEditing,
  updateSettingsInputs,
  edit_profile_Inputs,
  handleEditProfileDetails,
  handlechangePassword,
  handleGetDashboardChartData,
  handleGetClassroomChartData,
  getCreateClassroomModalTeachers,
  updateDeleteClassroomData,
  editClassroomData,
  update_settings_eye
} = actions;

export default reducer;
