// import { useCommonState } from 'Components/CustomHooks';
import Icons from "Utils/Icons"
import Image from "Utils/Image"

const JsonData = (params) => {
    //main selectors
    // const dispatch = useDispatch();
    // const navigate = useCustomNavigate();
    // const { commonState } = useCommonState();

    const jsonOnly = {
        sidebar_data: [
            {
                name: "Dashboard",
                icon: Icons.sidebar_dashboard_icon,
                active_icon: Icons.sidebar_dashboard_active_icon,
                show_active_icon: window.location.pathname.includes('/student_dashboard/home'),
                route: '/student_dashboard/home'
            },
            {
                name: "Subjects",
                icon: Icons.sidebar_classroom_icon,
                active_icon: Icons.sidebar_classroom_active_icon,
                show_active_icon: window.location.pathname.includes('/student_dashboard/subjects'),
                route: '/student_dashboard/subjects'
            },
            // {
            //     name: "Calendar",
            //     icon: Icons.sidebar_calender_icon,
            //     active_icon: Icons.sidebar_calender_active_icon,
            //     show_active_icon: window.location.pathname.includes('/student_dashboard/calendar'),
            //     route: '/student_dashboard/calendar'
            // },
            {
                name: "Notes",
                icon: Icons.sidebar_notes_icon,
                active_icon: Icons.sidebar_notes_active_icon,
                show_active_icon: window.location.pathname.includes('/student_dashboard/notes'),
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
            { name: 'Exemplar', value: 65, fill: '#EC008C' },
            { name: 'Developing', value: 35, fill: '#08D110' },
            { name: 'Emergent', value: 55, fill: '#3E00C2' }
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