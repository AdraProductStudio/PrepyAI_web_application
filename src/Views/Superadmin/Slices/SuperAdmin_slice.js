import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    isProfileEditing: false,
    profileInputs: {},
    editProfileInputs: {},
    settingsInputs: {},
    createOrganization: {},
    organizationDetails: {},
    subcriptionDetails: {},
    monthlyReports: {},
    selected_org_to_delete: {},
    filter_params: {
        page: 1,
        show_entries: 10,
        search_query: '',
        filter_by: 'all_plans'
    },
    settings_password : {
      show_old_password : false,
      show_new_password : false,
      show_confirm_password : false,
    }
}

const adminSlice = createSlice({
    name: 'admin_slice',
    initialState,
    reducers: {
        edit_profile_Inputs(state, action) {
            const { field, value } = action.payload;
            state.editProfileInputs[field] = value

        },
        updateCreateOrgInputs(state, action) {
            const { field, value } = action.payload;
            state.createOrganization[field] = value
        },

        updateSettingsInputs(state, action) {
            const { field, value } = action.payload;
            state.settingsInputs[field] = value
        },
        updateOrganizationDetails(state, action) {
            state.organizationDetails = action.payload
        },
        updateSubcriptionDetails(state, action) {
            const subcription = action.payload
            Object.entries(subcription).forEach(([key, value]) => {
                state.subcriptionDetails[key] = value
            })
        },
        updateProfileEditing(state) {
            state.isProfileEditing = !state.isProfileEditing
        },

        create_organisation(state, action) {
            const { type, data } = action.payload;
            switch (type) {
                case "request":
                    state.createOrganization.is_sending = true
                    break;

                case "success":
                    state.createOrganization.is_sending = false
                    state.createOrganization.email_id = ""
                    state.createOrganization.organization_name = ""
                    break;

                case "failure":
                    state.createOrganization.is_sending = false
                    break;

                default:
                    break;
            }
        },
        subscription_details(state, action) {
            const { type, data } = action.payload;

            switch (type) {
                case "request":
                    state.subcriptionDetails.is_fetching = true
                    break;

                case "response":
                    state.subcriptionDetails.is_fetching = false
                    Object.entries(data).forEach(([key, value]) => {
                        state.subcriptionDetails[key] = value
                    })
                    break;

                case "failure":
                    state.subcriptionDetails.is_fetching = false
                    break;

                default:
                    break;
            }
        },
        monthly_report_details(state, action) {
            const { type, data } = action.payload;

            switch (type) {
                case "request":
                    state.monthlyReports.is_fetching = true
                    state.monthlyReports.data = []
                    break;

                case "response":
                    state.monthlyReports.is_fetching = false
                    state.monthlyReports.data = data
                    break;

                case "failure":
                    state.monthlyReports.is_fetching = false
                    break;

                default:
                    break;
            }
        },
        get_organinsation_details(state, action) {
            const { type, data, pricing_by } = action.payload;

            switch (type) {
                case "request":
                    if (pricing_by || pricing_by === '')
                        state.filter_params.filter_by = pricing_by || 'all_plans'

                    state.organizationDetails.is_fetching = true
                    state.organizationDetails.data = []
                    state.organizationDetails.total_count = 0
                    break;

                case "response":
                    state.organizationDetails.is_fetching = false
                    state.organizationDetails.total_count = data?.total_count
                    state.organizationDetails.data = data?.organization_list
                    break;

                case "failure":
                    state.organizationDetails.is_fetching = false
                    break;

                default:
                    break;
            }
        },
        get_profile_details(state, action) {
            const { type, data } = action.payload;
            switch (type) {
                case "request":
                    state.profileInputs.is_fetching = true
                    break;

                case "response":
                    state.profileInputs.is_fetching = false
                    Object.entries(data).forEach(([key, value]) => {
                        state.profileInputs[key] = value
                    })

                    Object.entries(data).forEach(([key, value]) => {
                        state.editProfileInputs[key] = value
                    })
                    break;

                case "failure":
                    state.profileInputs.is_fetching = false
                    break;

                default:
                    break;
            }
        },
        edit_profile_Inputs_endpoint(state, action) {
            const { type } = action.payload;

            switch (type) {
                case "request":
                    state.editProfileInputs.is_fetching = true
                    break;

                case "response":
                    state.editProfileInputs.is_fetching = false
                    break;

                case "failure":
                    state.editProfileInputs.is_fetching = false
                    break;

                default:
                    break;
            }
        },
        change_password_endpoint(state, action) {
            const { type } = action.payload;

            switch (type) {
                case "request":
                    state.change_password_is_saving = true
                    break;

                case "response":
                    state.change_password_is_saving = false
                    state.settingsInputs = {
                        old_password: "",
                        confirm_password: "",
                        new_password: ""
                    }
                    break;

                case "failure":
                    state.change_password_is_saving = false
                    break;

                default:
                    break;
            }
        },

        selectOrgToDelete(state, action) {
            state.selected_org_to_delete = action.payload
        },
        dele_organisation_endpoint(state, action) {
            const { type, data } = action.payload;

            switch (type) {
                case "request":
                    state.organisation_delete_spinner = true
                    break;

                case "response":
                    let deletedOrg = data?.data?.filter(org => org?.id !== data?.org_id)

                    state.organisation_delete_spinner = false
                    state.organizationDetails.data = deletedOrg
                    state.organizationDetails.total_count = deletedOrg?.length
                    break;

                case "failure":
                    state.organisation_delete_spinner = false
                    break;

                default:
                    break;
            }
        },
        update_settings_eye(state, action) {
            const [key , value] = Object.entries(action.payload || {})?.[0]
            state.settings_password[key] = value || false
        },
    },
    extraReducers(builder) {
        builder
            .addCase("common_slice/updateModalShow", (state, action) => {
                const { show } = action.payload
                if (!show) {
                    state.createOrganization = {
                        email_id: "",
                        organization_name: ""
                    }
                    state.selected_org_to_delete = {}
                }
            })


            .addCase("common_slice/update_app_data", (state, action) => {
                const { type } = action.payload
                if (type === "pagination") {
                    state.filter_params.page = action.payload?.data?.currentPage || 1;
                }
            })
    }
})

const { actions, reducer } = adminSlice;

export const {
    updateSettingsInputs,
    updateOrganizationDetails,
    updateSubcriptionDetails,
    updateCreateOrgInputs,
    updateProfileEditing,
    edit_profile_Inputs, create_organisation,
    selectOrgToDelete,
    subscription_details, get_profile_details,
    monthly_report_details, get_organinsation_details,
    edit_profile_Inputs_endpoint, change_password_endpoint,
    dele_organisation_endpoint,
    update_settings_eye
} = actions

export default reducer