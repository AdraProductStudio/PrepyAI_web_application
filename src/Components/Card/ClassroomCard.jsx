import ButtonComponent from "Components/Button/Button";
import { Card } from "react-bootstrap";
import Icons from "Utils/Icons";

export default function ClassroomCard({
    cardClassName = "col-3",
    cardBodyClassName = "p-0",
    cardTitleClassName = "p-4 pb-3 border-bottom",
    buttonName, onclick, data
}) {
    const items = [{ icons: Icons?.no_of_students, content: 'No of Students', count: data?.no_of_students || 0 }, { icons: Icons?.no_of_subjects, content: 'No of Subjects', count: data?.no_of_subjects || 0 }]

    return (
        <Card className={`shadow-sm border-0 ${cardClassName}`}>
            <Card.Body className={cardBodyClassName}>
                <Card.Title className={cardTitleClassName}>
                    <div className="w-100 d-flex">
                        <div className="col-10">
                            <h6>{data?.title || ''}</h6>
                            <p className="text-secondary fs-13 mb-0">Created on: {data?.date || ''}</p>
                        </div>
                        <div className="col-2 text-end">
                            <ButtonComponent
                                type="button"
                                className="btn"
                                buttonName={Icons?.menu_dot_icon}
                                clickFunction={onclick}
                            />
                        </div>
                    </div>
                </Card.Title>

                <div className="px-4 pb-4">
                    {items?.map((item) => (
                        <div className="w-100 d-flex align-items-end py-2">
                            <div className="col-10 fs-15 text-secondary">
                                <span className="pe-3">{item.icons}</span>
                                {item.content}
                            </div>
                            <div className="col-2 fs-16 text-secondary">
                                <span className="pe-3">:</span>
                                {item.count}
                            </div>
                        </div>
                    ))}

                    <ButtonComponent
                        type="button"
                        className="btn theme_secondary_color text-light w-100 mt-1"
                        buttonName={buttonName || "Button"}
                        clickFunction={onclick}
                    />
                </div>
            </Card.Body>
        </Card>
    );
}
