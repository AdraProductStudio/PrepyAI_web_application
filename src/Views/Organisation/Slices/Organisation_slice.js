import { createSlice } from "@reduxjs/toolkit"; 
// import { decrypt_app_data_logs, view_logout } from "ResuableFunctions/logs_handler";

let initialState = {
    profileInputs: {
        first_name: "",
        last_name: "",
        phone_number: "",
        email_id: "",
        address: ""
    },
    editProfileInputs: {

    },
    settingsInputs: {
        old_password: "",
        confirm_password: "",
        new_password: ""
    },
    createAdminInputs: {
        admin_name: "",
        institute_name: "",
        email_id: ""
    },
    organizationInfo:{},
    adminList:{}


}

const OrganisationSlice = createSlice({
    name: "organisation_slice",
    initialState,
    reducers: {
        updateOrgProfileInputs: (state, action) => {
            const { first_name, last_name, email_id, phone_number,address } = action?.payload?.[0]
            state.profileInputs.first_name = first_name
            state.profileInputs.last_name = last_name
            state.profileInputs.email_id = email_id
            state.profileInputs.phone_number = phone_number
            state.profileInputs.address = address
            state.editProfileInputs.address = address
            state.editProfileInputs.first_name = first_name
            state.editProfileInputs.last_name = last_name
            state.editProfileInputs.email_id = email_id
            state.editProfileInputs.phone_number = phone_number
        },
         edit_org_profile_Inputs: (state, action) => {
            const { field, value } = action.payload;
            state.editProfileInputs[field] = value

        },

        updateOrgSettingsInputs: (state, action) => {
            const { field, value } = action.payload
            state.settingsInputs[field] = value
        },
          updateCreateAdminInputs: (state, action) => {
            const { field, value } = action.payload
            state.createAdminInputs[field] = value
        },
        updateOrganizationInfo:(state,action)=>{
            state.organizationInfo = action.payload
        },
        updateAdminList:(state,action)=>{
            state.adminList = action.payload
        },
        clearSettingsInputs: (state, action) => {
            state.settingsInputs ={
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: ""
            }

        }
    },
   extraReducers(builder) {
        builder
            .addCase("common_slice/updateModalShow", (state, action) => {
                const { show } = action.payload
                if (!show) {
                    state.createAdminInputs = {
                        admin_name: "",
                        institute_name: "",
                        email_id: ""
                    }

                }
            })
    }
})

const { actions, reducer } = OrganisationSlice;

export const { 
    updateOrgProfileInputs,
    updateOrgSettingsInputs,
    updateOrganizationInfo,
    updateAdminList,
    updateCreateAdminInputs,
    edit_org_profile_Inputs,
    clearSettingsInputs 
} = actions

export default reducer