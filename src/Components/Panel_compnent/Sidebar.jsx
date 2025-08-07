import React, { Fragment } from "react"
import OffCanvas from 'Components/Offcanvas/OffCanvas';
import NavLinkComp from 'Components/Router_components/NavLink';
import Img from 'Components/Img/Img';
import Image from 'Utils/Image';
import { useLocation } from "react-router-dom";
import ButtonComponent from "Components/Button/Button";
import Icons from "Utils/Icons";

const Sidebar = ({
    menuOptions, responsiveOn,
    offCanvasShow, handleCanvasOpenOrClose,
    companyLogo, logoutOnClick
}) => {
    const location = useLocation();

    const hanldeButton = (v) => {
        return <>
            <div className="col-3 pb-1 text-center">
                {location.pathname.includes(v.route) ? v.active_icon : v.icon}
            </div>
            <div className="col text-start route_content">
                <p className='mb-0'>{v.name}</p>
            </div>
        </>
    }

    const headerFun = () => {
        return <div className='w-100'>
            <Img src={Image?.logo} alt="website logo" className='website_logo' />
        </div>
    }

    const bodyContent = () => {
        return <nav className='navmenu w-100'>
            <ul className='w-100 px-1 mt-3'>
                {menuOptions?.map((v, i) => (
                    !v?.sub_routes ?
                        <li className="list-unstyled w-100" key={i}>
                            <NavLinkComp
                                componentFrom="sidebar menus"
                                className='navlink-sidebar'
                                title={hanldeButton(v)}
                                to={v?.route}
                            />
                        </li>
                        :
                        <li className="list-unstyled w-100" key={i}>
                            <NavLinkComp
                                componentFrom="sidebar menus"
                                className='navlink-sidebar'
                                title={hanldeButton(v)}
                                to={v?.route}
                            />

                            <ul className={`h-100 w-100 px-1 ms-4 accordion_animation_sub_menu ${v?.show_sub_routes ? 'open' : ''}`}>
                                {
                                    v?.sub_routes?.map((v, i) => (
                                        <li className="list-unstyled w-100 " key={i}>
                                            <NavLinkComp
                                                componentFrom="sidebar menus"
                                                className=' w-100 d-flex flex-wrap align-items-center mb-1 navlink-sidebar rounded px-2 py-2 text-decoration-none'
                                                title={hanldeButton(v)}
                                                to={v?.route}
                                            />
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                ))}
            </ul>
        </nav >
    }

    function footerContent() {
        return <div className="sidebar-footer">
            <ButtonComponent className="btn-transparent w-100" clickFunction={logoutOnClick}>
                <span className="pe-3">{Icons.logoutIcon}</span>
                <span className="text-secondary">Logout</span>
            </ButtonComponent>
        </div>
    }

    return (
        <Fragment>
            <div className={`sidebar d-none ${responsiveOn ? `d-${responsiveOn}-block` : 'd-block'}`}>
                <div className="container-fluid">
                    <div className="sidebar-header position-relative">
                        <div className="row h-100 align-items-center justify-content-center sidebar-header-underline">
                            <div className="col text-center">
                                {headerFun()}
                            </div>
                        </div>
                    </div>

                    <div className="sidebar-body-with-footer">
                        {bodyContent()}
                    </div>

                    <div className="sidebar-footer">
                        {footerContent()}
                    </div>
                </div>
            </div>


            <OffCanvas
                offCanvasShow={offCanvasShow}
                offcanvasPlacement="start"
                offcanvasClassname="rounded border-0 sidebar offcanvas-sidebar"
                handleCanvasOpenOrClose={handleCanvasOpenOrClose}
                canvasHeader={headerFun('198px', '33px', companyLogo)}
                offcanvasHeaderClassname="sidebar-header"
                offcanvasHeaderTitleClassname="col-11 text-center"
                offcanvasBodyClassname="sidebar-body-with-footer"
                canvasBody={bodyContent()}
                canvasFooter={footerContent()}
            />
        </Fragment>
    )
}

export default Sidebar