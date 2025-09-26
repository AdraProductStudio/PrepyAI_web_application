import React from "react"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Icons from '../../Utils/Icons';
import { Popover } from 'react-bootstrap';


const Tooltip = ({ tooltip_content }) => {
    return (
        <OverlayTrigger
            key="top"
            placement="top"
            overlay={
                <Popover id="popover-basic" className="bg-dark">
                    <Popover.Body className="text-white">{tooltip_content}</Popover.Body>
                </Popover>
            }
        >
            <span className="cup ms-1">
                {Icons.info_icon}
            </span>
        </OverlayTrigger>
    )
}

export default Tooltip