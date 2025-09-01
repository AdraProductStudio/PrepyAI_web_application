import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentsPerformance: {
        classroom_id: null,
        subject_id: null,
        placeholder: false,
        placeholder2: false,
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
        performance_modalData: []
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

        handlePerformanceModalData(state, action) {
            const { type , data } = action.payload

            switch(type){
                case "request":
                    state.studentsPerformance.performance_modalData = []
                    state.studentsPerformance.placeholder2 = true;
                    break;

                case "response":
                    state.studentsPerformance.performance_modalData = data || []
                    state.studentsPerformance.placeholder2 = false;
                    break;

                case "failure":
                    state.studentsPerformance.performance_modalData = []
                    state.studentsPerformance.placeholder2 = false;
                    break;
                default:
                    break;

            }       
        },
        
    }
})

const { actions, reducer } = teachersSlice

export const {
    handledAssignedStudentsTestData, updateAssignedTestPaginationPage, updateAssingnedTestTotalPageCount, 
    updateStudentClassAndSubject,
    handleSelfStudentsTestData, updateSelfTestPaginationPage, updateSelfTestTotalPageCount,
    handlePerformanceModalData
    
} = actions

export default reducer