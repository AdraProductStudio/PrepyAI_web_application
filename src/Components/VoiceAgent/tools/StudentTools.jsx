
import { useWebMCP } from '@mcp-b/react-webmcp';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axiosInstance from 'Services/axiosInstance';
import { speakText } from 'Views/Common/Actions/voiceAgentActions';
import { updateModalShow } from 'Views/Common/Slices/Common_slice';

/**
 * STUDENT WebMCP TOOLS
 * Mount this component inside any Student layout/page.
 * Tools auto-register when mounted, auto-cleanup when unmounted.
 * The AI discovers and calls these tools automatically.
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

    // // ── Fetch all tests ─────────────────────────────────────────────────────
    // useWebMCP({
    //     name: 'student_fetch_tests',
    //     description: 'Fetch all available tests for the student. Call this when student asks about tests, wants to attend a test, or asks what tests are available.',
    //     inputSchema: {},
    //     handler: async () => {
    //         const res = await axiosInstance.get('/students/get_all_tests');
    //         if (res.data.success && res.data.data) {
    //             const tests = Object.values(res.data.data).flat();
    //             navigate('/student_dashboard/test');
    //             return {
    //                 success: true,
    //                 total: tests.length,
    //                 tests: tests.map((t) => ({
    //                     id: t.test_id,
    //                     name: t.test_name,
    //                     subject: t.subject_name,
    //                     date: t.test_date,
    //                     duration: t.total_duration,
    //                 })),
    //             };
    //         }
    //         return { success: false, message: 'No tests found' };
    //     },
    // });

    // // ── Fetch upcoming tests ────────────────────────────────────────────────
    // useWebMCP({
    //     name: 'student_upcoming_tests',
    //     description: 'Get upcoming scheduled tests for the student, optionally filtered by subject ID.',
    //     inputSchema: {
    //         type: 'object',
    //         properties: {
    //             subject_id: {
    //                 type: 'number',
    //                 description: 'Subject ID to filter tests. Omit to get all upcoming tests.',
    //             },
    //         },
    //     },
    //     handler: async ({ subject_id } = {}) => {
    //         const params = {};
    //         if (subject_id) params.subject_id = subject_id;

    //         const res = await axiosInstance.get('/students/get_upcoming_test', { params });

    //         console.log('RAW API RESPONSE:', JSON.stringify(res.data, null, 2));

    //         if (res.data.success && res.data.data?.length) {
    //             const today = new Date().toISOString().split('T')[0];
    //             return {
    //                 success: true,
    //                 today,
    //                 tests: res.data.data.map((t) => ({
    //                     id: t.test_id,
    //                     name: t.test_name,
    //                     date: t.test_date,
    //                     subject: t.subject_name,
    //                 })),
    //             };
    //         }
    //         return { success: false, message: res.data.message || 'No upcoming tests' };
    //     },
    // });




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
        description: 'Get a specific question from an ongoing test by index. Use this to read questions aloud during test.',
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
        handler: async ({ subject_id, subject_name }) => {
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
        description: 'Navigate to the generate questions page for a book.',
        inputSchema: {
            book_id: z.string().optional().describe('Book ID to generate questions from'),
        },
        handler: async ({ book_id }) => {
            navigate(`/student_dashboard/generate_question/${book_id || ''}`);
            return { success: true, message: 'Navigated to generate questions' };
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

    return null; // No UI — just tool registration
};

export default StudentTools;
