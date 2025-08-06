// import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import Icons from 'Utils/Icons';

const JsonData = () => {
    //main selectors
    // const dispatch = useDispatch();
    // const navigate = useCustomNavigate();
    // const { commonState } = useCommonState();

    const jsonOnly = {
        sidebar_data: [
            {
                name: "Dashboard",
                icon: Icons.sidebar_dashboard_icon,
                route: '/learners_dashboard/home'
            },
            {
                name: "Calendar",
                icon: Icons.sidebar_calender_icon,
                route: '/learners_dashboard/calendar'
            },
            {
                name: "Notes",
                icon: Icons.sidebar_notes_icon,
                route: '/learners_dashboard/notes'
            },
            {
                name: "Pricing Plan",
                icon: Icons.sidebar_classroom_icon,
                route: '/learners_dashboard/pricing_plan'
            },
        ],
        // staff_table_headers: ['S.No', 'Staff Name', 'Institute Name', 'Subject', 'Contact No', 'Email', 'Qualification', 'Action']
    }

    const jsxJson = {
        test_options_dropdown: [
            {
                // name: "Books",
                category: "select",
                type: "normal_select",
                options: [],
                placeholder: "Select Book",
                isMandatory: true,
                value: "",
                change: (e) => console.log(e.target.value),
                divClassName: "col-12 col-sm-6 col-xl-4 px-3",
                // Err: commonState?.app_data?.validated ? "Please select a book" : "",
            },
            {
                // name: "Chapter",
                category: "select",
                type: "normal_select",
                options: [],
                placeholder: "Select Chapter",
                isMandatory: true,
                value: "",
                change: (e) => console.log(e.target.value),
                divClassName: "col-12 col-sm-6 col-xl-4 px-3",
                // Err: commonState?.app_data?.validated ? "Please select a chapter" : "",
            },
        ],
    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData