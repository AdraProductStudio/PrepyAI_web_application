// import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import { useCommonState } from 'Components/CustomHooks';
import Icons from 'Utils/Icons';
import { clearFieldError, updateStaffForm } from '../Slices/adminSlice';
import { useDispatch } from 'react-redux';

const JsonData = () => {
    //main selectors
    const dispatch = useDispatch();
    // const navigate = useCustomNavigate();
    // const { commonState } = useCommonState();
    
    const { adminState } = useCommonState();
    // const { staffForm, file, loading } = adminState

    const jsonOnly = {
        sidebar_data: [
            {
                name: "Dashboard",
                icon: Icons.sidebar_dashboard_icon,
                active_icon: Icons.sidebar_dashboard_active_icon,
                route: '/admin_dashboard/home'
            },
            {
                name: "Classrooms",
                icon: Icons.sidebar_classroom_icon,
                active_icon: Icons.sidebar_classroom_active_icon,
                route: '/admin_dashboard/classrooms'
            }
        ],
        staff_table_headers: ['S.No', 'Staff Name', 'Institute Name', 'Subject', 'Contact No', 'Email', 'Qualification', 'Action'],

        card_data : [
            { icon: Icons.student_dashboard_to_no_stud_icon, count: adminState?.dashboard_overview.total_teachers, description: "Total No.of Teacher" },
            { icon: Icons.multiple_people_icon, count: adminState?.dashboard_overview.total_students, description: "Total No.of Students" },
            { icon: Icons.admin_computer_icon_pink, count: adminState?.dashboard_overview.total_classrooms, description: "Total No.of Classrooms" },
            { icon: Icons.admin_test_icon, count: adminState?.dashboard_overview.total_tests, description: "Total No.of Tests" }
        ],

        table_data : [
            { s_no: 1, staff_name: "John Doe", institute_name: "ABC Institute", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
            { s_no: 1, staff_name: "John Doe", institute_name: "ABC Institute", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
            { s_no: 1, staff_name: "John Doe", institute_name: "ABC Institute", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
            { s_no: 1, staff_name: "John Doe", institute_name: "ABC Institute", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
            { s_no: 1, staff_name: "John Doe", institute_name: "ABC Institute", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
            { s_no: 1, staff_name: "John Doe", institute_name: "ABC Institute", subject: "Mathematics", contact_no: "1234567890", email: "test@example.com", qualification: "M.Sc Mathematics" },
        ],

        create_staff : [
            {
                label: "Staff Name",
                type: "text",
                id: "staff_name",
                name: "name",
                value: adminState?.staffForm.name || '',
                change: (e) => { 
                    dispatch(updateStaffForm({ [e.target.name]: e.target.value })) 
                    dispatch(clearFieldError(e.target.name))
                },
            },
            {
                label: "Email Id",
                type: "text",
                id: "email",
                name: "email_id",
                value: adminState?.staffForm.email_id || '',
                change: (e) => {
                    dispatch(updateStaffForm({ [e.target.name]: e.target.value }))
                    dispatch(clearFieldError(e.target.name))
                },
            },
            {
                label: "Subject Name",
                type: "text",
                id: "sub_name",
                name: "subject_name",
                value: adminState?.staffForm.subject_name || '',
                change: (e) => {
                    dispatch(updateStaffForm({ [e.target.name]: e.target.value }))
                    dispatch(clearFieldError(e.target.name))
                },
            },
            {
                label: "Institute Name",
                type: "text",
                id: "instu_name",
                name: "institute_name",
                value: adminState?.staffForm.institute_name || '',
                change: (e) => {
                    dispatch(updateStaffForm({ [e.target.name]: e.target.value }))
                    dispatch(clearFieldError(e.target.name))
                },
            }
        ]

    }

    const jsxJson = {

    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData