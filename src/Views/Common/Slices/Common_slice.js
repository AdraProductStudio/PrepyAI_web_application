import { createSlice } from "@reduxjs/toolkit";
import { decrypt_app_data_logs, view_logout } from "ResuableFunctions/logs_handler";

let initialState = {
    login_data: {},
    modal: {
        show: false,
        size: "md",
        from: null,
        type: null,
        close_btn: false
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
        innerWidth: 0,
        innerHeight: 0,
        buttonSpinner: false,
        validated: false,
        token: decrypt_app_data_logs()?.access_token || '',
        user_role: decrypt_app_data_logs()?.role || '',
        user_id: decrypt_app_data_logs()?.user_id || '',
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
}

const commonSlice = createSlice({
    name: 'common_slice',
    initialState,
    reducers: {
        update_tab_render_app_data(state, action) {
            const { access_token, role, user_id } = action.payload;

            state.app_data.token = access_token || '';
            state.app_data.user_role = role || '';
            state.app_data.user_id = user_id || '';
        },
        updateModalShow(state, actions) {
            const { show, size, modal_from, modal_type, close_btn } = actions.payload;
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
                    state.app_data.currentMenuName = data || '';
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
        // update_login_data(state, action) {
        //     const [key, value] = Object.entries(action.payload)[0] || [];
        //     state.login_data[key] = value || '';
        // },
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

        // //Api 
        // login_reducer(state, actions) {
        //     const { type, data } = actions.payload || {};
        //     switch (type) {
        //         case "request":
        //             state.app_data.buttonSpinner = true;
        //             state.app_data.token = null;
        //             state.app_data.user_role = null;
        //             break;
        //         case "response":
        //             let decrypt_logs;
        //             let update_cookie_log;
        //             let roleKey = data?.role?.split(" ")?.join("");

        //             if (Cookies.get('project_log')) decrypt_logs = decryption();
        //             if (decrypt_logs) {
        //                 if (roleKey && !decrypt_logs?.hasOwnProperty(roleKey)) {
        //                     update_cookie_log = {
        //                         ...decrypt_logs,
        //                         [roleKey]: data || {}
        //                     };
        //                 } else {
        //                     update_cookie_log = { ...decrypt_logs };
        //                 }
        //             }
        //             else {
        //                 update_cookie_log = {
        //                     [roleKey]: data || {}
        //                 }
        //             }

        //             const encrypted_logs = encryption(update_cookie_log);
        //             Cookies.set('project_log', encrypted_logs);

        //             state.app_data.buttonSpinner = false;
        //             state.app_data.token = data?.token || '';
        //             state.app_data.user_role = data?.role || '';
        //             break;
        //         case "failure":
        //             state.app_data.buttonSpinner = false;
        //             state.error.Err = data?.message || 'Login failed';
        //             state.error.Toast_Type = data?.Toast_Type || "error";
        //             break;
        //         default:
        //             return
        //     }
        // },
        logout(state, actions) {
            view_logout();

            state.app_data.token = '';
            state.app_data.refresh_token = '';
            state.app_data.user_role = '';
            state.app_data.user_id = '';
        }
    }
})

// function setSuccessState(state, action) {
//     let error_message = typeof action.payload === 'object' ? action.payload?.message : action.payload;
//     state.error.Err = error_message;
//     state.error.Toast_Type = "success";
// }

// function setErrorState(state, action) {
//     let error_message = typeof action.payload === 'object' ? action.payload?.message : action.payload;
//     state.error.Err = error_message;
//     state.error.Toast_Type = "error";
// }

const { actions, reducer } = commonSlice;

export const {
    update_app_data, update_error,
    updateModalShow, update_search,
    // update_login_data,
    // login_reducer,
    logout, update_tab_render_app_data

} = actions;

export default reducer