// import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import { useCommonState } from 'Components/CustomHooks';
import Icons from 'Utils/Icons';
import { updateStaffForm } from '../Slices/adminSlice';
import { useDispatch } from 'react-redux';

const JsonData = () => {
    //main selectors
    const dispatch = useDispatch();
    // const navigate = useCustomNavigate();
    // const { commonState } = useCommonState();

    const { adminState } = useCommonState();
    const { staffForm, file, loading } = adminState

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
        staff_table_headers: ['S.No', 'Staff Name', 'Institute Name', 'Subject', 'Contact No', 'Email', 'Qualification', 'Action'],

        create_staff : [
            {
                label: "Staff Name",
                type: "text",
                id: "staff_name",
                name: "name",
                value: adminState?.staffForm.name || '',
                change: (e) => dispatch(updateStaffForm({ [e.target.name]: e.target.value })),
            },
            {
                label: "Email Id",
                type: "text",
                id: "email",
                name: "email_id",
                value: adminState?.staffForm.email_id || '',
                change: (e) => dispatch(updateStaffForm({ [e.target.name]: e.target.value })),
            },
            {
                label: "Subject Name",
                type: "text",
                id: "sub_name",
                name: "subject_name",
                value: adminState?.staffForm.subject_name || '',
                change: (e) => dispatch(updateStaffForm({ [e.target.name]: e.target.value })),
            },
            {
                label: "Institute Name",
                type: "text",
                id: "instu_name",
                name: "institute_name",
                value: adminState?.staffForm.institute_name || '',
                change: (e) => dispatch(updateStaffForm({ [e.target.name]: e.target.value })),
            }
        ],

    }

    const jsxJson = {

    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData