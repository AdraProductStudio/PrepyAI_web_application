import { useCommonState, useCustomNavigate } from "Components/CustomHooks";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminAuth = () => {
    const { commonState } = useCommonState();
    const navigate = useCustomNavigate();

    useEffect(() => {
        if (window.location.pathname === "/admin_dashboard" || window.location.pathname === "/admin_dashboard/") {
            navigate("/admin_dashboard/home");
        }
    }, [navigate])

    return commonState?.app_data?.token && commonState?.app_data?.user_role === "ADMIN" ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminAuth;
