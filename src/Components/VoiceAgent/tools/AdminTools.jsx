
import { useWebMCP } from '@mcp-b/react-webmcp';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axiosInstance from 'Services/axiosInstance';
import { speakText } from 'Views/Common/Actions/voiceAgentActions';
import { updateModalShow } from 'Views/Common/Slices/Common_slice';
import { handleGetCreateClassroomModalTeachers } from 'Views/Admin/Actions/Admin_action';
import { clearClassroomForm, onChangeClassroomForm } from 'Views/Admin/Slices/adminSlice';

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * ADMIN WebMCP TOOLS
 * Mount inside any Admin layout/page.
 */
const AdminTools = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ── Navigate ────────────────────────────────────────────────────────────
    useWebMCP({
        name: 'admin_navigate',
        description: 'Navigate to any admin dashboard page such as home, classrooms, timetable, profile.',
        inputSchema: {
            route: z.string().describe('Route e.g. /admin_dashboard/classrooms'),
        },
        handler: async ({ route }) => {
            navigate(route);
            return { success: true, navigated_to: route };
        },
    });

    // ── Fetch classrooms ────────────────────────────────────────────────────
    useWebMCP({
        name: 'admin_fetch_classrooms',
        description: 'Get all classrooms in the institution.',
        inputSchema: {},
        handler: async () => {
            const res = await axiosInstance.get('/admin/get_classrooms');
            console.log('RAW CLASSROOM DATA:', JSON.stringify(res.data.data?.[0], null, 2));
            if (res.data.success && res.data.data?.length) {
                navigate('/admin_dashboard/classrooms');
                return {
                    success: true,
                    total: res.data.data.length,
                    classrooms: res.data.data.map((c) => ({
                        id: c.id,
                        name: c.classroom_name,
                        teacher: c.teacher_name,
                        student_count: c.no_of_student_count,
                    })),
                };
            }
            return { success: false, message: 'No classrooms found' };
        },
    });

    // ── Fetch teachers ──────────────────────────────────────────────────────
    useWebMCP({
        name: 'admin_fetch_teachers',
        description: 'Get all teachers in the institution.',
        inputSchema: {},
        handler: async () => {

            const res = await axiosInstance.get('/admin/get_all_teachers');

            console.log(
                "TEACHERS API RESPONSE",
                JSON.stringify(res.data, null, 2)
            );

            if (res.data.success && res.data.data?.length) {

                return {
                    success: true,
                    total: res.data.data.length,
                    teachers: res.data.data.map((t) => ({
                        id: t.teacher_id,
                        name: t.teacher_name,
                        email: t.email_id,
                    })),
                };

            }

            return {
                success: false,
                message: 'No teachers found'
            };
        },
    });

    // ── Fetch classroom details ─────────────────────────────────────────────
    useWebMCP({
        name: 'admin_classroom_details',
        description: 'Get details of a specific classroom including students and teachers.',
        inputSchema: {
            classroom_id: z.string().describe('Classroom ID'),
        },
        handler: async ({ classroom_id }) => {
            const res = await axiosInstance.post('/admin/get_classroom_details', { classroom_id });
            if (res.data.success) {
                return { success: true, details: res.data.data };
            }
            return { success: false, message: 'Could not load classroom details' };
        },
    });

    // ── Fetch classroom performance ─────────────────────────────────────────
    useWebMCP({
        name: 'admin_classroom_performance',
        description: 'Get test performance data for a classroom.',
        inputSchema: {
            classroom_id: z.string().describe('Classroom ID'),
        },
        handler: async ({ classroom_id }) => {
            const res = await axiosInstance.post('/admin/get_classroom_test_performance', { classroom_id });
            if (res.data.success) {
                return { success: true, performance: res.data.data };
            }
            return { success: false, message: 'Could not load performance' };
        },
    });

    // ── Fetch timetable ─────────────────────────────────────────────────────
    useWebMCP({
        name: 'admin_fetch_timetable',
        description: 'Get the institution timetable.',
        inputSchema: {},
        handler: async () => {
            const res = await axiosInstance.get('/admin/timetable');
            if (res.data.success) {
                navigate('/admin_dashboard/timetable');
                return { success: true, timetable: res.data.data };
            }
            return { success: false, message: 'No timetable found' };
        },
    });

    // ── Create classroom ────────────────────────────────────────────────────
    useWebMCP({
        name: 'admin_create_classroom',
        description: `Open the Create Classroom modal in /admin_dashboard/classrooms.
Use this for the admin "create classroom" flow. Prefill class name and selected teachers when provided.
The admin must manually upload the student CSV/XLSX file in the modal and click Create.`,
        inputSchema: {
            classroom_name: z.string().optional().describe('Classroom name to prefill'),
            teacher_ids: z.array(z.union([z.number(), z.string()])).default([]).describe('Teacher IDs to preselect. If a spoken teacher name is accidentally provided here, the tool will match it by name.'),
            teacher_names: z.array(z.string()).default([]).describe('Teacher names to match and preselect when IDs are unknown'),
        },
        handler: async ({ classroom_name = '', teacher_ids = [], teacher_names = [] }) => {
                navigate('/admin_dashboard/classrooms');

            dispatch(clearClassroomForm());
            dispatch(handleGetCreateClassroomModalTeachers());

            const numericTeacherIds = [];
            const spokenTeacherNames = [...teacher_names];

            teacher_ids.forEach(value => {
                const teacherValue = value?.toString().trim();
                if (!teacherValue) return;

                if (/^\d+$/.test(teacherValue)) {
                    numericTeacherIds.push(teacherValue);
                } else {
                    spokenTeacherNames.push(teacherValue);
                }
            });

            let selectedTeacherIds = [...numericTeacherIds];

            if (spokenTeacherNames.length) {
                const res = await axiosInstance.get('/admin/get_all_teachers');
                const teachers = Array.isArray(res?.data?.data) ? res.data.data : [];
                const wantedNames = spokenTeacherNames.map(name => name.toLowerCase().trim());

                const matchedTeacherIds = teachers
                    .filter(teacher => wantedNames.includes((teacher.teacher_name || '').toLowerCase().trim()))
                    .map(teacher => (teacher.id ?? teacher.teacher_id)?.toString())
                    .filter(Boolean);

                selectedTeacherIds = [...new Set([...selectedTeacherIds, ...matchedTeacherIds])];
            }

            await wait(300);

            if (classroom_name) {
                dispatch(onChangeClassroomForm({ field: 'class_name', data: classroom_name }));
            }

            if (selectedTeacherIds.length) {
                dispatch(onChangeClassroomForm({ field: 'teachers', data: selectedTeacherIds }));
            }

            dispatch(updateModalShow({
                show: true,
                close_btn: true,
                modal_from: 'admin',
                modal_type: 'create_classroom',
            }));

            const message = classroom_name
                ? `Create Classroom is open and prefilled for ${classroom_name}. Please upload the student file and click Create.`
                : 'Create Classroom is open. Please enter the class name, select teachers, upload the student file, and click Create.';

            dispatch(speakText(message));

            return {
                success: true,
                summary: message,
                navigated_to: '/admin_dashboard/classrooms',
                classroom_name,
                teacher_ids: selectedTeacherIds,
                next_step: 'Admin uploads the student CSV/XLSX file in the modal, then clicks Create.',
            };
        },
    });

    // ── Invite teachers ─────────────────────────────────────────────────────
    useWebMCP({
        name: 'admin_invite_teachers',
        description: 'Send email invitations to teachers to join the institution.',
        inputSchema: {
            emails: z.array(z.string()).describe('List of teacher email addresses'),
        },
        handler: async ({ emails }) => {
            const res = await axiosInstance.post('/admin/invite_teachers', { emails });
            return {
                success: res.data.success,
                message: res.data.success ? 'Invitations sent to teachers' : 'Could not send invitations',
            };
        },
    });

    // ── Invite students ─────────────────────────────────────────────────────
    useWebMCP({
        name: 'admin_invite_students',
        description: 'Send email invitations to students.',
        inputSchema: {
            emails: z.array(z.string()).describe('List of student email addresses'),
            classroom_id: z.string().optional().describe('Assign to a specific classroom'),
        },
        handler: async (payload) => {
            const res = await axiosInstance.post('/admin/invite_students', payload);
            return {
                success: res.data.success,
                message: res.data.success ? 'Invitations sent to students' : 'Could not send invitations',
            };
        },
    });

    // ── Add timetable ───────────────────────────────────────────────────────
    useWebMCP({
        name: 'admin_add_timetable',
        description: 'Add or update the institution timetable.',
        inputSchema: {
            timetable_data: z.any().describe('Timetable data object'),
        },
        handler: async ({ timetable_data }) => {
            const res = await axiosInstance.post('/admin/timetable', { timetable_data });
            if (res.data.success) {
                navigate('/admin_dashboard/timetable');
                return { success: true, message: 'Timetable updated' };
            }
            return { success: false, message: 'Could not update timetable' };
        },
    });

    // ── Delete classroom ────────────────────────────────────────────────────
    useWebMCP({
        name: 'admin_delete_classroom',
        description: 'Delete a classroom. Always confirm before calling this.',
        inputSchema: {
            classroom_id: z.number().describe('Classroom ID to delete'),
        },
        handler: async ({ classroom_id }) => {
            const res = await axiosInstance.delete(
                `/admin/delete_classroom?classroom_id=${Number(classroom_id)}`
            );
            if (res.data.success) {
                navigate('/admin_dashboard/classrooms');
                return { success: true, message: 'Classroom deleted' };
            }
            return { success: false, message: 'Could not delete classroom' };
        },
    });

    // ── Delete teacher ──────────────────────────────────────────────────────
    useWebMCP({
        name: 'admin_delete_teacher',
        description: 'Remove a teacher from the institution. Always confirm before calling this.',
        inputSchema: {
            teacher_id: z.string().describe('Teacher ID to remove'),
        },
        handler: async ({ teacher_id }) => {
            const res = await axiosInstance.delete('/admin/delete_teacher', { data: { teacher_id } });
            return {
                success: res.data.success,
                message: res.data.success ? 'Teacher removed' : 'Could not remove teacher',
            };
        },
    });

    // ── Delete student ──────────────────────────────────────────────────────
    useWebMCP({
        name: 'admin_delete_student',
        description: 'Remove a student from the institution. Always confirm before calling this.',
        inputSchema: {
            student_id: z.string().describe('Student ID to remove'),
        },
        handler: async ({ student_id }) => {
            const res = await axiosInstance.delete('/admin/delete_student', { data: { student_id } });
            return {
                success: res.data.success,
                message: res.data.success ? 'Student removed' : 'Could not remove student',
            };
        },
    });

    // ── Logout ──────────────────────────────────────────────────────────────
    useWebMCP({
        name: 'admin_logout',
        description: 'Log out the admin from PrepyAI.',
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

export default AdminTools;
