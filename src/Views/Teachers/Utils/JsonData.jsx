import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import { handlePostNote, update_app_data, update_note_data } from 'Views/Common/Slices/Common_slice';
import Icons from 'Utils/Icons';
import Image from 'Utils/Image';
import { clear_form_fields, update_perfomance_by_classroom, update_selected_books, update_student_perfomance_dashboard, update_Students_classroom } from '../Slice/teachersSlice';
import { get_bookmarks, handleGetSubjectAttachments } from '../Actions/TeacherActions';
import { update_Create_student, update_Grade_by_classroom, updatePostClassroomsData, updatePostStudentData, updatePostSubjectsData } from '../Slice/teachersSlice';

const JsonData = (params) => {
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const { commonState, teachersState } = useCommonState();
  const jsonOnly = {
    dashboard_count_details: [
      {
        icon: Icons.student_dashboard_to_no_stud_icon,
        count:
          teachersState?.teacher_DashboardData?.data?.total_no_of_students || 0,
        description: "Total number of tests conducted",
      },
      {
        icon: Icons.student_dashboard_to_no_cls_icon,
        count:
          teachersState?.teacher_DashboardData?.data?.total_no_of_classrooms ||
          0,
        description: "Total number of classes",
      },
    ],

    classroom_card_details: [
      {
        icons: Icons?.no_of_students,
        content: "No of Students",
        count:
          teachersState?.teacher_GetClassrooms?.data?.classrooms
            ?.no_of_students || 0,
      },
      {
        icons: Icons?.no_of_subjects,
        content: "No of Subjects",
        count:
          teachersState?.teacher_GetClassrooms?.data?.classrooms
            ?.no_of_subjects || 0,
      },
    ],

    days: ["Friday", "Thursday", "Wednesday", "Tuesday", "Monday"],

    history_table_header: ["Book Name", "Date", "Duration", "Status"],

    student_table_headers: [
      "S.no",
      "Student Name",
      "Contact No",
      "Email",
      "Status",
      "Number of  Attempt",
      "Reg.No",
      "Action",
    ],

    timeSlots: [
      "8.30AM - 9.15AM",
      "9.15AM - 10AM",
      "10.30AM - 11.15AM",
      "11.15AM - 12PM",
      "1PM - 1.45PM",
      "1.45PM - 2.30PM",
      "2.30PM - 3.15PM",
      "3.15PM - 4PM",
    ],

    test_options: [
      {
        name: "Upcoming",
        route: `/teachers_dashboard/classrooms/${params?.class_id}/${params?.subject_id}/test`,
      },
      {
        name: "Ongoing",
        route: `/teachers_dashboard/classrooms/${params?.class_id}/${params?.subject_id}/test/ongoing_test`,
      },
      {
        name: "Completed",
        route: `/teachers_dashboard/classrooms/${params?.class_id}/${params?.subject_id}/test/completed_test`,
      },
    ],

    schedule_test_options: [
      {
        title: "Create",
        description: "Complete the all Fileds",
        route: `/teachers_dashboard/classrooms/${params?.class_id}/${params?.subject_id}/create_test`,
      },
      {
        title: "Preview",
        description: "Complete the all Fileds",
        route: `/teachers_dashboard/classrooms/${params?.class_id}/${params?.subject_id}/preview_test`,
      },
    ],

    students_performance_options: [
      {
        title: "Teachers Assigned",
        route: `/teachers_dashboard/classrooms/${params?.class_id}/${params?.subject_id}/teachers_assigned`,
      },
      {
        title: "Self Taking Test",
        route: `/teachers_dashboard/classrooms/${params?.class_id}/${params?.subject_id}/self_taking_test`,
      },
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
        onClick: () => {
          dispatch(handleGetSubjectAttachments(teachersState?.params_data || {}));

          dispatch(update_app_data({
            type: 'canvas',
            data: {
              show: true,
              type: "attachments",
              from: "teachers",
              close_btn: true,
              extraClass: 'attachment_canvas',
              placement: 'end'
            }
          }));
        },
      }
    ],
    students_details: [
      {
        regNo: "reg8797656768",
        name: "Prakash S",
        contact: "9790413271",
        email: "prakash@gmail.com",
        overall: 50,
        score: 38,
        status: "Developing",
      },
      {
        regNo: "reg8797656769",
        name: "Ravi Kumar",
        contact: "9876543210",
        email: "ravi@example.com",
        overall: 50,
        score: "-",
        status: "-",
      },
      {
        regNo: "reg8797656770",
        name: "Anitha M",
        contact: "9123456780",
        email: "anitha@example.com",
        overall: 50,
        score: "-",
        status: "-",
      }
      // ➝ add more students
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
    },
    student_details: [

      {
        regNo: "reg8797656768",
        name: "Prakash S",
        contact: "9790413271",
        email: "prakash@gmail.com",
        overall: 50,
        score: 38,
        status: "Developing",
      },
    ]
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
        value: teachersState?.create_test?.selected_books?.book_name || "",
        change: (e) => {
          const book = commonState?.books?.data?.find(
            (book) => book.book_name === e.target.value
          );
          dispatch(
            update_selected_books({ key: "selected_books", value: book })
          );
          dispatch(get_bookmarks({ book_id: book?.book_id }));
        },
        divClassName: "col-12 com-sm-6 col-xl-4 p-2",
        Err: commonState?.app_data?.validated ? "Please select a book" : "",
      },
      {
        name: "Chapter",
        category: "select",
        type: "normal_select",
        options: teachersState?.test_records?.data?.map(
          (chapter) => chapter.title
        ),
        placeholder: "Select Chapter",
        isMandatory: true,
        value: teachersState?.create_test?.selected_chapter || "",
        change: (e) =>
          dispatch(
            update_selected_books({
              key: "selected_chapter",
              value: e.target.value,
            })
          ),
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
        value: teachersState?.create_test?.question_type || "",
        change: (e) =>
          dispatch(
            update_selected_books({
              key: "question_type",
              value: e.target.value,
            })
          ),
        divClassName: "col-12 com-sm-6 col-xl-4 p-2",
        Err: commonState?.app_data?.validated
          ? "Please select type of questions"
          : "",
      },
      {
        name: "Number of Questions",
        category: "select",
        type: "normal_select",
        options: [5, 10, 15],
        placeholder: "Select Number of Questions",
        isMandatory: true,
        value: teachersState?.create_test?.question_quantity || "",
        change: (e) =>
          dispatch(
            update_selected_books({
              key: "question_quantity",
              value: e.target.value,
            })
          ),
        divClassName: "col-12 com-sm-6 col-xl-4 p-2",
        Err: commonState?.app_data?.validated
          ? "Please enter number of questions"
          : "",
      },
      {
        name: "Students",
        category: "select",
        type: "normal_select",
        options: ["All"],
        placeholder: "Select Students",
        isMandatory: true,
        value: teachersState?.create_test?.student_all || "",
        change: (e) =>
          dispatch(
            update_selected_books({ key: "student_all", value: e.target.value })
          ),
        divClassName: "col-12 com-sm-6 col-xl-4 p-2",
        Err: commonState?.app_data?.validated
          ? "Please enter number of students"
          : "",
      },
      {
        name: "Date",
        category: "input",
        type: "date",
        options: [],
        placeholder: "Select Date",
        isMandatory: true,
        value: teachersState?.create_test?.selected_date || "",
        change: (e) =>
          dispatch(
            update_selected_books({
              key: "selected_date",
              value: e.target.value,
            })
          ),
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
        value: teachersState?.create_test?.selected_time || "",
        change: (e) =>
          dispatch(
            update_selected_books({
              key: "selected_time",
              value: e.target.value,
            })
          ),
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
        value: teachersState?.create_test?.time_duration || "",
        change: (e) =>
          dispatch(
            update_selected_books({
              key: "time_duration",
              value: e.target.value,
            })
          ),
        divClassName: "col-12 com-sm-6 col-xl-4 p-2",
        Err: commonState?.app_data?.validated
          ? "Please select test duration"
          : "",
      },
      {
        name: "Set Questions",
        category: "select",
        type: "normal_select",
        options: [1, 2, 3, 4],
        placeholder: "Select Set Questions",
        isMandatory: true,
        value: teachersState?.create_test?.question_set || "",
        change: (e) =>
          dispatch(
            update_selected_books({
              key: "question_set",
              value: e.target.value,
            })
          ),
        divClassName: "col-12 com-sm-6 col-xl-4 p-2",
        Err: commonState?.app_data?.validated
          ? "Please select Set Questions"
          : "",
      },
      {
        name: "Mode of Test",
        category: "select",
        type: "normal_select",
        options: ["Online", "Offline"],
        placeholder: "Select Mode of Test",
        isMandatory: true,
        value: teachersState?.create_test?.test_mode || "",
        change: (e) =>
          dispatch(
            update_selected_books({ key: "test_mode", value: e.target.value })
          ),
        divClassName: "col-12 com-sm-6 col-xl-4 p-2",
        Err: commonState?.app_data?.validated
          ? "Please select Mode of Test"
          : "",
      },
    ],
    notes_input: [
      {
        name: "ADD TITLE HERE",
        category: "input",
        type: "text",
        divClassName: "mb-3 fw-bold",
        placeholder: "Enter Title",
        isMandatory: true,
        value: commonState?.notesdata?.title || "",
        change: (e) =>
          dispatch(update_note_data({ type: "title", data: e.target.value })),
        keyDown: (e) => {
          if (e.key === "Enter")
            dispatch(handlePostNote(commonState?.notesdata));
        },
      },
      {
        name: "ADD CONTENT HERE",
        category: "textbox",
        className: "",
        isMandatory: true,
        value: commonState?.notesdata?.content || "",
        change: (e) =>
          dispatch(update_note_data({ type: "content", data: e.target.value })),
        keyDown: (e) => {
          if (e.key === "Enter")
            dispatch(handlePostNote(commonState?.notesdata));
        },
      },
    ],
    classroomModal: [
      {
        name: "Enter a Class Name",
        type: "text",
        category: "input",
        placeholder: "Enter Your Class Name",
        value:
          teachersState?.teacher_PostClassrooms?.data?.classroom_name || "",
        change: (e) =>
          dispatch(
            updatePostClassroomsData({ classroom_name: e.target.value })
          ),
        divClassName: "col-12 mb-4 mt-2",
        isMandatory: true,
        className: "modal-inputs",
        // Err: commonState?.app_data?.validated && !authState?.learnersregisterdata?.firstName ? "firstName required" : null,
      },
      {
        name: "Select Teachers",
        category: "select",
        type: "react_dropdown_select",
        options: Array.isArray(teachersState?.teacher_GetTeachers?.data)
          ? teachersState.teacher_GetTeachers.data.map((teacher) => ({
            label: teacher.teacher_name,
            value: teacher.user_id,
          }))
          : [],
        multi: true,
        placeholder: "Select Teachers",
        isMandatory: true,
        divClassName: "col-12 mb-4",
        className: "modal-inputs",
        value: Array.isArray(
          teachersState?.teacher_PostClassrooms?.data?.teachers
        )
          ? teachersState.teacher_PostClassrooms.data.teachers.map((id) => ({
            label:
              teachersState.teacher_GetTeachers.data.find(
                (t) => t.user_id === id
              )?.teacher_name || "",
            value: id,
          }))
          : [],
        change: (selectedOptions) =>
          dispatch(
            updatePostClassroomsData({
              teachers: selectedOptions.map((opt) => opt.value),
            })
          ),
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
        className: "file-inputs mt-2",
        value: Array.isArray(
          teachersState?.teacher_PostClassrooms?.data?.student_file
        )
          ? teachersState?.teacher_PostClassrooms?.data?.student_file?.map(
            (val) => val
          )
          : [],
        change: (e) => {
          const files = Array.from(e.target.files);
          dispatch(updatePostClassroomsData({ student_file: files }));
        },
        isMandatory: true,
      },
    ],
    addSubjects: [
      {
        name: "Subject Name",
        type: "text",
        category: "input",
        placeholder: "Enter Your Subject Name",
        value: teachersState?.teacher_PostSubjects?.data?.subject_name || "",
        change: (e) =>
          dispatch(updatePostSubjectsData({ subject_name: e.target.value })),
        divClassName: "col-12 mb-4 mt-2",
        className: "modal-inputs",
        isMandatory: true,
        // Err: commonState?.app_data?.validated && !authState?.learnersregisterdata?.firstName ? "firstName required" : null,
      },
      {
        name: "Staff Name",
        category: "select",
        type: "react_dropdown_select",
        options: Array.isArray(
          teachersState?.teacher_GetClassroomTeachers?.data
        )
          ? teachersState.teacher_GetClassroomTeachers.data.map((teacher) => ({
            label: teacher.teacher_name,
            value: teacher.user_id,
          }))
          : [],
        multi: false,
        placeholder: "Select Teachers",
        isMandatory: true,
        divClassName: "col-12 mb-4",
        className: "modal-inputs",
        value: teachersState?.teacher_PostSubjects?.data?.teachers
          ? [
            {
              label:
                teachersState.teacher_GetClassroomTeachers.data.find(
                  (t) =>
                    t.user_id ===
                    teachersState.teacher_PostSubjects.data.teachers
                )?.teacher_name || "",
              value: teachersState.teacher_PostSubjects.data.teachers,
            },
          ]
          : [],
        change: (selected) => {
          const selectedValue = Array.isArray(selected)
            ? selected[0]?.value
            : selected?.value;
          dispatch(updatePostSubjectsData({ teachers: selectedValue }));
        },
      },
    ],
    editStudent: [
      {
        name: "Enter Student Name",
        type: "text",
        category: "input",
        placeholder: "Student name",
        value: teachersState?.teacher_PostStudents?.data?.data?.student_name || "",
        change: (e) =>
          dispatch(updatePostStudentData({ student_name: e.target.value })),
        divClassName: "col-12 mb-4 mt-2",
        className: "modal-inputs",
        isMandatory: true,
        // Err: commonState?.app_data?.validated && !authState?.learnersregisterdata?.firstName ? "firstName required" : null,
      },
      {
        name: "Enter a Contact Number",
        type: "text",
        category: "input",
        placeholder: "Contact Number",
        value: teachersState?.teacher_PostStudents?.data?.data?.contact_no || "",
        change: (e) =>
          dispatch(updatePostStudentData({ contact_no: e.target.value })),
        divClassName: "col-12 mb-4",
        className: "modal-inputs",
        isMandatory: true,
        // Err: commonState?.app_data?.validated && !authState?.learnersregisterdata?.firstName ? "firstName required" : null,
      },
      {
        name: "Enter a Email id",
        type: "text",
        category: "input",
        placeholder: "Email id",
        value: teachersState?.teacher_PostStudents?.data?.data?.student_email || "",
        change: (e) =>
          dispatch(updatePostStudentData({ student_email: e.target.value })),
        divClassName: "col-12 mb-4",
        className: "modal-inputs",
        isMandatory: true,
        disabled: true
        // Err: commonState?.app_data?.validated && !authState?.learnersregisterdata?.firstName ? "firstName required" : null,
      },
      {
        name: "Enter a Register Number",
        type: "text",
        category: "input",
        placeholder: "Enter Your Register Number",
        value: teachersState?.teacher_PostStudents?.data?.data?.student_reg_no || "",
        change: (e) =>
          dispatch(updatePostStudentData({ student_reg_no: e.target.value })),
        divClassName: "col-12 mb-4",
        className: "modal-inputs",
        isMandatory: true,
        // Err: commonState?.app_data?.validated && !authState?.learnersregisterdata?.firstName ? "firstName required" : null,
      },
    ],
    createStudent: [
      {
        name: "Enter Student Name",
        type: "text",
        category: "input",
        placeholder: "Student name",
        value: teachersState?.teacher_CreateStudents?.data?.name || "",
        change: (e) =>
          dispatch(update_Create_student({ name: e.target.value })),
        divClassName: "col-6 mb-3",
        className: "modal-inputs",
        isMandatory: true,
        disabled: teachersState?.teacher_CreateStudents?.data?.student_file && teachersState?.teacher_CreateStudents?.data?.student_file?.length > 0 ? true : false,
        // Err: commonState?.app_data?.validated && !teachersState?.teacher_CreateStudents?.data?.name ? "Student name required" : null,
      },
      {
        name: "Enter a Contact Number",
        type: "text",
        category: "input",
        placeholder: "Contact Number",
        value: teachersState?.teacher_CreateStudents?.data?.contact_no || "",
        change: (e) =>
          dispatch(update_Create_student({ contact_no: e.target.value })),
        divClassName: "col-6 mb-3",
        className: "modal-inputs ms-1",
        isMandatory: true,
        disabled: teachersState?.teacher_CreateStudents?.data?.student_file && teachersState?.teacher_CreateStudents?.data?.student_file?.length > 0 ? true : false,
        // Err: commonState?.app_data?.validated && !teachersState?.teacher_CreateStudents?.data?.contact_no ? "Contact number required" : null,
      },
      {
        name: "Enter a Email id",
        type: "text",
        category: "input",
        placeholder: "Email id",
        value: teachersState?.teacher_CreateStudents?.data?.email_id || "",
        change: (e) =>
          dispatch(update_Create_student({ email_id: e.target.value })),
        divClassName: "col-12 mb-3",
        className: "modal-inputs pe-2",
        isMandatory: true,
        disabled: teachersState?.teacher_CreateStudents?.data?.student_file && teachersState?.teacher_CreateStudents?.data?.student_file?.length > 0 ? true : false,
        // Err: commonState?.app_data?.validated && !teachersState?.teacher_CreateStudents?.data?.email_id ? "Email id required" : null,
      },
      {
        name: "Enter a Register Number",
        type: "text",
        category: "input",
        placeholder: "Enter Your Register Number",
        value:
          teachersState?.teacher_CreateStudents?.data?.register_no || "",
        change: (e) =>
          dispatch(update_Create_student({ register_no: e.target.value })),
        divClassName: "col-6 mb-2",
        className: "modal-inputs",
        isMandatory: true,
        disabled: teachersState?.teacher_CreateStudents?.data?.student_file && teachersState?.teacher_CreateStudents?.data?.student_file?.length > 0 ? true : false,
        // Err: commonState?.app_data?.validated && !teachersState?.teacher_CreateStudents?.data?.register_no ? "Register number required" : null,
      },
      {
        name: "Select Classroom",
        category: "select",
        type: "react_dropdown_select",
        options: Array.isArray(teachersState?.teacher_GetAllClassRooms?.data)
          ? teachersState.teacher_GetAllClassRooms.data.map((classroom) => ({
            label: classroom.classroom_name,
            value: classroom.classroom_name,
          }))
          : [],
        multi: false,
        placeholder: "Select Classroom",
        isMandatory: true,
        divClassName: "col-6 mb-2",
        className: "modal-inputs ms-1",
        value: teachersState?.teacher_CreateStudents?.data?.classroom_name
          ? [
            {
              label: teachersState.teacher_CreateStudents.data.classroom_name,
              value: teachersState.teacher_CreateStudents.data.classroom_name,
            },
          ]
          : [],
        change: (selected) => {
          const selectedValue = Array.isArray(selected)
            ? selected[0]?.value
            : selected?.value;
          dispatch(update_Create_student({ classroom_name: selectedValue }));
        },
        disabled: teachersState?.teacher_CreateStudents?.data?.student_file && teachersState?.teacher_CreateStudents?.data?.student_file?.length > 0 ? true : false,
        Err: commonState?.app_data?.validated && !teachersState?.teacher_CreateStudents?.data?.classroom_name ? "Teacher classroom required" : null,
      }
    ],
    createMultiStudets: [
      {
        name: "Add Multiple Students",
        category: "input",
        type: "file",
        placeholder: "Choose a file",
        divClassName: "col-12 mb-2",
        accept: ".csv",
        className: "file-inputs mt-2",
        fileLength: 1,
        value: Array.isArray(
          teachersState?.teacher_CreateStudents?.data?.student_file
        )
          ? teachersState?.teacher_CreateStudents?.data?.student_file?.map(
            (val) => val
          )
          : [],
        deleteImg: () => dispatch(clear_form_fields()),
        change: (e) => {
          const files = Array.from(e.target.files);
          dispatch(update_Create_student({ student_file: files }));
        },
        fileUploadValue: "Upload Csv,xlxs files",
        disabled: Object.entries(teachersState?.teacher_CreateStudents?.data || {})
          .filter(([key]) => key !== "student_file")
          .every(([, value]) => value == null || value === "")
          ? false
          : true,
        isMandatory: false,
      },
    ],
    selectGradeByClassRoom: [
      {
        category: "select",
        type: "react_dropdown_select",
        options: Array.isArray(teachersState?.teacher_GetAllClassRooms?.data)
          ? teachersState.teacher_GetAllClassRooms.data.map((classroom) => ({
            label: classroom.classroom_name,
            value: classroom.classroom_id,
          }))
          : [],
        multi: false,
        divClassName: "grade-dashboard-teacher-input",
        className: "custom-dropdown",
        value: [],
        change: (selectedOptions) =>
          dispatch(
            update_Grade_by_classroom({
              classroom_id: selectedOptions.map((opt) => opt.value),
            })
          ),
      },
    ],
    selectClassRoomForPerfomance: [
      {
        category: "select",
        type: "react_dropdown_select",
        options: Array.isArray(teachersState?.teacher_GetAllClassRooms?.data)
          ? teachersState.teacher_GetAllClassRooms.data.map((classroom) => ({
            label: classroom.classroom_name,
            value: classroom.classroom_id,
          }))
          : [],
        multi: false,
        divClassName: "grade-dashboard-teacher-input",
        className: "custom-dropdown",
        value: [],
        change: (selectedOptions) =>
          dispatch(
            update_perfomance_by_classroom({
              classroom_id: selectedOptions.map((opt) => opt.value),
            })
          ),
      },
    ],
    selectStudentsByClassRoom: [
      {
        category: "select",
        type: "react_dropdown_select",
        options: Array.isArray(teachersState?.teacher_GetAllClassRooms?.data)
          ? teachersState.teacher_GetAllClassRooms.data.map((classroom) => ({
            label: classroom.classroom_name,
            value: classroom.classroom_id,
          }))
          : [],
        multi: false,
        divClassName: "studentsSelectClasses",
        className: "grade-dashboard-teacher-input",
        value: [],
        change: (selectedOptions) =>
          dispatch(
            update_Students_classroom({
              classroom_id: selectedOptions.map((opt) => opt.value),
            })
          ),
      },
    ],
    selectStudentPerfomance: [
      {
        category: "select",
        type: "react_dropdown_select",
        options: Array.isArray(teachersState?.teacher_GetAllSubjects?.data[teachersState?.teacher_Current_perfomance_Classroom?.data?.classroom_id])
          ? teachersState.teacher_GetAllSubjects.data[teachersState?.teacher_Current_perfomance_Classroom?.data?.classroom_id]?.map((subject) => ({
            label: subject.subject_name,
            value: subject.subject_id,
          }))
          : [],
        multi: false,
        divClassName: "grade-dashboard-teacher-input",
        className: "custom-dropdown",
        value: [],
        change: (selectedOptions) =>
          dispatch(
            update_perfomance_by_classroom({
              subject_id: selectedOptions.map((opt) => opt.value),
            })
          ),
      },
    ],
  };

  return {
    jsonOnly: jsonOnly,
    jsxJson: jsxJson,
  };
};

export default JsonData;
