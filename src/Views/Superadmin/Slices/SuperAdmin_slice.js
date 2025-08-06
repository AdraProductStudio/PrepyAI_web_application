import { createSlice } from "@reduxjs/toolkit";

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

const superAdminSlice = createSlice({
    name: 'superAdmin_slice',
    initialState,
    reducers: {
        updatePersonalInfoInputs: (state, action) => {
            const { field, value } = action.payload;
            state.profileInputs[field] = value
        },

        updateSettingsInputs: (state, action) => {
            const { field, value } = action.payload;
            state.settingsInputs[field] = value
        }
    }
})

const { actions, reducer } = superAdminSlice;

export const {
    updatePersonalInfoInputs, updateSettingsInputs
} = actions

export default reducer