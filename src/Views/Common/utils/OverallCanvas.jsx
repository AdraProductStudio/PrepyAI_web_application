import ButtonComponent from "Components/Button/Button";
import AttachmentCard from "Components/Card/AttachmentCard";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import Img from "Components/Img/Img";
import OffCanvas from "Components/Offcanvas/OffCanvas";
import NavLinkComp from "Components/Router_components/NavLink";
import Image from "Utils/Image";
import JsonData from "Views/Teachers/Utils/JsonData";
import { logout } from "../Slices/Common_slice";
import Icons from "Utils/Icons";
import { useLocation, useParams } from "react-router-dom";
import { updateModalShow } from "../Slices/Common_slice";
import Spinner from "Components/Spinner/CustomSpinner";

export function OverallCanvas() {
    const { commonState, teachersState } = useCommonState();
    const { jsonOnly } = JsonData();
    const dispatch = useDispatch();
    const location = useLocation();
    const {subject_id} = useParams();
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



    function canvasHeaderFun() {
        switch (commonState?.canvas?.from) {
            case "teachers":
                switch (commonState?.canvas?.type) {
                    case "attachments":
                        return <h5>Attachments</h5>

                    default:
                        break;
                }
                break;

            case "sidebar":
                switch (commonState?.canvas?.type) {
                    case "data":
                        return <div className="sidebar-header position-relative">
                            <div className="row h-100 align-items-center justify-content-center sidebar-header-underline">
                                <div className="col text-center">
                                    <div className='w-100'>
                                        <Img src={Image?.logo} alt="website logo" className='website_logo' />
                                    </div>
                                </div>
                            </div>
                        </div>

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }

    function canvasBodyFun() {
        switch (commonState?.canvas?.from) {
            case "teachers":
                switch (commonState?.canvas?.type) {
                    case "attachments":
                        return (
                            <div className="row h-100 align-content-start">
                                {teachersState?.subject_attachments?.glow ?
                                    <div className="h-100 row align-items-center justify-content-center">
                                        <div className="col-9 col-lg-5 text-center">
                                            <Spinner />
                                            <p className="mt-3">Getting Attachments...</p>
                                        </div>
                                    </div>
                                    :
                                    Object.entries(teachersState?.subject_attachments?.data || [])?.length ?
                                        Object.entries(teachersState?.subject_attachments?.data || []).map(([key, value]) => (
                                            <div className="row mb-3 align-content-start" key={key}>
                                                <div className="col-12 attachment_title">
                                                    <p>{key}</p>
                                                </div>
                                                {value?.map((item, index) => (
                                                    <div className="col-12 col-md-6 col-xl-4 col-xxl-3 mt-4 p-1" key={index}>
                                                        <AttachmentCard className="attachment_books" data={{...item,subject_id}} delete_function={() => console.log("Delete function called")} />
                                                    </div>
                                                ))}
                                            </div >
                                        ))
                                        :
                                        <div className="h-100 row align-items-center justify-content-center">
                                            <div className="col-9 col-lg-5 text-center">
                                                <p>No Attachments found</p>
                                            </div>
                                        </div>
                                }
                            </div>
                        )

                    default:
                        break;
                }
                break;

            case "sidebar":
                switch (commonState?.canvas?.type) {
                    case "data":
                        return <div className="sidebar-body-with-footer">
                            <nav className='navmenu w-100'>
                                <ul className='w-100 px-1 mt-3'>
                                    {commonState?.canvas?.sidebar_data?.map((v, i) => (
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
                        </div>

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }

    function canvasFooterFun() {
        switch (commonState?.canvas?.from) {
            case "teachers":
                switch (commonState?.canvas?.type) {
                    case "attachments":
                        return (
                            <div className="shadow-sm w-100 py-3">
                                <div className="col-6 col-sm-4 col-md-3 col-lg-4 col-xxl-3 ms-auto">
                                    <ButtonComponent type="button" className="btn-brand-color px-4 py-2" buttonName="Add Attachment"
                                        clickFunction={() => dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "teacher", modal_type: "attachments" }))} />
                                </div>
                            </div>
                        )

                    default:
                        break;
                }
                break;

            case "sidebar":
                switch (commonState?.canvas?.type) {
                    case "data":
                        return <div className="sidebar-footer px-3">
                            <ButtonComponent className="btn-transparent w-100" clickFunction={() => dispatch(logout())}>
                                <span className="pe-3">{Icons.logoutIcon}</span>
                                <span className="text-secondary">Logout</span>
                            </ButtonComponent>
                        </div>

                    default:
                        break;
                }
                break;


            default:
                break;
        }
    }

    return (
        <OffCanvas
            offCanvasShow={commonState?.canvas?.show}
            offcanvasResponsive={commonState?.canvas?.responsive}
            offcanvasPlacement={commonState?.canvas?.placement}
            offcanvasCloseButton={commonState?.canvas?.close_btn}
            offcanvasClassname={commonState?.canvas?.extraClass}
            showModalHeader={true}
            offcanvasHeaderClassname="border-0"
            canvasHeader={canvasHeaderFun()}
            offcanvasBodyClassname="py-2"
            canvasBody={<div className='p-3 py-0 h-100'>{canvasBodyFun()}</div>}
            canvasFooter={canvasFooterFun()}
            width={commonState?.canvas?.width}
        />
    )
}