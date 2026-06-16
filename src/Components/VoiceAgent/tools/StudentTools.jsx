
import { useWebMCP } from '@mcp-b/react-webmcp';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axiosInstance from 'Services/axiosInstance';
import { speakText } from 'Views/Common/Actions/voiceAgentActions';
import ModalComponent from '../../Modal/Modal';
import { updateModalShow } from 'Views/Common/Slices/Common_slice';
import { handleGenerateQuestion } from "Views/Students/Actions/StudentAction"
import { initializeDB } from "Components/CustomHooks"; 
import { update_generate_questions } from 'Views/Students/Slices/StudentSlice';
/**
 * STUDENT WebMCP TOOLS
 */
const StudentTools = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ── Navigate to any student page ────────────────────────────────────────
    useWebMCP({
        name: 'student_navigate',
        description: 'Navigate to any page in the student dashboard. Use this for going to dashboard, subjects, notes, profile, test, timetable.',
        inputSchema: {
            route: z.string().describe('The route to navigate to e.g. /student_dashboard/home'),
            speak: z.string().optional().describe('What to say while navigating'),
        },
        handler: async ({ route, speak }) => {
            navigate(route);
            if (speak) dispatch(speakText(speak));
            return { success: true, navigated_to: route };
        },
    });


    // ── Fetch upcoming tests ────────────────────────────────────────────────
    useWebMCP({
        name: 'student_upcoming_tests',
        description: 'Get all upcoming tests for the student — both scheduled tests and self-generated tests. Call this when student asks about upcoming tests, tests today, or any tests they have.',
        inputSchema: {
            type: 'object',
            properties: {
                subject_id: {
                    type: 'number',
                    description: 'Subject ID to filter tests. Omit to get all upcoming tests.',
                },
            },
        },
        handler: async ({ subject_id } = {}) => {
            const today = new Date().toISOString().split('T')[0];
            const params = {};
            if (subject_id) params.subject_id = subject_id;

            const [scheduledRes, allTestsRes] = await Promise.all([
                axiosInstance.get('/students/get_upcoming_test', { params }).catch(() => ({ data: { success: false } })),
                axiosInstance.get('/students/get_all_tests').catch(() => ({ data: { success: false } })),
            ]);

            const scheduled = scheduledRes.data.success && Array.isArray(scheduledRes.data.data)
                ? scheduledRes.data.data.map((t) => ({
                    id: t.test_id,
                    name: t.test_name,
                    date: t.test_date,
                    time: t.test_time,
                    subject: t.subject_name,
                    type: t.type_of_question,
                    mode: t.mode_of_test,
                    source: 'scheduled',
                }))
                : [];

            const selfTests = allTestsRes.data.success && Array.isArray(allTestsRes.data.data)
                ? allTestsRes.data.data.map((t) => ({
                    id: t.test_id,
                    name: t.test_name,
                    date: t.test_date,
                    time: t.test_time,
                    subject: t.subject_name,
                    type: t.type_of_question,
                    mode: t.mode_of_test,
                    source: 'self_generated',
                }))
                : [];

            const combined = [...scheduled, ...selfTests];

            if (!combined.length) {
                return { success: false, message: 'No tests found' };
            }

            return {
                success: true,
                today,  
                tests: combined,
            };
        },
    });
    // ── Start a test ────────────────────────────────────────────────────────
    useWebMCP({
        name: 'student_start_test',
        description: 'Start a specific test. Requires test_id which you get from student_fetch_tests.',
        inputSchema: {
            test_id: z.number().describe('The ID of the test to start'),
        },
        handler: async ({ test_id }) => {
            const res = await axiosInstance.post('/students/start_test', { test_id });
            if (res.data.success) {
                navigate('/student_dashboard/test');
                return {
                    success: true,
                    message: 'Test started',
                    test_data: res.data.data,
                };
            }
            return { success: false, message: res.data.message || 'Could not start test' };
        },
    });

    // ── Get test question ───────────────────────────────────────────────────
    useWebMCP({
        name: 'student_get_question',
        description: `Get a question from an ONGOING TEACHER-ASSIGNED test only.
        ONLY call after student_start_test succeeds.
        NEVER call after student_generate_questions — self-test questions come from student_get_test_context.`,
        inputSchema: {
            test_id: z.string().describe('The test ID'),
            index: z.number().describe('Question index starting from 0'),
        },
        handler: async ({ test_id, index }) => {
            const res = await axiosInstance.post(`/students/get_test/${index}`, { test_id });
            if (res.data.success && res.data.data) {
                const q = res.data.data;
                return {
                    success: true,
                    question_number: index + 1,
                    question: q.question,
                    type: q.type,
                    options: q.type === 'mcq' ? {
                        a: q.option_a,
                        b: q.option_b,
                        c: q.option_c,
                        d: q.option_d,
                    } : null,
                };
            }
            return { success: false, message: 'Could not get question' };
        },
    });

    // ── Submit MCQ answer ───────────────────────────────────────────────────
    useWebMCP({
        name: 'student_submit_mcq',
        description: 'Submit a multiple choice answer for the current question.',
        inputSchema: {
            test_id: z.string().describe('The test ID'),
            question_id: z.string().describe('The question ID'),
            answer: z.enum(['a', 'b', 'c', 'd']).describe('The chosen option: a, b, c, or d'),
        },
        handler: async ({ test_id, question_id, answer }) => {
            const res = await axiosInstance.post('/students/submit_mcq', {
                test_id, question_id, answer
            });
            return {
                success: res.data.success,
                message: res.data.success ? 'Answer saved' : 'Could not save answer',
            };
        },
    });

    // ── Submit long answer ──────────────────────────────────────────────────
    useWebMCP({
        name: 'student_submit_laq',
        description: 'Submit a long answer/descriptive answer for the current question.',
        inputSchema: {
            test_id: z.string().describe('The test ID'),
            question_id: z.string().describe('The question ID'),
            answer: z.string().describe('The student answer text'),
        },
        handler: async ({ test_id, question_id, answer }) => {
            const res = await axiosInstance.post('/students/submit_laq', {
                test_id, question_id, answer
            });
            return {
                success: res.data.success,
                message: res.data.success ? 'Answer saved' : 'Could not save answer',
            };
        },
    });


    // ── Fetch subjects ──────────────────────────────────────────────────────
    useWebMCP({
        name: 'student_fetch_subjects',
        description: 'Get all subjects assigned to the student.',
        inputSchema: {},
        handler: async () => {
            const res = await axiosInstance.get('/students/get_subjects');
            if (res.data.success && res.data.data?.length) {
                navigate('/student_dashboard/subjects');
                return {
                    success: true,
                    subjects: res.data.data.map((s) => ({
                        id: s.subject_id,
                        name: s.subject_name,
                    })),
                };
            }
            return { success: false, message: 'No subjects found' };
        },
    });

  
    useWebMCP({
        name: 'student_fetch_books',
        description: 'Get all books for a specific subject. Requires subject_id which you get from student_fetch_subjects result. Never guess the subject_id — always get it from student_fetch_subjects first.',
        // inputSchema: {
        //     subject_id: z.union([z.string(), z.number()])
        //         .transform((val) => String(val))
        //         .describe('The subject ID from student_fetch_subjects result'),
        // },

        inputSchema: {
            subject_id: z.union([z.string(), z.number()])
                .transform((val) => String(val))
                .describe('The subject ID from student_fetch_subjects result'),
            subject_name: z.string().optional()
                .describe('The subject name e.g. Physics, Maths — include this so the response is clear'),
        },
        handler: async ({ subject_id }) => {
            const id = String(subject_id);  // ← safety convert
            const res = await axiosInstance.get(`/students/get_subject_books?subject_id=${id}`);
            if (res.data.success && res.data.data?.length) {
                navigate(`/student_dashboard/subjects/${id}`);
                return {
                    success: true,
                    subject: res.subject_name || id,
                    books: res.data.data.map((b) => ({
                        id: b.book_id,
                        name: b.book_name,
                    })),
                };
            }
            return { success: false, message: `No books found for subject ${res.subject_name || id}` };
        },
    });




    // ── Fetch learner books (personal uploads) ───────────────────────────────
    useWebMCP({
        name: 'student_fetch_learner_books',
        description: 'Get all books uploaded by the student themselves (personal book library).',
        inputSchema: {
            page: z.number().optional().describe('Page number, default 1'),
            search_query: z.string().optional().describe('Search by book name'),
        },
        handler: async ({ page = 1, search_query = '' }) => {
            const res = await axiosInstance.post('/students/get_learner_books', {
                page,
                search_query,
                show_entries: 10,
                sort_by: 'created_at',
                sort_order: 'desc',
            });
            if (res.data.success && res.data.data?.books?.length) {
                navigate('/student_dashboard/home');
                return {
                    success: true,
                    total: res.data.data.total_count,
                    books: res.data.data.books.map((b) => ({
                        id: b.book_id,
                        name: b.book_name,
                        chapters: b.chapters,
                        performance: b.performance,
                    })),
                };
            }
            return { success: false, message: 'No personal books found' };
        },
    });


    // ── Join classroom ──────────────────────────────────────────────────────
    useWebMCP({
        name: 'student_join_classroom',
        description: 'Join a classroom using a classroom code.',
        inputSchema: {
            classroom_code: z.string().describe('The classroom join code provided by teacher'),
        },
        handler: async ({ classroom_code }) => {
            const res = await axiosInstance.post('/students/join_classroom', { classroom_code });
            return {
                success: res.data.success,
                message: res.data.success ? 'Joined classroom successfully' : 'Invalid classroom code',
            };
        },
    });

    // ── Fetch performance ───────────────────────────────────────────────────
    useWebMCP({
        name: 'student_fetch_performance',
        description: 'Get the student performance summary including total tests and average score.',
        inputSchema: {},
        handler: async () => {
            const res = await axiosInstance.get('/students/get_dashboard_performance');
            if (res.data.success && res.data.data) {
                navigate('/student_dashboard/home');
                return { success: true, performance: res.data.data };
            }
            return { success: false, message: 'Could not load performance' };
        },
    });

    // ── Fetch test history ──────────────────────────────────────────────────
    useWebMCP({
        name: 'student_test_history',
        description: 'Get the student past test history with scores.',
        inputSchema: {},
        handler: async () => {
            const res = await axiosInstance.get('/students/get_dashboard_test_history');
            if (res.data.success && res.data.data?.length) {
                navigate('/student_dashboard/home');
                return {
                    success: true,
                    history: res.data.data.map((t) => ({
                        name: t.test_name,
                        score: t.score,
                        date: t.test_date,
                    })),
                };
            }
            return { success: false, message: 'No test history found' };
        },
    });

    // ── Generate questions ──────────────────────────────────────────────────
    
    useWebMCP({
        name: 'student_generate_questions',
        description: `Generate MCQ or long answer questions from a book.
        MANDATORY: After this tool returns, you MUST call student_get_test_context as your very next action before speaking to the user.
        Do NOT call student_start_test or student_get_question after this.`,
        inputSchema: {
            book_id: z.number().describe('Book ID to generate questions from'),
            chapter_range: z.array(z.array(z.number())).describe('MUST be array of [start_page, end_page] pairs. Example: [[5, 30]] for one chapter, [[5,30],[62,87]] for multiple. Get these values from student_get_bookmarks chapter_range field. NEVER pass a single number.'),
            type_of_question: z.enum(['mcq', 'long_answer']).optional().default('mcq'),
            level_of_test: z.enum(['easy', 'medium', 'hard']).optional().default('easy'),
            no_of_questions: z.number().optional().default(10),
            chapters: z.array(z.string()).optional().default([]),
            test_language: z.string().optional().default('english'),
        },
        handler: async ({ book_id, chapter_range, type_of_question = 'mcq', level_of_test = 'easy', no_of_questions = 10, chapters = [], test_language = 'english' }) => {
            console.log("STEP 1: MCP tool started");
            const targetRoute = `/student_dashboard/generate_question/${book_id}/${
                type_of_question === 'mcq' ? 'mcq_questions' : 'long_questions'
            }`
            
            // Fire in background — no await
            await dispatch(handleGenerateQuestion(
                { book_id, chapter_range, type_of_question, level_of_test, no_of_questions, chapters, test_language },
                () => {},       // no-op navigate — we handle navigation below
                targetRoute,
                type_of_question
            ));
            console.log("STEP 2: handleGenerateQuestion dispatched");
            //Poll IndexedDB until questions are written by handleGenerateQuestion
            await new Promise((resolve) => {
                const maxWait = 120000   // 110s max
                const interval = 2000    // check every 2s
                let elapsed = 0
            console.log("STEP 3: Polling completed");

                const check = setInterval(async () => {
                    try {
                        const db = await initializeDB(
                            process.env.REACT_APP_INDEXEDDB_DATABASE_NAME,
                            process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION,
                            process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME
                        )
                        const transaction = db.transaction(
                            process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME,
                            "readonly"
                        )
                        const store = transaction.objectStore(
                            process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME
                        )
                        const countRequest = store.count()
                        countRequest.onsuccess = () => {
                            if (countRequest.result > 0) {
                                clearInterval(check)
                                resolve()           // ← questions ready, proceed
                            }
                        }
                    } catch (e) {
                        // DB not ready yet, keep polling
                    }

                    elapsed += interval
                    if (elapsed >= maxWait) {
                        clearInterval(check)
                        resolve()               // ← timeout, navigate anyway
                    }
                }, interval)
            })

            // Navigate only after IndexedDB has data
            //console.log("BEFORE NAVIGATION");
            //navigate(targetRoute)
            //console.log("AFTER NAVIGATION");
            console.log("STEP 4: Returning MCP result");


            return { success: true, message: 'Questions generated successfully',navigate_to:targetRoute }
        },
     
    });



    useWebMCP({
        name: 'student_get_test_context',
        description: `ALWAYS call this immediately after student_generate_questions — no exceptions.
        Retrieves the test_id and confirms questions are ready.
        Store the test_id for student_validate_self_test.
        Do NOT call student_start_test or student_get_question.`,
        inputSchema: {
            type_of_question: z.enum(['mcq', 'long_answer']),
        },
        handler: async ({ type_of_question }) => {
            try {
                if (!window.__generateQuestionsPromise) {
                    return { success: false, message: 'No generation in progress. Call student_generate_questions first.' };
                }

                const { data } = await window.__generateQuestionsPromise;
                window.__generateQuestionsPromise = null;

                if (data?.error_code === 0) {
                    const test_id = data?.data?.test_id;
                    const test_questions = data?.data?.test_questions;

                    const updatedQues = test_questions?.map((q) => ({
                        ...q,
                        id: q.Question_no,
                        test_id,
                    }));

                    dispatch(update_generate_questions({
                        type: 'response',
                        data: { test_questions: updatedQues, test_id },
                        type_of_question,
                    }));

                    return {
                        success: true,
                        test_id,
                        type_of_question,
                        total_questions: test_questions?.length,
                        message: `Test ready. test_id is ${test_id}. Use this with student_validate_self_test when student submits.`,
                    };
                }

                window.__generateQuestionsPromise = null;
                return { success: false, message: data?.message || 'Generation failed' };

            } catch (err) {
                window.__generateQuestionsPromise = null;
                return { success: false, message: 'Error retrieving generated questions' };
            }
        },
    });



    useWebMCP({
        name: 'student_get_bookmarks',
        description: `Get chapter list and page ranges for a book.
    Call this after getting book_id, BEFORE student_generate_questions.
    Use the chapter_range values from the response in student_generate_questions.
    Ask the student which chapter(s) they want to practice.`,
        inputSchema: {
            book_id: z.number().describe('Book ID from student_fetch_books or student_fetch_learner_books'),
        },
        handler: async ({ book_id }) => {
            try {
                const { data } = await axiosInstance.post('/students/get_bookmarks', { book_id });

                if (data?.error_code === 0) {
                    const bookmarks = data?.data?.bookmarks || [];
                    const chapters = bookmarks.map((ch) => ({
                        index: ch.index,
                        title: ch.title,
                        chapter_range: [ch.chapter_range],
                        subchapters: ch.subchapters?.map(s => ({
                            index: s.index,
                            title: s.title,
                            chapter_range: s.chapter_range,
                        })) || [],
                    }));

                    return {
                        success: true,
                        book_id,
                        book_title: data?.data?.book_title,
                        chapters,
                    };
                }
                return { success: false, message: 'Could not load chapters' };
            } catch (err) {
                return { success: false, message: 'Something went wrong loading chapters' };
            }
        },
    });


    //student self test validation

    useWebMCP({
        name: 'student_validate_self_test',
        description: `Submit and validate answers for a self-generated test.
    ONLY use this after student_generate_questions — never for teacher-assigned tests.
    Use the exact test_id from student_get_test_context.
    MCQ responses: [{ Question_no: 1, clicked_answer: 3 }, ...]
    Long answer responses: [{ Question_no: 1, Answer: "..." }, ...]`,
        inputSchema: {
            test_id: z.number().describe('test_id from student_get_test_context'),
            type_of_question: z.enum(['mcq', 'long_answer']),
            responses: z.array(
                z.union([
                    z.object({ Question_no: z.number(), clicked_answer: z.number().optional() }),
                    z.object({ Question_no: z.number(), Answer: z.string().optional() }),
                ])
            ),
        },
        handler: async ({ test_id, type_of_question, responses }) => {
            try {
                const { data } = await axiosInstance.post('students/validate_self_test', {
                    test_id, type_of_question, responses,
                });

                if (data?.error_code === 0) {
                    return { success: true, message: 'Test validated successfully', result: data.data };
                }
                return { success: false, message: data?.message || 'Validation failed' };
            } catch (err) {
                return { success: false, message: 'Something went wrong during validation' };
            }
        },
    });

    useWebMCP({
        name: 'student_upload_book',
        description: 'Open the upload book modal where the student can upload a PDF book. Call this tool IMMEDIATELY when the student says they want to upload a book. Do NOT ask for book name or file details first — the modal will collect that information from the student directly.',
        inputSchema: {},
        handler: async () => {

            dispatch(updateModalShow({
                show: true,
                modal_from: 'dashboard',
                modal_type: 'upload_book',
                close_btn: true,
                size: 'md',
            }));
            return {
                success: true,
                message: 'Opened upload book modal'
            };
        },
    });
    



    // ── Upload book - collect details and validate ──────────────────────────
    useWebMCP({
        name: 'student_upload_book_submit',
        description: 'Submit the book upload with book name and file. Call this ONLY after the student has provided both a book name AND selected a PDF file. If either is missing, ask the student to provide it before calling this tool.',
        inputSchema: {
            book_name: z.string().min(1).describe('The name of the book the student wants to upload'),
            file_base64: z.string().describe('The base64 encoded PDF file content'),
            file_name: z.string().describe('The original file name e.g. physics.pdf'),
        },
        handler: async ({ book_name, file_base64, file_name }) => {
            if (!book_name?.trim()) {
                
                return { success: false, missing: 'book_name', message: 'Book name is required. Please ask the student to provide the book name.' };
            }

            if (!file_base64 || !file_name) {
                
                return { success: false, missing: 'file', message: 'PDF file is required. Please ask the student to select a PDF file.' };
            }

            try {
                // Convert base64 back to file
                const byteString = atob(file_base64);
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
                const blob = new Blob([ab], { type: 'application/pdf' });
                const file = new File([blob], file_name, { type: 'application/pdf' });

                const formData = new FormData();
                formData.append('book_name', book_name.trim());
                formData.append('book', file);

                const res = await axiosInstance.post('/students/upload_learner_book', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (res.data.success) {
                    dispatch(speakText(`${book_name} has been uploaded successfully.`));
                    dispatch(updateModalShow({ show: false, close_btn: false, modal_from: null, modal_type: null }));
                    return { success: true, message: `Book "${book_name}" uploaded successfully.` };
                }

                return { success: false, message: res.data.message || 'Upload failed. Please try again.' };

            } catch (err) {
                return { success: false, message: 'Something went wrong during upload. Please try again.' };
            }
        },
    });

    // ── Ask student for missing upload details ──────────────────────────────
    useWebMCP({
        name: 'student_upload_book_validate',
        description: 'Check if the student has provided book name and file. Call this after opening the upload modal to guide the student step by step. Use this to ask for book name if missing, or ask for file if book name is given but no file.',
        inputSchema: {
            book_name_provided: z.boolean().describe('Whether the student has provided a book name'),
            file_provided: z.boolean().describe('Whether the student has selected/provided a PDF file'),
        },
        handler: async ({ book_name_provided, file_provided }) => {
            if (!book_name_provided && !file_provided) {
               
                return { success: false, next_step: 'ask_both', message: 'Respond in ta-IN language only. Ask the student for book name and PDF file.' };
            }

            if (!book_name_provided) {
                
                return { success: false, next_step: 'ask_book_name', message: 'Respond in ta-IN language only. Ask the student for the book name.'  };
            }

            if (!file_provided) {
                
                return { success: false, next_step: 'ask_file', message: 'Respond in ta-IN language only. Ask the student to select a PDF file.'  };
            }

            return { success: true, next_step: 'submit', message: 'Both book name and file are provided. Proceed to call student_upload_book_submit.' };
        },
    });

    // ── Fetch timetable ─────────────────────────────────────────────────────
    useWebMCP({
        name: 'student_fetch_timetable',
        description: 'Get the student timetable.',
        inputSchema: {},
        handler: async () => {
            const res = await axiosInstance.get('/students/timetable');
            if (res.data.success) {
                navigate('/student_dashboard/home');
                return { success: true, timetable: res.data.data };
            }
            return { success: false, message: 'No timetable found' };
        },
    });

    // ── Logout ──────────────────────────────────────────────────────────────
    useWebMCP({
        name: 'student_logout',
        description: 'Log out the student from PrepyAI.',
        inputSchema: {},
        handler: async () => {
            try { await axiosInstance.post('/logout'); } catch (e) { }
            localStorage.clear();
            navigate('/');
            return { success: true };
        },
    });

    return null; 
};

export default StudentTools;
