import { useCommonState, useDispatch } from "Components/CustomHooks";
import Icons from "Utils/Icons";
import { CiUser } from "react-icons/ci"
import { CiSettings } from "react-icons/ci";
import { edit_org_profile_Inputs, updateCreateAdminInputs, updateOrgSettingsInputs } from "../Slices/Organisation_slice";

const JsonData = () => {
  const dispatch = useDispatch()
  // const navigate = useCustomNavigate();
  const { commonState, organisationState } = useCommonState()


  const jsonOnly = {
    sidebar_data: [
      {
        name: "Dashboard",
        icon: Icons.sidebar_dashboard_icon,
        active_icon: Icons.sidebar_dashboard_active_icon,
        route: '/organisation_dashboard/home'
      },
      {
        name: "Pricing Plan",
        icon: Icons.sidebar_pricing_icon,
        active_icon: Icons.sidebar_pricing_active_icon,
        route: '/organisation_dashboard/pricing_plan'
      },
    ],
    dashboardCardInputs: [
      {
        icon: Icons.admins,
        title: "Total No.of Admins",
        value: organisationState?.organizationInfo?.data?.admins,
      },
      {
        icon: Icons.teachers,
        title: "Total No.of Teachers",
        value:organisationState?.organizationInfo?.data?.teachers,
      },
      {
        icon: Icons.billing,
        title: "Billing History",
        subTitle: "Total spent",
        value: organisationState?.organizationInfo?.data?.billing_history,
      },
    ],

    OrgDashboardTableHeadings: [
      "S.No",
      "Name",
      "Institute Name",
      "Role",
      "Contact No",
      "Email",
      "Location",
      "Action",
    ],

    orgDetails: [
      {
        name: "prakash",
        instituteName: "Prakash school",
        role: "Admin",
        contanctNo: 1234567890,
        email: "prakash@gmail.com",
        location: "Sulur, Coimbatore",
      },
      {
        name: "prakash2",
        instituteName: "Prakash school",
        role: "Admin",
        contanctNo: 1234567890,
        email: "prakash@gmail.com",
        location: "Sulur, Coimbatore",
      },
      {
        name: "prakash3",
        instituteName: "Prakash school",
        role: "Admin",
        contanctNo: 1234567890,
        email: "prakash@gmail.com",
        location: "Sulur, Coimbatore",
      },
      {
        name: "prakash4",
        instituteName: "Prakash school",
        role: "Admin",
        contanctNo: 1234567890,
        email: "prakash@gmail.com",
        location: "Sulur, Coimbatore",
      },
      {
        name: "prakash5",
        instituteName: "Prakash school",
        role: "Admin",
        contanctNo: 1234567890,
        email: "prakash@gmail.com",
        location: "Sulur, Coimbatore",
      },
      {
        name: "prakash6",
        instituteName: "Prakash school",
        role: "Admin",
        contanctNo: 1234567890,
        email: "prakash@gmail.com",
        location: "Sulur, Coimbatore",
      },
      {
        name: "prakash7",
        instituteName: "Prakash school",
        role: "Admin",
        contanctNo: 1234567890,
        email: "prakash@gmail.com",
        location: "Sulur, Coimbatore",
      },
      {
        name: "prakash8",
        instituteName: "Prakash school",
        role: "Admin",
        contanctNo: 1234567890,
        email: "prakash@gmail.com",
        location: "Sulur, Coimbatore",
      },
      {
        name: "prakash9",
        instituteName: "Prakash school",
        role: "Admin",
        contanctNo: 1234567890,
        email: "prakash@gmail.com",
        location: "Sulur, Coimbatore",
      },
      {
        name: "prakash10",
        instituteName: "Prakash school",
        role: "Admin",
        contanctNo: 1234567890,
        email: "prakash@gmail.com",
        location: "Sulur, Coimbatore",
      },
      {
        name: "prakash11",
        instituteName: "Prakash school",
        role: "Admin",
        contanctNo: 1234567890,
        email: "prakash@gmail.com",
        location: "Sulur, Coimbatore",
      },
      {
        name: "prakash12",
        instituteName: "Prakash school",
        role: "Admin",
        contanctNo: 1234567890,
        email: "prakash@gmail.com",
        location: "Sulur, Coimbatore",
      },
      {
        name: "prakash12",
        instituteName: "Prakash school",
        role: "Admin",
        contanctNo: 1234567890,
        email: "prakash@gmail.com",
        location: "Sulur, Coimbatore",
      },
      {
        name: "prakash14",
        instituteName: "Prakash school",
        role: "Admin",
        contanctNo: 1234567890,
        email: "prakash@gmail.com",
        location: "Sulur, Coimbatore",
      },
      {
        name: "prakash15",
        instituteName: "Prakash school",
        role: "Admin",
        contanctNo: 1234567890,
        email: "prakash@gmail.com",
        location: "Sulur, Coimbatore",
      },
    ],

    pricingPlan_navItems: [
      {
        name: "Monthly",
        to: "/organisation_dashboard/pricing_plan",
      },
      {
        name: "Annually",
        to: "/organisation_dashboard/pricing_plan/annually",
      }
    ],

    monthlyPlans: [
      {
        type: "Basic",
        desc: "Best for personal use.",
        active: false,
        amount: "20",
        features: ["Employee directory", "Task management", "Calendar integration", "File storage", "Communication tools", "Reporting and analytics"]
      },
      {
        type: "Premium",
        desc: "For large teams & corporations.",
        active: true,
        amount: "120",
        features: ["Advanced employee directory", "Project management", "Resource scheduling", "Version control", "Team collaboration", "Advanced analytics"]
      },
      {
        type: "Platinum",
        desc: "Best for business owners.",
        active: false,
        amount: "240",
        features: ["Customizable employee directory", "Client project management", "Client meeting schedule", "Compliance tracking", "Client communication", "Create custom reports tailored"]
      },
      {
        type: "Enterprise",
        desc: "Best for business owners.",
        active: false,
        amount: "240",
        features: ["Customizable employee directory", "Client project management", "Client meeting schedule", "Compliance tracking", "Client communication", "Create custom reports tailored"]
      }
    ],

    annualPlans: [
      {
        type: "Basic",
        desc: "Best for personal use.",
        active: false,
        amount: "20",
        features: ["Employee directory", "Task management", "Calendar integration", "File storage", "Communication tools", "Reporting and analytics"]
      },
      {
        type: "Premium",
        desc: "For large teams & corporations.",
        active: false,
        amount: "120",
        features: ["Advanced employee directory", "Project management", "Resource scheduling", "Version control", "Team collaboration", "Advanced analytics"]
      },
      {
        type: "Platinum",
        desc: "Best for business owners.",
        active: false,
        amount: "240",
        features: ["Customizable employee directory", "Client project management", "Client meeting schedule", "Compliance tracking", "Client communication", "Create custom reports tailored"]
      },
      {
        type: "Enterprise",
        desc: "Best for business owners.",
        active: false,
        amount: "240",
        features: ["Customizable employee directory", "Client project management", "Client meeting schedule", "Compliance tracking", "Client communication", "Create custom reports tailored"]
      }
    ],


    orgProfile_navItems: [
      {
        name: "Personal Information",
        icon: (isActive) => Icons.profile_icon(isActive),
        to: "/organisation_dashboard/org_profile"
      },
      {
        name: "Settings",
        icon: (isActive) => Icons.settings_icon(isActive),
        to: "/organisation_dashboard/org_profile/settings"
      },
      // {
      //   name: "Time Table",
      //   icon: <CiSettings />,
      //   to: "/org_profile/timetable"
      // }
    ],


    orgPersonalInfoInputs: [
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
    ],

    orgSettingsInputs: [
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



  }

  const jsxOnly = {
    create_admin: [
      {
        name: "Insitute Name",
        type: "text",
        title: " ",
        category: "input",
        placeholder: "",
        value: organisationState?.createAdminInputs?.institute_name || '',
        change: (e) => dispatch(updateCreateAdminInputs({ field: "institute_name", value: e.target.value })),
        // keyDown: (e) => {
        //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
        // },
        divClassName: "mb-3",
        isMandatory: false,
        Err: commonState?.app_data?.validated && !organisationState?.createAdminInputs?.institute_name ? "Insititute name required" : null
      },
      {
        name: "Admin Name",
        type: "text",
        title: " ",
        category: "input",
        placeholder: "",
        value: organisationState?.createAdminInputs?.admin_name || '',
        change: (e) => dispatch(updateCreateAdminInputs({ field: "admin_name", value: e.target.value })),
        // keyDown: (e) => {
        //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
        // },
        divClassName: "mb-3",
        isMandatory: false,
        Err: commonState?.app_data?.validated && !organisationState?.createAdminInputs?.admin_name ? "Admin name required" : null
      },
      {
        name: "Email Id ",
        type: "text",
        title: "",
        category: "input",
        placeholder: "",
        value: organisationState?.createAdminInputs?.email_id || '',
        change: (e) => dispatch(updateCreateAdminInputs({ field: "email_id", value: e.target.value })),
        // keyDown: (e) => {
        //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
        // },
        divClassName: "mb-3",
        isMandatory: false,
        Err: commonState?.app_data?.validated && !organisationState?.createAdminInputs?.email_id ? "Email required" : null
      },

    ],
    profile_details: [
      {
        name: "First Name",
        value: organisationState?.profileInputs?.first_name || '',
        type: "text",
        title: " ",
        category: "input",
        placeholder: "",
        divClassName: "mb-3 col-12 col-lg-8",
        readOnly:true
      },
      {
        name: "Last Name",
        value: organisationState?.profileInputs?.last_name || '',
        type: "text",
        title: " ",
        category: "input",
        placeholder: "",
        divClassName: "mb-3 col-12 col-lg-8",
        readOnly:true
      },
      {
        name: "Email",
        value: organisationState?.profileInputs?.email_id || '',
        type: "text",
        title: " ",
        category: "input",
        placeholder: "",
        divClassName: "mb-3  col-12 col-lg-8",
        readOnly:true
      },
      {
        name: "Phone Number",
        value: organisationState?.profileInputs?.phone_number || '',
        type: "text",
        title: " ",
        category: "input",
        placeholder: "",
        divClassName: "mb-3  col-12 col-lg-8",
        readOnly:true
      },
      {
        name: "Address",
        value: organisationState?.profileInputs?.address || '',
        type: "text",
        title: " ",
        category: "input",
        placeholder: "",
        divClassName: "mb-3  col-12 col-lg-8",
        readOnly:true
      }

    ],
    organization_edit_profile: [
      {
        name: "First Name",
        type: "text",
        title: " ",
        category: "input",
        placeholder: "",
        value: organisationState?.editProfileInputs?.first_name || '',
        change: (e) => dispatch(edit_org_profile_Inputs({ field: 'first_name', value: e.target.value })),
        // keyDown: (e) => {
        //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
        // },
        divClassName: "mb-3",
        isMandatory: false,
        Err: commonState?.app_data?.validated && !organisationState?.editProfileInputs?.first_name ? "First name required" : null
      },
      {
        name: "Last Name",
        type: "text",
        title: " ",
        category: "input",
        placeholder: "",
        value: organisationState?.editProfileInputs?.last_name || '',
        change: (e) => dispatch(edit_org_profile_Inputs({ field: 'last_name', value: e.target.value })),
        // keyDown: (e) => {
        //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
        // },
        divClassName: "mb-3",
        isMandatory: false,
        Err: commonState?.app_data?.validated && !organisationState?.editProfileInputs?.last_name ? "Last name required" : null
      },
      {
        name: "Email",
        type: "text",
        title: " ",
        category: "input",
        placeholder: "",
        value: organisationState?.editProfileInputs?.email_id || '',
        change: (e) => dispatch(edit_org_profile_Inputs({ field: 'email_id', value: e.target.value })),
        // keyDown: (e) => {
        //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
        // },
        divClassName: "mb-3",
        isMandatory: false,
        Err: commonState?.app_data?.validated && !organisationState?.editProfileInputs?.email_id ? "Email required" : null,
        readOnly:true
      },
      {
        name: "Phone Number",
        type: "text",
        title: " ",
        category: "input",
        placeholder: "",
        value: organisationState?.editProfileInputs?.phone_number || '',
        change: (e) => {
          if (/^\d{0,10}$/.test(e.target.value) && e.target.value.length <= 10) {
            dispatch(edit_org_profile_Inputs({ field: 'phone_number', value: e.target.value }))
          }
        },
        // keyDown: (e) => {
        //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
        // },
        divClassName: "mb-3",
        isMandatory: false,
        Err: commonState?.app_data?.validated && !organisationState?.editProfileInputs?.phone_number ? "Phone Number required" : null
      },
      {
        name: "Address",
        type: "text",
        title: " ",
        category: "input",
        placeholder: "",
        value: organisationState?.editProfileInputs?.address || '',
        change: (e) => dispatch(edit_org_profile_Inputs({ field: 'address', value: e.target.value })),
        // keyDown: (e) => {
        //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
        // },
        divClassName: "mb-3",
        isMandatory: false,
        Err: commonState?.app_data?.validated && !organisationState?.editProfileInputs?.address ? "Address required" : null
      }

    ],
    settings_details: [
      {
        name: "Current Password",
        type: "text",
        title: " ",
        category: "input",
        placeholder: "Current Password",
        value: organisationState?.settingsInputs?.old_password || '',
        change: (e) => dispatch(updateOrgSettingsInputs({ field:'old_password', value: e.target.value })),
        // keyDown: (e) => {
        //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
        // },
        divClassName: "mb-3",
        isMandatory: false,
        Err: commonState?.app_data?.validated && !organisationState?.settingsInputs?.old_password ? "First name required" : null
      },
      {
        name: "New Password",
        type: "text",
        title: " ",
        category: "input",
        placeholder: "Current Password",
        value: organisationState?.settingsInputs?.confirm_password || '',
        change: (e) => dispatch(updateOrgSettingsInputs({ field: 'confirm_password', value: e.target.value })),
        // keyDown: (e) => {
        //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
        // },
        divClassName: "mb-3",
        isMandatory: false,
        Err: commonState?.app_data?.validated && !organisationState?.settingsInputs?.confirm_password ? "Confirm Password required" : null
      },
      {
        name: "Confirm Password",
        type: "text",
        title: " ",
        category: "input",
        placeholder: "Confirm Password",
        value: organisationState?.settingsInputs?.new_password || '',
        change: (e) => dispatch(updateOrgSettingsInputs({ field: 'new_password', value: e.target.value })),
        // keyDown: (e) => {
        //     if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
        // },
        divClassName: "mb-3",
        isMandatory: false,
        Err: commonState?.app_data?.validated && !organisationState?.settingsInputs?.new_password ? "New password required" : null
      },

    ]


  }


  return {
    "jsonOnly": jsonOnly,
    "jsxOnly": jsxOnly
  }

}

export default JsonData