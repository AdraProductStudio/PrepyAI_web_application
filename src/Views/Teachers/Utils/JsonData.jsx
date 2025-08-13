import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import { update_app_data } from 'Views/Common/Slices/Common_slice';
import Icons from 'Utils/Icons';
import Image from 'Utils/Image';
import { useEffect } from 'react';
import { updatePostClassroomsData, updatePostStudentData, updatePostSubjectsData } from '../Slice/teachersSlice';

const JsonData = (params) => {
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();
    const { commonState,teachersState } = useCommonState();

    console.log(teachersState?.teacher_GetStudentList?.data?.students,"Sdashjkjbgv")
    const jsonOnly = {
        dashboard_count_details:[
            {
                icon: Icons.student_dashboard_to_no_stud_icon, 
                count: teachersState?.teacher_DashboardData?.data?.total_no_of_students || 0,
                description: "Total number of tests conducted"
            },
            {
                icon: Icons.student_dashboard_to_no_cls_icon,
                count: teachersState?.teacher_DashboardData?.data?.total_no_of_classrooms || 0, 
                description: "Total number of classes"
            }
        ],

        classroom_card_details : [{ icons: Icons?.no_of_students, content: 'No of Students', count: teachersState?.teacher_GetClassrooms?.data?.classrooms?.no_of_students || 0 }, { icons: Icons?.no_of_subjects, content: 'No of Subjects', count: teachersState?.teacher_GetClassrooms?.data?.classrooms?.no_of_subjects || 0}],


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
        ],
        classroomModal:[
                  {
                    name: "Enter a Class Name",
                    type: "text",
                    category: "input",
                    placeholder: "Enter Your Class Name",
                    value: teachersState?.teacher_PostClassrooms?.data?.classroom_name || "",
                    change: (e) => dispatch(updatePostClassroomsData({ classroom_name: e.target.value })),
                    divClassName: "col-12 mb-4",
                     className: "p-2 ", 
                    isMandatory: true,
                    // Err: commonState?.app_data?.validated && !authState?.learnersregisterdata?.firstName ? "firstName required" : null,
                  },
                  {
                    name: "Select Teachers",
                    category: "select",
                    type: "react_dropdown_select",
                    options: Array.isArray(teachersState?.teacher_GetTeachers?.data)
                    ? teachersState.teacher_GetTeachers.data.map(teacher => ({
                          label: teacher.teacher_name,
                          value: teacher.user_id,
                      }))
                    : [],
                    multi:true,
                    placeholder: "Select Teachers",
                    isMandatory: true,
                    divClassName: "col-12 mb-4",
                    className: "p-3",
                    value: Array.isArray(teachersState?.teacher_PostClassrooms?.data?.teachers)
                    ? teachersState.teacher_PostClassrooms.data.teachers.map(id => ({
                    label: teachersState.teacher_GetTeachers.data.find(t => t.user_id === id)?.teacher_name || "",
                    value: id
                    }))
                    : [],
                    change: (selectedOptions) => dispatch(updatePostClassroomsData({ teachers: selectedOptions.map(opt => opt.value) })),
                    // Err: commonState?.app_data?.validated ? "Please select Mode of Test" : "",
                },
                {
                    name: "Upload File",
                    category: "input",
                    type: "file",
                    placeholder: "Choose a file",
                    divClassName: "col-12 mb-3",
                    accept: ".csv",
                    fileLength: 1,
                    value: Array.isArray(teachersState?.teacher_PostClassrooms?.data?.student_file)
                    ? teachersState?.teacher_PostClassrooms?.data?.student_file?.map(val => val)
                    : [],   
                    change: (e) => {
                        const files = Array.from(e.target.files);
                        dispatch(updatePostClassroomsData({ student_file: files }));
                    },
                    isMandatory: true
                }
                
        ],

        addSubjects:[
            {
                name: "Subject Name",
                type: "text",
                category: "input",
                placeholder: "Enter Your Subject Name",
                value: teachersState?.teacher_PostSubjects?.data?.subject_name || "",
                change: (e) => dispatch(updatePostSubjectsData({ subject_name: e.target.value })),
                divClassName: "col-12 mb-4",
                className: "p-2 ", 
                isMandatory: true,
                // Err: commonState?.app_data?.validated && !authState?.learnersregisterdata?.firstName ? "firstName required" : null,
              },
              {
                name: "Staff Name",
                category: "select",
                type: "react_dropdown_select",
                options: Array.isArray(teachersState?.teacher_GetClassroomTeachers?.data)
                  ? teachersState.teacher_GetClassroomTeachers.data.map(teacher => ({
                      label: teacher.teacher_name,
                      value: teacher.user_id,
                    }))
                  : [],
                multi: false,
                placeholder: "Select Teachers",
                isMandatory: true,
                divClassName: "col-12 mb-4",
                className: "p-3",
                value: teachersState?.teacher_PostSubjects?.data?.teachers
                  ? [
                      {
                        label:
                          teachersState.teacher_GetClassroomTeachers.data.find(
                            t => t.user_id === teachersState.teacher_PostSubjects.data.teachers
                          )?.teacher_name || "",
                        value: teachersState.teacher_PostSubjects.data.teachers
                      }
                    ]
                  : [],
                change: (selected) => {
                  const selectedValue = Array.isArray(selected)
                    ? selected[0]?.value
                    : selected?.value;
                  dispatch(updatePostSubjectsData({ teachers: selectedValue }));
                }
              }
              
              
        ],    
 
        editStudent:[
            {
                name: "Enter Student Name",
                type: "text",
                category: "input",
                placeholder: "Student name",
                value: teachersState?.teacher_PostStudents?.data?.contact_no || "",
                change: (e) => dispatch(updatePostStudentData({ contact_no: e.target.value })),
                divClassName: "col-12 mb-4",
                 className: "p-2 ", 
                isMandatory: true,
                // Err: commonState?.app_data?.validated && !authState?.learnersregisterdata?.firstName ? "firstName required" : null,
              },
              {
                name: "Enter a Contact Number",
                type: "text",
                category: "input",
                placeholder: "Contact Number",
                value: teachersState?.teacher_PostStudents?.data?.contact_no || "",
                change: (e) => dispatch(updatePostStudentData({ contact_no: e.target.value })),
                divClassName: "col-12 mb-4",
                 className: "p-2 ", 
                isMandatory: true,
                // Err: commonState?.app_data?.validated && !authState?.learnersregisterdata?.firstName ? "firstName required" : null,
              },
              {
                name: "Enter a Email id",
                type: "text",
                category: "input",
                placeholder: "Email id",
                value: teachersState?.teacher_PostStudents?.data?.email_id || "",
                change: (e) => dispatch(updatePostStudentData({ email_id: e.target.value })),
                divClassName: "col-12 mb-4",
                 className: "p-2 ", 
                isMandatory: true,
                // Err: commonState?.app_data?.validated && !authState?.learnersregisterdata?.firstName ? "firstName required" : null,
              },
              {
                name: "Enter a Register Number",
                type: "text",
                category: "input",
                placeholder: "Enter Your Register Number",
                value: teachersState?.teacher_PostStudents?.data?.register_no || "",
                change: (e) => dispatch(updatePostStudentData({ register_no: e.target.value })),
                divClassName: "col-12 mb-4",
                 className: "p-2 ", 
                isMandatory: true,
                // Err: commonState?.app_data?.validated && !authState?.learnersregisterdata?.firstName ? "firstName required" : null,
              },
        ]


    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }   
}

export default JsonData