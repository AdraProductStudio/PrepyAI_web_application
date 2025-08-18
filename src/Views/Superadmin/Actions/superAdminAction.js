import { update_error, updateModalShow } from "Views/Common/Slices/Common_slice"
import { updateFilteredOrganizationDetails, updateMonthlyReports, updateOrganizationDetails, updatePersonalInfoInputs, updateSubcriptionDetails } from "../Slices/SuperAdmin_slice"
import axiosInstance from "Services/axiosInstance"

export const getOrganizationList = (payload) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post('/super_admin/get_organization_list', payload)
    if(data?.error_code === 0){
        dispatch(updateOrganizationDetails(data?.data?.organization_list))
    }else{
        dispatch(update_error({Err:data?.message|| "Failed to fetch organization list",Toast_Type:"error"}))
    }
  } catch (error) {
    console.log("Error in getOrganizationList", error)
    dispatch(update_error({Err: error?.response?.data?.message || error?.message || "Something went wrong",Toast_Type: "error"}))
  }
}

export const getSubcriptionDetails = ()=>async (dispatch)=>{
  try {
    const { data } = await axiosInstance.get('/super_admin/get_subcription_details')
    if(data?.error_code === 0){
        dispatch(updateSubcriptionDetails(data?.data?.[0]))
    }else{
      dispatch(update_error({Err:data?.message|| "Failed to fetch subscription details",Toast_Type:"error"}))
    }   
  } catch (error) {
     console.log("Error in getSubcriptionDetails", error)
    dispatch(update_error({Err: error?.response?.data?.message || error?.message || "Something went wrong",Toast_Type: "error"}))
    
  }
}

export const getMonthlyReportDetails = (year)=>async (dispatch)=>{
  try {
    const { data } = await axiosInstance.post('/super_admin/get_monthly_report',{year})
    if(data?.error_code === 0){
        dispatch(updateMonthlyReports(data?.data))
    }else{
      dispatch(update_error({Err:data?.message|| "Failed to fetch monthly details",Toast_Type:"error"}))
    }   
  } catch (error) {
     console.log("Error in getMonthlyReportDetails", error)
    dispatch(update_error({Err: error?.response?.data?.message || error?.message || "Something went wrong",Toast_Type: "error"}))
    
  }
}

export const deleteOrganisation = (org_id) => async (dispatch) => {
  try {
    const {data} = await axiosInstance.delete('/super_admin/delete_organization',org_id)
    console.log(data,'54-data')

  } catch (error) {
    console.log("Error in getMonthlyReportDetails", error)
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
  }
}

export const createOrganization = (payload) => async(dispatch)=>{
  try {
    const {data} = await axiosInstance.post('/super_admin/invite',payload)
    console.log(data,'data')
    
  } catch (error) {
    console.log("Error in getMonthlyReportDetails", error)
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
  }
  
}

export const getProfileDetails = ()=>async(dispatch)=>{
  try {
     const {data} = await axiosInstance.get('/super_admin/get_profile')
    dispatch(updatePersonalInfoInputs(data?.data))
    
  } catch (error) {
    console.log("Error in getProfileDetails", error)
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    
  }
}

export const editProfileDetails = (payload) => async (dispatch)=>{
  try {
      const {data} = await axiosInstance.post('/super_admin/edit_profile',payload)
      dispatch(updateModalShow({show:false}))
      console.log(data,'data')
  } catch (error) {
     console.log("Error in editProfileDetails", error)
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    
  }
}

export const changePassword = (payload) => async(dispatch)=>{
  try {
      const {data} = await axiosInstance.post('/super_admin/update_password',payload)
      console.log(data,'data')
    
  } catch (error) {
    console.log("Error in editProfileDetails", error)
    dispatch(update_error({ Err: error?.response?.data?.message || error?.message || "Something went wrong", Toast_Type: "error" }))
    
  }

}
