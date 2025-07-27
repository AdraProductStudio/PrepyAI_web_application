// import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import Icons from 'Utils/Icons';

const JsonData = (params) => {
    //main selectors
    // const dispatch = useDispatch();
    // const navigate = useCustomNavigate();
    // const { commonState } = useCommonState();


    const jsonOnly = {
        days: ["Friday", "Thursday", "Wednesday", "Tuesday", "Monday"],

        history_table_header: ['Book Name', 'Chapter', 'Date', 'Duration', 'Status'],

        student_table_headers: ['S.no', 'Student Name', 'Contact No', 'Email', 'Status', 'Number of  Attempt', 'Reg.No', 'Action'],

        timeSlots: ["8.30AM - 9.15AM", "9.15AM - 10AM", "10.30AM - 11.15AM", "11.15AM - 12PM", "1PM - 1.45PM", "1.45PM - 2.30PM", "2.30PM - 3.15PM", "3.15PM - 4PM"],

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
                route: 'create_test'
            },
            {
                icon: Icons.clock_colored,
                title: "Test",
                route: 'test'
            },
            {
                icon: Icons.performance_colored,
                title: "Student Performance",
                route: 'student_performance'
            },
            {
                icon: Icons.single_book_colored,
                title: "Book",
                route: 'book'
            },
            {
                icon: Icons.attachment_colored,
                title: "Attachments",
                route: 'attachments'
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