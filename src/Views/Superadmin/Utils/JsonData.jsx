import Icons from "Utils/Icons"


const JsonData = (params) => {

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
            { id: 1, name: "All Plans" },
            { id: 2, name: "Basic Plan" },
            { id: 3, name: "Premimum Plan" },
            { id: 4, name: "Platinum Plan" },
            { id: 5, name: "Enterprise Plan" }
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
                value: "30",
            },
            {
                icon: Icons.revenue,
                title: "Total Revenue",
                value: "1,00,000",
            }
        ],

        planData: [
            { name: "Basic Plan", value: 30, color: "hsla(266, 100%, 83%, 1)" },
            { name: "Premium Plan", value: 30, color: "hsla(339, 100%, 71%, 1)" },
            { name: "Platinum Plan", value: 10, color: "hsla(31, 70%, 78%, 1)" },
            { name: "Enterprise", value: 20, color: "hsla(354, 100%, 82%, 1)" }
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

        orgDetails: [
            {
                orgName: "Prakash school",
                name: "prakash",
                contanctNo: 1234567890,
                email: "prakash@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Basic",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "Lee school",
                name: "lee",
                contanctNo: 1234567890,
                email: "lee@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Platinum",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "John school",
                name: "john",
                contanctNo: 1234567890,
                email: "john@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Premium",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "Prakash school",
                name: "prakash",
                contanctNo: 1234567890,
                email: "prakash@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Basic",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "Lee school",
                name: "lee",
                contanctNo: 1234567890,
                email: "lee@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Platinum",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "John school",
                name: "john",
                contanctNo: 1234567890,
                email: "john@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Premium",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "Prakash school",
                name: "prakash",
                contanctNo: 1234567890,
                email: "prakash@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Basic",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "Lee school",
                name: "lee",
                contanctNo: 1234567890,
                email: "lee@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Platinum",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "John school",
                name: "john",
                contanctNo: 1234567890,
                email: "john@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Premium",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "Prakash school",
                name: "prakash",
                contanctNo: 1234567890,
                email: "prakash@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Basic",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "Lee school",
                name: "lee",
                contanctNo: 1234567890,
                email: "lee@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Platinum",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "John school",
                name: "john",
                contanctNo: 1234567890,
                email: "john@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Premium",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "Prakash school",
                name: "prakash",
                contanctNo: 1234567890,
                email: "prakash@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Basic",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "Lee school",
                name: "lee",
                contanctNo: 1234567890,
                email: "lee@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Platinum",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "John school",
                name: "john",
                contanctNo: 1234567890,
                email: "john@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Premium",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "Prakash school",
                name: "prakash",
                contanctNo: 1234567890,
                email: "prakash@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Basic",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "Lee school",
                name: "lee",
                contanctNo: 1234567890,
                email: "lee@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Platinum",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "John school",
                name: "john",
                contanctNo: 1234567890,
                email: "john@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Premium",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "Prakash school",
                name: "prakash",
                contanctNo: 1234567890,
                email: "prakash@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Basic",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "Lee school",
                name: "lee",
                contanctNo: 1234567890,
                email: "lee@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Platinum",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "John school",
                name: "john",
                contanctNo: 1234567890,
                email: "john@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Premium",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "Prakash school",
                name: "prakash",
                contanctNo: 1234567890,
                email: "prakash@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Basic",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "Lee school",
                name: "lee",
                contanctNo: 1234567890,
                email: "lee@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Platinum",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "John school",
                name: "john",
                contanctNo: 1234567890,
                email: "john@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Premium",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "Prakash school",
                name: "prakash",
                contanctNo: 1234567890,
                email: "prakash@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Basic",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "Lee school",
                name: "lee",
                contanctNo: 1234567890,
                email: "lee@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Platinum",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "John school",
                name: "john",
                contanctNo: 1234567890,
                email: "john@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Premium",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "Prakash school",
                name: "prakash",
                contanctNo: 1234567890,
                email: "prakash@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Basic",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "Lee school",
                name: "lee",
                contanctNo: 1234567890,
                email: "lee@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Platinum",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
            {
                orgName: "John school",
                name: "john",
                contanctNo: 1234567890,
                email: "john@gmail.com",
                location: "Sulur, Coimbatore",
                subPlan: "Premium",
                createdDate: "2025-07-23 12:45:10",
                subDuration: "2025-12-10",
            },
        ],


        // Profile //

        profileNavItems: [
            {
                name: "Personal Information",
                icon: Icons.profile,
                to: "/profile"
            },
            {
                name: "Settings",
                icon: Icons.settings,
                to: "/profile/settings"
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

    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData

