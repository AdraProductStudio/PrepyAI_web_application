import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    isProfileEditing: false,
    profileInputs: {
        first_name: "",
        last_name: "",
        email_id: "",
        phone_number: "",
    },
    editProfileInputs: {

    },
    settingsInputs: {
        old_password: "",
        confirm_password: "",
        new_password: ""
    },
    createOrganization: {
        email_id: "",
        organization_name: ""

    },
    organizationDetails: [],
    subcriptionDetails: {},
    monthlyReports: []
}

const adminSlice = createSlice({
    name: 'admin_slice',
    initialState,
    reducers: {
        updatePersonalInfoInputs: (state, action) => {
            const { first_name, last_name, email_id, phone_number } = action?.payload?.[0]
            state.profileInputs.first_name = first_name
            state.profileInputs.last_name = last_name
            state.profileInputs.email_id = email_id
            state.profileInputs.phone_number = phone_number
            state.editProfileInputs.first_name = first_name
            state.editProfileInputs.last_name = last_name
            state.editProfileInputs.email_id = email_id
            state.editProfileInputs.phone_number = phone_number
        },
        edit_profile_Inputs: (state, action) => {
            const { field, value } = action.payload;
            state.editProfileInputs[field] = value

        },
        updateCreateOrgInputs: (state, action) => {
            const { field, value } = action.payload;
            state.createOrganization[field] = value
        },

        updateSettingsInputs: (state, action) => {
            const { field, value } = action.payload;
            state.settingsInputs[field] = value
        },
        updateOrganizationDetails: (state, action) => {
            state.organizationDetails = action.payload
        },
        updateSubcriptionDetails: (state, action) => {
            state.subcriptionDetails = action?.payload
        },
        updateMonthlyReports: (state, action) => {
            state.monthlyReports = action.payload
        },
        updateProfileEditing: (state, action) => {
            state.isProfileEditing = !state.isProfileEditing
        }
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

                }
            })
    }
})

const { actions, reducer } = adminSlice;

export const {
    updatePersonalInfoInputs,
    updateSettingsInputs,
    updateOrganizationDetails,
    updateSubcriptionDetails,
    updateMonthlyReports,
    updateCreateOrgInputs,
    updateProfileEditing,
    edit_profile_Inputs
} = actions

export default reducer