import axiosInstance from "Services/axiosInstance"
import { change_password, clearSettingsInputs, create_admin, delete_admin, edit_organization, updateAdminList, updateOrganizationInfo, updateOrgProfileInputs } from "../Slices/Organisation_slice"
import sha256 from "sha256"


export const getOrganizationInfo = () => async (dispatch) => {
    try {
        dispatch(updateOrganizationInfo({ type: "request" }))
        const { data } = await axiosInstance.get('/organization/get_organization_info')
        if (data?.error_code === 0) {
            dispatch(updateOrganizationInfo({ type: "success", data: data?.data }))
        } else {
            dispatch(updateOrganizationInfo({ type: "failure", message: data?.message || "Failed to fetch organization information" }))
        }
    } catch (error) {
        dispatch(updateOrganizationInfo({ type: "failure", message: error?.response?.data?.message || "Failed to fetch organization information" }))
    }
}

export const getAdminList = (payload) => async (dispatch) => {
    try {
        dispatch(updateAdminList({ type: "request" }))
        const { data } = await axiosInstance.post('/organization/get_admin_list', payload)
        if (data?.error_code === 0) {
            dispatch(updateAdminList({ type: "success", data: data?.data }))
        } else {
            dispatch(updateAdminList({ type: "failure", message: data?.message || "Failed to fetch admin information" }))
        }
    } catch (error) {
        dispatch(updateAdminList({ type: "failure", message: error?.response?.data?.message || "Failed to fetch admin information" }))

    }
}

export const deleteAdmin = (admin_id) => async (dispatch, getState) => {
    try {
        dispatch(delete_admin({ type: "request" }))
        const { data } = await axiosInstance.delete(`/organization/delete_admin?admin_id=${admin_id}`,)
        if (data?.error_code === 0) {
            const { searchInputs } = getState()?.superadminState
            dispatch(delete_admin({ type: "response" }))
            dispatch(getAdminList({ page: searchInputs?.currentPage + 1 || 1, search_query: searchInputs?.searchValue || '', show_entries: 7 }))
            dispatch(getOrganizationInfo())
        } else {
            dispatch(delete_admin({ type: "failure", message: data?.message || "Failed to delete admin" }))
        }
    } catch (error) {
        dispatch(delete_admin({ type: "failure", message: error?.response?.data?.message || "Failed to delete admin" }))
    }

}

export const handleCreateAdmin = (payload) => async (dispatch) => {
    const {admin_name,institute_name,email_id } = payload
    if (!admin_name || !institute_name || !email_id) {
        return dispatch(create_admin({ type: "failure", message: "Some fields are empty" }))
    }

    if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email_id)){
        return dispatch(create_admin({ type: "failure", message: "Please enter valid email" }))
    }
    try {
        dispatch(create_admin({ type: "request" }))
        const { data } = await axiosInstance.post('/organization/invite_admin', payload)
        if (data?.error_code === 0) {
            dispatch(create_admin({ type: "response" }))
        } else {
            dispatch(create_admin({ type: "failure", message: data?.message || "Failed to create Admin" }))
        }

    } catch (error) {
        dispatch(create_admin({ type: "failure", message: error?.response?.data?.message || "Something went wrong" }))

    }
}

export const getOrganizationProfileDetails = () => async (dispatch) => {
    try {
        dispatch(updateOrgProfileInputs({type:"request"}))
        const { data } = await axiosInstance.get('/profile')
        if(data?.error_code === 0){
            let profileDetails = data?.data?.[0] || {}
            dispatch(updateOrgProfileInputs({type:"success",data:{ ...profileDetails,is_loading:false}}))
        }else{
             dispatch(updateOrgProfileInputs({type:"failure",message: data?.message || "Failed to get profile details"}))
        }
    } catch (error) {
         dispatch(updateOrgProfileInputs({type:"failure",message: error?.response?.data?.message || "Failed to get profile details"}))
    
    }
}

export const editOrgProfileDetails = (payload) => async (dispatch) => {
    try {
        const {first_name,last_name,phone_number,email_id ,address} = payload
        if(!first_name|| !last_name|| !phone_number || !email_id || !address){
            return dispatch(edit_organization({ type: "failure", message:"All fields are required" }))
        } 
        dispatch(edit_organization({ type: "request" }))
        const { data } = await axiosInstance.put('/profile', payload)
        if (data?.error_code === 0) {
            dispatch(edit_organization({ type: "response" }))
            dispatch(getOrganizationProfileDetails())
        } else {
            dispatch(edit_organization({ type: "failure", message: data?.message || "Failed to edit profile details" }))
        }
    } catch (error) {
        dispatch(edit_organization({ type: "failure", message: error?.response?.data?.message || "Failed to edit profile details" }))
    }
}

export const changeOrgPassword = (payload,navigate) => async (dispatch) => {
    try {
        let { old_password, new_password, confirm_password } = payload
        old_password = old_password?.trim()
        new_password = new_password?.trim()
        confirm_password = confirm_password?.trim()

        if (!old_password|| !new_password|| !confirm_password) {
            return dispatch(change_password({ type: "failure", message: "All fields are required" }))
        }
        
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,20}$/.test(new_password)) {
            return dispatch(change_password({
                type: "failure",
                message: "Password should contain 8–20 characters, with at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
            }))
        } 
        
        if (old_password === new_password) {
                return dispatch(change_password({
                    type: "failure",
                    message: "New password must be different from old password"
                }))
            }
        if (new_password != confirm_password) {
                return dispatch(change_password({ type: "failure", message: "New password and Confirm password must match" }))
            }
        dispatch(change_password({ type: "request" }))
        const { data } = await axiosInstance.put('/change_password', {
            old_password: sha256(old_password),
            new_password: sha256(new_password),
            confirm_password: sha256(confirm_password)
        })
        if (data?.error_code === 0) {
            dispatch(change_password({ type: "success" }))
            dispatch(clearSettingsInputs())
            navigate('/organisation_dashboard/org_profile')
        } else {
            dispatch(change_password({ type: "failure", message: data?.message || "Failed to change password" }))
        }
    } catch (error) {
        dispatch(change_password({ type: "failure", message: error?.response?.data?.message || error?.message || "Failed to change password" }))
    }

}