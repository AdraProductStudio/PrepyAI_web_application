// import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";
// import { update_app_data } from "Views/Common/Slices/Common_slice";
import Icons from "Utils/Icons";
import { CiUser } from "react-icons/ci"
import { CiSettings } from "react-icons/ci";

const JsonData = (params) => {
  // const dispatch = useDispatch();
  // const navigate = useCustomNavigate();
  // const { commonState } = useCommonState();

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
        value: "02/10",
      },
      {
        icon: Icons.teachers,
        title: "Total No.of Teachers",
        value: "50/100",
      },
      {
        icon: Icons.billing,
        title: "Billing History",
        subTitle: "Total spent",
        value: "02/10",
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
        icon: <CiUser />,
        to: "/org_profile"
      },
      {
        name: "Settings",
        icon: <CiSettings />,
        to: "/org_profile/settings"
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

  }


  return {
    "jsonOnly": jsonOnly,
    "jsxOnly": jsxOnly
  }

}

export default JsonData