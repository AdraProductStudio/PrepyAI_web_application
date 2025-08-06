import { createSlice } from "@reduxjs/toolkit"; 
// import { decrypt_app_data_logs, view_logout } from "ResuableFunctions/logs_handler";

let initialState = {
    profileInputs: {
        name: "",
        lastName: "",
        mobileNumber: "",
        email: "",
        address: ""
    },
    settingsInputs: {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    }

}

const OrganisationSlice = createSlice({
    name: "organisation_slice",
    initialState,
    reducers: {
        updateOrgProfileInputs: (state, action) => {
            const { field, value } = action.payload
            state.profileInputs[field] = value
        },

        updateOrgSettingsInputs: (state, action) => {
            const { field, value } = action.payload
            state.settingsInputs[field] = value
        }
    }
})

const { actions, reducer } = OrganisationSlice;

export const { 
    updateOrgProfileInputs,
    updateOrgSettingsInputs 
} = actions

export default reducer