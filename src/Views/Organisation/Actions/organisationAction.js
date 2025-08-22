import axiosInstance from "Services/axiosInstance"
import { update_error, updateModalShow } from "Views/Common/Slices/Common_slice"
import { updateAdminList, updateOrganizationInfo, updateOrgProfileInputs } from "../Slices/Organisation_slice"



export const getOrganizationInfo = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get('/organization/get_organization_info')
        if (data?.error_code === 0) {
            dispatch(updateOrganizationInfo(data?.data))
        } else {
            dispatch(update_error({ Err: data?.message || "Failed to fetch organization information", Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    }
}

export const getAdminList = (payload) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.post('/organization/get_admin_list', payload)
        if (data?.error_code === 0) {
            dispatch(updateAdminList(data?.data))
        } else {
            dispatch(update_error({ Err: data?.message || "Failed to fetch admin information", Toast_Type: "error" }))
        }
    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))

    }
}

export const deleteAdmin = (admin_id) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.post('/organization/delete_admin', admin_id)

    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    }

}

export const createAdmin = (payload) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.post('/organization/invite_admin', payload)

    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))

    }
}

export const getOrganizationProfileDetails = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get('/organization/get_profile')
        dispatch(updateOrgProfileInputs(data?.data))


    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    }
}

export const editOrgProfileDetails = (payload) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.post('/organization/edit_profile', payload)
        if (data?.error_code === 1) {
            dispatch(updateModalShow({ show: false }))
            dispatch(getOrganizationProfileDetails())
        }
    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))

    }
}

export const changeOrgPassword = (payload) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.post('/organization/update_password', payload)
        if (data?.error_code == 1) {
            // dispatch(clearSettingsInputs(1))
        }

    } catch (error) {
        dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))

    }

}