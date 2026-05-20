import { useCommonState, useCustomNavigate } from "Components/CustomHooks";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const SuperadminAuth = () => {
    const { commonState } = useCommonState();
    const navigate = useCustomNavigate();

    useEffect(() => {
        if (window.location.pathname === "/superadmin_dashboard" || window.location.pathname === "/superadmin_dashboard/") {
            navigate("/superadmin_dashboard/home");
        }
    }, [navigate])

    return commonState?.app_data?.token && commonState?.app_data?.user_role === "SUPER_ADMIN" ? <Outlet /> : <Navigate to="/" replace />;

}

export default SuperadminAuth;