// import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import { useCommonState } from 'Components/CustomHooks';
import Icons from 'Utils/Icons';
import { clearFieldError, onChangeClassroomForm, onChangeEditClassroomStudent, onChangeEditClassroomTeacher, onChangeEditDashboardTeacher, onChangeStaffForm, updateStaffForm } from '../Slices/adminSlice';
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

    }

    const jsxJson = {
        edit_dashboard_teacher_model : [
            {
                category: "input",
                type: "text",
                name: "Staff Name",
                labelClassName: "input-colur text-primary-emphasis",
                value: adminState?.edit_dashboard_teacher.staff_name || '',
                change: (e) => {
                    dispatch(onChangeEditDashboardTeacher({field: "staff_name", data: e.target.value}))
                    dispatch(clearFieldError("staff_name"))
                },
                Err: adminState?.errors.staff_name || ''
            },
            {
                category: "input",
                type: "text",
                name: "Institute Name",
                labelClassName: "input-colur text-primary-emphasis mt-3",
                value: adminState?.edit_dashboard_teacher.institute_name || '',
                change: (e) => {
                    dispatch(onChangeEditDashboardTeacher({field: "institute_name", data: e.target.value}))
                    dispatch(clearFieldError("institute_name"))
                },
                Err: adminState?.errors.institute_name || ''
            },
            {
                category: "input",
                type: "text",
                name: "Subject",
                labelClassName: "input-colur text-primary-emphasis mt-3",
                value: adminState?.edit_dashboard_teacher.subject || '',
                change: (e) => {
                    dispatch(onChangeEditDashboardTeacher({field: "subject", data: e.target.value}))
                    dispatch(clearFieldError('subject'))
                },
                Err: adminState?.errors.subject || ''
            },
            {
                category: "input",
                type: "number",
                name: "Contact No",
                labelClassName: "input-colur text-primary-emphasis mt-3",
                value: adminState?.edit_dashboard_teacher.contact_no || '',
                change: (e) => {
                    dispatch(onChangeEditDashboardTeacher({field: "contact_no", data: e.target.value}))
                    dispatch(clearFieldError('contact_no'))
                },
                Err: adminState?.errors.contact_no || ''
            },
            {
                category: "input",
                type: "email",
                name: "Email",
                labelClassName: "input-colur text-primary-emphasis mt-3",
                value: adminState?.edit_dashboard_teacher.email || '',
                change: (e) => {
                    dispatch(onChangeEditDashboardTeacher({field: "email", data: e.target.value}))
                    dispatch(clearFieldError('email'))
                },
                Err: adminState?.errors.email || ''
            },
            {
                category: "input",
                type: "text",
                name: "Qualification",
                labelClassName: "input-colur text-primary-emphasis mt-3",
                value: adminState?.edit_dashboard_teacher.qualification || '',
                change: (e) => {
                    dispatch(onChangeEditDashboardTeacher({field: "qualification", data: e.target.value}))
                    dispatch(clearFieldError('qualification'))
                },
                Err: adminState?.errors.qualification || ''
            },
        ],

        edit_classroom_teacher_model : [
            {
                category: "input",
                type: "text",
                name: "Staff Name",
                labelClassName: "input-colur text-primary-emphasis",
                value: adminState?.edit_classroom_teacher.staff_name || '',
                change: (e) => {
                    dispatch(onChangeEditClassroomTeacher({field: "staff_name", data: e.target.value}))
                    dispatch(clearFieldError('staff_name'))
                },
                Err: adminState?.errors.staff_name || ''
            },
            {
                category: "input",
                type: "text",
                name: "Subject",
                labelClassName: "input-colur text-primary-emphasis mt-3",
                value: adminState?.edit_classroom_teacher.subject_name || '',
                change: (e) => {
                    dispatch(onChangeEditClassroomTeacher({field: "subject_name", data: e.target.value}))
                    dispatch(clearFieldError('subject_name'))
                },
                Err: adminState?.errors.subject_name || ''
            },
            {
                category: "input",
                type: "number",
                name: "Contact No",
                labelClassName: "input-colur text-primary-emphasis mt-3",
                value: adminState?.edit_classroom_teacher.contact_no || '',
                change: (e) => {
                    dispatch(onChangeEditClassroomTeacher({field: "contact_no", data: e.target.value}))
                    dispatch(clearFieldError('contact_no'))
                },
                Err: adminState?.errors.contact_no || ''
            },
            {
                category: "input",
                type: "email",
                name: "Email",
                labelClassName: "input-colur text-primary-emphasis mt-3",
                value: adminState?.edit_classroom_teacher.email || '',
                change: (e) => {
                    dispatch(onChangeEditClassroomTeacher({field: "email", data: e.target.value}))
                    dispatch(clearFieldError('email'))
                },
                Err: adminState?.errors.email || ''
            },
            {
                category: "input",
                type: "text",
                name: "Qualification",
                labelClassName: "input-colur text-primary-emphasis mt-3",
                value: adminState?.edit_classroom_teacher.qualification || '',
                change: (e) => {
                    dispatch(onChangeEditClassroomTeacher({field: "qualification", data: e.target.value}))
                    dispatch(clearFieldError('qualification'))
                },
                Err: adminState?.errors.qualification || ''
            },
        ],

        edit_classroom_student_model : [
            {
                category: "input",
                type: "text",
                name: "Student Name",
                className: "mb-2",
                labelClassName: "input-colur text-primary-emphasis",
                value: adminState?.edit_classroom_student.student_name || '',
                change: (e) => dispatch(onChangeEditClassroomStudent({field: "student_name", data: e.target.value}))
            },
            {
                category: "input",
                type: "number",
                name: "Contact No",
                className: "mb-2",
                labelClassName: "input-colur text-primary-emphasis",
                value: adminState?.edit_classroom_student.contact_no || '',
                change: (e) => dispatch(onChangeEditClassroomStudent({field: "contact_no", data: e.target.value}))
            },
            {
                category: "input",
                type: "email",
                name: "Email",
                className: "mb-2",
                labelClassName: "input-colur text-primary-emphasis",
                value: adminState?.edit_classroom_student.email || '',
                change: (e) => dispatch(onChangeEditClassroomStudent({field: "email", data: e.target.value}))
            },
            {
                category: "input",
                type: "text",
                name: "Status",
                className: "mb-2",
                labelClassName: "input-colur text-primary-emphasis",
                value: adminState?.edit_classroom_student.status || '',
                change: (e) => dispatch(onChangeEditClassroomStudent({field: "status", data: e.target.value}))
            },
            {
                category: "input",
                type: "number",
                name: "No of Attempts",
                className: "mb-4",
                labelClassName: "input-colur text-primary-emphasis",
                value: adminState?.edit_classroom_student.no_of_attempts ?? '',
                change: (e) => dispatch(onChangeEditClassroomStudent({field: "no_of_attempts", data: e.target.value}))
            },
            {
                category: "input",
                type: "text",
                name: "Reg no",
                className: "mb-4",
                labelClassName: "input-colur text-primary-emphasis",
                value: adminState?.edit_classroom_student.register_no || '',
                change: (e) => dispatch(onChangeEditClassroomStudent({field: "register_no", data: e.target.value}))
            }
        ],

        delete_dashboard_teacher_model : [
            {
                category: "heading",
                title: `${adminState?.edit_dashboard_teacher.staff_name} ?` || '',
                divClassName: "text-center mb-4"
            },
        ],

        delete_classroom_teacher_model : [
            {
                category: "heading",
                title: `${adminState?.edit_classroom_teacher.staff_name} ?` || '',
                divClassName: "text-center mb-4"
            },
        ],

        delete_classroom_student_model : [
            {
                category: "heading",
                title: `${adminState?.edit_classroom_student.student_name} ?` || '',
                divClassName: "text-center mb-4"
            },
        ],

        create_staff_modal : [
            {
                category: "input",
                type: "text",
                name: "Staff Name",
                labelClassName: "input-colur text-primary-emphasis mt-2",
                value: adminState?.file ? '' : adminState?.staffForm.name || '',
                change: (e) => { 
                    dispatch(onChangeStaffForm({field: "name", data: e.target.value}))
                    dispatch(clearFieldError('name'))
                },
                Err: adminState?.errors.name || '',
                disabled: adminState?.file
            },
            {
                category: "input",
                type: "email",
                name: "Email id",
                labelClassName: "input-colur text-primary-emphasis mt-3",
                value: adminState?.file ? '' : adminState?.staffForm.email_id || '',
                change: (e) => { 
                    dispatch(onChangeStaffForm({field: "email_id", data: e.target.value}))
                    dispatch(clearFieldError('email_id'))
                },
                Err: adminState?.errors.email_id || '',
                disabled: adminState?.file
            },
            {
                category: "input",
                type: "text",
                name: "Subject Name",
                labelClassName: "input-colur text-primary-emphasis mt-3",
                value: adminState?.file ? '' : adminState?.staffForm.subject_name || '',
                change: (e) => { 
                    dispatch(onChangeStaffForm({field: "subject_name", data: e.target.value}))
                    dispatch(clearFieldError('subject_name'))
                },
                Err: adminState?.errors.subject_name || '',
                disabled: adminState?.file
            },
            {
                category: "input",
                type: "text",
                name: "Institute Name",
                labelClassName: "input-colur text-primary-emphasis mt-3",
                value: adminState?.file ? '' : adminState?.staffForm.institute_name || '',
                change: (e) => { 
                    dispatch(onChangeStaffForm({field: "institute_name", data: e.target.value}))
                    dispatch(clearFieldError('institute_name'))
                },
                Err: adminState?.errors.institute_name || '',
                disabled: adminState?.file
            }
        ],

        create_classroom_modal : [
            {
                name: "Enter a Class Name",
                category: "input",
                type: "text",
                labelClassName: "input-colur text-primary-emphasis mt-2",
                value: adminState?.classroomForm.class_name || '',
                change: (e) => { 
                    dispatch(onChangeClassroomForm({field: "class_name", data: e.target.value}))
                    dispatch(clearFieldError('class_name'))
                },
                Err: adminState?.errors.class_name || ''
            },
            {
                name: "Select Teacher",
                category: "select",
                type: "react_dropdown_select",
                divClassName: "mt-3",
                labelClassName: "input-colur text-primary-emphasis",
                options:[
                    {label: "teacher1", value: 1},
                    {label: "teacher2", value: 2},
                    {label: "teacher3", value: 3}
                ],
                labelField: "label",
                valueField: "value",
                multi: true,
                // value: adminState?.classroomForm.teachers || [],
                value: adminState?.classroomForm.teachers.map(id => [
                    {label: "teacher1", value: 1},
                    {label: "teacher2", value: 2},
                    {label: "teacher3", value: 3}
                ].find(opt=> opt.value === id)) || [],
                change: (values) => { 
                    const selectedIds = values.map(v => v.value)
                    dispatch(onChangeClassroomForm({field: "teachers", data: selectedIds}))
                    dispatch(clearFieldError('teachers'))
                },
                Err: adminState?.errors.teachers || ''
            }
        ],
    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData