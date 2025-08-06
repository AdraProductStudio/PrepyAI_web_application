import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentsPerformance: {
        activeTab: "teachers",
        searchResults: [],
        jsonStudentsData: []
    }
}

const teachersSlice = createSlice({
    name: 'teachersSlice',
    initialState: initialState,
    reducers: {
        handleStudentsPerformance(state, action) {

        },
        handleJsonStudentsData(state, action) {

        }
    }
})

const { actions, reducer } = teachersSlice

export const {
    handleStudentsPerformance,
    handleJsonStudentsData
} = actions

export default reducer