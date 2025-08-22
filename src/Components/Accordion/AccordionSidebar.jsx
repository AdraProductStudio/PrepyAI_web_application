import { useDispatch } from "Components/CustomHooks";
import React from "react"
import Accordion from 'react-bootstrap/Accordion';
import { updateGenerateQuestionFields } from "Views/Students/Slices/StudentSlice";

const AccordionSidebar = ({ accordionData, accordionIndex }) => {
    const truncateText = (text, maxLength = 15) => {
        if (!text) return "";
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }

    const dispatch = useDispatch()
    return (
        <Accordion className="w-100 mb-3 sidebar-accordion" defaultActiveKey="0">
            <Accordion.Item eventKey={accordionIndex?.toString()} className="border-0 pb-0">
                <Accordion.Header onClick={()=>dispatch(updateGenerateQuestionFields({chapter_name:accordionData?.title}))}>
                    <div className="col text-start">
                        <p className="mb-0">
                            {truncateText(accordionData?.title, 15)}
                        </p>
                    </div>
                </Accordion.Header>

                <Accordion.Body className="p-0 mt-2">
                    {accordionData?.subchapters?.map((accordionValue, accordionIndex) => (
                        <div key={accordionIndex} className="subchapter-item">
                            <p className="mb-0 text-secondary">{accordionValue?.title}</p>
                        </div>
                    ))}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default AccordionSidebar;
