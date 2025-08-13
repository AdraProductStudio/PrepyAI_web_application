import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentsPerformance: {
        classroom_id: null,
        subject_id: null,
        placeholder: false,
        assignedTest: {
            jsonStudentsData: [],
            pagination: {
                page: 1,
                show_entries: 10,
                total_pages: null
            }
        },
    
        selfTest: {
            jsonStudentsData: [],
            pagination: {
                page: 1,
                show_entries: 10,
                total_pages: null
            }
    },
    }
}

const teachersSlice = createSlice({
    name: 'teachersSlice',
    initialState: initialState,
    reducers: {
        handledAssignedStudentsTestData(state, action) {
            const { type , data } = action.payload

            switch(type){
                case "request":
                    state.studentsPerformance.assignedTest.jsonStudentsData = []
                    state.studentsPerformance.placeholder = true;
                    break;

                case "response":
                    state.studentsPerformance.assignedTest.jsonStudentsData = data || []
                    state.studentsPerformance.placeholder = false;
                    break;

                case "failure":
                    state.studentsPerformance.assignedTest.jsonStudentsData = []
                    state.studentsPerformance.placeholder = false;
                    break;
                default:
                    break;

            }       
        },
        updateAssignedTestPaginationPage(state, action) {
            state.studentsPerformance.assignedTest.pagination.page = action.payload;
        },   
        updateAssingnedTestTotalPageCount(state, action) {
            state.studentsPerformance.assignedTest.pagination.total_pages = action.payload
        },


        updateStudentClassAndSubject(state, action) {
            const {class_id, subject_id} = action.payload
            state.studentsPerformance.classroom_id = class_id
            state.studentsPerformance.subject_id = subject_id
        },
        

        handleSelfStudentsTestData(state, action) {
            const { type , data } = action.payload

            switch(type){
                case "request":
                    state.studentsPerformance.selfTest.jsonStudentsData = []
                    state.studentsPerformance.placeholder = true;
                    break;

                case "response":
                    state.studentsPerformance.selfTest.jsonStudentsData = data || []
                    state.studentsPerformance.placeholder = false;
                    break;

                case "failure":
                    state.studentsPerformance.selfTest.jsonStudentsData = []
                    state.studentsPerformance.placeholder = false;
                    break;
                default:
                    break;

            }       
        },

        updateSelfTestPaginationPage(state, action) {
            state.studentsPerformance.selfTest.pagination.page = action.payload;
        },   
        updateSelfTestTotalPageCount(state, action) {
            state.studentsPerformance.selfTest.pagination.total_pages = action.payload
        },
        
    }
})

const { actions, reducer } = teachersSlice

export const {
    handledAssignedStudentsTestData, updateAssignedTestPaginationPage, updateAssingnedTestTotalPageCount, 
    updateStudentClassAndSubject,
    handleSelfStudentsTestData, updateSelfTestPaginationPage, updateSelfTestTotalPageCount,
    
} = actions

export default reducer