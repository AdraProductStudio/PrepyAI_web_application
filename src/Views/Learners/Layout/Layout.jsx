import Header from "Components/Panel_compnent/Header";
import Sidebar from "Components/Panel_compnent/Sidebar"
import { Outlet } from "react-router-dom";
import JsonData from "Views/Learners/Utils/JsonData";

export default function Layout() {
    const { jsonOnly } = JsonData();

    return (
        <div className="layout_main">
            <div className="d-flex flex-wrap">
                <Sidebar menuOptions={jsonOnly.sidebar_data} responsiveOn="lg" />

                <main className="col layout_main_content overflow-hidden">
                    <div className="container-fluid h-100">
                        <header className="py-2">
                            <Header />
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