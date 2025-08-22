import { useCustomNavigate } from "Components/CustomHooks";
import Header from "Components/Panel_compnent/Header";
import Sidebar from "Components/Panel_compnent/Sidebar"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import JsonData from "Views/Admin/Utils/JsonData";
import { logout } from "Views/Common/Slices/Common_slice";

export default function Layout() {
    const { jsonOnly } = JsonData();
    const navigate = useCustomNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.location.pathname === "/admin_dashboard" || window.location.pathname === "/admin_dashboard/") {
            navigate("/admin_dashboard/home");
        }
    }, [navigate])

    return (
        <div className="layout_main">
            <div className="d-flex flex-wrap">
                <Sidebar menuOptions={jsonOnly.sidebar_data} responsiveOn="lg" logoutOnClick={() => dispatch(logout())} />

                <main className="col layout_main_content overflow-hidden">
                    <div className="container-fluid h-100">
                        <header className="py-2">
                            <Header offcanvasOn="lg"/>
                        </header>
                        <div className="pt-3 main_content_height">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}