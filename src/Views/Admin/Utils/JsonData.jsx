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
                active_icon: Icons.sidebar_dashboard_active_icon,
                route: '/admin_dashboard/home'
            },
            {
                name: "Classrooms",
                icon: Icons.sidebar_classroom_icon,
                active_icon: Icons.sidebar_classroom_active_icon,
                route: '/admin_dashboard/classrooms'
            }
        ],
        staff_table_headers: ['S.No', 'Staff Name', 'Institute Name', 'Subject', 'Contact No', 'Email', 'Qualification', 'Action']
    }

    const jsxJson = {

    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData