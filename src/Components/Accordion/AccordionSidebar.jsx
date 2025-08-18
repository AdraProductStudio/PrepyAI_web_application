import React from "react"
import Accordion from 'react-bootstrap/Accordion';

const AccordionSidebar = ({ accordionData,accordionIndex }) => {
    return (
        <Accordion className="w-100 mb-3 sidebar-accordion" defaultActiveKey="0">
            <Accordion.Item eventKey={accordionIndex?.toString()} className="border-0 pb-0">
                <Accordion.Header>
                    <div className="col text-start">
                        <p className="mb-0">{accordionData?.name}</p>
                    </div>
                </Accordion.Header>

                <Accordion.Body className="p-0 mt-2">
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
