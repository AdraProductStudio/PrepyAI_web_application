import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { decrypt_app_data_logs, decryption, encryption, view_logout } from "ResuableFunctions/logs_handler";

let initialState = {
    login_data: {},
    modal: {
        show: false,
        size: "md",
        from: null,
        type: null,
        close_btn: false,
        enable_lg_autoScroll: false
    },
    canvas: {
        show: false,
        from: null,
        type: null,
        extraClass: '',
        placement: '',
        close_btn: false
    },
    app_data: {
        canvasShow: false,
        isOnline: true,
        currentMenuName: '',
        current_location: window.location.pathname || '',
        innerWidth: window.innerWidth || 0,
        innerHeight: window.innerHeight || 0,
        buttonSpinner: false,
        validated: false,
        token: decrypt_app_data_logs()?.access_token || '',
        refresh_token: decrypt_app_data_logs()?.refresh_token || '',
        user_role: decrypt_app_data_logs()?.role_name || '',
        user_id: decrypt_app_data_logs()?.user_id || '',
        user_image: decrypt_app_data_logs()?.profile_image || '',
    },
    pagination: {
        currentPage: 1,
        totalCount: 0,
        siblingCount: 1,
    },
    search: {
        value: '',
        clicked: false,
    },
    error: {
        Err: null,
        Toast_Type: null
    },
    teachernotesdata: {
        glow: true,
        data: []
    },
    notesdata: {
        title: "",
        content: "",
    },
    postNoteStatus: {
        glow: true,
        data: []
    },
    deleteNoteStatus: {
        glow: true,
        data: []
    },
    books: {
        loading: false,
        data: [],
        error: null
    }
}

const commonSlice = createSlice({
    name: 'common_slice',
    initialState,
    reducers: {
        handleDeleteNote(state, action) {
            const { type, message } = action.payload;

            if (type === "request") {
                state.deleteNoteStatus.loading = true;
                state.deleteNoteStatus.error = null;
            } else if (type === "success") {
                state.deleteNoteStatus.loading = false;
                state.deleteNoteStatus.error = null;
            } else if (type === "failure") {
                state.deleteNoteStatus.loading = false;
                state.deleteNoteStatus.error = message;
            }
        },
        setNotes(state, action) {
            state.notes = action.payload;
        },
        handlePostNote: (state, action) => {
            const { type, data } = action.payload;
            switch (type) {
                case "request":
                    state.teachernotesdata["glow"] = true;
                    state.teachernotesdata["data"] = [];
                    break;

                case "response":
                    state.teachernotesdata["glow"] = false;
                    state.modal.show = false;
                    state.modal.type = null;
                    state.modal.from = null;
                    state.modal.close_btn = false;
                    state.notesdata.title = "";
                    state.notesdata.content = "";
                    state.notesdata.edit = null;
                    state.notesdata.id = null;
                    break;

                case "failure":
                    state.teachernotesdata["glow"] = false;
                    state.teachernotesdata["data"] = [];
                    break;

                default:
                    break;
            }
        },
        handleTeacherNotesData(state, action) {
            const { type, data } = action.payload;

            switch (type) {
                case "request":
                    state.teachernotesdata["glow"] = true;
                    state.teachernotesdata["data"] = [];
                    break;

                case "response":
                    state.teachernotesdata["glow"] = false;
                    state.teachernotesdata["data"] = data;
                    state.notesdata.edit = null;
                    break;

                case "failure":
                    state.teachernotesdata["glow"] = false;
                    state.teachernotesdata["data"] = [];
                    break;

                default:
                    break;
            }
        },
        updateModalShow(state, actions) {
            const { show, size, modal_from, modal_type, close_btn } = actions.payload;
            if (modal_type === "add_note") {
                state.notesdata.title = "";
                state.notesdata.content = "";
                state.notesdata.id = null;
            }

            state.modal.show = show
            state.modal.size = size || "md"
            state.modal.from = modal_from || null
            state.modal.type = modal_type || null
            state.modal.close_btn = close_btn || false
        },
        update_app_data(state, action) {
            const { type, data } = action.payload;
            switch (type) {
                case "canvas":
                    state.canvas.show = data.show || false;
                    state.canvas.from = data.from || null;
                    state.canvas.type = data.type || null;
                    state.canvas.placement = data.placement || '';
                    state.canvas.extraClass = data.extraClass || null;
                    state.canvas.close_btn = data.close_btn || false;
                    break;
                case "internet_status":
                    state.app_data.isOnline = data || false;
                    break;
                case "menu_name":
                    state.app_data.token = data?.access_token || '';
                    state.app_data.user_role = data?.role_name || '';
                    state.app_data.user_id = data?.user_id || '';
                    state.app_data.current_location = window.location.pathname || '';
                    state.app_data.currentMenuName = data?.currentLocation || '';
                    state.app_data.validated = false;
                    break;
                case "dimension":
                    state.app_data.innerWidth = data?.innerWidth || 0;
                    state.app_data.innerHeight = data?.innerHeight || 0;
                    break;
                case "validation":
                    state.app_data.validated = data || false;
                    break;
                default:
                    return
            }
        },
        update_error(state, action) {
            const { Err, Toast_Type } = action.payload || {};
            state.error.Err = Err || null;
            state.error.Toast_Type = Toast_Type || null;
        },
        update_search(state, action) {
            const { value, clicked } = action.payload || {};
            state.search.value = value || '';
            state.search.clicked = clicked || false;
        },
        logout(state, actions) {
            view_logout();

            state.app_data.token = '';
            state.app_data.refresh_token = '';
            state.app_data.user_role = '';
            state.app_data.user_id = '';
        },
        handleGetBooks: (state, action) => {
            const { type, data, message } = action.payload || {};
            switch (type) {
                case "request":
                    state.loading = true;
                    state.error = null;
                    break;
                case "response":
                    state.loading = false;
                    state.books.data = data || [];
                    state.books.error = null;
                    break;
                case "failure":
                    state.loading = false;
                    state.error = message || "Something went wrong";
                    break;
                default:
                    return;
            }
        },
        update_note_data(state, action) {
            const { type, data } = action.payload;
            state.notesdata[type] = data || "";
        },
        edit_note_data(state, action) {
            const { show, size, modal_from, modal_type, close_btn, data } = action.payload;
            Object.entries(data)?.map(([key, value]) => (
                state.notesdata[key === "notes" ? "content" : key] = value || ""
            ))
            state.notesdata.edit = true;
            state.modal.show = show
            state.modal.size = size || "md"
            state.modal.from = modal_from || null
            state.modal.type = modal_type || null
            state.modal.close_btn = close_btn || false
        }
    },
    extraReducers: (builder) => {
        builder
            // login response 
            .addCase("authState/login_endpoint", (state, action) => {
                const { type, data, message } = action.payload || {};
                switch (type) {
                    case "response":
                        let decrypt_logs;
                        let update_cookie_log;
                        let roleKey = data?.role_name;

                        if (Cookies.get('project_log')) decrypt_logs = decryption();
                        if (decrypt_logs) {
                            if (roleKey && !decrypt_logs?.hasOwnProperty(roleKey)) update_cookie_log = { ...decrypt_logs, [roleKey]: data || {} };
                            else update_cookie_log = { ...decrypt_logs };
                        }
                        else update_cookie_log = { [roleKey]: data || {} };

                        const encrypted_logs = encryption(update_cookie_log);
                        Cookies.set('project_log', encrypted_logs);

                        state.app_data.token = data?.access_token || '';
                        state.app_data.refresh_token = data?.refresh_token || '';
                        state.app_data.user_image = data?.profile_image || '';
                        state.app_data.user_role = data?.role_name || '';
                        state.app_data.validated = false;
                        break;

                    case "failure":
                        state.app_data.token = '';
                        state.app_data.refresh_token = '';
                        state.app_data.user_role = '';
                        state.app_data.validated = false;
                        state.error.Err = message || "Login failed";
                        state.error.Toast_Type = "error";
                        break;

                    default:
                        break;
                }
            })

            //For handling response error [setting toast error message]
            .addMatcher(
                (action) => [
                    "teachersSlice/handleGetTestRecords"
                ].includes(action.type),

                (state, action) => {
                    const { type } = action.payload || {};
                    if (type === "failure") setToastState(state, action);
                }
            )

            //Remove the validation failure status
            .addMatcher(
                (action) => [
                    "authState/update_login_data",
                    "authState/update_learners_register",
                    "authState/update_organization_register",
                    "authState/update_admin_register",
                    "authState/update_teacher_register",
                    "authState/update_student_register",
                    "authState/update_forgot_password",
                    "authState/update_otp_verification",
                    "authState/update_create_password"
                ].includes(action.type),

                (state) => {
                    if (state.app_data.validated) state.app_data.validated = false;
                }
            )
    }
})

function setToastState(state, action) {
    let error_message = typeof action.payload === 'object' ? action.payload?.message : action.payload;
    state.error.Err = error_message;
    state.error.Toast_Type = action.payload?.toast_type || "error";
}

const { actions, reducer } = commonSlice;

export const {
    update_app_data, update_error, updateModalShow, update_search,
    logout, handleTeacherNotesData, handlePostNote, handleDeleteNote,
    update_note_data, handleGetBooks, edit_note_data

} = actions;

export default reducer