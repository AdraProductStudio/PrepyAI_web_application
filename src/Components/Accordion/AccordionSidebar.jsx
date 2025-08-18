import React from "react"
import Accordion from 'react-bootstrap/Accordion';

const AccordionSidebar = ({ accordionData }) => {
    return (
        <Accordion className="w-100 mb-3 sidebar-accordion" alwaysOpen>
            <Accordion.Item eventKey="0" className="border-0 pb-0">
                <Accordion.Header>
                    <div className="col text-start">
                        <p className="mb-0">{accordionData?.name}</p>
                    </div>
                </Accordion.Header>

                <Accordion.Body className="p-0">
                    {accordionData?.options?.map((accordionValue, accordionIndex) => (
                        <div key={accordionIndex} className="subchapter-item">
                            <p className="mb-0 text-secondary">{accordionValue?.name}</p>
                        </div>
                    ))}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default AccordionSidebar;
