import { useCustomNavigate } from "Components/CustomHooks";
import Header from "Components/Panel_compnent/Header";
import Sidebar from "Components/Panel_compnent/Sidebar"
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import JsonData from "Views/Organisation/Utils/JsonData";
import { OverallModel } from "../Utils/OverallModal";

export default function Layout() {
    const { jsonOnly } = JsonData();
    const navigate = useCustomNavigate();

    useEffect(() => {
        if (window.location.pathname === "/organisation_dashboard" || window.location.pathname === "/organisation_dashboard/") {
            navigate("/organisation_dashboard/home");
        }
    }, [navigate])

    return (
        <div className="layout_main">
            <div className="d-flex flex-wrap">
                <Sidebar menuOptions={jsonOnly.sidebar_data} responsiveOn="lg" logoutOnClick={() => console.log("Logout clicked")} />

                <main className="col layout_main_content overflow-hidden">
                    <div className="container-fluid h-100">
                        <header className="py-2">
                            <Header offcanvasOn="lg" />
                        </header>
                        <div className="pt-3 main_content_height overflow-auto">
                            <Outlet />
                            <OverallModel />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}