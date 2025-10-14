import { createSlice } from "@reduxjs/toolkit";
import LZString from "lz-string";
import { decrypt_app_data_logs, decryption, encryption, view_logout } from "ResuableFunctions/logs_handler";


let initialState = {
    login_data: {},
    modal: {
        show: false,
        size: "md",
        from: null,
        type: null,
        close_btn: false,
        enable_lg_autoScroll: false,
        modal_data: null,
    },
    canvas: {
        show: false,
        from: null,
        type: null,
        extraClass: '',
        placement: '',
        close_btn: false,
        sidebar_data: []
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
        validationMessage: "",
        ...decrypt_app_data_logs(),
    },
    pagination: {
        currentPage: 1,
    },
    search: {
        value: '',
        clicked: false,
    },
    error: {
        Err: null,
        Toast_Type: null
    },
    usernotesdata: {
        glow: true,
        data: [],
        is_loading:false
    },
    notesdata: {
        title: "",
        content: "",
        is_loading:false,
    },
    postNoteStatus: {
        glow: true,
        data: []
    },
    deleteNoteStatus: {
        is_loading: false,
        data: []
    },
}

const commonSlice = createSlice({
    name: 'common_slice',
    initialState,
    reducers: {
        handleDeleteNote(state, action) {
            const { type } = action.payload;

            if (type === "request") {
                state.deleteNoteStatus.is_loading = true;
            } else if (type === "response") {
                state.deleteNoteStatus.is_loading = false;
            } else if (type === "failure") {
                state.deleteNoteStatus.is_loading = false;
            }
        },
        setNotes(state, action) {
            state.notes = action.payload;
        },
        handlePostNote: (state, action) => {
            const { type } = action.payload;

            switch (type) {
                case "request":
                    state.usernotesdata["glow"] = true;
                    state.usernotesdata.is_loading = true
                    // state.usernotesdata["data"] = [];
                    break;

                case "response":
                    state.usernotesdata["glow"] = false;
                     state.usernotesdata.is_loading = false
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
                    state.usernotesdata["glow"] = false;
                     state.usernotesdata.is_loading = false
                    // state.usernotesdata["data"] = [];
                    break;

                default:
                    break;
            }
        },
        handleusernotesdata(state, action) {
            const { type, data } = action.payload;

            switch (type) {
                case "request":
                    state.usernotesdata["glow"] = true;
                    // state.usernotesdata["data"] = [];
                    break;

                case "response":
                    state.usernotesdata["glow"] = false;
                    state.usernotesdata["data"] = data;
                    state.notesdata.edit = null;
                    break;

                case "failure":
                    state.usernotesdata["glow"] = false;
                    // state.usernotesdata["data"] = [];
                    break;

                default:
                    break;
            }
        },
        add_fav_notes(state,action){
            

        },
        updateModalShow(state, actions) {
            const { show, size, modal_from, modal_type, close_btn, data } = actions.payload;
            if (modal_from === "notes") state.notesdata = {}
            state.modal.show = show
            state.modal.size = size || "md"
            state.modal.from = modal_from || null
            state.modal.type = modal_type || null
            state.modal.close_btn = close_btn || false
            state.modal.modal_data = data || null
            state.app_data.validated = false
            state.app_data.validationMessage = {}
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
                    state.canvas.sidebar_data = data.sidebar_data || [];
                    break;
                case "internet_status":
                    state.app_data.isOnline = data || false;
                    break;
                case "menu_name":
                    state.app_data.token = data?.token || '';
                    state.app_data.refresh_token = data?.refresh_token || '';
                    state.app_data.user_role = data?.user_role || '';
                    state.app_data.user_id = data?.user_id || '';
                    state.app_data.current_location = window.location.pathname || '';
                    state.app_data.currentMenuName = data?.currentLocation || '';
                    state.app_data.validated = false;
                    state.pagination.currentPage = 1;
                    state.canvas.show = false;
                    break;
                case "dimension":
                    state.app_data.innerWidth = data?.innerWidth || 0;
                    state.app_data.innerHeight = data?.innerHeight || 0;
                    break;
                case "validation":
                    state.app_data.validated = data || false;
                    break;
                case "validationMessage":
                    state.app_data.validationMessage = data || false
                case "pagination":
                    state.pagination.currentPage = data?.currentPage || 1;
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
            state.canvas.show = false;
            state.canvas.from = null;
            state.canvas.type = null;
            state.canvas.placement = null;
            state.canvas.extraClass = null;
            state.canvas.close_btn = false;
            state.canvas.sidebar_data = [];
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
        },
        view_notes_data(state,action){
            const {title,content,id } = action.payload
            state.notesdata.title = title
            state.notesdata.content = content
            state.notesdata.id = id
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase("admin_slice/get_organinsation_details", (state, action) => {
                const { type, page, is_plan_changed } = action.payload;
                if (type === "request") {
                    if (is_plan_changed) {
                        state.search.value = '';
                        state.search.clicked = false;
                        state.pagination.currentPage = 1;
                    }

                    if (page) {
                        state.pagination.currentPage = page;
                    }
                }
            })

            // login response
            .addCase("authState/login_endpoint", (state, action) => {
                const { type, data, message } = action.payload || {};
                switch (type) {
                    case "response":
                        let decrypt_logs;
                        let update_cookie_log;
                        const roleKey = data?.role_name;
                        let new_keys = {};

                        if (Object.keys(data || {}).length > 0) {
                            new_keys = {
                                token: data?.access_token,
                                refresh_token: data?.refresh_token,
                                user_role: roleKey,
                                user_id: data?.user_id,
                                user_image: data?.user_image,
                                user_name: data?.user_name,
                            };
                        }

                        // get old logs if any
                        if (localStorage.getItem("project_log")) decrypt_logs = decryption();
                        const decompressed = decrypt_logs
                            ? JSON.parse(LZString.decompressFromUTF16(decrypt_logs))
                            : null;

                        if (decompressed) {
                            // overwrite or add role key
                            update_cookie_log = { ...decompressed, [roleKey]: new_keys };
                        } else {
                            update_cookie_log = { [roleKey]: new_keys };
                        }

                        // compress + encrypt
                        const compressed = LZString.compressToUTF16(JSON.stringify(update_cookie_log));
                        const encrypted_logs = encryption(compressed);
                        localStorage.setItem("project_log", encrypted_logs);

                        // update redux state
                        state.app_data.token = data?.access_token || "";
                        state.app_data.refresh_token = data?.refresh_token || "";
                        state.app_data.user_image = data?.user_image || ""; // fixed naming
                        state.app_data.user_role = roleKey || "";
                        state.app_data.user_name = data?.user_name || "";
                        state.app_data.validated = false;
                        break;

                    case "failure":
                        state.app_data.token = "";
                        state.app_data.refresh_token = "";
                        state.app_data.user_role = "";
                        state.app_data.validated = false;
                        state.error.Err = message || "Login failed";
                        state.error.Toast_Type = "error";
                        break;

                    default:
                        break;
                }
            })
            .addCase("common_slice/updateModalShow", (state, action) => {
                const { show } = action.payload;
                if (!show) {
                    state.app_data.validationMessage = {};
                    state.app_data.validated = false;
                }
            })
            .addMatcher(
                (action) => [
                    "teachersSlice/handleUploadAttachment",
                    "teachersSlice/deleteBook",
                    "teachersSlice/handleUploadAttachment",
                    "teachersSlice/handleUploadBooks",
                    "teachersSlice/handleScheduleTest",
                    "teachersSlice/save_schedule_status",
                    "admin_slice/create_organisation",
                    "organisation_slice/create_admin",
                    "organisation_slice/delete_admin",
                    "organisation_slice/edit_organization",
                    "student_slice/convert_audio_to_text",
                    "admin_slice/edit_profile_Inputs_endpoint",
                    "admin_slice/dele_organisation_endpoint",
                    "student_slice/delete_learner_book",
                    'common_slice/handleDeleteNote',
                    "adminSlice/delete_timetable",

                ].includes(action.type),

                (state, action) => {
                    const { type } = action.payload || {};
                    if (type === "response") {
                        state.modal.show = false;
                        state.modal.size = "md";
                        state.modal.from = null;
                        state.modal.type = null;
                        state.modal.close_btn = false;
                    }
                }
            )

            //For handling response error [setting toast error message]
            .addMatcher(
                (action) => [
                    "teachersSlice/handleGetTestRecords",
                    "teachersSlice/handleUploadAttachment",
                    "teachersSlice/handleGetBooks",
                    "teachersSlice/deleteBook",
                    "teachersSlice/getSubjectAttachments",
                    "teachersSlice/handleUploadBooks",
                    "teachersSlice/handleScheduleTest",
                    "teachersSlice/save_schedule_status",
                    "admin_slice/create_organisation",
                    "organisation_slice/create_admin",
                    "organisation_slice/updateOrganizationInfo",
                    "organisation_slice/updateAdminList",
                    "organisation_slice/delete_admin",
                    "organisation_slice/updateOrgProfileInputs",
                    "organisation_slice/delete_admin",
                    "organisation_slice/edit_organization",
                    "organisation_slice/change_password",
                    "student_slice/get_bookmarks",
                    "student_slice/update_generate_questions",
                    "student_slice/submit_test",
                    "admin_slice/edit_profile_Inputs_endpoint",
                    "admin_slice/change_password_endpoint",
                    "admin_slice/dele_organisation_endpoint",
                    "student_slice/delete_learner_book",    
                    "teachersSlice/save_schedule",
                    "adminSlice/delete_timetable",
                    "adminSlice/get_timetable_list",
                    "adminSlice/create_template",
                    "adminSlice/get_template",
                    "adminSlice/get_classroom_timetable",
                    "adminSlice/create_timetable",
                    "student_slice/get_student_timetable",
                    "teachersSlice/get_teacher_timetable"
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
                    "authState/update_create_password",
                    "teachersSlice/handleScheduleTest",
                    "teachersSlice/save_schedule_status",
                    "organisation_slice/change_password",
                    "organisation_slice/create_admin",
                    "teachersSlice/update_Create_student",
                    "teachersSlice/updatePostStudentData",
                    "teachersSlice/updatePostClassroomsData",
                    "teachersSlice/updatePostSubjectsData",
                    "organisation_slice/edit_organization",
                    "teachersSlice/selected_students_in_schedule"
                ].includes(action.type),

                (state, action) => {
                    const obj1 = action.payload;
                    const obj2 = state.app_data.validationMessage;

                    for (let key in obj1) {
                        if (obj2.hasOwnProperty(key)) {
                            delete obj2[key];
                        }
                    }
                }
            );
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
    logout, handleusernotesdata, handlePostNote, handleDeleteNote,
    update_note_data, edit_note_data,view_notes_data
} = actions;

export default reducer