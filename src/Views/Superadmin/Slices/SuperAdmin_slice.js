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

const adminSlice = createSlice({
    name: 'admin_slice',
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

const { actions, reducer } = adminSlice;

export const {
    updatePersonalInfoInputs, updateSettingsInputs
} = actions

export default reducer