import { useCommonState, useCustomNavigate } from "Components/CustomHooks";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const OrganisationAuth = () => {
    const { commonState } = useCommonState();
    const navigate = useCustomNavigate();

    useEffect(() => {
        if (window.location.pathname === "/organisation_dashboard" || window.location.pathname === "/organisation_dashboard/") {
            navigate("/organisation_dashboard/home");
        }
    }, [navigate])

    return commonState?.app_data?.token && commonState?.app_data?.user_role === "ORGANIZATION" ? <Outlet /> : <Navigate to="/" replace />;
}

export default OrganisationAuth;