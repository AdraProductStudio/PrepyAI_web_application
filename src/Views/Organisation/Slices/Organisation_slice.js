import { createSlice } from "@reduxjs/toolkit"; 
// import { decrypt_app_data_logs, view_logout } from "ResuableFunctions/logs_handler";

let initialState = {
    profileInputs: {
        first_name: "",
        last_name: "",
        phone_number: "",
        email_id: "",
        address: "",
        is_loading:false,
    },
    editProfileInputs: {
        first_name: "",
        last_name: "",
        phone_number: "",
        email_id: "",
        address: "",
        is_editing:false,
    },
    settingsInputs: {
        old_password: "",
        confirm_password: "",
        new_password: "",
        is_editing:false
    },
    createAdminInputs: {
        admin_name: "",
        institute_name: "",
        email_id: "",
        is_sending:false
    },
    organizationInfo:{
        is_loading:false,
        data:{}
    },
    adminList:{
         is_loading:false,
         data:{}
    },
    selectedAdminToDel:{
        admin_id:null,
        name:"",
        is_spinner:false
    },
    searchInputs:{
        currentPage:0,
        searchValue:""
    }


}

const OrganisationSlice = createSlice({
    name: "organisation_slice",
    initialState,
    reducers: {
        updateOrgProfileInputs: (state, action) => {
            const {type,data}=action.payload
            switch(type){
                case "request":
                    state.profileInputs.is_loading=true
                    break;
                case "success":
                    Object.entries(data)?.forEach(([key,value])=>{
                        state.profileInputs[key]=value
                        state.editProfileInputs[key]=value
                    })
                    break;
                case "failure":
                     state.profileInputs.is_loading=false
                    break;
            }
        },
         edit_org_profile_Inputs: (state, action) => {
            const { field, value } = action.payload;
            state.editProfileInputs[field] = value
        },

        edit_organization : (state,action)=>{
            const { type ,data } = action.payload
            switch(type){
                case "request":
                    state.editProfileInputs.is_editing = true
                    break;
                case "response":
                    state.editProfileInputs.is_editing = false
                    break;
                case "failure":
                    state.editProfileInputs.is_editing = false
                    break;
            }

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
            const { type , data } = action.payload
            switch(type){
                case "request":
                    state.organizationInfo.is_loading = true
                    break;
                case "success":
                    state.organizationInfo.data = data
                    state.organizationInfo.is_loading = false
                    break;
                case "failure":
                    state.organizationInfo.is_loading = false
                    break;
            }
        },
        updateAdminList:(state,action)=>{
            const { type , data} = action.payload
            switch(type){
                case "request":
                    state.adminList.is_loading=true
                    break;
                case "success":
                    state.adminList.is_loading = false
                    state.adminList.data = data
                    break;
                case "failure" :
                     state.adminList.is_loading=false
                    break;
            }
        },
        change_password: (state, action) => {
            const {type,data} = action.payload
            switch(type){
                case "request":
                    state.settingsInputs.is_editing = true
                    break;
                case "success":
                     state.settingsInputs.is_editing = false
                    break;
                case "failure":
                     state.settingsInputs.is_editing = false
                    break
            }

        },
        clearSettingsInputs: (state) => {
            state.settingsInputs ={
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: ""
            }

        },
        create_admin:(state,action)=>{
            const { type,data} = action.payload
            switch(type){
                case "request":
                    state.createAdminInputs.is_sending = true
                    break;
                case "success":
                    state.createAdminInputs.is_sending = false
                    state.createAdminInputs.admin_name = ""
                    state.createAdminInputs.institute_name = ""
                    state.createAdminInputs.email_id = ""
                    break;
                case "failure" :
                    state.createAdminInputs.is_sending = false
                    break;
            }

        },
        updateSelectedAdminToDel:(state,action)=>{
            Object.entries(action?.payload)?.forEach(([key,value])=>{
                state.selectedAdminToDel[key]=value
            })

        },
        delete_admin: (state, action) => {
            const { type, data, message } = action.payload
            switch (type) {
                case "request":
                    state.selectedAdminToDel.is_spinner = true
                    break
                case "response":
                    state.selectedAdminToDel = {
                        admin_id: null,
                        name: "",
                        is_spinner: false
                    }
                    break
                case "failure":
                    state.selectedAdminToDel.is_spinner = false
                    break
            }
        },
        updateSearchInputs:(state,action)=>{
            Object.entries(action?.payload)?.forEach(([key,value])=>{
                state.searchInputs[key]=value

            })
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
                    state.selectedAdminToDel = {
                        admin_id: null,
                        name: "",
                        is_spinner: false
                    }
                    state.editProfileInputs = {
                            first_name: state?.profileInputs?.first_name,
                            last_name: state?.profileInputs?.last_name,
                            phone_number:state?.profileInputs?.phone_number,
                            email_id: state?.profileInputs?.email_id,
                            address: state?.profileInputs?.address,
                            is_editing: false,
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
    clearSettingsInputs,
    create_admin,
    updateSelectedAdminToDel,
    delete_admin,
    updateSearchInputs,
    edit_organization,
    change_password 
} = actions

export default reducer