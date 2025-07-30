import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import { update_app_data } from 'Views/Common/Slices/Common_slice';
import Icons from 'Utils/Icons';

const JsonData = (params) => {
    //main selectors
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();
    const { commonState } = useCommonState();


    const jsonOnly = {
        days: ["Friday", "Thursday", "Wednesday", "Tuesday", "Monday"],

        history_table_header: ['Book Name', 'Chapter', 'Date', 'Duration', 'Status'],

        student_table_headers: ['S.no', 'Student Name', 'Contact No', 'Email', 'Status', 'Number of  Attempt', 'Reg.No', 'Action'],

        timeSlots: ["8.30AM - 9.15AM", "9.15AM - 10AM", "10.30AM - 11.15AM", "11.15AM - 12PM", "1PM - 1.45PM", "1.45PM - 2.30PM", "2.30PM - 3.15PM", "3.15PM - 4PM"],

        test_options: [
            {
                name: "Upcoming",
                route: `/teachers_dashboard/classrooms/${params?.class_id}/${params?.subject_id}/test`
            },
            {
                name: "Ongoing",
                route: `/teachers_dashboard/classrooms/${params?.class_id}/${params?.subject_id}/test/ongoing_test`
            },
            {
                name: "Completed",
                route: `/teachers_dashboard/classrooms/${params?.class_id}/${params?.subject_id}/test/completed_test`
            }
        ],

        schedule_test_options: [
            {
                title: "Create",
                description: "Complete the all Fileds",
                route: `/teachers_dashboard/classrooms/${params?.class_id}/${params?.subject_id}/create_test`
            },
            {
                title: "Preview",
                description: "Complete the all Fileds",
                route: `/teachers_dashboard/classrooms/${params?.class_id}/${params?.subject_id}/preview_test`
            }
        ],

        sidebar_data: [
            {
                name: "Dashboard",
                icon: Icons.sidebar_dashboard_icon,
                route: '/teachers_dashboard/home'
            },
            {
                name: "Classrooms",
                icon: Icons.sidebar_classroom_icon,
                route: '/teachers_dashboard/classrooms'
            },
            {
                name: "Students",
                icon: Icons.sidebar_student_icon,
                route: '/teachers_dashboard/students_details'
            },
            {
                name: "Calendar",
                icon: Icons.sidebar_calender_icon,
                route: '/teachers_dashboard/calendar'
            },
            {
                name: "Notes",
                icon: Icons.sidebar_notes_icon,
                route: '/teachers_dashboard/notes'
            }
        ],
        subject_options: [
            {
                icon: Icons.no_of_books_colored,
                title: "Schedule Test",
                route: () => navigate('create_test')
            },
            {
                icon: Icons.clock_colored,
                title: "Test",
                route: () => navigate('test')
            },
            {
                icon: Icons.performance_colored,
                title: "Student Performance",
                route: () => navigate('student_performance')
            },
            {
                icon: Icons.single_book_colored,
                title: "Book",
                route: () => navigate('book')
            },
            {
                icon: Icons.attachment_colored,
                title: "Attachments",
                onClick: () => dispatch(update_app_data({ type: 'canvas', data: { show: true, type: "attachments", from: "teachers", close_btn: true, extraClass: 'attachment_canvas', placement: 'end' } })),
            }
        ]
    }

    const jsxJson = {
        create_test: [
            {
                name: "Books",
                category: "select",
                type: "normal_select",
                options: [],
                placeholder: "Select Book",
                isMandatory: true,
                value: "",
                change: (e) => console.log(e.target.value),
                divClassName: "col-12 com-sm-6 col-xl-4 p-2",
                Err: commonState?.app_data?.validated ? "Please select a book" : "",
            },
            {
                name: "Chapter",
                category: "select",
                type: "normal_select",
                options: [],
                placeholder: "Select Chapter",
                isMandatory: true,
                value: "",
                change: (e) => console.log(e.target.value),
                divClassName: "col-12 com-sm-6 col-xl-4 p-2",
                Err: commonState?.app_data?.validated ? "Please select a chapter" : "",
            },
            {
                name: "Type of Questions",
                category: "select",
                type: "normal_select",
                options: [],
                placeholder: "Select Type of Questions",
                isMandatory: true,
                value: "",
                change: (e) => console.log(e.target.value),
                divClassName: "col-12 com-sm-6 col-xl-4 p-2",
                Err: commonState?.app_data?.validated ? "Please select type of questions" : "",
            },
            {
                name: "Number of Questions",
                category: "select",
                type: "normal_select",
                options: [],
                placeholder: "Select Number of Questions",
                isMandatory: true,
                value: "",
                change: (e) => console.log(e.target.value),
                divClassName: "col-12 com-sm-6 col-xl-4 p-2",
                Err: commonState?.app_data?.validated ? "Please enter number of questions" : "",
            },
            {
                name: "Class",
                category: "select",
                type: "normal_select",
                options: [],
                placeholder: "Select Class",
                isMandatory: true,
                value: "",
                change: (e) => console.log(e.target.value),
                divClassName: "col-12 com-sm-6 col-xl-4 p-2",
                Err: commonState?.app_data?.validated ? "Please select a class" : "",
            },
            {
                name: "Students",
                category: "select",
                type: "react_dropdown_select",
                multi: true,
                create: false,
                options: [],
                placeholder: "Select Students",
                isMandatory: true,
                value: "",
                change: (e) => console.log(e.target.value),
                divClassName: "col-12 com-sm-6 col-xl-4 p-2",
                Err: commonState?.app_data?.validated ? "Please select student" : "",
            },
            {
                name: "Date",
                category: "input",
                type: "date",
                options: [],
                placeholder: "Select Date",
                isMandatory: true,
                value: "",
                change: (e) => console.log(e.target.value),
                divClassName: "col-12 com-sm-6 col-xl-4 p-2",
                Err: commonState?.app_data?.validated ? "Please select a date" : "",
            },
            {
                name: "Time",
                category: "input",
                type: "time",
                options: [],
                placeholder: "Select Date",
                isMandatory: true,
                value: "",
                change: (e) => console.log(e.target.value),
                divClassName: "col-12 com-sm-6 col-xl-4 p-2",
                Err: commonState?.app_data?.validated ? "Please select a date" : "",
            },
            {
                name: "Test Duration",
                category: "select",
                type: "normal_select",
                options: [],
                placeholder: "Select Test Duration",
                isMandatory: true,
                value: "",
                change: (e) => console.log(e.target.value),
                divClassName: "col-12 com-sm-6 col-xl-4 p-2",
                Err: commonState?.app_data?.validated ? "Please select test duration" : "",
            },
            {
                name: "Set Questions",
                category: "select",
                type: "normal_select",
                options: [],
                placeholder: "Select Set Questions",
                isMandatory: true,
                value: "",
                change: (e) => console.log(e.target.value),
                divClassName: "col-12 com-sm-6 col-xl-4 p-2",
                Err: commonState?.app_data?.validated ? "Please select Set Questions" : "",
            },
            {
                name: "Mode of Test",
                category: "select",
                type: "normal_select",
                options: [],
                placeholder: "Select Mode of Test",
                isMandatory: true,
                value: "",
                change: (e) => console.log(e.target.value),
                divClassName: "col-12 com-sm-6 col-xl-4 p-2",
                Err: commonState?.app_data?.validated ? "Please select Mode of Test" : "",
            }
        ]
    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData