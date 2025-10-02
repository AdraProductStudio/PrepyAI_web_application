import { change_password_endpoint, create_organisation, dele_organisation_endpoint, edit_profile_Inputs_endpoint, get_organinsation_details, get_profile_details, monthly_report_details, subscription_details } from "../Slices/SuperAdmin_slice"
import axiosInstance from "Services/axiosInstance"
import sha256 from "sha256"

export const getOrganizationList = (payload) => async (dispatch) => {
  try {
    dispatch(get_organinsation_details({
      type: 'request',
      pricing_by: payload?.filter_by || null,
      ...payload
    }))

    const { data } = await axiosInstance.post('/super_admin/get_organization_list', payload)

    if (data?.error_code === 0)
      dispatch(get_organinsation_details({ type: 'response', data: data?.data }))
    else
      dispatch(get_organinsation_details({ type: 'failure', message: data?.message || "Failed to fetch organization list" }))
  } catch (error) {
    dispatch(get_organinsation_details({ type: 'failure', message: error?.response?.data?.message || error?.message || "Something went wrong" }))
  }
}

export const getSubcriptionDetails = () => async (dispatch) => {
  try {
    dispatch(subscription_details({ type: "request" }))
    const { data } = await axiosInstance.get('/super_admin/get_subcription_details')

    if (data?.error_code === 0)
      dispatch(subscription_details({ type: "response", data: data?.data?.[0] }))
    else
      dispatch(subscription_details({ type: "failure", message: data?.message || "Failed to fetch subscription details" }))

  } catch (error) {
    dispatch(subscription_details({ type: "failure", message: error?.message || "Something went wrong" }))
  }
}

export const getMonthlyReportDetails = (year) => async (dispatch) => {
  try {
    dispatch(monthly_report_details({ type: "request" }))
    const { data } = await axiosInstance.post('/super_admin/get_monthly_report', { year })
    if (data?.error_code === 0) {
      dispatch(monthly_report_details({ type: "response", data: data?.data }))
    } else {
      dispatch(monthly_report_details({ type: "failure", message: data?.message || "Failed to fetch monthly details" }))
    }
  } catch (error) {
    dispatch(monthly_report_details({ type: "failure", message: error?.response?.data?.message || error?.message || "Something went wrong" }))
  }
}

export const deleteOrganisation = (params) => async (dispatch) => {
  try {
    dispatch(dele_organisation_endpoint({ type: "request" }))

    const { data } = await axiosInstance.delete(`/super_admin/delete_organization?org_id=${params?.org_id}`)
    if (data?.error_code === 0) {
      dispatch(dele_organisation_endpoint({ type: "response", data: { ...params } }))
    } else {
      dispatch(dele_organisation_endpoint({ type: "failure", message: data?.message || "Failed to fetch monthly details" }))
    }
  } catch (error) {
    dispatch(dele_organisation_endpoint({ type: "failure", message: error?.response?.data?.message || error?.message || "Something went wrong" }))
  }
}

export const createOrganization = (payload) => async (dispatch) => {
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
    dispatch(get_profile_details({ type: "request" }))
    const { data } = await axiosInstance.get('/profile')

    if (data?.error_code === 0) {
      dispatch(get_profile_details({ type: "response", data: data?.data[0] }))
    } else {
      dispatch(get_profile_details({ type: "failure", message: data?.message || "Failed to fetch profile details" }))
    }
  } catch (error) {
    dispatch(get_profile_details({ type: "failure", message: error?.response?.data?.message || error?.message || "Something went wrong" }))
  }
}

export const editProfileDetails = (payload) => async (dispatch) => {
  if (!payload?.first_name?.trim() || !payload?.last_name?.trim() || !payload?.email_id?.trim() || !payload?.email_id?.trim() || !payload?.phone_number?.trim())
    return dispatch(edit_profile_Inputs_endpoint({ type: "failure", message: "Some fields are empty" }))

  try {
    dispatch(edit_profile_Inputs_endpoint({ type: "request" }))

    const { data } = await axiosInstance.put('/profile', payload)
    if (data?.error_code === 0) {
      dispatch(edit_profile_Inputs_endpoint({ type: "response" }))
      dispatch(getProfileDetails())
    } else {
      dispatch(edit_profile_Inputs_endpoint({ type: "failure", message: data?.message || "Failed to edit profile details" }))
    }
  } catch (error) {
    dispatch(edit_profile_Inputs_endpoint({ type: "failure", message: error?.response?.data?.message || error?.message || "Something went wrong" }))
  }
}

export const changePassword = (payload, navigate) => async (dispatch) => {
  if (!payload?.old_password?.trim() || !payload?.new_password?.trim() || !payload?.confirm_password?.trim()) {
    return dispatch(change_password_endpoint({
      type: "failure",
      message: "Some fields are empty"
    }))
  }

  if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,20}$/.test(payload?.new_password)) {
    return dispatch(change_password_endpoint({
      type: "failure",
      message: "Password should contain 8–20 characters, with at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
    }))
  }

  if (payload?.old_password === payload?.new_password) {
    return dispatch(change_password_endpoint({
      type: "failure",
      message: "New password must be different from old password"
    }))
  }

  if (payload?.new_password !== payload?.confirm_password) {
    return dispatch(change_password_endpoint({
      type: "failure",
      message: "Passwords do not match"
    }))
  }

  const hash_payload = Object.fromEntries(
    Object.entries(payload).map(([key, value]) => [key, sha256(value)])
  );

  try {
    dispatch(change_password_endpoint({ type: "request" }))
    const { data } = await axiosInstance.put('/change_password', hash_payload)
    if (data?.error_code === 0) {
      dispatch(change_password_endpoint({ type: "response" }))
      navigate('/superadmin_dashboard/profile')
    } else {
      dispatch(change_password_endpoint({ type: "failure", message: data?.message || "Failed to edit profile details" }))
    }

  } catch (error) {
    dispatch(change_password_endpoint({ type: "failure", message: error?.response?.data?.message || error?.message || "Something went wrong" }))

  }

}