import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import { update_app_data } from 'Views/Common/Slices/Common_slice';
import Icons from 'Utils/Icons';
import Image from 'Utils/Image';
import { create_test_onchange, get_student_details_slice, update_selected_books } from '../Slice/teachersSlice';
import { get_bookmarks } from '../Actions/TeacherActions';

const JsonData = (params) => {
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();
    const { commonState, teachersState } = useCommonState();


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

        students_performance_options: [
            {
                title: "Teachers Assigned",
                route: `/teachers_dashboard/classrooms/${params?.class_id}/${params?.subject_id}/teachers_assigned`
            },
            {
                title: "Self Taking Test",
                route: `/teachers_dashboard/classrooms/${params?.class_id}/${params?.subject_id}/self_taking_test`
            }
        ],

        sidebar_data: [
            {
                name: "Dashboard",
                icon: Icons.sidebar_dashboard_icon,
                active_icon: Icons.sidebar_dashboard_active_icon,
                route: '/teachers_dashboard/home'
            },
            {
                name: "Classrooms",
                icon: Icons.sidebar_classroom_icon,
                active_icon: Icons.sidebar_classroom_active_icon,
                route: '/teachers_dashboard/classrooms'
            },
            {
                name: "Students",
                icon: Icons.sidebar_student_icon,
                active_icon: Icons.sidebar_student_active_icon,
                route: '/teachers_dashboard/students_details'
            },
            // {
            //     name: "Calendar",
            //     icon: Icons.sidebar_calender_icon,
            //     active_icon: Icons.sidebar_calender_active_icon,
            //     route: '/teachers_dashboard/calendar'
            // },
            {
                name: "Notes",
                icon: Icons.sidebar_notes_icon,
                active_icon: Icons.sidebar_notes_active_icon,
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
                route: () => navigate('teachers_assigned')
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
        ],

        attachments: {
            '10-Mar-2025': [
                { image: Image.book_image }
            ],
            '15-Mar-2025': [
                { image: Image.book_image },
                { image: Image.book_image },
                { image: Image.book_image },
                { image: Image.book_image },
            ],
            '20-Mar-2025': [
                { image: Image.book_image }
            ],
        }
    }

    const jsxJson = {
        create_test: [
            {
                name: "Books",
                category: "select",
                type: "normal_select",
                options: commonState?.books?.data?.map((book) => book.book_name),
                placeholder: "Select Book",
                isMandatory: true,
                value: teachersState?.create_test?.selected_books?.book_name || '',
                change: (e) => {
                    const book = commonState?.books?.data?.find(book => book.book_name === e.target.value)
                    dispatch(update_selected_books({ key: "selected_books", value: book }))
                    dispatch(get_bookmarks({ book_id: book?.book_id }))
                },
                divClassName: "col-12 com-sm-6 col-xl-4 p-2",
                Err: commonState?.app_data?.validated ? "Please select a book" : "",

            },
            {
                name: "Chapter",
                category: "select",
                type: "normal_select",
                options: teachersState?.test_records?.data?.map((chapter) => chapter.title),
                placeholder: "Select Chapter",
                isMandatory: true,
                value: teachersState?.create_test?.selected_chapter || '',
                change: (e) => dispatch(update_selected_books({ key: "selected_chapter", value: e.target.value })),
                divClassName: "col-12 com-sm-6 col-xl-4 p-2",
                Err: commonState?.app_data?.validated ? "Please select a chapter" : "",
            },
            // {
            //     name: "Class",
            //     category: "select",
            //     type: "normal_select",
            //     options: [],
            //     placeholder: "Select Class",
            //     isMandatory: true,
            //     value: "",
            //     change: (e) => console.log(e.target.value),
            //     divClassName: "col-12 com-sm-6 col-xl-4 p-2",
            //     Err: commonState?.app_data?.validated ? "Please select a class" : "",
            // },
            {
                name: "Type of Questions",
                category: "select",
                type: "normal_select",
                options: ["MCQ Questions", "Long Questions"],
                placeholder: "Select Type of Questions",
                isMandatory: true,
                value: teachersState?.create_test?.question_type || '',
                change: (e) => dispatch(update_selected_books({ key: "question_type", value: e.target.value })),
                divClassName: "col-12 com-sm-6 col-xl-4 p-2",
                Err: commonState?.app_data?.validated ? "Please select type of questions" : "",
            },
            {
                name: "Number of Questions",
                category: "select",
                type: "normal_select",
                options: [5, 10, 15],
                placeholder: "Select Number of Questions",
                isMandatory: true,
                value: teachersState?.create_test?.question_quantity || '',
                change: (e) => dispatch(update_selected_books({ key: "question_quantity", value: e.target.value })),
                divClassName: "col-12 com-sm-6 col-xl-4 p-2",
                Err: commonState?.app_data?.validated ? "Please enter number of questions" : "",
            },
              {
                name: "Students",
                category: "select",
                type: "normal_select",
                options: ["All"],
                placeholder: "Select Students",
                isMandatory: true,
                value: teachersState?.create_test?.student_all || '',
                change: (e) => dispatch(update_selected_books({ key: "student_all", value: e.target.value })),
                divClassName: "col-12 com-sm-6 col-xl-4 p-2",
                Err: commonState?.app_data?.validated ? "Please enter number of students" : "",
            },
            {
                name: "Date",
                category: "input",
                type: "date",
                options: [],
                placeholder: "Select Date",
                isMandatory: true,
                value: teachersState?.create_test?.selected_date || '',
                change: (e) => dispatch(update_selected_books({ key: "selected_date", value: e.target.value })),
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
                value: teachersState?.create_test?.selected_time || '',
                change: (e) => dispatch(update_selected_books({ key: "selected_time", value: e.target.value })),
                divClassName: "col-12 com-sm-6 col-xl-4 p-2",
                Err: commonState?.app_data?.validated ? "Please select a date" : "",
            },
            {
                name: "Test Duration",
                category: "select",
                type: "normal_select",
                options: [30, 45, 60, 75, 90],
                placeholder: "Select Test Duration",
                isMandatory: true,
                value: teachersState?.create_test?.time_duration || '',
                change: (e) => dispatch(update_selected_books({ key: "time_duration", value: e.target.value })),
                divClassName: "col-12 com-sm-6 col-xl-4 p-2",
                Err: commonState?.app_data?.validated ? "Please select test duration" : "",
            },
            {
                name: "Set Questions",
                category: "select",
                type: "normal_select",
                options: [1, 2, 3, 4],
                placeholder: "Select Set Questions",
                isMandatory: true,
                value: teachersState?.create_test?.question_set || '',
                change: (e) => dispatch(update_selected_books({ key: "question_set", value: e.target.value })),
                divClassName: "col-12 com-sm-6 col-xl-4 p-2",
                Err: commonState?.app_data?.validated ? "Please select Set Questions" : "",
            },
            {
                name: "Mode of Test",
                category: "select",
                type: "normal_select",
                options: ["Online", "Offline"],
                placeholder: "Select Mode of Test",
                isMandatory: true,
                value: teachersState?.create_test?.test_mode || '',
                change: (e) => dispatch(update_selected_books({ key: "test_mode", value: e.target.value })),
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