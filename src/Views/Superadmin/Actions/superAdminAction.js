import { update_error, updateModalShow } from "Views/Common/Slices/Common_slice"
import { clearSettingsInputs, create_organisation, updateFilterInputs, updateMonthlyReports, updateOrganizationDetails, updatePersonalInfoInputs, updateSubcriptionDetails } from "../Slices/SuperAdmin_slice"
import axiosInstance from "Services/axiosInstance"

export const getOrganizationList = (payload) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post('/super_admin/get_organization_list', payload)
    if (data?.error_code === 0) {
      dispatch(updateOrganizationDetails(data?.data?.organization_list))
      dispatch(updateFilterInputs({total_count:data?.data?.total_count}))
    } else {
      dispatch(update_error({ Err: data?.message || "Failed to fetch organization list", Toast_Type: "error" }))
    }
  } catch (error) {
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
  }
}

export const getSubcriptionDetails = () => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get('/super_admin/get_subcription_details')
    if (data?.error_code === 0) {
      dispatch(updateSubcriptionDetails(data?.data?.[0]))
    } else {
      dispatch(update_error({ Err: data?.message || "Failed to fetch subscription details", Toast_Type: "error" }))
    }
  } catch (error) {
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
  }
}

export const getMonthlyReportDetails = (year) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post('/super_admin/get_monthly_report', { year })
    if (data?.error_code === 0) {
      dispatch(updateMonthlyReports(data?.data))
    } else {
      dispatch(update_error({ Err: data?.message || "Failed to fetch monthly details", Toast_Type: "error" }))
    }
  } catch (error) {
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
  }
}

export const deleteOrganisation = (org_id) => async (dispatch,getState) => {
  try {
    const { data } = await axiosInstance.delete(`/super_admin/delete_organization?org_id=${org_id}`)
    if(data?.error_code ===0){
      const {filterInputs } = getState()?.superadminState
      dispatch(getOrganizationList({ page: filterInputs?.currentPage + 1, show_entries: 10,search_query:filterInputs?.searchValue,filter_by:filterInputs?.filterValue }))
      dispatch(updateModalShow({show:false,close_btn:false,size:"",modal_from:"",modal_type:""}))
    }else{
       dispatch(update_error({ Err: data?.message || "Failed to fetch monthly details", Toast_Type: "error" }))
    }
  } catch (error) {
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
  }
}

export const createOrganization = (payload) => async (dispatch,getState) => {
  if (!payload?.email_id || !payload?.organization_name) return dispatch(create_organisation({ type: "failure", message: "Some fields are empty" }))

  try {
    dispatch(create_organisation({ type: "request" }))
    const { data } = await axiosInstance.post('/super_admin/invite', payload)

    if (data?.error_code === 0)
      dispatch(create_organisation({ type: "response" }))
    else
      dispatch(create_organisation({ type: "failure", message: data?.message || "Failed to create organization" }))
  } catch (error) {
    dispatch(create_organisation({ type: "failure", message: error?.response?.data?.message || error?.message || "Something went wrong" }))
  }
}

export const getProfileDetails = () => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get('/super_admin/get_profile')
    if (data?.error_code === 0) {
      dispatch(updatePersonalInfoInputs(data?.data))
    }else{
       dispatch(update_error({ Err: data?.message || "Failed to fetch profile details", Toast_Type: "error" }))
    }
  } catch (error) {
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
  }
}

export const editProfileDetails = (payload) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post('/super_admin/edit_profile', payload)
    if(data?.error_code === 0){
      dispatch(updateModalShow({ show: false }))
      dispatch(getProfileDetails())
    }else{
        dispatch(update_error({ Err: data?.message || "Failed to edit profile details", Toast_Type: "error" }))
    }
   
  } catch (error) {
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))

  }
}

export const changePassword = (payload) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post('/super_admin/update_password', payload)
    if(data?.error_code === 0){
      dispatch(clearSettingsInputs())
      dispatch(update_error({ Err: data?.message || "Password updated successfully", Toast_Type: "success" }))
    }else{
      dispatch(update_error({ Err: data?.message || "Failed to edit profile details", Toast_Type: "error" }))
    }

  } catch (error) {
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))

  }

}
