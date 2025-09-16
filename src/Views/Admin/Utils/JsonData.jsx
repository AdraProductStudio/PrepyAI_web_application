// import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import { useCommonState } from 'Components/CustomHooks';
import Icons from 'Utils/Icons';
import { clearFieldError, edit_profile_Inputs, onChangeClassroomForm, onChangeEditClassroomStudent, onChangeEditClassroomTeacher, onChangeEditDashboardTeacher, onChangeStaffForm, updateSettingsInputs } from '../Slices/adminSlice';
import { useDispatch } from 'react-redux';
import { getDashboardChartData, handleClassroomChart } from '../Actions/Admin_action';

const JsonData = () => {
    //main selectors
    const dispatch = useDispatch();
    // const navigate = useCustomNavigate();
    // const { commonState } = useCommonState();
    
    const { adminState, commonState } = useCommonState();
    // const { staffForm, file, loading } = adminState

    const teacherOptions = adminState?.create_classroom_modal_teachers_list || [];
    const selectedTeachers = (adminState?.classroomForm.teachers || [])
    .map(id => teacherOptions.find(opt => opt.id?.toString() === id?.toString()))
    .filter(Boolean);

    const dashboardMonthlyGrowthDropDownOptions = adminState?.dashboard_chart_years.map(item => ({ id: item.years, year: item.years }))
    const classroomMonthlyGrowthDropDownOptions = adminState?.classroom_chart_years.map(item => ({ id: item.year, year: item.year }))

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
        staff_table_headers: ['S.No', 'Staff Name', 'Institute Name', 'Contact No', 'Email', 'Qualification', 'Action'],

        card_data : [
            { icon: Icons.student_dashboard_to_no_stud_icon, count: adminState?.dashboard_overview.total_teachers, description: "Total No.of Teacher" },
            { icon: Icons.multiple_people_icon, count: adminState?.dashboard_overview.total_students, description: "Total No.of Students" },
            { icon: Icons.admin_computer_icon_pink, count: adminState?.dashboard_overview.total_classrooms, description: "Total No.of Classrooms" },
            { icon: Icons.admin_test_icon, count: adminState?.dashboard_overview.total_tests, description: "Total No.of Tests" }
        ],

        profileNavItems: [
            {
                name: "Personal Information",
                icon: (isActive) => Icons.profile_icon(isActive),
                to: "/admin_dashboard/profile"
            },
            {
                name: "Settings",
                icon: (isActive) => Icons.settings_icon(isActive),
                to: "/admin_dashboard/profile/settings"
            },
        ],

    }

    const jsxJson = {
        edit_dashboard_teacher_model : [
            {
                category: "input",
                type: "text",
                name: "First Name",
                labelClassName: "input-colur text-primary-emphasis",
                value: adminState?.edit_dashboard_teacher.first_name || '',
                change: (e) => {
                    dispatch(onChangeEditDashboardTeacher({field: "first_name", data: e.target.value}))
                    dispatch(clearFieldError("first_name"))
                },
                Err: adminState?.errors.first_name || ''
            },
            {
                category: "input",
                type: "text",
                name: "Last Name",
                labelClassName: "input-colur text-primary-emphasis",
                value: adminState?.edit_dashboard_teacher.last_name || '',
                change: (e) => {
                    dispatch(onChangeEditDashboardTeacher({field: "last_name", data: e.target.value}))
                    dispatch(clearFieldError("last_name"))
                },
                Err: adminState?.errors.last_name || ''
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
            // {
            //     category: "input",
            //     type: "text",
            //     name: "Subject",
            //     labelClassName: "input-colur text-primary-emphasis mt-3",
            //     value: adminState?.edit_dashboard_teacher.subject || '',
            //     change: (e) => {
            //         dispatch(onChangeEditDashboardTeacher({field: "subject", data: e.target.value}))
            //         dispatch(clearFieldError('subject'))
            //     },
            //     Err: adminState?.errors.subject || ''
            // },
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
                disabled: true,
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
                name: "First Name",
                labelClassName: "input-colur text-primary-emphasis",
                value: adminState?.edit_classroom_teacher.first_name || '',
                change: (e) => {
                    dispatch(onChangeEditClassroomTeacher({field: "first_name", data: e.target.value}))
                    dispatch(clearFieldError('first_name'))
                },
                Err: adminState?.errors.first_name || ''
            },
            {
                category: "input",
                type: "text",
                name: "Last Name",
                labelClassName: "input-colur text-primary-emphasis",
                value: adminState?.edit_classroom_teacher.last_name || '',
                change: (e) => {
                    dispatch(onChangeEditClassroomTeacher({field: "last_name", data: e.target.value}))
                    dispatch(clearFieldError('last_name'))
                },
                Err: adminState?.errors.last_name || ''
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
                disabled: true,
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
                title: `${adminState?.edit_dashboard_teacher.first_name} ${adminState?.edit_dashboard_teacher.last_name} ?` || '',
                divClassName: "text-center mb-4"
            },
        ],

        delete_classroom_teacher_model : [
            {
                category: "heading",
                title: `${adminState?.edit_classroom_teacher.first_name} ${adminState?.edit_classroom_teacher.last_name} ?` || '',
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

        delete_classroom_model : [
            {
                category: "heading",
                title: `${adminState?.delete_classroom_data.classroom_name} ?` || '',
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
                options: adminState?.create_classroom_modal_teachers_list || [],
                labelField: "teacher_name",
                valueField: "id",
                multi: true,
                value: selectedTeachers ,
                change: (values) => { 
                    const selectedIds = values.map(v => v.id)
                    dispatch(onChangeClassroomForm({field: "teachers", data: selectedIds}))
                    dispatch(clearFieldError('teachers'))
                },
                Err: adminState?.errors.teachers || ''
            }
        ],

        profile_details:[
            {
                name: "First Name",
                value: adminState?.profileInputs?.first_name || '',
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                divClassName: "mb-3 col-12 col-lg-6 p-2",
                readOnly: true
            },
            {
                name: "Last Name",
                value: adminState?.profileInputs?.last_name || '',
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                divClassName: "mb-3 col-12 col-lg-6 p-2",
                readOnly: true
            },
            {
                name: "Email",
                value: adminState?.profileInputs?.email_id || '',
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                divClassName: "mb-3  col-12 col-lg-6 p-2",
                readOnly: true
            },
            {
                name: "Phone Number",
                value: adminState?.profileInputs?.phone_number || '',
                type: "number",
                title: " ",
                category: "input",
                placeholder: "",
                divClassName: "mb-3  col-12 col-lg-6 p-2",
                readOnly: true
            },
            {
                name: "Address",
                value: adminState?.profileInputs?.address || '',
                title: " ",
                category: "textbox",
                placeholder: "",
                divClassName: "mb-3  col-12 p-2",
                readOnly: true
            }

        ],

        settings_details:[
                {
                name: "Current Password",
                type: "text",
                title: " ",
                category: "input",
                placeholder: "Current Password",
                value: adminState?.settingsInputs?.old_password || '',
                change: (e) => dispatch(updateSettingsInputs({ field: 'old_password', value: e.target.value })),
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                Err: commonState?.app_data?.validated && !adminState?.settingsInputs?.old_password ? "First name required" : null
            },
            {
                name: "New Password",
                type: "text",
                title: " ",
                category: "input",
                placeholder: "Current Password",
                value: adminState?.settingsInputs?.confirm_password || '',
                change: (e) => dispatch(updateSettingsInputs({ field: 'confirm_password', value: e.target.value })),
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                Err: commonState?.app_data?.validated && !adminState?.settingsInputs?.confirm_password ? "Confirm Password required" : null
            },
            {
                name: "Confirm Password",
                type: "text",
                title: " ",
                category: "input",
                placeholder: "Confirm Password",
                value: adminState?.settingsInputs?.new_password || '',
                change: (e) => dispatch(updateSettingsInputs({ field: 'new_password', value: e.target.value })),
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                Err: commonState?.app_data?.validated && !adminState?.settingsInputs?.new_password ? "New password required" : null
            },

        ],

        admin_profile: [
            {
                name: "First Name",
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                value: adminState?.editProfileInputs?.first_name || '',
                change: (e) => dispatch(edit_profile_Inputs({ field: 'first_name', value: e.target.value })),
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                Err: commonState?.app_data?.validated && !adminState?.editProfileInputs?.first_name ? "First name required" : null,
            },
            {
                name: "Last Name",
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                value: adminState?.editProfileInputs?.last_name || '',
                change:(e) => dispatch(edit_profile_Inputs({ field: 'last_name', value: e.target.value })),
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                Err: commonState?.app_data?.validated && !adminState?.editProfileInputs?.last_name ? "Last name required" : null,
            },
            {
                name: "Email",
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                value: adminState?.editProfileInputs?.email_id || '',
                change:(e) => dispatch(edit_profile_Inputs({ field: 'email_id', value: e.target.value })),
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                Err: commonState?.app_data?.validated && !adminState?.editProfileInputs?.email_id ? "Email required" : null,
                disabled: true,
            },
            {
                name: "Phone Number",
                type: "number",
                title: " ",
                category: "input",
                placeholder: "",
                value: adminState?.editProfileInputs?.phone_number ||'',
                change:(e) => dispatch(edit_profile_Inputs({ field: 'phone_number', value: e.target.value })),
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                Err: commonState?.app_data?.validated && !adminState?.editProfileInputs?.phone_number ? "Phone Number required" : null
            },
            {
                name: "Address",
                title: " ",
                category: "textbox",
                placeholder: "",
                value: adminState?.editProfileInputs?.address ||'',
                change:(e) => dispatch(edit_profile_Inputs({ field: 'address', value: e.target.value })),
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                Err: commonState?.app_data?.validated && !adminState?.editProfileInputs?.address ? "Phone Number required" : null
            },
        ],

        dashboard_chart_months: [
            {
                category: "select",
                type: "react_dropdown_select",
                placeholder: "",
                className: "custom-dropdown",
                isMandatory: false,
                labelClassName: "text-primary-emphasis",
                options: dashboardMonthlyGrowthDropDownOptions || [],
                labelField: "year",
                valueField: "id",
                multi: false,
                value: [{id: 0, year: "year"}],
                change: (values) => { 
                    const selectedId = values?.[0]?.id
                    dispatch(getDashboardChartData({year: selectedId}))
                },
            }
        ],

        classroom_chart_months: [
            {
                category: "select",
                type: "react_dropdown_select",
                placeholder: "",
                className: "custom-dropdown",
                isMandatory: false,
                labelClassName: "text-primary-emphasis",
                options: classroomMonthlyGrowthDropDownOptions || [],
                labelField: "year",
                valueField: "id",
                multi: false,
                value: [{id: 0, year: "year"}],
                change: (values) => { 
                    const selectedId = values?.[0]?.id
                    dispatch(handleClassroomChart({classroom_id: adminState?.classroom_id?.id, year: selectedId}))
                },
            }
        ]
    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData