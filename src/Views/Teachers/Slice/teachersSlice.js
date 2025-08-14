import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selected_books: {},
    studentsPerformance: {
        activeTab: "teachers",
        searchResults: [],
        jsonStudentsData: [],
    },
    test_records: {
        glow: true,
        data: []
    },
    test_dropDown_data: {
        data: []
    },
    test_create: {
        glow: true,
        data: [],
        input_data: {}
    },
    create_test: {
        selected_books: {},
        selected_chapter: "",

    },
    student_details: {},
    save_schedule_status: {},
    save_schedule_error: {},
    subject_attachments: {},

}

const teachersSlice = createSlice({
    name: 'teachersSlice',
    initialState: initialState,
    reducers: {
        handleStudentsPerformance(state, action) {

        },
        handleJsonStudentsData(state, action) {

        },
        handleDropDownchange(state, action) {
            state.test_dropDown_data.data = action.data;
        }
        ,
        handleGetTestRecords(state, action) {
            const { type, data } = action.payload;
            console.log(data, '41-data')

            switch (type) {
                case "request":
                    state.test_records['glow'] = true;
                    state.test_records['data'] = [];
                    break;

                case "response":
                    state.test_records['glow'] = false;
                    state.test_records.data = data;
                    break;

                case "failure":
                    state.test_records['glow'] = false;
                    state.test_records['data'] = [];
                    break;

                default:
                    break;
            }

        },
        handelGetCreate(state, action) {
            const { type, data } = action.payload;

            switch (type) {
                case "request":
                    state.test_create['glow'] = true;
                    state.test_create['data'] = [];
                    break;

                case "response":
                    state.test_create['glow'] = false;
                    state.test_create['data'] = data;
                    break;

                case "failure":
                    state.test_create['glow'] = false;
                    state.test_create['data'] = [];
                    break;

                default:
                    break;
            }
        },
        create_test_onchange(state, action) {
            Object.entries(action.payload)?.forEach(([key, value]) => (
                state.test_create.input_data[key] = value
            ))
        },
        update_selected_books(state, action) {
            const { key, value } = action.payload
            state.create_test[key] = value

        },
        get_student_details_slice(state, action) {
            const { key, value } = action.payload
            state.student_details[key] = value
        },
        save_schedule_request(state) {
            state.save_schedule_status = "loading";
            state.save_schedule_error = null;
        },
        save_schedule_success(state, action) {
            state.save_schedule_status = "succeeded";
            state.student_details = {
                ...state.student_details,
                schedule: action.payload
            };
        },
        save_schedule_failure(state, action) {
            state.save_schedule_status = "failed";
            state.save_schedule_error = action.payload;
        },
        getSubjectAttachments(state, action) {
            const { type, data } = action.payload

            switch (type) {
                case "response":
                    state.subject_attachments = data || {}
                    break;

                case "failure":
                    state.subject_attachments = {}
                    break;

                default:
                    break;
            }
        },
    }
})

const { actions, reducer } = teachersSlice

export const {
    handleStudentsPerformance,
    handleJsonStudentsData,
    handleGetTestRecords,
    handelGetCreate,
    create_test_onchange,
    update_selected_books,
    get_student_details_slice,
    save_schedule_request,
    save_schedule_success,
    save_schedule_failure,
    getSubjectAttachments

} = actions

export default reducer