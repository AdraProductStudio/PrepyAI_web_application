import { useCommonState, useDispatch } from "Components/CustomHooks"
import Icons from "Utils/Icons"
import { edit_profile_Inputs, updateCreateOrgInputs, updatePersonalInfoInputs, updateSettingsInputs } from "../Slices/SuperAdmin_slice"


const JsonData = (params={}) => {
const {commonState,superadminState} = useCommonState()
const dispatch = useDispatch()
const { subcriptionDetails } = params
    const jsonOnly = {
        sidebar_data: [
            {
                name: "Dashboard",
                icon: Icons.sidebar_dashboard_icon,
                active_icon: Icons.sidebar_dashboard_active_icon,
                route: '/superadmin_dashboard/home'
            }
        ],
        monthltyGrowOptions: [
            { id: 1, name: 2025 },
            { id: 2, name: 2024 },
            { id: 3, name: 2023 },
        ],

        planFilterOptions: [
            { id: 1, name: "All Plans",value:"all_plans" },
            { id: 2, name: "Basic Plan",value:"basic" },
            { id: 3, name: "Premimum Plan",value:"premium" },
            { id: 4, name: "Platinum Plan",value:"platinum" },
            { id: 5, name: "Enterprise Plan",value:"enterprise" }
        ],

        monthlyGrowthData: [
            { month: "Jan", value: 100 },
            { month: "Feb", value: 30 },
            { month: "Mar", value: 60 },
            { month: "Apr", value: 75 },
            { month: "May", value: 20 },
            { month: "Jun", value: 95 },
            { month: "Jul", value: 55 },
            { month: "Aug", value: 80 },
            { month: "Sep", value: 100 },
            { month: "Oct", value: 90 },
            { month: "Nov", value: 40 },
            { month: "Dec", value: 70 },
        ],

        cardInputs: [
            {
                icon: Icons.organisation,
                title: "Total No.of Organization",
                value: subcriptionDetails?.total_orgs,
            },
            {
                icon: Icons.revenue,
                title: "Total Revenue",
                value: subcriptionDetails?.total_revenue,
            }
        ],

        planData: [
            { name: "Basic Plan", value: Number(subcriptionDetails?.basic), color: "hsla(266, 100%, 83%, 1)" },
            { name: "Premium Plan", value: Number(subcriptionDetails?.premium), color: "hsla(339, 100%, 71%, 1)" },
            { name: "Platinum Plan", value: Number(subcriptionDetails?.platinum), color: "hsla(31, 70%, 78%, 1)" },
            { name: "Enterprise", value: Number(subcriptionDetails?.enterprise), color: "hsla(354, 100%, 82%, 1)" }
        ],

        tableHeadings: [
            "S.No",
            "Organization Name",
            "Name",
            "Contact No",
            "Email",
            "Location",
            "Subscription Plan",
            "Created Date",
            "Subscription Duration",
            "Action"
        ],


        // Profile //

        profileNavItems: [
            {
                name: "Personal Information",
                icon: Icons.profile,
                to: "/superadmin_dashboard/profile"
            },
            {
                name: "Settings",
                icon: Icons.settings,
                to: "/superadmin_dashboard/profile/settings"
            },
            // {
            //   name: "Time Table",
            //   icon: <CiSettings />,
            //   to: "/profile/timetable"
            // }
        ],

        settingsInputs: [
            {
                label: "Current Password",
                id: "currentPassword",
                placeholder: "Current Password"
            },
            {
                label: "New Password",
                id: "newPassword",
                placeholder: "New Password"
            },
            {
                label: "Confirm New Password",
                id: "confirmNewPassword",
                placeholder: "Confirm New Password"
            }
        ],


        personalInfoInputs: [
            {
                type: "text",
                label: "Name",
                id: "name",
            },
            {
                type: "text",
                label: "Last Name",
                id: "lastName",
            },
            {
                type: "number",
                label: "Mobile Number",
                id: "mobileNumber",
            },
            {
                type: "email",
                label: "Email Address",
                id: "email",
            }
        ]


    }

    const jsxJson = {
        create_organization: [
                    {
                        name: "Organization Name",
                        type: "text",
                        title:" ",
                        category: "input",
                        placeholder: "",
                        value: superadminState?.createOrganization?.organization_name || '',
                        change: (e) => dispatch(updateCreateOrgInputs({ field: 'organization_name', value: e.target.value })),
                        // keyDown: (e) => {
                        //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                        // },
                        divClassName: "mb-3",
                        isMandatory: false,
                        Err: commonState?.app_data?.validated && !superadminState?.createOrganization?.organization_name  ? "Organization name required" : null
                    },
                    {
                        name: "Email Id ",
                        type: "text",
                        title:"",
                        category: "input",
                        placeholder: "",
                        value: superadminState?.createOrganization?.email_id || '',
                        change: (e) => dispatch(updateCreateOrgInputs({ field: 'email_id', value: e.target.value })),
                        // keyDown: (e) => {
                        //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                        // },
                        divClassName: "mb-3",
                        isMandatory: false,
                        Err: commonState?.app_data?.validated && !superadminState?.createOrganization?.email_id ? "Email required" : null
                    },
                    
                ],
        profile_details:[
            {
                name: "First Name",
                value: superadminState?.profileInputs?.first_name || '',
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                divClassName: "mb-3 col-12 col-lg-8",
            },
            {
                name: "Last Name",
                value: superadminState?.profileInputs?.last_name || '',
                 type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                divClassName: "mb-3 col-12 col-lg-8",
            },
            {
                name: "Email",
                value: superadminState?.profileInputs?.email_id || '',
                 type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                divClassName: "mb-3  col-12 col-lg-8",
            },
            {
                name: "Phone Number",
                value: superadminState?.profileInputs?.phone_number || '',
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                divClassName: "mb-3  col-12 col-lg-8",
            }

        ],
        
        super_admin_profile: [
            {
                name: "First Name",
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                value:superadminState?.editProfileInputs?.first_name || '',
                change: (e) => dispatch(edit_profile_Inputs({ field: 'first_name', value: e.target.value })),
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                Err: commonState?.app_data?.validated && !superadminState?.editProfileInputs?.first_name ? "First name required" : null
            },
            {
                name: "Last Name",
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                value:superadminState?.editProfileInputs?.last_name || '',
                change:(e) => dispatch(edit_profile_Inputs({ field: 'last_name', value: e.target.value })),
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                Err: commonState?.app_data?.validated && !superadminState?.editProfileInputs?.last_name ? "Last name required" : null
            },
            {
                name: "Email",
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                value:superadminState?.editProfileInputs?.email_id || '',
                change:(e) => dispatch(edit_profile_Inputs({ field: 'email_id', value: e.target.value })),
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                Err: commonState?.app_data?.validated && !superadminState?.editProfileInputs?.email_id ? "Email required" : null
            },
            {
                name: "Phone Number",
                type: "text",
                title: " ",
                category: "input",
                placeholder: "",
                value: superadminState?.editProfileInputs?.phone_number ||'',
                change:(e) => dispatch(edit_profile_Inputs({ field: 'phone_number', value: e.target.value })),
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                Err: commonState?.app_data?.validated && !superadminState?.editProfileInputs?.phone_number ? "Phone Number required" : null
            },

        ],
        settings_details:[
             {
                name: "Current Password",
                type: "text",
                title: " ",
                category: "input",
                placeholder: "Current Password",
                value:superadminState?.settingsInputs?.old_password || '',
                change: (e) => dispatch(updateSettingsInputs({ field: 'old_password', value: e.target.value })),
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                Err: commonState?.app_data?.validated && !superadminState?.settingsInputs?.old_password ? "First name required" : null
            },
            {
                name: "New Password",
                type: "text",
                title: " ",
                category: "input",
                placeholder: "Current Password",
                value:superadminState?.settingsInputs?.confirm_password || '',
                change: (e) => dispatch(updateSettingsInputs({ field: 'confirm_password', value: e.target.value })),
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                Err: commonState?.app_data?.validated && !superadminState?.settingsInputs?.confirm_password ? "Confirm Password required" : null
            },
            {
                name: "Confirm Password",
                type: "text",
                title: " ",
                category: "input",
                placeholder: "Confirm Password",
                value:superadminState?.settingsInputs?.new_password || '',
                change: (e) => dispatch(updateSettingsInputs({ field: 'new_password', value: e.target.value })),
                // keyDown: (e) => {
                //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                // },
                divClassName: "mb-3",
                isMandatory: false,
                Err: commonState?.app_data?.validated && !superadminState?.settingsInputs?.new_password ? "New password required" : null
            },

        ]

    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData

