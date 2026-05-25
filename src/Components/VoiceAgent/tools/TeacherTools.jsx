import { useWebMCP } from '@mcp-b/react-webmcp';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axiosInstance from 'Services/axiosInstance';
import { speakText } from 'Views/Common/Actions/voiceAgentActions';

import { getClassroomTeachers } from 'Views/Teachers/Actions/teacherAction';
import { updatePostSubjectsData } from 'Views/Teachers/Slice/teachersSlice';
import { updateModalShow } from 'Views/Common/Slices/Common_slice';
import { postSubjects } from 'Views/Teachers/Actions/teacherAction';

const isSuccessResponse = (res) => res?.data?.success === true || res?.data?.error_code === 0;
const getResponseData = (res, fallback = {}) => res?.data?.data ?? fallback;
const getResponseMessage = (res, fallback) => res?.data?.message || fallback;
const toArray = (value) => Array.isArray(value) ? value : [];
const classroomIdOf = (classroom) => classroom?.classroom_id ?? classroom?.id;
const firstScalar = (value) => Array.isArray(value) ? value[0] : value;
const subjectChildRoute = (classroomId, subjectId, child = '') => {
    const base = `/teachers_dashboard/classrooms/${classroomId}/${subjectId}`;
    return child ? `${base}/${child}` : base;
};
const normalizedRoute = (route) => {
    if (!route || typeof route !== 'string') return '/teachers_dashboard/home';
    if (route.startsWith('/teachers_dashboard')) return route;
    const clean = route.startsWith('/') ? route.slice(1) : route;
    return `/teachers_dashboard/${clean}`;
};

const TeacherTools = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ─────────────────────────────────────────────────────────────────────────
    // NAVIGATE
    // ─────────────────────────────────────────────────────────────────────────
    useWebMCP({
        name: 'teacher_navigate',
        description:
            'Navigate to any page in the teacher dashboard: home, classrooms, students, notes, timetable, profile, performance, books.',
        inputSchema: {
            route: z.string().describe('Route e.g. /teachers_dashboard/classrooms'),
        },
        handler: async ({ route }) => {
            const targetRoute = normalizedRoute(route);
            navigate(targetRoute);
            dispatch(speakText(`Navigating to ${targetRoute.replace('/teachers_dashboard/', '').replace(/_/g, ' ')}.`));
            return { success: true, navigated_to: targetRoute };
        },
    });

    // ─────────────────────────────────────────────────────────────────────────
    // DASHBOARD  GET /teachers/dashboard
    // ─────────────────────────────────────────────────────────────────────────
    useWebMCP({
        name: 'teacher_dashboard',
        description: 'Load the teacher dashboard. Shows total classrooms, students, recent activities and notes.',
        inputSchema: {},
        handler: async () => {
            navigate('/teachers_dashboard/home');
            const res = await axiosInstance.get('/teachers/dashboard');
            if (isSuccessResponse(res)) {
                const d = getResponseData(res);
                const msg = `Dashboard loaded. You have ${d?.total_no_of_classrooms ?? 0} classroom${d?.total_no_of_classrooms !== 1 ? 's' : ''} and ${d?.total_no_of_students ?? 0} student${d?.total_no_of_students !== 1 ? 's' : ''}.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, data: d };
            }
            const err = getResponseMessage(res, 'Could not load dashboard.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // ─────────────────────────────────────────────────────────────────────────
    // CLASSROOMS
    // ─────────────────────────────────────────────────────────────────────────

    // GET /teachers/get_classroom
    useWebMCP({
        name: 'teacher_fetch_classrooms',
        description: 'Get all classrooms assigned to the teacher.',
        inputSchema: {},
        handler: async () => {
            navigate('/teachers_dashboard/classrooms');
            const res = await axiosInstance.get('/teachers/get_classroom');
            if (isSuccessResponse(res)) {
                const data = getResponseData(res);
                const classrooms = toArray(data?.classrooms ?? data);
                const msg = `You have ${classrooms.length} classroom${classrooms.length !== 1 ? 's' : ''}. ${classrooms.slice(0, 3).map(c => c.classroom_name).join(', ')}${classrooms.length > 3 ? ' and more.' : '.'}`;
                dispatch(speakText(msg));
                return {
                    success: true,
                    summary: msg,
                    total: classrooms.length,
                    classrooms: classrooms.map((c) => ({
                        classroom_id: classroomIdOf(c),
                        classroom_name: c.classroom_name,
                        student_count: c.student_count,
                        classroom_code: c.classroom_code,
                    })),
                };
            }
            const err = getResponseMessage(res, 'No classrooms found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // GET /teachers/get_teacher_classrooms
    useWebMCP({
        name: 'teacher_fetch_own_classrooms',
        description: 'Get classrooms directly created by this teacher.',
        inputSchema: {},
        handler: async () => {
            navigate('/teachers_dashboard/classrooms');
            const res = await axiosInstance.get('/teachers/get_teacher_classrooms');
            if (isSuccessResponse(res)) {
                const list = toArray(getResponseData(res, []));
                const msg = `You own ${list.length} classroom${list.length !== 1 ? 's' : ''}.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, classrooms: list };
            }
            const err = getResponseMessage(res, 'No classrooms found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // GET /teachers/get_all_classrooms
    useWebMCP({
        name: 'teacher_fetch_all_classrooms',
        description: 'Get all classrooms under the same admin as this teacher.',
        inputSchema: {},
        handler: async () => {
            navigate('/teachers_dashboard/classrooms');
            const res = await axiosInstance.get('/teachers/get_all_classrooms');
            if (isSuccessResponse(res)) {
                const list = toArray(getResponseData(res, []));
                const msg = `Found ${list.length} total classroom${list.length !== 1 ? 's' : ''} under your institution.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, classrooms: list };
            }
            const err = getResponseMessage(res, 'No classrooms found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // // POST /teachers/create_classroom  (multipart — navigate + prefill)
    // useWebMCP({
    //     name: 'teacher_create_classroom',
    //     description:
    //         'Create a new classroom. Navigates to the creation page. Requires classroom_name and optional co-teacher IDs. A student CSV/XLSX file must be uploaded via the form.',
    //     inputSchema: {
    //         classroom_name: z.string().describe('Name of the new classroom e.g. "Biology 2025"'),
    //         teacher_ids: z.array(z.number()).describe('Co-teacher user IDs. Use [] if none.'),
    //     },
    //     handler: async ({ classroom_name, teacher_ids }) => {
    //         navigate('/teachers_dashboard/classrooms');
    //         const msg = `Ready to create a new classroom called ${classroom_name}. Please open the classroom form, attach the student file, and submit it.`;
    //         dispatch(speakText(msg));
    //         return { success: true, summary: msg, prefill: { classroom_name, teacher_ids } };
    //     },
    // });

    useWebMCP({
        name: 'teacher_edit_classroom',
        description: 'Rename a classroom. Use classroom_id when known; otherwise provide the exact current classroom name.',

        inputSchema: {
            classroom_id: z.number().optional().describe('Classroom ID. Prefer this when available from teacher_fetch_classrooms.'),
            current_classroom_name: z.string().optional().describe('Existing classroom name, used only when classroom_id is unknown.'),
            new_classroom_name: z.string().describe('New classroom name'),
        },

        handler: async ({ classroom_id, current_classroom_name, new_classroom_name }) => {
            let targetClassroomId = classroom_id;

            if (!targetClassroomId) {
                const classroomsRes = await axiosInstance.get('/teachers/get_classroom');
                const classrooms = toArray(getResponseData(classroomsRes)?.classrooms);
                const classroom = classrooms.find((c) =>
                    c?.classroom_name?.toLowerCase() === current_classroom_name?.toLowerCase()
                );

                targetClassroomId = classroomIdOf(classroom);
            }

            if (!targetClassroomId) {
                const msg = 'Classroom not found. Please give me the exact classroom name or classroom ID.';
                dispatch(speakText(msg));
                return { success: false, message: msg };
            }

            const res = await axiosInstance.post(
                '/teachers/edit_classroom',
                {
                    classroom_id: targetClassroomId,
                    classroom_name: new_classroom_name
                }
            );

            if (isSuccessResponse(res)) {
                navigate('/teachers_dashboard/classrooms');
                const msg = `Classroom renamed to ${new_classroom_name}.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, classroom_id: targetClassroomId };
            }

            const err = getResponseMessage(res, 'Could not rename classroom.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // DELETE /teachers/delete_classroom?classroom_id=<id>
    useWebMCP({
        name: 'teacher_delete_classroom',
        description: 'Delete a classroom permanently. Always confirm with the teacher before calling.',
        inputSchema: {
            classroom_id: z.number().describe('Classroom ID to delete'),
        },
        handler: async ({ classroom_id }) => {
            const res = await axiosInstance.delete('/teachers/delete_classroom', { params: { classroom_id } });
            if (isSuccessResponse(res)) {
                navigate('/teachers_dashboard/classrooms');
                const msg = 'Classroom deleted successfully.';
                dispatch(speakText(msg));
                return { success: true, summary: msg };
            }
            const err = getResponseMessage(res, 'Could not delete classroom.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // ─────────────────────────────────────────────────────────────────────────
    // SUBJECTS
    // ─────────────────────────────────────────────────────────────────────────

    // POST /teachers/get_subjects
    useWebMCP({
        name: 'teacher_fetch_subjects',
        description: 'Get all subjects for a classroom. Also returns the classroom code.',
        inputSchema: {
            classroom_id: z.number().int().describe('Classroom ID'),
        },
        handler: async ({ classroom_id }) => {
            navigate(`/teachers_dashboard/classrooms/${classroom_id}`);
            const res = await axiosInstance.post('/teachers/get_subjects', { classroom_id });
            if (isSuccessResponse(res)) {
                const data = getResponseData(res);
                const subjects = toArray(data?.subjects);
                const code = data?.classroom_code ?? '';
                const msg = `This classroom has ${subjects.length} subject${subjects.length !== 1 ? 's' : ''}: ${subjects.map(s => s.subject_name).join(', ')}. Classroom code is ${code}.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, classroom_code: code, subjects };
            }
            const err = getResponseMessage(res, 'No subjects found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // GET /teachers/get_all_subjects
    useWebMCP({
        name: 'teacher_fetch_all_subjects',
        description: 'Get all subjects across all classrooms, grouped by classroom_id.',
        inputSchema: {},
        handler: async () => {
            navigate('/teachers_dashboard/classrooms');
            const res = await axiosInstance.get('/teachers/get_all_subjects');
            if (isSuccessResponse(res)) {
                const msg = 'All subjects loaded successfully.';
                dispatch(speakText(msg));
                return { success: true, summary: msg, subjects_by_classroom: getResponseData(res, {}) };
            }
            const err = getResponseMessage(res, 'No subjects found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    
    useWebMCP({
        name: 'teacher_add_subject',
        description: 'Add a new subject to a classroom and assign a teacher to it.',
        inputSchema: {
            classroom_id: z.number().describe('Classroom ID'),
            subject_name: z.string().describe('Subject name e.g. "Physics"'),
            teachers_id: z.number().describe('User ID of the teacher to assign'),
        },
        handler: async ({ classroom_id, subject_name, teachers_id }) => {

            // 1. Navigate to classroom page (class_id in URL is needed by postSubjects)
            navigate(`/teachers_dashboard/classrooms/${classroom_id}`);
            await new Promise(r => setTimeout(r, 800));

            // 2. Fetch teachers dropdown data
            dispatch(getClassroomTeachers({ classroom_id }));
            
            await new Promise(r => setTimeout(r, 800));

            // 3. Prefill the form fields in Redux
            dispatch(updatePostSubjectsData({ subject_name }));
            dispatch(updatePostSubjectsData({ teachers: teachers_id }));

            // 4. Open the modal
            dispatch(updateModalShow({
                show: true,
                close_btn: true,
                modal_from: "subjects",
                modal_type: "subjects",
            }));

            // 5. Wait for modal to render, then click Add Subject
            await new Promise(r => setTimeout(r, 800));
            dispatch(postSubjects({
                subject_name,
                classroom_id,
                teachers_id,
            }));

            return { 
                success: true, 
                summary: `Add Subject modal opened and prefilled with subject "${subject_name}".` 
            };
        },
    });

    // DELETE /teachers/delete_subject?subject_id=<id>
    useWebMCP({
        name: 'teacher_delete_subject',
        description: 'Delete a subject from a classroom. Always confirm before calling.',
        inputSchema: {
            subject_id: z.number().describe('Subject ID to delete'),
        },
        handler: async ({ subject_id }) => {
            const res = await axiosInstance.delete('/teachers/delete_subject', { params: { subject_id } });
            if (isSuccessResponse(res)) {
                navigate('/teachers_dashboard/classrooms');
                const msg = 'Subject deleted successfully.';
                dispatch(speakText(msg));
                return { success: true, summary: msg };
            }
            const err = getResponseMessage(res, 'Could not delete subject.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // ─────────────────────────────────────────────────────────────────────────
    // STUDENTS
    // ─────────────────────────────────────────────────────────────────────────

    // POST /teachers/get_students_by_subject
    useWebMCP({
        name: 'teacher_fetch_students_by_subject',
        description: 'Get paginated students enrolled in a specific subject.',
        inputSchema: {
            // classroom_id: z.array(z.number()).optional().describe('Classroom IDs'),
            subject_id: z.number().int().describe('Subject ID'),
            search_query: z.string().optional().describe('Search by name or email'),
            show_entries: z.number().optional().describe('Per page (default 8)'),
            page: z.number().optional().describe('Page number (default 1)'),
            sort_by: z.string().optional().describe('Sort field e.g. joined_at'),
            sort_order: z.enum(['asc', 'desc']).optional(),
        },
        handler: async (payload) => {
            navigate('/teachers_dashboard/students_details');
            const res = await axiosInstance.post('/teachers/get_students_by_subject', {
                ...payload,
                page: payload.page ?? 1,
                show_entries: payload.show_entries ?? 8,
                search_query: payload.search_query ?? '',
                sort_by: payload.sort_by ?? 'joined_at',
                sort_order: payload.sort_order ?? 'desc',
            });
            if (isSuccessResponse(res)) {
                const d = getResponseData(res);
                const msg = `Found ${d?.total_count ?? 0} student${d?.total_count !== 1 ? 's' : ''} in ${d?.classroom_name ?? 'this subject'}. Showing page ${d?.current_page ?? 1} of ${d?.total_pages ?? 1}.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, ...d };
            }
            const err = getResponseMessage(res, 'No students found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // POST /teachers/get_students_by_teacher
    useWebMCP({
        name: 'teacher_fetch_students',
        description: 'Get all students taught by this teacher. Supports filtering by classroom, search, and pagination.',
        inputSchema: {
            classroom_id: z.union([z.string(), z.array(z.union([z.number(), z.string()]))]).optional().describe('Classroom ID(s) or "all_classrooms"'),
            search_query: z.string().optional(),
            show_entries: z.number().optional().describe('Per page (default 10)'),
            page: z.number().describe('Page number (required)'),
            sort_by: z.enum(['student_name', 'joined_at']).optional(),
            sort_order: z.enum(['asc', 'desc']).optional(),
        },
        handler: async (payload) => {
            navigate('/teachers_dashboard/students_details');
            const res = await axiosInstance.post('/teachers/get_students_by_teacher', {
                classroom_id: payload.classroom_id ?? ['all_classrooms'],
                search_query: payload.search_query ?? '',
                show_entries: payload.show_entries ?? 10,
                page: payload.page,
                sort_by: payload.sort_by ?? 'student_name',
                sort_order: payload.sort_order ?? 'desc',
            });
            if (isSuccessResponse(res)) {
                const d = getResponseData(res);
                const msg = `Found ${d?.total_count ?? 0} student${d?.total_count !== 1 ? 's' : ''}. Showing page ${d?.current_page ?? 1} of ${d?.total_pages ?? 1}.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, total_count: d?.total_count, total_pages: d?.total_pages, students: d?.students ?? [] };
            }
            const err = getResponseMessage(res, 'No students found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    useWebMCP({
        name: 'teacher_add_student',
        description: `Add a single new student to a classroom. 
        REQUIRED: You must collect studentEmail, firstName, and classroomName from the teacher before calling this tool. 
        Ask for them one at a time if not already provided.`,
        inputSchema: {
            studentEmail: z.string().email().describe('REQUIRED. Student email address. Must be a valid email like student@school.com'),
            firstName: z.string().describe('REQUIRED. First name of the student'),
            classroomName: z.string().describe('REQUIRED. Exact classroom name. Call teacher_fetch_classrooms first if unsure.'),
            lastName: z.string().optional().default('').describe('Last name of the student. Use empty string if not provided.'),
            contactNo: z.string().optional().default('').describe('Phone number. Use empty string if not provided.'),
            registerNo: z.string().optional().default('').describe('Registration number. Use empty string if not provided.'),
        },
        handler: async (payload) => {
            navigate('/teachers_dashboard/students_details');
            const res = await axiosInstance.post('/teachers/add_student', {
                email_id: payload.studentEmail,
                name: payload.firstName,
                last_name: payload.lastName ?? '',
                classroom_name: payload.classroomName,
                contact_no: payload.contactNo ?? '',
                register_no: payload.registerNo ?? '',
            });
            if (isSuccessResponse(res)) {
                const msg = `Student ${payload.firstName} ${payload.lastName ?? ''} has been added to ${payload.classroomName} successfully.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg };
            }
            const err = getResponseMessage(res, 'Could not add student.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });
    // POST /teachers/edit_student
    useWebMCP({
        name: 'teacher_edit_student',
        description: "Update a student's name, email, contact, or registration number.",
        inputSchema: {
            student_id: z.number().describe('Student user ID'),
            first_name: z.string().describe('First name'),
            last_name: z.string().describe('Last name'),
            student_email: z.string().describe('Email'),
            contact_no: z.string().describe('Contact number'),
            student_reg_no: z.string().describe('Registration number'),
        },
        handler: async (payload) => {
            navigate('/teachers_dashboard/students_details');
            const res = await axiosInstance.post('/teachers/edit_student', payload);
            if (isSuccessResponse(res)) {
                const msg = `Student details for ${payload.first_name} ${payload.last_name} have been updated successfully.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg };
            }
            const err = getResponseMessage(res, 'Could not update student.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // POST /teachers/delete_student
    useWebMCP({
        name: 'teacher_delete_student',
        description: 'Remove a student. Always confirm before calling.',
        inputSchema: {
            student_id: z.number().describe('Student ID to remove'),
        },
        handler: async ({ student_id }) => {
            const res = await axiosInstance.post('/teachers/delete_student', { student_id });
            if (isSuccessResponse(res)) {
                navigate('/teachers_dashboard/students_details');
                const msg = 'Student removed successfully.';
                dispatch(speakText(msg));
                return { success: true, summary: msg };
            }
            const err = getResponseMessage(res, 'Could not remove student.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // POST /teachers/invite_students (multipart — navigate)
    useWebMCP({
        name: 'teacher_invite_students',
        description: 'Invite students to a classroom by uploading a CSV/XLSX file. Navigates to the invite page.',
        inputSchema: {
            classroom_id: z.string().describe('Classroom ID'),
        },
        handler: async ({ classroom_id }) => {
            navigate('/teachers_dashboard/students_details');
            const msg = `Ready to invite students for classroom ${classroom_id}. Please use the student upload form to attach a CSV or XLSX file.`;
            dispatch(speakText(msg));
            return { success: true, summary: msg };
        },
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TEACHERS
    // ─────────────────────────────────────────────────────────────────────────

    // GET /teachers/get_all_teachers
    useWebMCP({
        name: 'teacher_fetch_all_teachers',
        description: 'Get all teachers under the same admin.',
        inputSchema: {},
        handler: async () => {
            navigate('/teachers_dashboard/home');
            const res = await axiosInstance.get('/teachers/get_all_teachers');
            if (isSuccessResponse(res)) {
                const list = toArray(getResponseData(res, []));
                const msg = `Found ${list.length} teacher${list.length !== 1 ? 's' : ''} in your institution.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, teachers: list };
            }
            const err = getResponseMessage(res, 'No teachers found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // GET /teachers/get_teachers_list
    useWebMCP({
        name: 'teacher_fetch_teachers_list',
        description: 'Get other teachers under the same admin (excluding yourself). Useful when assigning subjects or creating classrooms.',
        inputSchema: {},
        handler: async () => {
            const res = await axiosInstance.get('/teachers/get_teachers_list');
            if (isSuccessResponse(res)) {
                const list = toArray(getResponseData(res, []));
                const msg = `There are ${list.length} other teacher${list.length !== 1 ? 's' : ''} available to assign.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, teachers: list };
            }
            const err = getResponseMessage(res, 'No teachers found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // POST /teachers/get_classroom_teachers
    useWebMCP({
        name: 'teacher_fetch_classroom_teachers',
        description: 'Get all teachers assigned to a specific classroom.',
        inputSchema: {
            classroom_id: z.number().describe('Classroom ID'),
        },
        handler: async ({ classroom_id }) => {
            navigate(`/teachers_dashboard/classrooms/${classroom_id}`);
            const res = await axiosInstance.post('/teachers/get_classroom_teachers', { classroom_id });
            if (isSuccessResponse(res)) {
                const list = toArray(getResponseData(res, []));
                const msg = `This classroom has ${list.length} teacher${list.length !== 1 ? 's' : ''} assigned.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, teachers: list };
            }
            const err = getResponseMessage(res, 'No teachers found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // ─────────────────────────────────────────────────────────────────────────
    // BOOKS
    // ─────────────────────────────────────────────────────────────────────────

    // POST /teachers/get_books
    useWebMCP({
        name: 'teacher_fetch_books',
        description: 'Get all books uploaded to a classroom subject.',
        inputSchema: {
            classroom_id: z.union([z.number(), z.string(), z.array(z.union([z.number(), z.string()]))]).describe('Classroom ID(s)'),
            subject_id: z.union([z.number(), z.string(), z.array(z.union([z.number(), z.string()]))]).describe('Subject ID(s)'),
        },
        handler: async ({ classroom_id, subject_id }) => {
            const classId = firstScalar(classroom_id);
            const subjectId = firstScalar(subject_id);
            if (classId && subjectId) {
                navigate(subjectChildRoute(classId, subjectId, 'book'));
            } else {
                navigate('/teachers_dashboard/classrooms');
            }
            const res = await axiosInstance.post('/teachers/get_books', { classroom_id, subject_id });
            if (isSuccessResponse(res)) {
                const books = toArray(getResponseData(res)?.books);
                const msg = `Found ${books.length} book${books.length !== 1 ? 's' : ''}. ${books.slice(0, 3).map(b => b.book_name).join(', ')}${books.length > 3 ? ' and more.' : '.'}`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, books };
            }
            const err = getResponseMessage(res, 'No books found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // DELETE /teachers/delete_book?book_id=<id>
    useWebMCP({
        name: 'teacher_delete_book',
        description: 'Delete an uploaded book. Always confirm before calling.',
        inputSchema: {
            book_id: z.number().describe('Book ID to delete'),
        },
        handler: async ({ book_id }) => {
            const res = await axiosInstance.delete('/teachers/delete_book', { params: { book_id } });
            if (isSuccessResponse(res)) {
                navigate('/teachers_dashboard/classrooms');
                const msg = 'Book deleted successfully.';
                dispatch(speakText(msg));
                return { success: true, summary: msg };
            }
            const err = getResponseMessage(res, 'Could not delete book.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // POST /teachers/get_bookmarks
    useWebMCP({
        name: 'teacher_fetch_book_chapters',
        description: 'Get all chapters (table of contents) for a book.',
        inputSchema: {
            book_id: z.number().describe('Book ID'),
        },
        handler: async ({ book_id }) => {
            navigate('/teachers_dashboard/classrooms');
            const res = await axiosInstance.post('/teachers/get_bookmarks', { book_id });
            if (isSuccessResponse(res)) {
                const bookmarks = toArray(getResponseData(res)?.bookmarks);
                const msg = `This book has ${bookmarks.length} chapter${bookmarks.length !== 1 ? 's' : ''}. ${bookmarks.slice(0, 3).map(b => b.title).join(', ')}${bookmarks.length > 3 ? ' and more.' : '.'}`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, bookmarks,
                         chapters: bookmarks.map(b => b.title),
                         chapter_range: bookmarks.map(b => b.chapter_range ?? [b.start_page, b.end_page]),
                 };
            }
            const err = getResponseMessage(res, 'No chapters found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

  
    useWebMCP({
        name: 'teacher_fetch_test_questions',
        description: 'Get both the student-facing questions and the answer key for a test.',
        inputSchema: {
            test_id: z.number().describe('Test ID'),
        },
        handler: async ({ test_id }) => {
            navigate('/teachers_dashboard/classrooms');
            const res = await axiosInstance.post('/teachers/get_test_questions', { test_id });
            if (isSuccessResponse(res)) {
                const data = getResponseData(res);
                const withAns = data?.question_with_answer ?? {};
                const sets = Object.keys(withAns).length;
                const msg = `Test questions loaded. This test has ${sets} set${sets !== 1 ? 's' : ''} of questions.`;
                dispatch(speakText(msg));
                return {
                    success: true,
                    summary: msg,
                    questions_without_answer: data?.questions_without_answer,
                    question_with_answer: data?.question_with_answer,
                };
            }
            const err = getResponseMessage(res, 'No test questions found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // POST /teachers/get_test_history
    useWebMCP({
        name: 'teacher_test_history',
        description: 'Get test history filtered by type: upcoming, ongoing, completed, or cancelled.',
        inputSchema: {
            type: z.enum(['upcoming', 'cancelled', 'ongoing', 'completed']).describe('Filter type'),
            subject_id: z.number().optional().describe('Subject ID (defaults to 1)'),
        },
        handler: async ({ type, subject_id = 1 }) => {
            navigate('/teachers_dashboard/classrooms');
            const res = await axiosInstance.post('/teachers/get_test_history', { type, subject_id });
            if (isSuccessResponse(res)) {
                const history = toArray(getResponseData(res)?.history);
                const msg = `Found ${history.length} ${type} test${history.length !== 1 ? 's' : ''}.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, history };
            }
            const err = getResponseMessage(res, 'No test history found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // POST /teachers/get_students_for_test
    useWebMCP({
        name: 'teacher_fetch_students_for_test',
        description: 'Get all students in a classroom, used when selecting students for a test.',
        inputSchema: {
            classroom_id: z.number().describe('Classroom ID'),
        },
        handler: async ({ classroom_id }) => {
            navigate('/teachers_dashboard/classrooms');
            const res = await axiosInstance.post('/teachers/get_students_for_test', { classroom_id });
            if (isSuccessResponse(res)) {
                const students = toArray(getResponseData(res)?.students);
                const msg = `This classroom has ${students.length} student${students.length !== 1 ? 's' : ''} available for the test.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, students };
            }
            const err = getResponseMessage(res, 'No students found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // POST /teachers/get_students_by_test
    useWebMCP({
        name: 'teacher_fetch_students_by_test',
        description: 'Get all students who attempted a specific test with their results.',
        inputSchema: {
            test_id: z.number().describe('Test ID'),
            mode: z.enum(['Online', 'Offline']).describe('Online (MCQ) or Offline (long answer)'),
        },
        handler: async ({ test_id, mode }) => {
            navigate('/teachers_dashboard/classrooms');
            const res = await axiosInstance.post('/teachers/get_students_by_test', { test_id, mode });
            if (isSuccessResponse(res)) {
                const students = toArray(getResponseData(res, []));
                const attempted = students.filter(s => s.test_status !== 'pending').length;
                const msg = `${students.length} student${students.length !== 1 ? 's' : ''} in this test. ${attempted} have attempted it so far.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, students };
            }
            const err = getResponseMessage(res, 'No students found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // DELETE /teachers/delete_test?test_id=<id>
    useWebMCP({
        name: 'teacher_delete_test',
        description: 'Permanently delete a test. Always confirm before calling.',
        inputSchema: {
            test_id: z.number().describe('Test ID to delete'),
        },
        handler: async ({ test_id }) => {
            const res = await axiosInstance.delete('/teachers/delete_test', { params: { test_id } });
            if (isSuccessResponse(res)) {
                navigate('/teachers_dashboard/classrooms');
                const msg = 'Test deleted successfully.';
                dispatch(speakText(msg));
                return { success: true, summary: msg };
            }
            const err = getResponseMessage(res, 'Could not delete test.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // DELETE /teachers/cancel_test?test_id=<id>
    useWebMCP({
        name: 'teacher_cancel_test',
        description: 'Cancel a scheduled test. Always confirm before calling.',
        inputSchema: {
            test_id: z.number().describe('Test ID to cancel'),
        },
        handler: async ({ test_id }) => {
            const res = await axiosInstance.delete('/teachers/cancel_test', { params: { test_id } });
            if (isSuccessResponse(res)) {
                navigate('/teachers_dashboard/classrooms');
                const msg = 'Test has been cancelled successfully.';
                dispatch(speakText(msg));
                return { success: true, summary: msg };
            }
            const err = getResponseMessage(res, 'Could not cancel test.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // POST /teachers/validate_student_test_paper (multipart — navigate)
    useWebMCP({
        name: 'teacher_validate_test_paper',
        description: 'Navigate to the test paper validation page to upload and grade a student paper.',
        inputSchema: {
            test_id: z.string().describe('Test ID'),
            student_id: z.string().describe('Student ID'),
        },
        handler: async ({ test_id, student_id }) => {
            navigate('/teachers_dashboard/classrooms');
            const msg = `Ready to validate paper for test ${test_id} and student ${student_id}. Please open the related test from the classroom screen and upload the student PDF.`;
            dispatch(speakText(msg));
            return { success: true, summary: msg };
        },
    });

    // ─────────────────────────────────────────────────────────────────────────
    // PERFORMANCE
    // ─────────────────────────────────────────────────────────────────────────

    // POST /teachers/get_students_performance_by_teacher
    useWebMCP({
        name: 'teacher_student_performance',
        description: 'Get test performance data for all students, filterable by classroom and subject.',
        inputSchema: {
            classroom_id: z.union([z.string(), z.number()]).describe('Classroom ID or "all_classrooms"'),
            subject_id: z.union([z.string(), z.number()]).describe('Subject ID or "all_subjects"'),
            search_query: z.string().optional(),
            page: z.number().int().default(1).describe('Page number'),
            show_entries: z.number().optional(),
            sort_by: z.enum(['student_name', 'joined_at']).optional(),
            sort_order: z.enum(['asc', 'desc']).optional(),
        },
        handler: async (payload) => {
            navigate('/teachers_dashboard/classrooms');
            const res = await axiosInstance.post('/teachers/get_students_performance_by_teacher', payload);
            if (isSuccessResponse(res)) {
                const d = getResponseData(res);
                const count = d?.total_count ?? 0;
                const msg = `Performance data loaded for ${count} student${count !== 1 ? 's' : ''}.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, students: d?.students, test_dates: d?.test_dates, total_count: count };
            }
            const err = getResponseMessage(res, 'Could not load performance data.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // POST /teachers/get_students_self_test_performance_by_teacher
    useWebMCP({
        name: 'teacher_student_self_test_performance',
        description: 'Get self-test (student-initiated) performance data for all students.',
        inputSchema: {
            classroom_id: z.union([z.string(), z.number()]).describe('Classroom ID or "all_classrooms"'),
            subject_id: z.union([z.string(), z.number()]).describe('Subject ID or "all_subjects"'),
            search_query: z.string().optional(),
            page: z.number().describe('Page number'),
            show_entries: z.number().optional(),
            sort_by: z.enum(['student_name', 'joined_at']).optional(),
            sort_order: z.enum(['asc', 'desc']).optional(),
        },
        handler: async (payload) => {
            navigate('/teachers_dashboard/classrooms');
            const res = await axiosInstance.post('/teachers/get_students_self_test_performance_by_teacher', payload);
            if (isSuccessResponse(res)) {
                const msg = 'Self-test performance data loaded successfully.';
                dispatch(speakText(msg));
                const data = getResponseData(res);
                return { success: true, summary: msg, students: data?.students, test_dates: data?.test_dates };
            }
            const err = getResponseMessage(res, 'Could not load self-test performance.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // POST /teachers/classroom_performance
    useWebMCP({
        name: 'teacher_classroom_performance',
        description: 'Get overall performance breakdown for a classroom or all classrooms.',
        inputSchema: {
            classroom_id: z.union([z.string(), z.number()]).describe('Classroom ID or "all_classrooms"'),
        },
        handler: async ({ classroom_id }) => {
            navigate('/teachers_dashboard/classrooms');
            const res = await axiosInstance.post('/teachers/classroom_performance', { classroom_id });
            if (isSuccessResponse(res)) {
                const msg = 'Classroom performance data loaded. Check the screen for the full breakdown.';
                dispatch(speakText(msg));
                return { success: true, summary: msg, data: getResponseData(res) };
            }
            const err = getResponseMessage(res, 'Could not load classroom performance.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // POST /teachers/get_student_performance_by_subject
    useWebMCP({
        name: 'teacher_student_performance_by_subject',
        description: 'Get monthly performance data for students in a specific subject and classroom.',
        inputSchema: {
            classroom_id: z.union([z.string(), z.number()]).describe('Classroom ID or "all_classrooms"'),
            subject_id: z.union([z.string(), z.number()]).describe('Subject ID or "all_subjects"'),
        },
        handler: async ({ classroom_id, subject_id }) => {
            const classId = firstScalar(classroom_id);
            const subId = firstScalar(subject_id);
            if (classId && subId && classId !== 'all_classrooms' && subId !== 'all_subjects') {
                navigate(subjectChildRoute(classId, subId, 'teachers_assigned'));
            } else {
                navigate('/teachers_dashboard/classrooms');
            }
            const res = await axiosInstance.post('/teachers/get_student_performance_by_subject', { classroom_id, subject_id });
            if (isSuccessResponse(res)) {
                const msg = 'Monthly subject performance data loaded successfully.';
                dispatch(speakText(msg));
                return { success: true, summary: msg, data: getResponseData(res) };
            }
            const err = getResponseMessage(res, 'No performance data found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // POST /teachers/get_per_student_performance_by_subject
    useWebMCP({
        name: 'teacher_per_student_performance',
        description: 'Get detailed test-by-test performance for a single student. Navigates to the student performance page and speaks a summary.',
        inputSchema: {
            student_id: z.number().describe('Student ID'),
            subject_id: z.number().optional().describe('Subject ID (optional)'),
        },
        handler: async ({ student_id, subject_id }) => {
            navigate(`/teachers_dashboard/students_details/${student_id}/overview`);
            const res = await axiosInstance.post('/teachers/get_per_student_performance_by_subject', { student_id, subject_id });
            if (isSuccessResponse(res)) {
                const d = toArray(getResponseData(res, []));
                let msg = '';
                if (Array.isArray(d) && d.length) {
                    const latest = d[d.length - 1];
                    msg = `Performance loaded for this student. In their latest test on ${latest.test_date ?? 'a recent date'}, they scored ${latest.total_marks ?? 'N/A'} marks with a status of ${latest.performance_status ?? 'unknown'}. They got ${latest.correct_answer ?? 0} correct and ${latest.wrong_answer ?? 0} wrong out of ${latest.no_of_ques_attend ?? 0} questions attempted.`;
                } else {
                    msg = 'No test performance data found for this student yet.';
                }
                dispatch(speakText(msg));
                return { success: true, summary: msg, data: d };
            }
            const err = 'No performance data found for this student.';
            dispatch(speakText(err));
            return { success: false, message: getResponseMessage(res, err) };
        },
    });

    // POST /teachers/get_per_student_overall_performance
    useWebMCP({
        name: 'teacher_per_student_overall_performance',
        description: 'Get overall monthly performance summary for a student. Navigates to the student page and speaks the summary.',
        inputSchema: {
            student_id: z.number().describe('Student ID'),
            month: z.string().optional().describe('Month filter e.g. "2025-03"'),
            subject_id: z.number().optional().describe('Subject ID (optional)'),
        },
        handler: async (payload) => {
            navigate(`/teachers_dashboard/students_details/${payload.student_id}/overview`);
            const res = await axiosInstance.post('/teachers/get_per_student_overall_performance', payload);
            if (isSuccessResponse(res)) {
                const d = toArray(getResponseData(res, []));
                let msg = '';
                if (Array.isArray(d) && d.length) {
                    const exemplar = d.filter(r => r.performance_status === 'exemplar').length;
                    const developing = d.filter(r => r.performance_status === 'developing').length;
                    const emergent = d.filter(r => r.performance_status === 'emergent').length;
                    msg = `Overall performance across ${d.length} test${d.length !== 1 ? 's' : ''}: ${exemplar} Exemplar, ${developing} Developing, ${emergent} Emergent.`;
                } else {
                    msg = 'No overall performance data found for this student.';
                }
                dispatch(speakText(msg));
                return { success: true, summary: msg, data: d };
            }
            const err = 'No performance data found for this student.';
            dispatch(speakText(err));
            return { success: false, message: getResponseMessage(res, err) };
        },
    });

    // POST /teachers/get_per_student_test_count
    useWebMCP({
        name: 'teacher_per_student_test_count',
        description: 'Get MCQ and long-answer test counts for a student. Navigates to the student page and speaks the counts.',
        inputSchema: {
            student_id: z.number().describe('Student ID'),
            subject_id: z.number().optional().describe('Subject ID (optional)'),
        },
        handler: async ({ student_id, subject_id }) => {
            navigate(`/teachers_dashboard/students_details/${student_id}/overview`);
            const res = await axiosInstance.post('/teachers/get_per_student_test_count', { student_id, subject_id });
            if (isSuccessResponse(res)) {
                const d = toArray(getResponseData(res, []));
                // Backend returns a tuple of 3: [mcq, long_answer, overall]
                const overall = Array.isArray(d) ? d[2] : null;
                const msg = overall
                    ? `This student has attempted ${overall.no_of_tests ?? 0} total test${overall.no_of_tests !== 1 ? 's' : ''} across ${overall.no_of_books ?? 0} book${overall.no_of_books !== 1 ? 's' : ''}.`
                    : 'No test count data found for this student.';
                dispatch(speakText(msg));
                return { success: true, summary: msg, data: d };
            }
            const err = 'No test data found for this student.';
            dispatch(speakText(err));
            return { success: false, message: getResponseMessage(res, err) };
        },
    });

    // POST /teachers/get_per_student_spending_hrs
    useWebMCP({
        name: 'teacher_per_student_spending_hrs',
        description: 'Get hours a student has spent studying. Navigates to the student page and speaks the time.',
        inputSchema: {
            student_id: z.number().describe('Student ID'),
            subject_id: z.number().optional().describe('Subject ID (optional)'),
        },
        handler: async ({ student_id, subject_id }) => {
            navigate(`/teachers_dashboard/students_details/${student_id}/overview`);
            const res = await axiosInstance.post('/teachers/get_per_student_spending_hrs', { student_id, subject_id });
            if (isSuccessResponse(res)) {
                const msg = 'Study hours data loaded for this student. Check the screen for the full breakdown.';
                dispatch(speakText(msg));
                return { success: true, summary: msg, data: getResponseData(res) };
            }
            const err = 'No study hours data found for this student.';
            dispatch(speakText(err));
            return { success: false, message: getResponseMessage(res, err) };
        },
    });

    // POST /teachers/get_student_performane_by_date
    useWebMCP({
        name: 'teacher_student_performance_by_date',
        description: "Get a student's test performance on a specific date. Navigates to the student page and speaks the result.",
        inputSchema: {
            student_id: z.number().describe('Student ID'),
            test_date: z.string().describe('Date in YYYY-MM-DD format'),
            subject_id: z.number().optional().describe('Subject ID (optional)'),
        },
        handler: async (payload) => {
            navigate(`/teachers_dashboard/students_details/${payload.student_id}/overview`);
            const res = await axiosInstance.post('/teachers/get_student_performane_by_date', payload);
            if (isSuccessResponse(res)) {
                const d = toArray(getResponseData(res, []));
                let msg = '';
                if (Array.isArray(d) && d.length) {
                    const r = d[0];
                    msg = `On ${payload.test_date}, this student scored ${r.total_marks ?? 'N/A'} marks. Status: ${r.performance_status ?? 'unknown'}. Correct: ${r.correct_answer ?? 0}, Wrong: ${r.wrong_answer ?? 0}.`;
                } else {
                    msg = `No test data found for this student on ${payload.test_date}.`;
                }
                dispatch(speakText(msg));
                return { success: true, summary: msg, data: d };
            }
            const err = `No data found for ${payload.test_date}.`;
            dispatch(speakText(err));
            return { success: false, message: getResponseMessage(res, err) };
        },
    });

    // POST /teachers/get_student_self_test_performane_by_date
    useWebMCP({
        name: 'teacher_student_self_test_performance_by_date',
        description: 'Get self-test performance for a student on a specific date.',
        inputSchema: {
            student_id: z.number().describe('Student ID'),
            test_date: z.string().describe('Date in YYYY-MM-DD format'),
            subject_id: z.number().optional(),
        },
        handler: async (payload) => {
            navigate(`/teachers_dashboard/students_details/${payload.student_id}/overview`);
            const res = await axiosInstance.post('/teachers/get_student_self_test_performane_by_date', payload);
            if (isSuccessResponse(res)) {
                const d = toArray(getResponseData(res, []));
                const msg = Array.isArray(d) && d.length
                    ? `Self-test data found for ${payload.test_date}. ${d.length} record${d.length !== 1 ? 's' : ''} available. Check the screen for details.`
                    : `No self-test data found for this student on ${payload.test_date}.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, data: d };
            }
            const err = `No self-test data found for ${payload.test_date}.`;
            dispatch(speakText(err));
            return { success: false, message: getResponseMessage(res, err) };
        },
    });

    // ─────────────────────────────────────────────────────────────────────────
    // CALENDAR & EVENTS
    // ─────────────────────────────────────────────────────────────────────────

    // POST /teachers/get_test_calendar
    useWebMCP({
        name: 'teacher_test_calendar',
        description: 'Get scheduled tests for a date range (day, week, or month).',
        inputSchema: {
            type: z.enum(['day', 'week', 'month']).describe('Calendar view type'),
            datetime: z.string().describe('Reference date e.g. "2025-06-01"'),
        },
        handler: async ({ type, datetime }) => {
            navigate('/teachers_dashboard/home');
            const res = await axiosInstance.post('/teachers/get_test_calendar', { type, datetime });
            if (isSuccessResponse(res)) {
                const msg = `Test calendar for this ${type} loaded. Check the screen for the schedule.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, schedule: getResponseData(res) };
            }
            const err = getResponseMessage(res, 'No calendar data found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // POST /teachers/create_event
    useWebMCP({
        name: 'teacher_create_event',
        description: 'Create a custom calendar event (non-test).',
        inputSchema: {
            title: z.string().describe('Event title'),
            description: z.string().describe('Event description'),
            schedule_date: z.string().describe('Date in YYYY-MM-DD format'),
            schedule_time: z.string().describe('Time in "HH:MM AM/PM" e.g. "10:30 AM"'),
            colour: z.string().describe('Hex colour e.g. "#FF5733"'),
        },
        handler: async (payload) => {
            navigate('/teachers_dashboard/home');
            const res = await axiosInstance.post('/teachers/create_event', payload);
            if (isSuccessResponse(res)) {
                const msg = `Event "${payload.title}" has been created for ${payload.schedule_date} at ${payload.schedule_time}.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg };
            }
            const err = getResponseMessage(res, 'Could not create event.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });
    // ─────────────────────────────────────────────────────────────────────────
// STEP 1: Pick classroom
    // ─────────────────────────────────────────────────────────────────────────
    // STEP 1
    useWebMCP({
        name: 'test_step1_get_classrooms',
        description: 'STEP 1 of creating a test. Fetch all classrooms so teacher can pick one.',
        inputSchema: {},
        handler: async () => {
            navigate('/teachers_dashboard/classrooms'); 
            const res = await axiosInstance.get('/teachers/get_classroom');
            if (isSuccessResponse(res)) {
                const classrooms = toArray(getResponseData(res)?.classrooms ?? getResponseData(res));
                const msg = `You have ${classrooms.length} classroom${classrooms.length !== 1 ? 's' : ''}: ${classrooms.map(c => c.classroom_name).join(', ')}. Which classroom is this test for?`;
                dispatch(speakText(msg));
                return {
                    success: true,
                    next_step: 'User will pick a classroom by name. Match to classroom_id from classrooms_map, then immediately call test_step2_get_subjects.',
                    classrooms: classrooms.map(c => ({
                        classroom_id: c.classroom_id ?? c.id,
                        classroom_name: c.classroom_name,
                    })),
                    classrooms_map: Object.fromEntries(
                        classrooms.map(c => [c.classroom_name.toLowerCase(), c.classroom_id ?? c.id])
                    ),
                };
            }
            return { success: false, message: getResponseMessage(res, 'Could not fetch classrooms.') };
        },
    });

    // STEP 2
    useWebMCP({
        name: 'test_step2_get_subjects',
        description: 'STEP 2 of creating a test. Fetch subjects for the chosen classroom.',
        inputSchema: {
            classroom_id: z.number().describe('classroom_id from test_step1_get_classrooms'),
        },
        handler: async ({ classroom_id }) => {
            navigate(`/teachers_dashboard/classrooms/${classroom_id}`);
            const res = await axiosInstance.post('/teachers/get_subjects', { classroom_id });
            if (isSuccessResponse(res)) {
                const subjects = toArray(getResponseData(res)?.subjects);
                const msg = `This classroom has ${subjects.length} subject${subjects.length !== 1 ? 's' : ''}: ${subjects.map(s => s.subject_name).join(', ')}. Which subject is this test for?`;
                dispatch(speakText(msg));
                return {
                    success: true,
                    next_step: 'User will pick a subject by name. Match to subject_id from subjects_map, then immediately call test_step3_get_books with classroom_id AND subject_id.',
                    classroom_id,
                    subjects,
                    subjects_map: Object.fromEntries(
                        subjects.map(s => [s.subject_name.toLowerCase(), s.subject_id])
                    ),
                };
            }
            return { success: false, message: getResponseMessage(res, 'Could not fetch subjects.') };
        },
    });

    // STEP 3
    useWebMCP({
        name: 'test_step3_get_books',
        description: 'STEP 3 of creating a test. Fetch books for the chosen classroom and subject.',
        inputSchema: {
            classroom_id: z.number().describe('classroom_id from step 1'),
            subject_id:   z.number().describe('subject_id from step 2'),
        },
        handler: async ({ classroom_id, subject_id }) => {
            navigate(subjectChildRoute(classroom_id, subject_id, 'book'));
            const res = await axiosInstance.post('/teachers/get_books', {
                classroom_id: [classroom_id],
                subject_id:   [subject_id],
            });
            if (isSuccessResponse(res)) {
                const books = toArray(getResponseData(res)?.books);
                const msg = `Found ${books.length} book${books.length !== 1 ? 's' : ''}: ${books.map(b => b.book_name).join(', ')}. Which book should the test be based on?`;
                dispatch(speakText(msg));
                return {
                    success: true,
                    next_step: 'User will pick a book by name. Match to book_id from books_map, then immediately call test_step4_get_chapters with classroom_id, subject_id AND book_id.',
                    classroom_id,
                    subject_id,
                    books,
                    books_map: Object.fromEntries(
                        books.map(b => [b.book_name.toLowerCase(), b.book_id ?? b.id])
                    ),
                };
            }
            return { success: false, message: getResponseMessage(res, 'Could not fetch books.') };
        },
    });

    // STEP 4
    useWebMCP({
        name: 'test_step4_get_chapters',
        description: 'STEP 4 of creating a test. Fetch chapters for the chosen book.',
        inputSchema: {
            classroom_id: z.number().describe('classroom_id from step 1'),
            subject_id:   z.number().describe('subject_id from step 2'),
            book_id:      z.number().describe('book_id from step 3'),
        },
        handler: async ({ classroom_id, subject_id, book_id }) => {
            navigate(subjectChildRoute(classroom_id, subject_id, 'create_test')); 
            const res = await axiosInstance.post('/teachers/get_bookmarks', { book_id });
            if (isSuccessResponse(res)) {
                const bookmarks = toArray(getResponseData(res)?.bookmarks);
                const msg = `This book has ${bookmarks.length} chapter${bookmarks.length !== 1 ? 's' : ''}: ${bookmarks.map(b => b.title).join(', ')}. Which chapters should the test cover? You can say "all" or name specific ones.`;
                dispatch(speakText(msg));
                return {
                    success: true,
                    next_step: 'User will pick chapters by name. Match to chapter_range from chapters_map. If user says "all", use all chapters and chapter_range. Then immediately call test_step5_collect_details with classroom_id, subject_id, book_id, chapters and chapter_range.',
                    classroom_id,
                    subject_id,
                    book_id,
                    chapters: bookmarks.map(b => b.title),
                    chapter_range: bookmarks.map(b => b.chapter_range ?? [b.start_page, b.end_page]),
                    chapters_map: Object.fromEntries(
                        bookmarks.map(b => [
                            b.title.toLowerCase(),
                            [b.chapter_range ?? [b.start_page, b.end_page]],
                        ])
                    ),
                };
            }
            return { success: false, message: getResponseMessage(res, 'Could not fetch chapters.') };
        },
    });

    // STEP 5
    useWebMCP({
        name: 'test_step5_collect_details',
        description: `STEP 5 of creating a test.
    Call this after chapters are chosen.
    Ask the teacher ONE question at a time in this exact order:
    1. Test name → test_name
    2. Date → start_date (YYYY-MM-DD)
    3. Time → start_time (HH:MM:SS) — convert natural language e.g. "2 PM" → "14:00:00"
    4. Difficulty → level_of_test (easy / medium / hard)
    5. Question type → type_of_questions (mcq / long_answer)
    6. Duration in minutes → total_duration (default 60)
    7. Number of questions → no_of_questions (default 10)
    8. Number of sets → set_questions (default 1)
    9. Students → students (default ["all"])
    Only call this tool once ALL 9 values are collected.
    DO NOT call test_step6_create until this tool returns success.`,
        inputSchema: {
            classroom_id:      z.number(),
            subject_id:        z.number(),
            book_id:           z.number(),
            // chapters:          z.union([z.array(z.string()),z.string().transform(s => s.split(',').map(s => s.trim()))]).optional().default([]),
            // chapter_range:     z.union([z.array(z.array(z.number())),z.string().transform(s => JSON.parse(s))]).optional().default([]),
            chapters: z.array(z.string()).default([]),

            chapter_range: z.array(z.array(z.number())).default([]),
            test_name:         z.string(),
            start_date:        z.string().describe('YYYY-MM-DD'),
            start_time:        z.string().describe('HH:MM:SS — convert from natural language if needed'),
            level_of_test:     z.enum(['easy', 'medium', 'hard']),
            type_of_questions: z.enum(['mcq', 'long_answer']),
            total_duration:    z.number().default(60),
            no_of_questions:   z.number().default(10),
            set_questions:     z.number().default(1),
            students:          z.union([z.array(z.number()), z.array(z.string())]).default(['all']),
        },
        handler: async (payload) => {
            const msg = `Got it. Test "${payload.test_name}" — ${payload.level_of_test} difficulty, ${payload.type_of_questions}, ${payload.no_of_questions} questions, ${payload.total_duration} mins. Shall I create the test now?`;
            dispatch(speakText(msg));
            return {
                success: true,
                next_step: 'Teacher will confirm. Once confirmed call test_step6_create with the exact same payload.',
                summary: msg,
                ...payload,  // spread so contextRef picks up all fields
            };
        },
    });

    // STEP 6
    useWebMCP({
        name: 'test_step6_create',
        description: 'STEP 6 — Creates the test and generates questions. Only call after teacher confirms step 5.',
        inputSchema: {
            classroom_id:      z.number(),
            subject_id:        z.number(),
            book_id:           z.number(),
            chapters:          z.array(z.string()).default([]),
            chapter_range:     z.array(z.array(z.number())),
            test_name:         z.string(),
            start_date:        z.string(),
            start_time:        z.string(),
            level_of_test:     z.enum(['easy', 'medium', 'hard']),
            type_of_questions: z.enum(['mcq', 'long_answer']),
            total_duration:    z.number().default(60),
            no_of_questions:   z.number().default(10),
            set_questions:     z.number().default(1),
            students:          z.union([z.array(z.number()), z.array(z.string())]).default(['all']),
        },
        handler: async (payload) => {
            navigate(subjectChildRoute(payload.classroom_id, payload.subject_id, 'create_test'));
            dispatch(speakText('Generating test questions, this may take a moment...'));
            const res = await axiosInstance.post('/teachers/save_schedule', {
                ...payload,
                mode_of_test: payload.type_of_questions === 'mcq' ? 'Online' : 'Offline',
            });
            if (isSuccessResponse(res)) {
                const testId = getResponseData(res)?.test_id;
                if (testId) {
                    navigate(subjectChildRoute(payload.classroom_id, payload.subject_id, `preview_test/${testId}`));
                }
                const msg = `Test "${payload.test_name}" created successfully${testId ? ` with ID ${testId}` : ''}. Say "send invitations" when ready.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, test_id: testId };
            }
            const err = getResponseMessage(res, 'Could not create test.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // STEP 7
    useWebMCP({
        name: 'test_step7_send_invitations',
        description: 'STEP 7 — Send test invitations to students. Only call after test_step6_create returns a test_id.',
        inputSchema: {
            test_id: z.number().describe('test_id from test_step6_create'),
        },
        handler: async ({ test_id }) => {
            const res = await axiosInstance.post('/teachers/schedule_test', { test_id });
            if (isSuccessResponse(res)) {
                const msg = 'Invitations sent to all students successfully. The test is now scheduled.';
                dispatch(speakText(msg));
                return { success: true, summary: msg };
            }
            const err = getResponseMessage(res, 'Could not send invitations.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });
    // POST /teachers/get_event
    useWebMCP({
        name: 'teacher_fetch_events',
        description: 'Get custom calendar events for a date range.',
        inputSchema: {
            type: z.enum(['day', 'week', 'month']).describe('Calendar view type'),
            datetime: z.string().describe('Reference date e.g. "2025-06-01"'),
        },
        handler: async ({ type, datetime }) => {
            navigate('/teachers_dashboard/home');
            const res = await axiosInstance.post('/teachers/get_event', { type, datetime });
            if (isSuccessResponse(res)) {
                const events = getResponseData(res, []);
                const count = Array.isArray(events) ? events.length : Object.keys(events).length;
                const msg = `Found ${count} event${count !== 1 ? 's' : ''} for this ${type}.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, events };
            }
            const err = getResponseMessage(res, 'No events found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TIMETABLE  GET /teachers/timetable
    // ─────────────────────────────────────────────────────────────────────────
    useWebMCP({
        name: 'teacher_fetch_timetable',
        description: "Get the teacher's class timetable with periods and timing.",
        inputSchema: {},
        handler: async () => {
            navigate('/teachers_dashboard/home');
            const res = await axiosInstance.get('/teachers/timetable');
            if (isSuccessResponse(res)) {
                const msg = 'Timetable loaded. Check the screen for your full schedule.';
                dispatch(speakText(msg));
                const data = getResponseData(res);
                return { success: true, summary: msg, timetable: data?.timetable, timing: data?.timing };
            }
            const err = getResponseMessage(res, 'No timetable found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // ─────────────────────────────────────────────────────────────────────────
    // ATTACHMENTS
    // ─────────────────────────────────────────────────────────────────────────

    // POST /teachers/get_classroom_attachments
    useWebMCP({
        name: 'teacher_fetch_attachments',
        description: 'Get all attachments uploaded to a subject, grouped by upload date.',
        inputSchema: {
            subject_id: z.number().describe('Subject ID'),
        },
        handler: async ({ subject_id }) => {
            navigate('/teachers_dashboard/classrooms');
            const res = await axiosInstance.post('/teachers/get_classroom_attachments', { subject_id });
            if (isSuccessResponse(res)) {
                const grouped = getResponseData(res, {});
                const totalDates = Object.keys(grouped).length;
                const msg = `Attachments found across ${totalDates} date${totalDates !== 1 ? 's' : ''}. Check the screen for the full list.`;
                dispatch(speakText(msg));
                return { success: true, summary: msg, attachments: grouped };
            }
            const err = getResponseMessage(res, 'No attachments found.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // POST /teachers/upload_attachment (multipart — navigate)
    useWebMCP({
        name: 'teacher_upload_attachment',
        description: 'Navigate to the attachment upload page for a subject.',
        inputSchema: {
            classroom_id: z.number().describe('Classroom ID'),
            subject_id: z.number().describe('Subject ID'),
        },
        handler: async ({ classroom_id, subject_id }) => {
            navigate(subjectChildRoute(classroom_id, subject_id));
            const msg = 'Navigated to attachment upload page. Please select a file and provide a name.';
            dispatch(speakText(msg));
            return { success: true, summary: msg };
        },
    });

    // DELETE /teachers/delete_attachment?attachment_id=<id>
    useWebMCP({
        name: 'teacher_delete_attachment',
        description: 'Delete an attachment. Always confirm before calling.',
        inputSchema: {
            attachment_id: z.number().describe('Attachment ID to delete'),
        },
        handler: async ({ attachment_id }) => {
            const res = await axiosInstance.delete('/teachers/delete_attachment', { params: { attachment_id } });
            if (isSuccessResponse(res)) {
                navigate('/teachers_dashboard/classrooms');
                const msg = 'Attachment deleted successfully.';
                dispatch(speakText(msg));
                return { success: true, summary: msg };
            }
            const err = getResponseMessage(res, 'Could not delete attachment.');
            dispatch(speakText(err));
            return { success: false, message: err };
        },
    });

    // ─────────────────────────────────────────────────────────────────────────
    // LOGOUT
    // ─────────────────────────────────────────────────────────────────────────
    useWebMCP({
        name: 'teacher_logout',
        description: 'Log out the teacher from PrepyAI.',
        inputSchema: {},
        handler: async () => {
            dispatch(speakText('Logging you out. Goodbye!'));
            try { await axiosInstance.post('/logout'); } catch (e) { /* ignore */ }
            localStorage.clear();
            navigate('/');
            return { success: true };
        },
    });

    return null;
};

export default TeacherTools;
