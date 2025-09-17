import { useDispatch } from 'Components/CustomHooks';
import React from "react"
import Offcanvas from 'react-bootstrap/Offcanvas';
import { update_app_data } from 'Views/Common/Slices/Common_slice';

const OffCanvas = ({
    offcanvasClassname, offcanvasPlacement, offcanvasHeaderClassname,
    canvasHeader, offcanvasHeaderTitleClassname,
    offcanvasBodyClassname, canvasBody, offcanvasCloseButton,
    offCanvasShow, offcanvasResponsive, canvasFooter,onHide
}) => {
    const dispatch = useDispatch();

    return (
        <Offcanvas
            show={offCanvasShow}
            onHide={offcanvasCloseButton ? onHide ? onHide : () => dispatch(update_app_data({ type: "canvas", data: {} })) : null}
            responsive={offcanvasResponsive}
            backdrop="static"
            className={offcanvasClassname}
            placement={offcanvasPlacement} >

            <Offcanvas.Header
                closeButton={offcanvasCloseButton}
                className={offcanvasHeaderClassname}>
                <Offcanvas.Title className={offcanvasHeaderTitleClassname}>
                    {canvasHeader}
                </Offcanvas.Title>
            </Offcanvas.Header>


            <Offcanvas.Body className={offcanvasBodyClassname}>
                {canvasBody}
            </Offcanvas.Body>

            {canvasFooter}
        </Offcanvas>
    )
}

export default OffCanvas;