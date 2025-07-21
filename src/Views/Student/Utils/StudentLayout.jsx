import Sidebar from "Components/Panel_compnent/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "Components/Panel_compnent/Header";
import { useCommonState } from "Components/CustomHooks";
import JsonDataStudent from "./JsonDataStudent";
import { useState } from "react";
import Icons from "Utils/Icons";
import { Offcanvas } from "react-bootstrap";



export const StudentLayout = () => {
    const { commonState } = useCommonState();
    const { jsonOnly } = JsonDataStudent();

    const [offCanvasShow, setOffCanvasShow] = useState(false);

    const handleCanvasOpenOrClose = () => {
        setOffCanvasShow(prev => !prev);
    }


    return (
        <div className="w-100 d-flex flex-wrap main_bg ">
            <div className="top-navbar d-lg-none w-100 d-flex justify-content-between align-items-center p-2 px-3 bg-white shadow-sm">
                <p className="logo-text mb-0">Prepy AI</p>
                <button className="toggler-btn1" onClick={handleCanvasOpenOrClose}>
                  {Icons.burgermenu}
                </button>
            </div>
            <div className="col-2 d-none d-lg-block ">
                <Sidebar
                    responsiveOn="xl"
                    menuOptions={jsonOnly?.sidebar_data}
                    offCanvasShow={offCanvasShow}
                    handleCanvasOpenOrClose={handleCanvasOpenOrClose}
                />
            </div>
            <main className="layout_main_content flex-grow-1 ">
                <div className="container-fluid">
                    <header className="py-2">
                        <Header />
                    </header>
                    <div className="pt-3 main_content_height ">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
       



    )
}

