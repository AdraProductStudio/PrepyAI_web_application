import { useCommonState } from 'Components/CustomHooks';
import { useDispatch } from 'react-redux';
import Icons from 'Utils/Icons';

const JsonDataStudent = () => {
    const dispatch = useDispatch();
    const { } = useCommonState();
    const jsonOnly = {
        sidebar_data: [
            {
                name: 'Dashboard',
                route: 'student_dashboard',
                icon: Icons.Dashboard
            },
            {
                name: 'Class Rooms',
                route: 'classrooms',
                icon: Icons.Classroomicon,
            },
            {
                name: 'Calendar',
                route: 'calendar',
                icon: Icons.Calender,
            },
            {
                name: 'Notes',
                route: 'notes',
                icon: Icons.Notesicon,
            },
        ],
        // barchart
        data: [
            { name: 'Emergent', uv: 30, fill: '#4B00D1' },
            { name: 'Developing', uv: 20, fill: '#00D100' },
            { name: 'Exemplar', uv: 10, fill: '#FF2E91' },
        ],

        historyData2: [
            {
                name: "English Grammar Book term V1",
                chapter: "Chapters: 1",
                date: "16 Sep 2023",
                time: "11:21 AM",
                status: "Developing",
            },
            {
                name: "English Grammar Book term V1",
                chapter: "Chapters: 1",
                date: "16 Sep 2023",
                time: "11:21 AM",
                status: "Developing",
            },
            {
                name: "English Grammar Book term V1",
                chapter: "Chapters: 1",
                date: "16 Sep 2023",
                time: "11:21 AM",
                status: "Developing",
            },
            {
                name: "English Grammar Book term V1",
                chapter: "Chapters: 1",
                date: "16 Sep 2023",
                time: "11:21 AM",
                status: "Developing",
            },
            {
                name: "English Grammar Book term V1",
                chapter: "Chapters: 1",
                date: "16 Sep 2023",
                time: "11:21 AM",
                status: "Developing",
            },
            {
                name: "English Grammar Book term V1",
                chapter: "Chapters: 1",
                date: "16 Sep 2023",
                time: "11:21 AM",
                status: "Developing",
            },
            {
                name: "English Grammar Book term V1",
                chapter: "Chapters: 1",
                date: "16 Sep 2023",
                time: "11:21 AM",
                status: "Developing",
            },
        ],
        // Time Table
        //    scheduleJson :[
        //         {
        //             day: "Monday",
        //             slots: {
        //                 "8 AM": "Maths\n10th-A",
        //                 "3 PM": "English\n10th-B"
        //             },
        //             time:"8 AM"
        //         },
        //         {
        //             day: "Tuesday",
        //             slots: {
        //                 "10 AM": "Science\n9th-A"
        //             },
        //             time:"8 AM"
        //         },
        //         {
        //             day: "Wednesday",
        //             slots: {
        //                 "2 PM": "Chemistry\n11th-C"
        //             },
        //             time:"8 AM"
        //         },
        //         {
        //             day: "Thursday",
        //             slots: {
        //                 "3 PM": "Biology\n12th-A"
        //             },
        //             time:"8 AM"
        //         },
        //         {
        //             day: "Friday",
        //             slots: {
        //                 "8 AM": "History\n10th-B"
        //             },
        //             time:"8 AM"
        //         }
        //     ]
        scheduleJson: [
            {
                day: "Monday",
                time: "Special class timing",
                slots: {
                    "8 AM": "Maths\n10th-A",
                    "3 PM": "English\n10th-B"
                }
            },
            {
                day: "Tuesday",
                time: "Special class timing",
                slots: {
                    "10 AM": "Maths\n10th- A"
                }
            },
            {
                day: "Wednesday",
                time: "Special class timing",
                slots: {
                    "8 AM": "Maths\n10th-A",
                    "3 PM": "English\n10th-B"
                }
            },
            {
                day: "Thursday",
                time: "Special class timing",
                slots: {

                    "5 PM": "Maths\n10th- A"
                }
            },
            {
                day: "Friday",
                time: "Special class timing",
                slots: {

                    "10 PM": "English\n10th-B"
                }
            },
        ],

   folderData : [{
            "name": "12th - A Section",
            "type": "Class Folder",
            "status": "active",
            "created_on": "08-10-2024",
            "path": "12th/A_Section",
            "children": [
                {
                    "name": "Books Upload",
                    "type": "folder",
                    "path": "12th/A_Section/Books Upload",
                    "children": [
                        { "name": "Physics.pdf", "type": "file", "path": "Books Upload/Physics.pdf" },
                        { "name": "Chemistry.pdf", "type": "file", "path": "Books Upload/Chemistry.pdf" },
                        { "name": "Biology.pdf", "type": "file", "path": "Books Upload/Biology.pdf" },
                        { "name": "Maths.pdf", "type": "file", "path": "Books Upload/Maths.pdf" },
                        { "name": "English.pdf", "type": "file", "path": "Books Upload/English.pdf" },
                        { "name": "Computer.pdf", "type": "file", "path": "Books Upload/Computer.pdf" },
                        { "name": "History.pdf", "type": "file", "path": "Books Upload/History.pdf" },
                        { "name": "Geography.pdf", "type": "file", "path": "Books Upload/Geography.pdf" },
                        { "name": "Economics.pdf", "type": "file", "path": "Books Upload/Economics.pdf" },
                        { "name": "Accountancy.pdf", "type": "file", "path": "Books Upload/Accountancy.pdf" },
                        { "name": "BusinessStudies.pdf", "type": "file", "path": "Books Upload/BusinessStudies.pdf" },
                        { "name": "Sociology.pdf", "type": "file", "path": "Books Upload/Sociology.pdf" }
                    ]
                },
                {
                    "name": "Attachments",
                    "type": "folder",
                    "path": "12th/A_Section/Attachments",
                    "children": [
                        { "name": "Timetable.docx", "type": "file", "path": "Attachments/Timetable.docx" },
                        { "name": "Syllabus.pdf", "type": "file", "path": "Attachments/Syllabus.pdf" },
                        { "name": "ExamPattern.pdf", "type": "file", "path": "Attachments/ExamPattern.pdf" },
                        { "name": "Notices.pdf", "type": "file", "path": "Attachments/Notices.pdf" },
                        { "name": "Assignment1.pdf", "type": "file", "path": "Attachments/Assignment1.pdf" },
                        { "name": "Assignment2.pdf", "type": "file", "path": "Attachments/Assignment2.pdf" },
                        { "name": "PTMNotice.pdf", "type": "file", "path": "Attachments/PTMNotice.pdf" },
                        { "name": "ExtraClassInfo.pdf", "type": "file", "path": "Attachments/ExtraClassInfo.pdf" },
                        { "name": "FeeStructure.pdf", "type": "file", "path": "Attachments/FeeStructure.pdf" },
                        { "name": "TransportDetails.pdf", "type": "file", "path": "Attachments/TransportDetails.pdf" }
                    ]
                }
            ]
        },
        {
            "name": "12th - A Section",
            "type": "Class Folder",
            "status": "active",
            "created_on": "08-10-2024",
            "path": "12th/A_Section",
            "children": [
                {
                    "name": "Books Upload",
                    "type": "folder",
                    "path": "12th/A_Section/Books Upload",
                    "children": [
                        { "name": "Physics.pdf", "type": "file", "path": "Books Upload/Physics.pdf" },
                        { "name": "Chemistry.pdf", "type": "file", "path": "Books Upload/Chemistry.pdf" },
                        { "name": "Biology.pdf", "type": "file", "path": "Books Upload/Biology.pdf" },
                        { "name": "Maths.pdf", "type": "file", "path": "Books Upload/Maths.pdf" },
                        { "name": "English.pdf", "type": "file", "path": "Books Upload/English.pdf" },
                        { "name": "Computer.pdf", "type": "file", "path": "Books Upload/Computer.pdf" },
                        { "name": "History.pdf", "type": "file", "path": "Books Upload/History.pdf" },
                        { "name": "Geography.pdf", "type": "file", "path": "Books Upload/Geography.pdf" },
                        { "name": "Economics.pdf", "type": "file", "path": "Books Upload/Economics.pdf" },
                        { "name": "Accountancy.pdf", "type": "file", "path": "Books Upload/Accountancy.pdf" },
                        { "name": "BusinessStudies.pdf", "type": "file", "path": "Books Upload/BusinessStudies.pdf" },
                        { "name": "Sociology.pdf", "type": "file", "path": "Books Upload/Sociology.pdf" }
                    ]
                },
                {
                    "name": "Attachments",
                    "type": "folder",
                    "path": "12th/A_Section/Attachments",
                    "children": [
                        { "name": "Timetable.docx", "type": "file", "path": "Attachments/Timetable.docx" },
                        { "name": "Syllabus.pdf", "type": "file", "path": "Attachments/Syllabus.pdf" },
                        { "name": "ExamPattern.pdf", "type": "file", "path": "Attachments/ExamPattern.pdf" },
                        { "name": "Notices.pdf", "type": "file", "path": "Attachments/Notices.pdf" },
                        { "name": "Assignment1.pdf", "type": "file", "path": "Attachments/Assignment1.pdf" },
                        { "name": "Assignment2.pdf", "type": "file", "path": "Attachments/Assignment2.pdf" },
                        { "name": "PTMNotice.pdf", "type": "file", "path": "Attachments/PTMNotice.pdf" },
                        { "name": "ExtraClassInfo.pdf", "type": "file", "path": "Attachments/ExtraClassInfo.pdf" },
                        { "name": "FeeStructure.pdf", "type": "file", "path": "Attachments/FeeStructure.pdf" },
                        { "name": "TransportDetails.pdf", "type": "file", "path": "Attachments/TransportDetails.pdf" }
                    ]
                }
            ]
        },{
            "name": "12th - A Section",
            "type": "Class Folder",
            "status": "active",
            "created_on": "08-10-2024",
            "path": "12th/A_Section",
            "children": [
                {
                    "name": "Books Upload",
                    "type": "folder",
                    "path": "12th/A_Section/Books Upload",
                    "children": [
                        { "name": "Physics.pdf", "type": "file", "path": "Books Upload/Physics.pdf" },
                        { "name": "Chemistry.pdf", "type": "file", "path": "Books Upload/Chemistry.pdf" },
                        { "name": "Biology.pdf", "type": "file", "path": "Books Upload/Biology.pdf" },
                        { "name": "Maths.pdf", "type": "file", "path": "Books Upload/Maths.pdf" },
                        { "name": "English.pdf", "type": "file", "path": "Books Upload/English.pdf" },
                        { "name": "Computer.pdf", "type": "file", "path": "Books Upload/Computer.pdf" },
                        { "name": "History.pdf", "type": "file", "path": "Books Upload/History.pdf" },
                        { "name": "Geography.pdf", "type": "file", "path": "Books Upload/Geography.pdf" },
                        { "name": "Economics.pdf", "type": "file", "path": "Books Upload/Economics.pdf" },
                        { "name": "Accountancy.pdf", "type": "file", "path": "Books Upload/Accountancy.pdf" },
                        { "name": "BusinessStudies.pdf", "type": "file", "path": "Books Upload/BusinessStudies.pdf" },
                        { "name": "Sociology.pdf", "type": "file", "path": "Books Upload/Sociology.pdf" }
                    ]
                },
                {
                    "name": "Attachments",
                    "type": "folder",
                    "path": "12th/A_Section/Attachments",
                    "children": [
                        { "name": "Timetable.docx", "type": "file", "path": "Attachments/Timetable.docx" },
                        { "name": "Syllabus.pdf", "type": "file", "path": "Attachments/Syllabus.pdf" },
                        { "name": "ExamPattern.pdf", "type": "file", "path": "Attachments/ExamPattern.pdf" },
                        { "name": "Notices.pdf", "type": "file", "path": "Attachments/Notices.pdf" },
                        { "name": "Assignment1.pdf", "type": "file", "path": "Attachments/Assignment1.pdf" },
                        { "name": "Assignment2.pdf", "type": "file", "path": "Attachments/Assignment2.pdf" },
                        { "name": "PTMNotice.pdf", "type": "file", "path": "Attachments/PTMNotice.pdf" },
                        { "name": "ExtraClassInfo.pdf", "type": "file", "path": "Attachments/ExtraClassInfo.pdf" },
                        { "name": "FeeStructure.pdf", "type": "file", "path": "Attachments/FeeStructure.pdf" },
                        { "name": "TransportDetails.pdf", "type": "file", "path": "Attachments/TransportDetails.pdf" }
                    ]
                }
            ]
        },
        {
            "name": "12th - A Section",
            "type": "Class Folder",
            "status": "active",
            "created_on": "08-10-2024",
            "path": "12th/A_Section",
            "children": [
                {   
                    "name": "Books Upload",
                    "type": "folder",
                    "path": "12th/A_Section/Books Upload",
                    "children": [
                        { "name": "Physics.pdf", "type": "file", "path": "Books Upload/Physics.pdf" },
                        { "name": "Chemistry.pdf", "type": "file", "path": "Books Upload/Chemistry.pdf" },
                        { "name": "Biology.pdf", "type": "file", "path": "Books Upload/Biology.pdf" },
                        { "name": "Maths.pdf", "type": "file", "path": "Books Upload/Maths.pdf" },
                        { "name": "English.pdf", "type": "file", "path": "Books Upload/English.pdf" },
                        { "name": "Computer.pdf", "type": "file", "path": "Books Upload/Computer.pdf" },
                        { "name": "History.pdf", "type": "file", "path": "Books Upload/History.pdf" },
                        { "name": "Geography.pdf", "type": "file", "path": "Books Upload/Geography.pdf" },
                        { "name": "Economics.pdf", "type": "file", "path": "Books Upload/Economics.pdf" },
                        { "name": "Accountancy.pdf", "type": "file", "path": "Books Upload/Accountancy.pdf" },
                        { "name": "BusinessStudies.pdf", "type": "file", "path": "Books Upload/BusinessStudies.pdf" },
                        { "name": "Sociology.pdf", "type": "file", "path": "Books Upload/Sociology.pdf" }
                    ]
                },
                {
                    "name": "Attachments",
                    "type": "folder",
                    "path": "12th/A_Section/Attachments",
                    "children": [
                        { "name": "Timetable.docx", "type": "file", "path": "Attachments/Timetable.docx" },
                        { "name": "Syllabus.pdf", "type": "file", "path": "Attachments/Syllabus.pdf" },
                        { "name": "ExamPattern.pdf", "type": "file", "path": "Attachments/ExamPattern.pdf" },
                        { "name": "Notices.pdf", "type": "file", "path": "Attachments/Notices.pdf" },
                        { "name": "Assignment1.pdf", "type": "file", "path": "Attachments/Assignment1.pdf" },
                        { "name": "Assignment2.pdf", "type": "file", "path": "Attachments/Assignment2.pdf" },
                        { "name": "PTMNotice.pdf", "type": "file", "path": "Attachments/PTMNotice.pdf" },
                        { "name": "ExtraClassInfo.pdf", "type": "file", "path": "Attachments/ExtraClassInfo.pdf" },
                        { "name": "FeeStructure.pdf", "type": "file", "path": "Attachments/FeeStructure.pdf" },
                        { "name": "TransportDetails.pdf", "type": "file", "path": "Attachments/TransportDetails.pdf" }
                    ]
                }
            ]
        },
        {
            "name": "12th - A Section",
            "type": "Class Folder",
            "status": "active",
            "created_on": "08-10-2024",
            "path": "12th/A_Section",
            "children": [
                {   
                    "name": "Books Upload",
                    "type": "folder",
                    "path": "12th/A_Section/Books Upload",
                    "children": [
                        { "name": "Physics.pdf", "type": "file", "path": "Books Upload/Physics.pdf" },
                        { "name": "Chemistry.pdf", "type": "file", "path": "Books Upload/Chemistry.pdf" },
                        { "name": "Biology.pdf", "type": "file", "path": "Books Upload/Biology.pdf" },
                        { "name": "Maths.pdf", "type": "file", "path": "Books Upload/Maths.pdf" },
                        { "name": "English.pdf", "type": "file", "path": "Books Upload/English.pdf" },
                        { "name": "Computer.pdf", "type": "file", "path": "Books Upload/Computer.pdf" },
                        { "name": "History.pdf", "type": "file", "path": "Books Upload/History.pdf" },
                        { "name": "Geography.pdf", "type": "file", "path": "Books Upload/Geography.pdf" },
                        { "name": "Economics.pdf", "type": "file", "path": "Books Upload/Economics.pdf" },
                        { "name": "Accountancy.pdf", "type": "file", "path": "Books Upload/Accountancy.pdf" },
                        { "name": "BusinessStudies.pdf", "type": "file", "path": "Books Upload/BusinessStudies.pdf" },
                        { "name": "Sociology.pdf", "type": "file", "path": "Books Upload/Sociology.pdf" }
                    ]
                },
                {
                    "name": "Attachments",
                    "type": "folder",
                    "path": "12th/A_Section/Attachments",
                    "children": [
                        { "name": "Timetable.docx", "type": "file", "path": "Attachments/Timetable.docx" },
                        { "name": "Syllabus.pdf", "type": "file", "path": "Attachments/Syllabus.pdf" },
                        { "name": "ExamPattern.pdf", "type": "file", "path": "Attachments/ExamPattern.pdf" },
                        { "name": "Notices.pdf", "type": "file", "path": "Attachments/Notices.pdf" },
                        { "name": "Assignment1.pdf", "type": "file", "path": "Attachments/Assignment1.pdf" },
                        { "name": "Assignment2.pdf", "type": "file", "path": "Attachments/Assignment2.pdf" },
                        { "name": "PTMNotice.pdf", "type": "file", "path": "Attachments/PTMNotice.pdf" },
                        { "name": "ExtraClassInfo.pdf", "type": "file", "path": "Attachments/ExtraClassInfo.pdf" },
                        { "name": "FeeStructure.pdf", "type": "file", "path": "Attachments/FeeStructure.pdf" },
                        { "name": "TransportDetails.pdf", "type": "file", "path": "Attachments/TransportDetails.pdf" }
                    ]
                }
            ]
        },
        {
            "name": "12th - A Section",
            "type": "Class Folder",
            "status": "active",
            "created_on": "08-10-2024",
            "path": "12th/A_Section",
            "children": [
                {   
                    "name": "Books Upload",
                    "type": "folder",
                    "path": "12th/A_Section/Books Upload",
                    "children": [
                        { "name": "Physics.pdf", "type": "file", "path": "Books Upload/Physics.pdf" },
                        { "name": "Chemistry.pdf", "type": "file", "path": "Books Upload/Chemistry.pdf" },
                        { "name": "Biology.pdf", "type": "file", "path": "Books Upload/Biology.pdf" },
                        { "name": "Maths.pdf", "type": "file", "path": "Books Upload/Maths.pdf" },
                        { "name": "English.pdf", "type": "file", "path": "Books Upload/English.pdf" },
                        { "name": "Computer.pdf", "type": "file", "path": "Books Upload/Computer.pdf" },
                        { "name": "History.pdf", "type": "file", "path": "Books Upload/History.pdf" },
                        { "name": "Geography.pdf", "type": "file", "path": "Books Upload/Geography.pdf" },
                        { "name": "Economics.pdf", "type": "file", "path": "Books Upload/Economics.pdf" },
                        { "name": "Accountancy.pdf", "type": "file", "path": "Books Upload/Accountancy.pdf" },
                        { "name": "BusinessStudies.pdf", "type": "file", "path": "Books Upload/BusinessStudies.pdf" },
                        { "name": "Sociology.pdf", "type": "file", "path": "Books Upload/Sociology.pdf" }
                    ]
                },
                {
                    "name": "Attachments",
                    "type": "folder",
                    "path": "12th/A_Section/Attachments",
                    "children": [
                        { "name": "Timetable.docx", "type": "file", "path": "Attachments/Timetable.docx" },
                        { "name": "Syllabus.pdf", "type": "file", "path": "Attachments/Syllabus.pdf" },
                        { "name": "ExamPattern.pdf", "type": "file", "path": "Attachments/ExamPattern.pdf" },
                        { "name": "Notices.pdf", "type": "file", "path": "Attachments/Notices.pdf" },
                        { "name": "Assignment1.pdf", "type": "file", "path": "Attachments/Assignment1.pdf" },
                        { "name": "Assignment2.pdf", "type": "file", "path": "Attachments/Assignment2.pdf" },
                        { "name": "PTMNotice.pdf", "type": "file", "path": "Attachments/PTMNotice.pdf" },
                        { "name": "ExtraClassInfo.pdf", "type": "file", "path": "Attachments/ExtraClassInfo.pdf" },
                        { "name": "FeeStructure.pdf", "type": "file", "path": "Attachments/FeeStructure.pdf" },
                        { "name": "TransportDetails.pdf", "type": "file", "path": "Attachments/TransportDetails.pdf" }
                    ]
                }
            ]
        },
        {
            "name": "12th - A Section",
            "type": "Class Folder",
            "status": "active",
            "created_on": "08-10-2024",
            "path": "12th/A_Section",
            "children": [
                {   
                    "name": "Books Upload",
                    "type": "folder",
                    "path": "12th/A_Section/Books Upload",
                    "children": [
                        { "name": "Physics.pdf", "type": "file", "path": "Books Upload/Physics.pdf" },
                        { "name": "Chemistry.pdf", "type": "file", "path": "Books Upload/Chemistry.pdf" },
                        { "name": "Biology.pdf", "type": "file", "path": "Books Upload/Biology.pdf" },
                        { "name": "Maths.pdf", "type": "file", "path": "Books Upload/Maths.pdf" },
                        { "name": "English.pdf", "type": "file", "path": "Books Upload/English.pdf" },
                        { "name": "Computer.pdf", "type": "file", "path": "Books Upload/Computer.pdf" },
                        { "name": "History.pdf", "type": "file", "path": "Books Upload/History.pdf" },
                        { "name": "Geography.pdf", "type": "file", "path": "Books Upload/Geography.pdf" },
                        { "name": "Economics.pdf", "type": "file", "path": "Books Upload/Economics.pdf" },
                        { "name": "Accountancy.pdf", "type": "file", "path": "Books Upload/Accountancy.pdf" },
                        { "name": "BusinessStudies.pdf", "type": "file", "path": "Books Upload/BusinessStudies.pdf" },
                        { "name": "Sociology.pdf", "type": "file", "path": "Books Upload/Sociology.pdf" }
                    ]
                },
                {
                    "name": "Attachments",
                    "type": "folder",
                    "path": "12th/A_Section/Attachments",
                    "children": [
                        { "name": "Timetable.docx", "type": "file", "path": "Attachments/Timetable.docx" },
                        { "name": "Syllabus.pdf", "type": "file", "path": "Attachments/Syllabus.pdf" },
                        { "name": "ExamPattern.pdf", "type": "file", "path": "Attachments/ExamPattern.pdf" },
                        { "name": "Notices.pdf", "type": "file", "path": "Attachments/Notices.pdf" },
                        { "name": "Assignment1.pdf", "type": "file", "path": "Attachments/Assignment1.pdf" },
                        { "name": "Assignment2.pdf", "type": "file", "path": "Attachments/Assignment2.pdf" },
                        { "name": "PTMNotice.pdf", "type": "file", "path": "Attachments/PTMNotice.pdf" },
                        { "name": "ExtraClassInfo.pdf", "type": "file", "path": "Attachments/ExtraClassInfo.pdf" },
                        { "name": "FeeStructure.pdf", "type": "file", "path": "Attachments/FeeStructure.pdf" },
                        { "name": "TransportDetails.pdf", "type": "file", "path": "Attachments/TransportDetails.pdf" }
                    ]
                }
            ]
        },
        {
            "name": "12th - A Section",
            "type": "Class Folder",
            "status": "active",
            "created_on": "08-10-2024",
            "path": "12th/A_Section",
            "children": [
                {   
                    "name": "Books Upload",
                    "type": "folder",
                    "path": "12th/A_Section/Books Upload",
                    "children": [
                        { "name": "Physics.pdf", "type": "file", "path": "Books Upload/Physics.pdf" },
                        { "name": "Chemistry.pdf", "type": "file", "path": "Books Upload/Chemistry.pdf" },
                        { "name": "Biology.pdf", "type": "file", "path": "Books Upload/Biology.pdf" },
                        { "name": "Maths.pdf", "type": "file", "path": "Books Upload/Maths.pdf" },
                        { "name": "English.pdf", "type": "file", "path": "Books Upload/English.pdf" },
                        { "name": "Computer.pdf", "type": "file", "path": "Books Upload/Computer.pdf" },
                        { "name": "History.pdf", "type": "file", "path": "Books Upload/History.pdf" },
                        { "name": "Geography.pdf", "type": "file", "path": "Books Upload/Geography.pdf" },
                        { "name": "Economics.pdf", "type": "file", "path": "Books Upload/Economics.pdf" },
                        { "name": "Accountancy.pdf", "type": "file", "path": "Books Upload/Accountancy.pdf" },
                        { "name": "BusinessStudies.pdf", "type": "file", "path": "Books Upload/BusinessStudies.pdf" },
                        { "name": "Sociology.pdf", "type": "file", "path": "Books Upload/Sociology.pdf" }
                    ]
                },
                {
                    "name": "Attachments",
                    "type": "folder",
                    "path": "12th/A_Section/Attachments",
                    "children": [
                        { "name": "Timetable.docx", "type": "file", "path": "Attachments/Timetable.docx" },
                        { "name": "Syllabus.pdf", "type": "file", "path": "Attachments/Syllabus.pdf" },
                        { "name": "ExamPattern.pdf", "type": "file", "path": "Attachments/ExamPattern.pdf" },
                        { "name": "Notices.pdf", "type": "file", "path": "Attachments/Notices.pdf" },
                        { "name": "Assignment1.pdf", "type": "file", "path": "Attachments/Assignment1.pdf" },
                        { "name": "Assignment2.pdf", "type": "file", "path": "Attachments/Assignment2.pdf" },
                        { "name": "PTMNotice.pdf", "type": "file", "path": "Attachments/PTMNotice.pdf" },
                        { "name": "ExtraClassInfo.pdf", "type": "file", "path": "Attachments/ExtraClassInfo.pdf" },
                        { "name": "FeeStructure.pdf", "type": "file", "path": "Attachments/FeeStructure.pdf" },
                        { "name": "TransportDetails.pdf", "type": "file", "path": "Attachments/TransportDetails.pdf" }
                    ]
                }
            ]
        },
        {
            "name": "12th - A Section",
            "type": "Class Folder",
            "status": "active",
            "created_on": "08-10-2024",
            "path": "12th/A_Section",
            "children": [
                {   
                    "name": "Books Upload",
                    "type": "folder",
                    "path": "12th/A_Section/Books Upload",
                    "children": [
                        { "name": "Physics.pdf", "type": "file", "path": "Books Upload/Physics.pdf" },
                        { "name": "Chemistry.pdf", "type": "file", "path": "Books Upload/Chemistry.pdf" },
                        { "name": "Biology.pdf", "type": "file", "path": "Books Upload/Biology.pdf" },
                        { "name": "Maths.pdf", "type": "file", "path": "Books Upload/Maths.pdf" },
                        { "name": "English.pdf", "type": "file", "path": "Books Upload/English.pdf" },
                        { "name": "Computer.pdf", "type": "file", "path": "Books Upload/Computer.pdf" },
                        { "name": "History.pdf", "type": "file", "path": "Books Upload/History.pdf" },
                        { "name": "Geography.pdf", "type": "file", "path": "Books Upload/Geography.pdf" },
                        { "name": "Economics.pdf", "type": "file", "path": "Books Upload/Economics.pdf" },
                        { "name": "Accountancy.pdf", "type": "file", "path": "Books Upload/Accountancy.pdf" },
                        { "name": "BusinessStudies.pdf", "type": "file", "path": "Books Upload/BusinessStudies.pdf" },
                        { "name": "Sociology.pdf", "type": "file", "path": "Books Upload/Sociology.pdf" }
                    ]
                },
                {
                    "name": "Attachments",
                    "type": "folder",
                    "path": "12th/A_Section/Attachments",
                    "children": [
                        { "name": "Timetable.docx", "type": "file", "path": "Attachments/Timetable.docx" },
                        { "name": "Syllabus.pdf", "type": "file", "path": "Attachments/Syllabus.pdf" },
                        { "name": "ExamPattern.pdf", "type": "file", "path": "Attachments/ExamPattern.pdf" },
                        { "name": "Notices.pdf", "type": "file", "path": "Attachments/Notices.pdf" },
                        { "name": "Assignment1.pdf", "type": "file", "path": "Attachments/Assignment1.pdf" },
                        { "name": "Assignment2.pdf", "type": "file", "path": "Attachments/Assignment2.pdf" },
                        { "name": "PTMNotice.pdf", "type": "file", "path": "Attachments/PTMNotice.pdf" },
                        { "name": "ExtraClassInfo.pdf", "type": "file", "path": "Attachments/ExtraClassInfo.pdf" },
                        { "name": "FeeStructure.pdf", "type": "file", "path": "Attachments/FeeStructure.pdf" },
                        { "name": "TransportDetails.pdf", "type": "file", "path": "Attachments/TransportDetails.pdf" }
                    ]
                }
            ]
        }
     ]


    }

    const jsxJson = {

    }
    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson,
    }

}

export default JsonDataStudent
