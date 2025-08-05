// import { useCommonState } from "Components/CustomHooks";
import Sidebar from "Components/Panel_compnent/Sidebar";
import { Outlet } from "react-router-dom";
import JsonData from "Views/Students/Utils/JsonData.jsx";
import Header from "Components/Panel_compnent/Header";


const Layout = () => {
    // const { } = useCommonState();
    const { jsonOnly } = JsonData();

    return (
        <div className="w-100 d-flex flex-wrap main_bg">
            <Sidebar responsiveOn="xl" menuOptions={jsonOnly?.sidebar_data} />

            <main className="layout_main_content">
                <div className="container-fluid ">
                    <header className="py-2">
                        <Header />
                    </header>
                    <div className="pt-3 main_content_height overflowY">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Layout;