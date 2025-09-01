import { useCommonState, useDispatch } from "Components/CustomHooks";
import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import {
    updateGenerateQuestionCanvas,
    updateGenerateQuestionFields,
} from "Views/Students/Slices/StudentSlice";

const AccordionSidebar = ({ accordionData, accordionIndex,}) => {
    const [activeKey, setActiveKey] = useState(null)
    const dispatch = useDispatch()
    const { generate_question} = useCommonState()?.studentState

    const truncateText = (text, maxLength = 15) => {
        if (!text) return "";
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }

    const handleChapterClick = (e) => {
        e.stopPropagation()
        dispatch(updateGenerateQuestionFields({ chapter_name: accordionData?.title }))
        dispatch(updateGenerateQuestionCanvas(false))
    }

    const hasSubchapters = accordionData?.subchapters?.length > 0;

    return (
        <Accordion className="w-100 mb-3 sidebar-accordion" activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
            <Accordion.Item
                eventKey={accordionIndex?.toString()}
                className={`border-0 pb-0
                        ${activeKey === accordionIndex?.toString() ? "accordion-open" : ""}
                        ${generate_question?.chapter_name === accordionData?.title ? "accordion-selected" : ""}
                        ${!hasSubchapters ? "no-caret" : ""}`}
            >
                <Accordion.Header>
                    <div
                        className="col text-start"
                        onClick={handleChapterClick}
                        style={{ cursor: "pointer" }}
                    >
                        <p className="mb-0">{truncateText(accordionData?.title, 15)}</p>
                    </div>
                </Accordion.Header>

                {hasSubchapters && (
                    <Accordion.Body className="p-0 mt-2">
                        {accordionData?.subchapters?.map((accordionValue, subIndex) => (
                            <div key={subIndex} className="subchapter-item">
                                <p className="mb-0 text-secondary">{accordionValue?.title}</p>
                            </div>
                        ))}
                    </Accordion.Body>
                )}
            </Accordion.Item>
        </Accordion>
    );
};

export default AccordionSidebar;
