import ButtonComponent from 'Components/Button/Button'
import Img from 'Components/Img/Img'
import OffCanvas from 'Components/Offcanvas/OffCanvas'
import React, { Fragment } from 'react'
import Image from 'Utils/Image'
import Icons from 'Utils/Icons'
import AccordionSidebar from 'Components/Accordion/AccordionSidebar'
import { useCommonState, useCustomNavigate } from 'Components/CustomHooks'

const GenerateQuestionSidebar = ({
    menuOptions, responsiveOn,
    offCanvasShow, handleCanvasOpenOrClose,
    companyLogo, logoutOnClick
}) => {

    const navigate = useCustomNavigate()
    const {generate_question} = useCommonState()?.studentState

    const headerFun = () => {
        return <div className='w-100'>
            <Img src={Image?.logo} alt="website logo" className='website_logo' />
        </div>
    }

    function bodyContent() {
        return (
            <nav className='navmenu w-100'>
                <p className='text-center mt-3 sidebar-book-title'>{generate_question?.bookmarks?.book_title}</p>
                {generate_question?.bookmarks?.bookmarks?.map((item, index) => (
                    <AccordionSidebar
                        key={index}
                        accordionData={item}
                        accordionIndex={index}
                    />
                ))}
            </nav>
        );
    }


    function footerContent() {
        return <div className="sidebar-footer border-top border-secondary-subtle py-2">
            <ButtonComponent className="btn-transparent w-100" clickFunction={()=>navigate('/student_dashboard/home')}>
                <span className="pe-3">{Icons.sidebar_dashboard_icon}</span>
                <span className="text-secondary fs-6">Dashboard</span>
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

                    <div className="sidebar-body-with-footer overflow-auto">
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

export default GenerateQuestionSidebar