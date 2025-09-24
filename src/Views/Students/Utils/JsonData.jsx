import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";
import Icons from "Utils/Icons"
import Image from "Utils/Image"
import { clear_learnerboook_upload_fields, clear_test_upload_fields, clearFieldError, editProfileInputs, setClassroomCode, setUploadLearnerBook, setUploadTestPaper, update_settings_eye, updateSettingsInputs } from "../Slices/StudentSlice";
import { handlePostNote, update_note_data } from "Views/Common/Slices/Common_slice";

const JsonData = (params) => {
    //main selectors
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();
    const { commonState, studentState } = useCommonState();

    const offlineTestData = studentState?.offline_tests?.map(test => ({
        name: test?.test_name,
        id: test?.test_id
    }))


        
    

    const jsonOnly = {
        sidebar_data: [
            {
                name: "Dashboard",
                icon: Icons.sidebar_dashboard_icon,
                active_icon: Icons.sidebar_dashboard_active_icon,
                route: '/student_dashboard/home'
            },
            {
                name: "Subjects",
                icon: Icons.sidebar_classroom_icon,
                active_icon: Icons.sidebar_classroom_active_icon,
                route: '/student_dashboard/subjects'
            },
            // {
            //     name: "Calendar",
            //     icon: Icons.sidebar_calender_icon,
            //     active_icon: Icons.sidebar_calender_active_icon,
            //     route: '/student_dashboard/calendar'
            // },
            {
                name: "Notes",
                icon: Icons.sidebar_notes_icon,
                active_icon: Icons.sidebar_notes_active_icon,
                route: '/student_dashboard/notes'
            }
        ],
        book_attachment_navlink: [
            {
                name: "Books",
                route: `/student_dashboard/subjects/${params?.subject_id}`
            },
            {
                name: "Attachments",
                route: `/student_dashboard/subjects/${params?.subject_id}/attachments`
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
            '25-Mar-2025': [
                { image: Image.book_image },
                { image: Image.book_image },
                { image: Image.book_image },
                { image: Image.book_image },
            ],
        },
        questions: [
            {
                id: 1,
                question: "What is the capital of France?",
                options: [
                    { id: "opt1", option: "Paris" },
                    { id: "opt2", option: "London" },
                    { id: "opt3", option: "Berlin" },
                    { id: "opt4", option: "Madrid" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            },
            {
                id: 2,
                question: "Which planet is known as the Red Planet?",
                options: [
                    { id: "opt1", option: "Mars" },
                    { id: "opt2", option: "Venus" },
                    { id: "opt3", option: "Jupiter" },
                    { id: "opt4", option: "Saturn" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            },
            {
                id: 3,
                question: "Who wrote 'Romeo and Juliet'?",
                options: [
                    { id: "opt1", option: "William Shakespeare" },
                    { id: "opt2", option: "Charles Dickens" },
                    { id: "opt3", option: "Jane Austen" },
                    { id: "opt4", option: "Mark Twain" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            },
            {
                id: 4,
                question: "What is the largest mammal in the world?",
                options: [
                    { id: "opt1", option: "Blue Whale" },
                    { id: "opt2", option: "Elephant" },
                    { id: "opt3", option: "Giraffe" },
                    { id: "opt4", option: "Hippopotamus" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            },
            {
                id: 5,
                question: "Which gas do plants use for photosynthesis?",
                options: [
                    { id: "opt1", option: "Carbon Dioxide" },
                    { id: "opt2", option: "Oxygen" },
                    { id: "opt3", option: "Nitrogen" },
                    { id: "opt4", option: "Hydrogen" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            },
            {
                id: 6,
                question: "What is the fastest land animal?",
                options: [
                    { id: "opt1", option: "Cheetah" },
                    { id: "opt2", option: "Lion" },
                    { id: "opt3", option: "Horse" },
                    { id: "opt4", option: "Leopard" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            },
            {
                id: 7,
                question: "Which element has the chemical symbol 'O'?",
                options: [
                    { id: "opt1", option: "Oxygen" },
                    { id: "opt2", option: "Gold" },
                    { id: "opt3", option: "Osmium" },
                    { id: "opt4", option: "Oganesson" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            },
            {
                id: 8,
                question: "How many continents are there on Earth?",
                options: [
                    { id: "opt1", option: "7" },
                    { id: "opt2", option: "5" },
                    { id: "opt3", option: "6" },
                    { id: "opt4", option: "8" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            },
            {
                id: 9,
                question: "Who painted the Mona Lisa?",
                options: [
                    { id: "opt1", option: "Leonardo da Vinci" },
                    { id: "opt2", option: "Pablo Picasso" },
                    { id: "opt3", option: "Vincent van Gogh" },
                    { id: "opt4", option: "Claude Monet" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            },
            {
                id: 10,
                question: "Which ocean is the largest?",
                options: [
                    { id: "opt1", option: "Pacific Ocean" },
                    { id: "opt2", option: "Atlantic Ocean" },
                    { id: "opt3", option: "Indian Ocean" },
                    { id: "opt4", option: "Arctic Ocean" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            }
        ],
        longQuestions: [
            {
                id: 1,
                question: "Explain the protective structures of the spinal cord in detail.",
                explanation: "The spinal cord is protected by the vertebral column, meninges, and cerebrospinal fluid. The vertebrae form a bony encasement, the meninges are three protective membranes (dura mater, arachnoid mater, pia mater), and cerebrospinal fluid cushions the spinal cord."
            },
            {
                id: 2,
                question: "Describe the process of photosynthesis and its importance to life on Earth.",
                explanation: "Photosynthesis is the process in which plants convert light energy, carbon dioxide, and water into glucose and oxygen. It is essential for producing oxygen and as the basis of the food chain."
            },
            {
                id: 3,
                question: "Discuss the role of the human kidney in maintaining homeostasis.",
                explanation: "The kidneys regulate fluid balance, filter waste, maintain electrolyte levels, and control blood pressure. They also produce hormones like erythropoietin."
            },
            {
                id: 4,
                question: "Explain the greenhouse effect and its impact on global warming.",
                explanation: "The greenhouse effect is the trapping of heat in the Earth's atmosphere by gases like CO₂, CH₄, and water vapor. This natural process keeps Earth warm, but excess greenhouse gases cause global warming."
            },
            {
                id: 5,
                question: "Describe the different types of blood cells and their functions.",
                explanation: "Red blood cells carry oxygen, white blood cells fight infections, and platelets help with blood clotting."
            },
            {
                id: 6,
                question: "Explain how earthquakes occur and how they are measured.",
                explanation: "Earthquakes occur when tectonic plates shift, releasing stored energy. They are measured using the Richter scale and seismographs."
            },
            {
                id: 7,
                question: "Discuss the importance of the circulatory system in the human body.",
                explanation: "The circulatory system transports oxygen, nutrients, and hormones while removing waste products. It plays a vital role in maintaining homeostasis."
            },
            {
                id: 8,
                question: "Describe the structure and function of the human brain.",
                explanation: "The brain consists of the cerebrum, cerebellum, and brainstem, controlling thoughts, emotions, movement, coordination, and vital functions."
            },
            {
                id: 9,
                question: "Explain the process of digestion in humans.",
                explanation: "Digestion breaks down food into nutrients using mechanical and chemical processes. It occurs in the mouth, stomach, and intestines with help from enzymes and bile."
            },
            {
                id: 10,
                question: "Discuss the importance of renewable energy sources.",
                explanation: "Renewable energy sources like solar, wind, and hydropower are sustainable and help reduce greenhouse gas emissions, combating climate change."
            }
        ], questions: [
            {
                id: 1,
                question: "What is the capital of France?",
                options: [
                    { id: "opt1", option: "Paris" },
                    { id: "opt2", option: "London" },
                    { id: "opt3", option: "Berlin" },
                    { id: "opt4", option: "Madrid" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            },
            {
                id: 2,
                question: "Which planet is known as the Red Planet?",
                options: [
                    { id: "opt1", option: "Mars" },
                    { id: "opt2", option: "Venus" },
                    { id: "opt3", option: "Jupiter" },
                    { id: "opt4", option: "Saturn" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            },
            {
                id: 3,
                question: "Who wrote 'Romeo and Juliet'?",
                options: [
                    { id: "opt1", option: "William Shakespeare" },
                    { id: "opt2", option: "Charles Dickens" },
                    { id: "opt3", option: "Jane Austen" },
                    { id: "opt4", option: "Mark Twain" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            },
            {
                id: 4,
                question: "What is the largest mammal in the world?",
                options: [
                    { id: "opt1", option: "Blue Whale" },
                    { id: "opt2", option: "Elephant" },
                    { id: "opt3", option: "Giraffe" },
                    { id: "opt4", option: "Hippopotamus" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            },
            {
                id: 5,
                question: "Which gas do plants use for photosynthesis?",
                options: [
                    { id: "opt1", option: "Carbon Dioxide" },
                    { id: "opt2", option: "Oxygen" },
                    { id: "opt3", option: "Nitrogen" },
                    { id: "opt4", option: "Hydrogen" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            },
            {
                id: 6,
                question: "What is the fastest land animal?",
                options: [
                    { id: "opt1", option: "Cheetah" },
                    { id: "opt2", option: "Lion" },
                    { id: "opt3", option: "Horse" },
                    { id: "opt4", option: "Leopard" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            },
            {
                id: 7,
                question: "Which element has the chemical symbol 'O'?",
                options: [
                    { id: "opt1", option: "Oxygen" },
                    { id: "opt2", option: "Gold" },
                    { id: "opt3", option: "Osmium" },
                    { id: "opt4", option: "Oganesson" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            },
            {
                id: 8,
                question: "How many continents are there on Earth?",
                options: [
                    { id: "opt1", option: "7" },
                    { id: "opt2", option: "5" },
                    { id: "opt3", option: "6" },
                    { id: "opt4", option: "8" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            },
            {
                id: 9,
                question: "Who painted the Mona Lisa?",
                options: [
                    { id: "opt1", option: "Leonardo da Vinci" },
                    { id: "opt2", option: "Pablo Picasso" },
                    { id: "opt3", option: "Vincent van Gogh" },
                    { id: "opt4", option: "Claude Monet" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            },
            {
                id: 10,
                question: "Which ocean is the largest?",
                options: [
                    { id: "opt1", option: "Pacific Ocean" },
                    { id: "opt2", option: "Atlantic Ocean" },
                    { id: "opt3", option: "Indian Ocean" },
                    { id: "opt4", option: "Arctic Ocean" }
                ],
                candidate_answer: "",
                explanation: "The spinal cord is protected by the vertebral column."
            }
        ],
        longQuestions: [
            {
                id: 1,
                question: "Explain the protective structures of the spinal cord in detail.",
                explanation: "The spinal cord is protected by the vertebral column, meninges, and cerebrospinal fluid. The vertebrae form a bony encasement, the meninges are three protective membranes (dura mater, arachnoid mater, pia mater), and cerebrospinal fluid cushions the spinal cord."
            },
            {
                id: 2,
                question: "Describe the process of photosynthesis and its importance to life on Earth.",
                explanation: "Photosynthesis is the process in which plants convert light energy, carbon dioxide, and water into glucose and oxygen. It is essential for producing oxygen and as the basis of the food chain."
            },
            {
                id: 3,
                question: "Discuss the role of the human kidney in maintaining homeostasis.",
                explanation: "The kidneys regulate fluid balance, filter waste, maintain electrolyte levels, and control blood pressure. They also produce hormones like erythropoietin."
            },
            {
                id: 4,
                question: "Explain the greenhouse effect and its impact on global warming.",
                explanation: "The greenhouse effect is the trapping of heat in the Earth's atmosphere by gases like CO₂, CH₄, and water vapor. This natural process keeps Earth warm, but excess greenhouse gases cause global warming."
            },
            {
                id: 5,
                question: "Describe the different types of blood cells and their functions.",
                explanation: "Red blood cells carry oxygen, white blood cells fight infections, and platelets help with blood clotting."
            },
            {
                id: 6,
                question: "Explain how earthquakes occur and how they are measured.",
                explanation: "Earthquakes occur when tectonic plates shift, releasing stored energy. They are measured using the Richter scale and seismographs."
            },
            {
                id: 7,
                question: "Discuss the importance of the circulatory system in the human body.",
                explanation: "The circulatory system transports oxygen, nutrients, and hormones while removing waste products. It plays a vital role in maintaining homeostasis."
            },
            {
                id: 8,
                question: "Describe the structure and function of the human brain.",
                explanation: "The brain consists of the cerebrum, cerebellum, and brainstem, controlling thoughts, emotions, movement, coordination, and vital functions."
            },
            {
                id: 9,
                question: "Explain the process of digestion in humans.",
                explanation: "Digestion breaks down food into nutrients using mechanical and chemical processes. It occurs in the mouth, stomach, and intestines with help from enzymes and bile."
            },
            {
                id: 10,
                question: "Discuss the importance of renewable energy sources.",
                explanation: "Renewable energy sources like solar, wind, and hydropower are sustainable and help reduce greenhouse gas emissions, combating climate change."
            }
        ],

        bookData: [
            {
                BookName: "The Psychology of Money",
                Chapter: "Chapter 1",
                QuestionSets: "Set A",
                Perfomance: "Good",
                cardfor: "student"
            },
            {
                BookName: "Atomic Habits",
                Chapter: "Chapter 2",
                QuestionSets: "Set B",
                Perfomance: "Average",
                cardfor: "student"
            },
            {
                BookName: "Atomic Habits",
                Chapter: "Chapter 2",
                QuestionSets: "Set B",
                Perfomance: "Average",
                cardfor: "student"
            },
            {
                BookName: "Atomic Habits",
                Chapter: "Chapter 2",
                QuestionSets: "Set B",
                Perfomance: "Average",
                cardfor: "student"
            },
            {
                BookName: "Atomic Habits",
                Chapter: "Chapter 2",
                QuestionSets: "Set B",
                Perfomance: "Average",
                cardfor: "student"
            },
            {
                BookName: "Atomic Habits",
                Chapter: "Chapter 2",
                QuestionSets: "Set B",
                Perfomance: "Average",
                cardfor: "student"
            },
            {
                BookName: "Atomic Habits",
                Chapter: "Chapter 2",
                QuestionSets: "Set B",
                Perfomance: "Average",
                cardfor: "student"
            }, {
                BookName: "Atomic Habits",
                Chapter: "Chapter 2",
                QuestionSets: "Set B",
                Perfomance: "Average",
                cardfor: "student"
            }
            ,
            {
                BookName: "Atomic Habits",
                Chapter: "Chapter 2",
                QuestionSets: "Set B",
                Perfomance: "Average",
                cardfor: "student"
            },
            {
                BookName: "Atomic Habits",
                Chapter: "Chapter 2",
                QuestionSets: "Set B",
                Perfomance: "Average",
                cardfor: "student"
            }
        ],
        data: [
            { name: 'Exemplar', value: 0, fill: '#EC008C' },
            { name: 'Developing', value: 0, fill: '#08D110' },
            { name: 'Emergent', value: 0, fill: '#3E00C2' }
        ],

        historyData2: [
            { name: 'Algebra Set 1', chapter: ' 2', date: '24 Jul', time: '09:30 AM', status: 'Done' },
            { name: 'Geometry Set 2', chapter: ' 5', date: '23 Jul', time: '05:20 PM', status: 'Pending' },
            { name: 'Geometry Set 2', chapter: ' 5', date: '23 Jul', time: '05:20 PM', status: 'Pending' },
            { name: 'Geometry Set 2', chapter: ' 5', date: '23 Jul', time: '05:20 PM', status: 'Pending' },
            { name: 'Geometry Set 2', chapter: ' 5', date: '23 Jul', time: '05:20 PM', status: 'Pending' },
            { name: 'Geometry Set 2', chapter: ' 5', date: '23 Jul', time: '05:20 PM', status: 'Pending' },
            { name: 'Geometry Set 2', chapter: ' 5', date: '23 Jul', time: '05:20 PM', status: 'Pending' },
            { name: 'Geometry Set 2', chapter: ' 5', date: '23 Jul', time: '05:20 PM', status: 'Pending' },
            { name: 'Geometry Set 2', chapter: ' 5', date: '23 Jul', time: '05:20 PM', status: 'Pending' },
            { name: 'Geometry Set 2', chapter: ' 5', date: '23 Jul', time: '05:20 PM', status: 'Pending' },
            { name: 'Geometry Set 2', chapter: ' 5', date: '23 Jul', time: '05:20 PM', status: 'Pending' },
        ],
        classCards: [
            { id: 1, name: 'Math - Algebra', teacher: 'Mr. John', description: 'Grade 8 Algebra' },
            { id: 2, name: 'Science - Biology', teacher: 'Ms. Mary', description: 'Cell structure' },
            { id: 3, name: 'History - WW2', teacher: 'Mr. Smith', description: 'World War II events' },
            { id: 4, name: 'English - Grammar', teacher: 'Mrs. Jane', description: 'Tenses & Verbs' },
            { id: 5, name: 'English - Grammar', teacher: 'Mrs. Jane', description: 'Tenses & Verbs' },
            { id: 6, name: 'English - Grammar', teacher: 'Mrs. Jane', description: 'Tenses & Verbs' },
            { id: 7, name: 'English - Grammar', teacher: 'Mrs. Jane', description: 'Tenses & Verbs' },
            { id: 8, name: 'English - Grammar', teacher: 'Mrs. Jane', description: 'Tenses & Verbs' },
            { id: 9, name: 'English - Grammar', teacher: 'Mrs. Jane', description: 'Tenses & Verbs' },
            { id: 10, name: 'English - Grammar', teacher: 'Mrs. Jane', description: 'Tenses & Verbs' },
            { id: 10, name: 'English - Grammar', teacher: 'Mrs. Jane', description: 'Tenses & Verbs' },
            { id: 10, name: 'English - Grammar', teacher: 'Mrs. Jane', description: 'Tenses & Verbs' },
            { id: 10, name: 'English - Grammar', teacher: 'Mrs. Jane', description: 'Tenses & Verbs' },
        ],

        ClasscardItems: [
            { content: 'Chapters', count: 12 },
        ],

        //    bookdetails
        Performancedata: [
            { name: 'Emergent', value: 70, fill: '#4B00D1' },
            { name: 'Developing', value: 20, fill: '#00D100' },
            { name: 'Exemplar', value: 10, fill: '#FF2E91' },
        ],

        bookTest: [
            { name: 'Emergent', value: 10, fill: '#4B00D1' },
        ],
        cardDetails: [{
            cardTitle: "Evidence_based",
            titleValue: "Emergent",
            explanation: "The Industrial Revolution was a time when new machines were invented, and factories started making goods in large quantities."
        }, {
            cardTitle: "Explanation",
            titleValue: "Emergent",
            explanation: "The Industrial Revolution was a time when new machines were invented, and factories started making goods in large quantities."
        },
        {
            cardTitle: "Opinion",
            titleValue: "Emergent",
            explanation: "The Industrial Revolution was a time when new machines were invented, and factories started making goods in large quantities."
        }
        ],

        //Profile
        profileNavItems: [
            {
                name: "Personal Information",
                icon: (isActive) => Icons.profile_icon(isActive),
                to: "/student_dashboard/profile"
            },
            {
                name: "Settings",
                icon: (isActive) => Icons.settings_icon(isActive),
                to: "/student_dashboard/profile/settings"
            },
            // {
            //   name: "Time Table",
            //   icon: <CiSettings />,
            //   to: "/profile/timetable"
            // }
        ],

        personalInfoInputs: [
            {
                type: "text",
                label: "Name",
                id: "name",
            },
            {
                type: "text",
                label: "Last Name",
                id: "lastName",
            },
            {
                type: "number",
                label: "Mobile Number",
                id: "mobileNumber",
            },
            {
                type: "email",
                label: "Email Address",
                id: "email",
            }]

    }

    const jsxJson = {

        classroom: [
            {
                name: "Classroom Code",
                type: "text",
                category: "input",
                placeholder: "",
                value: studentState?.classroom_data?.classroom_code || '',
                change: (e) => dispatch(setClassroomCode({ type: 'set', classroom_code: e.target.value })),
                divClassName: "mb-3",
                isMandatory: true,
                Err: studentState?.classroom_data?.validated && !studentState?.classroom_data?.classroom_code ? "class code required" : null
            },
        ],

        uploadBook: [
            {
                name: "Book Name",
                type: "text",
                category: "input",
                placeholder: "",
                value: studentState?.upload_learner_book?.book_name || '',
                change: (e) => dispatch(setUploadLearnerBook({ type: 'set', book_name: e.target.value })),
                divClassName: "mb-3",
                isMandatory: true,
                Err: commonState?.app_data?.validated && !studentState?.upload_learner_book?.book_name ? "Book name is required": null,
            },
            {
                name: "Upload File",
                category: "input",
                type: "file",
                placeholder: "Choose a file",
                divClassName: "col-12 mb-3",
                accept: ".pdf",
                fileLength: 1,
                className: "file-inputs mt-2",
                deleteImg: () => dispatch(clear_learnerboook_upload_fields()),
                value: Array.isArray(
                    studentState?.upload_learner_book.book_file
                )
                    ? studentState?.upload_learner_book.book_file?.map(
                        (val) => val
                    )
                    : [],
                change: (e) => {
                    const files = Array.from(e.target.files);
                    dispatch(setUploadLearnerBook({ type: 'set', book_file: files }));
                    e.target.value = "";
                },
                isMandatory: true,
                Err: commonState?.app_data?.validated && !studentState?.upload_learner_book?.book_file ? "Book file is required" : null,
            },
        ],
        uploadTest: [
            {
                name: "Test Name",
                category: "select",
                type: "react_dropdown_select",
                options: offlineTestData,
                value: studentState?.upload_test_paper?.test_id
                    ? [{
                        id: studentState?.upload_test_paper?.test_id,
                        name: studentState?.upload_test_paper?.test_name
                    }]
                    : [],
                labelField: "name",
                valueField: "id",
                multi: false,
                divClassName: "mt-3 p-2",
                change: (values) => {
                    const selected = values[0] || null
                    dispatch(setUploadTestPaper({
                        type: "set",
                        test_id: selected?.id ?? "",
                        test_name: selected?.name ?? ""
                    }))
                },
                Err: commonState?.app_data?.validated &&
                    !studentState?.upload_test_paper?.test_name
                    ? "Test Name is required"
                    : null,
            },
            {
                name: "Register Number",
                type: "text",
                category: "input",
                placeholder: "",
                value: studentState?.upload_test_paper?.register_number || "",
                change: (e) => dispatch(setUploadTestPaper({ type: 'set', register_number: e.target.value })),
                divClassName: "m-2",
                isMandatory: true,
                Err: commonState?.app_data?.validated &&  !studentState?.upload_test_paper?.register_number ? "Register number is required" : null,

            },
            {
                name: "Upload File",
                category: "input",
                type: "file",
                placeholder: "Choose a file",
                divClassName: "col-12 mb-3",
                accept: ".pdf",
                fileLength: 1,
                className: "file-inputs mt-2",
                deleteImg: () => dispatch(clear_test_upload_fields()),
                value: Array.isArray(
                    studentState?.upload_test_paper.test_file
                )
                    ? studentState?.upload_test_paper.test_file?.map(
                        (val) => val
                    )
                    : [],
                change: (e) => {
                    const files = Array.from(e.target.files);
                    dispatch(setUploadTestPaper({ type: 'set', test_file: files }));
                    e.target.value = "";
                },
                isMandatory: true,
                Err:commonState?.app_data?.validated && !studentState?.upload_test_paper.test_file ? "File is required": null,
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
                change: (e) => {
                    dispatch(update_note_data({ type: "title", data: e.target.value }));
                },
                keyDown: (e) => {
                    if (e.key === "Enter") dispatch(handlePostNote(commonState?.notesdata));
                },
                Err:commonState?.app_data?.validated && !commonState?.notesdata?.title ? "Title is required": null,
            },
            {
                name: "ADD CONTENT HERE",
                category: "textbox",
                className: "",
                isMandatory: true,
                value: commonState?.notesdata?.content || "",
                change: (e) => {
                    dispatch(update_note_data({ type: "content", data: e.target.value }));
                },
                keyDown: (e) => {
                    if (e.key === "Enter") dispatch(handlePostNote(commonState?.notesdata));
                },
                Err:commonState?.app_data?.validated && !commonState?.notesdata?.content ? "Content is required": null,
            }
        ],
        profile_details: [
            {
                name: "First Name",
                value: studentState?.profileInputs?.first_name || '',
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                divClassName: "mb-3 col-12 col-lg-6 p-2",
                readOnly: true
            },
            {
                name: "Last Name",
                value: studentState?.profileInputs?.last_name || '',
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                divClassName: "mb-3 col-12 col-lg-6 p-2",
                readOnly: true
            },
            {
                name: "Email",
                value: studentState?.profileInputs?.email_id || '',
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                divClassName: "mb-3 col-12 col-lg-6 p-2",
                readOnly: true
            },
            {
                name: "Phone Number",
                value: studentState?.profileInputs?.phone_number || '',
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                divClassName: "mb-3 col-12 col-lg-6 p-2",
                readOnly: true
            },
            {
                name: "Register Number",
                value: studentState?.profileInputs?.reg_no || '',
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                divClassName: "mb-3 col-12 col-lg-6 p-2",
                readOnly: true
            },
            {
                name: "Class",
                value: studentState?.profileInputs?.class_name || '',
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                divClassName: "mb-3 col-12 col-lg-6 p-2",
                readOnly: true
            },
            {
                name: "Address",
                value: studentState?.profileInputs?.address || '',
                title: " ",
                category: "textbox",
                placeholder: "",
                divClassName: "mb-3  col-12 p-2",
                readOnly: true
            }

        ],

        student_profile: [
            {
                name: "First Name",
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                value: studentState?.editProfileInputs?.first_name || '',
                change: (e) => {
                    if (/^[A-Za-z0-9@._\- ]*$/.test(e.target.value)) {
                        dispatch(clearFieldError("first_name"))
                        dispatch(editProfileInputs({ field: 'first_name', value: e.target.value }))
                    }
                },
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                Err: studentState?.errors?.first_name || null
            },
            {
                name: "Last Name",
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                value: studentState?.editProfileInputs?.last_name || '',
                change: (e) => {
                    if (/^[A-Za-z0-9@._\- ]*$/.test(e.target.value)) {
                        dispatch(clearFieldError("last_name"))
                        dispatch(editProfileInputs({ field: 'last_name', value: e.target.value }))
                    }
                },
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                Err: studentState?.errors?.last_name || null
            },
            {
                name: "Email",
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                value: studentState?.editProfileInputs?.email_id || '',
                change: (e) => {
                    if (/^[A-Za-z0-9@._-]*$/.test(e.target.value)) {
                        dispatch(editProfileInputs({ field: 'email_id', value: e.target.value }))
                    }
                },
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                // Err: commonState?.app_data?.validated && !studentState?.editProfileInputs?.email_id ? "Email required" : null,
                disabled: true
            },
            {
                name: "Phone Number",
                type: "number",
                title: " ",
                category: "input",
                placeholder: "",
                value: studentState?.editProfileInputs?.phone_number || '',
                change: (e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if(value.length <= 10){
                        dispatch(clearFieldError("phone_number"))
                        dispatch(editProfileInputs({ field: 'phone_number', value: e.target.value }))
                    }
                },
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                Err: studentState?.errors?.phone_number || null

            },
            {
                name: "Register Number",
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                value: studentState?.editProfileInputs?.reg_no || '',
                change: (e) => dispatch(editProfileInputs({ field: 'reg_no', value: e.target.value })),
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                // Err: commonState?.app_data?.validated && !studentState?.editProfileInputs?.reg_no ? "Register Number required" : null,
                disabled: true
            },
            {
                name: "Class",
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                value: studentState?.editProfileInputs?.class_name || '',
                change: (e) => {
                    if (/^[A-Za-z0-9@._\- ]*$/.test(e.target.value)) {
                        dispatch(editProfileInputs({ field: 'class_name', value: e.target.value }))
                    }
                },
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                // Err: commonState?.app_data?.validated && !studentState?.editProfileInputs?.class_name ? "Class required" : null
            },
            {
                name: "Address",
                title: " ",
                category: "textbox",
                placeholder: "",
                value: studentState?.editProfileInputs?.address || '',
                change: (e) => {
                    // if (/^[A-Za-z0-9@._\- ]*$/.test(e.target.value)) {
                        dispatch(editProfileInputs({ field: 'address', value: e.target.value }))
                    // }
                },
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                // Err: commonState?.app_data?.validated && !studentState?.editProfileInputs?.address ? "Address required" : null
            },
        ],

        settings_details:
        [
            {
                name: "Current Password",
                type: studentState?.settings_password?.show_old_password ? "text" : "password" ,
                title: " ",
                category: "input",
                placeholder: "Current Password",
                value: studentState?.settingsInputs?.old_password || '',
                change: (e) => {
                    dispatch(updateSettingsInputs({ field: 'old_password', value: e.target.value }))
                    dispatch(clearFieldError("old_password"))
                },
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                eyeFunction: () =>
                    dispatch(
                        update_settings_eye({
                        show_old_password: !studentState?.settings_password?.show_old_password,
                    })),
                eyeIcon: studentState?.settings_password?.show_old_password
                    ? Icons?.EyeOpen
                    : Icons?.EyeClose,
                divClassName: "mb-3",
                isMandatory: true,
                Err: studentState?.errors?.old_password || null
            },
            {
                name: "New Password",
                type: studentState?.settings_password?.show_new_password ? "text" : "password" ,
                title: " ",
                category: "input",
                placeholder: "New Password",
                value: studentState?.settingsInputs?.new_password || '',
                change: (e) => {
                    dispatch(updateSettingsInputs({ field: 'new_password', value: e.target.value }))
                    dispatch(clearFieldError("new_password"))
                },
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                 eyeFunction: () =>
                    dispatch(
                        update_settings_eye({
                        show_new_password: !studentState?.settings_password?.show_new_password,
                    })),
                eyeIcon: studentState?.settings_password?.show_new_password
                    ? Icons?.EyeOpen
                    : Icons?.EyeClose,
                divClassName: "mb-3",
                isMandatory: true,
                Err: studentState?.errors?.new_password || null
            },
            {
                name: "Confirm Password",
                type: studentState?.settings_password?.show_confirm_password ? "text" : "password" ,
                title: " ",
                category: "input",
                placeholder: "Confirm Password",
                value: studentState?.settingsInputs?.confirm_password || '',
                change: (e) => {
                    dispatch(updateSettingsInputs({ field: 'confirm_password', value: e.target.value }))
                    dispatch(clearFieldError("confirm_password"))
                },
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                 eyeFunction: () =>
                    dispatch(
                        update_settings_eye({
                        show_confirm_password: !studentState?.settings_password?.show_confirm_password,
                    })),
                eyeIcon: studentState?.settings_password?.show_confirm_password
                    ? Icons?.EyeOpen
                    : Icons?.EyeClose,
                divClassName: "mb-3",
                isMandatory: true,
                Err: studentState?.errors?.confirm_password || null
            },

        ],

    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData