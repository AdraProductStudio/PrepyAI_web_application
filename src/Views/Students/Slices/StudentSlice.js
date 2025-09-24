import { createSlice } from "@reduxjs/toolkit";
import { initializeDB } from "Components/CustomHooks";
import Cookies from "js-cookie";

const TeacherSlice = createSlice({
  name: "student_slice",
  initialState: {
    mcq_test: {
      is_question_loaded: false,
      questions: [],
      result: [],
      summary: {},
      performance: "",
      test_end_on: Cookies.get("testEndOn") || "",
      remaining_time: null,
      selectedQuestionIndex: 0,
      answeredQuestionPercentage: 0,
      isDataPresentInIndexedDb: false,
      submit_spinner_loading: false,
      submit_test: false,
    },

    test_id: localStorage.getItem("test_id") || null,
    mcq_loading: false,

    loading: {},
    all_learner_books: {},
    all_tests: [],
    overall_performance: [],
    subject_performance: [],
    book_performance: [],
    all_test_history: [],
    book_test_history: [],
    all_subjects: [],
    subject_books: [],
    book_url: {},
    subject_attachments: {},
    upcoming_tests: [],
    offline_tests: [],

    classroom_data: {
      classroom_code: "",
      loading: false,
    },
    upload_learner_book: {
      book_name: "",
      book_file: null,
      loading: false,
    },
    upload_test_paper: {
      test_name: "",
      register_number: null,
      test_file: null,
      loading: false,
       test_id:null
    },
    dashboard_pagination_inputs:{
      page:0,
      search_query:''
    },
    selected_book_to_delete: {
      is_loading: false,
      data: {}
    },
    question_type: "",
    recording: "",

        isProfileEditing: false,
        profileInputs: {
            first_name: "",
            last_name: "",
            email_id: "",
            phone_number: "",
            reg_no: "",
            class_name: "",
            address: ""
        },
        editProfileInputs: {
            first_name: "",
            last_name: "",
            email_id: "",
            phone_number: "",
            reg_no: "",
            class_name: "",
            address: ""

        },
        settingsInputs: {
            old_password: "",
            new_password: "",
            confirm_password: "",
        },
        recording: "",
        offCanvasShow: false,
        generate_question: {
            test_language: "",
            level_of_test: "",
            long_questions: [],
            mcq_questions: [],
            loading: false,
            summary: {},
            test_status: "start",
            overall_levels: [],
            performance: "",
            bookmarks_loading:false

        },
        placeholder: false,
        errors: {},
    settings_password : {
      show_old_password : false,
      show_new_password : false,
      show_confirm_password : false,
    }
    },
    reducers: {
        caluculateRemainingTime: (state, action) => {
            const { remaining_time } = action.payload;
            if (!remaining_time) state.mcq_test.test_end_on = "";
            state.mcq_test.remaining_time = remaining_time;
        },
        updateTestEndOn: (state, action) => {
            const { test_end_on } = action.payload;
            state.mcq_test.test_end_on = test_end_on;
        },
        updateSelectedQuestionIndex: (state, action) => {
            state.mcq_test.selectedQuestionIndex = action.payload.selectedQuestionIndex;
        },
        updateAnswers(state, action) {
            const answeredQues = action.payload?.filter((v) => v?.candidate_answer !== '')
            state.mcq_test.questions = action.payload;
            state.mcq_test.answeredQuestionPercentage = answeredQues?.length / action.payload?.length * 100;
        },
        getQuestionFromDb: (state, action) => {
            const answeredQues = action.payload?.filter((v) => v?.candidate_answer !== '')
            state.mcq_test.questions = action.payload;
            state.mcq_test.isDataPresentInIndexedDb = action.payload?.length ? true : false;
            state.mcq_test.answeredQuestionPercentage = answeredQues?.length / action.payload?.length * 100;
            state.mcq_test.is_question_loaded = true;
        },
        updateRemainingTestTiming(state, action) {
            state.mcq_test.remaining_time = action.payload || null
        },
        updateTimeOverCloseTest(state, action) {
            Cookies.remove("testEndOn")
            state.mcq_test.remaining_time = null;
            state.mcq_test.test_end_on = null;
            state.mcq_test.remaining_time = null;
            state.mcq_test.answeredQuestionPercentage = 0;
            state.mcq_test.selectedQuestionIndex = 0;
            state.mcq_test.questions = [];
            state.mcq_test.submit = true
        },
        updateManualCloseTest(state, action) {
            Cookies.remove("testEndOn")
            state.mcq_test.remaining_time = null;
            state.mcq_test.test_end_on = null;
            state.mcq_test.remaining_time = null;
            state.mcq_test.answeredQuestionPercentage = 0;
            state.mcq_test.selectedQuestionIndex = 0;
            state.mcq_test.questions = []
            state.mcq_test.submit = true
        },
        updateMcqSubmitSpinner(state, action) {
            const { type, data, submit_spinner_loading } = action.payload

      switch (type) {
        case "request":
          state.mcq_test.submit_spinner_loading = submit_spinner_loading;
          break;

        case "response":
          state.mcq_test.submit_spinner_loading = false;
          break;

        case "failure":
          state.mcq_test.submit_spinner_loading = false;
          break;

        default:
          break;
      }
    },
    getQuestionsEndpoint(state, action) {
      const { type, data } = action.payload;

      switch (type) {
        case "response":
          initializeDB(
            process.env.REACT_APP_INDEXEDDB_DATABASE_NAME,
            process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION,
            process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME
          )
            .then((db) => {
              const transaction = db.transaction(
                process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME,
                "readwrite"
              );
              const store = transaction.objectStore(
                process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME
              );
              const objects = data?.assigned_questions || [];

              // Store each question with index as ID
              objects.forEach((obj, ind) => {
                store.put({
                  ...obj,
                  id: ind, // used to retrieve/update
                  candidate_answer: obj.candidate_answer || "",
                });
              });

              transaction.oncomplete = () =>
                console.log("✅ Questions stored in IndexedDB");
            })
            .catch(console.error);

          state.mcq_test.questions = data?.assigned_questions || [];
          state.mcq_test.test_end_on = data?.test_EndedOn || "";
          state.mcq_test.is_question_loaded = true;
          state.mcq_test.isDataPresentInIndexedDb =
            data?.assigned_questions?.length > 0;
          break;

        default:
          break;
      }
    },
    updateQuestionType(state, action) {
      state.question_type = action.payload;
    },
    updateAudioRecording(state, action) {
      state.recording = action.payload;
    },
    updateMcqResult(state, action) {
      const { data } = action.payload;
      state.mcq_test.result = data?.validated_results?.results || [];
      state.mcq_test.summary = data?.validated_results?.summary || {};
      state.mcq_test.performance = data?.performance || "";
      state.mcq_test.isDataPresentInIndexedDb = false;
    },
    resetMcq: (state) => {
      state.mcq_test = {
        is_question_loaded: false,
        questions: [],
        result: [],
        summary: {},
        test_end_on: Cookies.get("testEndOn") || "",
        remaining_time: null,
        selectedQuestionIndex: 0,
        answeredQuestionPercentage: 0,
        isDataPresentInIndexedDb: false,
        submit_spinner_loading: false,
        submit_test: false,
      };
    },
    setLoading(state, action) {
      const { key, value } = action.payload;
      state.loading[key] = value;
    },
    getLearnerBooks(state, action) {
      state.all_learner_books = action.payload || {};
    },
    getAllTests(state, action) {
      state.all_tests = action.payload || [];
    },
    getOverallPerformance(state, action) {
      state.overall_performance = action.payload || [];
    },
    getSubjectPerformance(state, action) {
      state.subject_performance = action.payload || [];
    },
    getBookPerformance(state, action) {
      state.book_performance = action.payload || [];
    },
    getBookUrl(state, action) {
      state.book_url = action.payload || {};
    },
    getAllTestHistory(state, action) {
      state.all_test_history = action.payload || [];
    },
    getBookTestHistory(state, action) {
      state.book_test_history = action.payload || [];
    },
    getAllSubjects(state, action) {
      state.all_subjects = action.payload || [];
    },
    getSubjectBooks(state, action) {
      state.subject_books = action.payload || [];
    },
    getSubjectAttachments(state, action) {
      state.subject_attachments = action.payload || {};
    },
    getUpcomingTests(state, action) {
      state.upcoming_tests = action.payload || [];
    },
    updateTestId(state, action) {
      const { id } = action.payload;
      state.test_id = id;
      localStorage.setItem("test_id", id);
    },
    getMcqQuestions(state, action) {
      const { type, data, loading } = action.payload;

      switch (type) {
        case "request":
          state.mcq_loading = loading;
          break;
        case "response":
          // state.mcq_test.questions = data || []
          state.mcq_loading = false;
          break;
        case "failure":
          // state.mcq_test.questions = []
          state.mcq_loading = false;
          break;

        default:
          break;
      }
    },
    getOfflineTests(state, action) {
      state.offline_tests =
        Array.isArray(action.payload) || typeof action.payload !== "object"
          ? action.payload
          : [];
      // const { type, data, offline_tests_loading } = action.payload

      // switch (type) {
      //     case "request":
      //         state.offline_tests = offline_tests_loading
      //     case "response":
      //         state.offline_tests = (Array.isArray(data) || (typeof data !== "object")) ? data : [];
      //         state.offline_tests_loading = false
      //         break;

      //     case "failure":
      //         state.offline_tests_loading = false
      //         break;

      //     default:
      //         break;
      // }
    },
    setUploadLearnerBook(state, action) {
      const { type, data, book_file, book_name, loading } = action.payload;

      switch (type) {
        case "set":
          if (book_file !== undefined)
            state.upload_learner_book.book_file = book_file;
          if (book_name !== undefined)
            state.upload_learner_book.book_name = book_name;
          break;

        case "request":
          state.upload_learner_book.loading = loading;
          break;

                case "response":
                    state.upload_learner_book.loading = loading
                    state.upload_learner_book.book_name = ''
                    state.upload_learner_book.book_file = null
                    state.dashboard_pagination_inputs.page = 0
                    state.dashboard_pagination_inputs.search_query=''
                    break;

        case "failure":
          state.upload_learner_book.loading = loading;
          state.upload_learner_book.book_name = "";
          state.upload_learner_book.book_file = null;
          break;

                default:
                    break;
            }
        },
        clear_learnerboook_upload_fields(state, action) {
            state.upload_learner_book.book_file = null;
        },

    setClassroomCode(state, action) {
      const { type, data, classroom_code, loading } = action.payload;
      switch (type) {
        case "set":
          if (classroom_code !== undefined) {
            state.classroom_data.classroom_code = classroom_code;
          }
          break;

        case "request":
          state.classroom_data.loading = loading;
          break;

        case "response":
          state.classroom_data.classroom_code = "";
          state.classroom_data.loading = loading;
          break;

        case "failure":
          state.classroom_data.classroom_code = "";
          state.classroom_data.loading = loading;
          break;

        default:
          break;
      }
    },
    setUploadTestPaper(state, action) {
      const {
        type,
        data,
        test_name,
        test_id,
        register_number,
        test_file,
        loading,
      } = action.payload;

      switch (type) {
        case "set":
          if (test_name !== undefined) {
            state.upload_test_paper.test_name = test_name;
          }
          if (test_id !== undefined) {
            state.upload_test_paper.test_id = test_id;
          }
          if (register_number !== undefined) {
            state.upload_test_paper.register_number = register_number;
          }
          if (test_file !== undefined) {
            state.upload_test_paper.test_file = test_file;
          }
          break;

        case "request":
          state.upload_test_paper.loading = loading;
          break;

        case "response":
          state.upload_test_paper.test_name = "";
          state.upload_test_paper.register_number = "";
          state.upload_test_paper.test_file = null;
          state.upload_test_paper.loading = loading;
          break;

        case "failure":
          state.upload_test_paper.test_name = "";
          state.upload_test_paper.register_number = "";
          state.upload_test_paper.test_file = null;
          state.upload_test_paper.loading = loading;
          break;

        default:
          break;
      }
    },
    clear_test_upload_fields(state, action) {
      state.upload_test_paper.test_file = null;
    },
    updateQuestionType(state, action) {
      state.question_type = action.payload;
    },
    updateAudioRecording(state, action) {
      state.recording = action.payload;
    },
    updateGenerateQuestionFields(state, action) {
      const updates = action.payload;
      Object.entries(updates).forEach(([key, value]) => {
        state.generate_question[key] = value;
      });
    },
    get_bookmarks(state, action) {
      const { type, data } = action.payload;
      switch (type) {
        case "request":
          state.generate_question.bookmarks_loading = true;
          break;
        case "response":
          state.generate_question.bookmarks_loading = false;
          break;
        case "failure":
          state.generate_question.bookmarks_loading = false;
          break;
      }
    },
    update_generate_questions(state, action) {
      const { type, data, type_of_question } = action?.payload;
      switch (type) {
        case "request":
          state.generate_question.loading = true;
          state.generate_question.test_status = "";
          break;
        case "response":
          state.generate_question.loading = false;
          state.generate_question.test_status = "generated";
          if (type_of_question == "mcq") {
            state.generate_question.mcq_questions = data;
          } else if (type_of_question == "long_answer") {
            state.generate_question.long_questions = data;
          }
          break;
        case "failure":
          state.generate_question.loading = false;
          break;
      }
    },
    updateGenerateMcqQuestions(state, action) {
      state.generate_question.mcq_questions = action.payload;
    },
    updateGenerateLongQuestions(state, action) {
      state.generate_question.long_questions = action.payload;
    },
    updateMcqQuestionAnswer(state, action) {
      const { answers, summary } = action.payload;
      state.generate_question.summary = summary;
      const existingQuestions = Array.isArray(
        state?.generate_question?.mcq_questions?.test_questions
      )
        ? state?.generate_question?.mcq_questions?.test_questions
        : [];

      state.generate_question.mcq_questions.test_questions =
        existingQuestions?.map((q) => {
          const answer = answers.find((a) => a.Question_no === q.Question_no);

          if (answer) {
            return {
              ...q,
              candidate_answer: answer.Clicked_Answer,
              correct_answer: answer.Correct_Answer,
              Explanation: answer.Explanation,
              options: answer.options,
            };
          }
          return q;
        });
    },
    updateLongQuestionAnswerValue(state, action) {
      const { Question_no, answer } = action.payload;
      const question =
        state.generate_question.long_questions?.test_questions?.find(
          (q) => q.Question_no === Question_no
        );
      if (question) {
        question.Answer = answer;
      }
    },
    updateLongQuestionAnswer(state, action) {
      const { answers, overall_levels, performance } = action.payload;
      state.generate_question.overall_levels = overall_levels;
      state.generate_question.performance = performance;
      const existingQuestions = Array.isArray(
        state?.generate_question?.long_questions?.test_questions
      )
        ? state?.generate_question?.long_questions?.test_questions
        : [];
      state.generate_question.long_questions.test_questions =
        existingQuestions?.map((q) => {
          const answer = answers.find((a) => a.Question_no === q.Question_no);
          if (answer) {
            return {
              ...q,
              Explanation: answer.Explanation,
            };
          }
          return q;
        });
    },
    submit_test(state, action) {
      const { type, data } = action.payload;
      switch (type) {
        case "request":
          state.generate_question.loading = true;
          break;
        case "response":
          state.generate_question.loading = false;
          state.generate_question.test_status = "submitted";
          break;
        case "failure":
          state.generate_question.loading = false;
          state.generate_question.test_status = "generated";
          break;
      }
    },
    convert_audio_to_text(state, action) {
      const { type, data } = action.payload;
      switch (type) {
        case "request":
          state.generate_question.recording = true;
          break;
        case "response":
          state.generate_question.recording = false;
          break;
        case "failure":
          state.generate_question.recording = false;
          break;
      }
    },
    updatePersonalInfoInputs: (state, action) => {
      if (!action.payload) return;

      state.profileInputs = {
        ...state.profileInputs,
        ...action.payload,
      };

      state.editProfileInputs = {
        ...state.editProfileInputs,
        ...action.payload,
      };
    },
    updateSettingsInputs: (state, action) => {
      const { field, value } = action.payload;
      state.settingsInputs[field] = value;
    },
    resetSettingsInputs: (state, action) => {
      state.settingsInputs.old_password = "";
      state.settingsInputs.new_password = "";
      state.settingsInputs.confirm_password = "";
    },
    editProfileInputs: (state, action) => {
      const { field, value } = action.payload;
      state.editProfileInputs[field] = value;
    },
    updateProfileEditing: (state, action) => {
      state.isProfileEditing = !state.isProfileEditing;
    },
    updateGenerateQuestionCanvas: (state, action) => {
      state.offCanvasShow = action.payload;
    },
    handlechangePassword(state, action) {
      const { type } = action.payload;
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

    setErrors(state, action) {
      state.errors = action.payload;
    },
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
    update_settings_eye(state, action) {
      const [key , value] = Object.entries(action.payload || {})?.[0]
      state.settings_password[key] = value || false
    },
    resetSettingsPasswordEye(state) {
      state.settings_password = {
        show_old_password : false,
        show_new_password : false,
        show_confirm_password : false,
      }
    },
        update_selected_book_to_delete(state,action){
             const data = action?.payload
            Object.entries(data).forEach(([key, value]) => {
                state.selected_book_to_delete[key] = value
            })
        },
        delete_learner_book(state,action){
            const {type} = action.payload
            switch(type){
                case "request":
                    state.selected_book_to_delete.is_loading = true
                    break;
                case "response":
                     state.selected_book_to_delete.is_loading = false
                     state.selected_book_to_delete.data = {}
                    break;
                case "failure":
                     state.selected_book_to_delete.is_loading = false
                    break;
            }
        },
        update_dashboard_pagination_inputs(state,action){
            const inputs = action?.payload
            Object.entries(inputs).forEach(([key,value])=>{
                state.dashboard_pagination_inputs[key] = value
            })
        }
  },
  extraReducers(builder) {
    builder.addCase("common_slice/updateModalShow", (state, action) => {
      const { show } = action.payload;
      if (!show) {
        state.classroom_data = {
          classroom_code: "",
          loading: false,
        };
        state.upload_learner_book = {
          book_name: "",
          book_file: null,
          loading: false,
        };
        state.upload_test_paper = {
          test_name: "",
          register_number: null,
          test_file: null,
          loading: false,
        };

        state.editProfileInputs = {
          first_name: state.profileInputs.first_name,
          last_name: state.profileInputs.last_name,
          email_id: state.profileInputs.email_id,
          phone_number: state.profileInputs.phone_number,
          reg_no: state.profileInputs.reg_no,
          class_name: state.profileInputs.class_name,
          address: state.profileInputs.address,
        };

        state.errors = {}
      }
    });
  },
});

const { actions, reducer } = TeacherSlice;

export const {
  caluculateRemainingTime,
  updateSelectedQuestionIndex,
  updateRemainingTestTiming,
  updateTimeOverCloseTest,
  updateManualCloseTest,
  updateAnswers,
  updateTestEndOn,
  updateMcqSubmitSpinner,
  getQuestionFromDb,
  getQuestionsEndpoint,
  updateMcqResult,
  resetMcq,
  setLoading,
  getLearnerBooks,
  getAllTests,
  getOverallPerformance,
  getSubjectPerformance,
  getBookPerformance,
  getAllTestHistory,
  getAllSubjects,
  getSubjectBooks,
  getSubjectAttachments,
  getUpcomingTests,
  getOfflineTests,
  getBookTestHistory,
  updateTestId,
  getMcqQuestions,
  setUploadLearnerBook,
  setClassroomCode,
  setUploadTestPaper,
  updateAudioRecording,
  updateQuestionType,
  updatePersonalInfoInputs,
  updateSettingsInputs,
  resetSettingsInputs,
  editProfileInputs,
  updateProfileEditing,
  updateGenerateQuestionFields,
  updateGenerateMcqQuestions,
  updateGenerateLongQuestions,
  updateMcqQuestionAnswer,
  updateLongQuestionAnswerValue,
  updateLongQuestionAnswer,
  updateGenerateQuestionCanvas,
  handlechangePassword,
  get_bookmarks,
  update_generate_questions,
  submit_test,
  convert_audio_to_text,
  getBookUrl,
  clear_test_upload_fields,
  clear_learnerboook_upload_fields,
    update_selected_book_to_delete,delete_learner_book,update_dashboard_pagination_inputs,
  setErrors, clearFieldError, update_settings_eye, resetSettingsPasswordEye
} = actions;

export default reducer;
