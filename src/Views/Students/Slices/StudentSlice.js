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
            test_end_on: "2025-08-05T15:56:09.707Z",
            remaining_time: null,
            selectedQuestionIndex: 0,
            answeredQuestionPercentage: 0,
            isDataPresentInIndexedDb: false,
            submit_spinner_loading: false,
            submit_test: false
        },

        test_id: null,
        mcq_loading: false,

        learner_books_loading: false,
        all_learner_books: {},
        all_tests: [],
        overall_performance: [],
        all_test_history: [],
        book_test_history: [],
        all_subjects: [],
        subject_books: [],
        subject_attachments: {},
        upcoming_tests: [],
        offline_tests: [],
        all_tests_loading: false,
        overall_performance_loading: false,
        all_test_history_loading: false,
        book_test_history_loading: false,
        subjects_loading: false,
        subject_books_loading: false,
        subject_attachments_loading: false,
        upcoming_tests_loading: false,
        offline_tests_loading: false,

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
         question_type:"",
         recording:""
    },
    reducers: {
        caluculateRemainingTime: (state, action) => {
            const { remaining_time } = action.payload;
            if (!remaining_time) state.mcq_test.test_end_on = "";
            state.mcq_test.remaining_time = remaining_time;
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
            state.mcq_test.remaining_time = action.payload
        },
        updateTimeOverCloseTest(state, action) {
            Cookies.remove("testEndOn")
            state.mcq_test.remaining_time = null;
            state.mcq_test.test_end_on = null;
            state.mcq_test.remaining_time = null;
            state.mcq_test.answeredQuestionPercentage = 0;
            state.mcq_test.selectedQuestionIndex = 0;
            state.mcq_test.questions = []
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
        updateQuestionType(state,action){
            state.question_type=action.payload
        },
        updateAudioRecording(state,action){
            state.recording = action.payload
        },
        updateMcqResult(state, action) {
            const { data } = action.payload
            state.mcq_test.result = data.results || []
            state.mcq_test.summary = data.summary || {}
        },
        getLearnerBooks(state, action) {
            const { type, data, learner_books_loading } = action.payload

            switch (type) {
                case "request":
                    state.learner_books_loading = learner_books_loading
                    break;

                case "response":
                    state.all_learner_books = data || {}
                    state.learner_books_loading = false
                    break;

                case "failure":
                    state.all_learner_books = {}
                    state.learner_books_loading = false
                    break;

                default:
                    break;
            }
        },
        getAllTests(state, action) {
            const { type, data, all_tests_loading } = action.payload

            switch (type) {
                case "request":
                    state.all_tests_loading = all_tests_loading
                    break;

                case "response":
                    state.all_tests = data || []
                    state.all_tests_loading = false
                    break;

                case "failure":
                    state.all_tests = []
                    state.all_tests_loading = false
                    break;

                default:
                    break;
            }
        },
        getOverallPerformance(state, action) {
            const { type, data, overall_performance_loading } = action.payload

            switch (type) {
                case "request":
                    state.overall_performance_loading = overall_performance_loading
                    break;
                case "response":
                    state.overall_performance = data || []
                    state.overall_performance_loading = false
                    break;

                case "failure":
                    state.overall_performance = []
                    state.overall_performance_loading = false
                    break;

                default:
                    break;
            }
        },
        getAllTestHistory(state, action) {
            const { type, data, all_test_history_loading } = action.payload

            switch (type) {
                case "request":
                    state.all_test_history_loading = all_test_history_loading
                    break;
                case "response":
                    state.all_test_history = data || []
                    state.all_test_history_loading = false
                    break;

                case "failure":
                    state.all_test_history = []
                    state.all_test_history_loading = false
                    break;

                default:
                    break;
            }
        },
        getBookTestHistory(state, action) {
            const { type, data, book_test_history_loading } = action.payload

            switch (type) {
                case "request":
                    state.book_test_history_loading = book_test_history_loading
                    break;
                case "response":
                    state.book_test_history = data || []
                    state.book_test_history_loading = false
                    break;

                case "failure":
                    state.book_test_history = []
                    state.book_test_history_loading = false
                    break;

                default:
                    break;
            }
        },
        getAllSubjects(state, action) {
            const { type, data, subjects_loading } = action.payload

            switch (type) {
                case "request":
                    state.subjects_loading = subjects_loading
                    break;
                case "response":
                    state.all_subjects = data || []
                    state.subjects_loading = false
                    break;

                case "failure":
                    state.all_subjects = []
                    state.subjects_loading = false
                    break;

                default:
                    break;
            }
        },
        getSubjectBooks(state, action) {
            const { type, data, subject_books_loadingg } = action.payload

            switch (type) {
                case "request":
                    state.subject_books_loadingg = subject_books_loadingg
                    break;
                case "response":
                    state.subject_books = data || []
                    state.subject_books_loadingg = false
                    break;

                case "failure":
                    state.subject_books = []
                    state.subject_books_loadingg = false
                    break;

                default:
                    break;
            }
        },
        getSubjectAttachments(state, action) {
            const { type, data, subject_attachments_loading } = action.payload

            switch (type) {
                case "request":
                    state.subject_attachments_loading = subject_attachments_loading
                    break;
                case "response":
                    state.subject_attachments = data || {}
                    state.subject_attachments_loading = false
                    break;

                case "failure":
                    state.subject_attachments = {}
                    state.subject_attachments_loading = false
                    break;

                default:
                    break;
            }
        },
        getUpcomingTests(state, action) {
            const { type, data, upcoming_tests_loading } = action.payload

            switch (type) {
                case "request":
                    state.upcoming_tests_loading = upcoming_tests_loading
                    break;
                case "response":
                    state.upcoming_tests = data || []
                    state.upcoming_tests_loading = false
                    break;

                case "failure":
                    state.upcoming_tests = []
                    state.upcoming_tests_loading = false
                    break;

                default:
                    break;
            }
        },
        updateTestId(state, action) {
            const { id } = action.payload
            state.test_id = id
        },
        getMcqQuestions(state, action) {
            const { type, data, loading } = action.payload

            switch (type) {
                case "request":
                    state.mcq_loading = loading
                case "response":
                    state.mcq_test.questions = data || []
                    state.mcq_loading = false
                    break;

                case "failure":
                    state.mcq_test.questions = []
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
        updateQuestionType(state,action){
            state.question_type=action.payload
        },
        updateAudioRecording(state,action){
            state.recording = action.payload
        }


    }
})



const { actions, reducer } = TeacherSlice;

export const {
    caluculateRemainingTime, updateSelectedQuestionIndex, updateRemainingTestTiming, updateTimeOverCloseTest,
    updateAnswers, updateMcqSubmitSpinner, getQuestionFromDb, getQuestionsEndpoint,updateQuestionType,updateAudioRecording, updateMcqResult, getLearnerBooks, getAllTests,
    getOverallPerformance, getAllTestHistory, getAllSubjects, getSubjectBooks,
    getSubjectAttachments, getUpcomingTests, getOfflineTests, getBookTestHistory, updateTestId, getMcqQuestions,
    setUploadLearnerBook, setClassroomCode, setUploadTestPaper

} = actions;


export default reducer;