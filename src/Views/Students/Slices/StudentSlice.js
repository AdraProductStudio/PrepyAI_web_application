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
            test_end_on: Cookies.get("testEndOn") || '',
            remaining_time: null,
            selectedQuestionIndex: 0,
            answeredQuestionPercentage: 0,
            isDataPresentInIndexedDb: false,
            submit_spinner_loading: false,
            submit_test: false
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
        subject_attachments: {},
        upcoming_tests: [],
        offline_tests: [],

        classroom_data: {
            classroom_code: '',
            loading: false
        },
        upload_learner_book: {
            book_name: "",
            book_file: null,
            loading: false,
        },
        upload_test_paper: {
            test_name: '',
            register_number: null,
            test_file: null,
            loading: false,
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
                    state.mcq_test.submit_spinner_loading = submit_spinner_loading
                    break;

                case "response":
                    state.mcq_test.submit_spinner_loading = false
                    break;

                case "failure":
                    state.mcq_test.submit_spinner_loading = false
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
                    ).then((db) => {
                        const transaction = db.transaction(
                            process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME,
                            "readwrite"
                        );
                        const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME);
                        const objects = data?.assigned_questions || [];

                        // Store each question with index as ID
                        objects.forEach((obj, ind) => {
                            store.put({
                                ...obj,
                                id: ind, // used to retrieve/update
                                candidate_answer: obj.candidate_answer || ""
                            });
                        });

                        transaction.oncomplete = () => console.log("✅ Questions stored in IndexedDB");
                    }).catch(console.error);

                    state.mcq_test.questions = data?.assigned_questions || [];
                    state.mcq_test.test_end_on = data?.test_EndedOn || "";
                    state.mcq_test.is_question_loaded = true;
                    state.mcq_test.isDataPresentInIndexedDb = data?.assigned_questions?.length > 0;
                    break;

                default:
                    break;
            }
        },
        updateQuestionType(state, action) {
            state.question_type = action.payload
        },
        updateAudioRecording(state, action) {
            state.recording = action.payload
        },
        updateMcqResult(state, action) {
            const { data } = action.payload
            state.mcq_test.result = data.results || []
            state.mcq_test.summary = data.summary || {}
            state.mcq_test.isDataPresentInIndexedDb = false
        },
        resetMcq: (state) => {
            state.mcq_test = {
                is_question_loaded: false,
                questions: [],
                result: [],
                summary: {},
                test_end_on: Cookies.get("testEndOn") || '',
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
            state.all_learner_books = action.payload || {}
        },
        getAllTests(state, action) {
            state.all_tests = action.payload || []
        },
        getOverallPerformance(state, action) {
            state.overall_performance = action.payload || []
        },
        getSubjectPerformance(state, action) {
            state.subject_performance = action.payload || []
        },
        getBookPerformance(state, action) {
            state.book_performance = action.payload || []
        },
        getAllTestHistory(state, action) {
            state.all_test_history = action.payload || []
        },
        getBookTestHistory(state, action) {
            state.book_test_history = action.payload || []
        },
        getAllSubjects(state, action) {
            state.all_subjects = action.payload || []
        },
        getSubjectBooks(state, action) {
            state.subject_books = action.payload || []
        },
        getSubjectAttachments(state, action) {
            state.subject_attachments = action.payload || {}
        },
        getUpcomingTests(state, action) {
            state.upcoming_tests = action.payload || []
        },
        updateTestId(state, action) {
            const { id } = action.payload
            state.test_id = id
            localStorage.setItem("test_id", id)
        },
        getMcqQuestions(state, action) {
            const { type, data, loading } = action.payload

            switch (type) {
                case "request":
                    state.mcq_loading = loading
                    break;
                case "response":
                    // state.mcq_test.questions = data || []
                    state.mcq_loading = false
                    break;
                case "failure":
                    // state.mcq_test.questions = []
                    state.mcq_loading = false
                    break;

                default:
                    break;
            }
        },
        getOfflineTests(state, action) {
            const { type, data, offline_tests_loading } = action.payload

            switch (type) {
                case "request":
                    state.offline_tests = offline_tests_loading
                case "response":
                    state.offline_tests = (Array.isArray(data) || (typeof data !== "object")) ? data : [];
                    state.offline_tests_loading = false
                    break;

                case "failure":
                    state.offline_tests_loading = false
                    break;

                default:
                    break;
            }
        },

        setUploadLearnerBook(state, action) {
            const { type, data, book_file, book_name, loading } = action.payload;

            switch (type) {
                case "set":
                    if (book_file !== undefined) state.upload_learner_book.book_file = book_file
                    if (book_name !== undefined) state.upload_learner_book.book_name = book_name
                    break;

                case "request":
                    state.upload_learner_book.loading = loading
                    break;

                case "response":
                    state.upload_learner_book.loading = loading
                    state.upload_learner_book.book_name = ''
                    state.upload_learner_book.book_file = null
                    break;

                case "failure":
                    state.upload_learner_book.loading = loading
                    state.upload_learner_book.book_name = ''
                    state.upload_learner_book.book_file = null
                    break

                default:
                    break;
            }
        },

        setClassroomCode(state, action) {
            const { type, data, classroom_code, loading } = action.payload
            switch (type) {
                case "set":
                    if (classroom_code !== undefined) {
                        state.classroom_data.classroom_code = classroom_code;
                    }
                    break;

                case "request":
                    state.classroom_data.loading = loading
                    break;

                case "response":
                    state.classroom_data.classroom_code = ''
                    state.classroom_data.loading = loading
                    break;

                case "failure":
                    state.classroom_data.classroom_code = ''
                    state.classroom_data.loading = loading
                    break;

                default:
                    break;
            }
        },
        setUploadTestPaper(state, action) {
            const { type, data, test_name, test_id, register_number, test_file, loading } = action.payload;

            switch (type) {
                case "set":
                    if (test_name !== undefined) {
                        state.upload_test_paper.test_name = test_name
                    }
                    if (test_id !== undefined) {
                        state.upload_test_paper.test_id = test_id
                    }
                    if (register_number !== undefined) {
                        state.upload_test_paper.register_number = register_number
                    }
                    if (test_file !== undefined) {
                        state.upload_test_paper.test_file = test_file
                    }
                    break;

                case "request":
                    state.upload_test_paper.loading = loading;
                    break;

                case "response":
                    state.upload_test_paper.test_name = '';
                    state.upload_test_paper.register_number = '';
                    state.upload_test_paper.test_file = null;
                    state.upload_test_paper.loading = loading;
                    break;

                case "failure":
                    state.upload_test_paper.test_name = '';
                    state.upload_test_paper.register_number = '';
                    state.upload_test_paper.test_file = null;
                    state.upload_test_paper.loading = loading;
                    break;

                default:
                    break;
            }
        },
        updateQuestionType(state, action) {
            state.question_type = action.payload
        },
        updateAudioRecording(state, action) {
            state.recording = action.payload
        },
        updatePersonalInfoInputs: (state, action) => {
            if (!action.payload) return

            state.profileInputs = {
                ...state.profileInputs,
                ...action.payload,
            }

            state.editProfileInputs = {
                ...state.editProfileInputs,
                ...action.payload,
            }
        },
        updateSettingsInputs: (state, action) => {
            const { field, value } = action.payload;
            state.settingsInputs[field] = value
        },
        resetSettingsInputs: (state, action) => {
            state.settingsInputs.old_password = ""
            state.settingsInputs.new_password = ""
            state.settingsInputs.confirm_password = ""
        },
        editProfileInputs: (state, action) => {
            const { field, value } = action.payload;
            state.editProfileInputs[field] = value

        },
        updateProfileEditing: (state, action) => {
            state.isProfileEditing = !state.isProfileEditing
        }


    },
    extraReducers(builder) {
        builder
            .addCase("common_slice/updateModalShow", (state, action) => {
                const { show } = action.payload
                if (!show) {
                    state.classroom_data = {
                        classroom_code: '',
                        loading: false
                    };
                    state.upload_learner_book = {
                        book_name: "",
                        book_file: null,
                        loading: false,
                    };
                    state.upload_test_paper = {
                        test_name: '',
                        register_number: null,
                        test_file: null,
                        loading: false,
                    };
                }
            })
    }
})



const { actions, reducer } = TeacherSlice;

export const {
    caluculateRemainingTime, updateSelectedQuestionIndex, updateRemainingTestTiming, updateTimeOverCloseTest, updateManualCloseTest,
    updateAnswers, updateTestEndOn, updateMcqSubmitSpinner, getQuestionFromDb, getQuestionsEndpoint, updateMcqResult, resetMcq,
    setLoading, getLearnerBooks, getAllTests, getOverallPerformance, getSubjectPerformance, getBookPerformance,
    getAllTestHistory, getAllSubjects, getSubjectBooks, getSubjectAttachments, getUpcomingTests,
    getOfflineTests, getBookTestHistory, updateTestId, getMcqQuestions,
    setUploadLearnerBook, setClassroomCode, setUploadTestPaper, updateAudioRecording, updateQuestionType,
    updatePersonalInfoInputs, updateSettingsInputs, resetSettingsInputs, editProfileInputs, updateProfileEditing

} = actions;


export default reducer;